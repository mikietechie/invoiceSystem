import React from 'react';

export default class ViewInvoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <React.Fragment>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"><i class="fa fa-asterisk" aria-hidden="true"></i>{this.props.invoice.id}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-info">
                                        date <i class="fa fa-calendar" aria-hidden="true"></i>: {this.props.invoice.date}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        by <i class="fa fa-user" aria-hidden="true"></i>: {this.props.invoice.customer}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        amount <i class="fa fa-usd" aria-hidden="true"></i>: {this.props.total}
                                    </li>
                                    <li className="list-group-item list-group-item-info">
                                        Items <i class="fa fa-list" aria-hidden="true"></i>:
                                        <ul>
                                            {this.props.invoice.invoiceLine.map(invoiceLine => (
                                            <li>
                                                {invoiceLine.item.name} @ <i class="fa fa-usd" aria-hidden="true"></i>
                                                {invoiceLine.item.price} <i class="fa fa-times" aria-hidden="true"></i> {invoiceLine.item.quantity}
                                                =<i class="fa fa-calculator" aria-hidden="true"></i> {invoiceLine.total}
                                            </li>))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}