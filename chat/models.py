from django.db import models
from django.contrib.auth.models import User
from django.db.models.expressions import F
# Create your models here.

class ChatMessage(models.Model):
    msg=models.TextField()
    fruser=models.ForeignKey(User, on_delete=models.CASCADE, related_name='fr')
    touser=models.ForeignKey(User, on_delete=models.CASCADE, related_name='to')
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.msg