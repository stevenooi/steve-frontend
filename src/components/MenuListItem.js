
import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class MenuListItem extends Component { 

  constructor() {
    super();
	this.toggleHover = this.toggleHover.bind(this);
	this.onClick = this.onClick.bind(this);
	this.state = {
      onHover: false
    }
	
  }

  onClick()
  {  
  //alert(this.props.menu.path);
	browserHistory.replace("/" +  this.props.menu.path);
  }
  
  toggleHover()
  {    
  
    this.setState({
      onHover: !this.state.onHover
    }); 
  }
  
  render() { 
    const { menu,currentURL } = this.props;
	const menuStyle = { 
		fontSize: 14,
		paddingTop: 2,
		paddingBottom: 0,
		width: 120,
		height: 25,
		color: '#585858',
		borderRightWidth: '1px',
		borderRightStyle: 'solid', 
		borderColor: '#E6E6E6',
		textAlign: 'center',
		marginTop: -10
	}; 
	 
	
	const linkStyle = { 
		color: '#585858',
		fontSize: '10px',
		fontFamily: 'Verdana', 
		display: 'inline'
	};
	const triangleDown = {
	width: 0,
	height: 0,
	marginLeft: 40,
	top: 0,
	borderLeft: '3px solid transparent',
	borderRight: '3px solid transparent',
	borderTop: '5px solid #990000',
	position: 'absolute'
	};

	let tempMenuName = menu.name.toLowerCase();
	if(tempMenuName == "store group") tempMenuName = "group";
	if(tempMenuName == "apply template") tempMenuName = "progress";
	
	let tempCurrentURL = currentURL;
	if(tempCurrentURL.indexOf("form") > 0) tempCurrentURL = tempCurrentURL.substring(0,tempCurrentURL.indexOf("form"));
		
	let currentMenuStyle = menuStyle;
	
	let currentTriangleStyle = {width: 120, marginTop:-10}; 
	
    return ( 
      <Col xs={1} style={currentMenuStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.onClick}>
		  <a href={`/${menu.path}`} style={linkStyle} >{menu.name}</a> 
    	  <div style={currentTriangleStyle}></div>
	  </Col> 
    );
  }
}

export default MenuListItem;