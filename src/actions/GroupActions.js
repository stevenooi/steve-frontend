import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupConstants from '../constants/GroupConstants';
import GroupAPI from '../utils/rest/GroupAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    GroupAPI
      .getData('api/group')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: GroupConstants.RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllGroupExceptSelf: (params) => {
    GroupAPI
      .getDataById('api/groupexceptself',params)
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: GroupConstants.GROUP_RECIEVE_ALL_EXCEPTSELF,
          data: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllCompanies: () => {
    GroupAPI
      .getData('api/companylist')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: GroupConstants.GROUP_RECIEVE_ALL_COMPANIES,
          data2: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllGroups: () => {
    GroupAPI
      .getData('api/group')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: GroupConstants.GROUP_RECIEVE_ALL_GROUPS,
          data3: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
   addData: (params) => { 
    GroupAPI
      .manipulateData('api/addgroup',params)
      .then(data => {   
	  CustomRedirect.redirect("/group"); 
	  AppDispatcher.dispatch({	
          actionType: GroupConstants.RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => { 
    GroupAPI
      .getDataById('api/group',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: GroupConstants.GROUP_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => {
    GroupAPI
      .manipulateData('api/editgroup',params)
      .then(data => {  
	  CustomRedirect.redirect("/group");
	  AppDispatcher.dispatch({	
          actionType: GroupConstants.RECIEVE_DATA_SINGLE
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: GroupConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}