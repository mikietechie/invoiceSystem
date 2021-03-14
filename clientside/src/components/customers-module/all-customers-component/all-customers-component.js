import React from 'react';
import './all-customers-component.css';
import CustomerComponent from '../customer-component/customer-component';
import AddCustomerComponent from '../add-customer-component/add-customer-component';

class AllCustomersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let tbodyContent;
        if (this.props.customers.length === 0) {
            tbodyContent = <tr colSpan="5" className="py-2 text-center text-info"></tr>
        } else {
            tbodyContent = this.props.customers.map(customer => (<CustomerComponent customer={customer} handleClick={()=>alert(customer.name)} handleChange={()=>this.props.handleChange()} key={customer.id}/>));   
        }
        return (
            <div>
                <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th scope="row">ID</th>
                            <th><i className="fa fa-user-circle" aria-hidden="true"></i> Name</th>
                            <th><i className="fa fa-phone" aria-hidden="true"></i> Phone</th>
                            <th><i className="fa fa-envelope-o" aria-hidden="true"></i> Email</th>
                            <th><i className="fa fa-map-o" aria-hidden="true"></i> Address</th>
                            <th><i className="fa fa-crop" aria-hidden="true"></i> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tbodyContent}
                        </tbody>
                </table>
                
                <AddCustomerComponent handleChange={()=>this.props.handleChange()}/>
                

            </div>
        );
    }
}

AllCustomersComponent.propTypes = {};

export default AllCustomersComponent;
