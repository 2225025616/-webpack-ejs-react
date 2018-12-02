import React, { Component } from "react";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import ColumnInput from "./ColumnInput.es";
import FormUtil from "../../utils/FormUtil.es";
import { verifySmsCode } from "../../actions/smsVerifyAction.es";
import { stopBubbleAndDefault } from "../../utils/eventPrevent.es";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator.es";
import SmsType from "../../utils/SmsType.es";

const fields = ['smsVerifyCode'],
  validate = values => {
    return new FormValidator(values)
      .verifyCode("smsVerifyCode", T.translate("common.verify-code"))
      .errors;
  };

@reduxForm(
  {form: 'balance-pay', fields, validate},
  state => ({
    ...state.sms,
    user: state.user.info,
  })
)
export default class PaySmsModal extends Component {

  smsType = '';

  componentWillMount = () => {
    this.smsType=this.getSmsType(this.props.refType);
  };

  pay = e => {
    stopBubbleAndDefault(e);
    const {confirmPayFn, fields: {smsVerifyCode}} = this.props;
    if (typeof confirmPayFn === 'function') confirmPayFn(smsVerifyCode);
    else console.error('confirmPayFn is not a function');
  };

  getSmsType = (type) => {
    if (type === 'NOTARY') return SmsType.Pay_NOTARY;
    else if (type === 'ECONTRACT') return SmsType.Pay_ECONTRACT;
    else if (type === 'URLATTESTATION') return SmsType.Pay_URLATTESTATION;
  };

  render() {
    const {fields: {smsVerifyCode}, payFor, amount, closeFn, remainTime, dispatch, user, invalid, pristine} = this.props;

    return <ModalContainer onClose={closeFn}>
      <ModalDialog onClose={closeFn} width={665} className="example-dialog" dismissOnBackgroundClick={true}>
        <h1>{T.translate('order.yes')}{payFor}</h1>
        <article>
          <section>
            <span>{payFor}</span>
            <div>
              <span className="warn">￥{amount}</span>
              <button className="signature-code" disabled={remainTime[this.smsType] > 0}
                      onClick={e => dispatch(verifySmsCode(user.phoneNumber, this.smsType))}>
                {remainTime[this.smsType] > 0 ? (`${remainTime[this.smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
              </button>
            </div>
          </section>
          <section>
            <span>{T.translate("common.verify-code")}</span>
            <ColumnInput placeholder="" type="text" {...FormUtil.extract(smsVerifyCode)}
                         file={smsVerifyCode}/>
          </section>
          <section className="button-group">
            <span/>
            <button className="yes" onClick={this.pay}
                    disabled={invalid || pristine}>{T.translate("order.yes")}</button>
            <button className="no" onClick={closeFn}>{T.translate("common.cancel")}</button>
          </section>
        </article>
      </ModalDialog>
    </ModalContainer>
  }
}