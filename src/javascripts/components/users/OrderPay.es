import React, { Component } from "react";
import { connect } from "react-redux";
import { payFromAli } from "../../actions/userAction.es";
import LanguageUtil from "../../utils/LanguageUtil.es";

@connect(state => ({
  user: state.user.info,
  balanceHolder: state.user.balanceHolder,
  id: state.router.params.id,
  amount: state.router.location.query['amount'],
  order: state.order.order,
}))
export default class OrderPay extends Component {

  componentWillMount() {
    const {dispatch, id, amount} = this.props;
    if (id)
      dispatch(payFromAli({
        id: id,
        type: 'desktop',
        url: `/order/${id}?lang=${LanguageUtil.lang}`
    }));
    else dispatch(payFromAli({amount, type: "desktop"}));
  }

  render() {

    return <div/>
  }
}
