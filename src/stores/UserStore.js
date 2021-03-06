import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//Set the variables
let _data1 = [];  
let _dataRoles = [];  
let _dataSingle = [];  
let _allCompanyData = [];

function setAllCompanyData(data) {
  _allCompanyData = data;
}

function setData1(data) {
  _data1 = data;
}

function setDataRoles(data) {
  _dataRoles = data;
}

function setDataSingle(data) {
  _dataSingle = data;
}

//End Set the variables

class UserStoreClass extends EventEmitter {

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
	
  getDataRoles() {
    return _dataRoles;
  }

  getDataSingle() {
    return _dataSingle;
  }  
  
  getAllCompany () {
    return _allCompanyData;
  }  
  //End Set the return variables

}

const UserStore = new UserStoreClass();
 
UserStore.dispatchToken = AppDispatcher.register(action => { 
 
  switch(action.actionType) {
    case UserConstants.USER_RECIEVE_DATA:
	  setData1(action.data1);
      UserStore.emitChange();
      break
	case UserConstants.USER_RECIEVE_DATA_ROLES:
	  setDataRoles(action.data);
      UserStore.emitChange();
      break
	  
    case UserConstants.USER_RECIEVE_DATA_SINGLE:
	  setDataSingle(action.data1);
      UserStore.emitChange();
      break
    
	case UserConstants.USER_RECIEVE_DATA_ALL_COMPANY: 
	  setAllCompanyData(action.allCompanyData); 
      UserStore.emitChange();
      break
 
    case UserConstants.RECIEVE_DATA_ERROR:
      alert(action.message);
      UserStore.emitChange();
      break

    default:
  }

});

export default UserStore;