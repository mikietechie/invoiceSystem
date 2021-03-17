import React from 'react';
import Item from './item';

class AddItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: Item,
            itemKey: '',
            quantity: 0,
            total: 0
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    initialiseState= () => {
        this.setState({
            item: {},
            itemKey: '',
            quantity: 0,
            total: 0
        })
    }
    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
        this.updatePrice();
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.itemKey === '' || this.state.quantity < 1) {
            alert("Invalid data!")
            return false;
        } else {
            let item;
            item = this.props.items.filter((element)=>element.key === this.state.itemKey)[0];
            this.props.handleUpdateInvoiceItems(item);
            this.initialiseState();
        }
        return false;
    }
    componentDidUpdate() {
        try{
            let item;
            item = this.props.items.filter((element)=>element.key === this.state.itemKey)[0];
            this.setState({item: item, total: item.price*this.state.quantity})
        } catch {}
    }

    render() {
        let content;
        try {
            content = (
                <ul className="list-group">
                    <li className="list-group-item d-inline-flex justify-content-between">
                        <span className="text-center">
                            {this.state.item.name}
                        </span>
                        <span className="text-center">
                            @ <i className="fa fa-usd" aria-hidden="true"></i>{this.state.item.price}
                        </span>
                        <span className="text-center">
                            <i className="fa fa-times" aria-hidden="true"></i>{this.state.item.name}
                        </span>
                        <span className="text-center">
                            <i className="fa fa-calculator" aria-hidden="true"></i>{this.state.total}
                        </span>
                    </li>
                </ul>
            )
        } catch {
            content = '';
        }
        return (
            <React.Fragment>
                <form onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <legend>Item</legend>
                        <select name="itemKey" className="form-control" value={this.state.itemKey} onChange={this.handleInputChange}>
                            {this.props.items.map((item) => (
                                <option value={item.key}>
                                    {item.name} 
                                    @ <i className="fa fa-usd" aria-hidden="true"></i>{item.price} / {item.unit}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <legend>Quantity</legend>
                        <input type="number" name="quantity" className="form-control" value={this.state.quantity} onChange={this.handleInputChange} min="1"></input>
                    </fieldset>
                    <button type="submit" className="btn btn-outline-success">
                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                    </button>
                </form>
                <br/>
                {content}
            </React.Fragment>
        );
    }
}
export default addItemComponent;
