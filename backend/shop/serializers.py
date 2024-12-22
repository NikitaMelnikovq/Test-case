from rest_framework import serializers

from .models import Product, Shop

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'shop',
            'description',
            'price',
            'stock',
            'image',
        ] 


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = [
            'id',
            'name',
            'owner',
            'location',
            'image',
        ]
