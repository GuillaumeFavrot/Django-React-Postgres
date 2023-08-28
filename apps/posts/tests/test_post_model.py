from django.test import TestCase
from apps.posts.models import Post

class PostModelTestCase(TestCase):
    """This test class handles the unit testing of the Post model."""
    
    def setUp(self):
        Post.objects.create(text="This is a test post")
        Post.objects.create(text="This is another test post")

    def test_post_text(self):
        """Test that the text of the post is correctly set"""
        post1 = Post.objects.get(text="This is a test post")
        post2 = Post.objects.get(text="This is another test post")
        self.assertEqual(post1.text, "This is a test post")
        self.assertEqual(post2.text, "This is another test post")

    def test_post_str(self):
        """Test that the string representation of the post is correct"""
        post1 = Post.objects.get(text="This is a test post")
        post2 = Post.objects.get(text="This is another test post")
        self.assertEqual(str(post1), "This is a test post")
        self.assertEqual(str(post2), "This is another test post")
    
    def test_post_repr(self):
        """Test that the representation of the post is correct"""
        post1 = Post.objects.get(text="This is a test post")
        post2 = Post.objects.get(text="This is another test post")
        self.assertEqual(repr(post1), "Post(_id=1, text=This is a test post)")
        self.assertEqual(repr(post2), "Post(_id=2, text=This is another test post)")

    def test_post_to_dict(self):
        """Test that the to_dict method of the post is correct"""
        post1 = Post.objects.get(text="This is a test post")
        post2 = Post.objects.get(text="This is another test post")
        self.assertEqual(post1.__to_dict__(), {"_id": 1, "text": "This is a test post"})
        self.assertEqual(post2.__to_dict__(), {"_id": 2, "text": "This is another test post"})

