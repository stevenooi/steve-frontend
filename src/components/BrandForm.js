import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import BrandActions from '../actions/BrandActions';
import BrandStore from '../stores/BrandStore';
import ApiSettings from '../config/apiSettings';

import CustomModal from '../utils/CustomModal';
import CustomDropZone from '../utils/CustomDropZone';

class BrandFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      brandName: "",
	  brandImage: "",
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
	this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(val)
  {
	  var splitData = val.split("#"); 
	  var obj = {};
	  obj[splitData[0]] = splitData[1];
	  this.setState(obj); 
  }
  
  onChange() {
    this.setState({
      data1: BrandStore.getDataSingle()
    }); 
	
	if(this.state.data1!= null && this.state.data1[0] != null)
    {
		this.setState({
		brandName: this.state.data1[0].name,
		brandImage: this.state.data1[0].imageName
		});
	}		
	
	//console.log("data1 : " + this.state.data1[0].name);
  }

  componentWillMount() { 
    BrandStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    BrandActions.getDataById(this.props.location.query.id); 
  }

  componentWillUnmount() { 
    BrandStore.removeChangeListener(this.onChange);
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
	this.setState({brandName: event.target.value});
  }

  handleClick1(event) {   
	
	this.addParams("name",this.state.brandName); 
	this.addParams("imageName",this.state.brandImage); 
	if(this.state.data1[0] != null && this.state.data1[0].name != null)
	{  
		this.addParams("id",this.state.data1[0].id);  
		BrandActions.editData(JSON.parse(JSON.stringify(this.params))); 
	}
	else
	{
		BrandActions.addData(JSON.parse(JSON.stringify(this.params)));
	}
  }

  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    return (
	<div >
		
	  <h2>{this.props.location.query.id != null ? "Update Brand Details" :  "Create New Brand"}</h2>
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
			  <label >Name:</label>
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.brandName} />
		  </div>
		  <div style={{marginTop:20}}>
		  		<label >Brand Image:</label>
			    <CustomDropZone picId="brandImage" onHandleUpload={this.handleUpload} defaultImg={this.state.brandImage}/>
				<CustomModal img={this.state.brandImage} title="Brand Image" />
		  </div>
		</div>   
		 
		<input type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick1} />
	  </form>
	  
	</div>
	);
  }
}

export default BrandFormComponent;