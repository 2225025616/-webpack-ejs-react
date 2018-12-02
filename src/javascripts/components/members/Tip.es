import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Link from "../commons/LangLink";
// import push from "../../utils/push";
import noCertify from "../../../images/members/noCertify.png";
import StorageUtil from "../../utils/StorageUtil.es";

@connect(state => {
  return {
    user: state.user.kycs,
    location: state.router.location,
    orgInfo: state.organization.orgInfo,
  }
})

export default class Tip extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    let {orgInfo} = this.props;
    let orgId = orgInfo.id;

    return <div className="certify-ctn">
          <div className="flexCtn">
            <img src={noCertify} style={{width: 180}}/>
            <div>
              <p className="noCertify">
                您还未设置企业密钥，因此暂时无法使用企业保全和企业签约模块。
                <Link to={`/other/help-document?firstSelected=0&lang=zh&secondSelected=3`} className="help">
                  <i className="iconfont font-help"/>
                  <span>{T.translate("common.help")}</span>
                </Link>
                <Link to={`/organizations/${orgId}/orgKeyManagement`}><span className="set-key">去设置密钥</span></Link>
              </p>
              <p>如果您是第一次设置，需要协助，请联系我的远程技术支持人员，联系方式如下：</p>
              <span className="phone">0571-28221076</span>
            </div>
          </div>
        </div>

  }
}
