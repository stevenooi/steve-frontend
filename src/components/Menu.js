 

import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';
import MenuActions from '../actions/MenuActions';
import MenuStore from '../stores/MenuStore';
import MenuListItem from './MenuListItem';
import { Grid, Row, Col } from 'react-bootstrap';
  
var countMenu = 0;

function getMenuListItem(menu,width,currentURL) {
  countMenu++;
  
  return (
    <MenuListItem
      key={menu.id}
      menu={menu}
	  width={width}
	  countMenu={countMenu}
	  currentURL={currentURL}
    />
  );
}
class MenuComponent extends Component {

  constructor() {
    super();
    this.state = {
      menu: []
    }
	this.params = {}; 
    this.onChange = this.onChange.bind(this);
  }
  
  addParams(fieldName,value) {
	this.params[fieldName] = value;  
  }

  componentWillMount() {
    MenuStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
	this.addParams("roleName",localStorage.getItem('role')); 
    MenuActions.getMenu(JSON.parse(JSON.stringify(this.params)));
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this.onChange);
  }

  onChange() { 
    this.setState({
      menu: MenuStore.getMenus()
    });
  }
  
  render() {
    let menuListItems;
	countMenu = 0;
    if (this.state.menu) { 
      // Map over the contacts and get an element for each of them
	  var menuWidth = 150;
	  if(this.state.menu.length > 0)
		  menuWidth = 900/this.state.menu.length;
      menuListItems = this.state.menu.map(menu => getMenuListItem(menu,menuWidth,this.props.currentURL));
    } 
	
	const menuStyleFirst = { 
		fontSize: 14,
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		color: '#585858',  
		borderTopStyle: 'solid',
		borderTopWidth: '1px',
		borderTopColor: '#CFD8DC', 
		textAlign: 'center',
		cursor: 'pointer'
	}; 
	
	
	let currentMenuStyle = menuStyleFirst;
    return ( 
		<div style={currentMenuStyle}  >
        <Grid>
          <Row >
			{menuListItems} 
		  </Row>
        </Grid> 
		</div>
    );
  }
}

export default MenuComponent;