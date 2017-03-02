import AppDispatcher from '../dispatcher/AppDispatcher';
import BrandConstants from '../constants/BrandConstants';
import BrandAPI from '../utils/rest/BrandAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => { 
    BrandAPI
      .getData('api/brand')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: BrandConstants.BRAND_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: BrandConstants.BRAND_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
   addData: (params) => {
    BrandAPI
      .manipulateData('api/addbrand',params)
      .then(data => {   
	  CustomRedirect.redirect("/brand"); 
	  AppDispatcher.dispatch({	
          actionType: BrandConstants.BRAND_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: BrandConstants.BRAND_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => {
	  console.log("params:" +params);
    BrandAPI
      .getDataById('api/brand',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: BrandConstants.BRAND_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: BrandConstants.BRAND_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => {
    BrandAPI
      .manipulateData('api/editbrand',params)
      .then(data => {    
	  
	  CustomRedirect.redirect("/brand");
	AppDispatcher.dispatch({	
          actionType: BrandConstants.BRAND_RECIEVE_DATA_SINGLE
        });
		   
      })
      .catch(message => {  
		alert(message);
		AppDispatcher.dispatch({
          actionType: BrandConstants.BRAND_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}