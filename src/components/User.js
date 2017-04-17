import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

import DefaultPaginationConstants from '../constants/DefaultPaginationConstants'; 
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';

import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent';
import DeleteComponent from '../utils/griddle/DeleteComponent';
import TextComponent from '../utils/griddle/TextComponent';

import CustomRedirect from '../utils/CustomRedirect';

import Griddle from 'griddle-react';
  
var columnMeta = [
  { 
  "columnName": "userid",
  "order": 2,
  "locked": false,
  "visible": true,
  "customHeaderComponent": HeaderComponentInputFilter ,
  "customHeaderComponentProps": {displayText : "username"},
  "customComponent": TextComponent
  },
  { 
  "columnName": "id",
  "order": 1,
  "customHeaderComponent": HeaderComponentDefault,
  "customComponent": TextComponent 
  }, 
  { 
  "columnName": "Edit",  
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": EditComponent
  }, 
  { 
  "columnName": "Delete", 
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": DeleteComponent
  }, 
];


function addEditDeleteButton(data, url) {
  data.Edit = data.id + url;
  data.Delete = data.id + url;
  return (
	 data
  );
}

class UserComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: [],
	  noDataMessage : <div className="loader" style={{marginTop:20,marginBottom:20}}></div>	
    } 
	
	this.onChange = this.onChange.bind(this);
    this.addClick = this.addClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete()
  {
	alert('delete handled');
  }	 

  addClick()
  {
	  CustomRedirect.redirect("userform"); 	
  }

  componentWillMount() {
    UserStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    UserActions.getData1();
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      data1: UserStore.getData1()
    }); 
	
	if(UserStore.getData1() == "")
	{ 	
		this.setState({
			noDataMessage: <div className="loaderNoData"><div><img src="images/nodata2.png" style={{width:50,marginLeft:8,marginTop:16,opacity:0.4}} /></div><div style={{color:'grey',marginTop:5}}>No Records</div></div>
		});
	}
  }

  render() {
    let dataListItems;
	if (this.state.data1) { 
      dataListItems = this.state.data1.map(data => addEditDeleteButton(data, this.props.location.pathname));
    }  
	
    return (
		<div>
			<div style={{marginBottom:15}}>
				<Griddle results={this.state.data1} resultsPerPage={DefaultPaginationConstants.RECORD_PER_PAGE} columnMetadata={columnMeta} /*showFilter={true}*/ sortable={true} noDataMessage={this.state.noDataMessage} handleDelete={this.handleDelete} />
			</div>
			<div>
			<button type="button" className ="btn btn-primary" onClick={this.addClick} >Create New User</button>
			</div>
		</div>
	);
  }
}

export default UserComponent;