import React from 'react';

class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.item.name}</td>
                    <td>{this.props.item.quantity}</td>
                    <td>{this.props.item.price}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="">
                            <button className="btn btn-success border-info rounded-circle mr-1" onClick={this.props.handleIncrement(this.props.item)}><i className="fa fa-plus"></i></button>
                            <button className="btn btn-primary border-info rounded-circle mr-1" onClick={this.props.handleDecrement(this.props.item)}><i className="fa fa-minus"></i></button>
                            <button className="btn btn-danger border-info rounded-circle mr-1" onClick={this.props.handleDrop(this.props.item)}><i className="fa fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default ItemComponent;
