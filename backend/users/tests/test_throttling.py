import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
class TestThrottling:
    def setup_method(self):
        self.client = APIClient()
        self.register_url = "/api/users/register/"
        self.valid_payload = {
            "username": "test_user",
            "email": "test@example.com",
            "phone_number": "+79031234567",
            "first_name": "Test",
            "surname": "User",
            "last_name": "Example",
            "password": "secure_password123"
        }

    def test_throttling_limit(self):
        for _ in range(5):
            self.client.post(self.register_url, self.valid_payload)
        
        response = self.client.post(self.register_url, self.valid_payload)
        assert response.status_code == status.HTTP_429_TOO_MANY_REQUESTS
        assert "Request was throttled" in str(response.data)

    def test_authorization(self):
        user = User.objects.create_user(username="auth_user", password="password123")
        
        self.client.credentials(HTTP_X_FORWARDED_FOR="127.0.0.2")
        
        login_url = "/api/users/login/"
        response = self.client.post(login_url, {"username": "auth_user", "password": "password123"})
        
        assert response.status_code == status.HTTP_200_OK