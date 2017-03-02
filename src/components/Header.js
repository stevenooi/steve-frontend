
//import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
// import AuthActions from '../actions/AuthActions';
// import AuthStore from '../stores/AuthStore';

import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

function columnCapitalize(data)
{ 
	return data.replace(/\b\w/g, l => l.toUpperCase());
}

class HeaderComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
	this.changePasswordClick = this.changePasswordClick.bind(this);
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

  changePasswordClick()
  {
	  
	browserHistory.replace("/changePassword");
	  //alert('Change password function not available yet!' );
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
	
	//let utilBar = <div><span className="i4header_userinfo"  style={{display:'inline'}}>Client: <b> {localStorage.getItem('username')} </b>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="#" onClick={this.changePasswordClick}>Change Password</a>&nbsp;<div>		
    //let logoutButton = <button type="button" style={{display:"inline",textAlign:'left'}} className="btn btn-primary" onClick={this.logout}>Logout</button>;
	let utilBar;
	let logoutButton;
	let logo;
	if(localStorage.getItem('loggedIn') == "YES")
	{
		logo=(<div style={{width: "100%",paddingTop:5,paddingBottom:5,textAlign:"left" }}>
					<div style={{display:'inline'}}><img src="images/Summit_COD_Manager_Logo_Light_Large.png" alt="" style={{width:200,marginLeft:-20,display: "block",textAlign:"left"}} /></div>
					<div style={{display:'inline'}}>
					</div>								
				</div>);
		utilBar = <div style={{width:'100%'}}><span className="i4header_userinfo"  style={{display:'inline'}}>Client: <b> Hungry Jack </b>&nbsp;&nbsp;|&nbsp;&nbsp;</span><span className="i4header_userinfo"  style={{display:'inline'}}>Username: <b> {localStorage.getItem('username')} </b>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="#" onClick={this.changePasswordClick}>Change Password</a>&nbsp;</div>;		
        logoutButton = <div ><button type="button" style={{display:"inline",textAlign:'left'}} className="btn btn-primary" onClick={this.logout}>Logout</button></div>;
	}
	return (
	
	  <div className="container-fluid" >
        <Grid >
          <Row >
			<Col xs={5} style={{minWidth:230, width:'40%'}}>
				{logo}
			</Col>
			<Col xs={4} style={{fontSize:12,minWidth:280,paddingLeft:20,paddingTop:16, width:'49%',textAlign:'right'}}>
				{utilBar}		
			</Col>
			<Col xs={2}  style={{minWidth:50,paddingLeft:20,paddingTop:8,paddingBottom:8, width:'10%',textAlign:'left'}}>
				{logoutButton}
			</Col>
		</Row>
        </Grid> 
	</div>
	);
  }
}

export default HeaderComponent;