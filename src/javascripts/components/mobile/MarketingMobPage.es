import React, { Component } from "react";
import T from "i18n-react";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import { getGraphicCode, sendUserConsult } from "../../actions/adminAction";
import ColumnInput from "../commons/ColumnInput";
import ColumnTextarea from "../commons/ColumnTextarea.es";

const styles = {
  smsInput: {
    position: "relative",
  },
  smsBtn: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  smsImage: {
    width: "10rem",
    height: "3.4rem",
  }
}

export const fields = ['name', 'phone', 'verifyCode', 'email', 'company'];
const validate = values => {
  return new FormValidator(values)
    .name('name', '姓名')
    .phone('phone', T.translate("common.phone-number"))
    .captcha("verifyCode", "4位数验证码")
    .nonEmpty("email", "咨询标题")
    .nonEmpty("company", "咨询内容")
    .errors;
};

@reduxForm({form: "send-conult", fields, validate},
  state => {
    return {
      imageCode: state.admin.imageCode,
      initialValues: {name: "", phone: "", verifyCode: '', email: '', company: ''},
      onSubmit: (values, dispatch) => {
        dispatch(sendUserConsult(values.phone, values.name, values.verifyCode, values.email, values.company));
      }
    }
  })

export default class MarketingMobPage extends Component {

  componentDidMount = () => {
    this.handleGetGraphicCode();
  }

  componentWillMount = () => {
    if (typeof window !== 'undefined') document.title = '保全网-保全存证永久免费';
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  }

  render() {
    let {fields: {name, phone, verifyCode, email, company}, imageCode, handleSubmit} = this.props;

    return <div className="market-form-mob">
      <a href="/mobile">
        <img
          src={require("../../../images/logo-market.png")}/>
      </a>
      <form className="inputs" onSubmit={this.props.handleSubmit}>
        <ColumnInput placeholder="姓名（必填）" type="text" {...FormUtil.extract(name)} file={name}/>
        <ColumnInput placeholder="电话（必填）" type="text" {...FormUtil.extract(phone)} file={phone}/>
        <div style={styles.smsInput}>
          <ColumnInput placeholder="请输入验证码" type="text" {...FormUtil.extract(verifyCode)} file={verifyCode}/>
          <p style={styles.smsBtn} onClick={this.handleGetGraphicCode}>
            <img style={styles.smsImage} src={"data:image/png;base64," + imageCode}/>
          </p>
        </div>
        <ColumnInput placeholder="咨询标题（必填）" type="text" {...FormUtil.extract(email)} file={email} maxLength="500"/>
        <ColumnTextarea placeholder="咨询内容（必填）" {...FormUtil.extract(company)} file={company} maxLength="1000"/>
        <button type="submit">提交</button>
      </form>
      <footer>浙江数秦科技有限公司</footer>
    </div>
  }
}
