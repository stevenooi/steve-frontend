
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
	paddingBottom: 10
	};
    return ( 
      <Col xs={2} style={menuStyle}> 
		<a href={`/page${menu.id}`}>{menu.name}</a> 
      </Col> 
    );
  }
}

export default MenuListItem;