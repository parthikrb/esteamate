import { combineReducers } from "redux";
import userReducer from "./user";
import squadReducer from "./squad";

const reducers = {
  user: userReducer,
  squad: squadReducer,
};

export default combineReducers(reducers);
