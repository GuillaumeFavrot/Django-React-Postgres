from django.db import models
from dataclasses import dataclass


class Post(models.Model):
    """Post model"""
    _id:int = models.AutoField(primary_key=True)
    message: str = models.CharField(max_length=2040)
    
    def __str__(self) -> str:
        return self.message
    
    def __repr__(self) -> str:
        return f"Post(_id={self._id}, message={self.message})"
