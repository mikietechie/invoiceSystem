import React from "react";
import './customer-component.css';
import ButtonComponent from '../../element-components/button-component';
import Constants from '../../../services/constants';


class CustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    /*
    deleteCustomer = () => {
        confirmDelete = confirm(`Are you sure you want to delete ${this.props.customer.name}`);
        if (confirmDelete === true) {
			fetch(`${Constants.serverSideURL}customers/${this.props.customer.id}`, {method: "DELETE"})
			.then(response => response.json())
			.then(result => this.props.handleChange())
		}
    }*/

    render() {
        return(
            <tr>
                <th scope="row" onClick={()=>this.props.handleClick()}>{this.props.customer.id}</th>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                <td>{this.props.customer.phone}</td>
                <td>{this.props.customer.address}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="">
                        <ButtonComponent clickHandler={()=>alert("Ready to edit")}  className="btn btn-success border-info rounded-circle" text={<i className="fa fa-edit"></i>}/>
                        <ButtonComponent clickHandler={()=>alert("Ready to delete")}  className="btn btn-danger border-info rounded-circle" text={<i className="fa fa-trash"></i>}/>
                    </div>
                </td>
            </tr>
        )
    }
}

export default  CustomerComponent