import AppDispatcher from '../dispatcher/AppDispatcher';
import ProgressConstants from '../constants/ProgressConstants';
import ProgressAPI from '../utils/rest/ProgressAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    ProgressAPI
      .getData('api/progress')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: ProgressConstants.RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ProgressConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
    getAllActiveTemplates: () => {
    ProgressAPI
      .getData('api/templateactive')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: ProgressConstants.RECIEVE_DATA_ALL_TEMPLATES,
          data: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ProgressConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  updateData: (params) => {
    ProgressAPI
      .manipulateData('api/updateprogress',params)
      .then(data => {   
	  CustomRedirect.redirect("/progress"); 
	  AppDispatcher.dispatch({	
          actionType: ProgressConstants.RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: ProgressConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  } 
}