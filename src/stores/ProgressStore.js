import AppDispatcher from '../dispatcher/AppDispatcher';
import ProgressConstants from '../constants/ProgressConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];  
let _dataAllTemplates = [];  

function setData1(data) {
  _data1 = data;
}

function setDataAllTemplates(data) {
  _dataAllTemplates = data;
}

//End Set the variables

class ProgressStoreClass extends EventEmitter {

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
	
  getDataAllTemplates() {
    return _dataAllTemplates;
  }  
  //End Set the return variables

}

const ProgressStore = new ProgressStoreClass();
 
ProgressStore.dispatchToken = AppDispatcher.register(action => { 
 
  switch(action.actionType) {
    case ProgressConstants.RECIEVE_DATA:
	  setData1(action.data1);
      ProgressStore.emitChange();
      break
	  
	case ProgressConstants.RECIEVE_DATA_ALL_TEMPLATES:
	  setDataAllTemplates(action.data);
      ProgressStore.emitChange();
      break
	  
    case ProgressConstants.PROGRESS_RECIEVE_DATA_SINGLE:
	console.log("action.data1:" + action.data1);
	  setDataSingle(action.data1);
      ProgressStore.emitChange();
      break
 
    case ProgressConstants.RECIEVE_DATA_ERROR:
      alert(action.message);
      ProgressStore.emitChange();
      break

    default:
  }

});

export default ProgressStore;