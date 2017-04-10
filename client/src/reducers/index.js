import { combineReducers } from 'redux';
import budget from './budget.js';
import balance from './balance.js';

//implement lines below when there are actually other reducers in folder
// import * as reducers from './reducers';
// const appReducer = combineReducers(reducers);

export default combineReducers({
  balance,
  budget
});