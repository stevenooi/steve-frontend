import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';
import RestUtil from '../utils/general/RestUtil';

export default {
 
  getAllCompany: () => {
    RestUtil
      .getData('api/company')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: HeaderConstants.HEADER_RECIEVE_DATA,
          data: data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: HeaderConstants.HEADER_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
}