import React, { Component } from "react";
import { listOrganizations } from "../../actions/organizationAction";
import { listProducts } from "../../actions/productAction";
import { currentUser, getUserKycs } from "../../actions/userAction";
import { connect } from "react-redux";
import { getAllConfig } from "../../actions/configAction";

@connect(state => {
  return {
    authenticated: state.user.authenticated
  }
})
export default class GlobalInitial extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.dispatch(listOrganizations());
      this.props.dispatch(listProducts());
      this.props.dispatch(getAllConfig());
      this.props.dispatch(getUserKycs());
    } else {
      this.props.dispatch(currentUser());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated !== this.props.authenticated) {
      if (nextProps.authenticated) {
        this.props.dispatch(listOrganizations());
        this.props.dispatch(listProducts());
        this.props.dispatch(getAllConfig());
        this.props.dispatch(getUserKycs());
      }
    }
  }

  render() {
    return <div/>;
  }
}
