import AppDispatcher from '../dispatcher/AppDispatcher';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

import RoleConstants from '../constants/RoleConstants';
import RoleAPI from '../utils/rest/RoleAPI';
 
import BrandConstants from '../constants/BrandConstants';
import BrandAPI from '../utils/rest/BrandAPI'; 

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
			case 'user': 
			  RoleAPI
			  .manipulateData('api/deleteuser',index)
			  .then(data => {  
				CustomRedirect.redirect("/user");
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
			
			case 'template': 
			  StoreAPI
			  .manipulateData('api/deletetemplate',index)
			  .then(data => {  
				CustomRedirect.redirect("/template");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: StoreConstants.RECIEVE_DATA_ERROR,
				  message: message
				});
			  }); 
			break;
			
			case 'brand':  
			  BrandAPI
			  .manipulateData('api/deletebrand',index)
			  .then(data => {  
				CustomRedirect.redirect("/brand");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: BranchConstants.BRANCH_RECIEVE_DATA_ERROR,
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