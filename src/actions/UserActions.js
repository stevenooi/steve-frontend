import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import UserAPI from '../utils/rest/UserAPI';
import RoleAPI from '../utils/rest/RoleAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    UserAPI
      .getData('api/user')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  updatePassword: (params) => {
    UserAPI
      .manipulateData('api/updatePassword',params)
      .then(CustomRedirect.redirect("/template"))
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllBrands: () => {
    UserAPI
      .getData('api/brand')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA_ALL_BRAND,
          allBrandData: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
   addData: (params) => {
    UserAPI
      .manipulateData('api/adduser',params)
      .then(data => {   
	  CustomRedirect.redirect("/user"); 
	  AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => {
	UserAPI
      .getDataById('api/user',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => {
    UserAPI
      .manipulateData('api/edituser',params)
      .then(data => {  
	  CustomRedirect.redirect("/user");
	  AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA_SINGLE
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }, 
  getAllRoles: () => {
    UserAPI
      .getData('api/role')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA_ROLES,
          data: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}