import React, { Component } from "react";
import { RouterContext } from "react-router";
import { ReduxRouter } from "redux-router";
import { useScroll } from "react-router-scroll";
import AppRoutes from "./AppRoutes";


const RoutingContext = (props) => {
  return useScroll().renderRouterContext(<RouterContext {...props}/>, props)
};

export default class AppRouter extends Component {
  render() {
    return <ReduxRouter RoutingContext={RoutingContext} routes={AppRoutes}/>;
  }
}
