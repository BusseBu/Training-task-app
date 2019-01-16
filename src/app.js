import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TasksPage from './components/TasksPage';
import AuthForm from './components/AuthForm';
import './app.css';

class App extends Component {
	render() {
		return (
			<main className="container">
				<Switch>
					<Route path="/auth" component={AuthForm} />
					<Route path="/" component={TasksPage} />
				</Switch>
			</main>
		);
	}
}

export default App;
