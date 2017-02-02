import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import Header from './Header';
import Topbar from './Topbar';
import { Grid, Row, Col } from 'react-bootstrap';

class AppComponent extends Component {

  componentWillMount() { 
  }

  render() {
    return (
      <div>
        <Header></Header>
              <Topbar />
        <Grid>
          <Row xs={1}>
		  </Row>
          <Row xs={10}> 
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