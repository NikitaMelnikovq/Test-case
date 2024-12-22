import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()

@pytest.mark.django_db
class TestRegister:
    def setup_method(self):
        self.client = APIClient()
        self.url = "/api/users/register/"
        self.valid_payload = {
            "username": "test_user",
            "email": "test@example.com",
            "phone_number": "+79031234567",
            "first_name": "Test",
            "surname": "User",
            "last_name": "Example",
            "password": "secure_password123"
        }

    def test_successful_registration(self):
        response = self.client.post(self.url, self.valid_payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username="test_user").exists()

    def test_duplicate_username(self):
        User.objects.create_user(username="test_user", email="existing@example.com", password="password")
        response = self.client.post(self.url, self.valid_payload)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "username" in response.data

    def test_invalid_payload(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload["email"] = "invalid-email"

        self.client.credentials(HTTP_X_FORWARDED_FOR="127.0.0.2")
        response = self.client.post(self.url, invalid_payload)
        assert response.status_code == status.HTTP_400_BAD_REQUEST