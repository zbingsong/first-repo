from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('get_posts', views.get_posts, name='get_posts'),
    path('put_likes/<int:post_id>', views.put_likes, name='put_likes'),
    path('get_comments/<int:post_id>', views.get_comments, name='get_comments'),
    path('post_comment/<int:post_id>', views.post_comment, name='post_comment'),
    path('edit_post/<int:post_id>', views.edit_post, name='edit_post'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]
