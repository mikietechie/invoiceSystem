from django.urls import path
from .views import indexView, CustomerAPIView, CustomerAPIViewDetail, ItemAPIView, ItemAPIViewDetail, InvoiceAPIView, InvoiceAPIViewDetail

urlpatterns = [
    path('', indexView, name="index"),
    path('customers/', CustomerAPIView.as_view()),
    path('customers/<int:_id>/', CustomerAPIViewDetail.as_view()),
    path('items/', ItemAPIView.as_view()),
    path('items/<int:_id>/', ItemAPIViewDetail.as_view()),
    path('invoices/', InvoiceAPIView.as_view()),
    path('invoices/<int:_id>/', InvoiceAPIViewDetail.as_view()),
]