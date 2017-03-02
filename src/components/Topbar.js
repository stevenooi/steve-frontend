
import React, { Component } from 'react';
import Menu from './Menu';

class SidebarComponent extends Component {
  render() {
    return (
	  <div className="container-fluid">
        <Menu />
	  </div>
    );
  }
}

export default SidebarComponent;