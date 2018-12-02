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
import UserPwdLoginForm from "./UserPwdLoginForm";
import BusinessPwdLoginForm   from "./BusinessPwdLoginForm";

const styles = {
  submit: {
    width: 258,
    height: 30,
    marginTop: 20
  },
  zhSlogan: {
    width: 600,
    height: 259,
  },
  enSlogan: {
    width: 630,
    height: 261,
  },
    passwordLogin:{
        marginBottom:21,
        marginTop:16,
        marginLeft:2,
        marginRight:0,
        fontSize:14
    },
    codeLogin:{
        float:'left',
        marginBottom:21,
        marginTop:16,
        marginLeft:0,
        marginRight:0,
        fontSize:14
    }
};

export const fields = ['phoneNumber', 'password', 'code','organizationName'];

let per="personal";
let type = "pwd";

const validate = values => {
    return new FormValidator(values)
        .verifyCode("code", "验证码")
        .phoneNumber("phoneNumber", T.translate("user.correct-phone"))
        .errors;
};


@reduxForm({form: "pwdLogin", fields, validate},
  state => {
    return {
      ...state.sms,
      initialValues: {phoneNumber: "", code: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      pathname: state.router.location.pathname,
      user: state.user.info,

      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        dispatch(verifyCodeLogin({phoneNumber: values.phoneNumber,verifyCode: values.code,rememberMe: true}));
      },
    }
  })



class UserLoginForm extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount = () => {
  };

  componentWillReceiveProps(nextProps) {
    const {user} = this.props;

    if (nextProps.authenticated && !nextProps.auto) {
      let {query} = this.props.location;
      let next;
      next = query.next ? query.next : undefined;

      if(user.id){
        if (!next || next.startsWith("/sign-in")) {
          if(user.type === 'ENTERPRISE'){
            StorageUtil.showOrganization("true");
            next = "/org-statistic";
          }
          else if (user.type === 'PERSONAL') {
            StorageUtil.showOrganization("false");
            next = "/attestations";
          }
        }
        if (next.startsWith("http")) {
          if(user.type === 'ENTERPRISE'){
            StorageUtil.showOrganization("true");
            window.location = next
          }
          else if (user.type === 'PERSONAL') {
            StorageUtil.showOrganization("false");
            window.location = next
          }
        } else {
          if(user.type === 'ENTERPRISE'){
            StorageUtil.showOrganization("true");
            this.props.dispatch(push(next));
          }
          else if (user.type === 'PERSONAL') {
            StorageUtil.showOrganization("false");
            this.props.dispatch(push(next));
          }
        }
      }
    }
  }
  changePer=(e)=>{
    per=e;
    this.forceUpdate();
  }
  changeType = (e) => {
    type = e;
    this.forceUpdate();
  };

  codeSign = () => {

  };

  render() {
    const {fields: {phoneNumber, password, code,organizationName},remainTime, dispatch} = this.props,
      smsType = SmsType.Login;
      per=this.props.params.per?this.props.params.per:per
    return <div className="sign-in-page">
      <header/>
      <div className="head-content">
        <div className="logo">
          <Link to="/">
            <img src={require("images/logo@2x.png")}/>
          </Link>
        </div>
      </div>
      <article className="sign-in-content">
        {
          (LanguageUtil.lang === "zh") ?
            <img style={styles.zhSlogan}
                 src={require("images/users/sign-in-slogan.png")}/>
            : <img style={styles.enSlogan} className="slogan"
                   src={require("images/users/sign-in-slogan-en.png")}/>
        }
        <div className="sign-in-form" onSubmit={this.props.handleSubmit}>
          <div className="sign-in-type">
            <span className={cx({activesItem: per === "personal"})} onClick={e => this.changePer("personal")}>个人登录</span>
            <span className={cx({activesItem: per === "business"})} onClick={e => this.changePer("business")}>企业登录</span>
          </div>
            {per==="business"?
               <BusinessPwdLoginForm per={per} type={type}/>
                :
                type==="code"?
                    <form onSubmit={this.props.handleSubmit} style={{height:310}}>
                    <div>
                      <div className="phone-number">
                        <ColumnInput placeholder={T.translate("user.phone-tip")}
                                     type="text" {...FormUtil.extract(phoneNumber)}
                                     file={phoneNumber}/>
                      </div>
                      <div className="code" style={{marginBottom:0}}>
                        <ColumnInput placeholder="请输入验证码" type="text" {...FormUtil.extract(code)}
                                     file={code}/>
                        <button type="button" className="login-code" disabled={remainTime[smsType] > 0 ? "disabled" : ""}
                                onClick={e => dispatch(verifySmsCode(phoneNumber.value, smsType))}>
                            { remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
                        </button>
                      </div>
                      <div style={styles.passwordLogin}>
                        <span onClick={e => this.changeType("pwd")}>账号密码登录</span>
                      </div>
                    </div>
                        <button type="submit" className="login">{T.translate("user.sign-in")}</button>
                    </form >
                    :
                    <UserPwdLoginForm per={per} type={type} changeType={this.changeType}/>
            }
          <div className="register">
            <hr/>
            <Link to={`/sign-up/${per}`} className="link">
              <span className="to-register">{T.translate("user.sign-up-new")}</span>
            </Link>
          </div>
        </div>
      </article>
      <footer>
        <p>
          Copyright &copy; 2011-2018&nbsp;&nbsp;&nbsp;&nbsp;{T.translate('footer.company')}&nbsp;&nbsp;&nbsp;&nbsp;All
          Rights Reserved {T.translate('footer.ICP')}
        </p>
      </footer>
    </div>
  }
}

export default UserLoginForm;
