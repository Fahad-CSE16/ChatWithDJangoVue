from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from chat.views import homeview
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homeview,name='home'),
    path('chats/', include('chat.urls')),
    path('api/', include('rest_framework.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)