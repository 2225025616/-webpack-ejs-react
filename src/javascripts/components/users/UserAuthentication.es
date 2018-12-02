import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getKyc, updateKyc } from "../../actions/userAction";
import T from "i18n-react";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import RowInput from "../commons/RowInput";
import Image from "../commons/Image";
import BackMenu from "../commons/BackMenu";

const fields = ['realName', 'idCard', "idCardFront", "idCardBack"];

const validate = values => {
  return new FormValidator(values)
    .realName("realName", T.translate("common.real-name"))
    .idCard("idCard", T.translate("common.id-number"))
    .nonEmpty("idCardFront", T.translate("kyc.id-card-front"))
    .nonEmpty("idCardBack", T.translate("kyc.id-card-back"))
    .errors;
};

const getInitialValues = state => {
  return {
    ...state.user.kyc,
  };
};


@reduxForm({form: 'user_kyc', fields, validate},
  state => {
    return {
      initialValues: {
        ... getInitialValues(state)
      },
      user: state.user.kyc,

      onSubmit: (values, dispatch) => {
        dispatch(updateKyc(FormUtil.trimStringImage(values, "idCardFront", "idCardBack"), () => {
          dispatch(getKyc());
        }));
      }
    }
  })

export default class UserAuthentication extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(getKyc());
  }
  render() {
    const {fields: {realName, idCard, idCardFront, idCardBack}, user, handleSubmit} = this.props;
    return (
      <div className="container-wrapper">
        <div className="container">
          <div className="user-authentication">
            <BackMenu title={T.translate("kyc.user-auth")}/>
            <div className="ctn">
            {
              user.status === "PASS" || user.status === "APPLY" ?
                <form className="content">
                    {user.status==="APPLY"?
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
                  <section>
                    <span>{T.translate("notarization.name")}</span>
                    <label>{user.realName}</label>
                  </section>
                  <section>
                    <span>{T.translate("notarization.idcard")}</span>
                    <label>{user.idCard}</label>
                  </section>
                  <section>
                    <span>{T.translate("kyc.id-card-front")}</span>
                    <img className="id-card-img" src={user.idCardFront}/>
                  </section>
                  <section>
                    <span>{T.translate("kyc.id-card-back")}</span>
                    <img className="id-card-img" src={user.idCardBack}/>
                  </section>
          {/*        {
                    user.status === "PASS" ?
                      <p>*{T.translate("kyc.pass-verify")}</p>
                      :
                      <p>*{T.translate("kyc.wait-verify")}</p>
                  }*/}
                </form>
                :
                <form className="content" onSubmit={handleSubmit}>
                    {user.status==="REJECT"?
                        <section className="showStatus">
                          <img className="resultImage" src={require("../../../images/users/auth-ailure.png")}/>
                          <div className="resultTip">
                            <p className="result">抱歉，您的保全网个人实名认证失败！</p>
                            <p className="resultBottom">您提交的资料审核未通过，请重新认证。</p>
                          </div>
                        </section>
                        :
                        ''
                    }
                  <section>
                    <span>{T.translate("notarization.name")}</span>
                    <RowInput placeholder="" type="text" {...FormUtil.extract(realName)} file={realName} width="300"
                              height="30"/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.idcard")}</span>
                    <RowInput placeholder="" type="text" {...FormUtil.extract(idCard)} file={idCard} width="300"
                              height="30"/>
                  </section>
                  <section className="id-card-info id-card-front">
                    <span>{T.translate("kyc.id-card-front")}：</span>
                    <div className="id-card-pic">
                      <Image altSrc={require("images/components/information/id-card-front.jpg")}
                        src={FormUtil.imageSrc(idCardFront)}/>
                      <div className="upload">
                        <input className="upload-file" type="file" { ...FormUtil.ignoreFileUrl(idCardFront,this)}
                               accept="image/jpg, image/png, image/jpeg"/>
                        <span>{T.translate("kyc.upload")}</span>
                        <p>{T.translate("kyc.id-card-1")}</p>
                        <p>{T.translate("kyc.id-card-2")}</p>
                        <p className="notes">{T.translate("kyc.id-card-tip")}</p>
                      </div>
                    </div>
                  </section>
                  <section className="id-card-info">
                    <span>{T.translate("kyc.id-card-back")}：</span>
                    <div className="id-card-pic">
                      <Image altSrc={require("images/components/information/id-card-back.jpg")}
                        src={FormUtil.imageSrc(idCardBack)}/>
                      <div className="upload">
                        <input className="upload-file" type="file" { ...FormUtil.ignoreFileUrl(idCardBack,this)}
                               accept="image/jpg, image/png, image/jpeg"/>
                        <span>{T.translate("kyc.upload")}</span>
                        <p>请上传身份证人像面的扫描件或者清晰照片</p>
                        <p>{T.translate("kyc.id-card-2")}</p>
                        <p className="notes">{T.translate("kyc.id-card-tip")}</p>
                      </div>
                    </div>
                  </section>
                  {
                    user.status === "REJECT" ?
                      <div className="submit">
                        <label>{T.translate("common.reject-reason")}{user.rejectReason}</label>
                        <p>*{T.translate("kyc.org-modify")}</p>
                        <button className="blueButton" type="submit" ref="kyc">{T.translate("user.re-certify")}</button>
                      </div>

                      :
                      <div className="submit">
                        <button className="blueButton" type="submit" ref="kyc">{T.translate("notarization.submit")}</button>
                      </div>
                  }
                  {/*
                   <section>
                   <span>手机号码</span>
                   <PhoneNumberAndVerify purpose="AUTHENTIC" field={phoneNumber}/>
                   </section>
                   <section>
                   <span>验证码</span>
                   <RowInput placeholder="" type="text" {...FormUtil.extract(verifyCode)} file={verifyCode} width="300" height="30"/>
                   </section>
                   */}
                </form>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
