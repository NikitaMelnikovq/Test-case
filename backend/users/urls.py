from django.urls import path 
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserListView,
    UserUpdateView,
    UserDeleteView,
    RegisterUserAPIView,
    CustomTokenObtainPairView,
)

app_name = 'users'

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name='register-user'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('', UserListView.as_view(), name='user-list'),
    path('<int:id>/', UserUpdateView.as_view(), name='user-update'),
    path('<int:user_id>/delete/', UserDeleteView.as_view(), name='user-delete'),
]
