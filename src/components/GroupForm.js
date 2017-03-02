import React, { Component } from 'react';
import { ListGroup ,DropdownButton, MenuItem} from 'react-bootstrap'; 
import GroupActions from '../actions/GroupActions';
import GroupStore from '../stores/GroupStore';
import ApiSettings from '../config/apiSettings';
import CustomDropDown from '../utils/CustomDropDown';
 
class GroupFormComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      groupName: "",
	  saltId: "",
	  templateId: "",
	  templateName: "",
	  groupId: "",
      data1: [],
      data2: [],
      data3: []
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
    this.handleClick1 = this.handleClick1.bind(this); 
  }

  onChange() {
    this.setState({
      data1: GroupStore.getDataSingle(),
      data2: GroupStore.getAllCompanies(),
      data3: GroupStore.getAllGroupExceptSelf()
    });   
	
	//set value if data is available
	if(this.state.data1[0] != null)
	{
		this.setState({
		  groupName: this.state.data1[0].name,
		  parentId: this.state.data1[0].parentId,
		  companyId: this.state.data1[0].companyId  
		}); 
	}
	
	//set value to default if no data is available 
	if(this.state.data2[0] != null)
	{ 
		this.setState({
		  companyId: this.state.data2[0].id 
		}); 
	}
	
  }

  componentWillMount() { 
    GroupStore.addChangeListener(this.onChange);
  }

  componentDidMount() {  
    GroupActions.getDataById(this.props.location.query.id); 
	GroupActions.getAllCompanies();
	GroupActions.getAllGroupExceptSelf(this.props.location.query.id); 
  }

  componentWillUnmount() { 
    GroupStore.removeChangeListener(this.onChange);
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
	this.setState({groupName: event.target.value});
  }
  
  handleChange2(event) { 
	this.setState({companyId: event.target.value});
  }
  
  handleChange3(event) {  
	this.setState({parentId: event.target.value});
  }
  
  
  handleClick1(event) {
	if(this.validateForm())
	{
		this.addParams("name",this.state.groupName);
		this.addParams("companyId",this.state.companyId);
		if(this.state.parentId == "")
			this.addParams("parentId",null);  
		else
			this.addParams("parentId",this.state.parentId);  
		
		if(this.state.data1[0]!= null && this.state.data1[0].name != null)
		{  
			this.addParams("id",this.state.data1[0].id);  
			GroupActions.editData(JSON.parse(JSON.stringify(this.params)));
		}
		else
		{
			GroupActions.addData(JSON.parse(JSON.stringify(this.params)));
		}
	}
  }

  validateForm()
  {
	  if(!this.validateIsRequired(this.state.groupName)){alert('Group Name is required');return false}
	  if(!this.validateMaximum(this.state.groupName,255)){alert('Maximum length for Group Name is 255 characters');return false}
	  return true;
  }
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 
    
    return (
	<div >
		
	  <h2>{this.props.location.query.id != null ? "Update Group Details" :  "Create New Group"}</h2>
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
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.groupName} />
		  </div>
		  <div>
			  <label >Company:</label>
			  <CustomDropDown data={this.state.data2} currentValue={this.state.companyId} customKey="id" customDescription="name" onChange={this.handleChange2}/>
		  </div>
		  <div>
			  <label >Parent Group:</label>
			  <CustomDropDown data={this.state.data3} currentValue={this.state.parentId} customKey="id" customDescription="name" onChange={this.handleChange3} hasEmpty={true}/>
		  </div>
		</div>   
     		  
		<input type="button" className="btn btn-primary" value="Submit" onClick={this.handleClick1} />
	  </form>
	  
	</div>
	);
  }
}

export default GroupFormComponent;