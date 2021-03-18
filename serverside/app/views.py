from .models import Customer, Invoice, InvoiceLine, Item
from . serializers import CustomerSerializer, InvoiceSerializer, InvoiceLineSerializer, ItemSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from django.shortcuts import render

import json
from django.http import JsonResponse

"""
    Initially i wanted to use an ordinary django app with links to a bit of resct js scripts
    but could not because i could not link to a babel.js file offline successfully hence I 
    resorted to using th create-react-app cli tool for the frontend...
"""
def indexView(request):
    return render(request, "app/index.html", {})

        

class InvoiceAPIView(APIView):
    def __init__(self, *args):
        super(InvoiceAPIView, self).__init__(*args)
    
    def get(self, request):
        invoices = Invoice.objects.all()
        return JsonResponse([invoice.serialize() for invoice in invoices], status=200, safe=False)
    
    def post(self, request):
        data = json.loads(request.body)
        invoice = Invoice.objects.create(customer=Customer.objects.get(pk=data['customer'].id), total=data['total'])
        invoice.save()
        InvoiceLine.objects.bulk_create(
            [InvoiceLine(invoice=invoice, item=Item.objects.get(pk=item.id), quantity=item.quantity, amount=(item.price*item.quantity)) for item in data.invoiceItems]
        )
        return JsonResponse(invoice.serialize(), status=201)


class InvoiceAPIViewDetail(APIView):
    def getInvoice(self,_id):
        try:
            invoice = Invoice.objects.get(pk=_id)
            return invoice
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self,request,_id):
        invoice = self.getInvoice(_id)
        return JsonResponse(invoice.serialize(), status=200, safe=False)
    #   Invoices cannot be updated or deleted since it would be a violation of data integrity!!!!
        

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
        customer = self.getCustomer(_id)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemAPIView(APIView):
    def __init__(self, *args):
        super(ItemAPIView, self).__init__(*args)
    
    def get(self, request):
        items = Item.objects.all()
        serializedItems = ItemSerializer(items, many=True)
        return Response(serializedItems.data)
    
    def post(self, request):
        serializedItem = ItemSerializer(data=request.data)
        if serializedItem.is_valid():
            serializedItem.save()
            return Response(serializedItem.data,status=status.HTTP_201_CREATED)
        return Response(serializedItem.errors,status=status.HTTP_400_BAD_REQUEST)


class ItemAPIViewDetail(APIView):
    def getItem(self,_id):
        try:
            item = Item.objects.get(pk=_id)
            return item
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self,request,_id):
        item = self.getItem(_id)
        serializedItem = ItemSerializer(item)
        return Response(serializedItem.data)

    def put(self,request,_id):
        item = self.getItem(_id)
        serializedForUpdateItem = ItemSerializer(item, data=request.data)
        if serializedForUpdateItem.is_valid():
            serializedForUpdateItem.save()
            return Response(serializedForUpdateItem.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializedForUpdateItem.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self,request,_id):
        item = self.getItem(_id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


            
