import { combineReducers } from "redux";
import userReducer from "./user";
import squadReducer from "./squad";
import releaseReducer from "./release";
import sprintReducer from "./sprint";
import retroReducer from "./retro";
import currentUserReducer from "./current-user";
import leaveReducer from "./leave";

const reducers = {
  user: userReducer,
  squad: squadReducer,
  release: releaseReducer,
  sprint: sprintReducer,
  retro: retroReducer,
  current_user: currentUserReducer,
  leave: leaveReducer,
};

export default combineReducers(reducers);
