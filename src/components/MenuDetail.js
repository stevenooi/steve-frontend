
import React, { Component } from 'react';
import MenuActions from '../actions/MenuActions';
import MenuStore from '../stores/MenuStore';

class MenuDetailComponent extends Component {

  constructor() {
    super();
    this.state = {
      menu: {}
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    ContactStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    MenuActions.getContact(this.props.params.id);
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      menu: MenuActions.getContact(nextProps.params.id)
    });
  }

  onChange() {
    this.setState({
      menu: MenuStore.getContact(this.props.params.id)
    });
  }

  render() {
    let menu;
    if (this.state.menu) {
      menu = this.state.menu;
    }
    return (
      <div>
        { this.state.menu &&
          <div>
            <img src={menu.image} width="150" />
            <h1>{menu.name}</h1>
            <h3>{menu.email}</h3>
          </div>
        }
      </div>
    );
  }
}

export default MenuDetailComponent;