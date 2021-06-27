from django.db.models import fields
from django.db.models.query import QuerySet
from rest_framework import serializers
from .models import ChatMessage
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class MessageSerializer(serializers.ModelSerializer):
    fruser=UserSerializer(read_only=True)
    touser=UserSerializer(read_only=True)
    class Meta:
        model=ChatMessage
        fields=('msg','created_at','touser','fruser')