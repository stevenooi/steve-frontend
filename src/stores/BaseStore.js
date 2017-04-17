import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseConstants from '../constants/BaseConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];  

function setData1(data) {
  _data1 = data;
}

//End Set the variables

class BaseStoreClass extends EventEmitter {

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

const BaseStore = new BaseStoreClass();
 
BaseStore.dispatchToken = AppDispatcher.register(action => {  
  switch(action.actionType) {
    case BaseConstants.RECIEVE_DATA: 
      setData1(action.data1);
      BaseStore.emitChange();
      break
 
    case BaseConstants.RECIEVE_DATA_ERROR:
      alert(action.message);
      BaseStore.emitChange();
      break

    default:
  }

});

export default BaseStore;