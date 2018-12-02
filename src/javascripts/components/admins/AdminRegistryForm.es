import React from "react";
import PhoneNumberAndVerify from "../commons/PhoneNumberAndVerify";
import { reduxForm } from "redux-form";
import { signUp } from "../../actions/userAction";
import Link from "../commons/LangLink";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import LoadingButton from "../commons/LoadingButton";
import T from "i18n-react";
import DeviceUtil from "../../utils/DeviceUtil";
import SmsType from "../../utils/SmsType.es";

const styles = {
  label: {
    marginTop: 15,
    width: "100%"
  }
};

export const fields = ['phoneNumber', 'password', 'verifyCode', 'accepted'];

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("verifyCode", T.translate("common.verify-code"))
    .password("password", T.translate("common.password"))
    .phoneNumber("phoneNumber", T.translate("common.phone-number"))
    .mustEqual("accepted", true, T.translate("user.accept"))
    .errors
};

export default reduxForm({
    form: 'register',
    fields,
    validate
  }, () => {
    return {
      initialValues: {accepted: true},
      onSubmit: (values, dispatch) => {
        dispatch(signUp(values));
      }
    }
  }
)(({fields: {phoneNumber, password, verifyCode, accepted}, handleSubmit}) => {
    return <div className="login-warp">
      <div className="login-content">
        {DeviceUtil.isDesktop() ?
          <div>
            <div className="login-person">
              <img
                src={require("images/users/login-person.png")}/>
            </div>
            <div className="login-square"/>
          </div> :
          <div>
            <img className="logo"
                 src={require("images/users/logo.png")}/>
            <img className="register-bg"
                 src={require("images/users/register-bg.png")}/>
          </div>}
        <div className="registrations new">
          <section id="signup-user" className="obox-content">
            <h3 className="reset-pass">{T.translate("user.registe")}</h3>
            <form className="new_user"
                  autoComplete="off"
                  onSubmit={handleSubmit}>
              <PhoneNumberAndVerify purpose={SmsType.Register} field={phoneNumber}/>
              <div className="item reset-num">
                <input {...FormUtil.extract(verifyCode)} className="verify-code"
                       placeholder={T.translate("common.input-verify-code")}/>
              </div>
              <div className="item reset-password">
                <input {...FormUtil.extract(password)} type="password" className="password"
                       placeholder={T.translate("user.input-password")}/>

              </div>
              <div className="item read">
                <input name="user[accept_term]" type="hidden" value="0"/>
                <input type="checkbox" name="accept_term" id="user_accept_term"
                       className="checkbox" {...FormUtil.extract(accepted)}/>
                {DeviceUtil.isDesktop() ?
                  <label htmlFor="user_accept_term">{T.translate("user.read")}<a
                    href="/tos">{T.translate("user.tos")}</a></label>
                  :
                  <label htmlFor="user_accept_term">{T.translate("user.read-h5")}<a
                    href="/tos">{T.translate("user.tos")}</a></label>
                }
                {DeviceUtil.isDesktop() ?
                  <Link className="frr" to="/sign-in">{T.translate("user.sign-in")}</Link> : ""}
              </div>
              <div className="item">
                <LoadingButton type="submit" name="commit" label={T.translate("common.sign-up")}
                               loadingLabel={T.translate("common.signing-up")} style={styles.label}/>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  }
) ;
