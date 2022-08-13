from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json

from .models import User, Post, Comment


def index(request):
    # return render(request, "network/index.html", {
    #     'posts': Post.objects.order_by('-timestamp').all()
    # })
    return render(request, "network/index.html")


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
    data = Post.objects.order_by('-timestamp').all()
    return JsonResponse({'posts' :[post.serialize(request.user) for post in data]}, safe=True)


def put_likes(request, post_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        if data.get('like') is not None:
            post = Post.objects.filter(pk=post_id)
            post.like += data['like']
            post.save()
            return HttpResponse(status=204)
    return HttpResponse(status=400)