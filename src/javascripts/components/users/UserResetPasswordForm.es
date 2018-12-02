import React, { Component } from "react";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import { reduxForm } from "redux-form";
import { resetPassword } from "../../actions/userAction";
import Link from "../commons/LangLink";
import T from "i18n-react";
import { verifySmsImgCode } from "../../actions/smsVerifyAction";
import RowInput from "../commons/RowInput";
import { getGraphicCode } from "../../actions/adminAction";
import SmsType from "../../utils/SmsType.es";
import LanguageUtil from "../../utils/LanguageUtil.es";
import {toastr} from "react-redux-toastr";
import {businessSignUp} from "../../actions/userAction.es";

const styles = {
  load: {
    marginTop: 20,
    marginRight: 12,
    width: "100%",
  },
  smsImage: {
    width: 88,
    height: 30,
    marginLeft: 136,
  }
};

const validate = values => {
  return new FormValidator(values)
    .verifyCode("verifyCode", T.translate("common.verify-code"))
    .imageCode("checkCode", T.translate("user.pic-verify-code"))
    .password("password", T.translate("user.pwd-type"))
    .rePassword("rePassword", "password", T.translate("user.pwd-type"))
    .phoneNumber("phoneNumber", T.translate("user.correct-phone"))
    .errors;
};

const fields = ['phoneNumber', 'password', 'rePassword', 'verifyCode', 'checkCode'];

@reduxForm({form: 'reset_password', fields, validate}, state => {
    return {
      ...state.sms,
      imageCode: state.admin.imageCode,
      pathname: state.router.location.pathname,
      location: state.router.location,
      onSubmit: (values, dispatch) => {
        var Buffer = require('buffer').Buffer;
        values.password = new Buffer(values.password).toString('base64');
        delete values.rePassword;
        delete values.checkCode;
        dispatch(resetPassword(values,`/sign-in?lang=${LanguageUtil.lang}`));
      }
    }
  }
)
class UserResetPasswordForm extends Component {
  state = {
    checkP: '',
    per:this.props.params.per,
  };

  componentDidMount = () => {
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  render() {
    const {fields: {phoneNumber, verifyCode, password, rePassword, checkCode}, imageCode, handleSubmit, remainTime, dispatch, invalid, pathname} = this.props,
      smsType = SmsType.Pwd;

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
            <Link to="/sign-in">
              <span className="to-sign-in">{T.translate("user.sign-in")}</span>
            </Link>
          </div>
        </div>
      </header>
      <form className="registry-form" onSubmit={handleSubmit}>
        <h1>{T.translate("user.reset-pass")}</h1>
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
            <button type="button" className="code" disabled={remainTime[smsType] || !checkCode.value > 0 ? "disabled" : ""}
                    onClick={e => dispatch(verifySmsImgCode(phoneNumber.value, checkCode.value, smsType, this.state.per=='personal' ? 'PERSONAL' : 'ENTERPRISE'))}>
              {remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
            </button>
          </div>
          <RowInput placeholder={T.translate("user.enter-verify-code")} type="text" {...FormUtil.extract(verifyCode)}
                    file={verifyCode} width="340" height="44"/>
        </section>
        <section>
          <RowInput placeholder={T.translate("user.pwd-type")} type="password" {...FormUtil.extract(password)}
                    file={password} width="340" height="44"/>
          <span className="name">{T.translate("user.set-new-pwd")}</span>
        </section>
        <section>
          <RowInput placeholder={T.translate("user.pwd-type")} type="password" {...FormUtil.extract(rePassword)}
                    file={rePassword} width="340" height="44"/>
          <span className="name">重复新密码</span>
        </section>
{/*        <section>
          <RowInput placeholder={T.translate("user.pwd-type")} type="password"
                    errorText={this.state.checkP!="" && this.state.checkP !== password.value ? T.translate('user.not-equal') : ''}
                    file={{onBlur: e => this.setState({checkP: e.target.value})}} width="340" height="44"/>
          <span className="name">{T.translate("user.check-new-pwd")}</span>
        </section>*/}
        <button type="submit">
          {T.translate("user.change-pwd-ok")}</button>
      </form>
      <footer className="bottom">
        <p>
          Copyright &copy; 2011-2018&nbsp;&nbsp;&nbsp;&nbsp;{T.translate('footer.company')}&nbsp;&nbsp;&nbsp;&nbsp;All
          Rights Reserved {T.translate('footer.ICP')}
        </p>
      </footer>
    </div>
  }
}

export default UserResetPasswordForm;
