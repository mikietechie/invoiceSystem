import React from "react";
import './add-item-component.css';
import Constants from '../../../services/constants';


class EditItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    //  Having problems with this approach to selecting and updating items. The following is an ugly but effective work around ...
    initialiseForm = () => {
        document.querySelector('#editItemName').value = this.props.item.name;
        document.querySelector('#editItemPrice').value = this.props.item.price;
        document.querySelector('#editItemUnit').value = this.props.item.unit;
        document.querySelector('#editItemDescription').value = this.props.item.description;
        
    }

    componentDidUpdate() {
        this.initialiseForm()
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault();
        const formdData = new FormData()
        formdData.append("name", document.querySelector('#editItemName').value);
        formdData.append("price", document.querySelector('#editItemPrice').value);
        formdData.append("unit", document.querySelector('#editItemUnit').value);
        formdData.append("description", document.querySelector('#editItemDescription').value);
        fetch(`${Constants.serverSideURL}items/${this.props.item.id}/`, {
            method: "PUT",
            body: formdData
        })
        .then(response => response.json())
        .then(item => {
            alert(`Successfully updated ${item.name}`);
            this.props.handleChange();
        })
        .catch(() => alert("Failed to make changes"))
        return false;
    }

    render() {
        return(
            <React.Fragment>
                 <div className="container-fluid">
                    <form onSubmit={this.handleFormSubmit} id="editItemForm" name="editItemForm">
                        <legend>Update {this.props.item.name}</legend>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Name</label>
                            <div className="col-sm-6">
                                <input type="text" name="name" id="editItemName" className="form-control" placeholder="Caswell meats beef"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Email</label>
                            <div className="col-sm-6">
                                <input type="text" name="number" id="editItemPrice" className="form-control" placeholder="3.99"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Phone</label>
                            <div className="col-sm-6">
                                <input type="text" name="phone" id="editItemUnit" className="form-control" placeholder="Kg"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Address</label>
                            <div className="col-sm-6">
                                <textarea name="address" id="editItemDescription" className="form-control" placeholder="Premium quality beef from dande"></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12 d-inline-flex justify-content-around">
                                <button type="reset" className="btn btn-warning mx-auto"><i className="fa fa-minus" aria-hidden="true"></i> Reset</button>
                                <button type="submit" className="btn btn-primary mx-auto"><i className="fa fa-send" aria-hidden="true"></i> Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default  EditItemComponent
