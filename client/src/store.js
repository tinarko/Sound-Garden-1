import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers/index.js';

const middleware = applyMiddleware(thunkMiddleware, createLogger());
export default createStore(appReducer, middleware);