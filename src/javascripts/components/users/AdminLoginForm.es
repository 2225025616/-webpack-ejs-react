import React, { Component } from "react";
import Link from "../commons/LangLink";
import { signIn } from "../../actions/userAction";
import { reduxForm } from "redux-form";
import TokenUtil from "../../utils/TokenUtil";
import push from "../../utils/push";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import LoadingButton from "../commons/LoadingButton";
import T from "i18n-react";
import AdminRoute from "../admins/AdminRoute";

const styles = {
  submit: {
    width: 258,
    height: 30,
    marginTop: 20
  }
};

export const fields = ['phoneNumber', 'password'];
const validate = values => {
  return new FormValidator(values)
    .password("password", T.translate("common.password"))
    .phoneNumber("phoneNumber", T.translate("common.phone-number"))
    .errors;
};

@reduxForm({form: "login", fields, validate},
  state => {
    return {
      initialValues: {phoneNumber: "", password: ""},
      authenticated: state.user.authenticated,
      auto: state.user.auto,
      location: state.router.location,
      onSubmit: (values, dispatch) => {
        TokenUtil.clean();
        dispatch(signIn({...values, rememberMe: true}));
      }
    }
  })
export default class AdminLoginForm extends Component {

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


  render() {
    const {fields: {phoneNumber, password}} = this.props;

    return <div className="login-warp">
      <div className="login-content">
        <div className="login-person"><img
          src={require("images/users/login-person.png")}/>
        </div>
        <div className="login-square"/>
        <div className="sessions new">
          <section id="signup-user" className="obox-content">
            <h3>{T.translate("user.login-in")}</h3>
            <form className="new_user" id="sign_in" onSubmit={this.props.handleSubmit} autoComplete="off">
              <div className="item phone">
                <input {...FormUtil.extract(phoneNumber)} autoComplete="off"
                       placeholder={T.translate("user.input-phone-num")}/>
              </div>
              <div className="item password">
                <input {...FormUtil.extract(password)}
                       autoComplete="off"
                       type="password"
                       placeholder={T.translate("user.input-password")}/>
              </div>
              <div className="item">
                <LoadingButton type="submit" name="commit" label={T.translate("common.login")}
                               loadingLabel={T.translate("common.logining")}
                               style={styles.submit}/>
                <Link className="fl" to="/sign-up">{T.translate("user.sign-up")}</Link>
                <Link className="fr" to="/reset-password">{T.translate("user.forget")}</Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  }
}

