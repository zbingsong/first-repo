from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import *

class NewItem(forms.Form):
    title = forms.CharField(max_length=64)
    description = forms.CharField(max_length=512, widget=forms.Textarea)
    category = forms.ModelChoiceField(choices=Category.objects.all())
    image_url = forms.URLField(max_length=512, required=False)
    starting_bid = forms.IntegerField()

def index(request):
    return render(request, "auctions/index.html", {
        'listings': Listings.objects.all()
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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def item(request, item_id):
    try:
        item = Item.objects.get(id=item_id)
    except IntegrityError:
        return HttpResponseBadRequest('Invalid item ID.')
    render(request, 'auctions/item.html', {
        'item_id': item.id
    })

def create(request):
    if request.method == 'POST':
        form = NewItem(request.POST)
        if form.is_valid():
            Item.objects.add(form)

    return render(request, 'auctions/create.html', {
        'form': NewItem()
    })