# This file is the routing point of the api app of the project.
# This template only use one api endpoint "test" for testing pusposes.
# A more complex app will most likely have multiple endpoints (user, products, posts, etc....)
 
from django.urls import path
from . import views

urlpatterns = [
  path('test', views.testApi),
]