import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
class TestAuthorization:
    def setup_method(self):
        self.client = APIClient()
        self.login_url = "/api/users/login/"
        self.user = User.objects.create_user(username="auth_user", password="password123")

    def test_successful_login(self):
        response = self.client.post(self.login_url, {"username": "auth_user", "password": "password123"})
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    def test_invalid_credentials(self):
        response = self.client.post(self.login_url, {"username": "auth_user", "password": "wrong_password"})
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "access" not in response.data

    def test_missing_fields(self):
        response = self.client.post(self.login_url, {"username": "auth_user"})
        assert response.status_code == status.HTTP_400_BAD_REQUEST