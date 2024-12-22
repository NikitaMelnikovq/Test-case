from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated


from .models import Product, Shop
from .serializers import ProductSerializer, ShopSerializer

class CommonListCreateMixin(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        return self.model.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return super().get_permissions()


class CommonRetrieveUpdateDestroyMixin(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return self.model.objects.all()

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return super().get_permissions()


class ShopListCreateView(CommonListCreateMixin):
    serializer_class = ShopSerializer
    model = Shop
    filterset_fields = ['name', 'location']


class ShopRetrieveUpdateDestroyView(CommonRetrieveUpdateDestroyMixin):
    serializer_class = ShopSerializer
    model = Shop


class ProductListCreateView(CommonListCreateMixin):
    serializer_class = ProductSerializer
    model = Product
    filterset_fields = ['name', 'price', 'shop']


class ProductRetrieveUpdateDestroyView(CommonRetrieveUpdateDestroyMixin):
    serializer_class = ProductSerializer
    model = Product


class ShopProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'price']

    def get_queryset(self):
        shop_id = self.kwargs.get('shop_id')
        return Product.objects.filter(shop__id=shop_id)