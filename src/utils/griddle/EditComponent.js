
import React, { Component } from 'react'; 
import CustomRedirect from '../CustomRedirect';

class EditComponent extends Component { 
  
  constructor() {
    super(); 
    this.editClick = this.editClick.bind(this);
  }
  
  editClick()
  { 
	  var location = "";
	  var index = "";
	  var params = "";
	  if(this.props.data != null) 
	  {
		  var splitUrl = this.props.data.split("/");
		  index = splitUrl[0];
		  location = splitUrl[1]; 
	  } 
	  
	  if(location == "" || location == null)
	  {
		  alert('Active and Deployed data is locked and not editable');
	  }
	  else
	  {
		CustomRedirect.redirectWithParam(location + "form", "id=" + index);
	  }
  }
  
  render(){
	
    return ( <div>
       <img
          style={{marginLeft:4,width: 20, height: 20,cursor: 'pointer'}}
          src={'images/edit4.png'}
		  onClick={this.editClick}
        />  
		</div>
    );
  }
}

export default EditComponent;