
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticateConstants from '../constants/AuthenticateConstants'; 

export default {

  login: (username,password) => {
	  console.log("username:" + username + ",password:" + password);
    AppDispatcher.dispatch({
          actionType: AuthenticateConstants.LOGIN_USER,
		  username : username,
		  password : password
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthenticateConstants.LOGOUT_USER
    });
  }

}