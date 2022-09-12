from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.db.models import Count
import json

from .models import User, Post, Comment


# load the index page with all posts
def index(request):
    # annotate() inserts an additional row into the returned table that quickly calculates count()
    posts = Post.objects.annotate(likes_num=Count('likes')).order_by('-timestamp').all()
    return get_page(request, posts, 'index', None)


# load the user profile page
def profile(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        posts = user.posts.annotate(likes_num=Count('likes')).order_by('-timestamp').all()
        return get_page(request, posts, 'profile', user)
    except:
        return render(request, 'network/profile.html', {
            'message': 'No such user exists.',
            'profile': True
        })


# load the Following page
def following(request):
    if request.user.is_authenticated:
        posts = Post.objects.filter(author__in=request.user.following.all()).annotate(likes_num=Count('likes')).order_by('-timestamp').all()
        return get_page(request, posts, 'following', None)
    else:
        return login_view(request)


def get_page(request, posts, page_type, user):
    paginator = Paginator(posts, 10)
    if request.GET.get('page') is not None:
        page_number = int(request.GET.get('page'))
    else:
        page_number = 1
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {
        'type': page_type,
        'profile': user,
        'page_num': page_number,
        'total_page': range(1, paginator.num_pages+1),
        'page_obj': page_obj
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


# API that allows user to submit a new post
def post_post(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data['title']
            content = data['content']
            post = Post(author=request.user, title=title, content=content)
            post.save()
            return HttpResponse(status=201)
        except:
            return JsonResponse({'error': 'Error submitting post.'}, status=400)
    else:
        return JsonResponse({'error': 'POST method required.'}, status=400)

# API that posts a new comment
def post_comment(request, post_id):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                commenter = request.user
                post = Post.objects.get(pk=post_id)
                content = data['content']
                comment = Comment(commenter=commenter, post=post, content=content)
                comment.save()
                return JsonResponse(comment.serialize(), status=201)
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
                if data['if_liked'] == 1:
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


# API that toggles the follow-unfollow status of a user on its profile page
def change_follow(request, user_id):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            user = User.objects.get(pk=user_id)
            if data.get('if_following') is not None:
                if data['if_following']:
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
