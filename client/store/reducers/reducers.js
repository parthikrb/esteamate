import { combineReducers } from "redux";
import userReducer from "./user";

const reducers = {
  user: userReducer,
};

export default combineReducers(reducers);
