import React, { Component } from "react";
import { reduxForm } from "redux-form";
import {
  bindEmail,
  changeSettings,
  getSettings,
  updateUser,
  currentUser,
  getKyc
} from "../../actions/userAction";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import ColumnInput from "../commons/ColumnInput";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import cx from "classnames";
import StorageUtil from "../../utils/StorageUtil";
import Link from "../commons/LangLink";
import CardImage from "../commons/CardImage";
import Image from "../commons/Image";
import ViewImage from "../commons/ViewImage";
import OrgSettingInfo from "../commons/OrgSettingInfo";
import SettingChangePwd from "./settingChangePwd.es";
import SettingBindPhone from "./settingBindPhone.es";

const styles = {
  modalButton: {
    marginTop: 8,
    float: "right",
  },
  flatButton: {
    margin: "6px 0",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  textfield: {
    width: "100%",
  },
  show: {
    display: "flex",
    alignItems: "center",
  },
  showEmail: {

  },
  hide: {
    display: "none",
  },
  active: {
    border: '1px solid #ddd',
    borderBottom: '1px solid #fff',
    backgroundColor: '#fff'
  }
};


const fields = [ 'email', 'phone', 'verifyCode', "systemSms", "systemMail", "notarySms", "notaryMail",
  "contractSms", "contractMail"];

const validate = values => {
    return new FormValidator(values)
    .verifyCode("verifyCode", T.translate("common.verify-code"))
    .email("email", T.translate("common.email"))
    .phoneNumber("phone", T.translate("member.phone-number"))
    .errors;
};

const getInitialValues = state => {
  return {
    ...state.user.settings
  };
};

@reduxForm({form: 'profile', fields, validate},
  state => {
    return {
      ...state.sms,
      user: state.user.kycs,//用户信息
      userKycInfo: state.user.kyc,//用户实名信息
      userInfo: state.user.info,//账户信息
      orgInfo: state.organization.orgInfo,
      initialValues: {
        ... getInitialValues(state)
      },
    }
  })

export default class Setting extends Component {
  componentWillMount() {
    this.props.dispatch(getSettings());
    this.props.dispatch(getKyc());
  }

  state = {
    editEmail: false,
    index: 1,
    // show:false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(updateUser(new FormData(e.target)));
  };

  handleOpenEmail = () => {
    this.setState({editEmail: !this.state.editEmail});
  };

  handleBindEmail = e => {
    e.preventDefault();
    this.props.dispatch(bindEmail(this.props.fields.email.value,
      () => {
        this.handleOpenEmail();
      }
    ));
  };

  // preventBackgroundScroll = (e) => {
  //   if(this.state.show){
  //     const target = e.currentTarget
  //     if (
  //       (e.deltaY < 0 && target.scrollTop <= 0) ||
  //       (e.deltaY > 0 && target.scrollHeight - target.clientHeight - target.scrollTop <= 0)
  //     ) {
  //       e.stopPropagation()
  //       e.preventDefault()
  //     }
  //   }
  // }

  changeShow=(show)=>{
      this.setState({show:show})
  }

  changeSetting = () => {
    const {fields: {systemSms, systemMail, notarySms, notaryMail, contractSms, contractMail}} = this.props;

    let setting = {
      systemSms: systemSms.value === true || systemSms.value === 1 ? "1" : "0",
      systemMail: systemMail.value === true || systemMail.value === 1 ? "1" : "0",
      notarySms: notarySms.value === true || notarySms.value === 1 ? "1" : "0",
      notaryMail: notaryMail.value === true || notaryMail.value === 1 ? "1" : "0",
      contractSms: contractSms.value === true || contractSms.value === 1 ? "1" : "0",
      contractMail: contractMail.value === true || contractMail.value === 1 ? "1" : "0",
    };

    this.props.dispatch(changeSettings(setting, () => {}));
  };

  changeItem = (value) => {
    return () => {
      this.setState({index:value});
    }
  };

  showUserKycStatus = (status) => {
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
  };

  render() {
    const {fields: { email, systemSms, systemMail, notarySms, notaryMail, contractSms, contractMail},
        user, userInfo, userKycInfo,orgInfo} = this.props;

    let isOrg = StorageUtil.showOrganization();

    let result;
        if(this.showUserKycStatus(user.isKycPass)==='已认证'){
          result=(
              <section className="showStatus">
            <img className="resultImage" src={require("../../../images/users/auth-pass.png")}/>
            <div className="resultTip">
              <p className="result">恭喜您，您已成功通过保全网个人实名认证！</p>
              <p className="resultBottom">您已获得保全网专业服务。</p>
            </div>
          </section>
          )
      }else if(this.showUserKycStatus(user.isKycPass)==='认证失败'){
            result=(
                <section className="showStatus">
                  <img className="resultImage" src={require("../../../images/users/auth-ailure.png")}/>
                  <div className="resultTip">
                    <p className="result">抱歉，您的保全网个人实名认证失败！</p>
                    <p className="resultBottom">您提交的资料审核未通过，请重新认证。</p>
                  </div>
                  <Link className="statusButton" to="/user-kyc">重新认证</Link>
                </section>
            )
        }else if(this.showUserKycStatus(user.isKycPass)==='认证中'){
            result=(
                <section className="showStatus">
                  <img className="resultImage" src={require("../../../images/users/certification.png")}/>
                  <div className="resultTip">
                    <p className="result">您已提交认证，资料审核中…</p>
                    <p className="resultBottom">保全网将以短信通知您结果，请耐心等候。</p>
                  </div>
                </section>
            )
        }else{
            result=(
                <section className="showStatus">
                  <img className="resultImage" src={require("../../../images/users/uncertified.png")}/>
                  <div className="resultTip">
                    <p className="result">您还未进行保全网个人实名认证！</p>
                    <p className="resultBottom">认证通过后将获得保全网专业服务。</p>
                  </div>
                  <Link className="statusButton" to="/user-kyc">立即认证</Link>
                </section>
            )
        }

    return (
      <div className="container-wrapper">
        <div className="container member-container">
          <div className="system-setting">
            <p className="table-name">{T.translate("head.setting")}</p>
            <div className="member-content">
              <nav>
                {
                  isOrg === "false" ?
                    <span style={this.state.index === 1 ? styles.active : {}} onClick={this.changeItem(1)}>基本信息</span>
                    :
                    <span style={this.state.index === 1 ? styles.active : {}} onClick={this.changeItem(1)}>认证信息</span>
                }
                <span style={this.state.index === 3 ? styles.active : {}} onClick={this.changeItem(3)}>修改密码</span>
                <span style={this.state.index === 4 ? styles.active : {}} onClick={this.changeItem(4)}>{isOrg === "false" ? "更换帐号" : "绑定手机"}</span>
        {/*        <span style={this.state.index === 5 ? styles.active : {}} onClick={this.changeItem(5)}>通知设置</span>*/}
              </nav>
              <article className={cx("user-information",{showItem: this.state.index === 1 && isOrg === "false"})}>
                  {result}
                  {
                    this.showUserKycStatus(user.isKycPass)==="已认证"?
                        <div>
                          <section>
                            <span>保全网帐号</span>
                            <p>{user.phoneNumber}</p>
                          </section>
                          <section>
                            <span>姓名</span>
                            <p>{user.realName ? user.realName : "无"}</p>
                          </section>
                          <section>
                            <span>身份证号码</span>
                            <p>{user.idCard ? user.idCard : "无"}</p>
                          </section>
                          <section>
                            <span>身份证照片</span>
                            <p>
                              {user.isKycPass !=="" && userKycInfo.idCardBack ?
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                  <ViewImage src={userKycInfo.idCardFront} style={{maxWidth:400,maxHeight:300,marginRight:30}}/>
                                  <ViewImage src={userKycInfo.idCardBack} style={{maxWidth:400,maxHeight:300}}/>
                                </div>
                                : "无"}</p>
                          </section>
                        </div> :''}
{/*                <section>
                  <span></span>
                  <Link to={`/user-kyc`}>
                    <p className="to-user-kyc">{this.showUserKycStatus(user.isKycPass)}</p>
                  </Link>
                </section>*/}
              </article>
              <article className={cx({showItem: this.state.index === 1 && isOrg === "true"})}>
                {
                  isOrg === "false" ?
                    ""
                    :
                    <OrgSettingInfo isAccount="false" changeShow={this.changeShow}/>
                }
              </article>
              <article className={cx("password",{showItem: this.state.index === 3})}>
                <SettingChangePwd/>
              </article>
              <article className={cx("bind-account",{showItem: this.state.index === 4})}>
                {
                  isOrg === "false" ? ""
                    :
                    <section className="mail">
                      <span>联系人</span>
                      <div style={styles.show}>
                        <p>{orgInfo.contactName}</p>
                      </div>
                    </section>
                }
                <SettingBindPhone/>

           {/*     <form>
                  <section className="mail">
                    <span className="bind-name">{T.translate("common.bind-mail")}</span>
                    <div className="mail-part" style={this.state.editEmail === false ? styles.show : styles.hide}>
                      <p>{user.email === null ? T.translate("setting.no-bind-email") : user.email}</p>
                      <button className="submit" type="button" onClick={this.handleOpenEmail}>
                        {user.email === null ? T.translate("common.bind") : T.translate("common.modify")}</button>
                    </div>
                    <div className="mail-part" style={this.state.editEmail === true ? styles.showEmail : styles.hide}>
                      <RowInput placeholder="" type="text" {...FormUtil.extract(email)} file={email} width="300"
                                height="30"/>
                      <div className="button-group">
                        <button className="submit" onClick={this.handleBindEmail} disabled={!email.value}>
                          {user.email === null ? T.translate("common.bind-mail") : T.translate("common.change-mail")}</button>
                        <button className="cancel" type="button"
                                onClick={this.handleOpenEmail}>{T.translate("common.cancel")}</button>
                      </div>
                    </div>
                  </section>
                </form>*/}
              </article>
 {/*             <article className={cx("notice",{showItem: this.state.index === 5})}>
                <form>
                  <section>
                    <span>{T.translate("setting.system")}</span>
                    <div>
                      <input type="checkbox" {...systemSms} checked={systemSms.value==1 || systemSms.value==true}/>
                      <label className="left">{T.translate("setting.sms")}</label>
                      <input type="checkbox" {...systemMail} checked={systemMail.value==1 || systemMail.value==true}/>
                      <label>{T.translate("setting.email")}</label>
                    </div>
                  </section>
                  <section>
                    <span>{T.translate("setting.sign")}</span>
                    <div>
                      <input type="checkbox" {...contractSms} checked={contractSms.value==1 || contractSms.value==true}/>
                      <label className="left">{T.translate("setting.sms")}</label>
                      <input type="checkbox" {...contractMail} checked={contractMail.value==1 || contractMail.value==true}/>
                      <label>{T.translate("setting.email")}</label>
                    </div>
                  </section>
                  <section>
                    <span>{T.translate("setting.attestation")}</span>
                    <div>
                      <input type="checkbox" {...notarySms} checked={notarySms.value==1 || notarySms.value==true}/>
                      <label className="left">{T.translate("setting.sms")}</label>
                      <input type="checkbox" {...notaryMail} checked={notaryMail.value==1 || notaryMail.value==true}/>
                      <label>{T.translate("setting.email")}</label>
                    </div>
                  </section>
                  <button className="submit" type="button"
                          onClick={this.changeSetting}>{T.translate("notarization.submit")}</button>

                </form>
              </article>*/}
            </div>
          </div>
        </div>

        {/*<ViewImage/>*/}
      </div>
    )
  }
}
