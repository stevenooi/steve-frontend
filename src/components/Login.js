import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'; 
import Header from './Header'; 
import { Grid, Row, Col } from 'react-bootstrap'; 
import AuthenticateActions from '../actions/AuthenticateActions';
import AuthenticateStore from '../stores/AuthenticateStore';
import { browserHistory } from 'react-router';

class AppComponent extends Component {
constructor(props) {
    super(props)
    this.handleChange1 = this.handleChange1.bind(this); 
    this.handleChange2 = this.handleChange2.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
	
    this.onChange = this.onChange.bind(this);
    this.state ={
		username:"",
		password:"",
		errorMsg:""
    }
	
}
  onChange() {
	//redirect to home if login successful
    if (localStorage.getItem('loggedIn') == "YES" ) {  
		browserHistory.replace("/home")
    }
	this.setState({errorMsg: AuthenticateStore.getErrorMsg()});
  }
  
  handleChange1(event) {
	console.log("event.target : " + event.target.name);
    this.setState({username: event.target.value});
  }
  
  handleChange2(event) {
	console.log("event.target : " + event.target.name);
    this.setState({password: event.target.value});
  }
  
  handleSubmit(event) {
	console.log("Submit button clicked");
	AuthenticateActions.login(this.state.username,this.state.password);
	console.log("Submit button clicked Afters");
  }
  
  componentWillMount() {
    AuthenticateStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
     
  }

  componentWillUnmount() {
    AuthenticateStore.removeChangeListener(this.onChange);
  }

  render() {
    return (
      <div> 
        <Grid>
          <Row>
            <Col xs={12} md={3}> 
				<Row><Col xs={12}>Login to the system</Col></Row> 
				<Row><Col xs={4}>Username</Col><Col xs={8}><input type="Text" name="username" ref="username" value={this.state.username} onChange={this.handleChange1}/></Col></Row>
				<Row><Col xs={4}>Password</Col><Col xs={8}><input type="password" value={this.state.password} onChange={this.handleChange2}/></Col></Row>
				<Row><Col xs={12}><input type="button" value="Submit" onClick={this.handleSubmit}/></Col></Row> 
				<Row><Col xs={12}><font color="red">{this.state.errorMsg}</font></Col></Row> 
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;