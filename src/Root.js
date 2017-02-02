// Root.js

import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import Index from './components/Index'; 
import MenuDetail from './components/MenuDetail';

import App from './components/App';
import App2 from './components/App2';
import Login from './components/Login';
import Page1 from './components/Page1';

import AuthenticationFilter from './components/AuthenticationFilter';

class Root extends Component {
	constructor(props) {
		super(props	);
		//localStorage.setItem('loggedIn', "NO"); 
	}
	
	render() {
	return (
	  <Router history={this.props.history}> 

		<Route path='/' component={AuthenticationFilter}>
			<Route path="/home" component={App}>
				<IndexRoute component={Index}/> 
				<Route path='/contact/:id' component={MenuDetail} />
				<Route path='/page1' component={Page1} />
			</Route>
		</Route> 
		
		<Route component={App2}> 
			<Route path='/login' component={Login} /> 
			<Route path='/404' component={Login}/> 
		</Route> 
		{/* Set redirection for uncatched path*/}
		<Redirect from='*' to='/404' />
		
	  </Router>
	);
	}
}

export default Root;