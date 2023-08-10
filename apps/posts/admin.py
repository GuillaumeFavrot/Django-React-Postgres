# Register the models here you want to see in the admin panel.

from django.contrib import admin

from .models import Post 

admin.site.register(Post)