import React from "react";
import './customer-component.css';


class CustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <tr onClick={()=>props.cliclHandler}>
                <th scope="row">{this.props.customer.id}</th>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                <td>{this.props.customer.phone}</td>
                <td>{this.props.customer.address}</td>
            </tr>
        )
    }
}

export default  CustomerComponent