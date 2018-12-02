import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import FormUtil from "../../../utils/FormUtil";
import FormValidator from "../../../utils/FormValidator";
import { reduxForm } from "redux-form";
import { modifyPassword, resetPassword } from "../../../actions/userAction";
import { verifySmsCode } from "../../../actions/smsVerifyAction";
import { getGraphicCode } from "../../../actions/adminAction";
import ValidateUtil from "../../../utils/ValidateUtil";
import SmsType from "../../../utils/SmsType.es";

const validate = values => {
  return new FormValidator(values)
    .verifyCode("verifyCode", '短信验证码')
    .nonEmpty("checkCode", '图形验证码')
    .password("password", '数字字母组合密码')
    .phoneNumber("phoneNumber", '正确的手机号')
    .errors;
};

const fields = ['phoneNumber', 'password', 'verifyCode', 'checkCode'];

@reduxForm({form: 'reset_password', fields, validate}, state => {
    return {
      ...state.sms,
      user: state.user.info,
      imageCode: state.admin.imageCode,
      pathname: state.router.location.pathname,
      onSubmit: (values, dispatch) => {
        dispatch(resetPassword(values, state.router.location.query['next'] || '/mobile/sign-in'));
      }
    }
  }
)
export default class PasswordReset extends Component {
  data = {
    title: '密码重置',
  };

  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    invalid: true,
  };

  componentWillMount = () => {
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  changePassword = e => {
    e.preventDefault();
    let {oldPassword, newPassword} = this.state;
    this.props.dispatch(modifyPassword({oldPassword, newPassword}, () => {
      this.refs.old.value = null;
      this.refs.new.value = null;
      this.refs.confirm.value = null;
      this.setState({invalid: true})
    }));
  };

  inputChange = (item) => {
    return e => {
      const state = {}, {newPassword, confirmPassword} = this.state;
      state[item] = e.target.value;
      let newP = item === 'newPassword' ? state[item] : newPassword,
        confirmP = item === 'confirmPassword' ? state[item] : confirmPassword;
      state.invalid = !newP || !ValidateUtil.validatePassword(newP) || newP !== confirmP;
      this.setState(state);
    }
  };

  render() {
    const {fields: {phoneNumber, verifyCode, password, checkCode}, user, invalid, remainTime, dispatch, imageCode} = this.props,
      smsType = SmsType.Pwd;

    return <div className="user-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <span className='back' style={{opacity: 0}}/>
      </Header>
      {
        !user.id ?
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
            <input placeholder='请输入新密码' type="password" {...FormUtil.extract(password)}/>
            <input placeholder='请再次输入新密码' type="password"
                   onChange={e => this.setState({confirmPassword: e.target.value})}/>
            <button type="submit"
                    className={`action ${invalid || (password.value !== this.state.confirmPassword) ? 'btn-disabled' : ''}`}
                    disabled={invalid || (password.value !== this.state.confirmPassword)}>重置密码
            </button>
          </form>
          : <div className="form">
            <input placeholder='请输入原密码' type="password" onChange={this.inputChange('oldPassword')} ref="old"/>
            <input placeholder='请输入新密码 (不少于6位数, 数字+字母)' type="password" onChange={this.inputChange('newPassword')}
                   ref="new"/>
            <input placeholder='请再次输入新密码' type="password" onChange={this.inputChange('confirmPassword')} ref="confirm"/>
            <button className={`action ${this.state.invalid ? 'btn-disabled' : ''}`} disabled={this.state.invalid}
                    onClick={this.changePassword}>重置密码
            </button>
          </div>
      }
    </div>
  }
}