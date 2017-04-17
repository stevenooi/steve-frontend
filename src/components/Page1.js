 

import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';
import BaseActions from '../actions/BaseActions';
import BaseStore from '../stores/BaseStore';
//import ContactListItem from './ContactListItem';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Gallery from 'react-grid-gallery';
import Griddle from 'griddle-react';
var ws = require('ws');

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
        images: "",
        data1: []
    } 

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.lightBoxImageClick = this.lightBoxImageClick.bind(this);
  }

  //currently unused as lightbox function is disabled
  lightBoxImageClick(index, image)
  {
	  
    this.setState({
      selectedImage: index.currentTarget.src
    }); 
  }
  
    onSelectImage (index, image) { 
		console.log("index:" + index);
    this.setState({
      selectedImage: index
    }); 
		 
	  console.log("onselectimage activated 2s");
    }

  
  test2()
  {
    this.setState({
      selectedImage: "test2 activated"
    }); 
	  console.log("test2 activated");
  }
  
  componentWillMount() {
    BaseStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BaseActions.getData1();
  console.log("attempt to connect"); 
const ws = new WebSocket('ws://192.168.3.125/ws', {
  perMessageDeflate: false
});
  console.log("connection end");
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
		<div>Seleced Image : {this.state.selectedImage}
			<Gallery images={IMAGES} showImageCount={true} onSelectImage={this.onSelectImage} onClickThumbnail={this.onSelectImage} enableImageSelection={true} enableLightbox={false} onClickImage={this.lightBoxImageClick} backdropClosesModal={true} />
		</div>
    );
  }
}

export default Page1Component;