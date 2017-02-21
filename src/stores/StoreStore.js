import AppDispatcher from '../dispatcher/AppDispatcher';
import StoreConstants from '../constants/StoreConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];  
let _dataSingle = [];
let _data2 = [];  
let _data3 = [];    

function setData1(data) {
  _data1 = data;
}

function setData2(data) {
  _data2 = data;
}
function setData3(data) {
  _data3 = data;
}
function setDataSingle(data) {
  _dataSingle = data;
}

//End Set the variables

class StoreStoreClass extends EventEmitter {

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
	
  getData2() {
    return _data2;
  }
  getData3() {
    return _data3;
  }
  getDataSingle() {
    return _dataSingle;
  }  
  //End Set the return variables

}

const StoreStore = new StoreStoreClass();
 
StoreStore.dispatchToken = AppDispatcher.register(action => { 
 
  switch(action.actionType) {
    case StoreConstants.RECIEVE_DATA:
	  setData1(action.data1);
      StoreStore.emitChange();
      break
	  
    case StoreConstants.STORE_RECIEVE_ALL_TEMPLATES: 
	  console.log("action.data2:" + action.data2); 
	  setData2(action.data2); 
      StoreStore.emitChange();
      break
    case StoreConstants.STORE_RECIEVE_ALL_GROUPS: 
	  console.log("action.data3:" + action.data3);
	  setData3(action.data3); 
      StoreStore.emitChange();
      break
    case StoreConstants.STORE_RECIEVE_DATA_SINGLE:
	  console.log("action.data1:" + action.data1);
	  setDataSingle(action.data1); 
      StoreStore.emitChange();
      break
 
    case StoreConstants.RECIEVE_DATA_ERROR:
      alert(action.message);
      StoreStore.emitChange();
      break

    default:
  }

});

export default StoreStore;