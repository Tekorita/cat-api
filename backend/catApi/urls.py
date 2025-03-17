"""
URL configuration for catApi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.http import HttpResponse
from django.contrib import admin
from django.urls import path
from .views import post_cats, get_game_results, save_game_result

urlpatterns = [
    path("admin/", admin.site.urls),
    path("post_cats/", post_cats, name="post_cats"),
    path("get_results/", get_game_results, name="get_results"),
    path("save_result/", save_game_result, name="save_result"),
    path("", lambda request: HttpResponse("¡La API está corriendo correctamente en AWS!")),
]
