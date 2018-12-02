import React, { Component } from "react";
import AttestionList from "../attestations/AttestationList";
import { toggleAttestations } from "../../actions/breadcrumbsAction";
import { connect } from "react-redux";
import IdUtil from "../../utils/IdUtil";

@connect(
  state => {
    return {params: state.router.params}
  }
)
export default class UserAttestations extends Component {
  componentDidMount() {
    this.props.dispatch(toggleAttestations());
  }

  render() {
    let id = IdUtil.productId(this.props);

    return <div className="container-wrapper">
      <AttestionList type="user" productId={id}/>
    </div>;
  }
};
