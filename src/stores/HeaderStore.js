import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];     

function setData1(data) {
  _data1 = data;
}

//End Set the variables

class HeaderStoreClass extends EventEmitter {

  emitChange() { 
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  //Set the return variables
  getData1() {
    return _data1;
  }
	 
  //End Set the return variables

}

const HeaderStore = new HeaderStoreClass();
 
HeaderStore.dispatchToken = AppDispatcher.register(action => {  
  switch(action.actionType) {
    case HeaderConstants.HEADER_RECIEVE_DATA: 
	  setData1(action.data);
      HeaderStore.emitChange();
      break
 
    case HeaderConstants.HEADER_RECIEVE_DATA_ERROR:
      alert(action.message);
      HeaderStore.emitChange();
      break

    default:
  }

});

export default HeaderStore;