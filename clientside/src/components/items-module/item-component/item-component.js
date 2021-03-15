import React from "react";
import './item-component.css';
import ButtonComponent from '../../element-components/button-component';
import Constants from '../../../services/constants';


class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    
    deleteItem = () => {
        /*
        //  Proper procedure for a delete operation but it does not seem to work in react....
        if (confirm(`Are you sure you want to delete ${this.props.item.name} permanently`)) {
            fetch(`${Constants.serverSideURL}items/${this.props.item.id}`, {method: "DELETE"})
            .then(response => response.json())
            .then(result => this.props.handleChange())
        }
        */
        fetch(`${Constants.serverSideURL}items/${this.props.item.id}`, {method: "DELETE"})
        .then(() => {alert(`${this.props.item.name} was deleted successfully!`);this.props.handleChange()})
    }

    render() {
        return(
            <React.Fragment>
                <tr>
                    <th scope="row">{this.props.item.id}</th>
                    <td>{this.props.item.name}</td>
                    <td>{this.props.item.price}</td>
                    <td>{this.props.item.unit}</td>
                    <td>{this.props.item.description}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="">
                            <button className="btn btn-success border-info rounded-circle mr-1" onClick={()=>this.props.handleSelectForUpdate()} data-toggle="modal" data-target="#editItemModal"><i className="fa fa-edit"></i></button>
                            <ButtonComponent clickHandler={()=>this.deleteItem()}  classes="btn btn-danger border-info rounded-circle" text={<i className="fa fa-trash"></i>}/>
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default  ItemComponent