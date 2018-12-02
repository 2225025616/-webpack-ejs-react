import React, { Component } from "react";
import Formatter from "../../lib/formatter";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import Page from "../../constants/Page";
import Paginate from "react-paginate";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { deleteOrder, getOrders } from "../../actions/orderAction";
import Link from "../commons/LangLink";

const styles = {
  flex: {
    display: "flex"
  },
};

let payItem = '';

@connect(state => {
  return {
    location: state.router.location,
    orders: state.order.lists,
  }
})

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.resetCondition();
  }

  state = {
    loading: true,
    startDate: '',
    endDate: '',
    showCancelModal: false,
    // showInvoiceModal: false,
  };

  currOrder = {};

  resetCondition() {
    this.product = "";
    this.status = "";
    this.pageNo = 0;
  }

  componentWillMount = () => {
    this.doQuery();
  };

  date = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  doQuery = (props) => {
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);
    let refType = this.product;
    let status = this.status;

    this.props.dispatch(getOrders({
      pageNo: this.pageNo,
      pageSize: 8,
      refType,
      startDate,
      endDate,
      status,
    }, () => this.setState({loading: false})));
  };

  queryByProduct = (e) => {
    if (this.product !== e.target.value) {
      this.product = e.target.value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  queryByStatus = (e) => {
    if (this.status !== e.target.value) {
      this.status = e.target.value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  openCancelModal = (item) => {
    return () => {
      this.setState({showCancelModal: true});
      this.currOrder = item;
    }
  };

  // openInvoiceModal = () => {
  //   this.setState({showInvoiceModal: true});
  // };

  closeCancelModal = () => {
    this.setState({showCancelModal: false});
  };

  // closeInvoiceModal = () => {
  //   this.setState({showInvoiceModal: false});
  // };

  handleDeleteOrder = (id) => {
    this.props.dispatch(deleteOrder(id, () => {
      this.closeCancelModal();
    }));
  };

  payStatus = (status) => {
    if (status === "TRADE_SUCCESS") {
      return T.translate("order.pay");
    } else if (status === "WAIT_BUYER_PAY") {
      return T.translate("order.un-pay");
    } else
      return T.translate('order.closed')
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

  // handleApplyInvoice = () => {
  //
  // };

  render() {
    let {orders} = this.props;

    let fmt = Formatter.get('yyyy/mm/dd hh:MM');

    return <article>
      <div className="table-search-bar member-search-bar-first">
        <div className="table-container">
          <DateRangePicker
            startDatePlaceholderText={T.translate("common.filter-start")}
            endDatePlaceholderText={T.translate("common.filter-end")}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({startDate, endDate}) => {
              this.setState({startDate, endDate});
              this.state.startDate = startDate;
              this.state.endDate = endDate;
              this.doQuery(this.props);
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({focusedInput})}
            isOutsideRange={() => false}/>
          <select value={this.status} onChange={this.queryByStatus}>
            <option value="">{T.translate("order.order-status")}</option>
            <option value="WAIT_BUYER_PAY">{T.translate("order.un-pay")}</option>
            <option value="TRADE_SUCCESS">{T.translate("order.pay")}</option>
          </select>
          {/*
           <select value={this.period} onChange={this.queryByPeriod}>
           <option value ="all">发票状态</option>
           <option value ="1">bbb</option>
           <option value ="2">ccc</option>
           </select>
           */}
          <select value={this.product} onChange={this.queryByProduct}>
            <option value="">{T.translate("order.products")}</option>
            <option value="ATTESTATION">{T.translate("common.attestations")}</option>
            <option value="ECONTRACT">{T.translate("common.signature")}</option>
            <option value="IN">{T.translate("notification.other")}</option>
          </select>
        </div>
      </div>

      <table className="common-table-list">
        <thead>
        <tr>
          <th style={{width: "19%"}}>{T.translate("pay.order-number")}</th>
          <th style={{width: "16%"}}>{T.translate("order.time")}</th>
          <th style={{width: "12%"}}>{T.translate("order.product")}</th>
          <th style={{width: "17%"}}>{T.translate("order.detail")}</th>
          <th style={{width: "10%"}}>{T.translate("order.amount")}</th>
          <th style={{width: "9%"}}>{T.translate("order.status")}</th>
          <th style={{width: "17%"}} className="operate-name">{T.translate("notary.operate")}</th>
        </tr>
        </thead>
        <tbody>

        {
          this.state.loading ?
            <div className="table-placeholder" colSpan="7">
              <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
              {T.translate("common.loading")}
            </div>
            : orders.totalPage === 0 ?
            <div className="table-placeholder" colSpan="7">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/><br/>
              {T.translate("order.no-info")}
            </div>
            :
            orders.list.map(
              (item, i) => <tr key={i}>
                <td style={{width: "19%"}}>{item.id}</td>
                <td style={{width: "16%"}}>{fmt.format(item.createdDate)}</td>
                <td style={{width: "12%"}}>{this.productType(item.tradeRefType)}</td>
                <td style={{width: "17%"}}>{item.description}</td>
                <td style={{width: "10%"}}>¥ {parseFloat(item.amount).toFixed(2)}</td>
                <td style={{width: "9%"}}>{this.payStatus(item.tradeStatus)}</td>
                <td className="operates" style={{width: "17%"}}>
                  {
                    item.tradeStatus !== "WAIT_BUYER_PAY" || payItem === item.id ?
                      <span className="no-operates">——</span> :
                      <div style={styles.flex}>
                        <Link to={`/order/${item.id}`}><p>{T.translate("order.to-pay")}</p></Link>
                        <p onClick={this.openCancelModal(item)}>{T.translate("order.cancel")}</p>
                      </div>
                  }
                  {/*
                 <p onClick={this.openInvoiceModal}>申请发票</p>
                 {this.state.showInvoiceModal ?
                 <ModalContainer onClose={this.closeInvoiceModal}>
                 <ModalDialog onClose={this.closeInvoiceModal} width={665} className="example-dialog" dismissOnBackgroundClick={true}>
                 <h1>申请发票</h1>
                 <form>
                 <article>
                 <section>
                 <span>发票抬头</span>
                 <input placeholder="用户姓名或公司名称作为抬头...."/>
                 </section>
                 <section>
                 <span>发票明细</span>
                 <select>
                 <option>电子数据保全</option>
                 <option>电子签约</option>
                 <option>诚信档案</option>
                 </select>
                 </section>
                 <section>
                 <span>收件人</span>
                 <input/>
                 </section>
                 <section>
                 <span>联系方式</span>
                 <input/>
                 </section>
                 <section>
                 <span>详细地址</span>
                 <input/>
                 </section>
                 <section className="button-group buttons">
                 <span></span>
                 <button type="button" className="yes" onClick={this.handleApplyInvoice}>确定</button>
                 <button type="button" className="no" onClick={this.closeInvoiceModal}>取消</button>
                 </section>
                 <span className="invoice-tip">* 提交后我们将在3-5个工作日将发票快递给您</span>
                 </article>
                 </form>
                 </ModalDialog>
                 </ModalContainer>
                 : null}
                 */}
                </td>
              </tr>
            )
        }
        </tbody>
      </table>
      <hr className="division"/>
      <div className="paginate">
        {orders.totalPage > 0 ? <Paginate previousLabel={"<"}
                                          nextLabel={">"}
                                          breakLable={<a href="">...</a>}
                                          pageNum={orders.totalPage}
                                          forceSelected={orders.pageNo}
                                          marginPagesDisplayed={Page.PAGE_DISPLAY}
                                          pageRangeDisplayed={Page.RANGE_DISPLAY}
                                          clickCallback={this.handlePageClick}
                                          containerClassName={"pagination"}
                                          subContainerClassName={"pages pagination"}
                                          activeClassName={"active"}/> : ''}
      </div>
      {this.state.showCancelModal ?
        <ModalContainer onClose={this.closeCancelModal}>
          <ModalDialog onClose={this.closeCancelModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>{T.translate("order.cancel")}</h1>
            <form className="confirm">
              <p>{T.translate("order.to-cancel")}?</p>
              <div className="button-group">
                <button type="button" className="yes"
                        onClick={e => this.handleDeleteOrder(this.currOrder.id)}>{T.translate("order.ok")}</button>
                <button type="button" className="no"
                        onClick={this.closeCancelModal}>{T.translate("common.cancel")}</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </article>
  }
}

