
import React, { Component } from 'react'; 

function columnCapitalize(data)
{ 
	return data.replace(/\b\w/g, l => l.toUpperCase());
}

var HeaderComponentInputFilter = React.createClass({
  textOnClick(e) {
    e.stopPropagation();
  },

  filterText(e) {
    this.props.filterByColumn(e.target.value, this.props.columnName)
  },

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
      <span>
        <div><strong style={{color: this.props.color}}>{columnCapitalize(this.display)}</strong></div>
        <input type='text' style={{width:100, height:20}} onChange={this.filterText} onClick={this.textOnClick} />
      </span>
    );
  }
});
 
 

export default HeaderComponentInputFilter;