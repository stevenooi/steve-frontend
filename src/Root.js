// Root.js

import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import Index from './components/Index'; 

import App from './components/App';
import App2 from './components/App2';
import Login from './components/Login';
import Page1 from './components/Page1'; 
import User from './components/User';
import UserForm from './components/UserForm'; 
import TemplateForm from './components/TemplateForm';  
import Progress from './components/Progress';

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
				<Route path='/templateForm' component={TemplateForm} /> 
				<Route path='/progress' component={Progress} />
				<Route path='/user' component={User} />
				<Route path='/userForm' component={UserForm} /> 
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