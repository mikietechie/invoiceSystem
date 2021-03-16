import React from 'react';

class ItemOptionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span onClick={()=>this.props.handleSelectOrClick(this.props.customer)} className="dropdown-item">
                {this.props.item.name} @ ${this.props.item.price} per {this.props.item.unit}
            </span>
        );
    }
}


export default ItemOptionComponent;
