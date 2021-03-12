from django.contrib import admin
from .models import Customer, Invoice, InvoiceLine, Item


# Register your models here.
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name','email', 'phone')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name','description','price','unit')
    list_filter = ('price',)
    search_fields = ('name','price')
    ordering = ('name','price')

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('date','customer', 'total')
    list_filter = ('date','customer', 'total')
    search_fields = ('date','customer', 'total')
    ordering = ('date','customer')

@admin.register(InvoiceLine)
class InvoiceLineAdmin(admin.ModelAdmin):
    list_display = ('invoice','item', 'quantity')
    list_filter = ('invoice','item')
    search_fields = ('invoice','item', 'quantity')
    ordering = ('invoice','item')