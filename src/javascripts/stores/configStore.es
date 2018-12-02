import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import reducer from "../reducers/reducer";
import { reduxReactRouter } from "redux-router";
import { createHistory } from "history";


export default function configureStore(initialState) {

  return compose(
    applyMiddleware(thunk, promiseMiddleware),
    reduxReactRouter({createHistory}),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(reducer, initialState);
}

