
import React, { Component } from 'react'; 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

function test()
{
	alert('yeah');
	console.log('hello');
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

class StoreBarComponent extends Component { 
 
	constructor() {
		super();
		this.block1FirstRender = true;
	}
	
	createBar(obj,addFlag)
	{
		var newObj = obj;
		if(addFlag != "1")
			newObj	=  <ReactCSSTransitionGroup transitionName = 'example' transitionAppear = {true} transitionAppearTimeout = {3000} transitionEnter = {false} transitionLeave = {false}>{obj}</ReactCSSTransitionGroup>;
		return newObj;
	}
	
	render(){
		var splitData = this.props.data.split("#"); 

		var mainDiv = "";
		var block1 = "";
		var block2 = "";
		var block3 = "";
		var block4 = "";
		var block5 = "";
		var block6 = "";
		
		var previousBar1 = splitData[10];
		var previousBar2 = splitData[11];
		var previousBar3 = splitData[12];
		var previousBar4 = splitData[13];
		var previousBar5 = splitData[14];
		var previousBar6 = splitData[15];
		
		var message = "New"; 

		if(splitData[1] == "1")
		{		 
			block1 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#004d1a',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100, borderTopLeftRadius: 3,borderBottomLeftRadius: 3}}>&nbsp;</div>,previousBar1);
			message = "Packing Food" ;
		}
		if(splitData[2] == "1")
		{
			block2 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#004d1a',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100}}>&nbsp;</div>,previousBar2);
			message = "Design Package Boxes";
		}
		if(splitData[3] == "1")
		{
			block3 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#00802b',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100}}>&nbsp;</div>,previousBar3);
			
			message = "Produce Goods ";
			
		}
		if(splitData[4] == "1")
		{
			block4 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#009933',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100}}>&nbsp;</div>,previousBar4);
			message = "Deliver To Customer";
		}
		if(splitData[5] == "1")
		{
			block5 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#00b33c',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100, borderTopRightRadius: 3,borderBottomRightRadius: 3}}>&nbsp;</div>,previousBar5);
			message = "Send Invoice";
		}		

		if(splitData[6] == "1")
		{
			block6 = this.createBar(<div style={{marginTop:-20,display:'block',backgroundColor:'#00b33c',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100, borderTopRightRadius: 3,borderBottomRightRadius: 3}}>&nbsp;</div>,previousBar6);
			message = "Progress Completion";
		}		

		if(splitData[7] != null && splitData[7] != "" && splitData[7] != "null")
		{
			message = splitData[7] + " - " +  message;
		}		

		
		if(splitData[0] == "group") mainDiv = <div>&nbsp;</div> 
		else mainDiv = <div><table>
		<tbody>
		<tr>
		<td>
		<div style={{display:'block',backgroundColor:'#e1e1ea',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100, borderTopLeftRadius: 3,borderBottomLeftRadius: 3}}>&nbsp;
			{block1}
			</div></td>
		<td><div style={{display:'block',backgroundColor:'#e1e1ea',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100 }}>
				&nbsp;{block2}
			</div></td>
		<td><div style={{display:'block',backgroundColor:'#e1e1ea',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100 }}>
				&nbsp;{block3}
			</div></td>
		<td><div style={{display:'block',backgroundColor:'#e1e1ea',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100 }}>
				&nbsp;{block4}			
			</div></td>
		<td><div style={{display:'block',backgroundColor:'#e1e1ea',borderRightStyle:'solid',borderColor:'white',borderWidth:'1px', width:100 }}>
				&nbsp;{block5}
				</div></td>
		<td><div style={{display:'block',backgroundColor:'#e1e1ea',width:100, borderTopRightRadius: 3,borderBottomRightRadius: 3}}>
				&nbsp;{block6}
				</div></td>
		</tr>
		<tr><td colSpan="10" style={{paddingTop:1,fontSize:11, fontStyle:'italic',color:'#595959'}}>{message}</td></tr>
		</tbody>
		</table></div>;
		 
		return mainDiv;
	}

}

export default StoreBarComponent;