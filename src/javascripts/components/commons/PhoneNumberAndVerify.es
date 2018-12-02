import React from "react";
import { connect } from "react-redux";
import { verifySmsCode } from "../../actions/smsVerifyAction";
import FormUtil from "../../utils/FormUtil";

import T from "i18n-react";

export default connect(
  state => ({...state.sms})
)(({remainTime, dispatch, purpose, field, hintText}) => {
  let input;
  let hint;

  if (hintText) {
    hint = hintText;
  } else {
    // hint = T.translate("common.phone-number");
    hint = "";
  }

  return <div>
    <div className="item vcode">
      <input {...FormUtil.extract(field)} ref={node => input = node} autoFocus="autofocus"
             placeholder={hint} className="tel"/>
      <a className="btn btn-vcode send-sms num-color" data-type="user"
         disabled={remainTime[purpose] > 0 ? "disabled" : ""}
         onTouchTap={e => dispatch(verifySmsCode(field.value, purpose))}>
        {remainTime[purpose] > 0 ? (`${remainTime[purpose]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
      </a>
    </div>
  </div>
    ;
})
