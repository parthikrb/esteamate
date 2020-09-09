import { combineReducers } from "redux";
import userReducer from "./user";
import squadReducer from "./squad";
import releaseReducer from "./release";
import sprintReducer from "./sprint";
import retroReducer from "./retro";

const reducers = {
  user: userReducer,
  squad: squadReducer,
  release: releaseReducer,
  sprint: sprintReducer,
  retro: retroReducer,
};

export default combineReducers(reducers);
