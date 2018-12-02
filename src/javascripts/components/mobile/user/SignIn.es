import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { reduxForm } from "redux-form";
import FormValidator from "../../../utils/FormValidator";
import TokenUtil from "../../../utils/TokenUtil";
import { signIn, verifyCodeLogin } from "../../../actions/userAction";
import Link from "../../commons/LangLink";
import FormUtil from "../../../utils/FormUtil";
import NavMenu from "../common/NavMenu";
import cx from "classnames";
import { verifySmsCode } from "../../../actions/smsVerifyAction";
import SmsType from "../../../utils/SmsType.es";

export const fields = ['phoneNumber', 'password', 'code'];
let active = "fast";

const validate = values => {
  return new FormValidator(values)
  // .password("password", T.translate("user.pwd-type"))
  // .verifyCode("code", "手机号")
    .phoneNumber("phoneNumber", "正确的手机号")
    .errors;
};

@reduxForm({form: "sign-in", fields},
  state => {
    return {
      ...state.sms,
      initialValues: {phoneNumber: state.router.location.query['phoneNumber'] || '', password: "", code: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      pathname: state.router.location.pathname,

      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        if(active === "fast"){
          dispatch(verifyCodeLogin({phoneNumber: values.phoneNumber,verifyCode: values.code,rememberMe: true},state.router.location.query['next'] || '/mobile'));
        } else {
          dispatch(signIn({phoneNumber: values.phoneNumber, password: values.password, rememberMe: true}, state.router.location.query['next'] || '/mobile'));
        }
      }
    }
  })
export default class SignIn extends Component {
  data = {
    title: '登录',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
  };

  changeActive = pos => {
    active = pos;
    this.forceUpdate();
  };

  render() {
    const {fields: {phoneNumber, password, code}, invalid, location, remainTime, dispatch} = this.props,
      smsType = SmsType.Login;

    return <div className="user-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="sign-type">
        <span className={cx({type: active === 'fast'})} onClick={() => {this.changeActive('fast')}}>短信登录</span>
        <span className={cx({type: active === 'normal'})} onClick={() => this.changeActive('normal')}>账号登录</span>
      </div>
      <form onSubmit={this.props.handleSubmit}>
        <input placeholder='请输入手机号' type="text" {...FormUtil.extract(phoneNumber)}/>
        <div className={cx("content", "passive",{active: active === 'fast'})}>
          <input placeholder='请输入验证码' type="password" {...FormUtil.extract(code)}/>
          <button type="button" className="login-code" disabled={remainTime[smsType] > 0 ? "disabled" : ""}
                  onClick={e => dispatch(verifySmsCode(phoneNumber.value, smsType))}>
            { remainTime[smsType] > 0 ? (`${remainTime[smsType]}`+'秒后重发') : "发送验证码"}
          </button>
        </div>
        <div className={cx("content", "passive",{active: active === 'normal'})}>
          <input placeholder='请输入密码' type="password" {...FormUtil.extract(password)}/>
        </div>
        <button type="submit" className="action">登录</button>
        {/* <button type="submit" className={`action ${invalid ? 'btn-disabled' : ''}`} disabled={invalid}>登录</button> */}
      </form>
      <div className="link-wrap">
        <Link
          to={`/mobile/password?next=${encodeURI('/mobile/sign-in' + (location.query['next'] ? '?next=' + location.query['next'] : ''))}`}>忘记密码</Link>
        <Link to="/mobile/sign-up">免费注册</Link>
      </div>
    </div>
  }
}