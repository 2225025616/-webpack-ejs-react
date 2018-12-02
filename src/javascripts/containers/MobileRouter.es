import React, { Component } from "react";
import { RouterContext } from "react-router";
import { ReduxRouter } from "redux-router";
import { useScroll } from "react-router-scroll";
import MobileRoutes from "./MobileRoutes";

const RoutingContext = (props) => {
  return useScroll().renderRouterContext(<RouterContext {...props}/>, props)
};

export default class MobileRouter extends Component {
  render() {
    return <ReduxRouter RoutingContext={RoutingContext} routes={MobileRoutes}/>
  }
}
