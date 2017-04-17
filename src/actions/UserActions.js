import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';
import RestUtil from '../utils/general/RestUtil';

export default {
 
  getData1: () => {
    RestUtil
      .receiveDataPost('api/user')
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
    RestUtil
      .manipulateData('api/updatePassword',params)
      .then(CustomRedirect.redirect("/template"))
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: UserConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllCompany: () => {
    RestUtil
      .getData('api/company')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: UserConstants.USER_RECIEVE_DATA_ALL_COMPANY,
          allCompanyData: data
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
    RestUtil
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
	RestUtil
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
    RestUtil
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
    RestUtil
      .receiveDataPost('api/role')
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