import React from 'react';
import './all-items-component.css';
import ItemComponent from '../item-component/item-component';
import AddItemComponent from '../add-item-component/add-item-component';
import EditItemComponent from '../add-item-component/edit-item-component';

class AllItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            item: {name:'',price:0,unit:'',phone:'address'}
        }
    }

    changeSelectedItem = (item) =>{
        this.setState({
            item: item
        })
    }

    render() {
        let tbodyContent;
        if (this.props.items.length === 0) {
            tbodyContent = <tr className="py-2 text-center text-info">
                    <th colSpan="6">
                        <div>It seems like there are no items yet 
                            <button className="btn btn-link" data-toggle="modal" data-target="#addItemModal">
                                click here
                            </button> to add!!!
                        </div>
                    </th>
                </tr>
        } else {
            tbodyContent = this.props.items.map(
                item => (<ItemComponent item={item} handleSelectForUpdate={()=>this.changeSelectedItem(item)} handleChange={()=>this.props.handleChange()} key={item.id}/>)
            );   
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <h1 className="text-center text-success py-1">Items</h1>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th scope="row"><i className="fa fa-asterisk" aria-hidden="true"></i> ID</th>
                                <th><i className="fa fa-tag" aria-hidden="true"></i> Name</th>
                                <th><i className="fa fa-usd" aria-hidden="true"></i> Price</th>
                                <th><i className="fa fa-spoon" aria-hidden="true"></i> Unit</th>
                                <th><i className="fa fa-list" aria-hidden="true"></i> Description</th>
                                <th>
                                    <span className="hidden-sm-down"><i className="fa fa-crop" aria-hidden="true"></i> actions</span>
                                    <button className="btn btn-outline-primary border-info rounded-circle ml-1" data-toggle="modal" data-target="#addItemModal">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {tbodyContent}
                            </tbody>
                    </table>    
                </div>

                <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="Add item modal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div className="modal-content">
                            <AddItemComponent handleChange={()=>this.props.handleChange()}/>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editItemModal" tabIndex="-1" role="dialog" aria-labelledby="Edit item modal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div className="modal-content">
                            <EditItemComponent handleChange={()=>this.props.handleChange()} item={this.state.item}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

AllItemsComponent.propTypes = {};

export default AllItemsComponent;
