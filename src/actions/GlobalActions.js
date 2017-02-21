import AppDispatcher from '../dispatcher/AppDispatcher';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

import RoleConstants from '../constants/RoleConstants';
import RoleAPI from '../utils/rest/RoleAPI'; 

import StoreConstants from '../constants/StoreConstants';
import StoreAPI from '../utils/rest/StoreAPI'; 

export default {
   
  deleteAction: (location, index) => { 
	  
	  switch(location)
	  {
		  case 'role': 
			  RoleAPI
			  .manipulateData('api/deleterole',index)
			  .then(data => {  
				CustomRedirect.redirect("/role");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: RoleConstants.RECIEVE_DATA_ERROR,
				  message: message
				});
			  }); 
			break;
			case 'store': 
			  StoreAPI
			  .manipulateData('api/deletestore',index)
			  .then(data => {  
				CustomRedirect.redirect("/store");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: StoreConstants.RECIEVE_DATA_ERROR,
				  message: message
				});
			  }); 
			break;
			case 'group': 
			  StoreAPI
			  .manipulateData('api/deletegroup',index)
			  .then(data => {  
				CustomRedirect.redirect("/group");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: StoreConstants.RECIEVE_DATA_ERROR,
				  message: message
				});
			  }); 
			break;
		  default  :
		  console.log('default');
			break;
	  } 
	  console.log('xxxx');
  } 
  
}