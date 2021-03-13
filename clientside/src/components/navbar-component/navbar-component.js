import React from 'react';
import './navbar-component.css';
import ButtonComponent from '../element-components/button-component'


const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white">
            <a className="navbar-brand" href="#">Invoice Sys</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Customers</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <ButtonComponent clickHandler={()=>alert("Loading Add Customer Logic")} text="Add Customer" classes="dropdown-item"/>
                            <ButtonComponent clickHandler={()=>alert("Loading Customers view")} text="All Customers" classes="dropdown-item"/>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarComponent