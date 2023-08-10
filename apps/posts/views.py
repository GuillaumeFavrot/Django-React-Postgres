from django.http import HttpResponse


class post_crud_controller():
    """This class handles the CRUD operations for posts."""

    def create(request):
        return HttpResponse("Hello, world. You hit the posts controler.")

    def read_all(request):
        return HttpResponse("Hello, world. You hit the posts read all controler.")

    def read_one(request):
        return HttpResponse("Hello, world. You hit the posts read controler.")
    
    def update(request):
        return HttpResponse("Hello, world. You hit the posts update controler.")
    
    def delete(request):
        return HttpResponse("Hello, world. You hit the posts delete controler.")
    

    
