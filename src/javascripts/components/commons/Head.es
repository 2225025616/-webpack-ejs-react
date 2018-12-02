import React, { Component } from "react";
import Link from "../commons/LangLink";
import { connect } from "react-redux";
import IdUtil from "../../utils/IdUtil";
import push from "../../utils/push";
import replace from "../../utils/replace";
import Info from "./Info";
import HeadUserInfo from "./HeadUserInfo";
import LanguageUtil from "../../utils/LanguageUtil";
import T from "i18n-react";
import cx from "classnames"
import StorageUtil from "../../utils/StorageUtil";
import {toastr} from "react-redux-toastr";

@connect(state => {
  return {
    location: state.router.location,
    user: state.user.kycs,
    orgInfo: state.organization.orgInfo,
  }
})
export default class Head extends Component {
  showAttestation(no) {
    this.props.dispatch(push(`/attestations/${no.toUpperCase()}`));
  }

  state = {
    isOrg: "false",
  };

  componentWillMount = () => {

    let lang = this.props.location.query['lang'];
    if (lang && lang !== LanguageUtil.lang)
      this.props.dispatch(replace(this.props.location.pathname));
  };

  componentDidMount = () => {
    const { showAll, orgInfo } = this.props;
    let isOrg = StorageUtil.showOrganization();
    this.setState({isOrg: isOrg});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.showAttestation(e.target.elements['no'].value);
  };

/*  changeLang = (lang) => {
    return () => {
      const {location} = this.props;
      LanguageUtil.lang = lang;
      this.props.dispatch(replace(location.pathname));
      this.forceUpdate();
    }
  };*/

  statue(status) {
    switch (status) {
      case "PASS":
        return T.translate("user.certified");
      case "APPLY":
        return T.translate("user.certifing");
      case "REJECT":
        return T.translate("user.re-certify");
      case "":
        return T.translate("user.to-certify");
    }
  }

  orgError = () => {
    toastr.error("请先完成企业实名认证");
  };

  personalError = () => {
    toastr.error("请先完成个人实名认证");
  };

  render() {
    let { user, showAll, orgInfo } = this.props;
    let url = this.props.location.pathname;
    let isNav = false;
    if(url === "/attestations" || url === "/org-statistic")
      isNav = true;

    return <div className="head-container">
      <header className="navbar active-navbar">
        <div className="navigation">
          <div className="header">
            <Link to="/home">
              <div className="logo"/>
            </Link>
            {
              showAll !== "false" ?
                this.state.isOrg === "false" ?
                  <ul className="nav">
                    <Link to="/attestations">
                      <li className={cx({activesItem: url === "/attestations"})}>{T.translate("common.attestation")}</li>
                    </Link>
                    {
                      user.isKycPass !== "PASS" ?
                        <li onClick={this.personalError}>{T.translate("common.evidence")}</li>
                        :
                        <Link to="/evidences" disableLink={user.isKycPass !== "PASS" ? "no" : ""}>{/*用户未实名不能点击*/}
                          <li className={cx({activesItem: url === "/evidences" || url === "/evidences/lists"})}>{T.translate("common.evidence")}</li>
                        </Link>
                    }
                  </ul>
                  :
                  <ul className="nav">
                    <Link to="/org-statistic">
                      <li className={cx({activesItem: url === "/org-statistic"})}>企业统计</li>
                    </Link>
                    {
                      orgInfo.organizationStatus!="PASS" ?
                        [
                          <li onClick={this.orgError}>企业签约</li>,
                          <li onClick={this.orgError}>企业保全</li>,
                          <li onClick={this.orgError}>网页取证</li>,
                        ]
                        :
                        [
                          <Link to="/signatures">
                            <li className={cx({activesItem: url === "/org-sign" || url.indexOf("/signatures") === 0})}>企业签约</li>
                          </Link>,
                          <Link to="/org-attestation/count">
                            <li className={cx({activesItem: url === "/org-attestation/count" || url === "/products/new" || url === "/org-attestations/list"
                              ||  url.indexOf("/products/over-view/") === 0})}>企业保全</li>
                          </Link>,
                          <Link to="/evidences">
                            <li className={cx({activesItem: url === "/evidences" || url === "/evidences/lists"})}>网页取证</li>
                          </Link>
                        ]
                    }
                  </ul>
                : ""

            }
          </div>
          <div className="right-info">
      {/*      <div className="language">
              {
                (LanguageUtil.lang === "zh") ?
                  <a href='javascript:void 0' onClick={this.changeLang('en')}>English</a>
                  : <a href='javascript:void 0' onClick={this.changeLang('zh')}>简体中文</a>
              }
            </div>*/}
            {
              user.id ?
                <Info/>
                :
                ""
            }
          </div>
        </div>
      </header>
      {
        isNav?
          <HeadUserInfo/>
          : ""
      }
    </div>
      ;
  }
}
