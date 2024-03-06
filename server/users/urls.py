from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup', views.UserRegistrationView.as_view(), name='signup'),
    path('login', views.MyTokenObtainPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('user', views.UserProfileView.as_view(), name='user_profile'),
    path('user/<str:username>', views.UserDetailsView.as_view(), name='user_details'),
    path('search/', views.UserSearchView.as_view(), name='user_search'),
]
