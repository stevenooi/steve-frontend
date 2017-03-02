import React, { Component } from 'react';
import { ListGroup ,DropdownButton, MenuItem} from 'react-bootstrap'; 
import StoreActions from '../actions/StoreActions';
import StoreStore from '../stores/StoreStore';
import ApiSettings from '../config/apiSettings';
import CustomDropDown from '../utils/CustomDropDown';

var options = [
{
  "id": "5507c0528152e61f3c348d56",
  "name": "elit laborum et",
  "size": "Large"
},
{
  "id": "5507c0526305bceb0c0e2c7a",
  "name": "dolor nulla velit",
  "size": "Medium"
}
];

class StoreFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      storeName: "",
	  saltId: "",
	  templateId: "",
	  templateName: "",
	  groupId: "",
      data1: [],
      data2: [],
      data3: [],
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
    this.test = this.test.bind(this);
  }

  onChange() {
    this.setState({
      data1: StoreStore.getDataSingle(),
      data2: StoreStore.getData2(),
      data3: StoreStore.getData3(),
	  allBrandData: StoreStore.getAllBrands()
    });   
	
	//set value if data is available
	if(this.state.data1 != null && this.state.data1[0] != null)
	{
		this.setState({
		  storeName: this.state.data1[0].name,
		  saltId: this.state.data1[0].saltId,
		  templateId: this.state.data1[0].templateId ,
		  templateName: this.state.data1[0].templateName ,
		  groupId: this.state.data1[0].groupId ,
		  brandId: this.state.data1[0].brandId 
		}); 
	}

	//set default dropdown value to first data if no data is available
	if(this.state.data2 != null && this.state.data1 != null && this.state.data2[0] != null && this.state.data1[0] == null)
	{
		this.setState({
		  templateId: this.state.data2[0].id 
		}); 
	}	
	
	//set default dropdown value to first data if no data is available
	if(this.state.data3 != null && this.state.data1 != null && this.state.data3[0] != null && this.state.data1[0] == null)
	{
		this.setState({
		  groupId: this.state.data3[0].id 
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
    StoreStore.addChangeListener(this.onChange);
  }

  componentDidMount() {  
    StoreActions.getDataById(this.props.location.query.id); 
	StoreActions.getAllTemplates();
	StoreActions.getAllGroups(); 
	StoreActions.getAllBrands(); 
  }

  componentWillUnmount() { 
    StoreStore.removeChangeListener(this.onChange);
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
  
  test()
  {
	  console.log("test clicked");
  }
  
  handleChange1(event) { 
	this.setState({storeName: event.target.value});
  }
  
  handleChange2(event) { 
	this.setState({saltId: event.target.value});
  }
 
  handleChange3(event) {  
	this.setState({templateId: event.target.value}); 
  }
  
  handleChange4(event) {  
	this.setState({groupId: event.target.value}); 
  }
  
  handleChange5(event) {  
	this.setState({brandId: event.target.value}); 
  }
  
  handleClick1(event) {   
	 
	this.addParams("name",this.state.storeName);
	this.addParams("saltId",this.state.saltId);
	this.addParams("brandId",this.state.brandId);
	//this.addParams("templateId",this.state.templateId); 
	this.addParams("groupId",this.state.groupId); 
	if(this.state.data1 != null && this.state.data1[0]!= null && this.state.data1[0].id != null)
	{  
		this.addParams("id",this.state.data1[0].id); 
		StoreActions.editData(JSON.parse(JSON.stringify(this.params)));
	}
	else
	{
		StoreActions.addData(JSON.parse(JSON.stringify(this.params)));
	}
  }

  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    
    return (
	<div >
		
	  <h2>{this.props.location.query.id != null ? "Update Store Details" :  "Create New Store"}</h2>
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
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.storeName} />
		  </div>
		  <div>
			  <label >Salt ID:</label>
			  <input type="text" className="form-control" id="saltid" placeholder="Enter salt id" onChange={this.handleChange2} value={this.state.saltId} />
		  </div>
		  {this.props.location.query.id != null ? (		  
			<div>
			  <label >Template:</label>
			  <input type="text" className="form-control" id="templateId" disabled={true} value={this.state.templateName} />
		  </div>
		  ) :  ""}  
		  <div>
			  <label >Group:</label>
			  <CustomDropDown data={this.state.data3} currentValue={this.state.groupId} customKey="id" customDescription="name" onChange={this.handleChange4}/>
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

export default StoreFormComponent;