import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import ProgressActions from '../actions/ProgressActions';
import ProgressStore from '../stores/ProgressStore';

import LinkComponent from '../utils/griddle/LinkComponent';
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';
import HeaderComponentDropDownFilter from '../utils/griddle/HeaderComponentDropDownFilter';
import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent';
import DeleteComponent from '../utils/griddle/DeleteComponent';
import StoreBarComponent from '../utils/griddle/StoreBarComponent';
import StoreGroupComponent from '../utils/griddle/StoreGroupComponent';
import CheckboxComponent from '../utils/griddle/CheckboxComponent';

import CustomRedirect from '../utils/CustomRedirect';

import CustomDropDown from '../utils/CustomDropDown';
 
import Griddle from 'griddle-react';


class ProgressComponent extends Component {

  constructor() {
    super();
	this.noDataMessage = "Loading...";
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: [],
	  dataAllTemplates: [],
	  columnMeta: [],
	  tempState: ""
    } 
	this.previousData = [];
    this.onChange = this.onChange.bind(this);
    this.addClick = this.addClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
	this.handleUpdateSelected = this.handleUpdateSelected.bind(this);
	this.applyTemplateClick = this.applyTemplateClick.bind(this);
	this.timer = this.timer.bind(this);
	this.selectedCheckbox = [];
	this.params = {};
	this.clickCheckBox = true;
	this.templateId = "";
  }

  setPreviousData(data, count) {
  //data.Edit = data.id + url;
  //data.Delete = data.id + url; 
  console.log("this.previousData[count]:" + this.previousData[count]);
  if(this.previousData[count] != null)
  {
	  console.log("here[" + count + "]-data:" + data.progress);
	  console.log("here[" + count + "]-index:" + data.progress.indexOf("#previous"));
	  //replace previous values
	  if(data.progress.indexOf("#previous") > 0)
	  {
		  data.progress = data.progress.substring(0,data.progress.indexOf("#previous"));
	  }
	  
	  var tempPreviousData = this.previousData[count];
	  this.previousData[count] = data.progress;
	  data.progress += "#previous#" + tempPreviousData;  
  }
  else
  {
	  this.previousData[count] = data.progress;
  }
  
  //console.log("data.progress:" + data.progress);
  
	 
	 
  return (
	 data
  );
}  
  handleUpdateSelected(targetId)
  {
	  this.manipulateSelectedCheckbox(targetId);
  }
  
  applyTemplateClick()
  {  
	if(this.selectedCheckbox.length == 0)
	{
		alert('No store is selected. Please select a store to apply template');
	}
	else if(this.templateId == null || this.templateId == "")
	{
		alert('No template is selected.Please select a template');
	}
	else
	{
		this.addParams("templateId",this.templateId);
		this.addParams("selectedCheckbox",this.selectedCheckbox);
		
		ProgressActions.updateData(JSON.parse(JSON.stringify(this.params)));
		//alert('Apply template');
		
	}
  }
  
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }
  
  handleTemplateChange(event)
  {
	this.clickCheckBox = false;	  
	this.templateId = event.target.value;
  }
  
  manipulateSelectedCheckbox(targetId)
  {
	  var foundIndex = this.selectedCheckbox.indexOf(targetId);
	  
	  console.log("foundIndex:"+ foundIndex);
	  console.log("e.target.value:"+ targetId);
	  
	  if(foundIndex == -1)
		this.selectedCheckbox.push(targetId);
	  else
		this.selectedCheckbox.splice(foundIndex,1);
	     
	  console.log("this.selectedCheckbox:" + this.selectedCheckbox);
  }
  
  handleCheckboxChange(e)
  {
	  this.clickCheckBox = true;
	  this.manipulateSelectedCheckbox(e.target.id);
	  //alert(e.target.value);
	  
	  /*var foundIndex = this.selectedCheckbox.indexOf(e.target.id);
	  
	  console.log("foundIndex:"+ foundIndex);
	  console.log("e.target.value:"+ e.target.id);
	  
	  if(foundIndex == -1)
		this.selectedCheckbox.push(e.target.id);
	  else
		this.selectedCheckbox.splice(foundIndex,1);
	     
	  console.log("this.selectedCheckbox:" + this.selectedCheckbox);	
*/	  
	  //this.selectedCheckbox = e.target.id;
	  //alert('checkbox change:' + e.target.value);
	  //alert("this.selectedCheckbox:" + this.selectedCheckbox);
	 
	//change state to force re-render
	
	if(e.target.value != null)
	this.setState({tempState: "BB"});
	  //alert(this.refs["griddle"].refs[e.target.id]);
    
	 // alert('checkbox target:' + e.target.checked);
	 // alert('checkbox change:' + e);
  }
  
  handleDelete()
  {
	alert('delete handled');
  }	 

  addClick()
  {
	  CustomRedirect.redirect("progressform"); 	
  }

  componentWillMount() {
    ProgressStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    ProgressActions.getData1();
    ProgressActions.getAllActiveTemplates();
	
	var intervalId = setInterval(this.timer, 10000);
	// store intervalId in the state so it can be accessed later:
	this.setState({intervalId: intervalId});
	
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    ProgressStore.removeChangeListener(this.onChange);
  }

  timer()
  {
	console.log("timer runs");
    ProgressActions.getData1();
  }
  
  onChange() {
    this.setState({
      data1: ProgressStore.getData1(),
	  dataAllTemplates: ProgressStore.getDataAllTemplates()
    });
	this.noDataMessage = "No data could be found.";
	/*
	let dataListItems;
	if(this.state.data1 != null)
	{
		this.state.data1.map((data,i) => this.setPreviousData(data,i));
	//	this.state.data1.map((data) => console.log("after change progress:" + data.progress));
		
	}*/
  }

	 

  render() {
	  //alert('rendered');
	  
this.columnMeta = [
  { 
  "columnName": "storeGroup",
  "order": 2,
  "locked": false,
  "visible": true,
  "sortable": false,
  "customHeaderComponent": HeaderComponentInputFilter,
  "customComponent": StoreGroupComponent,
  "cssClassName": "storeGroup"
  },
  { 
  "columnName": "idWithGroup",
  "order": 1,
  "customHeaderComponent": CheckboxComponent,
  "customComponent": CheckboxComponent,
  "customComponentMetadata": {onChange : this.handleCheckboxChange, onUpdateSelected : this.handleUpdateSelected, "selectedCheckbox" : this.selectedCheckbox,"clickCheckBox": this.clickCheckBox} ,
  "customComponentProps": {test : "AA"} ,
  "cssClassName": "columnStoreCheck"
  },
  { 
  "columnName": "templateName",
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": {displayText : "Template"} ,
  "cssClassName": "storeTemplate"
  },
  { 
  "columnName": "Edit",  
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": EditComponent
  }, 
  { 
  "columnName": "progress", 
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' ,displayText : "Template Package Progress"},
  "sortable": false,
  "customComponent": StoreBarComponent,
  "cssClassName": "columnStoreBar"
  }, 
];


	let dataListItems;
	if(this.state.data1 != null)
	{
		this.state.data1.map((data,i) => this.setPreviousData(data,i));
	//	this.state.data1.map((data) => console.log("after change progress:" + data.progress));
		
	}
//console.log(this.columnMeta);
  //   this.state.data1.map((data)=> console.log("render progress:" + data.progress));
	
    return (
		<div >
			<div style={{marginBottom:8}}>
				<table>
				<tbody>
				<tr><td><label >
					Choose Template To Apply</label></td><td style={{paddingLeft:20}}><CustomDropDown data={this.state.dataAllTemplates} customKey="id" customDescription="name"  onChange={this.handleTemplateChange} customDefaultMessage="Please select a template" />
				  </td><td style={{paddingLeft:20}}>
						<button type="button" style={{display:"inline"}} className ="btn btn-primary" onClick={this.applyTemplateClick} >Apply</button>
				  </td></tr>
				  </tbody>
				  </table>
			</div>
			 
			<div style={{marginBottom:15, width:950}}>
				<Griddle ref="griddle" results={this.state.data1} columns = {['idWithGroup', 'storeGroup', 'progress', 'templateName']} columnMetadata={this.columnMeta} resultsPerPage={99} /*showFilter={true}*/ sortable={true} noDataMessage={this.noDataMessage} handleDelete={this.handleDelete} />
			</div>
		</div>
	);
  }
}

export default ProgressComponent;