import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const composeEnhancers = compose;

const makeStore = (context) =>
  createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });
