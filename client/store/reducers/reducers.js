import { combineReducers } from "redux";
import userReducer from "./user";
import squadReducer from "./squad";
import releaseReducer from "./release";
import sprintReducer from "./sprint";

const reducers = {
  user: userReducer,
  squad: squadReducer,
  release: releaseReducer,
  sprint: sprintReducer,
};

export default combineReducers(reducers);
