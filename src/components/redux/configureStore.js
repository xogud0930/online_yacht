import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "react-router-redux";
import  { composeWithDevTools } from "redux-devtools-extension";

import dice from './modules/dice'

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if(env === 'development') {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  dice,
  routing: routerReducer,
});

let store;

if (env === "development") {
  store = initialState =>
    createStore(reducer,
    composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export default store();