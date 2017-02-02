 

import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';
import BaseActions from '../actions/BaseActions';
import BaseStore from '../stores/BaseStore';
//import ContactListItem from './ContactListItem';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Griddle from 'griddle-react';

function getDataItem(data) {
  return (
  <div> ID:{data.id} NAME: {data.name} </div>
  );
}

function getDataItemInTable(data) {
  return (
   <tr key={data.id}><td >{data.id}</td><td>{data.name}</td><td>{data.location}</td></tr>
  );
}


var LinkComponent = React.createClass({
  render: function(){
    var  url ="speakers/" + this.props.rowData.state + "/" + this.props.data;
    return <a href={url}>{this.props.data}</a>
  }
});
var HeaderComponentInputFilter = React.createClass({
  textOnClick: function(e) {
    e.stopPropagation();
  },

  filterText: function(e) {
    this.props.filterByColumn(e.target.value, this.props.columnName)
  },

  render: function(){
    return (
      <span>
        <div><strong style={{color: this.props.color}}>{columnCapitalize(this.props.displayName)}</strong></div>
        <input type='text' style={{width:100, height:20}} onChange={this.filterText} onClick={this.textOnClick} />
      </span>
    );
  }
});


var HeaderComponentDropDownFilter = React.createClass({
  textOnClick: function(e) {
    e.stopPropagation();
  },

  filterText: function(e) { 
	if(e.target.value == "*")
	{ 
		this.props.filterByColumn('', this.props.columnName)
	}
	else
	{
		this.props.filterByColumn(e.target.value, this.props.columnName)
	}
  },

  render: function(){
    return (
      <span>
        <div><strong style={{color: this.props.color}}>{columnCapitalize(this.props.displayName)}</strong></div>
		<select style={{width:100, height:20}} onChange={this.filterText}>
			<option value="*">All</option>
			<option value="Australia">Australia</option>
			<option value="India">India</option>
			<option value="Germany">Germany</option>
			<option value="Scotland">Scotland</option>
		</select> 
      </span>
    );
  }
});

function columnCapitalize(data)
{ 
	return data.replace(/\b\w/g, l => l.toUpperCase());
}

var HeaderComponentDefault = React.createClass({ 
  render: function(){
    return (
      <span >
        <div><strong style={{color: this.props.color, width:500}}>{columnCapitalize(this.props.displayName)}</strong></div> 
      </span>
    );
  }
});


var EditComponent = React.createClass({ 

  render: function(){
    return (
       <img
          style={{width: 20, height: 20}}
          src={'images/edit-button.png'}
        />
    );
  }
});


var DeleteComponent = React.createClass({ 

  render: function(){
    return (
       <img
          style={{width: 20, height: 20}}
          src={'images/delete-button.jpg'}
        />
    );
  }
});


var columnMeta = [
  { 
  "columnName": "name",
  "order": 1,
  "locked": false,
  "visible": true,
  "customHeaderComponent": HeaderComponentDefault,
  "customComponent": LinkComponent
  },
  { 
  "columnName": "id",
  "customHeaderComponent": HeaderComponentInputFilter,
  "customHeaderComponentProps": { color: 'red' },
  "cssClassName": "LabelColumn"
  },
  { 
  "columnName": "location",
  "customHeaderComponent": HeaderComponentDropDownFilter,
  "customHeaderComponentProps": { color: 'blue' }
  },
  { 
  "columnName": "Edit",  
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'blue' },
  "sortable": false,
  "customComponent": EditComponent
  }, 
  { 
  "columnName": "Delete", 
  "customHeaderComponent": HeaderComponentDefault,
  "customHeaderComponentProps": { color: 'blue' },
  "sortable": false,
  "customComponent": DeleteComponent
  }, 
];


function addEditDeleteButton(data) {
  data.Edit = '0';
  data.Delete = '0';
  return (
	 data
  );
}

class Page1Component extends Component {

  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      data1: []
    }
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    BaseStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BaseActions.getData1();
  }

  componentWillUnmount() {
    BaseStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      data1: BaseStore.getData1()
    }); 
  }

  render() {
    let dataListItems;
	if (this.state.data1) { 
      dataListItems = this.state.data1.map(data => addEditDeleteButton(data));
    }  
	
    return (
	   <Griddle results={this.state.data1} columnMetadata={columnMeta} /*showFilter={true}*/ sortable={true} noDataMessage={"No data could be found."} />
    );
  }
}

export default Page1Component;