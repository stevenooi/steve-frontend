
import React, { Component } from 'react'; 
import CustomRedirect from '../CustomRedirect';

class ViewComponent extends Component { 
  
  constructor() {
    super(); 
    this.viewClick = this.viewClick.bind(this);
  }
  
  viewClick()
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
		CustomRedirect.redirectWithParam(location + "form", "viewid=" + index);
	  }
  }
  
  render(){
    return ( <div>
       <img
          style={{marginLeft:7,width: 20, height: 20,cursor: 'pointer'}}
          src={'images/magnifying1.png'}
		  onClick={this.viewClick}
        />  
		</div>
    );
  }
}

export default ViewComponent;