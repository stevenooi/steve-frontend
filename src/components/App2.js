import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import Header from './Header'; 
import { Grid, Row, Col } from 'react-bootstrap';

class AppComponent extends Component {

  componentWillMount() { 
	localStorage.setItem('loggedIn', "NO"); 
  }

  componentDidMount()
  {
  }
  render() {
    return (
      <div> 
        <Header ></Header>
        <Grid>
          <Row>
            <Col xs={12} md={9}> 
              {this.props.children} 
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;