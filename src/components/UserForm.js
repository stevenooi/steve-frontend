import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import ApiSettings from '../config/apiSettings';

import CustomDropDown from '../utils/CustomDropDown';

class UserFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      userName: "",
      password: "",
      roleId: "",
      conPassword: "",
      data1: [],
      allBrandData: []
    } 
	this.params = {};
	//this.dataId = this.props.location.query.id;
	//console.log("param:" + this.props.location.query.test);

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  } 

  onChange() {
    this.setState({
      data1: UserStore.getDataSingle(),
      dataRoles: UserStore.getDataRoles(),
	  allBrandData: UserStore.getAllBrands()
    }); 
	
	if(this.state.data1 != null && this.state.data1[0] != null)
    {
		this.setState({
			userName: this.state.data1[0].userid,
			roleId: this.state.data1[0].roleId 
		});
	}		
	else
	{
		this.setState({ 
			roleId: this.state.dataRoles[0].id
		});
	}
	
	//set default dropdown value to first data if no data is available
	if(this.state.allBrandData != null && this.state.data1 != null && this.state.allBrandData[0] != null && this.state.data1[0] == null)
	{
		this.setState({
		  brandId: this.state.allBrandData[0].id 
		}); 
	}	
  }

  componentWillMount() { 
    UserStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
	if(this.props.location.query.id != "" && this.props.location.query.id != null)
	{
		UserActions.getDataById(this.props.location.query.id); 
		this.refs["divPassword"].style.display='none';
		this.refs["divConPassword"].style.display='none';
	}
	UserActions.getAllRoles(); 
	UserActions.getAllBrands(); 
  }

  componentWillUnmount() { 
    UserStore.removeChangeListener(this.onChange);
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
  
  validateEmail(val)
  {
    var x = val;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {  
        return false;
    }
	return true;
  }
  validateForm()
  {
	var validationMessage = "";
	var result = true;
	 
	if(this.state.userName == "" || this.state.userName == null)
	{
		validationMessage +='Username cannot be empty\n';
		result = false;
	} 
	else if(!this.validateEmail(this.state.userName))
	{
		validationMessage +='Username has to be in email format. eg : johndoe@johnwebsite.com\n';
		result = false;
	}
	if(this.props.location.query.id == "" || this.props.location.query.id == null)
	{
		if(this.state.password == "" || this.state.password == null)
		{
			validationMessage +='Password cannot be empty\n';
			result = false;
		} 
		if(this.state.password != this.state.conPassword)
		{
			validationMessage +='Password does not match. Please check the confirm password\n';
			result = false;
		} 
	}
	
	if(result == false)
		alert(validationMessage);
	
	return result;
  }
  
  handleChange1(event) { 
	this.setState({userName: event.target.value});
  }
  
  handleChange2(event) { 
	this.setState({password: event.target.value});
  }
  handleChange3(event) { 
	this.setState({conPassword: event.target.value});
  } 
  handleChange4(event) { 
	this.setState({roleId: event.target.value});
  } 
  handleChange5(event) { 
	this.setState({brandId: event.target.value});
  }

  handleClick1(event) {
	  
	if(this.validateForm()){
		this.addParams("userid",this.state.userName); 
		this.addParams("roleid",this.state.roleId);  
		this.addParams("brandid",this.state.brandId); 
		if(this.state.data1[0] != null && this.state.data1[0].id != null && this.state.data1[0].id != "")
		{  
			this.addParams("id",this.state.data1[0].id);  
			UserActions.editData(JSON.parse(JSON.stringify(this.params)));
		}
		else
		{
			this.addParams("password",this.state.password); 
			UserActions.addData(JSON.parse(JSON.stringify(this.params)));
		}
	}
  }

  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    return (
	<div > 
	  <h2>{this.props.location.query.id != null ? "Update User Details" :  "Create New User"}</h2>
	  <form ref="mainForm">
		<div className="form-group">
		  {this.props.location.query.id != null ? (		  
			  <div className="form-group row">
				<label className="col-sm-2 col-form-label">ID</label>
				<div className="col-sm-10" style={{marginTop:-8}}> 
				  <p className="form-control-static">{this.props.location.query.id} </p>
				</div>
			  </div>
		  ) :  ""}
		  <div>
			  <label >Username ( Email Format ) : </label>
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.userName} />
		  </div>
		  <div ref="divPassword">
			  <label >Password:</label>
			  <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.handleChange2} value={this.state.password} />
		  </div>
		  <div ref="divConPassword">
			  <label >Confirm Password:</label>
			  <input type="password" className="form-control" id="conpassword" placeholder="Confirm password" onChange={this.handleChange3} value={this.state.conPassword} />
		  </div>
		  <div>
			  <label >Role:</label>
			  <CustomDropDown data={this.state.dataRoles} currentValue={this.state.roleId} customKey="id" customDescription="name" onChange={this.handleChange4}/>
		  </div>
		  <div>
			  <label >Brand:</label>
			  <CustomDropDown data={this.state.allBrandData} currentValue={this.state.brandId} customKey="id" customDescription="name" onChange={this.handleChange5}/>
		  </div>
	</div>   
		 
		<input type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick1} />
	  </form>
	  
	</div>
	);
  }
}

export default UserFormComponent;