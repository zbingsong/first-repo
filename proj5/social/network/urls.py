from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('following', views.following, name='following'),
    path('profile/<str:user_id>', views.profile, name='profile'),

    path('post_post', views.post_post, name='post_post'),
    path('put_likes/<int:post_id>', views.put_likes, name='put_likes'),
    path('post_comment/<int:post_id>', views.post_comment, name='post_comment'),
    path('edit_post/<int:post_id>', views.edit_post, name='edit_post'),
    path('change_follow/<str:user_id>', views.change_follow, name='change_follow'),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]