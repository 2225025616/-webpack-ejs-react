import React, { Component } from "react";
import { connect } from "react-redux";
import { getKyc } from "../../actions/organizationAction";
import T from "i18n-react";
import push from "../../utils/push";
import StorageUtil from "../../utils/StorageUtil.es";
import Link from "../commons/LangLink";
import OrgImage from "../commons/OrgImage";
import ViewImage from "../commons/ViewImage";

@connect(state => {
    return {
      kyc: state.organization.kyc,
      orgInfo: state.organization.orgInfo,
    };
  }
)
export default class OrgSettingInfo extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    let { orgInfo } = this.props;
    let orgId = orgInfo.id;
    if(orgId) {
      this.props.dispatch(getKyc(orgId));
    }
  }

  orgStatue = (status) => {
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
    let { kyc, orgInfo } = this.props;

      let orgResult;
      if(this.orgStatue(orgInfo.organizationStatus)==='已认证'){
          orgResult=(
              <section className="showStatus">
                <img className="resultImage" src={require("../../../images/users/auth-pass.png")}/>
                <div className="resultTip">
                  <p className="result">恭喜您，您已成功通过保全网企业实名认证！</p>
                  <p className="resultBottom">您已获得保全网专业服务。</p>
                </div>
              </section>
          )
      }else if(this.orgStatue(orgInfo.organizationStatus)==='认证失败'){
          orgResult=(
              <section className="showStatus">
                <img className="resultImage" src={require("../../../images/users/auth-ailure.png")}/>
                <div className="resultTip">
                  <p className="result">抱歉，您的保全网企业实名认证失败！</p>
                  <p className="resultBottom">您提交的资料审核未通过，请重新认证。</p>
                </div>
                <Link className="statusButton" to={`/organizations/${orgInfo.id}/kyc`}>重新认证</Link>
              </section>
          )
      }else if(this.orgStatue(orgInfo.organizationStatus)==='认证中'){
          orgResult=(
              <section className="showStatus">
                <img className="resultImage" src={require("../../../images/users/certification.png")}/>
                <div className="resultTip">
                  <p className="result">您已提交认证，资料审核中…</p>
                  <p className="resultBottom">保全网将以短信通知您结果，请耐心等候。</p>
                </div>
              </section>
          )
      }else{
          orgResult=(
              <section className="showStatus">
                <img className="resultImage" src={require("../../../images/users/uncertified.png")}/>
                <div className="resultTip">
                  <p className="result">您还未进行保全网企业实名认证！</p>
                  <p className="resultBottom">认证通过后将获得保全网专业服务。</p>
                </div>
                <Link className="statusButton" to={`/organizations/${orgInfo.id}/kyc`}>立即认证</Link>
              </section>
          )
      }

    return <div className="org-setting-info">
      <div className="org-information">
          {orgResult}
          {
              this.orgStatue(orgInfo.organizationStatus)==='已认证'?
              <div>
                <section>
                  <span>{T.translate("marketing.company")}</span>
                  <p>{kyc.name}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.social-code")}</span>
                  <p>{kyc.orgcode}</p>
                </section>
                <section>
                  <span>企业地址</span>
                  <p>{kyc.street?kyc.street:"无"}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.bussness-license")}</span>
                  <p>{
                      kyc.businessFile ?
                          <ViewImage src={kyc.businessFile} style={{maxWidth:150,maxHeight:150}}/>
                          : "无"}</p>
                </section>
                <section>
                  <span>组织机构代码证</span>
                  <p>{
                      kyc.letterFile ?
                        <ViewImage src={kyc.letterFile} style={{maxWidth:150,maxHeight:150}}/>
                        : "无"}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.org-account-name")}</span>
                  <p>{kyc.accountName}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-name")}</span>
                  <p>{kyc.bank}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-code")}</span>
                  <p>{kyc.bankAccount}</p>
                </section>
              </div> : ''
          }
      </div>
    </div>
  }
}
