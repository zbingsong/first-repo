from curses.ascii import US
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
import json

from .models import User, Post, Comment

# superuser account: username: bingo; pw: 7373#925362q

# load the index page with all posts
def index(request):
    return render(request, "network/index.html")


# load the user profile page
def profile(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except:
        return render(request, 'network/profile.html', {
            'message': 'No such user exists.',
            'username': '',
            'following': '',
            'follower': ''
        })
    return render(request, 'network/profile.html', {
        'username': user_id,
        'following': user.following.count(),
        'follower': user.followers.count()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# # API that retrieves the n-th to (n+10)-th posts, assume GET request
# def get_posts(request):
#     start = int(request.GET.get('start', 0))
#     end = start + 10
#     data = Post.objects.order_by('-timestamp').all()
#     if len(data) < end-1:
#         return JsonResponse({
#             'posts': data[start:],
#             'if_end': True
#         })
#     else:
#         return JsonResponse({
#             'posts': data[start:end],
#             'if_end': False
#         })

# API that retrieves all posts, assume GET request
def get_posts(request):
    if request.method == 'GET':
        data = Post.objects.order_by('-timestamp').all()
        return JsonResponse({'posts': [post.serialize(request.user) for post in data]}, safe=True, status=204)
    else:
        return JsonResponse({'error': 'GET method required.'}, status=400)


# API that allows user to submit a new post
def post_post(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                title = data['title']
                content = data['content']
                post = Post(author=request.user, title=title, content=content)
                post.save()
                return HttpResponse(status=204)
            except:
                return JsonResponse({'error': 'Error submitting post.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to post.'}, status=400)
    else:
        return JsonResponse({'error': 'POST method required.'}, status=400)


# API that gets comments of a post
def get_comments(request, post_id):
    comments = Comment.objects.filter(post__pk=post_id).order_by('-timestamp').all()
    return JsonResponse({'comments': [comment.serialize() for comment in comments]}, safe=True)


# API that posts a new comment
@ensure_csrf_cookie
def post_comment(request, post_id):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                commenter = request.user
                post = Post.objects.get(pk=post_id)
                content = data['comment']
                comment = Comment(commenter=commenter, post=post, content=content)
                comment.save()
                return JsonResponse(
                    {
                        'commenter': commenter, 
                        'content': content, 
                        'timestamp': comment.timestamp
                    }, 
                    status=204
                )
            except:
                return JsonResponse({'error': 'Error submitting comment.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to post a comment.'}, status=400)
    else:
        return JsonResponse({'error': 'POST method required.'}, status=400)


# API that changes the number of likes 
def put_likes(request, post_id):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            if data.get('if_liked') is not None:
                post = Post.objects.get(pk=post_id)
                if data['if_liked']:
                    post.likes.remove(request.user)
                else:
                    post.likes.add(request.user)
                post.save()
                return HttpResponse(status=204)
            else:
                return JsonResponse({'error': '\'if_liked\' attribute cannot be empty.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to like a post.'}, status=400)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)


# API that updates the post content
def edit_post(request, post_id):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            if data.get('content'):
                post = Post.objects.get(pk=post_id)
                content = data['content']
                post.content = content
                post.save()
                return HttpResponse(status=204)
            else:
                return JsonResponse({'error': 'Post content cannot be empty.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to edit a post.'}, status=400)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)


# API that returns the user profile
def load_profile(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(pk=user_id)
            data = Post.objects.filter(author=user).order_by('-timestamp').all()
            # use number to show status
            # 1 means request.user is already following this user, 0 means not following, -1 means request.user is not logged in
            if request.user.is_authenticated:
                if_follow = int(user.following.filter(pk=request.user.pk).exists())
            else:
                if_follow = -1
            return JsonResponse({
                'posts': [post.serialize(request.user) for post in data], 
                'if_follow': if_follow
                }, status=204)
        except:
            return JsonResponse({'error': 'User not exist.'}, status=400)
    else:
        return JsonResponse({'error': 'GET method required.'}, status=400)


# API that toggles the follow-unfollow status of a user on its profile page
def change_follow(request, user_id):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            user = User.objects.get(pk=user_id)
            if data.get('if_follow') is not None:
                if data['if_follow']:
                    # currently following, need to stop following
                    request.user.following.remove(user)
                else:
                    # currently not following, need to start following
                    request.user.following.add(user)
                request.user.save()
                return HttpResponse(status=204)
            else:
                return JsonResponse({'error': 'Error following/unfollowing a user.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to follow or unfollow a user.'}, status=400)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)
