import React, { Component } from "react";
import { signIn } from "../../actions/userAction";
import { reduxForm } from "redux-form";
import TokenUtil from "../../utils/TokenUtil";
import push from "../../utils/push";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import AdminRoute from "../admins/AdminRoute";
import ColumnInput from "../commons/ColumnInput";
import T from "i18n-react";
import { getGraphicCode } from "../../actions/adminAction";

const styles = {
  submit: {
    width: 258,
    height: 30,
    marginTop: 20
  }
};

export const fields = ['phoneNumber', 'password', 'checkCode'];
const validate = values => {
  return new FormValidator(values)
    .password("password", "数字字母组合密码")
    .phoneNumber("phoneNumber", "正确的手机号")
    .imageCode("checkCode", '图形验证码')
    .errors;
};

@reduxForm({form: "login", fields, validate},
  state => {
    return {
      initialValues: {phoneNumber: "", password: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      imageCode: state.admin.imageCode,
      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        var Buffer = require('buffer').Buffer;
        values.password = new Buffer(values.password).toString('base64');
        dispatch(signIn({...values, rememberMe: true}));
      }
    }
  })
class UserLoginForm extends Component {

  componentWillMount() {
    this.props.dispatch(getGraphicCode());
  }

  componentWillReceiveProps(nextProps) {
    let adminRoute = AdminRoute.adminRoute();
    if (nextProps.authenticated && !nextProps.auto) {
      let {query} = this.props.location;
      let next;
      next = query.next ? query.next : undefined;

      if (!next || next.startsWith(`/${adminRoute}/sign-in`)) {
        next = `/${adminRoute}/templates`;
      }

      this.props.dispatch(push(next));
    }
  }

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };


  render() {
    const {fields: {phoneNumber, password, checkCode}, imageCode} = this.props;

    return <div className="login-warp">
      <div className="login-content">
        <div className="login-person"><img
          src={require("images/users/login-person.png")}/>
        </div>
        <div className="login-square"/>
        <div className="sessions new">
          <section id="signup-user" className="obox-content">
            <h3>用户登录</h3>
            <form className="new_user" id="sign_in" onSubmit={this.props.handleSubmit} autoComplete="off">
              <div className="phone-number admin-login-phone">
                <ColumnInput placeholder="请输入手机号码" type="text" {...FormUtil.extract(phoneNumber)} file={phoneNumber}/>
              </div>
              <ColumnInput placeholder="请输入6-16位数字字母组合密码" type="password" {...FormUtil.extract(password)}
                           file={password}/>
              <div className="img-verify">
                <img className="check-code" src={"data:image/png;base64," + imageCode} onClick={this.handleGetGraphicCode}/>
                <ColumnInput placeholder={T.translate("user.enter-pic-verify-code")} type="text" {...FormUtil.extract(checkCode)}
                             file={checkCode} width="340" height="44" maxLength="4"/>
              </div>
              <button type="submit" className="login">登 录</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  }
}
export default UserLoginForm;
