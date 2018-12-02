import React, { Component } from "react";
import { connect } from "react-redux";
import NotaryDetails from "../commons/NotaryDetails";

@connect(state => {
  return {product: state.product.info}
})
export default class ProductNotaryDetails extends Component {
  render() {
    return <NotaryDetails/>
  }
};
