import React from 'react';
import './invoice-component.css';
import AddItemComponent from '../add-item-component/add-item-component';
import Constants from '../../../services/constants';
//  import ItemComponent from '../add-item-component/item-component';
//  import Item from '../../../interfaces/item';

class InvoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            customerKey: '',
            customer: {},
            invoiceItems: [],
            total: 0
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
        let customer;
        customer = this.props.customers.filter((element)=>element.key === this.state.customerKey)[0];
        this.setState({customer: customer})
    }
    handleUpdateInvoiceItems = (item) => {
        let items = this.state.invoiceItems.copyWithin();
        console.log(items);
        for (let index = 0; index < items.length; index++) {
            if (items[index].key === item.key) {
                items[index].quantity = item.quantity;
                return;
            }
        }
        items.push(item)
        this.updateInvoiceItems(items)
    }
    updateInvoiceItems = (newItemsList) => {
        this.setState({invoiceItems: newItemsList})
        this.updateTotal();
    }
    updateInvoiceCustomer = (customer) => {
        this.setState({customer: customer})
    }
    updateTotal = () => {
        let total = 0;
        for (const item in this.state.invoiceItems) {
            total += item.getAmount;   
        }
        this.setState({total: total})
    }
    handleDecrement = (item) => {
        let items = this.state.invoiceItems.copyWithin();
        console.log(items);
        for (let index = 0; index < items.length; index++) {
            if (items[index].id === item.id) {
                items[index].update(item.quantity-1)
                return ;
            }
        }
    }
    handleIncrement = (item) => {
        let items = this.state.invoiceItems.copyWithin();
        console.log(items);
        for (let index = 0; index < items.length; index++) {
            if (items[index].id === item.id) {
                items[index].update(item.quantity+1)
                return ;
            }
        }
    }
    
    handleDrop = (item) => {
        let items = this.state.invoiceItems.filter((itemElement)=>itemElement.id !== item.id);
        this.updateInvoiceItems(items)
    }
    handleSubmitinvoice = () => {
        data = {
            customer: this.state.customer,
            invoiceItems: this.state.invoiceItems,
            total: this.state.total
        }
        fetch(`${Constants.serverSideURL}invoices/`, {
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .then((invoice ) => {
            alert(`${invoice.customer.name} successfully purchased items worth ${invoice.total}`);
            this.props.handleChange();
            this.initialiseState();
        })
    }
    initialiseState = () => {
        this.setState({
            customer: {},
            invoiceItems: [],
            total: 0
        })
    }
    handleChangeCustomer =() => {
        try {
            let customer = this.props.customers.filter((element)=> element.key === this.state.customerKey)[0]
            this.setState({customer: customer})
        } catch {}
    }
    
    render() {
        let tbodyContent;
        let submitInvoiceContent = '';
        if (this.state.invoiceItems.length === 0) {
            tbodyContent = (
                <tr className="py-2 text-center text-info">
                        <th colSpan="4">It seems like there are no items yet !!!</th>
                </tr>
            )
            submitInvoiceContent = (
                <div className="container-fluid d-inline-flex justify-content-between">
                    <span className="mx-auto">
                        <i className="fa fa-calculator" aria-hidden="true"></i>
                        total: <i className="fa fa-usd" aria-hidden="true"></i>
                        {this.state.total}
                    </span>
                    <span className="mx-auto">
                        <button className="btn btn-outline-success">
                            <i className="fa fa-send" aria-hidden="true"></i>
                            Submit
                        </button>
                    </span>
                </div>
            )
        } else {
            tbodyContent = this.state.invoiceItems.map(
                (item, index) => (
                    <React.Fragment>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="">
                                    <button className="btn btn-success border-info rounded-circle mr-1" onClick={()=>this.handleIncrement(item)}><i className="fa fa-plus"></i></button>
                                    <button className="btn btn-primary border-info rounded-circle mr-1" onClick={()=>this.handleDecrement(item)}><i className="fa fa-minus"></i></button>
                                    <button className="btn btn-danger border-info rounded-circle mr-1" onClick={()=>this.handleDrop(item)}><i className="fa fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                )
            );   
        }
        return (
            <React.Fragment>
                <header>
                    <h1 className="text-center"> New Sale</h1>
                </header>
                <div className="container-fluid">
                    <fieldset>
                        <legend>customer</legend>
                        <select name="customerKey" className="form-control" value={this.state.customerKey} onChange={this.handleInputChange}>
                            {this.props.customers.map((customer) => (
                                <option value={customer.key}>
                                    {customer.name} <i className="fa fa-id-badge" aria-hidden="true"></i>
                                    {customer.id}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <AddItemComponent handleUpdateInvoiceItems={(item)=>this.handleUpdateInvoiceItems(item)} items={this.props.items} />
                    <div className="table-responsive">
                        <table className="table table-striped table-inverse table-responsive">
                            <thead className="thead-inverse">
                                <tr>
                                    <th><i className="fa fa-tag" aria-hidden="true"></i> Name</th>
                                    <th><i className="fa fa-usd" aria-hidden="true"></i> Price</th>
                                    <th><i className="fa fa-shopping-cart" aria-hidden="true"></i> Quantity</th>
                                    <th>
                                        <span className="hidden-sm-down"><i className="fa fa-crop" aria-hidden="true"></i> actions</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {tbodyContent}
                                </tbody>
                        </table>  
                    </div>
                </div>
                <hr />
                {submitInvoiceContent}
            </React.Fragment>
        );
    }
}

export default InvoiceComponent;
