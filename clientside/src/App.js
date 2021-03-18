import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavbarComponent from './components/navbar-component/navbar-component';
import AllCustomersComponent from './components/customers-module/all-customers-component/all-customers-component';
import AllItemsComponent from './components/items-module/all-items-component/all-items-component';
import InvoiceComponent from './components/invoice-module/invoice-component/invoice-component';
import AllInvoicesComponent from './components/invoice-module/all-invoices-component/all-invoices-component';

import Constants from './services/constants';
import Item from './interfaces/item';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			customers: [],
			items: [],
			invoices: [],
			view: ''
		}
	}
	loadSalesView = ()=>{this.setState({view: ''})}
	loadCustomersView = ()=>{this.setState({view: 'customers'})}
	loadItemsView = ()=>{this.setState({view: 'items'})}
	loadInvoicesView = ()=>{this.setState({view: 'invoices'})}

    componentDidMount() {
        this.fetchCustomers();
		this.fetchItems();
		this.fetchInvoices()
    }

    fetchCustomers = () => {
        fetch(`${Constants.serverSideURL}customers/`)
        .then(response => response.json())
        .then(customers => {
            this.setState(
                {customers: customers}
            )
        })
    }

    fetchItems = () => {
        fetch(`${Constants.serverSideURL}items/`)
        .then(response => response.json())
        .then(items => {
            this.setState(
                {items: items.map((item) => new Item(item))}
            )
        })
    }

    fetchInvoices = () => {
        fetch(`${Constants.serverSideURL}invoices/`)
        .then(response => response.json())
        .then(invoices => {
            this.setState(
                {invoices: invoices}
            )
        })
    }

	render() {
		const getView = () => {
			if (this.state.view === 'invoices') {
				return <AllInvoicesComponent invoices={this.state.invoices}></AllInvoicesComponent>
			} else if (this.state.view === 'customers'){
				return <AllCustomersComponent customers={this.state.customers} handleChange={()=>this.fetchCustomers()}/>
			} else if (this.state.view === 'items'){
				return <AllItemsComponent items={this.state.items} handleChange={()=>this.fetchItems()}/>
			}else{
				return <InvoiceComponent items={this.state.items} customers={this.state.customers} handleChange={()=>this.fetchInvoices()}/>
			}
		}
		return(
			<div className="App">
				<NavbarComponent loadSalesView={()=>this.loadSalesView} loadCustomersView={()=>this.loadCustomersView} loadItemsView={()=>this.loadItemsView} loadInvoicesView={()=>this.loadInvoicesView}/>
				{getView()}
			</div>
		)
	}
}

export default App;
