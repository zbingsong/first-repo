from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

from .models import User, Post, Comment

# superuser account: username: bingo; pw: 7373#925362q

# load the index page with all posts
@csrf_exempt
def index(request):
    return render(request, "network/index.html")


# load the user profile page
@csrf_exempt
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


# load the Following page
@csrf_exempt
def following(request):
    return render(request, 'network/following.html')


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
        return HttpResponseRedirect(reverse("register"))


# API that retrieves all posts, assume GET request
def get_posts(request):
    if request.method == 'GET':
        data = Post.objects.order_by('-timestamp').all()
        return JsonResponse({'posts': [post.serialize(request.user) for post in data]}, status=200)
    else:
        return JsonResponse({'error': 'GET method required.'}, status=400)


# API that allows user to submit a new post
@csrf_exempt
def post_post(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                title = data['title']
                content = data['content']
                post = Post(author=request.user, title=title, content=content)
                post.save()
                return HttpResponse('success', status=201)
            except:
                return JsonResponse({'error': 'Error submitting post.'}, status=400)
        else:
            return JsonResponse({'error': 'You must be logged in to post.'}, status=401)
    else:
        return JsonResponse({'error': 'POST method required.'}, status=400)


# API that gets comments of a post
def get_comments(request, post_id):
    comments = Comment.objects.filter(post__pk=post_id).order_by('-timestamp').all()
    return JsonResponse({'comments': [comment.serialize() for comment in comments]})


# API that posts a new comment
@csrf_exempt
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
                return JsonResponse(comment.serialize(), status=201)
            except:
                return JsonResponse({'error': 'Error returning the Comment() object.'}, status=400)
        else:
            # return HttpResponseRedirect(reverse('login'))
            return JsonResponse({'error': 'You must be logged in to post a comment.'}, status=401)
    else:
        return JsonResponse({'error': 'POST method required.'}, status=400)


# API that changes the number of likes
@csrf_exempt
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
            return JsonResponse({'error': 'You must be logged in to like a post.'}, status=401)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)


# API that updates the post content
@csrf_exempt
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
            return JsonResponse({'error': 'You must be logged in to edit a post.'}, status=401)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)


# API that returns the user profile
def load_profile(request, user_id):
    if request.method == 'GET':
        try:
            data = Post.objects.filter(author__pk=user_id).order_by('-timestamp').all()
            # data = Post.objects.order_by('-timestamp').all()
        except:
            return JsonResponse({'error': 'Cannot retrieve posts of this user.'}, status=400)
        try:
            # use number to show status
            # 1 means request.user is already following this user, 0 means not following, 
            # -1 means request.user is not logged in or request.user is viewing profile of themselves
            if request.user.is_authenticated and request.user.username != user_id:
                if_follow = int(request.user.following.filter(pk=user_id).exists())
            else:
                if_follow = -1
            return JsonResponse({
                'posts': [post.serialize(request.user) for post in data], 
                'if_follow': if_follow
                }, status=200)
        except:
            return JsonResponse({'error': 'User not exist.'}, status=400)
    else:
        return JsonResponse({'error': 'GET method required.'}, status=400)


# API that toggles the follow-unfollow status of a user on its profile page
@csrf_exempt
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
            return JsonResponse({'error': 'You must be logged in to follow or unfollow a user.'}, status=401)
    else:
        return JsonResponse({'error': 'PUT method required.'}, status=400)


# API that loads the posts from the users that request.user follows
@login_required
def get_following_posts(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            data = Post.objects.filter(author__in=request.user.following.all()).order_by('-timestamp').all()
            return JsonResponse({'posts': [post.serialize(request.user) for post in data]}, safe=True, status=200)
        else:
            return JsonResponse({'error': 'You must be logged in.'}, status=400)
    else:
        return JsonResponse({'error': 'GET method required.'}, status=400)