 

import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';
import MenuActions from '../actions/MenuActions';
import MenuStore from '../stores/MenuStore';
import MenuListItem from './MenuListItem';
import { Grid, Row, Col } from 'react-bootstrap';
  
function getMenuListItem(menu) {
  return (
    <MenuListItem
      key={menu.id}
      menu={menu}
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
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    MenuStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    MenuActions.recieveContacts();
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
      menuListItems = this.state.menu.map(menu => getMenuListItem(menu));
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
    return ( 
		<div style={menuStyle}> 
        <Grid>
          <Row xs={12} >
			{menuListItems}
		  </Row>
        </Grid> 
		</div>
    );
  }
}

export default MenuComponent;