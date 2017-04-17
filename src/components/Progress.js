import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import ProgressActions from '../actions/ProgressActions';
import ProgressStore from '../stores/ProgressStore';
 
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';

import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent'; 
import TextComponent from '../utils/griddle/TextComponent';
import StoreBarComponent from '../utils/griddle/StoreBarComponent';
import StoreGroupComponent from '../utils/griddle/StoreGroupComponent'; 

import CustomRedirect from '../utils/CustomRedirect';
 
 
import Griddle from 'griddle-react';


class ProgressComponent extends Component {
  
  constructor() {
    super();
	this.noDataMessage = <div className="loader" style={{marginTop:20,marginBottom:20}}></div>;
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: [],
	  dataAllTemplates: [],
	  columnMeta: [],
	  tempState: "",
	  showColumns: ['idWithGroup', 'storeGroup', 'progress', 'templateName'] 	, 
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
	  
  console.log("this.previousData[count]:" + this.previousData[count]);
  if(this.previousData[count] != null)
  {
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
	  
	if(e.target.value != null)
	this.setState({tempState: "BB"}); 
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
    ProgressActions.getData1();
  }
  
  onChange() {
	  
    this.setState({
      data1: ProgressStore.getData1(),
	  dataAllTemplates: ProgressStore.getDataAllTemplates(),
	  showColumns: ['idWithGroup', 'storeGroup', 'progress']
    });
	
	if(ProgressStore.getData1() == "")
	{ 	
		this.setState({
			noDataMessage: <div className="loaderNoData"><div><img src="images/nodata2.png" style={{width:50,marginLeft:8,marginTop:16,opacity:0.4}} /></div><div style={{color:'grey',marginTop:5}}>No Records</div></div>,
			showColumns: []
		});
		 //alert(this.state.showColumns); 
	}
	
	if(ProgressStore.getData1() != "")
	{ 
		this.setState({
			griddleTable : <Griddle results={this.state.data1} columns ={[ 'storeGroup', 'progress', 'templateName']} columnMetadata={this.columnMeta} resultsPerPage={99} /*showFilter={true}*/ sortable={true} noDataMessage={this.state.noDataMessage} handleDelete={this.handleDelete} />
		});
	}
	else
	{		 
		this.setState({
		griddleTable : <Griddle results={this.state.data1} columnMetadata={this.columnMeta} resultsPerPage={99} /*showFilter={true}*/ sortable={true} noDataMessage={this.state.noDataMessage} handleDelete={this.handleDelete} />
		});
	}
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
	  "customHeaderComponent": HeaderComponentDefault,
	  "customComponent": StoreGroupComponent,
	  "customHeaderComponentProps": { color: 'black' ,displayText : "Name"},
	  "cssClassName": "storeGroup"
	  },
	  { 
	  "columnName": "templateName",
	  "customHeaderComponent": HeaderComponentDefault,
	  "customHeaderComponentProps": {displayText : "Status"} ,
	  "cssClassName": "storeTemplate",
	  "customComponent": TextComponent
	  }, 
	  { 
	  "columnName": "progress", 
	  "customHeaderComponent": HeaderComponentDefault,
	  "customHeaderComponentProps": { color: 'black' ,displayText : "Progress Bar"},
	  "sortable": false,
	  "customComponent": StoreBarComponent,
	  "cssClassName": "columnStoreBar"
	  }, 
	];
 
	let dataListItems;

	if(this.state.data1 != null)
	{
		this.state.data1.map((data,i) => this.setPreviousData(data,i)); 		
	}
	let griddleTable;
 
	// alert(this.state.showColumns);	
//console.log(this.columnMeta);
  //   this.state.data1.map((data)=> console.log("render progress:" + data.progress)); 
    return (
		<div >
			<div style={{marginBottom:15, width:950}}>
				{this.state.griddleTable }
			</div>
		</div>
	);
  }
}

export default ProgressComponent;