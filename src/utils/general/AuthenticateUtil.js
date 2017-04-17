import AuthenticateConstants from '../../constants/AuthenticateConstants';
import { browserHistory } from 'react-router';

export default {
  
  loginUser: (username,roleCode,companyId,companyName) =>
  {
	  var d = new Date();
	  
	  localStorage.setItem('username',username);
	  localStorage.setItem('logintime',d.getTime());
	  localStorage.setItem('activetime',d.getTime()); 
	  localStorage.setItem('role',roleCode);
		  
	  localStorage.setItem('companyid','%'); 
	
	  localStorage.setItem('companyname',companyName);
	  localStorage.setItem('loggedIn', "YES");

	  browserHistory.replace("/templateform")	  
  },
  updateLoginStatusUser: (authenticateFlag) =>
  {
	  if(authenticateFlag)
	  { 
		  var d = new Date();
		  localStorage.setItem('activetime',d.getTime());  
		  return true;
	  }	  
	  return false;
  },
  checkLoginStatus: (parentThis,authenticateFlag) =>
  {
	  if(authenticateFlag)
	  {			  
		if (localStorage.getItem('loggedIn') == "YES" ) {   
			if(parentThis.props.location.pathname == "/")
			{
				browserHistory.replace("/templatefprm")
				return false;
			}
			return true;
		}
		else
		{  
			browserHistory.replace("/login")
			return false;
		}
	  }
	  return false;
  },
  checkTimeOut: (authenticateFlag) =>
  { 
	  if(authenticateFlag)
	  {
		var end = new Date().getTime();
		var time = end - localStorage.getItem('activetime');
		
		if(time > (AuthenticateConstants.SESSION_TIMEOUT * 60 * 1000)) 
		{
			alert('You have been idle for more than ' + AuthenticateConstants.SESSION_TIMEOUT + ' minute. Please login again');
			localStorage.setItem('loggedIn', "NO");  
			browserHistory.replace("/login");
			return false;
		}
		else
		{
			return true;
		}
	 }
	 return false;
  }
	 
}