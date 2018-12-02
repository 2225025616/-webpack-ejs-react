import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { reduxForm } from "redux-form";
import FormValidator from "../../../utils/FormValidator";
import { signUp } from "../../../actions/userAction";
import Link from "../../commons/LangLink";
import FormUtil from "../../../utils/FormUtil";
import NavMenu from "../common/NavMenu";
import { verifySmsCode } from "../../../actions/smsVerifyAction";
import { getGraphicCode } from "../../../actions/adminAction";
import SmsType from "../../../utils/SmsType.es";

export const fields = ['phoneNumber', 'password', 'verifyCode', 'checkCode', 'accepted'];

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("verifyCode", '短信验证码')
    .nonEmpty("checkCode", '图形验证码')
    .password("password", '数字字母组合密码')
    .phoneNumber("phoneNumber", '正确的手机号')
    .mustEqual("accepted", true, '请先阅读并同意用户协议')
    .errors
};

@reduxForm({form: 'sign-up', fields, validate}, state => {
    return {
      ...state.sms,
      imageCode: state.admin.imageCode,
      pathname: state.router.location.pathname,
      location: state.router.location,
      initialValues: {accepted: true},
      onSubmit: (values, dispatch) => {
        dispatch(signUp(values, '/mobile/sign-in?phoneNumber=' + values.phoneNumber));
      }
    }
  }
)
export default class SignIn extends Component {
  data = {
    title: '注册',
  };


  componentWillMount = () => {
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  render() {
    const {fields: {phoneNumber, verifyCode, password, checkCode, accepted}, imageCode, invalid, remainTime, dispatch} = this.props,
      smsType = SmsType.Register;

    return <div className="user-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <form onSubmit={this.props.handleSubmit}>
        <input placeholder='请输入手机号' type="text" {...FormUtil.extract(phoneNumber)}/>
        <div className="image-code-wrap">
          <input placeholder='请输入图形验证码' type="text" {...FormUtil.extract(checkCode)}/>
          <img src={"data:image/png;base64," + imageCode}
               onClick={this.handleGetGraphicCode}/>
        </div>
        <div className="phone-number-wrap">
          <input placeholder='请输入验证码' type="text" {...FormUtil.extract(verifyCode)}/>
          <button className={`btn-code ${remainTime[smsType] > 0 || phoneNumber.invalid ? 'btn-disabled' : ''}`}
                  disabled={remainTime[smsType] > 0 || phoneNumber.invalid ? true : ""}
                  onClick={e => dispatch(verifySmsCode(phoneNumber.value, smsType))}>
            {remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + ' 秒') : '获取验证码'}
          </button>
        </div>
        <input placeholder='请设置密码' type="password" {...FormUtil.extract(password)}/>
        <div className="tos-input-wrap">
          <input type="checkbox" id="accept" {...accepted}/>
          <label htmlFor="accept">注册即表示同意 <Link to="/mobile/tos">《用户协议》</Link></label>
        </div>

        <button type="submit" className={`action ${invalid ? 'btn-disabled' : ''}`} disabled={invalid}>注册</button>
        <div className="link-wrap">
          <Link to="/mobile/sign-in">已有账号，立即登录</Link>
        </div>
      </form>
    </div>
  }
}