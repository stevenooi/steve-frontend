import AppDispatcher from '../dispatcher/AppDispatcher';
import StoreConstants from '../constants/StoreConstants';
import StoreAPI from '../utils/rest/StoreAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    StoreAPI
      .getData('api/store')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllTemplates: () => {
    StoreAPI
      .getData('api/template')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_ALL_TEMPLATES,
          data2: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllGroups: () => {
    StoreAPI
      .getData('api/group')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_ALL_GROUPS,
          data3: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllBrands: () => {
    StoreAPI
      .getData('api/brand')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_DATA_ALL_BRAND,
          allBrandData: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
   addData: (params) => { 
    StoreAPI
      .manipulateData('api/addstore',params)
      .then(data => {   
	  CustomRedirect.redirect("/store"); 
	  AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => { 
    StoreAPI
      .getDataById('api/store',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => {
    StoreAPI
      .manipulateData('api/editstore',params)
      .then(data => {  
	  CustomRedirect.redirect("/store");
	  AppDispatcher.dispatch({	
          actionType: StoreConstants.STORE_RECIEVE_DATA_SINGLE
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: StoreConstants.STORE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}