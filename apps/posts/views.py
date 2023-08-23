from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .models import Post
from json import loads

@csrf_exempt
class post_crud_controller():
    """This class handles the CRUD operations for posts."""
    
    def read_all(request) -> JsonResponse:
        posts = Post.objects.all()
        posts_list = [item.__to_dict__() for item in list(posts)]
        return JsonResponse(posts_list, safe=False)
    
    @csrf_exempt
    def create(request) -> HttpResponse:
        data = loads(request.body)
        post = Post(text=data['text'])
        post.save()
        return HttpResponse(status=200)
    
    @csrf_exempt
    def update(request) -> HttpResponse:
        data = loads(request.body)
        post = Post.objects.get(_id = data['_id'])
        post.set_text(data['text'])
        post.save()
        return HttpResponse(status=200)
        
    @csrf_exempt
    def delete(request) -> HttpResponse:
        data = loads(request.body)
        post = Post.objects.get(_id = data)
        post.delete()
        return HttpResponse(status=200)