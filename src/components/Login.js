import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'; 
import Header from './Header'; 
import { Grid, Row, Col } from 'react-bootstrap'; 
import AuthenticateActions from '../actions/AuthenticateActions';
import AuthenticateStore from '../stores/AuthenticateStore';
import { browserHistory } from 'react-router';
import AuthenticateUtil from '../utils/general/AuthenticateUtil';

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return d.getTime();
  //return d.getDate() + "-" + d.getMonth() + "-" + (d.getYear() + 1900) + " " + time;
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

class AppComponent extends Component {
constructor(props) {
    super(props)
    this.handleChange1 = this.handleChange1.bind(this); 
    this.handleChange2 = this.handleChange2.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
	this.handleKeyPress = this.handleKeyPress.bind(this);
	
    this.onChange = this.onChange.bind(this);
    this.state ={
		username:"",
		password:"",
		companyId:"",
		companyName:"",
		errorMsg:"",
		loginResult: ""
    }
	this.params = {};
	
}

handleKeyPress(event)
{
	//console.log("key pressed:" + event.key);
	if (event.key === 'Enter') {
		this.handleSubmit(event);
    }
}

  onChange() { 
    this.setState({
      loginResult: AuthenticateStore.getLoginResult() 
    });   
	 
	if(this.state.loginResult != null)
	{ 
		if(this.state.loginResult.responseCode == 1)
		{ 
			AuthenticateUtil.loginUser(this.state.username,this.state.loginResult.roleCode,this.state.loginResult.companyId,this.state.loginResult.companyName);
			
		}
		else
		{
			this.setState({errorMsg: this.state.loginResult.message});
		}
	}
	else
	{
		this.setState({errorMsg: "Server error. Please contact administrator"});
	}
  }
  
  handleChange1(event) {
	console.log("event.target : " + event.target.name);
	 
    this.setState({username: event.target.value});
  }
  
  handleChange2(event) {
	console.log("event.target : " + event.target.name);
    if (event.key === 'Enter') {
		this.handleSubmit(event);
    }
	this.setState({password: event.target.value});
  }
  
  handleSubmit(event) {
	console.log("Submit button clicked");
	this.addParams("username",this.state.username);
	this.addParams("password",this.state.password);
	AuthenticateActions.login(JSON.parse(JSON.stringify(this.params)));
	console.log("Submit button clicked Afters");
  }
  
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  
  componentWillMount() {
    AuthenticateStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
     
  }

  componentWillUnmount() {
    AuthenticateStore.removeChangeListener(this.onChange);
  }

  render() {
    return (
      <div style={{textAlign:'center',borderStyle:'none',borderWidth:'1px',borderColor:'#ff5050',borderRadius:'15px'}}> 
	  <div style={{}}>
	    <table style={{width:260,marginLeft:"calc((100% - 260px)/2 )"}}>
		<tr><td style={{width:200,textAlign:'center',padding:25}}><img src="images/loginhead.jpg" alt="" style={{marginLeft:0,width:120,textAlign:"center"}} /></td></tr> 
		<tr><td style={{width:200,textAlign:'center',fontSize:13,paddingBottom:15,borderLeftStyle:'none',borderWidth:'1px',borderColor:'#ff5050',borderRadius:'15px'}}><span className="glyphicon glyphicon-user" style={{paddingRight:10}}/><input type="Text" name="username" ref="username" style={{textAlign:'center',width:200,fontSize:10,height:25}} placeholder="Enter Your Username" value={this.state.username} onKeyPress={this.handleKeyPress} onChange={this.handleChange1}/></td></tr>
		<tr><td style={{width:200,textAlign:'center',fontSize:13,paddingBottom:15,borderLeftStyle:'none',borderRightStyle:'none',borderWidth:'1px',borderColor:'#ff5050',borderRadius:'15px'}}><span className="glyphicon glyphicon-lock" style={{paddingRight:10}}/><input type="password" style={{textAlign:'center',fontSize:10,width:200,height:25}} value={this.state.password} placeholder="Enter Your Password" onKeyPress={this.handleKeyPress} onChange={this.handleChange2}/></td></tr>
		<tr><td style={{width:200,textAlign:'center',fontSize:13,paddingBottom:15}}><input type="button" className="btn btn-primary btn-block" value="LOG IN" onClick={this.handleSubmit}/></td></tr>
		<tr><td style={{width:200,textAlign:'center',fontSize:13}}><font color="red">{this.state.errorMsg}</font></td></tr>
		</table>
		</div>
		 
      </div>
    );
  }
}

export default AppComponent;