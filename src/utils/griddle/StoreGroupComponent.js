
import React, { Component } from 'react'; 

class StoreGroupComponent extends Component { 
 
  render(){
	var splitData = this.props.data.split("#"); 
	
	var mainDiv = "";
	
	mainDiv = <div style={{paddingLeft:10,verticalAlign:'text-top',fontSize:12}}><span className="glyphicon glyphicon-home" style={{paddingRight:8}}></span>{splitData[1]}</div> ;
	 
	return mainDiv;
  }

}

export default StoreGroupComponent;