import request from 'superagent/lib/client';
import ApiSettings from '../../config/apiSettings';
  

export default {
  getData: (url) => { 
    return new Promise((resolve, reject) => {
      request
        .get(ApiSettings.NODE_SERVER + "/" + url)
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
  manipulateData: (url,params) => {   
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
  }
	 
}