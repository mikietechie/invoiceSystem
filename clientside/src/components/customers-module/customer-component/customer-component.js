import React from "react";
import './customer-component.css';
import ButtonComponent from '../../element-components/button-component';
import EditCustomerComponent from '../add-customer-component/edit-customer-component';
import Constants from '../../../services/constants';


class CustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    
    deleteCustomer = () => {
        /*
        //  Proper procedure for a delete operation but it does not seem to work in react....
        if (confirm(`Are you sure you want to delete ${this.props.customer.name} permanently`)) {
            fetch(`${Constants.serverSideURL}customers/${this.props.customer.id}`, {method: "DELETE"})
            .then(response => response.json())
            .then(result => this.props.handleChange())
        }
        */
        fetch(`${Constants.serverSideURL}customers/${this.props.customer.id}`, {method: "DELETE"})
        .then(() => {alert(`${this.props.customer.name} was deleted successfully!`);this.props.handleChange()})
    }

    render() {
        return(
            <React.Fragment>
                <tr>
                    <th scope="row" onClick={()=>this.props.handleClick()}>{this.props.customer.id}</th>
                    <td>{this.props.customer.name}</td>
                    <td>{this.props.customer.email}</td>
                    <td>{this.props.customer.phone}</td>
                    <td>{this.props.customer.address}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="">
                            <button className="btn btn-success border-info rounded-circle mr-1"  data-toggle="modal" data-target="#modelId"><i className="fa fa-edit"></i></button>
                            <ButtonComponent clickHandler={()=>this.deleteCustomer()}  classes="btn btn-danger border-info rounded-circle" text={<i className="fa fa-trash"></i>}/>
                        </div>
                    </td>
                </tr>
                
                <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <EditCustomerComponent handleChange={()=>this.props.handleChange()} customer={this.props.customer}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default  CustomerComponent