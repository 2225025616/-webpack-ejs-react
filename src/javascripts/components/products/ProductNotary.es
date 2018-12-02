import React, { Component } from "react";
import BaseNotary from "../commons/BaseNotary.es";
import { connect } from "react-redux";

@connect(state => {
  return {product: state.product.info}
})
export default class ProductNotary extends Component {
  render() {
    return <BaseNotary/>
  }
}
;
