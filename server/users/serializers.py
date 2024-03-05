from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['avatar'] = user.avatar.url
        return token


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', )


class UserSerializer(serializers.ModelSerializer):
    is_followed = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'email', 'bio', 'avatar',
                  'cover_image', 'following', 'followers', 'is_followed', 'date_joined',)
        read_only_fields = ('id', 'is_followed', 'date_joined',)

    def get_is_followed(self, obj):
        user = self.context.get('request', None)
        if user:
            return user in obj.followers.all()
        return False
