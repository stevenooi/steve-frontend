
import React, { Component } from 'react'; 

function columnCapitalize(data)
{ 
	return data.replace(/\b\w/g, l => l.toUpperCase());
}

class HeaderComponentDefault extends Component { 
 render(){
	if(this.props.displayText != null)
	{			
		this.display = this.props.displayText;
	}
	else
	{
		this.display = this.props.displayName;
	}
	
    return (
	  <span > 
        <div><strong style={{color: this.props.color, width:500}}>{columnCapitalize(this.display)}</strong></div> 
      </span>
    );
  }
}

export default HeaderComponentDefault;