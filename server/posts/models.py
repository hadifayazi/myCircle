from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import User


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True)
    likded = models.ManyToManyField(User, related_name='likded', blank=True, default=None)
    shared = models.ManyToManyField(User, related_name='shared', blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        ordering = _('created_at',)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        ordering = _('created_at',)
