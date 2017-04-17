
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticateConstants from '../constants/AuthenticateConstants'; 

import RestUtil from '../utils/general/RestUtil';

export default {

  login: (params) => { 
    RestUtil
      .manipulateData('api/login',params)
      .then(data => { 
        AppDispatcher.dispatch({	
          actionType: AuthenticateConstants.LOGIN_USER,
          data: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AuthenticateConstants.LOGIN_USER,
          data: message
        });
      });
    },
	post: (url,params) => { 
    //alert(new Date().toLocaleString());
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
    /*AppDispatcher.dispatch({
          actionType: AuthenticateConstants.LOGIN_USER,
		  username : username,
		  password : password
    });*/ 

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthenticateConstants.LOGOUT_USER
    });
  }

}