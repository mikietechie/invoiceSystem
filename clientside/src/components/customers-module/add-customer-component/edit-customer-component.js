import React from "react";
import './add-customer-component.css';
import Constants from '../../../services/constants';


class EditCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: this.props.customer.name,
            phone: this.props.customer.phone,
            email: this.props.customer.email,
            address: this.props.customer.address,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    initialiseState= () => {
        this.setState({
            name: "",
            phone: "",
            email: "",
            address: "",
        })
    }
    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const formdData = new FormData()
        formdData.append("name",this.state.name);
        formdData.append("email",this.state.email);
        formdData.append("phone",this.state.phone);
        formdData.append("address",this.state.address);
        fetch(`${Constants.serverSideURL}customers/${this.props.customer.id}/`, {
            method: "PUT",
            body: formdData
        })
        .then(response => response.json())
        .then(customer => {
            alert(`Successfully updated ${customer.name}`);
            this.props.handleChange();
            this.initialiseState();
        })
        .catch(fault => console.log(fault))
        return false;
    }

    render() {
        return(
            <React.Fragment>
                 <div className="container">
                    <form onSubmit={this.handleFormSubmit}>
                        <legend>Update {this.props.customer.name}</legend>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Name</label>
                            <div className="col-sm-6">
                                <input type="text" name="name" className="form-control" placeholder="Mike Micheals" value={this.state.name} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Email</label>
                            <div className="col-sm-6">
                                <input type="text" name="email" className="form-control" placeholder="mm@mail.com" value={this.state.email} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Phone</label>
                            <div className="col-sm-6">
                                <input type="text" name="phone" className="form-control" placeholder="+263771588144" value={this.state.phone} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Address</label>
                            <div className="col-sm-6">
                                <textarea name="address" className="form-control" placeholder="Stand # 11 Lorraine Drive, Bluffhill, Harare" value={this.state.address} onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12 d-inline-flex justify-content-around">
                                <button type="reset" className="btn btn-warning mx-auto" onClick={()=>this.initialiseState()}><i className="fa fa-minus" aria-hidden="true"></i> Reset</button>
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
