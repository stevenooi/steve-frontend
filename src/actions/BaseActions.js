import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseConstants from '../constants/BaseConstants';
import BaseAPI from '../utils/BaseAPI';

export default {
 
  getData1: () => {
    BaseAPI
      .getData('api/test')
      .then(data => {
        AppDispatcher.dispatch({	
          actionType: BaseConstants.RECIEVE_DATA,
          data1: data
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: BaseConstants.RECIEVE_DATA_ERROR,
          message: message
        });
      });
  }
}