from django.contrib.auth.models import AbstractUser
from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    starting_bid = models.PositiveIntegerField()
    image_url = models.URLField(max_length=512, blank=True)
    # image_upload = models.ImageField(blank=True)
    category = models.CharField(max_length=64,
        choices=[('Clothes', 'Clothes'), ('Electronics', 'Electronics')]
    )
    created_time = models.DateTimeField(auto_now_add=True)
    current_bid = models.IntegerField()
    if_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'{self.title} in {self.category} listed by {self.seller.username} at {self.created_time}'

class User(AbstractUser):
    username = models.CharField(max_length=64)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=64)
    watch_list = models.ManyToManyField(Item, blank=True, related_name='watcher')
    selling = models.ForeignKey(Item, blank=True, on_delete=models.CASCADE, related_name='seller')
    bidding = models.ForeignKey(Item, blank=True, on_delete=models.CASCADE, related_name='top_bidder')
    purchase = models.ForeignKey(Item, blank=True, on_delete=models.CASCADE, related_name='buyer')

    def __str__(self) -> str:
        return f'{self.username}'

# class Listings(models.Model):
#     item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='listing')
#     current_bid = models.IntegerField()
#     if_active = models.BooleanField()
#     winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='if_win')

#     def __str__(self) -> str:
#         return f'{self.item.title} bidding at {self.current_bid}'