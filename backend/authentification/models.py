from django.utils import timezone
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, default='',unique=True)
    email=models.EmailField(max_length=50)
    first_name=models.CharField(max_length=150)
    last_name=models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    registered_at = models.DateTimeField( default=timezone.now)
    