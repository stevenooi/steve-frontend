import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';
import MenuAPI from '../utils/MenuAPI';

export default {

  recieveContacts: () => {
    MenuAPI
      .getContacts(ApiSettings.NODE_SERVER + '/api/menu')
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
  getMenu: (params) => {
    MenuAPI
      .postMenu('api/menu',params)
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
      .getContact(ApiSettings.NODE_SERVER + '/api/contacts/' + id)
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