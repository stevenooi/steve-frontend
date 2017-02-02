import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class AuthenticationFilter extends Component {
	
  componentDidMount() {
    const { dispatch, currentURL } = this.props  
	console.log("currentURL:" + this.props.location.pathname);
    if (localStorage.getItem('loggedIn') == "YES" ) { 
		console.log("loggedIn");
		// use React Router redirect 
		if(this.props.location.pathname == "/")
			browserHistory.replace("/home")
    }
	else
	{ 
		console.log("Not loggedIn");
		browserHistory.replace("/login")
	}
  }

  render() {
    if (localStorage.getItem('loggedIn') == "YES"){
      return this.props.children
    } else {
      return null
    }
  }	
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

//export default connect(mapStateToProps)(EnsureLoggedInContainer)
export default AuthenticationFilter;