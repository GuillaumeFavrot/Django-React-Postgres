from django.http import HttpResponse

def posts_controller(request):
    return HttpResponse("Hello, world. You hit the posts controler.")
