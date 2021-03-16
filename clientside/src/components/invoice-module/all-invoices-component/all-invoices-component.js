import React from 'react';
import './all-invoices-component.css';


class AllInvoicesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            invoice: {}
        }
    }

    changeSelectedInvoice = (invoice) => this.setState({invoice: invoice})

    render() {
        let tbodyContent;
        if (this.props.invoices.length === 0) {
            tbodyContent = <tr className="py-2 text-center text-info">
                <th colSpan="6">
                    <div>It seems like there are no invoices yet 
                        <button className="btn btn-link" data-toggle="modal" data-target="#addInvoiceModal">
                            click here
                        </button> to add!!!
                    </div>
                </th>
            </tr>
        } else {
            tbodyContent = this.props.invoices.map(
                invoice => (<tr key={invoice.id}>
                    <th scope="row">{invoice.id}</th>
                    <td>{invoice.customer.name}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.total}</td>
                    <td>
                        <button type="button" className="btn btn-outline-primary rounded" onClick={()=>this.changeSelectedInvoice(invoice)} data-toggle="modal" data-target="#viewInvoiceModal">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>)
            );   
        }
        let modalContent;
        try {
            modalContent = (
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">Invoice <i className="fa fa-hashtag" aria-hidden="true"></i>{this.state.invoice.id} Detail</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <div className="text-left"></div>
                            </ul>
                        
                            <div className="container-fluid">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.invoice.invoiceLine.map(
                                        invoiceLine => <tr key={invoiceLine.id} className="">
                                            <td>{invoiceLine.item.name}</td>
                                            <td><i className="fa fa-usd" aria-hidden="true"></i> {invoiceLine.item.price}</td>
                                            <td><i className="fa fa-times" aria-hidden="true"></i> {invoiceLine.quantity}</td>
                                            <td><i className="fa fa-usd" aria-hidden="true"></i> {invoiceLine.total}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item d-inline-flex justify-content-between">
                                    <span className="text-left">Total <i className="fa fa-calculator" aria-hidden="true"></i></span>
                                    <span>
                                    <i className="fa fa-usd" aria-hidden="true"></i> {this.state.invoice.total}
                                    </span>
                                </li>
                                <li className="list-group-item d-inline-flex justify-content-between">
                                    <span className="text-left">Customer <i className="fa fa-user" aria-hidden="true"></i></span>
                                    <span>
                                        {this.state.invoice.customer.name}
                                    </span>
                                </li>
                                <li className="list-group-item d-inline-flex justify-content-between">
                                    <span className="text-left">Date <i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    <span>
                                        {this.state.invoice.date}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>)
        } catch {
            modalContent = (
                <div className="w-25 m-auto p-5 my-5 border border-primary fa fa-spinner"></div>
            )
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <h1 className="text-center text-success py-1">Invoices</h1>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th scope="row"><i className="fa fa-asterisk" aria-hidden="true"></i> ID</th>
                                <th><i className="fa fa-id-card" aria-hidden="true"></i> Customer</th>
                                <th><i className="fa fa-calender" aria-hidden="true"></i> Date</th>
                                <th><i className="fa fa-usd" aria-hidden="true"></i> Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                {tbodyContent}
                            </tbody>
                    </table>
                </div>
                <div className="modal fade" id="viewInvoiceModal" tabIndex="-1" role="dialog" aria-labelledby="View Invoice Modal" aria-hidden="true">
                    {modalContent}
                </div>
            </React.Fragment>
        );
    }
}

export default AllInvoicesComponent;
