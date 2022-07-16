from django.urls import path

from . import views

urlpatterns = [
    # show commodities
    path("", views.index, name="index"),
    path('item/<int:item_id>', views.item, name='item'),
    # log in and out
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create', views.create, name='create'),
    path('category', views.category_list, name='category_list'),
    path('category/<str:select_category>', views.category_view, name='category_view')
]
