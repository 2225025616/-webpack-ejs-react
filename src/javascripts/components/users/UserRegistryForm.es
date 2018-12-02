import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { signUp,businessSignUp } from "../../actions/userAction";
import Link from "../commons/LangLink";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import T from "i18n-react";
import { verifySmsImgCode } from "../../actions/smsVerifyAction";
import LanguageUtil from "../../utils/LanguageUtil";
import RowInput from "../commons/RowInput";
import { getGraphicCode } from "../../actions/adminAction";
import replace from "../../utils/replace";
import SmsType from "../../utils/SmsType.es";import BusinessRegisterForm from "./BusinessRegisterForm";
import cx from "classnames";
import {toastr} from "react-redux-toastr";


const styles = {
  label: {
    marginTop: 15,
    width: "100%"
  },
  smsImage: {
    width: 88,
    height: 30,
    marginLeft: 136,
  }
};
let per;
export const fields = ['phoneNumber', 'password', 'rePassword', 'verifyCode', 'checkCode', 'accepted'];
// let per=this.props.params.per;
const validate = values => {
  return (new FormValidator(values))
    .verifyCode("verifyCode", T.translate("common.verify-code"))
    .imageCode("checkCode", T.translate("user.pic-verify-code"))
    .password("password", T.translate("user.pwd-type"))
    .rePassword("rePassword", "password", T.translate("user.pwd-type"))
    .phoneNumber("phoneNumber", T.translate("user.correct-phone"))
    .mustEqual("accepted", true, T.translate("user.accept"))
    .errors
};

@reduxForm({form: 'register', fields, validate}, state => {
    return {
      ...state.sms,
      imageCode: state.admin.imageCode,
      pathname: state.router.location.pathname,
      location: state.router.location,
      initialValues: {accepted: true},
      onSubmit: (values, dispatch) => {
        var Buffer = require('buffer').Buffer;
        values.password = new Buffer(values.password).toString('base64');
        delete values.rePassword;
        delete values.checkCode;
        dispatch(signUp(values));
      }
    }
  }
)

class UserRegistryForm extends Component {

  componentDidMount = () => {
    let lang = this.props.location.query['lang'];
    if (lang && lang !== LanguageUtil.lang)
      this.props.dispatch(replace(this.props.location.pathname));
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };
constructor(props){
  super(props)
    this.state={
    per:this.props.params.per
    }
}
    changePer=(e)=>{
  this.setState({
      per:e
  })
        this.forceUpdate();
    }

  render() {
    const {fields: {phoneNumber, verifyCode, password, rePassword, checkCode, accepted}, imageCode, handleSubmit, remainTime, dispatch, purpose, pathname} = this.props,
      smsType = SmsType.Register;
    per=this.state.per
    return <div className="sign-up-page">
      <header>
        <div className="content">
          <Link to="/">
            <img
              src={require("images/users/register-logo.png")}/>
          </Link>
          <div className="language">
            {/*
             {
             (LanguageUtil.lang == "zh")
             ?
             <a href={pathname+"?lang=en"}>English</a>
             :
             <a href={pathname+"?lang=zh"}>简体中文</a>
             }
             */}

            <p>{T.translate("user.have-account")}
              <Link to="/sign-in">
                <span className="to-sign-in">{T.translate("user.to-login")}</span>
              </Link>
            </p>
          </div>
        </div>
      </header>
        {this.state.per==="business"?
            <BusinessRegisterForm per={this.state.per} changePer={this.changePer}/>
            :
            <form className="registry-form" onSubmit={handleSubmit}>
              <div className="sign-in-type">
                <span className={cx({activesItem: this.state.per === "personal"})} onClick={e => this.changePer("personal")}>个人注册</span>
                <span className={cx({activesItem: this.state.per === "business"})} onClick={e => this.changePer("business")}>企业注册</span>
              </div>
              <h1>{T.translate("user.welcome-login")}</h1>
              <section>
                <RowInput placeholder={T.translate("user.phone-tip")} type="text" {...FormUtil.extract(phoneNumber)}
                          file={phoneNumber} width="340" height="44"/>
                <span className="name">{T.translate("common.phone-number")}</span>
              </section>
              <section>
                <div className="verify">
                  <span className="name">{T.translate("user.pic-verify-code")}</span>
                  <img style={styles.smsImage} src={"data:image/png;base64," + imageCode}
                       onClick={this.handleGetGraphicCode}/>
                </div>
                <RowInput placeholder={T.translate("user.enter-pic-verify-code")} type="text" {...FormUtil.extract(checkCode)}
                          file={checkCode} width="340" height="44" maxLength="4"/>
              </section>
              <section>
                <div className="verify">
                  <span className="name">{T.translate("user.verify-code")}</span>
                  <button type="button" className="code" disabled={remainTime[smsType] > 0 || !checkCode.value ? "disabled" : ""}
                          onClick={e => dispatch(verifySmsImgCode(phoneNumber.value, checkCode.value, smsType, 'PERSONAL'))}>
                      {remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
                  </button>
                </div>
                <RowInput placeholder={T.translate("user.enter-verify-code")} type="text" {...FormUtil.extract(verifyCode)}
                          file={verifyCode} width="340" height="44"/>
              </section>
              <section>
                <RowInput placeholder={T.translate("user.pwd-type")} type="password" {...FormUtil.extract(password)}
                          file={password} width="340" height="44"/>
                <span className="name">{T.translate("user.set-pwd")}</span>
              </section>
              <section>
                <RowInput placeholder={T.translate("user.pwd-type")} type="password" {...FormUtil.extract(rePassword)}
                          file={rePassword} width="340" height="44"/>
                <span className="name">重复密码</span>
              </section>
              <button type="submit">{T.translate("user.accept-sign-up")}</button>
              <div className="service">
                <input type="checkbox" {...accepted}/>
                <p><Link to="/tos" className="clause">《{T.translate("user.baoquan-tos")}》</Link></p>
              </div>
            </form>
        }
      <footer className={cx("bottom",{registBottom:this.state.per==="business"})}>
        <p>
          Copyright &copy; 2011-2018&nbsp;&nbsp;&nbsp;&nbsp;{T.translate('footer.company')}&nbsp;&nbsp;&nbsp;&nbsp;All
          Rights Reserved {T.translate('footer.ICP')}
        </p>
      </footer>
    </div>
  }
}

export default UserRegistryForm;
