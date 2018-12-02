import React, { Component } from "react";
import Link from "../commons/LangLink";
import { connect } from "react-redux";
import push from "../../utils/push";
import T from "i18n-react";
import cx from "classnames"
import format from "../../utils/format";
import StorageUtil from "../../utils/StorageUtil.es";
import {listOrganizations} from "../../actions/organizationAction.es";
import {getUserKycs} from "../../actions/userAction.es";

@connect(state => {
  return {
    user: state.user.kycs,
    orgInfo: state.organization.orgInfo,
    location: state.router.location,
  }
})
export default class HeadUserInfo extends Component {

  componentWillMount() {
    let url = this.props.location.pathname;
    if(url === "/attestations")
      this.props.dispatch(getUserKycs());
    else if( url === "/org-statistic")
      this.props.dispatch(listOrganizations());
  }

  componentDidMount = () => {

  };

  statue(status) {
    switch (status) {
      case "PASS":
        return "已认证";
      case "APPLY":
        return "认证中";
      case "REJECT":
        return "认证失败";
      case "":
        return "前往认证";
    }
  }

  render() {
    let {user, orgInfo, balanceHolder} = this.props;
    let organization;
    let isOrg = StorageUtil.showOrganization();
    let orgId = "";
    if(isOrg == "true") {
      orgId = orgInfo.id;
    }

    return ( isOrg == "false" ?
        user.id && user.isKycPass !== "PASS" ?
          <div className="to-auth">
            <div className="contant">
              <i className="iconfont font-tip"/>
              {
                user.isKycPass === "APPLY" ?
                  <span>实名认证审核中，请耐心等待。审核结果将会在1-2天内以手机短信的方式通知，请注意查收。</span>
                  :
                  user.isKycPass === "REJECT" ?
                    <span>实名认证审核不通过，请调整资料后重新认证。 认证过后将获得保全网以下专业服务： 专属合作平台保全数据获取 / 文件保全 / 网页取证 / 司法出证</span>
                    :
                    <span>您的账号还未进行个人实名认证，认证过后将获得保全网以下专业服务： 专属合作平台保全数据获取  /  文件保全  /  网页取证  /  司法出证 </span>
              }
              <Link to="/user-kyc">
                <span>{this.statue(user.isKycPass)}>></span>
              </Link>
            </div>
          </div>
          :
          <div></div>
        :
        orgInfo.id && orgInfo.organizationStatus !== "PASS" ?
          <div className="to-auth">
            <div className="contant">
              <i className="iconfont font-tip"/>
              {
                orgInfo.organizationStatus === "APPLY" ?
                  <span>企业实名认证审核中，请耐心等待。审核结果将会在1-2天内以手机短信的方式通知，请注意查收。</span>
                  :
                  orgInfo.organizationStatus === "REJECT" ?
                    <span>企业实名认证审核不通过，请调整资料后重新认证。 认证过后将获得保全网以下专业服务： 专属合作平台企业电子签约  /  企业API签约  /  企业保全  /  网页取证  /  司法出证</span>
                    :
                    <span>您的账号还未进行企业实名认证，认证过后将获得保全网以下专业服务： 专属合作平台企业电子签约  /  企业API签约  /  企业保全  /  网页取证  /  司法出证</span>
              }
              <Link to={`/organizations/${orgId}/kyc`}>
                <span>{this.statue(orgInfo.organizationStatus)}>></span>
              </Link>
            </div>
          </div>
          :
          <div></div>
    );
  }
}
