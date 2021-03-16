from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(max_length=128)
    phone = models.CharField(max_length=128)
    address = models.TextField(max_length=256)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return f"{self.name}"
    def __repr__(self):
        return f"{self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address
        }


class Item(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=256)
    price = models.FloatField()
    unit = models.CharField(max_length=32)

    class Meta:
        verbose_name = 'Item'
        verbose_name_plural = 'Items'

    def __str__(self):
        return f"{self.name} @{self.price}/{self.unit}"

    def __repr__(self):
        return f"{self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "unit": self.unit
        }


class Invoice(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey("Customer", on_delete=models.CASCADE, related_name="customer_invoices")
    total = models.FloatField()

    class Meta:
        verbose_name = 'Invoice'
        verbose_name_plural = 'Invoices'

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "customer": self.customer.serialize(),
            "total": self.total,
            "invoiceLine": [invoice_line.serialize() for invoice_line in self.invoice_lines.all()]
        }
    
    def __str__(self):
        return f"{self.id} by {self.customer.name}"


class InvoiceLine(models.Model):
    invoice = models.ForeignKey("Invoice", on_delete=models.CASCADE, related_name="invoice_lines")
    item = models.ForeignKey("Item", on_delete=models.CASCADE, related_name="item_invoice_lines")
    quantity = models.PositiveIntegerField()
    amount = models.FloatField(default=0)

    class Meta:
        verbose_name = 'InvoiceLine'
        verbose_name_plural = 'InvoiceLines'

    def serialize(self):
        return {
            "invoiceID": self.invoice.id,
            "id": self.id,
            "item": self.item.serialize(),
            "quantity": self.quantity,
            "total": self.amount
        }