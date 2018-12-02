import React, { Component } from "react";
import Notarization from "./Notarization.es";
import { connect } from "react-redux";

@connect(state => {
  return {product: state.product}
})
export default class ProductNotary extends Component {
  render() {
    return <Notarization/>
  }
}
;
