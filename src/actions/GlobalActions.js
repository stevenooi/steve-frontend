import AppDispatcher from '../dispatcher/AppDispatcher';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

import RestUtil from '../utils/general/RestUtil';
 

export default {
   
  deleteAction: (location, index) => { 
	  switch(location)
	  { 
			case 'user': 
			  RestUtil
			  .manipulateData('api/deleteuser',index)
			  .then(data => {  
				CustomRedirect.redirect("/user");
			  })
			  .catch(message => {
				alert(message);
				AppDispatcher.dispatch({
				  actionType: RoleConstants.ROLE_RECIEVE_DATA_ERROR,
				  message: message
				});
			  }); 
			break; 
		  default  : 
		    console.log('default');
			break;
	    } 
    } 
  
}