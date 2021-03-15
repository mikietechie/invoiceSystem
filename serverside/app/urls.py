from django.urls import path
from .views import indexView, CustomerAPIView, CustomerAPIViewDetail, ItemAPIView, ItemAPIViewDetail

urlpatterns = [
    path('', indexView, name="index"),
    path('customers/', CustomerAPIView.as_view()),
    path('customers/<int:_id>/', CustomerAPIViewDetail.as_view()),
    path('items/', ItemAPIView.as_view()),
    path('items/<int:_id>/', ItemAPIViewDetail.as_view()),
]