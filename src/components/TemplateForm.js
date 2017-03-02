import React, { Component } from 'react';
import { ListGroup ,DropdownButton, MenuItem, Grid, Row, Col} from 'react-bootstrap'; 
import TemplateActions from '../actions/TemplateActions';
import TemplateStore from '../stores/TemplateStore';
import ApiSettings from '../config/apiSettings';
import CustomDropDown from '../utils/CustomDropDown';
import CustomDropZone from '../utils/CustomDropZone';
import CustomDropZoneMultiple from '../utils/CustomDropZoneMultiple';

import Modal from 'react-modal';
import CustomModal from '../utils/CustomModal';
import CustomModalSlider from '../utils/CustomModalSlider';
import CustomModalOrderScreen from '../utils/CustomModalOrderScreen';

import TemplateKeyConstants from '../constants/TemplateKeyConstants';
  
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
    this.handleUpload2 = this.handleUpload2.bind(this);
    this.test = this.test.bind(this);
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
  
  handleUpload2(val)
  {
	  console.log("handleUpload2():" + val);
	  //console.log("dropZoneMultiple:" + this.refs.dropZoneMultiple.state.imageFilesMultiple);
	  this.setState({
       // slideImg: this.refs.dropZoneMultiple.state.imageFilesMultiple 
		slideImg: val
      });   	
	//  alert("this.state.slideImg:" + this.state.slideImg);
	  //this.state.slideImg[this.state.slideImg.length] = val;
	 
		
	 /* var splitData = val.split("#"); 
	  var obj = {};
	  obj[splitData[0]] = splitData[1];
	  this.setState(obj);
	  console.log("handleUpload():" + val);*/
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
  
  test()
  {
	  console.log("test clicked");
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
	var validationMessage = "";
	var result = true;
	 
	if(this.state.templateName == "" || this.state.templateName == null)
	{
		validationMessage +='Name cannot be empty\n';
		result = false;
	}
	if(this.state.templateDescription == "" || this.state.templateDescription == null)
	{
		validationMessage +='Description cannot be empty\n';
		result = false;
	}
	if(this.state.welcome == "" || this.state.welcome == null)
	{
		validationMessage +='Welcome image cannot be empty\n';
		result = false;
	}
	if(this.state.thankyou == "" || this.state.thankyou == null)
	{
		validationMessage += 'Thank you image cannot be empty\n';
		result = false;
	}
	if(this.state.logo == "" || this.state.logo == null)
	{
		validationMessage += 'Logo image cannot be empty\n';
		result = false;
	}
	if(this.state.default1 == "" || this.state.default1 == null)
	{
		validationMessage += 'Default 1 image cannot be empty\n';
		result = false;
	}
	if(this.state.default2 == "" || this.state.default2 == null)
	{
		validationMessage += 'Default 2 image cannot be empty\n';
		result = false;
	}
	if(this.state.slideImg == "" || this.state.slideImg == null)
	{
		validationMessage += 'Slide images has to be at least 2 pictures\n';
		result = false;
	}
	if(this.state.slideImg != "" && this.state.slideImg != null && this.state.slideImg.length < 2)
	{
		validationMessage += 'Slide images has to be at least 2 pictures\n';
		result = false;
	} 
	
	if(result == false)
		alert(validationMessage);
	
	return result;
  }
  
  handleClick1(event) {   
  
	console.log("slideImg:" + JSON.stringify(this.state.slideImg));
	
	 if(this.validateForm()){
			this.addParams("name",this.state.templateName);
			this.addParams("description",this.state.templateDescription);
			//this.addParams("rmsData",dataObj);
			this.addParams("welcome",this.state.welcome);
			this.addParams("thankyou",this.state.thankyou);
			this.addParams("logo",this.state.logo);
			this.addParams("default1",this.state.default1);
			this.addParams("default2",this.state.default2);
			this.addParams("slideImg",this.state.slideImg);
			this.addParams("status",TemplateKeyConstants.ACTIVE);
			
			if(this.props.location.query.id != null)
			{   
				this.addParams("id",this.state.data1[0].id); 
				//alert("Edit function is not available yet ! ");
				TemplateActions.editData(JSON.parse(JSON.stringify(this.params)));
			}
			else
			{ 
				TemplateActions.addData(JSON.parse(JSON.stringify(this.params)));
			} 
	 } 
	 
  }
  
  handleClick2(event) {   
	 		this.addParams("name",this.state.templateName);
			this.addParams("description",this.state.templateDescription);
			//this.addParams("rmsData",dataObj);
			this.addParams("welcome",this.state.welcome);
			this.addParams("thankyou",this.state.thankyou);
			this.addParams("logo",this.state.logo);
			this.addParams("default1",this.state.default1);
			this.addParams("default2",this.state.default2);
			this.addParams("slideImg",this.state.slideImg);
			this.addParams("status",TemplateKeyConstants.IN_PROGRESS);
			
			if(this.props.location.query.id != null)
			{  
				this.addParams("id",this.state.data1[0].id); 
				//alert("Edit function is not available yet ! ");
				TemplateActions.editData(JSON.parse(JSON.stringify(this.params)));
			}
			else
			{
				TemplateActions.addData(JSON.parse(JSON.stringify(this.params)));
			} 
  }
  
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  render() { 

  let headerTitle = "";
  let buttonList = "";
  if(this.props.location.query.viewid == null || this.props.location.query.viewid == "")
  {
	buttonList = <div><input type="button" className="btn btn-primary" value="Activate" onClick={this.handleClick1} /><input type="button" className="btn btn-primary" style={{marginLeft:20}} value="Save" onClick={this.handleClick2} /></div>;
  }
  if(this.props.location.query.id != null)
  {
	  headerTitle = "Update Template Details";
  }
  else if(this.props.location.query.viewid != null)
  {
	  headerTitle = "View Template Details";
  }
  else
  { 
	  headerTitle = "Create New Template";
  }

    return (
	<div >
		
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
		  <div> 
			  <label >Name:</label>
			  <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.handleChange1} value={this.state.templateName} />
		  </div>
		  </Row>
		  <Row style={{marginBottom:15}}>
		  <div>
			  <label >Description:</label>
			  <input type="text" className="form-control" id="description" placeholder="Enter description" onChange={this.handleChange2} value={this.state.templateDescription} />
		  </div>
		  </Row>  
			<Row style={{marginBottom:15}}>
				<Col xs={3} >
					<label >Welcome: </label>
					<CustomDropZone picId="welcome" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload} defaultImg={this.state.welcome}/>
					<CustomModal img={this.state.welcome} title="Welcome" />
				</Col>
				
				<Col xs={3}>
					<label >Thank You:</label>
					<CustomDropZone picId="thankyou" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload} defaultImg={this.state.thankyou}/>
					<CustomModal img={this.state.thankyou} title="Thank You" />
				</Col>
				
				<Col xs={3}>
					<label >Logo:</label>
					<CustomDropZone picId="logo" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload} defaultImg={this.state.logo}/>
					<CustomModal img={this.state.logo} title="Logo" />
				</Col>
				 
			</Row>
			<Row style={{marginBottom:15}}>
				<Col xs={3}>
					<label >Default 1:</label>
					<CustomDropZone picId="default1" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload} defaultImg={this.state.default1}/>
					<CustomModal img={this.state.default1} title="Default 1" />
				</Col>
				<Col xs={3}>				
					<label >Default 2:</label>
					<CustomDropZone picId="default2" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload} defaultImg={this.state.default2}/>
					<CustomModal img={this.state.default2} title="Default 2" />
				</Col>
				<Col xs={3}>
					<label >Order Screen: (Non-Editable)</label>
					<CustomModalOrderScreen imgLogo={this.state.logo} imgWelcome={this.state.default1} imgThankYou={this.state.default2} title="Order Screen" />
				</Col>
			</Row>
			<Row style={{marginBottom:15}}>
				<label >Slides Images:</label>
				<CustomDropZoneMultiple ref="dropZoneMultiple" disabled={this.props.location.query.viewid} onHandleUpload={this.handleUpload2} defaultImg={this.state.data3} newDataToken={(this.props.location.query.id == null && this.props.location.query.cloneid == null && this.props.location.query.viewid == null)} />
				<CustomModalSlider img={this.state.slideImg} title="Default 1" />
			</Row>
			<Row>
			
			{buttonList}
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