from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('get_posts', views.get_posts, name='get_posts'),
    path('put_likes/<int: post_id>', views.put_likes, name='put_likes'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]
