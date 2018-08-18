import { combineReducers } from "redux";
import camera from "./camera";
import world from "./world";

const rootReducer = combineReducers({
  world,
  camera
});

export default rootReducer;
