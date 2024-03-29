from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('create/', views.create, name='create'),
    path('random/', views.random_page, name='random'),
    path('wiki/<str:entry_title>/', views.entry, name='entry'),
    path('edit/<str:entry_title>/', views.edit, name='edit'),
    path('search/', views.search_entry, name='search')
]
