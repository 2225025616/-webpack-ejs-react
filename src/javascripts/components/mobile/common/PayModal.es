import React, { Component } from "react";
import { connect } from "react-redux";
import { isWeiXin } from "../../../utils/UserAngent";

@connect(state => ({
  user: Object.assign({}, state.user.info, state.user.kycs),
  message: state.notification.unread
}))
export default class PayModal extends Component {

  isWeiXin = 0;

  state = {
    payType: this.props.payType || 'balance'
  };

  componentWillMount = () => {
    this.isWeiXin = isWeiXin();
  };

  select = (payType) => {
    return () => {
      const {selectFn} = this.props;
      if (selectFn) selectFn(payType);
      this.setState({payType});
    }
  };

  render() {
    const {showBalance, balance, amount} = this.props, enough = balance > amount;

    return <div className="pay-modal-common">
      <h2>选择支付方式</h2>
      {/*{
          this.isWeiXin ?
            <section className="item" style={{height: '6rem'}}>
              <img src={require('../../../../images/mobile/user/logo-wechatPay.png')} className="pay-logo" alt=""/>
              <div className="text">
                <h3>微信支付</h3>
                <p className="tips">当前为微信访问，仅支持微信支付</p>
              </div>
            </section>
            : <section className="item" style={{height: '6rem'}}>
              <img src={require('../../../../images/mobile/user/logo-alipay.png')} className="pay-logo" alt=""/>
              <div className="text">
                <h3>支付宝</h3>
                <p className="tips">当前为浏览器访问，仅支持支付宝支付</p>
              </div>
            </section>
        }*/}
      <div className='sub-items'>
        {
          showBalance !== false ?
            <section className="item" style={{height: '6rem'}} onClick={!enough ? '' : this.select('balance')}
                     disabled={!enough}>
              <img src={require('../../../../images/mobile/user/pay-balance.png')} className="pay-logo" alt=""/>
              <div className="text">
                <h3>余额支付</h3>
                <p className={balance && enough ? 'tips' : 'tips red-font'}>可用余额
                  {balance && enough ?
                    <span className='red-font'>&nbsp;￥{balance}</span> : `不足（￥${balance}）`}</p>
              </div>
              <span className={this.state.payType === 'balance' ? 'pay-type selected' : 'pay-type'}/>
            </section>
            : ''
        }
        {
          !this.isWeiXin ?
            <section className="item" style={{height: '6rem'}} onClick={this.select('alipay')}>
              <img src={require('../../../../images/mobile/user/logo-alipay.png')} className="pay-logo" alt=""/>
              <div className="text">
                <h3>支付宝</h3>
                <p className="tips">{showBalance !== false ? '支付宝支付' : '当前为浏览器访问，仅支持支付宝支付'}</p>
              </div>
              <span className={this.state.payType === 'alipay' ? 'pay-type selected' : 'pay-type'}/>
            </section>
            : ''
        }
      </div>
    </div>
  }
}