from django.urls import path

from . import views

urlpatterns = [
    path("", views.post_crud_controller.read_all, name="read_all"),
    path("add/", views.post_crud_controller.create, name="create"),
]