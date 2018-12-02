import React from "react";
import { replace } from "redux-router";
import { connect } from "react-redux";
import T from "i18n-react";
import StorageUtil from "../utils/StorageUtil.es";

export default function requireCommonPageAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      let isOrg = StorageUtil.showOrganization();
      if(isOrg === "false" && this.props.userInfo.realNameStatus){
        this.checkPerson(this.props.userInfo.realNameStatus);
      }
      if(isOrg === "true" && this.props.orgInfo.organizationStatus){
        this.checkOrg(this.props.orgInfo.organizationStatus);
      }
    }

    componentWillReceiveProps(nextProps) {
      let isOrg = StorageUtil.showOrganization();
      if(isOrg === "false" && nextProps.userInfo.realNameStatus){
        this.checkPerson(nextProps.userInfo.realNameStatus);
      }
      if(isOrg === "true" && nextProps.orgInfo.organizationStatus){
        this.checkOrg(nextProps.orgInfo.organizationStatus);
      }
    }

    checkPerson(status) {
      if(status!=="PASS"){
        this.props.dispatch(replace(`/attestations`));
      }
    }

    checkOrg(orgStatus) {
      if(orgStatus!=="PASS"){  //判断只有企业除首页外的独有页面key和organizationStatus
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
      userInfo: state.user.info,
      orgInfo: state.organization.orgInfo,
    }
  })(AuthenticatedComponent);
}
