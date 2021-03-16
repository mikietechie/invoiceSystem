import React from 'react';
import './all-invoices-component.css';
//  import InvoiceComponent from '../invoice-component/invoice-component';
import ViewInvoiceComponent from './view-invoice-component';
import InvoiceComponent from './invoice-component';



class AllInvoicesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            invoice: {}
        }
    }
    componentDidMount() {
        this.setState({invoice: this.props.invoices[0]})
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
                invoice => (<InvoiceComponent invoice={invoice} handleSelectForView={(invoice)=>this.changeSelectedInvoice(invoice)} handleChange={()=>this.props.handleChange()} key={invoice.id}/>)
            );   
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

                <div className="modal fade" id="editInvoiceModal" tabIndex="-1" role="dialog" aria-labelledby="Edit invoice modal" aria-hidden="true">
                    <ViewInvoiceComponent invoice={this.state.invoice}></ViewInvoiceComponent>
                </div>
            </React.Fragment>
        );
    }
}

export default AllInvoicesComponent;
