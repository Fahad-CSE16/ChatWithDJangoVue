from django.urls import path
from .views import *
urlpatterns = [
    path('send/',MessageAdd.as_view(),name='msg' ),
    path('get/<int:id>/',MessageListAPIView.as_view(),name='getmsg'),
    path('users/',UserListView.as_view(),name='users' ),
    path('login/',LoginView,name='login'),
    path('logout/',LogoutView,name='logout'),
    path('chatpage/<int:id>/',chatpage,name='chatpage'),
]
