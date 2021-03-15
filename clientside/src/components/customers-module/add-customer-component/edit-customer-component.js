import React from "react";
import './add-customer-component.css';
import Constants from '../../../services/constants';


class EditCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    //  Having problems with this approach to selecting and updating customers. The following is an ugly but effective work around ...
    initialiseForm = () => {
        document.querySelector('#editCustomerName').value = this.props.customer.name;
        document.querySelector('#editCustomerEmail').value = this.props.customer.email;
        document.querySelector('#editCustomerPhone').value = this.props.customer.phone;
        document.querySelector('#editCustomerAddress').value = this.props.customer.address;
        
    }

    componentDidUpdate() {
        this.initialiseForm()
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault();
        const formdData = new FormData()
        formdData.append("name", document.querySelector('#editCustomerName').value);
        formdData.append("email", document.querySelector('#editCustomerEmail').value);
        formdData.append("phone", document.querySelector('#editCustomerPhone').value);
        formdData.append("address", document.querySelector('#editCustomerAddress').value);
        fetch(`${Constants.serverSideURL}customers/${this.props.customer.id}/`, {
            method: "PUT",
            body: formdData
        })
        .then(response => response.json())
        .then(customer => {
            alert(`Successfully updated ${customer.name}`);
            this.props.handleChange();
        })
        .catch(() => alert("Failed to make changes"))
        return false;
    }

    render() {
        return(
            <React.Fragment>
                 <div className="container-fluid">
                    <form onSubmit={this.handleFormSubmit} id="editCustomerForm" name="editCustomerForm">
                        <legend>Update {this.props.customer.name}</legend>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Name</label>
                            <div className="col-sm-6">
                                <input type="text" name="name" id="editCustomerName" className="form-control" placeholder="Mike Micheals"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Email</label>
                            <div className="col-sm-6">
                                <input type="text" name="email" id="editCustomerEmail" className="form-control" placeholder="mm@mail.com"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Phone</label>
                            <div className="col-sm-6">
                                <input type="text" name="phone" id="editCustomerPhone" className="form-control" placeholder="+263771588144"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Address</label>
                            <div className="col-sm-6">
                                <textarea name="address" id="editCustomerAddress" className="form-control" placeholder="Stand # 11 Lorraine Drive, Bluffhill, Harare"></textarea>
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

export default  EditCustomerComponent
