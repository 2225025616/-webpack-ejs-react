import React, { Component } from "react";
import { reduxForm } from "redux-form";
import {modifyPassword} from "../../actions/userAction";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";

const fields = ['oldPassword', 'newPassword', 'reNewPassword'];

const validate = values => {
  return new FormValidator(values)
    .password("oldPassword", T.translate("setting.old-pwd"))
    .password("newPassword", T.translate("setting.new-pwd"))
    .rePassword("reNewPassword", "newPassword", T.translate("setting.new-pwd"))
    .errors;
};
@reduxForm({form: 'changePwd', fields, validate}, state => {
    return {
      userInfo: state.user.info,//账户信息

      onSubmit: (values, dispatch) => {
        var Buffer = require('buffer').Buffer;
        values.oldPassword = new Buffer(values.oldPassword).toString('base64');
        values.newPassword = new Buffer(values.newPassword).toString('base64');
        delete values.reNewPassword;
        dispatch(modifyPassword(values));
      }
    }
  }
)

export default class SettingChangePwd extends Component {
  componentWillMount() {
  }

  render() {
    const {fields: {oldPassword, newPassword, reNewPassword}, handleSubmit, userInfo} = this.props;

    return  <form onSubmit={handleSubmit}>
        <section>
          <span>{T.translate("setting.account")}</span>
          <p>{userInfo.phoneNumber}</p>
        </section>
        <section>
          <span>{T.translate("setting.old-pwd")}</span>
          <RowInput placeholder="" type="password" {...FormUtil.extract(oldPassword)} file={oldPassword}
                    width="300"
                    height="30"/>
        </section>
        <section>
          <span>{T.translate("setting.new-pwd")}</span>
          <RowInput placeholder="" type="password" {...FormUtil.extract(newPassword)} file={newPassword}
                    width="300"
                    height="30"/>
        </section>
        <section>
          <span>重复新密码</span>
          <RowInput placeholder="" type="password" {...FormUtil.extract(reNewPassword)} file={reNewPassword}
                    width="300"
                    height="30"/>
        </section>
        <button className="submit" type="submit">{T.translate("notarization.submit")}</button>
      </form>
  }
}
