import React from "react";
import './add-item-component.css';
import Constants from '../../../services/constants';


class AddItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: "",
            price: "",
            unit: "",
            description: "",
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    initialiseState= () => {
        this.setState({
            name: "",
            price: "",
            unit: "",
            description: "",
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
        formdData.append("name", this.state.name);
        formdData.append("price", Number(this.state.price));
        formdData.append("unit", this.state.unit);
        formdData.append("description", this.state.description);
        fetch(`${Constants.serverSideURL}items/`, {
            method: "POST",
            body: formdData
        })
        .then(response => response.json())
        .then(item => {
            alert(`Successfully added ${item.name}`);
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
                        <legend>Add Item</legend>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Name</label>
                            <div className="col-sm-6">
                                <input type="text" name="name" className="form-control" placeholder="Caswell meats beef" value={this.state.name} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Price</label>
                            <div className="col-sm-6">
                                <input type="number" name="price" className="form-control" placeholder="3.99" value={this.state.price} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Unit</label>
                            <div className="col-sm-6">
                                <input type="text" name="unit" className="form-control" placeholder="Kg" value={this.state.unit} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Description</label>
                            <div className="col-sm-6">
                                <textarea name="description" className="form-control" placeholder="Premium quality beef from dande" value={this.state.description} onChange={this.handleInputChange}></textarea>
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
            </div>

        )
    }
}

export default  AddItemComponent
