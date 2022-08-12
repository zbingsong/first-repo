from sqlite3 import Timestamp
from tkinter import CASCADE
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=32, primary_key=True)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=32)
    following = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='followers')

    def __str__(self) -> str:
        return f'{self.username}'

class Post(models.Model):
    author = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=1024)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f'{self.author} said {self.title} at {self.timestamp}'

class Comment(models.Model):
    commenter = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='post_comment', on_delete=models.CASCADE)
    content = models.TextField(max_length=256)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.commenter} commented {self.content} at {self.timestamp}'
