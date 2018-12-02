import React, { Component } from "react";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import Formatter from "../../lib/formatter";
import { getBalance } from "../../actions/userAction";
import ColumnInput from "../commons/ColumnInput";
import { stopBubbleAndDefault } from "../../utils/eventPrevent.es";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import LanguageUtil from "../../utils/LanguageUtil.es";
import BackMenu from "../commons/BackMenu";

const fields = ["money"];

const validate = values => {
  return new FormValidator(values)
    .payMoney("money", T.translate("pay.amount"), false)
    .errors;
};

@reduxForm({form: "pay", fields, validate}, state => {
  return {
    user: state.user.info,
    balanceHolder: state.user.balanceHolder,
    location: state.router.location,
  }
})

export default class Pay extends Component {
  componentDidMount() {
    this.props.dispatch(getBalance());
  }

  state = {
    showSuccessModal: false,
    successTip: '',
  };

  pay = e => {
    stopBubbleAndDefault(e);
    const {dispatch, fields: {money}} = this.props;
    window.open(`/recharge/pay?amount=${money.value}&lang=${LanguageUtil.lang}`);
    this.successModal(true, '正在使用支付宝支付，支付完成前请不要关闭窗口')();
  };

  successModal = (showSuccessModal, successTip) => () => this.setState({showSuccessModal, successTip});

  render() {
    const {fields: {money}, balanceHolder} = this.props;
    let fmt = Formatter.get("0.00");

    return <div className="container-wrapper">
      <div className="container">
        <BackMenu title={T.translate("common.recharge")}/>
        <div className="ctn">
        <form className="pay" onSubmit={this.pay}>
          <section className='section'>
            <span className="name">{T.translate("user.balance")}：</span>
            <p>
              <span className="balance">￥{fmt.format(balanceHolder.balance) || 0.00}</span>
              <span className="unit">{T.translate("common.rmb")}</span>
            </p>
          </section>
          <section className='section'>
            <span className="name">{T.translate("pay.recharge-money")}：</span>
            <ColumnInput placeholder="" type="text" {...FormUtil.extract(money)} file={money}/>
            <span className="unit">{T.translate("common.rmb")}</span>
          </section>
          <section className='section'>
            <span className="name">{T.translate("pay.pay-type")}：</span>
            <div className={"pay-type active"}>
              <img src={require('../../../images/ali-pay.png')} alt=""/>
            </div>
            {/*<div className={this.state.payType === 'WeChat' ? "pay-type active" : "pay-type"}
                 onClick={this.changeType('WeChat')}>
              <img src={require('../../../images/we-chat-pay.png')} alt=""/>
            </div>
            <div className={this.state.payType === 'unionPay' ? "pay-type active" : "pay-type"}
                 onClick={this.changeType('unionPay')}>
              <img src={require('../../../images/union-pay.png')} alt=""/>
            </div>*/}
          </section>
          <button className="blueButton" type='submit' onClick={this.pay} disabled={!money.valid || !money.value}>{T.translate("common.pay-for")}</button>
        </form>
        </div>
        {
          this.state.showSuccessModal ?
            <ModalContainer onClose={this.successModal(false)}>
              <ModalDialog onClose={this.successModal(false)} width={665} className="example-dialog"
                           dismissOnBackgroundClick={true}>
                <form className="confirm">
                  <p>{this.state.successTip}</p>
                  <div className="button-group">
                    <button type="button" className="yes" onClick={() => window.history.back()}>我已充值成功</button>
                    <button type="button" className="no" onClick={this.successModal(false)}>支付遇到问题，重新充值</button>
                  </div>
                </form>
              </ModalDialog>
            </ModalContainer>
            : ''
        }
      </div>
    </div>
  }
}
