 

import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';

import HeaderActions from '../actions/HeaderActions';
import HeaderStore from '../stores/HeaderStore';

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
    this.onChange = this.onChange.bind(this);
	this.changePasswordClick = this.changePasswordClick.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
	//checkLoginState();
  }
  
  componentDidMount() { 
  }
  componentWillMount() {
    HeaderStore.addChangeListener(this.onChange);
  }
  
  handleChange1(event) { 
	this.setState({companyId: event.target.value});
	 
	  if(event.target.value.toLowerCase() == "all") 
		localStorage.setItem('companyid','%');
	  else	
		localStorage.setItem('companyid',event.target.value);
	 
	window.location.reload();
	//browserHistory.replace(this.props.location.pathname);   
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
  
  onChange() {
  
    var tempData1 = HeaderStore.getData1(); 
	var obj = {};
	obj.id = "All";
	obj.name = "All";
	tempData1.push(obj);
    this.setState({
      data1: tempData1
    });  
	 
	//if(this.state.data1 != null)
	if(localStorage.getItem('companyid') == null)
	{
		this.setState({
		  companyId: "All"
		});  
	}
	else
	{
		this.setState({
		  companyId: localStorage.getItem('companyid')
		});  
	}
	
	//alert(JSON.stringify(HeaderStore.getData1()));
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
	 
	let utilBar;
	let logoutButton;
	let companySelection; 
	let logo;
	if(localStorage.getItem('loggedIn') == "YES")
	{
		logo=(<div style={{width: "100%",paddingTop:5,paddingBottom:5,textAlign:"left" }}>
					<div style={{display:'inline',fontSize:25,fontFamily:'Arial'}}>
					Steven Ooi Demo
					</div>
					<div style={{display:'inline'}}>
					</div>								
				</div>);
	 		
		utilBar = <div style={{width:'100%'}}><span style={{fontSize:12,fontFamily:'Arial',display:'inline'}}>Username: <b> {localStorage.getItem('username')} </b></span></div>;		
        logoutButton = <div><button type="button" style={{display:"inline",textAlign:'left'}} className="btn btn-primary" onClick={this.logout}>Logout</button></div>;
	}
	
	return (
	
	  <div className="container-fluid" > 
        <Grid >
          <Row >
			<Col xs={3} style={{minWidth:230, width:'38%'}}>
				{logo}
			</Col> 
			<Col xs={3} style={{fontSize:12,paddingTop:16, width:'51%',textAlign:'right'}}>
				 {utilBar}		
			</Col>
			<Col xs={1}  style={{minWidth:50,paddingTop:8,paddingBottom:8, width:'10%',textAlign:'left'}}>
				{logoutButton}
			</Col>
		  </Row>
        </Grid> 
	</div>
	);
  }
}

export default HeaderComponent;