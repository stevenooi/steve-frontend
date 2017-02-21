
import React, { Component } from 'react'; 

class CheckboxComponent extends Component { 
 
  constructor() {
    super(); 
		this.changeHandler = this.changeHandler.bind(this);
		//this.isClickCheck = false;
	}
  
   

  componentWillReceiveProps(nextProps) {
    //alert('received props');

  }
  
  processCheckboxIsSelect(checkedList,currentData)
  {
	var checkedListSplit = checkedList.split("#");
	var currentDataSplit = currentData.split("#");

	var checkedListGroupStore = checkedListSplit[2];
	var currentDataGroupStore = currentDataSplit[2];
	var currentDataParentId = currentDataSplit[1];
	var currentDataId = currentDataSplit[0];
	var checkedListId = checkedListSplit[0];

	if(this.props.data == checkedList)
	{
		this.refs[currentData].checked = true; 
	} 
	if(checkedListGroupStore == "group")
	{
		if(currentDataParentId ==checkedListId)
		{ 
			console.log("process:" + checkedList);
			//console.log("currentDataParentId:" + currentDataParentId);
			//console.log("checkedListId:" + checkedListId);
			this.refs[currentData].checked = true;  
			this.props.metadata.customComponentMetadata.onUpdateSelected(currentData);
			//this.props.metadata.customComponentMetadata.onChange(e);
		}
	}
	
  }
  
  componentDidMount() {  
	//console.log("this.props.rowData:" + this.props.rowData);
	
	if(this.props.metadata != null)
	{
		if(this.props.metadata.customComponentMetadata.clickCheckBox == true)
		{
			var tempObj = this.props.metadata.customComponentMetadata.selectedCheckbox;
			tempObj.map((obj,i) => 
				{
					this.processCheckboxIsSelect(obj,this.props.data);
				}
			);
			//this.isClickCheck = false;
		}
		//console.log("tempOj:" + tempObj);
		/*
		for (var property in tempObj) {
		if (tempObj.hasOwnProperty(property)) {
		// do stuff
		console.log("metadata - " + property + ":" + tempObj[property]);
		}
		}*/
	}
   
  }
 
    changeHandler(e) {
		//alert('hihihi');
    //    if (typeof this.props.metadata.customComponentMetadata.onChange === 'function') {
			//alert('yeah:' + this.props.metadata.customComponentMetadata.onChange);
			//alert("checkbox changehandler:" + this.props.metadata.customComponentMetadata.selectedCheckbox);
           // this.isClickCheck = true;
		
			this.props.metadata.customComponentMetadata.onChange(e);
			//alert('yeah2');
      //  }
    } 
 
 render(){  
    return <div >
			  <input id={this.props.data} ref={this.props.data} type="checkbox" onChange={this.changeHandler}/>
			</div> 
  }

  }

export default CheckboxComponent;