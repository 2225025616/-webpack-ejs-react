import React from "react";
import { replace } from "redux-router";
import { connect } from "react-redux";
import T from "i18n-react";
import StorageUtil from "../utils/StorageUtil.es";

//判断只有个人用户有的页面
export default function requireUserAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      let isOrg = StorageUtil.showOrganization();
      if(isOrg === "true")
        this.checkAuth();
    }

    checkAuth() {
      this.props.dispatch(replace(`/org-statistic`));
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
