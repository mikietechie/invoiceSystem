import React from "react";
import './add-customer-component.css';


class AddCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: "",
            phone: "",
            email: "",
            address: "",
        };
        this.onAddCustomerFormSubmitHandler = this.onAddCustomerFormSubmitHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    onAddCustomerFormSubmitHandler = (e) => {
        e.preventDefault();
        alert("form submit attempted")
        // Validation later
        return false;
    }
    

    render() {
        return(
            <div>
                <div class="container">
                    <form onSubmit={this.onAddCustomerFormSubmitHandler}>
                        <div class="form-group row">
                            <label class="col-sm-1-12 col-form-label">Name</label>
                            <div class="col-sm-1-12">
                                <input type="text" class="form-control" placeholder="Mike Micheals" value={this.state.name} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-1-12 col-form-label">Email</label>
                            <div class="col-sm-1-12">
                                <input type="text" class="form-control" placeholder="mm@mail.com" value={this.state.email} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-1-12 col-form-label">Phone</label>
                            <div class="col-sm-1-12">
                                <input type="text" class="form-control" placeholder="+263771588144" value={this.state.phone} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <fieldset>
                            <legend>Address</legend>
                            <textarea placeholder="Stand # 11 Lorraine Drive, Bluffhill, Harare" value={this.state.address} onChange={this.handleInputChange}></textarea>
                        </fieldset>
                        <div class="form-group row">
                            <div class="col-12">
                                <button type="reset" class="btn btn-warning"><i class="fa fa-minus" aria-hidden="true"></i> Reset</button>
                                <button type="submit" class="btn btn-primary"><i class="fa fa-send" aria-hidden="true"></i> Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default  AddCustomerComponent
