
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticateConstants from '../constants/AuthenticateConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//setup functions
function setUser(profile, token) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
  }
}

function removeUser() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

//create store
class AuthenticateStoreClass extends EventEmitter {
constructor(props) {
    super(props) 
    this.state ={
		errorMsg:""
    }
}
  emitChange() {
	 console.log("AuthenticateStoreClass-emitChange");
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  isAuthenticated() {
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJwt() {
    return localStorage.getItem('id_token');
  }
  
  getLoginState()
  {
	  
  }
  
  getErrorMsg()
  {
	  return this.state.errorMsg;
  }
}

const AuthenticateStore = new AuthenticateStoreClass();

//register store in dipatcher
AuthenticateStore.dispatchToken = AppDispatcher.register(action => { 
  switch(action.actionType) {

    case AuthenticateConstants.LOGIN_USER:
	  console.log("In AuthenticateStore - dispatchToken : " +action.username + " , " + action.password);
	  
	  if(action.username == "admin" && action.password == "password")
	  {
		 console.log("logins success");
		localStorage.setItem('loggedIn', "YES"); 
	  }
	  else{
		 console.log("logins failed");
		AuthenticateStore.state.errorMsg = "Invalid credentials";  
	  }
      //setUser(action.profile, action.token);
      AuthenticateStore.emitChange();
      break

    case AuthenticateConstants.LOGOUT_USER:
     // removeUser();
      AuthenticateStore.emitChange();
      break

    default:
  }

});

export default AuthenticateStore;