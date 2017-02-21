import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import TemplateActions from '../actions/TemplateActions';
import TemplateStore from '../stores/TemplateStore';

import LinkComponent from '../utils/griddle/LinkComponent';
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';
import HeaderComponentDropDownFilter from '../utils/griddle/HeaderComponentDropDownFilter';
import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent';
import CloneComponent from '../utils/griddle/CloneComponent';
import DeleteComponent from '../utils/griddle/DeleteComponent';

import CustomRedirect from '../utils/CustomRedirect';

import TemplateKeyConstants from '../constants/TemplateKeyConstants';

import Griddle from 'griddle-react';
  
var columnMeta = [
  { 
  "columnName": "name",
  "order": 2,
  "locked": false,
  "visible": true,
  "customHeaderComponent": HeaderComponentInputFilter 
  },
  { 
  "columnName": "id",
  "order": 1,
  "customHeaderComponent": HeaderComponentDefault
  }, 
  { 
  "columnName": "location",
  "customHeaderComponent": HeaderComponentDropDownFilter,
  "customHeaderComponentProps": { color: 'black' }
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
  { 
  "columnName": "Clone",  
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": CloneComponent
  } 
];


function addEditDeleteButton(data, url) {
console.log("data.status:" + data.status);
  if(data.status != TemplateKeyConstants.ACTIVE)
  {
	  data.Edit = data.id + url;
	  data.Delete = data.id + url;
  }
  data.Clone = data.id + url;
  
  return (
	 data
  );
}

class TemplateComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: []
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
	  CustomRedirect.redirect("templateform"); 	
  }

  componentWillMount() {
    TemplateStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    TemplateActions.getData1();
  }

  componentWillUnmount() {
    TemplateStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      data1: TemplateStore.getData1()
    }); 
  }
  
  
  
  render() {
    let dataListItems;
	if (this.state.data1) { 
      dataListItems = this.state.data1.map(data => addEditDeleteButton(data, this.props.location.pathname));
    }  
	
    return (
		<div>
			<div style={{marginBottom:15}}>
				<Griddle results={this.state.data1} columnMetadata={columnMeta} /*showFilter={true}*/ sortable={true} noDataMessage={"No data could be found."} handleDelete={this.handleDelete} />
			</div>
			<div>
				<button type="button" className ="btn btn-primary" onClick={this.addClick} >Create New Template</button>
			</div>
		</div>
	);
  }
}

export default TemplateComponent;