import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';  
import ApiSettings from '../config/apiSettings';

import UserActions from '../actions/UserActions';

class ChangePasswordFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      password: "",
      conPassword: ""
    } 
	this.params = {};
	//this.dataId = this.props.location.query.id;
	//console.log("param:" + this.props.location.query.test);

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  }

  onChange() {
  }

  componentWillMount() { 
  }

  componentDidMount() { 
  }

  componentWillUnmount() { 
  }

  validateIsRequired(data)
  { 
	if(data.length <=0)
		return false;
	
	return true;
  }
  
  validateMaximum(data, maxLength)
  { 
	if(data.length > maxLength)
		return false;
	
	return true;
  }
  
  validateForm()
  {
	var validationMessage = "";
	var result = true;
	 
	if(this.state.password == "" || this.state.password == null)
	{
		validationMessage +='Password cannot be empty\n';
		result = false;
	}
	else if(this.state.password.length < 6)
	{
		validationMessage +='Password should have a minimum of 6 characters\n';
		result = false;
	} 
	if(this.state.conPassword == "" || this.state.conPassword == null)
	{
		validationMessage +='Confirm password cannot be empty\n';
		result = false;
	} 
	
	if(this.state.password != this.state.conPassword)
	{
		validationMessage +='Password does not match. Please check the confirm password\n';
		result = false;
	} 
	
	if(result == false)
		alert(validationMessage);
	
	return result;
  }
  
  handleChange1(event) { 
	this.setState({password: event.target.value});
  }
  handleChange2(event) { 
	this.setState({conPassword: event.target.value});
  }

  handleClick1(event) {   
	//alert("max length validation: " + this.validateMaximum(this.state.roleName, 10));
	//alert("is required validation: " + this.validateIsRequired(this.state.roleName));  
	if(this.validateForm()){
		this.addParams("username",localStorage.getItem('username')); 
		this.addParams("password",this.state.password); 
		
		UserActions.updatePassword(JSON.parse(JSON.stringify(this.params)));
		//RoleActions.editData(JSON.parse(JSON.stringify(this.params)));
	}
  }

  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    return (
	<div >
		
	  <h2>Change Password</h2>
	  <form ref="mainForm">
		<div className="form-group">
		  {this.props.location.query.id != null ? (		  
			  <div className="form-group row">
				<label className="col-sm-2 col-form-label">ID</label>
				<div className="col-sm-10">
				  <p className="form-control-static">localStorage.getItem('username') </p>
				</div>
			  </div>
		  ) :  ""}
		  <div>
			  <label >Password:</label>
			  <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.handleChange1} value={this.state.password} />
		  </div>
		  <div>
			  <label >Confirm Password:</label>
			  <input type="password" className="form-control" id="conPassword" placeholder="Enter password" onChange={this.handleChange2} value={this.state.conPassword} />
		  </div>
		</div>   
		 
		<input type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick1} />
	  </form>
	  
	</div>
	);
  }
}

export default ChangePasswordFormComponent;