from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(verbose_name=_("username"), max_length=255, unique=True)
    name = models.CharField(verbose_name=_("name"), max_length=50)
    email = models.EmailField(verbose_name=_("email"), unique=True)
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    bio = models.TextField(verbose_name=_("bio"), blank=True, max_length=500)
    avatar = models.ImageField(verbose_name=_("avatar"), default='user.png')
    cover_image = models.ImageField(verbose_name=_("cover image"), default='cover.png')
    is_staff = models.BooleanField(verbose_name=_("is_status"), default=False)
    is_superuser = models.BooleanField(verbose_name=_("is_superuser"), default=False)
    is_active = models.BooleanField(verbose_name=_("Active"), default=True)
    date_joined = models.DateTimeField(default=timezone.now, verbose_name=_("Date Joined"))

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    class Meta:
        ordering = ('date_joined',)
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def following_list(self):
        """
        all the users that the current user is following
        """
        return self.following.all()

    def followers_list(self):
        """
        all the users who are following the current user
        """
        return self.followers.all()

    def follow(self, user):
        self.following.add(user)

    def unfollow(self, user):
        self.following.remove(user)

    def get_recommendations(self, count):
        """ 
        Get a list(count number) of unique users who are not being followed by the current user and are not the current user themselves
        """
        return User.objects.exclude(followers=self).exclude(id=self.id)[:count]

    @property
    def get_full_name(self):
        return f"{self.name.title()}"

    @property
    def get_short_name(self):
        return self.name.title()

    def __str__(self):
        return self.username
