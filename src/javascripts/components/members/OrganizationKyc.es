import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getKyc, getOrganization, updateKyc } from "../../actions/organizationAction";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import Image from "../commons/Image";
import BackMenu from "../commons/BackMenu";

const fields = ["name", "orgcode", "accountName", "bank", "bankAccount",
  "businessFile", "letterFile"];
// license:"营业执照图片"
// authorize:"认证授权公函图片"

let businessFile = "";
let letterFile = "";

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("marketing.company"))
    .nonEmpty("orgcode", T.translate("kyc.social-code"))
    .nonEmpty("accountName", T.translate("kyc.org-name"))
    .nonEmpty("bank", T.translate("kyc.org-bank-name"))
    .nonEmpty("bankAccount", T.translate("kyc.org-bank-code"))
    .errors;
};

const getInitialValues = state => {
  return {
    ...state.organization.info,
    ...state.organization.kyc
  };
};

@reduxForm({form: "org-kyc", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    kyc: state.organization.kyc,
    params: state.router.params,
    // organizationTypes: state.config.organization_type,

    onSubmit: (values, dispatch) => {
      let data = {...values, letterFile, businessFile}, id = IdUtil.organizationId(state.router);
      dispatch(updateKyc(id, data));
    }
  }
})
export default class OrganizationKyc extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    startDate: '',
    endDate: '',
    canDeleteBusiness: true,
    canDeleteLetter: true,
  };

  componentWillMount() {
    let id = IdUtil.organizationId(this.props);
    if (id) {
      this.props.dispatch(getKyc(id));
      this.props.dispatch(getOrganization(id));
    }
  };

  componentDidMount() {

  };

  componentWillReceiveProps(nextProps) {

  }

  changeBusinessFile = (e) => {
    businessFile = e.target.files;
    if (businessFile.length > 0) {
      this.forceUpdate();
    }
  };

  changeLetterFile = (e) => {
    letterFile = e.target.files;
    if (letterFile.length > 0) {
      this.forceUpdate();
    }
  };

  status = (e) => {

  };

  render() {
    let {fields: {name, orgcode, accountName, bank, bankAccount}, kyc, params, handleSubmit} = this.props;

    // const {kyc} = this.props;
    //   let orgResult;
    //   if(kyc.status === 'REJECT'){
    //       orgResult=<section className="showStatus">
    //         <img className="resultImage" src={require("../../../images/users/auth-ailure.png")}/>
    //         <div className="resultTip">
    //           <p className="result">抱歉，您的保全网个人实名认证失败！</p>
    //           <p className="resultBottom">您提交的资料审核未通过，请重新认证。</p>
    //         </div>
    //         <Link className="statusButton" to="/user-kyc">重新认证</Link>
    //       </section>
    //   }else if(kyc.status === 'APPLY'){
    //       orgResult=(
    //           <section className="showStatus">
    //             <img className="resultImage" src={require("../../../images/users/certification.png")}/>
    //             <div className="resultTip">
    //               <p className="result">您已提交认证，资料审核中…</p>
    //               <p className="resultBottom">保全网将以短信通知您结果，请耐心等候。</p>
    //             </div>
    //           </section>
    //       )
    //   }else{
    //     orgResult='';
    //   }

    return (
      <div className="container-wrapper">
        <div className="container">
          <BackMenu title="企业认证"/>
          <div className="ctn">
          {kyc.organizationStatus === 'PASS' || kyc.organizationStatus === 'APPLY' ?
            <form className="business-kyc" onSubmit={handleSubmit}>
              <article className="aptitude">
                  {
                      kyc.organizationStatus === "APPLY" ?
                          <section className="showStatus">
                            <img className="resultImage" src={require("../../../images/users/certification.png")}/>
                            <div className="resultTip">
                              <p className="result">您已提交认证，资料审核中…</p>
                              <p className="resultBottom">保全网将以短信通知您结果，请耐心等候。</p>
                            </div>
                          </section>
                          :
                          ''
                  }
                <h1>{T.translate("kyc.org-auth-info")}</h1>
                <section>
                  <span>{T.translate("marketing.company")}</span>
                  <p>{name.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.social-code")}</span>
                  <p>{orgcode.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.bussness-license")}</span>
                  <div className="file">
                    <div className="content">
                      <div className="img-wrap">
                        <img src={kyc.businessFile} alt=""/>
                      </div>
                    </div>
                  </div>
                </section>
              </article>
              <article className="account">
                <h1>{T.translate("kyc.org-account")}</h1>
                <section>
                  <span>{T.translate("kyc.org-account-name")}</span>
                  <p>{accountName.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-name")}</span>
                  <p>{bank.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-code")}</span>
                  <p>{bankAccount.value}</p>
                </section>
              </article>
              <article className="contacts">
                <h1>{T.translate("kyc.org-verify")}</h1>
                <section>
                  <span>{T.translate("kyc.org-verify")}</span>
                  <div className="file">
                    <div className="content">
                      <div className="img-wrap">
                        <img src={kyc.letterFile} alt=""/>
                      </div>
                    </div>
                  </div>
                </section>
         {/*       {
                  kyc.organizationStatus === "PASS" ?
                    <p className="kyc-tip">*{T.translate("kyc.pass-verify")}</p>
                    :
                    <p className="kyc-tip">*{T.translate("kyc.wait-verify")}</p>
                }*/}
              </article>
            </form>
            :
            <form className="business-kyc" onSubmit={handleSubmit}>
              <article className="aptitude">
                  {
                      kyc.organizationStatus === "REJECT" ?
                          <section className="showStatus">
                            <img className="resultImage" src={require("../../../images/users/auth-ailure.png")}/>
                            <div className="resultTip">
                              <p className="result">抱歉，您的保全网企业实名认证失败！</p>
                              <p className="resultBottom">您提交的资料审核未通过，请重新认证。</p>
                            </div>
                          </section>
                          :
                          ''
                  }
                <h1>{T.translate("kyc.org-auth-info")}</h1>
                <section>
                  <span>{T.translate("marketing.company")}</span>
                  <p>{name.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.social-code")}</span>
                  <p>{orgcode.value}</p>
                </section>
                <section>
                  <span>{T.translate("kyc.bussness-license")}</span>
                  <div className="file">
                    <div className="content">
                      <input type="file" onChange={this.changeBusinessFile} accept="image/jpg, image/png, image/jpeg"/>
                      <span>{T.translate("kyc.upload")}</span>
                      <div className="img-wrap">
                        <Image
                          altSrc={require('../../../images/bg-grey.png')}
                          src={(businessFile && businessFile[0]) || kyc.businessFile}/>
                      </div>
                    </div>
                    <div className="explain">
                      <p className="title">{T.translate("kyc.explain")}：</p>
                      <p>{T.translate("kyc.explain1")}</p>
                      <p>{T.translate("kyc.explain2")}</p>
                    </div>
                  </div>
                </section>
              </article>
              <article className="account">
                <h1>{T.translate("kyc.org-account")}</h1>
                <section>
                  <span>{T.translate("kyc.org-account-name")}</span>
                  <RowInput placeholder="" type="text" {...FormUtil.extract(accountName)} file={accountName}
                            width="300"
                            height="30"/>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-name")}</span>
                  <RowInput placeholder="" type="text" {...FormUtil.extract(bank)} file={bank} width="300"
                            height="30"/>
                </section>
                <section>
                  <span>{T.translate("kyc.org-bank-code")}</span>
                  <RowInput placeholder="" type="text" {...FormUtil.extract(bankAccount)} file={bankAccount}
                            width="300"
                            height="30"/>
                </section>
              </article>
              <article className="contacts">
                <h1>{T.translate("kyc.org-verify")}</h1>
                <section>
                  <span>{T.translate("kyc.org-verify")}</span>
                  <div className="file">
                    <div className="content">
                      <input type="file" onChange={this.changeLetterFile} accept="image/jpg, image/png, image/jpeg"/>
                      <span>{T.translate("kyc.upload")}</span>
                      <a
                          href={require('../../../images/renzheng-baoquan.docx')}
                          download={true} className="word">{T.translate("kyc.download")}</a>
                      <div className="img-wrap">
                        <Image
                          altSrc={require('../../../images/bg-grey.png')}
                          src={(letterFile && letterFile[0]) || kyc.letterFile}/>
                      </div>
                    </div>
                    <div className="explain">
                      <p className="title">{T.translate("kyc.explain")}：</p>
                      <p>1.请先下载公函模版，完善公函内容。</p>
                      <p>2.将公函打印成纸质，加盖公章，拍照或者扫描成电子版上传。</p>
                    </div>
                  </div>
                </section>
                {
                  kyc.organizationStatus === "REJECT" ?
                    <div>
                      <label className="refuse-reason">{T.translate("common.reject-reason")}{kyc.rejectReason}</label>
                      <p className="refuse-tip">*{T.translate("kyc.org-modify")}</p>
                      <button className="blueButton" type="submit" ref="kyc">{T.translate("user.re-certify")}</button>
                    </div>
                    :
                    <div>
                      <button className="blueButton" type="submit" ref="kyc">{T.translate("notarization.submit")}</button>
                    </div>
                }
              </article>
            </form>
          }
          </div>
        </div>
      </div>
    );
  }
} ;
