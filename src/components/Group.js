import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'; 
import GroupActions from '../actions/GroupActions';
import GroupStore from '../stores/GroupStore';
import DefaultPaginationConstants from '../constants/DefaultPaginationConstants';

import LinkComponent from '../utils/griddle/LinkComponent';
import HeaderComponentInputFilter from '../utils/griddle/HeaderComponentInputFilter';
import HeaderComponentDropDownFilter from '../utils/griddle/HeaderComponentDropDownFilter';
import HeaderComponentDefault from '../utils/griddle/HeaderComponentDefault';
import EditComponent from '../utils/griddle/EditComponent';
import DependencyDeleteComponent from '../utils/griddle/DependencyDeleteComponent';

import CustomRedirect from '../utils/CustomRedirect';

import Griddle from 'griddle-react';
   
function addEditDeleteButton(data, url) {
  data.Edit = data.id + url;
  data.Delete = data.id + url;
  return (
	 data
  );
}

function addEditDeleteButtonExtra(data, url) {
	
  var isDeletable= ""; 
  if(data.childCount != null || data.storeCount != null)
  {
	  isDeletable = "0";
  }
  else
  {
	  isDeletable = "1";
  }
  
  data.Edit = data.id + url;
  data.Delete = data.id + url + "/" + isDeletable;
  
  return (
	 data
  );
}

class GroupComponent extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: [],
      data2: []
    } 
	this.noDataMessage = <div className="loader" style={{marginTop:20,marginBottom:20}}></div>;
    
    this.onChange = this.onChange.bind(this);
    this.addClick = this.addClick.bind(this);  
  }

  updateColumnMeta()
  {
	  
	if (this.state.data2) { 
	console.log(JSON.stringify(this.state.data2) );
      this.state.data2.map(data => console.log(data));
    }  
	else
	{
		console.log("no data received in updateColumnMeta");
	}
	
	this.columnMeta = [
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
	  "columnName": "parentName",
	  "order": 3,
	  "customHeaderComponent": HeaderComponentInputFilter,
	    "customHeaderComponentProps": {displayText : "parent name"}
	  },
	  { 
	  "columnName": "companyName",
	  "customHeaderComponent": HeaderComponentDefault,
	    "customHeaderComponentProps": {displayText : "company name"}
	//  "customHeaderComponentProps": { color: 'black' , data:this.state.data2,currentValue: "Select a company",customKey: "id",customDescription: "name"}
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
	  "customComponent": DependencyDeleteComponent 
	  }, 
	  { 
	  "columnName": "childCount",  
	  "visible": false  
	  }, 
	];
  } 

  addClick()
  {
	  CustomRedirect.redirect("groupform"); 	
  }

  componentWillMount() {
    GroupStore.addChangeListener(this.onChange);
  }

  componentDidMount() { 
    GroupActions.getData1();
    GroupActions.getAllCompanies(); 
	this.updateColumnMeta();
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      data1: GroupStore.getData1(),
      data2: GroupStore.getAllCompanies()
    }); 
	
	this.updateColumnMeta();
  }

  render() {
    let dataListItems;
	if (this.state.data1) { 
      dataListItems = this.state.data1.map(data => addEditDeleteButtonExtra(data, this.props.location.pathname));
    }  
	return (
		<div>
			<div style={{marginBottom:15}}>
				<Griddle results={this.state.data1} resultsPerPage={DefaultPaginationConstants.RECORD_PER_PAGE} columnMetadata={this.columnMeta}  columns = {['id', 'name', 'parentName','companyName','Edit','Delete']} /*showFilter={true}*/ sortable={true} noDataMessage={this.noDataMessage}   />
			</div>
			<div>
				<button type="button" className ="btn btn-primary" onClick={this.addClick} >Create New Group</button>
			</div>
		</div>
	);
  }
}

export default GroupComponent;