
import React, { Component } from 'react'; 
import CustomRedirect from '../CustomRedirect';

class EditComponent extends Component { 
  
  constructor() {
    super(); 
  }
  render(){
	
    return ( <div style={{fontSize:12,fontFamily:'Arial'}}>{this.props.data}</div>
    );
  }
}

export default EditComponent;