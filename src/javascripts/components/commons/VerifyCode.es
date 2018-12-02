import React from "react";
import { connect } from "react-redux";
import { verifySmsCode } from "../../actions/smsVerifyAction";

import T from "i18n-react";

export default connect(
  state => ({...state.sms})
)(({remainTime, dispatch, purpose, field, hintText, floatingLabelText}) => {
  let input;
  let hint;
  let floatingLabel;

  if (hintText) {
    hint = hintText;
  } else {
    hint = T.translate("common.phone-number");
  }

  if (floatingLabelText) {
    floatingLabel = floatingLabelText;
  } else {
    floatingLabel = T.translate("user.input-phone-num");
  }

  return <div>
    <div className="item vcode">
      <a className="btn btn-vcode send-sms num-color" data-type="user"
         disabled={remainTime > 0 ? "disabled" : ""}
         onTouchTap={ e => dispatch(verifySmsCode(field.value, purpose)) }>{ remainTime > 0 ? (`${remainTime}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}</a>
    </div>
  </div>
    ;
})
