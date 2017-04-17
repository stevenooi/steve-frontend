import AppDispatcher from '../dispatcher/AppDispatcher';
import ProgressConstants from '../constants/ProgressConstants';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';
import RestUtil from '../utils/general/RestUtil';

export default {
 
  getData1: () => {
    RestUtil
      .receiveDataPost('api/progress')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA_ERROR,
          message: message
        });
      });
    },
    getAllActiveTemplates: () => {
    RestUtil
      .receiveDataPost('api/templateactive')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA_ALL_TEMPLATES,
          data: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  updateData: (params) => {
    RestUtil
      .manipulateData('api/updateprogress',params)
      .then(data => {   
	  CustomRedirect.redirect("/progress"); 
	  AppDispatcher.dispatch({	
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: ProgressConstants.PROGRESS_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  } 
}