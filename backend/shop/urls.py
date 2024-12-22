from django.urls import path 

from .views import (
    ShopListCreateView,
    ShopRetrieveUpdateDestroyView,
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    ShopProductListView,
)

app_name = "shop"

urlpatterns = [
    path('', ShopListCreateView.as_view(), name='shop-list-create'),
    path('<int:id>/', ShopRetrieveUpdateDestroyView.as_view(), name='shop-detail'),

    path('<int:shop_id>/products/', ShopProductListView.as_view(), name='shop-product-list'), 

    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:id>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
]