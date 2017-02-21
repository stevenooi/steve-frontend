
import React, { Component } from 'react'; 

class StoreGroupComponent extends Component { 
 
 render(){
	var splitData = this.props.data.split("#"); 
	
	var mainDiv = "";
	
	if(splitData[0] == "group") mainDiv = <div style={{height:35,verticalAlign:'text-top'}}><span className="glyphicon glyphicon-flag" style={{fontSize:18,paddingRight:8}}></span>{splitData[1]}</div> 
	else mainDiv = <div style={{paddingLeft:10,verticalAlign:'text-top'}}><span className="glyphicon glyphicon-home" style={{fontSize:13,paddingRight:8}}></span>{splitData[1]}</div> ;
	 
 return mainDiv;
  }

  }

export default StoreGroupComponent;