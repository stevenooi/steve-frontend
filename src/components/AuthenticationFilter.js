import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AuthenticateUtil from '../utils/general/AuthenticateUtil';

class AuthenticationFilter extends Component {
	
  componentDidMount() {
    const { dispatch, currentURL } = this.props  
	//console.log("currentURL:" + this.props.location.pathname);
	
	var authenticateFlag = true;
	
	//use of authenticateFlag to stop the next function from running if the previous function return false
	authenticateFlag = AuthenticateUtil.checkLoginStatus(this,authenticateFlag); 
	authenticateFlag = AuthenticateUtil.checkTimeOut(authenticateFlag);
	authenticateFlag = AuthenticateUtil.updateLoginStatusUser(authenticateFlag);
  }
   
  render() {
    if (localStorage.getItem('loggedIn') == "YES"){
      return this.props.children
    } else {
      return null
    }
  }	
}
 
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

//export default connect(mapStateToProps)(EnsureLoggedInContainer)
export default AuthenticationFilter;