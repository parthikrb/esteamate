import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const makeStore = (context) =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });
