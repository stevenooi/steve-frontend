import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import TemplateActions from '../actions/TemplateActions';
import TemplateStore from '../stores/TemplateStore';

import DefaultPaginationConstants from '../constants/DefaultPaginationConstants';

import LinkComponent from '../utils/griddle/LinkComponent';
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';
import HeaderComponentDropDownFilter from '../utils/griddle/HeaderComponentDropDownFilter';
import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent';
import ViewComponent from '../utils/griddle/ViewComponent';
import StatusComponent from '../utils/griddle/StatusComponent';
import CloneComponent from '../utils/griddle/CloneComponent';
import DependencyDeleteComponent from '../utils/griddle/DependencyDeleteComponent';

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
  "columnName": "status",
  "customHeaderComponent": HeaderComponentDefault,
  "customComponent": StatusComponent, 
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
  "columnName": "View",  
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": ViewComponent
  }, 
  { 
  "columnName": "Delete", 
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'black' },
  "sortable": false,
  "customComponent": DependencyDeleteComponent
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
	
  data.Edit = "";
  data.Delete = "";
  if(data.status != TemplateKeyConstants.ACTIVE && data.status != TemplateKeyConstants.DEPLOYED)
  { 
	  data.Edit = data.id + url;
	  data.Delete = data.id + url + "/1";   
  }
  data.Clone = data.id + url;
  
  data.View = data.id + url;
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
	this.noDataMessage = <div className="loader" style={{marginTop:20,marginBottom:20}}></div>;	
  }

  handleDelete()
  {
	//alert('delete handled');
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
    dataListItems.map(data => console.log("this.state.data1.Edit:" + data.Edit));
	 
    return (
		<div>
			<div style={{marginBottom:15}}>
				<Griddle results={this.state.data1} columnMetadata={columnMeta} /*showFilter={true}*/ resultsPerPage={DefaultPaginationConstants.RECORD_PER_PAGE} sortable={true} noDataMessage={this.noDataMessage} handleDelete={this.handleDelete} />
			</div>
			<div>
				<button type="button" className ="btn btn-primary" onClick={this.addClick} >Create New Template</button>
			</div>
		</div>
	);
  }
}

export default TemplateComponent;