import React from 'react';

export default class ViewInvoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><i className="fa fa-asterisk" aria-hidden="true"></i>{this.props.invoice.id}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-info">
                                        date <i className="fa fa-calendar" aria-hidden="true"></i>: {this.props.invoice.date}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        by <i className="fa fa-user" aria-hidden="true"></i>: {this.props.invoice.customer}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        amount <i className="fa fa-usd" aria-hidden="true"></i>: {this.props.invoice.total}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        Items <i className="fa fa-list" aria-hidden="true"></i>:
                                        <ul>
                                            {this.props.invoice.invoiceLine.map(invoiceLine => (
                                            <li key={invoiceLine.id}>
                                                {invoiceLine.item.name} @ <i className="fa fa-usd" aria-hidden="true"></i>
                                                {invoiceLine.item.price} <i className="fa fa-times" aria-hidden="true"></i> {invoiceLine.quantity}
                                                =<i className="fa fa-calculator" aria-hidden="true"></i> {invoiceLine.total}
                                            </li>))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}