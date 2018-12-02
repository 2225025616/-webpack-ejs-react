import React, { Component } from "react";
import { reduxForm } from "redux-form";
import {modifyPassword} from "../../actions/userAction";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import ColumnInput from "../commons/ColumnInput";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import {verifySmsCode} from "../../actions/smsVerifyAction.es";
import {bindPhoneNumber, currentUser} from "../../actions/userAction.es";
import SmsType from "../../utils/SmsType.es";
import StorageUtil from "../../utils/StorageUtil.es";

const fields = ['phone', 'verifyCode', 'id'];
let editPhone = false;

const styles = {
  show: {
    display: "flex",
    alignItems: "center",
  },
  showEmail: {

  },
  hide: {
    display: "none",
  },
  id: {
    marginBottom: "6",
  },
};


const validate = values => {
  return new FormValidator(values)
    .verifyCode("verifyCode", T.translate("common.verify-code"))
    .phoneNumber("phone", T.translate("member.phone-number"))
    .nonEmpty("id", (StorageUtil.showOrganization() === 'false' ? "身份证号码" : "统一社会信用代码"))
    .errors;
};
@reduxForm({form: 'bindPhone', fields, validate}, state => {
    return {
      ...state.sms,
      userInfo: state.user.info,//账户信息

      onSubmit: (values, dispatch) => {
        dispatch(bindPhoneNumber(values.phone,values.verifyCode,values.id,
          () => {
            editPhone = !editPhone;
            dispatch(currentUser());
          }
        ));
      }
    }
  }
)

export default class SettingBindPhone extends Component {
  componentWillMount() {
  }

  handleOpenPhone = () => {
    editPhone = !editPhone;
    this.forceUpdate();
  };

  render() {
    const {fields: {phone, verifyCode, id}, handleSubmit, userInfo, remainTime, dispatch} = this.props,
    smsType = SmsType.BIND_PHONE;
    let isOrg = StorageUtil.showOrganization();

    return  <form onSubmit={handleSubmit}>
        <section className="mail">
          <span className="bind-name">{T.translate("setting.bind-phone")}</span>
          <div style={editPhone === false ? styles.show : styles.hide}>
            <p>{userInfo.phoneNumber}</p>
            <button className="submit" type="button" onClick={this.handleOpenPhone}>
              {T.translate("common.modify")}</button>
          </div>
          <div style={editPhone === true ? styles.showEmail : styles.hide}>
            <div style={styles.id}>
              <RowInput placeholder={isOrg === "false" ? "身份证号码" : "统一社会信用代码"} type="text" {...FormUtil.extract(id)} file={id} width="300"
                        height="30"/>
            </div>
            <RowInput placeholder={T.translate("user.phone-tip")} type="text" {...FormUtil.extract(phone)} file={phone} width="300"
                      height="30"/>
            <div className="sms">
              <ColumnInput placeholder={T.translate("common.verify-code")} type="text" {...FormUtil.extract(verifyCode)} file={verifyCode} width="150" height="30"/>
              <button type="button" disabled={remainTime[smsType] > 0 || !phone.value ? "disabled" : ""}
                      onClick={e => dispatch(verifySmsCode(phone.value, smsType))}>
                { remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
              </button>
            </div>
            <div className="phone-button-group">
              <button className="submit" type="submit">
                {T.translate("common.modify")}</button>
              <button className="cancel" type="button"
                      onClick={this.handleOpenPhone}>{T.translate("common.cancel")}</button>
            </div>
          </div>
        </section>
      </form>
  }
}
