import AppDispatcher from '../dispatcher/AppDispatcher';
import RoleConstants from '../constants/RoleConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];  
let _dataSingle = [];  

function setData1(data) {
  _data1 = data;
}

function setDataSingle(data) {
  _dataSingle = data;
}

//End Set the variables

class RoleStoreClass extends EventEmitter {

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
	
  getDataSingle() {
    return _dataSingle;
  }  
  //End Set the return variables

}

const RoleStore = new RoleStoreClass();
 
RoleStore.dispatchToken = AppDispatcher.register(action => { 
 
  switch(action.actionType) {
    case RoleConstants.RECIEVE_DATA:
	  setData1(action.data1);
      RoleStore.emitChange();
      break
	  
    case RoleConstants.ROLE_RECIEVE_DATA_SINGLE:
	console.log("action.data1:" + action.data1);
	  setDataSingle(action.data1);
      RoleStore.emitChange();
      break
 
    case RoleConstants.RECIEVE_DATA_ERROR:
      alert(action.message);
      RoleStore.emitChange();
      break

    default:
  }

});

export default RoleStore;