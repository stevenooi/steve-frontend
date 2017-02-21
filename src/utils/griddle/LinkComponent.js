
import React, { Component } from 'react'; 

class LinkComponent extends Component { 
 
 render(){
    var  url ="speakers/" + this.props.rowData.state + "/" + this.props.data;
    return <a href={url}>{this.props.data}</a>
  }

  }

export default LinkComponent;