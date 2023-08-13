from django.db import models


class Post(models.Model):
    """Post model"""
    _id:int = models.AutoField(primary_key=True)
    text: str = models.CharField(max_length=2040)

    def set_text(self, text: str) -> None:
        self.text = text

    def __str__(self) -> str:
        return self.text
    
    def __repr__(self) -> str:
        return f"Post(_id={self._id}, text={self.text})"
    
    def __to_dict__(self) -> dict:
        return {
            "_id": self._id,
            "text": self.text
        }
