import React, { Component } from 'react';
import { ListGroup ,DropdownButton, MenuItem, Grid, Row, Col} from 'react-bootstrap'; 
import TemplateActions from '../actions/TemplateActions';
import TemplateStore from '../stores/TemplateStore';
import ApiSettings from '../config/apiSettings'; 
import CustomDropZone from '../utils/CustomDropZone'; 

import Modal from 'react-modal';
import CustomModal from '../utils/CustomModal';  

  
class TemplateFormComponent extends Component {

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
      slideImg: [],
      slideImgId: [],
      slideImgName: []
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
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleUpload = this.handleUpload.bind(this); 
  }

  handleClickReset()
  {
	  this.setState({ 
		templateName: "",
		templateDescription: "",
		welcome: "",
		thankyou: "",
		logo: "",
		default1: "",
		default2: "",
		slideImg: []
      });
  }
  
  handleUpload(val)
  {
	  var splitData = val.split("#"); 
	  var obj = {};
	  obj[splitData[0]] = splitData[1];
	  this.setState(obj);
	  console.log("handleUpload():" + val);
  }
   
  onChange() {
    this.setState({
      data1: TemplateStore.getDataSingle(), 
      data3: TemplateStore.getData3()
    });   
	
	//set value if data is available
	if(this.state.data1 != null && this.state.data1[0] != null)
	{
		this.setState({  
		  templateDescription: this.state.data1[0].description, 
		  welcome: this.state.data1[0].welcome, 
		  logo: this.state.data1[0].logo, 
		  thankyou: this.state.data1[0].thankyou, 
		  default1: this.state.data1[0].default1,
		  default2: this.state.data1[0].default2 
		}); 
		
		//do not set template name and template id for clone function
		if(this.props.location.query.cloneid == null)
		{			
			this.setState({  
			  templateId: this.state.data1[0].id ,
			  templateName: this.state.data1[0].name ,
			});
		}
	}
	
	//set default dropdown value to first data if no data is available
	if(this.state.data2!= null && this.state.data2[0] != null && this.state.data1[0] == null)
	{
		this.setState({
		  templateId: this.state.data2[0].id 
		}); 
	}	
	
	
	//console.log("this.state.data3:" + this.state.data3);
	var tempArray = [];
	let tempID = "";
	let tempName = "";
	this.state.data3.map(file => {
		//console.log("hereeeeeeeeeeeeeeeeeeeee," + file.id);
		//console.log("hereeeeeeeeeeeeeeeeeeeee," + file.name);
		tempID += file.id + ",";
		tempName += file.name + ","; 
		tempArray.push(file.name); 
	}
		
	
	);
	this.setState({
		  slideImg: tempArray,
		  slideImgId: tempID,
		  slideImgName: tempName 
	});

  }

  componentWillMount() { 
    TemplateStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
	if(this.props.location.query.id != null)
	{
		TemplateActions.getDataById(this.props.location.query.id); 		
		TemplateActions.getTemplateSlide(this.props.location.query.id);
	}
	else if(this.props.location.query.cloneid != null)
	{
		TemplateActions.getDataById(this.props.location.query.cloneid); 		
		TemplateActions.getTemplateSlide(this.props.location.query.cloneid);
	}
	else if(this.props.location.query.viewid != null)
	{
		TemplateActions.getDataById(this.props.location.query.viewid); 		
		TemplateActions.getTemplateSlide(this.props.location.query.viewid);
	}
	
	//TemplateActions.getAllGroups(); 
  }

  componentWillUnmount() { 
    TemplateStore.removeChangeListener(this.onChange);
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
	this.setState({templateName: event.target.value});
  }
  
  handleChange2(event) { 
	this.setState({templateDescription: event.target.value});
  }
 
  handleChange3(event) {  
	this.setState({templateId: event.target.value}); 
  }
  
  handleChange4(event) {  
	this.setState({groupId: event.target.value}); 
  }

  validateForm()
  { 
	return true;
  }
  
  handleClick1(event) {   
  }
  
  handleClick2(event) {    
  }
  
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 

	let headerTitle = "";
	let buttonList = "";
	
	buttonList = <div><input type="button" className="btn btn-danger" style={{marginLeft:20}} value="Save" onClick={this.handleClick2} /></div>;
	
	headerTitle = "Upload Image";
	
    return (
	<div>
		
		<Grid style={{marginBottom:20}}> 
		<Row>
	  <h2>{headerTitle}</h2>
	  </Row>
	  <form ref="mainForm">
	
		<div className="form-group">
	    <Row>	
		  {this.props.location.query.id != null ? (		  
			  <div className="form-group row">
				<label className="col-sm-2 col-form-label">ID</label>
				<div className="col-sm-10" style={{marginTop:-8}}>
				  <p className="form-control-static">{this.props.location.query.id} </p>
				</div>
			  </div>
		  ) :  ""}
		  </Row>  
		  <Row style={{marginBottom:15}}>
				<Col xs={3} >
					<label >Image: </label>
					<CustomDropZone picId="welcome" onHandleUpload={this.handleUpload} defaultImg={this.state.welcome}/>
					<CustomModal img={this.state.welcome} title="Image 1" />
				</Col>
			</Row>
		</div>
			
	  </form>
		</Grid> 

<Grid>
<Row>	  
</Row>
</Grid>
	</div>
	);
  }
}

export default TemplateFormComponent;