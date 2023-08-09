from django.db import models
from dataclasses import dataclass

@dataclass
class Posts(models.Model):
    _id:int = models.AutoField(primary_key=True)
    message: str = models.CharField(max_length=2040)
    