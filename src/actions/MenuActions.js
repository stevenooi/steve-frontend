import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';
import MenuAPI from '../utils/MenuAPI';

export default {

  recieveContacts: () => {
    MenuAPI
      .getContacts('http://localhost:3001/api/menu')
      .then(menu => {
        AppDispatcher.dispatch({	
          actionType: MenuConstants.RECIEVE_CONTACTS,
          menus: menu
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: MenuConstants.RECIEVE_CONTACTS_ERROR,
          message: message
        });
      });
  },

  getContact: (id) => {
    MenuAPI
      .getContact('http://localhost:3001/api/contacts/' + id)
      .then(menu => {
        AppDispatcher.dispatch({
          actionType: MenuConstants.RECIEVE_CONTACT,
          menu: menu
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: MenuConstants.RECIEVE_CONTACT_ERROR,
          message: message
        });
      });
  }

}