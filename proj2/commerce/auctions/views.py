from pydoc import describe
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import *

class NewItem(forms.Form):
    title = forms.CharField(max_length=64)
    description = forms.CharField(max_length=512, widget=forms.Textarea)
    starting_bid = forms.IntegerField()
    image_url = forms.URLField(max_length=512, required=False)
    # image_path = forms.ImageField()
    category = forms.ModelChoiceField(choices=Item.category.field.choices)

def index(request):
    return render(request, "auctions/index.html", {
        'listings': Item.objects.filter(if_active=True)
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
    if request.method == 'POST':
        current_user = request.user
        # if user is not logged in, redirect to login page
        if not current_user.is_authenticated:
            return HttpResponseRedirect(reverse('login'))
        # if user is logged in
        else:
            # if the user is the seller, allow user to end listing and decide winner
            if current_user.id == item.seller.id:
                item.if_active == False
                winner = item.top_bidder
                winner.purchase.add(item)
                item.save()
                winner.save()
            # if not seller, allow user to place bid
            else:
                # check if bid is valid
                try:
                    bid = int(request.POST['bid'])
                except ValueError:
                    return render(request, 'auctions/item.html', {
                        'item': item,
                        'message': 'Invalid bid.'
                    })
                if bid <= item.current_bid:
                    return render(request, 'auctions/item.html', {
                        'item': item,
                        'message': 'Your bid must be higher than the current bid.'
                    })
                # remove this item from previous top bidder's bidding list
                prev_bidder = item.top_bidder
                prev_bidder.bidding.remove(item)
                prev_bidder.save()
                # add this item to current user's bidding list
                current_user.bidding.add(item)
                current_user.save()
                # update the current bid
                item.current_bid = bid
                item.save()
    return render(request, 'auctions/item.html', {
        'item': item
    })

@login_required(login_url='auctions/login.html')
def create(request):
    if request.method == 'POST':
        form = NewItem(request.POST)
        if form.is_valid():
            form = form.cleaned_data
            new_item = Item(
                title=form['title'], 
                description=form['description'],
                starting_bid=form['starting_bid'],
                image_url=form['image_url'],
                category=form['category'],
                current_bid=form['starting_bid'],
                if_active=True
            )
            new_item.save()
            # save the item to the user
            user = User.objects.get(id=request.user.id)
            user.selling.add(new_item)
            # redirect to the listing
            return HttpResponseRedirect(reverse('item.html', args=(new_item.pk,)))
        else:
            return render(request, 'auctions/create.html', {
                'form': form,
                'message': 'Invalid item. Please check your inputs.'
            })
    return render(request, 'auctions/create.html', {
        'form': NewItem()
    })