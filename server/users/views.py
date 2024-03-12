from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from .serializers import UserCreateSerializer,  MyTokenObtainPairSerializer, UserSerializer
from .models import User


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
   API endpoint to register a new user.
   """

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        user = serializer.save()
        return Response(UserCreateSerializer(user).data, status=status.HTTP_201_CREATED,)


class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving user details, updating and deleting it
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(instance).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDetailsView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'username'

    def retrieve(self, request, *args, **kwargs):
        user_instance = self.get_object()
        serializer = self.get_serializer(user_instance)
        return Response(serializer.data)


class UserSearchView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('search')
        if query:
            return User.objects.filter(Q(username__icontains=query) | Q(name__icontains=query))
        return User.objects.none()


class UserRecommendationsView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_recommendations(count=10)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated,])
def follow(request):
    logedin_user = request.user
    username = request.data.get('username')

    if username and username != logedin_user.username:
        try:
            user_to_follow = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if logedin_user.following.filter(username=username).exists():
            logedin_user.unfollow(user_to_follow)
            return Response({'detail': f"You have Unfollowed {user_to_follow}"}, status=status.HTTP_200_OK)

        logedin_user.follow(user_to_follow)
        return Response({'detail': f"You have followed {user_to_follow}"}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)
