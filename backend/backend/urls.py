from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("upload/", include("upload.urls")),
    path("clean/", include("api.urls")),
    path("auth/", include("authentification.urls")),
]
