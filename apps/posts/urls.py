from django.urls import path

from . import views

urlpatterns = [
    path("", views.post_crud_controller.read_all, name="read_all"),
    path("post/add/", views.post_crud_controller.create, name="create"),
    path("post/<int:post_id>", views.post_crud_controller.read_one, name="read_one"),
    path("post/<int:post_id>/edit", views.post_crud_controller.update, name="update"),
    path("post/<int:post_id>/delete", views.post_crud_controller.delete, name="delete"),
]