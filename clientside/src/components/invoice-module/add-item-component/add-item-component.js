import React from 'react';
import Item from './item';

class addItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID:0,
            itemName: '',
            itemPrice: 0,
            quantity: 0,
            price: 0
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        this.setState({
            price: this.state.itemPrice*this.state.quantity
        })
    }
    initialiseState= () => {
        this.setState({
            itemID:0,
            itemName: '',
            itemPrice: 0,
            quantity: 0,
            price: 0.0
        })
    }
    updatePrice = () => {this.setState({price: this.state.itemPrice*this.state.quantity})}
    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: Number(value).toFixed()})
        this.updatePrice();
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const item = new Item({id: this.state.itemID, name:this.state.itemName, price:this.state.itemPrice}, this.state.quantity);
        alert(this.state.itemName)
        this.props.handleUpdateInvoiceItems(item);
        this.initialiseState();
        return false;
    }
    handleSelectOrClick = (item) => {
        this.setState({
            id: item.id, name: item.name, price: item.price
        })
        this.updatePrice();
    }

    render() {
        return (
            <React.Fragment>
                <form className="form-inline" onSubmit={this.handleFormSubmit}>
                    <div className="dropdown open">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Item
                        </button>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            {this.props.items.map(itemElement => (<span className="dropdown-item" onClick={()=>this.handleSelectOrClick(itemElement)} key={itemElement.id}>{itemElement.name}</span>))}
                        </div>
                    </div>
                    {this.state.itemName}

                    <label className="sr-only">Quantity</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">#</div>
                        </div>
                        <input type="number" className="form-control" name="quantity" placeholder="quantity"  value={this.state.quantity} onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add</button>
                </form>
                <label className="">Name {this.state.itemName}</label>
                <br />
                <label className="">Quantity {this.state.quantity}</label>
                <br />
                <label className="">Price {this.state.price}</label>
            </React.Fragment>
        );
    }
}
export default addItemComponent;
