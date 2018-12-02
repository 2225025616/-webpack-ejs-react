import React, { Component } from "react";
import Link from "../commons/LangLink";
import { signIn, verifyCodeLogin, businessLogin} from "../../actions/userAction";
import { reduxForm } from "redux-form";
import TokenUtil from "../../utils/TokenUtil";
import push from "../../utils/push";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import ColumnInput from "../commons/ColumnInput";
import LanguageUtil from "../../utils/LanguageUtil";
import T from "i18n-react";
import cx from "classnames";
import { verifySmsCode } from "../../actions/smsVerifyAction";
import SmsType from "../../utils/SmsType.es";
import StorageUtil from "../../utils/StorageUtil";
import { getGraphicCode } from "../../actions/adminAction";

const validate = values => {
  return new FormValidator(values)
    .password("password", T.translate("user.pwd-type"))
    .nonEmpty("organizationName",'企业名称或手机号')
    .imageCode("checkCode", '图形验证码')
    .errors;
};
const styles = {
  passwordLogin:{
    marginBottom:21,
    marginTop:16,
    marginLeft:2,
    marginRight:0,
    fontSize:14
  },
};
let per,type;
export const fields = ['phoneNumber', 'password', 'code','organizationName', 'checkCode'];

@reduxForm({form: "businessLogin", fields, validate},
  state => {
    return {
      ...state.sms,
      initialValues: {organizationName: "", password: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      pathname: state.router.location.pathname,
      imageCode: state.admin.imageCode,

      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        var Buffer = require('buffer').Buffer;
        var pwd= new Buffer(values.password).toString('base64');
        dispatch(businessLogin({organizationName: values.organizationName,password: pwd,checkCode: values.checkCode,rememberMe: true}));
      },
    }
  })

class BusinessPwdLoginForm extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.handleGetGraphicCode();
  }

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  render(){
    const {fields: {phoneNumber, password, code,organizationName, checkCode},remainTime, dispatch, imageCode} = this.props
    per=this.props.per;
    type=this.props.type;

    return <form onSubmit={this.props.handleSubmit} style={{height:310}}>
      <div>
        <div className="phone-number">
          <ColumnInput placeholder="请输入企业名称或手机号"
                       type="text" {...FormUtil.extract(organizationName)} file={organizationName}
          />
        </div>
        <ColumnInput placeholder="请输入6到18位数字加字母的密码"
                     type="password" {...FormUtil.extract(password)} file={password}/>
        <div className="img-verify">
          <img className="check-code" src={"data:image/png;base64," + imageCode} onClick={this.handleGetGraphicCode}/>
          <ColumnInput placeholder={T.translate("user.enter-pic-verify-code")} type="text" {...FormUtil.extract(checkCode)}
                    file={checkCode} width="340" height="44" maxLength="4"/>
        </div>
        <Link to={`/reset-password/${per}`}>
          <button type="button" className="forget-pwd">{T.translate("user.forget")}?</button>
        </Link>
      </div>
      <button type="submit" className="login">{T.translate("user.sign-in")}</button>
    </form>
  }
}

export default BusinessPwdLoginForm;