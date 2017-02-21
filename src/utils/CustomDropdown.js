// Author : Steven Ooi
// Licensed at Summit Innovations

import React, { Component } from 'react';
import { ListGroup ,DropdownButton, MenuItem} from 'react-bootstrap'; 
import CustomRandomGenerator from '../utils/CustomRandomGenerator';

class CustomDropDown extends Component { 
  
  constructor() {
    super();  
  } 
  render(){
	let keyField = "key";
	let descField = "description"; 
	let className = "form-control";

	if(this.props.className != null)
		className = this.props.className;
	
	//cutomise key field population 
	if(this.props.customKey != null)
		keyField = this.props.customKey;
	
	//cutomise description field population 
	if(this.props.customDescription != null)
		descField = this.props.customDescription;
	 	 	
    let options = []; 
	let selectedValue = "";
	console.log("before push data");
	if(this.props.data != null)
	{    
		console.log("data is not null");
		this.props.data.map( function(obj){
			options.push( <option key={obj[keyField]} value={obj[keyField]} >{obj[descField]}</option> ); 
		}); 
	} 
	if(this.props.hasEmpty != null)
	{			
		options.push( <option key="" value="" ></option> ); 
	}
	if(this.props.customDefaultMessage != null)
	{			
		options.push( <option key="" value="" >{this.props.customDefaultMessage}</option> ); 
	}
	
	return ( 
	
		<select className={className} value={this.props.currentValue} onChange={this.props.onChange}>
			{options}
		</select>

    );
  }
}

export default CustomDropDown;