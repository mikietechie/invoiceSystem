from .models import Customer, Invoice, InvoiceLine, Item
from . serializers import CustomerSerializer, InvoiceSerializer, InvoiceLineSerializer, ItemSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

#from django.db.models import Q
from django.shortcuts import render

import json
from django.http import JsonResponse


def indexView(request):
    return render(request, "app/index.html", {})

# Create your views here.
class CustomerAPIView(APIView):
    def __init__(self, *args):
        super(CustomerAPIView, self).__init__(*args)
    
    def get(self, request):
        customers = Customer.objects.all()
        serializedCustomers = CustomerSerializer(customers, many=True)
        return Response(serializedCustomers.data)
    
    def post(self, request):
        serializedCustomer = CustomerSerializer(data=request.data)
        if serializedCustomer.is_valid():
            serializedCustomer.save()
            return Response(serializedCustomer.data,status=status.HTTP_201_CREATED)
        return Response(serializedCustomer.errors,status=status.HTTP_400_BAD_REQUEST)


class CustomerAPIViewDetail(APIView):
    def getCustomer(self,_id):
        try:
            customer = Customer.objects.get(pk=_id)
            return customer
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self,request,_id):
        customer = self.getCustomer(_id)
        serializedCustomer = CustomerSerializer(customer)
        return Response(serializedCustomer.data)

    def put(self,request,_id):
        customer = self.getCustomer(_id)
        serializedForUpdateCustomer = CustomerSerializer(customer, data=request.data)
        if serializedForUpdateCustomer.is_valid():
            serializedForUpdateCustomer.save()
            return Response(serializedForUpdateCustomer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializedForUpdateCustomer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self,request,_id):
        user = self.getCustomer(_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
            
