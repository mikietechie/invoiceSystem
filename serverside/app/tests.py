from django.test import TestCase
from .models import Item, Customer, Invoice, InvoiceLine

#   Please not that no selenium webdriver testing was carried out because my machine i.e the developers machine was throwing an error saying that my google chrome webdriver dependancies were not installed

class RoughTestCase(TestCase):
    """
    Test case for mainly my django objects and their relations and functionality

    NB: Please not that for comparing equality of monetory values from calculations I have used assertAlmostEqual instead of assertEqual because Python the programming language in application 
    like many other languages kinda has problems returning acurate to the last digit floating point values. (If you know you know)
    """
    def setUp(self):
        """Please do not blutantly add, edit, update or delete the following dummy objects as most of the test methods heavily rely on the state they are in i.e quantities and properties.s"""
        #   Setup dummy custmers
        Customer.objects.create(name="Mike Zinyoni", phone="+263784528370", email="mzinyoni7@outlook.com", address="Stand #11 Lorraine Drive, Bluffhill Harare Zimbabwe")
        Customer.objects.create(name="Josh Nyamulomo", phone="+26356839021", email="jnyamulomo@gmail.com", address="Stand #5 Lorraine Drive, Bluffhill Harare Zimbabwe")
        Customer.objects.create(name="Brian Mpofu", phone="+26390839021", email="brianmpofu@gmail.com", address="Stand #25 Lorraine Drive, Bluffhill Harare Zimbabwe")
        #   Setup dummy items
        Item.objects.create(name="Chicken thighs", description="Chunky big chicken thighs from Irvines chickens", price=4.99, unit="Kg")
        Item.objects.create(name="Beef steak", description="Premium quality beef steak from Caswell meats", price=6.99, unit="Kg")
        Item.objects.create(name="Kefalos Youghgut", description="Healthy and tasty youghgut available in strawberry, banana and butter milk flavour", price=5.21, unit="litre")
        Item.objects.create(name="Eversharp pen", description="Pens available in: blue , red, green and black ink", price=0.99, unit="dozen")
        Item.objects.create(name="Proton Bread", description="Fresh 700g bread", price=0.9, unit="loaf")
        #   Setup dummy Invoice along side the invoice line
        invoice_1 = Invoice(customer=Customer.objects.get(id=1),total=0)
        invoice_1.save()
        InvoiceLine.objects.create(invoice=invoice_1,item=Item.objects.get(id=1), quantity=2, amount=(Item.objects.get(id=1).price*2))
        InvoiceLine.objects.create(invoice=invoice_1,item=Item.objects.get(id=4), quantity=1, amount=(Item.objects.get(id=4).price*1))
        InvoiceLine.objects.create(invoice=invoice_1,item=Item.objects.get(id=3), quantity=6, amount=(Item.objects.get(id=3).price*6))
        invoice_1.total = sum(invoiceLine.amount for invoiceLine in invoice_1.invoiceLines.all())
        invoice_1.save()
        
        invoice_2 = Invoice(customer=Customer.objects.get(id=3),total=0)
        invoice_2.save()
        InvoiceLine.objects.create(invoice=invoice_2,item=Item.objects.get(id=5), quantity=12, amount=(Item.objects.get(id=5).price*12))
        InvoiceLine.objects.create(invoice=invoice_2,item=Item.objects.get(id=4), quantity=2, amount=(Item.objects.get(id=4).price*2))
        invoice_2.total = sum(invoiceLine.amount for invoiceLine in invoice_2.invoiceLines.all())
        invoice_2.save()
        
        invoice_3 = Invoice(customer=Customer.objects.get(id=2),total=0)
        invoice_3.save()
        InvoiceLine.objects.create(invoice=invoice_3,item=Item.objects.get(id=5), quantity=12, amount=(Item.objects.get(id=5).price*12))
        InvoiceLine.objects.create(invoice=invoice_3,item=Item.objects.get(id=4), quantity=2, amount=(Item.objects.get(id=4).price*2))
        InvoiceLine.objects.create(invoice=invoice_3,item=Item.objects.get(id=1), quantity=2, amount=(Item.objects.get(id=1).price*2))
        InvoiceLine.objects.create(invoice=invoice_3,item=Item.objects.get(id=4), quantity=1, amount=(Item.objects.get(id=4).price*1))
        InvoiceLine.objects.create(invoice=invoice_3,item=Item.objects.get(id=3), quantity=6, amount=(Item.objects.get(id=3).price*6))
        invoice_3.total = sum(invoiceLine.amount for invoiceLine in invoice_3.invoiceLines.all())
        invoice_3.save()

        invoice_4 = Invoice(customer=Customer.objects.get(id=1),total=0)
        invoice_4.save()
        InvoiceLine.objects.create(invoice=invoice_4,item=Item.objects.get(id=1), quantity=6, amount=(Item.objects.get(id=1).price*6))
        invoice_4.total = sum(invoiceLine.amount for invoiceLine in invoice_4.invoiceLines.all())
        invoice_4.save()
    
    def test_customers_save(self):
        self.assertEqual(Customer.objects.count(),3)
        self.assertEqual(Customer.objects.all()[2].id, 1, msg="Customers are not in alphabetical order by name")
        self.assertEqual(Customer.objects.get(id=3).name, "Brian Mpofu", msg="Customer ids do not auto increment by one")
    
    def test_items_save(self):
        self.assertEqual(Item.objects.count(),5)
        self.assertEqual(Item.objects.get(id=5).name, "Proton Bread", msg="Item ids do not auto increment by one")
    
    def test_invoice_lines_save(self):
        self.assertEqual(InvoiceLine.objects.count(),11)
        self.assertAlmostEqual(InvoiceLine.objects.get(id=10).amount, InvoiceLine.objects.get(id=10).item.price*InvoiceLine.objects.get(id=10).quantity, delta=0.1,msg="total for an invoice line row is not accurate")
    
    def test_invoice_invoice_line_related_query(self):
        invoice = Invoice.objects.get(id=3)
        total = 0
        for invoiceLine in invoice.invoiceLines.all():
            total += invoiceLine.amount
        self.assertAlmostEqual(invoice.total, total, delta=0.1, msg="Invoice total does not equal the sum totals of the invoice's lines")
        self.assertEqual(invoice.invoiceLines.all().count(), 5, msg="Invoice's invoice lines count does not match the number of invoice lines referencing it!!!")
    
    def test_customer_invoice_line_related_query(self):
        customer = Customer.objects.get(id=1)
        customerInvoices = customer.invoices.all()
        self.assertEqual(customerInvoices.count(),2, msg="Number of invoices referencing customer does not equal customers actual purchases number")

