from django.contrib.auth.models import AbstractUser
from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    starting_bid = models.IntegerField()
    item_image = models.URLField(max_length=512, blank=True)

class User(AbstractUser):
    username = models.CharField(max_length=64)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=64)
    watch_list = models.ManyToManyField(Item, blank=True, related_name='watched')

class Category(models.Model):
    item = models.ManyToManyField(Item, blank=True, related_name='category')

class Listings(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='listing')
    current_bid = models.IntegerField()
    if_active = models.BooleanField()
    winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='if_win')