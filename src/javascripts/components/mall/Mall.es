import React, { Component } from "react";
import T from "i18n-react";
import { getPackages } from "../../actions/mallAction.es";
import { connect } from "react-redux";
import MallProductType from "../../utils/MallProductType.es";
import { createOrder } from "../../actions/orderAction.es";
import push from "../../utils/push";
import BackMenu from "../commons/BackMenu";

@connect(state => ({
  user: state.user.info,
  packages: state.mall.packages,
  productType: state.router.location.query['productType'],
}))
export default class Mall extends Component {

  time = [
    {name: '1年', value: 1},
    {name: '2年', value: 2},
    {name: '3年', value: 3},
  ];

  state = {
    showOrderModal: false,
    selectedItem: {},
    selectedTime: this.time[0],
  };

  componentWillMount = () => {
    const {dispatch, productType} = this.props;
    dispatch(getPackages(productType, all => this.setState({selectedItem: all[0]})));
  };

  selectedPkg = selectedItem => {
    return e => this.setState({selectedItem});
  };

/*  selectTime = (selectedTime) => {
    return e => this.setState({selectedTime});
  };*/

  handleBuy = () => {
    const {dispatch} = this.props,
      itemPriceId = this.state.selectedItem.itemPriceId,
      year = this.state.selectedTime.value;
    dispatch(createOrder({itemPriceId, year}, order => dispatch(push(`/order/${order.tradeId}`))));
  };

  render() {
    const {packages, productType} = this.props;

    return <div className="container-wrapper">
      <div className="container">
        <BackMenu title="网页取证套餐购买"/>
        <div className="ctn">
        <div className='packages-wrap'>
          <h1>选择套餐</h1>
          <div className='packages'>
            {packages.map(
              (item, i) =>
                <section className={this.state.selectedItem.itemPriceId === item.itemPriceId
                  ? 'package selected' : 'package'} key={i} onClick={this.selectedPkg(item)}>
                  <h2>{item.name}</h2>
                  <div className='content'>
                    <p><span className='red-font'>{item.usedCount}</span>次（购买次数）</p>
                  </div>
                  <div className='price'>
                    <span>价格：<span className='red-font'>￥{item.amount}</span>/ 年</span>
                  </div>
                </section>
            )}
          </div>
        </div>

{/*        <div className='buy-time-wrap'>
          <h1>购买时长</h1>
          <div className='items'>
            {
              this.time.map(
                (item, i) =>
                  <section key={i} className={this.state.selectedTime.value === item.value ? 'time selected' : 'time'}
                           onClick={this.selectTime(item)}>{item.name}</section>
              )
            }
          </div>
        </div>*/}
        <div className='footer-btn-wrap'>
          <button onClick={this.handleBuy} disabled={!this.state.selectedTime.value || !this.state.selectedItem.amount}>
            确定购买
          </button>
        </div>
        </div>
      </div>
    </div>
  }
}
