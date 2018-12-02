import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { deleteOrder, getSingleOrder, payOrder } from "../../../actions/orderAction";
import Formatter from "../../../lib/formatter";
import T from "i18n-react";
import push from "../../../utils/push";
import FloatModal from "../common/FloatModal.es";
import { getBalance, payFromAli } from "../../../actions/userAction.es";
import PayModal from "../common/PayModal.es";
import LanguageUtil from "../../../utils/LanguageUtil.es";
import FormValidator from "../../../utils/FormValidator.es";
import { reduxForm } from "redux-form";
import FormUtil from "../../../utils/FormUtil.es";
import { verifySmsCode } from "../../../actions/smsVerifyAction.es";
import SmsType from "../../../utils/SmsType.es";
import Link from "../../commons/LangLink";

export const fields = ['smsVerifyCode'];

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("smsVerifyCode", T.translate("common.verify-code"))
    .errors
};
@reduxForm({form: 'pay-sms', fields, validate}, state => ({
    ...state.sms,
    order: state.order.order,
    balanceHolder: state.user.balanceHolder,
    location: state.router.location,
    id: state.router.params.id,
    user: state.user.info
  }
))
export default class Order extends Component {
  constructor(props) {
    super(props);
  }

  data = {
    title: '订单详情',
    tab: [
      {name: "全部", status: ''},
      {name: "等待支付", status: 'WAIT_BUYER_PAY'},
      {name: "已支付", status: 'TRADE_SUCCESS', icon: "font-right"}
    ]
  };

  payType = 'balance';
  timer = null;
  smsType = '';

  state = {
    showPayModal: false,
    showCancelModal: false,
    tradeStatus: '',
    currentOrder: '',
    shouldRefresh: false,
  };

  productType = (item) => {
    if (item === "ATTESTATION" || item === "NOTARY" || item === "URLATTESTATION") {
      return T.translate("common.attestations");
    } else if (item === "ECONTRACT") {
      return T.translate("common.signature");
    } else if (item === "OTHER") {
      return T.translate("notification.other");
    }
  };

  componentDidMount = () => {
    const {dispatch, id, order} = this.props;
    dispatch(getBalance(balance => {
      if (id) dispatch(getSingleOrder(id, () => {
        let {order} = this.props;
        if (order.amount > balance.balance) this.payType = 'alipay';
        this.setState({tradeStatus: order.tradeStatus});
      }))
    }));
    this.smsType = this.getSmsType(order.refType);
    if (location.pathname.indexOf('paid')) this.setState({shouldRefresh: true})
  };

  doQuery = (props) => {
    let id = this.props.params['id'];
    this.props.dispatch(getSingleOrder(id, () => {
      let {order} = this.props;
      this.setState({tradeStatus: order.tradeStatus});
    }));
  };

  toPay = (order) => {
    const {location, dispatch, balanceHolder} = this.props;
    if (this.payType === 'balance') {
      if (balanceHolder.balance < order.amount) {
        return this.rechargeModal(true)();
      }
      return this.openPayModal(order);
    }
    else dispatch(payFromAli({
      type: "mobile",
      id: order.id,
      url: location.pathname + '/paid' + location.search
    }, () => {
      /*this.timer = setInterval(() => dispatch(getSingleOrder(tradeId, tradeInfo => {
        if (tradeInfo.tradeStatus === 'TRADE_SUCCESS') {
          clearInterval(this.timer);
          this.setState({tradeStatus: "TRADE_SUCCESS"});
          toastr.info(`订单支付成功`);
        }
      })), 2000);*/
    }));
  };

  handlePayOrder = (id) => {
    const {fields: {smsVerifyCode}, dispatch} = this.props;
    dispatch(payOrder(id, {smsVerifyCode: smsVerifyCode.value}, () => {
      this.setState({tradeStatus: "TRADE_SUCCESS"});
      this.closeModal();
    }));
  };

  openPayModal = (currentOrder) => {
    this.setState({showPayModal: true, currentOrder});
  };

  openCancelModal = (currentOrder) => {
    this.setState({showCancelModal: true, currentOrder});
  };

  rechargeModal = showRechargeModal => {
    return () => this.setState({showRechargeModal});
  };

  closeModal = () => {
    this.setState({showPayModal: false, showCancelModal: false});
  };

  goRecharge = () => {
    const {dispatch} = this.props;
    dispatch(push(`/mobile/recharge?lang=${LanguageUtil.lang}`));
  };

  handleDeleteOrder = (id) => {
    this.props.dispatch(deleteOrder(id, () => {
      this.closeModal();
      this.props.dispatch(push('/mobile/order-list'));
    }));
  };

  getSmsType = (type) => {
    if (type === 'NOTARY') return SmsType.Pay_NOTARY;
    else if (type === 'ECONTRACT') return SmsType.Pay_ECONTRACT;
    else if (type === 'URLATTESTATION') return SmsType.Pay_URLATTESTATION;
  };

  render() {
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let {order, balanceHolder, user, dispatch, remainTime, fields: {smsVerifyCode}, invalid, pristine} = this.props;

    return <div className="order">
      <Header>
        {this.state.shouldRefresh ? <Link className="back" to='/mobile/order-list'/> : <Back/>}
        <span className="title">{this.data.title}</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      <header>
        <div className="left">
          <span className={this.state.tradeStatus === "WAIT_BUYER_PAY" ? "icon icon-wait"
            : this.state.tradeStatus === "TRADE_SUCCESS" ? "icon icon-paid" : 'icon icon-cancel'}/>
          <span>{this.state.tradeStatus === "WAIT_BUYER_PAY" ? '等待支付'
            : this.state.tradeStatus === "TRADE_SUCCESS" ? "已支付" : '已取消'}</span>
        </div>
        <div className="right">
          {this.state.tradeStatus === "WAIT_BUYER_PAY" ? <span>需支付:￥{order['amount']}</span> : null}
        </div>
      </header>
      <article>
        <div className="sub-item">
          <p className="item">所属产品<span>{this.productType(order.refType)}</span></p>
          <p className="item">订单详情<span>{order.description}</span></p>
          <p className="item">订单编号<span>{order['id']}</span></p>
          <p className="item">下单时间<span>{fmt.format(order['createdDate'])}</span></p>
        </div>
        <div className="sub-item">
          <p className="item">{this.state.tradeStatus === 'WAIT_BUYER_PAY' ? '应付金额' : '实付金额'}
            <span className="all-money">￥{order['amount']}</span></p>
        </div>
        <div className="bottom-btn">
          {
            this.state.tradeStatus === "WAIT_BUYER_PAY" ? [
              <button className="btn" key='1'
                      onClick={e => this.openCancelModal(order)}>{T.translate("order.cancel")}</button>,
              <button className="btn red" key='2'
                      onClick={e => this.toPay(order)}>{T.translate("order.to-pay")}</button>
            ] : ''
          }
        </div>
        {
          this.state.tradeStatus === 'WAIT_BUYER_PAY' ?
            <PayModal selectFn={type => this.payType = type} balance={balanceHolder.balance} amount={order.amount}
                      payType={this.payType}/>
            : ''
        }
        <FloatModal show={this.state.showPayModal}
                    confirmFn={() => this.handlePayOrder(this.state.currentOrder.id)}
                    closeFn={this.closeModal} confirmDisabled={invalid || pristine}>
          <div className="code">
            <span className="tip">确认使用余额支付 ￥{this.state.currentOrder.amount}？</span>
            <div className="input-wrap">
              <input type="number" {...FormUtil.extract(smsVerifyCode)} placeholder={'请输入验证码'}/>
              <button className="signature-code" disabled={remainTime[this.smsType] > 0 ? "disabled" : ""}
                      onClick={e => dispatch(verifySmsCode(user.phoneNumber, this.smsType))}>
                {remainTime[this.smsType] > 0 ? (`${remainTime[this.smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
              </button>
            </div>
          </div>
        </FloatModal>
        <FloatModal show={this.state.showCancelModal}
                    confirmFn={() => this.handleDeleteOrder(this.state.currentOrder.id)}
                    closeFn={this.closeModal} closeText='暂不取消'>
          <p className='cancel-pay'>确认取消订单？</p>
        </FloatModal>
        <FloatModal show={this.state.showRechargeModal} confirmFn={this.goRecharge} closeFn={this.rechargeModal(false)}
                    confirmText='去充值'>
          <p className='cancel-pay'>余额不足，请先充值！</p>
        </FloatModal>
      </article>
    </div>
  }
}