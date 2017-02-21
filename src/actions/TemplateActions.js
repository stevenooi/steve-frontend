import AppDispatcher from '../dispatcher/AppDispatcher';
import TemplateConstants from '../constants/TemplateConstants';
import TemplateAPI from '../utils/rest/TemplateAPI';
import ReactRedirect from 'react-redirect';
import React, { Component } from 'react'; 
import CustomRedirect from '../utils/CustomRedirect';

export default {
 
  getData1: () => {
    TemplateAPI
      .getData('api/template')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getAllTemplates: () => {
    TemplateAPI
      .getData('api/template')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_ALL_TEMPLATES,
          data2: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }, 
   addData: (params) => { 
    TemplateAPI
      .manipulateData('api/addtemplate',params)
      .then(data => {   
	  CustomRedirect.redirect("/template"); 
	  AppDispatcher.dispatch({	
          actionType: TemplateConstants.RECIEVE_DATA
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getTemplateSlide: (params) => { 
  
    TemplateAPI
      .getDataById('api/templateslide' ,params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_SLIDE_RECIEVE_DATA_SINGLE,
          data3 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  getDataById: (params) => { 
    TemplateAPI
      .getDataById('api/template',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: TemplateConstants.TEMPLATE_RECIEVE_DATA_SINGLE,
          data1 : data
        }); 
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  },
  editData: (params) => { 
    TemplateAPI
      .manipulateData('api/edittemplate',params)
      .then(data => {  
	  CustomRedirect.redirect("/template");
	  AppDispatcher.dispatch({	
          actionType: TemplateConstants.RECIEVE_DATA_SINGLE
        });
      })
      .catch(message => {
		alert(message);
		AppDispatcher.dispatch({
          actionType: TemplateConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
  
}