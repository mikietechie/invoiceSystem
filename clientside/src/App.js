import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavbarComponent from './components/navbar-component/navbar-component';
import ButtonComponent from './components/element-components/button';

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
			<ButtonComponent clickHandler={()=>alert("hi")} text="click me" classes="btn-success mt-5"/>
		</div>
	)
}

export default App;
