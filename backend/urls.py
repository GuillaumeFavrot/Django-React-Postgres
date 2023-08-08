# This file is the main routing point of the app. 
# The 'admin/' route comes standard in all Django and allows access to the admin portal. This functionaity has not been implemented in this template
# The 'api/' route is used by the frontend to get access to the main api of the app. Through this api the frontend can retrieve the data it needs from the database.
# The last route is only used in production. It allows the Django server to serve the React frontend by returning the 'index.html' when a request is sent on the app root address.
# The path of the 'index.html' is provided in the 'TEMPLATE' section of the settings .py file.

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
