from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import *

class NewItem(forms.Form):
    title = forms.CharField(max_length=64)
    description = forms.CharField(max_length=512, widget=forms.Textarea)
    starting_bid = forms.DecimalField(min_value=0.01)
    image_url = forms.URLField(max_length=512, required=False)
    image_upload = forms.ImageField(required=False)
    category = forms.ChoiceField(choices=Item.category.field.choices)

def index(request):
    return render(request, "auctions/index.html", {
        'listings': Item.objects.filter(if_active=True)
    })

def category_list(request):
    return render(request, 'auctions/category_list.html', {
        'categories': Item.category.field.choices
    })

def category_view(request, select_category):
    return render(request, 'auctions/category_view.html', {
        'category': select_category,
        'category_items': Item.objects.filter(category=select_category, if_active=True)
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
            # redirect to the proper page if user is redirected to login from other pages
            next_url = request.POST.get('next')
            if next_url:
                return HttpResponseRedirect(next_url)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
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
        if 'comment' in request.POST:
            comment = Comment(item=item, content=request.POST['comment_content'], commenter=request.user)
            comment.save()
        # if the user is the seller, allow user to end listing or edit listing
        elif current_user.username == item.seller.username:
            # end listing
            if 'end_listing' in request.POST:
                item.if_active = False
                last_bid = item.bidding.filter(current_bid=item.price).first()
                if last_bid != None:
                    item.buyer = last_bid.current_bidder
                item.save()
            # edit listing
            else:
                return HttpResponseRedirect(reverse('edit', args=(item_id,)))
        # if not seller, allow user to place bid or add item to watch list
        else:
            # place bid
            if 'place_bid' in request.POST:
                # check if bid is valid
                try:
                    bid = float(request.POST['bid'])
                except ValueError:
                    return render(request, 'auctions/item.html', {
                        'item': item,
                        'message': 'Invalid bid.'
                    })
                if bid <= item.price:
                    return render(request, 'auctions/item.html', {
                        'item': item,
                        'message': 'Your bid must be higher than the current bid.'
                    })
                # add this item to current user's bidding list
                new_bid = Bidding(item=item, current_bid=bid, current_bidder=current_user)
                new_bid.save()
                item.price = bid
            # add to watch list
            elif 'add_watch' in request.POST:
                item.watcher.add(current_user)
            else:
                item.watcher.remove(current_user)
            item.save()
    return render(request, 'auctions/item.html', {
        'item': item,
    })

@login_required
def create(request):
    if request.method == 'POST':
        form = NewItem(request.POST)
        if form.is_valid():
            form = form.cleaned_data
            new_item = Item(
                title=form['title'], 
                description=form['description'],
                starting_bid=form['starting_bid'],
                price=form['starting_bid'],
                image_url=form['image_url'],
                image_upload=form['image_upload'],
                category=form['category'],
                seller=request.user
            )
            new_item.save()
            # redirect to the listing
            return HttpResponseRedirect(reverse('item', args=(new_item.pk,)))
        else:
            return render(request, 'auctions/create.html', {
                'form': form,
                'message': 'Invalid item. Please check your inputs.'
            })
    return render(request, 'auctions/create.html', {
        'form': NewItem()
    })

@login_required
def edit(request, item_id):
    item = Item.objects.get(pk=item_id)
    if request.method == 'POST':        
        # get both the input data and the file itself
        form = NewItem(request.POST, request.FILES)
        if form.is_valid():
            # check if the item already has bids, if so, can't change starting_bid
            if item.bidding != None:
                if form.cleaned_data['starting_bid'] != item.starting_bid:
                    return render(request, 'auctions/edit.html', {
                        'form': form,
                        'message': 'The listing has at least one bid. Cannot change starting bid now.'
                    })
            form = form.cleaned_data
            item.starting_bid = form['starting_bid']
            item.title = form['title']
            item.description = form['description']
            item.image_url = form['image_url']
            item.image_upload = form['image_upload']
            item.category = form['category']
            item.if_active = True
            item.save()
            return HttpResponseRedirect(reverse('item', args=(item.pk,)))
    return render(request, 'auctions/edit.html', {
        'form': NewItem({
            'title': item.title,
            'description': item.description,
            'starting_bid': item.starting_bid,
            'image_url': item.image_url,
            'category': item.category
        })
    })

@login_required
def watchlist(request):
    if request.method == 'POST':
        item = request.user.watching.get(pk=request.POST['item_id'])
        item.watcher.remove(request.user)
        item.save()
    return render(request, 'auctions/watchlist.html', {
        'listings': request.user.watching.all()
    })

@login_required
def selling_view(request):
    return render(request, 'auctions/selling.html', {
        'listings': {
            'Active': request.user.selling.filter(if_active=True), 
            'Sold': request.user.selling.filter(if_active=False, buyer__isnull=False), 
            'Unsold': request.user.selling.filter(if_active=False, buyer__isnull=True)
        }
    })

@login_required
def purchase_view(request):
    return render(request, 'auctions/purchased.html', {
        'listings': request.user.purchased.all()
    })