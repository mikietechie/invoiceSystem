import React from 'react';
import './all-customers-component.css';
import CustomerComponent from '../customer-component/customer-component';
import AddCustomerComponent from '../add-customer-component/add-customer-component';
import EditCustomerComponent from '../add-customer-component/edit-customer-component';

class AllCustomersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            customer: {name:'',email:'',phone:'address'}
        }
    }

    changeSelectedCustomer = (customer) =>{
        this.setState({
            customer: customer
        })
    }

    render() {
        let tbodyContent;
        if (this.props.customers.length === 0) {
            tbodyContent = <tr className="py-2 text-center text-info">
                <th colSpan="6">
                    <div>It seems like there are no customers yet 
                        <button className="btn btn-link" data-toggle="modal" data-target="#addCustomerModal">
                            click here
                        </button> to add!!!
                    </div>
                </th>
            </tr>
        } else {
            tbodyContent = this.props.customers.map(
                customer => (<CustomerComponent customer={customer} handleSelectForUpdate={()=>this.changeSelectedCustomer(customer)} handleChange={()=>this.props.handleChange()} key={customer.id}/>)
            );   
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <h1 className="text-center text-success py-1">Customers</h1>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th scope="row"><i className="fa fa-asterisk" aria-hidden="true"></i> ID</th>
                                <th><i className="fa fa-id-card" aria-hidden="true"></i> Name</th>
                                <th><i className="fa fa-phone" aria-hidden="true"></i> Phone</th>
                                <th><i className="fa fa-envelope-o" aria-hidden="true"></i> Email</th>
                                <th><i className="fa fa-map-marker" aria-hidden="true"></i> Address</th>
                                <th>
                                    <span className="hidden-sm-down"><i className="fa fa-crop" aria-hidden="true"></i> actions</span>
                                    <button className="btn btn-outline-primary border-info rounded-circle ml-1" data-toggle="modal" data-target="#addCustomerModal">
                                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {tbodyContent}
                            </tbody>
                    </table>    
                </div>

                <div className="modal fade" id="addCustomerModal" tabIndex="-1" role="dialog" aria-labelledby="Add customer modal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div className="modal-content">
                            <AddCustomerComponent handleChange={()=>this.props.handleChange()}/>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editCustomerModal" tabIndex="-1" role="dialog" aria-labelledby="Edit customer modal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div className="modal-content">
                            <EditCustomerComponent handleChange={()=>this.props.handleChange()} customer={this.state.customer}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

AllCustomersComponent.propTypes = {};

export default AllCustomersComponent;
