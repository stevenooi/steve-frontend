import AuthenticateConstants from '../../constants/AuthenticateConstants';
import { browserHistory } from 'react-router';
import ApiSettings from '../../config/apiSettings';
import PromiseHandler from '../general/PromiseHandler';
import request from 'superagent/lib/client';

export default {
    
  getData: (url) =>
  {  
	return new Promise((resolve, reject) => { 
      request
        .get(ApiSettings.NODE_SERVER + "/" + url)
        .end((err, response) => {
		
			if (err)
			{ 
				if(!PromiseHandler.checkPromise(url)) reject(err);
			}
			else
			{
				resolve(JSON.parse(response.text));
			}
        })
    });

	
	;
  },
  receiveDataPost: (url) => { 
    var params = {};
    params.reqtime = new Date().toLocaleString();
	params.requser = localStorage.getItem('username'); 
	params.reqcompanyid = localStorage.getItem('companyid');  
    return new Promise((resolve, reject) => {
      request
        .post(ApiSettings.NODE_SERVER + "/" + url)
		.set('Content-Type', 'application/json')
		.send(params) 
        .end((err, response) => {
			if (err)
			{ 
				if(!PromiseHandler.checkPromise(url)) reject(err);
			}
			else
			{
				resolve(JSON.parse(response.text));
			}
        })
    });
  },
  manipulateData: (url,params) => { 
    params.reqtime = new Date().toLocaleString();
	params.requser = localStorage.getItem('username'); 
    return new Promise((resolve, reject) => {
      request
        .post(ApiSettings.NODE_SERVER + "/" + url)
		.set('Content-Type', 'application/json')
		.send(params) 
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },
  getDataById: (url,params) => {  
    return new Promise((resolve, reject) => {
      request
        .get(ApiSettings.NODE_SERVER + "/" +  url + "/" + params)
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  }, 
	 
}