
import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

class MenuListItem extends Component { 

  render() { 
    const { menu } = this.props;
	const menuStyle = { 
	fontSize: 14,
	paddingTop: 10,
	paddingBottom: 10,
	width: this.props.width
	}; 
    return ( 
      <Col xs={1} style={menuStyle}>
		<a href={`/${menu.path}`}>{menu.name}</a> 
      </Col> 
    );
  }
}

export default MenuListItem;