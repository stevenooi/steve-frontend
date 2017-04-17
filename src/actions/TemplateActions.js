import AppDispatcher from '../dispatcher/AppDispatcher';
import TemplateConstants from '../constants/TemplateConstants'; 
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';
import RestUtil from '../utils/general/RestUtil';

export default {
 
  getData1: () => {
    RestUtil
      .receiveDataPost('api/template')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllTemplates: () => {
    RestUtil
      .getData('api/template')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_ALL_TEMPLATES,
          data2: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }, 
   addData: (params) => { 
    RestUtil
      .manipulateData('api/addtemplate',params)
      .then(data => {   
	  CustomRedirect.redirect("/template"); 
	  AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getTemplateSlide: (params) => { 
  
    RestUtil
      .getDataById('api/templateslide' ,params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_SLIDE_RECIEVE_DATA_SINGLE,
          data3 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => { 
    RestUtil
      .getDataById('api/template',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => { 
    RestUtil
      .manipulateData('api/edittemplate',params)
      .then(data => {  
	  CustomRedirect.redirect("/template");
	  AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_SINGLE
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}