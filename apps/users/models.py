from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from utils.validator import phone_validator
from django.conf import settings
from twilio.rest import Client
import random
import pyotp

# Create your models here.
class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank = True, null = True, default="Пользователь не добавил описание")
    profile_image = models.ImageField(upload_to='profiles', blank=True, null=True)
    location = models.CharField(max_length=250, blank = True, null = True, default="Пользователь не добавил местоположение")
    another = models.TextField(blank = True, null = True)
    password = models.CharField(max_length=100)
    random_code = random.randint(1000, 9999)

    def __str__(self):
        return f"{self.username} -- {self.description}"


    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"



class Contact(models.Model):
    name = models.CharField(max_length = 100)
    image = models.ImageField(upload_to = 'contact_image/')
    src = models.CharField(max_length = 250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"
        
class Media(models.Model):
    name = models.CharField(max_length = 100, verbose_name="Имя")
    image = models.FileField(upload_to = 'media_files/')
    src = models.CharField(max_length = 250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Медиа"
        verbose_name_plural = "Медиа"