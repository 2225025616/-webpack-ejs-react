import React, { Component } from "react";
import T from "i18n-react";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import { getGraphicCode, sendUserConsult } from "../../actions/adminAction";
import ColumnInput from "../commons/ColumnInput";
import ColumnTextarea from "../commons/ColumnTextarea";

const styles = {
  smsInput: {
    position: "relative",
  },
  smsBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 40,
  }
};

export const fields = ['name', 'phone', 'verifyCode', 'email', 'company'];
const validate = values => {
  return new FormValidator(values)
    .name('name', T.translate("member.name"))
    .phone('phone', T.translate("common.phone-number"))
    .imageCode("verifyCode", T.translate("user.pic-verify-code"))
    .nonEmpty("email", "咨询标题")
    .nonEmpty("company", "咨询内容")
    .errors;
};

@reduxForm({form: "send-conult", fields, validate},
  state => {
    return {
      imageCode: state.admin.imageCode,
      initialValues: {name: "", phone: "", verifyCode: '', email: '', company: ''},
      location: state.router.location,
      onSubmit: (values, dispatch) => {
        dispatch(sendUserConsult(values.phone, values.name, values.verifyCode, values.email, values.company));
      }
    }
  })
export default class AddConsult extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount = () => {
  };

  componentWillReceiveProps = (next) => {
  };

  componentDidMount = () => {
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  render() {
    let {fields: {name, phone, verifyCode, email, company}, hide, imageCode, handleSubmit} = this.props;

    return <div className="email-form">
      <header className="header">{T.translate('marketing.form')}
        <span className="btn-close" onClick={hide}/>
      </header>
      <form className="inputs" onSubmit={this.props.handleSubmit}>
        <ColumnInput placeholder={T.translate('marketing.name')} type="text" {...FormUtil.extract(name)} file={name}/>
        <ColumnInput placeholder={T.translate('marketing.phone')} type="text" {...FormUtil.extract(phone)}
                     file={phone}/>
        <div style={styles.smsInput}>
          <ColumnInput placeholder={T.translate('marketing.verify-code')} type="text" {...FormUtil.extract(verifyCode)}
                       file={verifyCode}/>
          <p style={styles.smsBtn} onClick={this.handleGetGraphicCode}>
            <img src={"data:image/png;base64," + imageCode}/>
          </p>
        </div>
        <ColumnInput placeholder="咨询标题（必填）" type="text" {...FormUtil.extract(email)} file={email} maxLength="500"/>
        <ColumnTextarea placeholder="咨询内容（必填）" {...FormUtil.extract(company)} file={company} maxLength="1000"/>
        <button type="submit">{T.translate('marketing.btn')}</button>
      </form>
    </div>;
  }
}
