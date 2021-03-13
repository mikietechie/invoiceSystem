import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavbarComponent from './components/navbar-component/navbar-component';
import AllCustomersComponent from './components/customers-module/all-customers-component/all-customers-component';
import Constants from './services/constants';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			customers: [],
			items: [],
			view: ''
		}
	}
	loadSalesView = ()=>{this.setState({view: ''})}
	loadCustomersView = ()=>{this.setState({view: 'customers'})}
	loadItemsView = ()=>{this.setState({view: 'items'})}
	loadInvoicesView = ()=>{this.setState({view: 'invoices'})}

    componentDidMount() {
        this.fetchCustomers();
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

	render() {
		const getView = () => {
			if (this.state.view === 'invoices') {
				return <h1>Invoices</h1>
			} else if (this.state.view === 'customers'){
				return <AllCustomersComponent customers={this.state.customers} handleChange={()=>this.fetchCustomers()}/>
			} else if (this.state.view === 'items'){
				return <h1>Items</h1>
			}else{
				return <h1>sales</h1>
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
