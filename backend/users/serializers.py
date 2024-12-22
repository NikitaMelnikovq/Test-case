from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'phone_number',
            'first_name',
            'surname',
            'last_name',
            'password',
            'is_superuser',
            'is_staff',
        ]
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data):
        phone_number = data.get('phone_number')
        email = data.get('email')

        if not phone_number and not email:
            raise serializers.ValidationError("Необходимо указать email или номер телефона.")

        if email:
            try:
                validate_email(email)
            except ValidationError:
                raise serializers.ValidationError({"email": "Некорректный адрес электронной почты."})

        if phone_number:
            import re
            pattern = r'^\+?\d{7,15}$'
            if not re.match(pattern, phone_number):
                raise serializers.ValidationError({"phone_number": "Некорректный формат номера."})

        return data
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_superuser'] = self.user.is_superuser
        return data