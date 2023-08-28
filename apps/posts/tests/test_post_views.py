from django.test import TestCase, Client
from apps.posts.models import Post
import json

class PostCrudControllerTestCase(TestCase):
    """This test class handles the testing of CRUD operations for posts."""

    def setUp(self) -> None:
        self.client = Client()
        self.post = Post.objects.create(text='Test post')
        self.post_data = {'text': 'Updated test post'}
    
    def test_read_all(self) -> None:
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
    
    def test_create(self) -> None:
        response = self.client.post('/posts/add/', json.dumps(self.post_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Post.objects.count(), 2)
    
    def test_update(self) -> None:
        self.post_data['_id'] = self.post._id
        response = self.client.put('/posts/update/', json.dumps(self.post_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.post.refresh_from_db()
        self.assertEqual(self.post.text, 'Updated test post')
    
    def test_delete(self) -> None:
        response = self.client.delete('/posts/delete/', json.dumps(self.post._id), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Post.objects.count(), 0)
    
