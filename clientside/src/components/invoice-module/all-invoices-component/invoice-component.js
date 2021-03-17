import React from 'react'

class InvoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }
    
    render() {
        return(
            <React.Fragment>
                <tr>
                    <th scope="row">{this.props.invoice.id}</th>
                    <td>{this.props.invoice.customer}</td>
                    <td>{this.props.invoice.date}</td>
                    <td>{this.props.invoice.total}</td>
                    <td>
                        <button type="button" className="btn btn-outline-primary rounded" onClick={()=>this.props.handleSelectForView(this.props.invoice)}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default InvoiceComponent