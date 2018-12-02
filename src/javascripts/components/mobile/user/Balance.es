import React, { Component } from "react";
import Header from "../common/Header";
import Link from "../../commons/LangLink";
import NavMenu from "../common/NavMenu";
import Formatter from "../../../lib/formatter";
import { connect } from "react-redux";
import { getBalance } from "../../../actions/userAction";

@connect(state => ({balance: state.user.balanceHolder}))
export default class Balance extends Component {
  data = {
    title: '账户余额'
  };

  componentWillMount = () => {
    this.props.dispatch(getBalance());
  };

  render() {
    const fmt = Formatter.get("0.00"), {balance} = this.props;

    return <div className="user-common">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="banner banner-balance">
        <h2>{fmt.format(balance.balance)}</h2>
        <span>账户余额 (元)</span>
      </div>
      <div className="common-container" style={{minHeight: 'calc(100vh - 22.2rem)', background: '#fff'}}>
        {/*<div className="balance-items-wrap">
         <section className="balance-item">
         <h3>本周消费金额 (元)</h3>
         <span>1280.00</span>
         </section>
         <section className="balance-item">
         <h3>本周充值金额 (元)</h3>
         <span>1280.00</span>
         </section>
         <section className="balance-item">
         <h3>累计消费金额 (元)</h3>
         <span>1280.00</span>
         </section>
         <section className="balance-item">
         <h3>累计充值金额 (元)</h3>
         <span>1280.00</span>
         </section>
         </div>*/}
        <Link to="/mobile/recharge" className="btn">充值</Link>
      </div>
    </div>
  }
}