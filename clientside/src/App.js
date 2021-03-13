import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavbarComponent from './components/navbar-component/navbar-component';

/*
class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NavbarComponent />
			</div>
		)
	}
}*/
const App = () => {
	return (
		<div className="App">
			<NavbarComponent />
		</div>
	)
}

export default App;
