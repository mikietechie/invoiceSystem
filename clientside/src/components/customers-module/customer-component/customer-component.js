import React from "react";
import './customer-component.css';
import ButtonComponent from '../../element-components/button-component';
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
                    <th scope="row">{this.props.customer.id}</th>
                    <td>{this.props.customer.name}</td>
                    <td>{this.props.customer.email}</td>
                    <td>{this.props.customer.phone}</td>
                    <td>{this.props.customer.address}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="">
                            <button className="btn btn-success border-info rounded-circle mr-1" onClick={()=>this.props.handleSelectForUpdate()} data-toggle="modal" data-target="#editCustomerModal"><i className="fa fa-edit"></i></button>
                            <ButtonComponent clickHandler={()=>this.deleteCustomer()}  classes="btn btn-danger border-info rounded-circle" text={<i className="fa fa-trash"></i>}/>
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default  CustomerComponent