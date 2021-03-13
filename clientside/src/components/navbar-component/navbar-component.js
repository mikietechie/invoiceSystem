import React from 'react';
import './navbar-component.css';
import ButtonComponent from '../element-components/button-component'


const NavbarComponent = (props) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white">
            <a className="navbar-brand" href="#">Invoice Sys</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <ButtonComponent clickHandler={props.loadSalesView()} text="Sales" classes="dropdown-item"/>
                    </li>
                    <li className="nav-item">
                        <ButtonComponent clickHandler={props.loadCustomersView()} text="Customers" classes="dropdown-item"/>
                    </li>
                    <li className="nav-item">
                        <ButtonComponent clickHandler={props.loadItemsView()} text="Items" classes="dropdown-item"/>
                    </li>
                    <li className="nav-item">
                        <ButtonComponent clickHandler={props.loadInvoicesView()} text="Invoices" classes="dropdown-item"/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarComponent