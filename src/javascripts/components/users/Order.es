import React, { Component } from "react";
import T from "i18n-react";
import Formatter from "../../lib/formatter";
import { getBalance } from "../../actions/userAction";
import { getSingleOrder, payOrder } from "../../actions/orderAction.es";
import { connect } from "react-redux";
import PayType from "../../utils/PayType.es";
import LanguageUtil from "../../utils/LanguageUtil.es";
import PaySmsModal from "../commons/PaySmsModal.es";
import { toastr } from "react-redux-toastr";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import BackMenu from "../commons/BackMenu";

@connect(state => ({
  user: state.user.info,
  balanceHolder: state.user.balanceHolder,
  location: state.router.location,
  id: state.router.params.id,
  order: state.order.order,
}))
export default class Order extends Component {
  state = {
    payType: PayType.balance,
    showPayModal: false,
    showSuccessModal: false,
    successTip: '',
  };

  componentWillMount() {
    const {dispatch, id} = this.props;
    dispatch(getSingleOrder(id, order => {
      dispatch(getBalance(balance => {
        if (balance.balance < order.amount) this.setState({payType: PayType.aliPay});
      }));
    }));
  }

  changeType = (payType) => {
    return e => this.setState({payType})
  };

  payModal = showPayModal => () => this.setState({showPayModal});

  toPay = () => {
    const {dispatch, order, id} = this.props, {payType} = this.state;
    if (payType === PayType.aliPay) {
      window.open(`/order/${id}/pay?lang=${LanguageUtil.lang}`);
      this.successModal(true, '正在使用支付宝支付，支付完成前请不要关闭窗口')();
    }
    else this.payModal(true)();
  };

  successModal = (showSuccessModal, successTip) => () => this.setState({showSuccessModal, successTip});

  pay = smsField => {
    const {dispatch, order} = this.props, {payType} = this.state;
    if (payType === PayType.balance) dispatch(payOrder(order.id, {smsVerifyCode: smsField.value}, () => {
      this.payModal(false)();
      this.successModal(true, '您已支付成功！')();
      dispatch(getSingleOrder(order.id))
    }));
    else toastr.error('Do not chose balance to pay!')
  };

  productType = (type) => {
    if (type === "ATTESTATION" || type === "NOTARY" || type === "URLATTESTATION") {
      return T.translate("common.attestations");
    } else if (type === "ECONTRACT") {
      return T.translate("common.signature");
    } else if (type === "OTHER") {
      return T.translate("notification.other");
    }
  };

  convertName = (type) => {
    if (type === "ATTESTATION" || type === "NOTARY" || type === "URLATTESTATION") {
      return '出证';
    } else if (type === "ECONTRACT") {
      return T.translate("common.signature");
    } else if (type === "OTHER") {
      return T.translate("notification.other");
    }
  };

  render() {
    const {balanceHolder, id, order} = this.props, enough = balanceHolder.balance > order.amount;
    let fmt = Formatter.get("0.00"), fmt1 = Formatter.get('yyyy-mm-dd hh:MM'),
      paid = order.tradeStatus === 'TRADE_SUCCESS';

    return <div className="container-wrapper">
      <div className="container">
        <BackMenu title={id ? T.translate("common.pay-for") : T.translate("common.recharge")}/>
        <div className="ctn">
        <div className="pay">
          <section className='info-wrap' key={1}>
            <h2>
              <img src={require('../../../images/success.png')} alt=""/>
              {paid ? '您的订单已支付' : '您的订单已提交成功，现在只差最后一步啦！'}
            </h2>
            <div className='info'>
              <p className="item"><span className='name'>所属产品：</span>
                <span className='value'>{this.productType(order.refType)}</span></p>
              <p className='item'><span className='name'>订单详情：</span>
                <span className='value'>{order.description}</span></p>
              <p className='item'><span className='name'>订单编号：</span>
                <span className='value'>{order.id}</span></p>
              <p className='item'><span className='name'>下单时间：</span>
                <span className='value'>{fmt1.format(order.createdDate)}</span></p>
            </div>
          </section>
          <section className='section' style={{margin: '40px 0'}} key={2}>
            <span className="name">{paid ? '已付金额' : '应付金额'}：</span>
            <p>
              <span className="balance">￥{fmt.format(order.amount || 0.00)}</span>
              <span className="unit">{T.translate("common.rmb")}</span>
              {
                paid ? ''
                  : <span className='balance-tip'>
                    （可用账户余额
                    <span style={{color: '#ff5f69', padding: '0 5px'}}>
                      ￥{fmt.format(balanceHolder.balance) || 0.00}</span>
                    {T.translate("common.rmb")}）
                  </span>
              }
            </p>
          </section>
          {
            paid ? ''
              : [
                <section className='section' key={1}>
                  <span className="name">{T.translate("pay.pay-type")}：</span>
                  <div className={this.state.payType === PayType.balance ? "pay-type active" : "pay-type"}
                       onClick={!enough ? '' : this.changeType(PayType.balance)} disabled={!enough}>
                    <img src={require('../../../images/balance-pay.png')} alt=""/>
                  </div>
                  <div className={this.state.payType === PayType.aliPay ? "pay-type active" : "pay-type"}
                       onClick={this.changeType(PayType.aliPay)}>
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
                </section>,
                <button className="blueButton" onClick={this.toPay} key={2}>{T.translate("common.pay-for")}</button>
              ]
          }
        </div>
        </div>
        {
          this.state.showPayModal ?
            <PaySmsModal payFor={this.convertName(order.refType) + '套餐费用'} amount={order.amount}
                         closeFn={this.payModal(false)}
                         confirmPayFn={this.pay} refType={order.refType}/>
            : ''
        }

        {
          this.state.showSuccessModal ?
            <ModalContainer onClose={this.successModal(false)}>
              <ModalDialog onClose={this.successModal(false)} width={665} className="example-dialog"
                           dismissOnBackgroundClick={true}>
                <form className="confirm">
                  <p>{this.state.successTip}</p>
                  <div className="button-group">
                    <button type="button" className="yes"
                            onClick={() => window.history.back()}>{this.state.payType === PayType.aliPay ? '我已付款成功' : '返回'}</button>
                    {
                      this.state.payType === PayType.aliPay ?
                        <button type="button" className="no" onClick={this.successModal(false)}>支付遇到问题，重新支付</button>
                        : ''
                    }
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
