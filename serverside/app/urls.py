from django.urls import path
from .views import indexView, CustomerAPIView, CustomerAPIViewDetail

urlpatterns = [
    path('', indexView, name="index"),
    path('customers/', CustomerAPIView.as_view()),
    path('customers/<int:_id>/', CustomerAPIViewDetail.as_view()),
]