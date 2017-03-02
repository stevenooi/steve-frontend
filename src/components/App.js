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
        <Grid >
          <Row >
		  </Row>
          <Row > 
            <Col  style={{width:"calc((100% - 10px) )"}} xs={12} >
              {this.props.children} 
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;