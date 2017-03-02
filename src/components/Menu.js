 

import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';
import MenuActions from '../actions/MenuActions';
import MenuStore from '../stores/MenuStore';
import MenuListItem from './MenuListItem';
import { Grid, Row, Col } from 'react-bootstrap';
  
function getMenuListItem(menu,width) {
  return (
    <MenuListItem
      key={menu.id}
      menu={menu}
	  width={width}
    />
  );
}
class MenuComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      menu: []
    }
	this.params = {};
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
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
    if (this.state.menu) { 
      // Map over the contacts and get an element for each of them
	  var menuWidth = 150;
	  if(this.state.menu.length > 0)
		  menuWidth = 900/this.state.menu.length;
      menuListItems = this.state.menu.map(menu => getMenuListItem(menu,menuWidth));
    }
	const menuStyle = { 
	fontSize: 14	,
	paddingTop: 0,
	paddingBottom: 0,
	borderStyle: 'solid',
	borderWidth: 1,
	borderColor:'#f2f2f2',
	borderRadius: 0,
	marginBottom : 14,
	minWidth: 500,
	};
	console.log("menu length :" + menuListItems.length);
    return ( 
		<div style={menuStyle}> 
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