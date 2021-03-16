import React from 'react';
import './invoice-component.css';
import AddItemComponent from '../add-item-component/add-item-component';
import ItemComponent from '../add-item-component/item-component';

class InvoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            customer: {},
            invoiceItems: [],
            total: 0
        };
    }
    handleUpdateInvoiceItems = (item) => {
        let items = this.state.invoiceItems.copyWithin();
        console.log(items);
        items.forEach(element => {
            if(element.id === item.id){
                element.update(item.quantity);
                this.updateInvoiceItems(items)
                return ;
            }
        });
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

    render() {
        let tbodyContent;
        if (this.state.invoiceItems.length === 0) {
            tbodyContent = <tr className="py-2 text-center text-info">
                    <th colSpan="4">It seems like there are no items yet !!!</th>
                </tr>
        } else {
            tbodyContent = this.state.invoiceItems.map(
                item => (<ItemComponent item={item} key={item.id}/>)
            );   
        }
        return (
            <React.Fragment>
                <header>
                    <h1 className="text-center"> New Sale</h1>
                </header>
                <div className="container-fluid">
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
                <div className="container-fluid py-2 text-right pr-5">
                    <span>Total <b>{this.state.total}</b></span>
                </div>
            </React.Fragment>
        );
    }
}

export default InvoiceComponent;
