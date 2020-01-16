import { combineReducers } from 'redux';
import camera from './camera';
import world from './world';
import userInterface from './userInterface';

const rootReducer = combineReducers({
  world,
  camera,
  userInterface,
});

export default rootReducer;
