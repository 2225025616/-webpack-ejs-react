import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Header from "../common/Header";
import FormValidator from "../../../utils/FormValidator";
import { getBalance, payFromAli } from "../../../actions/userAction";
import Back from "../common/Back";
import { isWeiXin } from "../../../utils/UserAngent";
import PayModal from "../common/PayModal.es";
import LanguageUtil from "../../../utils/LanguageUtil.es";

const fields = ["money"];

const validate = values => {
  return new FormValidator(values)
    .money("money", '金额', false)
    .errors;
};

// let timer = null;

@reduxForm({form: "Recharge", fields, validate}, state => {
  return {
    user: state.user.info,
    balanceHolder: state.user.balanceHolder,

    onSubmit: (values, dispatch) => {
      dispatch(payFromAli({
        amount: values.money,
        type: "mobile",
        url: `/mobile/balance?lang=${LanguageUtil.lang}`,
      }, () => {
        // timer = setInterval(() => dispatch(getSingleOrder(tradeId, tradeInfo => {
        //   if (tradeInfo.tradeStatus === 'TRADE_SUCCESS') {
        //     clearInterval(timer);
        //     dispatch(getBalance());
        //     toastr.info(`${values.money}元充值成功`);
        //   }
        // })), 2000);
      }));
    }
  }
})
export default class Recharge extends Component {
  data = {
    title: '充值'
  };

  isWeiXin = false;

  componentWillMount = () => {
    this.props.dispatch(getBalance());
    this.isWeiXin = isWeiXin();
  };

  render() {
    const {fields: {money}, user, handleSubmit, invalid, balanceHolder} = this.props;

    return <div className="user-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      {!this.isWeiXin ?
        <form className="common-container" onSubmit={handleSubmit}>
          <div className="sub-nav items-recharge">
            <section className="item">当前余额
              <span className='red-font'>￥{balanceHolder.balance}</span>
            </section>
          </div>

          <div className="sub-nav items-recharge">
            <section className="item">金额 (元)
              <input className="left" placeholder="请输入充值金额" type="text" {...money}/>
            </section>
          </div>

          <PayModal showBalance={false} payType='alipay'/>

          <div style={{margin: '0 1.5rem'}}>
            <button type='submit' className={`action ${invalid || !money.value ? 'btn-disabled' : ''}`}
                    disabled={invalid || !money.value}>立即充值
            </button>
          </div>
        </form>
        :
        <p style={{fontSize: '1.6rem', padding: '2rem 1.5rem', textAlign: 'center', color: '#999', lineHeight: '3rem'}}>
          暂不支持微信支付
          <br/>
          请用<span style={{color: '#333', padding: '0 0.4rem'}}>浏览器</span>打开使用支付宝充值
        </p>
      }
    </div>
  }
}