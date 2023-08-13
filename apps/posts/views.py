from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .models import Post
from json import loads


class post_crud_controller():
    """This class handles the CRUD operations for posts."""
 
    def read_all(request):
        posts = Post.objects.all()
        posts_list = [item.__to_dict__() for item in list(posts)]
        return JsonResponse(posts_list, safe=False)
    
    def create(request):
        data = request.body
        parsedData = loads(data)
        text = parsedData['text']
        post = Post(text=text)
        post.save()
        posts = Post.objects.all()
        posts_list = [item.__to_dict__() for item in list(posts)]
        return JsonResponse(posts_list, safe=False)