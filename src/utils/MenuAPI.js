import request from 'superagent/lib/client';
import ApiSettings from '../config/apiSettings';

import AuthStore from '../stores/AuthStore';

export default {

  // We want to get a list of all the contacts
  // from the API. This list contains reduced info
  // and will be be used in the sidebar
  getContacts: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },
	
  getContact: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Authorization', 'Bearer ' + AuthStore.getJwt())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },  
  postMenu: (url,params) => {
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
}