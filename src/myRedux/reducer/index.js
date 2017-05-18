/**
 * Created by huangwei on 17/5/18.
 */
import {combineReducers} from '../API/index';
import {incrementReducer,decrementReducer} from './counter';

let rootReducer=combineReducers({
  incrementReducer,
  decrementReducer
});

export default rootReducer;