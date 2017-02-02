import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _menus = [];
let _menu = {};

function setMenus(menu) {
  _menus = menu;
}

function setMenu(menu) {
  _menu = menu;
}

class MenuStoreClass extends EventEmitter {

  emitChange() { 
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getMenus() {
    return _menus;
  }
	
  getMenu() {
    return _menu;
  }

}

const MenuStore = new MenuStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
MenuStore.dispatchToken = AppDispatcher.register(action => { 

  switch(action.actionType) {
    case MenuConstants.RECIEVE_CONTACTS: 
      setMenus(action.menus);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      MenuStore.emitChange();
      break

    case MenuConstants.RECIEVE_CONTACT:
      setContact(action.contact);
      MenuStore.emitChange();
      break

    case MenuConstants.RECIEVE_CONTACT_ERROR:
      alert(action.message);
      MenuStore.emitChange();
      break

    case MenuConstants.RECIEVE_CONTACTS_ERROR:
      alert(action.message);
      MenuStore.emitChange();
      break

    default:
  }

});

export default MenuStore;