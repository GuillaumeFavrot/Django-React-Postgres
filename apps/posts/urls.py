from django.urls import path

from . import views

urlpatterns = [
    path("", views.posts_controller, name="posts_controller"),
]