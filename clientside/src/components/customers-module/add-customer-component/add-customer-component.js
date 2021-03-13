import React from "react";
import './add-customer-component.css';
import Constants from '../../../services/constants';


class AddCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.initialiseState();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    initialiseState= () => {
        this.state = {
            name: "",
            phone: "",
            email: "",
            address: "",
        };
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
        fetch(`${Constants.serverSideURL}customers/`, {
            method: "POST",
            body: formdData
        })
        .then(response => response.json())
        .then(customer => {
            alert(`Successfully added ${customer.name}`);
            this.props.handleChange();
            this.initialiseState();
        })
        .catch(fault => console.log(fault))
        return false;
    }

    render() {
        return(
            <div>
                <div className="container">
                    <form onSubmit={this.handleFormSubmit}>
                        <legend>Add Customer</legend>
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
                        <fieldset>
                            <legend>Address</legend>
                            <textarea name="address" placeholder="Stand # 11 Lorraine Drive, Bluffhill, Harare" value={this.state.address} onChange={this.handleInputChange}></textarea>
                        </fieldset>
                        <div className="form-group row">
                            <div className="col-12">
                                <button type="reset" className="btn btn-warning mx-auto"><i className="fa fa-minus" aria-hidden="true"></i> Reset</button>
                                <button type="submit" className="btn btn-primary mx-auto"><i className="fa fa-send" aria-hidden="true"></i> Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default  AddCustomerComponent
