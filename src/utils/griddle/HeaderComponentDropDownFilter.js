
import React, { Component } from 'react'; 
import CustomDropDown from '../CustomDropDown';

function columnCapitalize(data)
{ 
	return data.replace(/\b\w/g, l => l.toUpperCase());
}

class HeaderComponentDropDownFilter extends Component { 

   textOnClick(e) {
    e.stopPropagation();
  }

  filterText(e) { 
   
	if(e.target.value == "*")
	{ 
		this.props.filterByColumn('', this.columnName)
	}
	else
	{
		this.props.filterByColumn(e.target.value, this.columnName)
	}
  }

  componentDidMount() {  
	 this.columnName = this.props.columnName;
  }
  
  render(){ 
  
	if (this.props.data) { 
      this.props.data.map(data => console.log(data));
    }  
	else
	{
		console.log("no data received in header component dropdown filter");
	}
      
    return (
      <span>
        <div><strong style={{color: this.props.color}}>{columnCapitalize(this.props.displayName)}</strong></div>
	    <CustomDropDown className="" data={this.props.data} currentValue={this.props.currentValue} customKey={this.props.customKey} customDescription={this.props.customDescription} onChange={this.filterText}/>
     </span>
    );
  }
}

export default HeaderComponentDropDownFilter;