from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=64, primary_key=True)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=64)

    def __str__(self) -> str:
        return f'{self.username}'

class Item(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    starting_bid = models.DecimalField(default=1, decimal_places=2, max_digits=10)
    price = models.DecimalField(default=1, decimal_places=2, max_digits=10)
    image_url = models.URLField(max_length=512, null=True, blank=True)
    # image_upload = models.ImageField(blank=True)
    category = models.CharField(max_length=64,
        choices=[('Clothes', 'Clothes'), ('Electronics', 'Electronics')]
    )
    created_time = models.DateTimeField(auto_now_add=True)
    if_active = models.BooleanField(default=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='selling')
    watcher = models.ManyToManyField(User, blank=True, related_name='watching')
    buyer = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='purchased')

    def __str__(self) -> str:
        return f'{self.title} listed by {self.seller.username}'

class Bidding(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='bidding')
    current_bid = models.DecimalField(default=1, decimal_places=2, max_digits=10)
    current_bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bid')
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.item.title} bidding at {self.current_bid} by {self.current_bidder.username}'

class Comment(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_comment')
    content = models.CharField(max_length=128)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comment')
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.commenter.username} said: {self.content}'