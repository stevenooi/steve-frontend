
//import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
// import AuthActions from '../actions/AuthActions';
// import AuthStore from '../stores/AuthStore';

import { browserHistory } from 'react-router';

class HeaderComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
	//checkLoginState();
  }
  
  login() { 
	browserHistory.replace("/login");
  }

  logout() { 
	localStorage.setItem('loggedIn', "NO"); 
    this.setState({authenticated: false}); 
	browserHistory.replace("/login");
  }


  render() {
	  
  let loginLogout = null;
  
  if (localStorage.getItem('loggedIn') == "YES" )
  {
	  loginLogout = <NavItem onClick={this.logout}>Logout</NavItem>;
  }
  else
  {
	  loginLogout = <NavItem onClick={this.login}>Login</NavItem>;
  }
  
	const navStyle = { 
		paddingBottom : 0,
		marginBottom : 0,
		borderRadius: 0,
		borderBottomWidth: 0,
		minWidth: 500,
	};
    return (
    
	 
      <Navbar style={navStyle}>
        <Navbar.Header style={{width:580}}>
          <Navbar.Brand  >
            <a href="#">Summit Innovations - Cod Manager 2</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav >
		{loginLogout}
        </Nav>
      </Navbar> 
    );
  }
}

export default HeaderComponent;