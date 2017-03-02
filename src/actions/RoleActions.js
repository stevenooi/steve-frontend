import AppDispatcher from '../dispatcher/AppDispatcher';
import RoleConstants from '../constants/RoleConstants';
import RoleAPI from '../utils/rest/RoleAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    RoleAPI
      .getData('api/role')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: RoleConstants.ROLE_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: RoleConstants.ROLE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
   addData: (params) => {
    RoleAPI
      .manipulateData('api/addrole',params)
      .then(data => {   
	  CustomRedirect.redirect("/role"); 
	  AppDispatcher.dispatch({	
          actionType: RoleConstants.ROLE_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: RoleConstants.ROLE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => {
	  console.log("params:" +params);
    RoleAPI
      .getDataById('api/role',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: RoleConstants.ROLE_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: RoleConstants.ROLE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => {
    RoleAPI
      .manipulateData('api/editrole',params)
      .then(data => {    
	  
	  CustomRedirect.redirect("/role");
	AppDispatcher.dispatch({	
          actionType: RoleConstants.ROLE_RECIEVE_DATA_SINGLE
        });
		   
      })
      .catch(message => {  
		alert(message);
		AppDispatcher.dispatch({
          actionType: RoleConstants.ROLE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}