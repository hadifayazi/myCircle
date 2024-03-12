from .models import Post, Comment
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source=_('user.username'))
    avatar = serializers.ReadOnlyField(source=_('user.avatar.url'))

    class Meta:
        model = Comment
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url


class MyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source=_('user.username'))
    avatar = serializers.ReadOnlyField(source=_('user.avatar.url'))
    iliked = serializers.SerializerMethodField(read_only=True)
    ishared = serializers.SerializerMethodField(read_only=True)

    likes_count = serializers.SerializerMethodField(read_only=True)
    sharing_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_iliked(self, obj):
        user = self.context.get('request').user
        return True if user in obj.likded.all() else False

    def get_ishared(self, obj):
        user = self.context.get('request').user
        return True if user in obj.shared.all() else False

    def get_likes_count(self, obj):
        return obj.likded.count()

    def get_sharing_count(self, obj):
        return obj.shared.count()
