from django.contrib.auth import models
from django.shortcuts import render,redirect
from django.http import JsonResponse

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from .models import ChatMessage
from django.contrib import messages
# Userlogin signup, import
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.views.generic import ListView


class MessageAdd(APIView):
    def post(self,request,format=None):
        data=self.request.data
        msg=data['msg']
        touser1=int(data['userid'][0])
        touser=User.objects.get(id=touser1)
        ChatMessage.objects.create(msg=msg,touser=touser,fruser=request.user)
        data={}
        data['response']="successfully saved"
        return Response(data)
from .serializers import MessageSerializer
class MessageListAPIView(ListAPIView):
    lookup_field='id'
    permission_classes = (AllowAny, )
    def get(self, request,id):
        data={}
        user=User.objects.get(id=id)
        msg = ChatMessage.objects.filter(touser=request.user,fruser=user).order_by('created_at')
        msg2 = ChatMessage.objects.filter(touser=user,fruser=request.user).order_by('created_at')
        msg =  msg | msg2
        serializer=MessageSerializer(msg, many=True)
        return Response(serializer.data)



















def homeview(request):
    users=User.objects.all()
    return render(request,'home.html',{'users':users})

def LoginView(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            try:
                if user.selleruser:
                    messages.warning(request,"You are selleruser, You can't login here.. To login, please register as a buser.")
                    return redirect('signup')
            except:
                pass
            if user is not None:
                login(request, user)
                messages.success(
                    request, f"You are now logged in as {username}") 
                return redirect('home')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request,
                  template_name="login.html",
                  context={"form": form})

def LogoutView(request):
    logout(request)
    messages.success(request, "Successfully logged out!")
    return redirect('home')
def userlistview(request):
    users=User.objects.all().exclude(username = request.user.username)
    return render(request,'userlist.html',{'users':users})
class UserListView(ListView):
    model=User
    context_object_name='users'
    template_name='userlist.html'
def chatpage(request,id):
    usr=User.objects.get(id=id)
    return render(request,'chatpage.html',{'usr':usr})