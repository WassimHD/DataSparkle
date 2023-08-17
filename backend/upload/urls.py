from django.urls import path
from .views import *

urlpatterns = [
    path('',upload_csv),
    # path("/utf/",upload_csv_utf)
]
