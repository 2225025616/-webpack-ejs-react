import React, { Component } from "react";
import { connect } from "react-redux";
import { getBalance } from "../../actions/userAction";
import T from "i18n-react";
import Formatter from "../../lib/formatter";

@connect(state => {
  return {
    query: state.router.location.query,
    balanceHolder: state.user.balanceHolder,
  }
})

export default class PayResult extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(getBalance());
  };

  render() {
    let {query, balanceHolder} = this.props;
    let fmt = Formatter.get("0.00");
    return <div className="container-wrapper">
      <div className="container">
        <div className="pay-result">
          <h2>{T.translate("pay.recharge-success")}</h2>
          <div className="pay-item">
            <p><span>{T.translate("pay.recharge-money")}:</span>{query.total_fee || query.total_amount}</p>
            <p><span>{T.translate("pay.recharge-time")}:</span>{query.notify_time || query.timestamp}</p>
            <p><span>{T.translate("pay.order-number")}:</span>{query.trade_no}</p>
            <p>
              <span>{T.translate("common.balance")}:</span>{fmt.format(balanceHolder.balance)}{T.translate("common.rmb")}
            </p>
          </div>
        </div>
      </div>
    </div>
  }
}