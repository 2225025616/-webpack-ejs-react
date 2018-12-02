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

const styles = {
  codeLogin:{
    float:'left',
    marginBottom:21,
    marginTop:16,
    marginLeft:0,
    marginRight:0,
    fontSize:14
  }
};
const validate = values => {
  return new FormValidator(values)
    .password("password", T.translate("user.pwd-type"))
    .imageCode("checkCode", '图形验证码')
    .phoneNumber("phoneNumber", T.translate("user.correct-phone"))
    .errors;
};
export const fields = ['phoneNumber', 'password', 'checkCode'];
let per;
let type;
@reduxForm({form: "pwdLogin", fields, validate},
  state => {
    return {
      ...state.sms,
      initialValues: {phoneNumber: "", password: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      pathname: state.router.location.pathname,
      imageCode: state.admin.imageCode,

      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        var Buffer = require('buffer').Buffer;
        var pwd= new Buffer(values.password).toString('base64');
        dispatch(signIn({phoneNumber: values.phoneNumber, password: pwd, checkCode: values.checkCode, rememberMe: true}));
      },
    }
  })


class UserPwdLoginForm extends Component{
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
    const {fields: {phoneNumber, password, checkCode}, imageCode} = this.props;
    per=this.props.per;
    type=this.props.type;
    return <form onSubmit={this.props.handleSubmit} style={{height:310}}>
      <div>
        <div className="phone-number">
          <ColumnInput placeholder={T.translate("user.phone-tip")}
                       type="text" {...FormUtil.extract(phoneNumber)}
                       file={phoneNumber}/>
        </div>
        <ColumnInput placeholder={T.translate("user.input-password")}
                     type="password" {...FormUtil.extract(password)}
                     file={password}/>
        <div className="img-verify">
          <img className="check-code" src={"data:image/png;base64," + imageCode} onClick={this.handleGetGraphicCode}/>
          <ColumnInput placeholder={T.translate("user.enter-pic-verify-code")} type="text" {...FormUtil.extract(checkCode)}
                       file={checkCode} width="340" height="44" maxLength="4"/>
        </div>
        <div style={{overFlow:'hidden'}}>
          <span onClick={()=>this.props.changeType('code')} style={styles.codeLogin}>验证码登录</span>
          <Link to={`/reset-password/${per}`} style={{float:'right'}}>
            <button type="button" className="forget-pwd">{T.translate("user.forget")}?</button>
          </Link>
        </div>
      </div>
      <button type="submit" className="login">{T.translate("user.sign-in")}</button>
    </form>
  }
}

export default UserPwdLoginForm;