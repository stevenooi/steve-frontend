import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import RoleActions from '../actions/RoleActions';
import RoleStore from '../stores/RoleStore';
import ApiSettings from '../config/apiSettings';

class RoleFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      roleName: "",
      data1: []
    } 
	this.params = {};
	//this.dataId = this.props.location.query.id;
	//console.log("param:" + this.props.location.query.test);

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  }

  onChange() {
    this.setState({
      data1: RoleStore.getDataSingle()
    }); 
	
	if(this.state.data1!= null && this.state.data1[0] != null)
    {
		this.setState({
		roleName: this.state.data1[0].name
		});
	}		
	
	//console.log("data1 : " + this.state.data1[0].name);
  }

  componentWillMount() { 
    RoleStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    RoleActions.getDataById(this.props.location.query.id); 
  }

  componentWillUnmount() { 
    RoleStore.removeChangeListener(this.onChange);
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
  
  handleChange1(event) { 
	this.setState({roleName: event.target.value});
  }

  handleClick1(event) {   
	//alert("max length validation: " + this.validateMaximum(this.state.roleName, 10));
	//alert("is required validation: " + this.validateIsRequired(this.state.roleName));  
	
	this.addParams("name",this.state.roleName); 
	if(this.state.data1[0] != null && this.state.data1[0].name != null)
	{  
		this.addParams("id",this.state.data1[0].id);  
		RoleActions.editData(JSON.parse(JSON.stringify(this.params))); 
	}
	else
	{
		RoleActions.addData(JSON.parse(JSON.stringify(this.params)));
	}
  }

  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    return (
	<div >
		
	  <h2>{this.props.location.query.id != null ? "Update Role Details" :  "Create New Role"}</h2>
	  <form ref="mainForm">
		<div className="form-group">
		  {this.props.location.query.id != null ? (		  
			  <div className="form-group row">
				<div>
				<label className="col-sm-2 col-form-label">ID</label>
				</div>
				<div className="col-sm-10" style={{marginTop:-8}}>
				  <p className="form-control-static">{this.props.location.query.id} </p>
				</div>
			  </div>
		  ) :  ""}
		  <div>
			  <label >Name:</label>
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.roleName} />
		  </div>
		</div>   
		 
		<input type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick1} />
	  </form>
	  
	</div>
	);
  }
}

export default RoleFormComponent;