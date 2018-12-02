import React, { Component } from "react";
import Header from "../common/Header";
import Formatter from "../../../lib/formatter";
import { connect } from "react-redux";
import { deleteOrder, getOrders } from "../../../actions/orderAction";
import Link from "../../commons/LangLink";
import T from "i18n-react";
import NavMenu from "../common/NavMenu";
import FloatModal from "../common/FloatModal.es";

@connect(state => {
  return {
    orders: state.order.mobileList,
    all: state.order.lists,
  }
})

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.resetCondition();
  }

  data = {
    title: '订单管理',
    tab: [
      {name: "全部", status: ''},
      {name: "待支付", status: 'WAIT_BUYER_PAY'},
      {name: "已支付", status: 'TRADE_SUCCESS'}
    ]
  };

  state = {
    loading: true,
    startDate: '',
    endDate: '',
    showCancelModal: false,
    tradeStatus: '',
    price: 0,
    currentOrder: {},
    animationClass: '',
    tips: '正在获取...',
  };

  pageNo = 0;
  origin = {};

  componentWillMount = () => {
    this.doQuery(0);
  };

  doQuery = (pageNo) => {
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);
    let refType = this.product;
    let status = this.status;

    this.props.dispatch(getOrders({
      pageNo,
      pageSize: 6,
      refType,
      startDate,
      endDate,
      status,
    }, () => this.setState({loading: false})));
  };

  queryMore = () => {
    let length = this.props.orders.length;
    this.pageNo = parseInt(length % 10 === 0 && length / 10 > 0 ? length / 10 - 1 : length / 10);

    if (this.pageNo < this.props.all.totalPage - 1) this.doQuery(++this.pageNo);
    else this.setState({tips: '没有更多了'})
  };

  touchStart = e => {
    if (this.props.orders.length === 0) return this.canQueryMore = false;

    if (typeof window !== 'undefined') {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.canQueryMore = scrollTop >= (document.body.clientHeight - window.screen.availHeight * window.devicePixelRatio);
      if (this.canQueryMore) {
        this.origin.x = e.touches[0].clientX;
        this.origin.y = e.touches[0].clientY;
      }
    }
  };

  touchEnd = e => {
    if (this.canQueryMore && typeof window !== 'undefined') {
      let top = e.changedTouches[0].clientY - this.origin.y;
      if (top < 0 && Math.abs(top) >= 50 * window.devicePixelRatio) {
        this.setState({
          animationClass: 'animation'
        });
        this.queryMore();
        setTimeout(() => this.setState({animationClass: ''}), 2000)
      }
    }
  };

  resetCondition() {
    this.product = "";
    this.status = "";
    this.pageNo = 0;
  }

  productType = (item) => {
    if (item === "ATTESTATION" || item === "NOTARY" || item === "URLATTESTATION") {
      return T.translate("common.attestations");
    } else if (item === "ECONTRACT") {
      return T.translate("common.signature");
    } else if (item === "OTHER") {
      return T.translate("notification.other");
    }
  };

  iconType = (item) => {
    if (item === "ATTESTATION" || item === "NOTARY" || item === "URLATTESTATION") {
      return "iconfont font-console";
    } else if (item === "ECONTRACT") {
      return "iconfont font-hetong";
    } else if (item === "OTHER") {
      return "iconfont font-daishenpi2";
    }
  };

  payStatus = (status) => {
    if (status === "TRADE_SUCCESS") {
      return T.translate("order.pay");
    } else if (status === "WAIT_BUYER_PAY") {
      return T.translate("order.un-pay");
    } else
      return T.translate('order.closed')
  };

  showStatus = (status) => {
    this.setState({tradeStatus: status});
  };

  openCancelModal = (currentOrder) => {
    this.setState({showCancelModal: true, currentOrder});
  };

  closeModal = () => {
    this.setState({showCancelModal: false});
  };

  handleDeleteOrder = (id) => {
    this.props.dispatch(deleteOrder(id, () => {
      this.closeModal();
    }));
  };

  render() {
    let {orders} = this.props, fmt = Formatter.get('yyyy-mm-dd'),
      orderList = orders.filter(item => this.state.tradeStatus === "" || item.tradeStatus === this.state.tradeStatus);

    return <div className="order-list">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <header>
        {
          this.data.tab.map(
            (item, i) => {
              return <div key={i} onClick={e => this.showStatus(item.status)}
                          className={this.state.tradeStatus === item.status ? "active" : ""}>
                {item.name}
              </div>
            })
        }
      </header>
      <article style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)'}} onTouchStart={this.touchStart}
               onTouchEnd={this.touchEnd}>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : orderList.length > 0 ? orderList.map(
            (item, i) => {
              return <section className="items" key={i}>
                <div className="top">
                  <span style={{color: "#999"}}>{fmt.format(item.createdDate)}</span>
                  <span
                    style={item.tradeStatus === "WAIT_BUYER_PAY" ? {color: "#1687ee"} : {}}>{this.payStatus(item.tradeStatus)}</span>
                </div>
                <Link to={`/mobile/order/${item.id}`}>
                  <div className="content">
                    <div className="left-contain">
                      <i className={this.iconType(item.tradeRefType)}/>
                      <aside>
                        <span className="desc">{item.description}</span>
                        <span className="id">{item.id}</span>
                      </aside>
                    </div>
                    <span className="money">¥{parseFloat(item.amount).toFixed(2)}</span>
                  </div>
                </Link>
                <div className="button-group">
                  {item.tradeStatus === "WAIT_BUYER_PAY" ?
                    <div>
                      <button className="gray-button"
                              onClick={e => this.openCancelModal(item)}>{T.translate("order.cancel")}</button>
                      <Link to={`/mobile/order/${item.id}`}>
                        <button className="red-button">{T.translate("order.to-pay")}</button>
                      </Link>
                    </div> :
                    <Link to={`/mobile/order/${item.id}`}>
                      <button className="gray-button">{T.translate("home.learn-more")}</button>
                    </Link>
                  }
                </div>
              </section>
            }) : <div className='no-content-wrap'
                        style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)'}}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span>您当前没有订单哦</span>
            </div>
        }
        <FloatModal show={this.state.showCancelModal}
                    confirmFn={() => this.handleDeleteOrder(this.state.currentOrder.id)}
                    closeFn={this.closeModal} closeText='暂不取消'>
          <p className='cancel-pay'>确认取消订单？</p>
        </FloatModal>
      </article>
      <p className={"get-more " + this.state.animationClass}>{this.state.tips}</p>
    </div>
  }
}