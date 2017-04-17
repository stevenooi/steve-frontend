import AppDispatcher from '../dispatcher/AppDispatcher';
import TemplateConstants from '../constants/TemplateConstants';
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

class TemplateStoreClass extends EventEmitter {

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

const TemplateStore = new TemplateStoreClass();
 
TemplateStore.dispatchToken = AppDispatcher.register(action => { 
 
  switch(action.actionType) {
    case TemplateConstants.TEMPLATE_RECIEVE_DATA:
	  setData1(action.data1);
      TemplateStore.emitChange();
      break
	case TemplateConstants.TEMPLATE_SLIDE_RECEIVE_DATA_SINGLE:
	  setData3(action.data3);
      TemplateStore.emitChange();
      break	
    case TemplateConstants.TEMPLATE_RECIEVE_ALL_TEMPLATES: 
	  setData2(action.data2); 
      TemplateStore.emitChange();
      break
    case TemplateConstants.TEMPLATE_SLIDE_RECIEVE_DATA_SINGLE: 
	  setData3(action.data3); 
      TemplateStore.emitChange();
      break
    case TemplateConstants.TEMPLATE_RECIEVE_DATA_SINGLE:
	  setDataSingle(action.data1); 
      TemplateStore.emitChange();
      break
 
    case TemplateConstants.TEMPLATE_RECIEVE_DATA_ERROR:
      alert(action.message);
      TemplateStore.emitChange();
      break

    default:
  }

});

export default TemplateStore;