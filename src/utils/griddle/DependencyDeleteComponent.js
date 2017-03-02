
import React, { Component } from 'react'; 
import GlobalActions from '../../actions/GlobalActions';

class DependencyDeleteComponent extends Component { 
  
  constructor() {
    super();  
    this.deleteClick = this.deleteClick.bind(this);
  }
  
  deleteClick()
  { 
      var location = "";
	  var index = "";
	  var params = "";
	  var isDeletable = "";
	  if(this.props.data != null) 
	  {
		  var splitUrl = this.props.data.split("/");
		  index = splitUrl[0];
		  location = splitUrl[1]; 
		  
		  if(splitUrl.length >= 3)
		  {
			  isDeletable = splitUrl[2]; 
		  }
	  } 
	  var obj = new Object();
	  obj.id = index; 
	  if(location == "" || location == null)
	  {
			  alert('Active and Deployed data is locked and not deletable');
	  }
	  else if(isDeletable == "1")
	  { 
			  var confirmation = confirm('Are you sure you want to delete the data?');
			  if(confirmation)
			  {
				GlobalActions.deleteAction(location, obj); 
			  }
	  }
	  else
	  {
		  alert('This data cannot be deleted. Dependency on the data found');
	  }
  } 

  render(){
    return (
       <img
          style={{marginLeft:8,width: 20, height: 20,cursor: 'pointer'}}
		  src={'images/delete1.png'}  
		  onClick={this.deleteClick}
        />
    );
  }

}

export default DependencyDeleteComponent;