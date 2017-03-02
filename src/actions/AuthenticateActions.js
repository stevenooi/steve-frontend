
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticateConstants from '../constants/AuthenticateConstants'; 
import AuthenticateAPI from '../utils/rest/AuthenticateAPI'; 

export default {

  login: (params) => { 
    AuthenticateAPI
      .postData('api/login',params)
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