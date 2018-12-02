import React from "react";
import { replace } from "redux-router";
import { connect } from "react-redux";
import T from "i18n-react";
import StorageUtil from "../utils/StorageUtil.es";

export default function requireOrgAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      let isOrg = StorageUtil.showOrganization();

      if(isOrg === "false")  //判断只有企业用户有的页面
        this.checkAuth();
    }

    checkAuth() {
      this.props.dispatch(replace(`/attestations`));
    }

    render() {
      return <Component />
    }
  }

  return connect(state => {
    return {
      location: state.router.location
    }
  })(AuthenticatedComponent);
}
