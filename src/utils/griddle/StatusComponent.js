
import React, { Component } from 'react'; 
import CustomRedirect from '../CustomRedirect';

class StatusComponent extends Component { 
  
  constructor() {
    super(); 
  }
    
  render(){
	
/*	let obj = <div style={{borderRadius:20,borderStyle:'solid',borderWidth:1,borderColor:'#800000',display: "flex",alignItems: "center",justifyContent: "center",width:100,height:20,textAlign:'center',fontFamily:'Monospace',fontWeight:'bold',fontStyle:'italic',fontSize:11,color:'#ffe6e6',backgroundColor:"#cc0000",boxShadow: "0px 0px 1px 1px white inset"}}>IN PROGRESS</div>;
	if(this.props.data == "ACTIVE")
		obj = <div style={{borderRadius:20,borderStyle:'solid',borderWidth:1,borderColor:'#006600',display: "flex",alignItems: "center",justifyContent: "center",width:100,height:20,textAlign:'center',fontFamily:'Monospace',fontWeight:'bold',fontStyle:'italic',fontSize:11,color:'#ffffff',backgroundColor:"#2db300",boxShadow: "0px 0px 1px 1px white inset"}}>ACTIVE</div>;
	*/
		let obj = <div style={{width:200,height:"100%",color:"#ff8080",fontSize:13,fontFamily:"Tw Cen MT"}}>IN PROGRESS</div>
		if(this.props.data == "ACTIVE")
			obj = <div style={{width:200,height:"100%",color:"#009933",fontSize:13,fontFamily:"Tw Cen MT"}}>ACTIVE</div>;
		else if(this.props.data == "DEPLOYED")
			obj = <div style={{width:200,height:"100%",color:"#8080ff",fontSize:13,fontFamily:"Tw Cen MT"}}>DEPLOYED</div>;
	
	
    return ( 
		<div>{obj}</div>
    );
  }
}

export default StatusComponent;