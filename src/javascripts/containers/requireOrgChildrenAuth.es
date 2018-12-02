import React from "react";
import { replace } from "redux-router";
import { connect } from "react-redux";
import T from "i18n-react";
import StorageUtil from "../utils/StorageUtil.es";

export default function requireOrgChildrenAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      let isOrg = StorageUtil.showOrganization();
      let url = this.props.location.pathname;
      if(isOrg === "false")  //判断只有企业用户有的页面
        this.checkAuth();
      if(isOrg === "true" && url !="/org-statistic" && this.props.orgInfo.organizationStatus){
        this.checkOrgAuth(this.props.orgInfo.organizationStatus);
      }
      if(url === "/org-sign"){
        if(this.props.orgInfo.rsaCount === 0){
          this.props.dispatch(replace(`/organizations/${this.props.orgInfo.id}/orgKeyManagement?from=org-sign`));
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      let isOrg = StorageUtil.showOrganization();
      let url = nextProps.location.pathname;
      if(isOrg === "false")
        this.checkAuth();
      if(isOrg === "true" && url !="/org-statistic" && nextProps.orgInfo.organizationStatus){
        this.checkOrgAuth(nextProps.orgInfo.organizationStatus);
      }
      if(url === "/org-sign") {
        if (nextProps.orgInfo.rsaCount === 0){
          this.props.dispatch(replace(`/organizations/${nextProps.orgInfo.id}/orgKeyManagement?from=org-sign`));
        }
      }
    }

    checkAuth() {
      this.props.dispatch(replace(`/attestations`));
    }

    checkOrgAuth(orgStatus) {
      if(orgStatus!=="PASS"){  //判断只有企业除首页外的独有页面organizationStatus
        this.props.dispatch(replace(`/org-statistic`));
      }
    }

    render() {
      return <Component />
    }
  }

  return connect(state => {
    return {
      location: state.router.location,
      orgInfo: state.organization.orgInfo,
    }
  })(AuthenticatedComponent);
}
