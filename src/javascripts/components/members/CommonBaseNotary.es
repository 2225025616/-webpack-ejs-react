import React, { Component } from "react";
import T from "i18n-react";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { DateRangePicker } from "react-dates";

import Formatter from "../../lib/formatter";
import IdUtil from "../../utils/IdUtil";
import TokenUtil from "../../utils/TokenUtil";
import { deleteNotary, findNotariesByProduct, findNotariesByUser, openNotary } from "../../actions/notaryAction.es";
import NotaryStatus from "../../constants/NotaryStatus";
import Link from "../commons/LangLink";
import Page from "../../constants/Page";

let payItem = '';

@connect((state, ownProps) => {
  return ownProps.type === "user" ? state.notary.user.list[ownProps.index]
    : state.notary.product.list[ownProps.index]
})

@connect(state => {
  return {
    product: state.product.info,
    products: state.product.all,
    params: state.router.params,
  }
})
class NotaryItem extends Component {

  state = {
    showNotaryModal: false,
  };

  openNotaryModal = () => {
    this.setState({showNotaryModal: true});
  };

  closeNotaryModal = () => {
    this.setState({showNotaryModal: false});
  };

  handleDeleteNotary = (e) => {
    this.props.dispatch(deleteNotary(this.props.id, () => {
      this.closeNotaryModal();
    }));
  };

  reOpenNotary = (e) => {
    this.props.dispatch(openNotary(this.props.id));
    this.closeNotaryModal();
  };

  render() {
    const {collectCode, amount, createdAt, status, payStatus, notaryPublic, itemSize, id, product, tradeId} = this.props;
    let productId = IdUtil.productId(this.props);
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div>
      <div className="item">
        <div className="point">
          <span style={{width: "15%"}}>{collectCode}</span>
          <span style={{width: "16%"}}>{fmt.format(createdAt)}</span>
          <span style={{width: "10%"}}>{itemSize}</span>
          <span style={{width: "13%"}}>{NotaryStatus.toName(status)}</span>
          <span
            style={{width: "14%"}}>{payStatus === "YES" || payItem === id ? T.translate("order.pay") : T.translate("order.un-pay")}</span>
          <span style={{width: "10%"}}>{amount}</span>
          <div style={{width: "22%"}} className="operates">
            {payStatus === "YES" || payItem === id ? "" :
              <div>
                {
                  status === "APPLY" ?
                    <div>
                      <span onClick={this.openNotaryModal}>{T.translate("common.cancel")}</span>
                      <Link to={`/order/${tradeId}`}>
                        <span>{T.translate("notary.pay")}</span>
                      </Link>
                    </div> : ""
                }
                {
                  status === "CANCEL" ?
                    <div>
                      <span onClick={this.reOpenNotary}>{T.translate("notary.re-notary")}</span>
                    </div> : ""
                }
              </div>
            }
            <Link to={productId ? `/products/${productId}/notaries/${collectCode}` : `/notaries/${collectCode}`}>
              <span>{T.translate("home.learn-more")}</span>
            </Link>
          </div>
        </div>
        {this.state.showNotaryModal ?
          <ModalContainer onClose={this.closeNotaryModal}>
            <ModalDialog onClose={this.closeNotaryModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("notary.cancel-notary")}</h1>
              <form className="confirm">
                <p>{T.translate("notary.confirm-cancel")}</p>
                <div className="button-group">
                  <button type="button" className="yes"
                          onClick={this.handleDeleteNotary}>{T.translate("order.ok")}</button>
                  <button type="button" className="no"
                          onClick={this.closeNotaryModal}>{T.translate("common.cancel")}</button>
                </div>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>
    </div>;
  }
}

@connect(state => {
  return {
    product: state.notary.product,
    user: state.notary.user,
    info: state.notary.info,
    params: state.router.params,
    products: state.product.all,
  }
})
export default class Notary extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    loading: true,
    startDate: '',
    endDate: '',
  };

  resetCondition() {
    this.keyWord = "";
    this.status = "";
    this.pageNo = 0;
  }

  componentDidMount() {
    this.resetCondition();
    this.doQuery(this.props);
  }

  date = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  doQuery(props) {
    let pageNo = this.pageNo;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    let keyWord = this.keyWord;
    let status = this.status;

    let productId = IdUtil.productId(props);
    if (productId) {
      this.productId = productId;
      this.props.dispatch(findNotariesByProduct(
        productId,
        {
          pageNo: this.pageNo,
          pageSize: 10,
          startDate,
          endDate,
          status,
          keyWord,
        },
        () => this.setState({loading: false})
      ));
    } else {
      this.userId = TokenUtil.uid;
      this.props.dispatch(findNotariesByUser(
        this.userId,
        {
          pageNo: this.pageNo,
          pageSize: 10,
          startDate,
          endDate,
          status,
          keyWord,
        },
        () => this.setState({loading: false})
      ));
    }
  }

  queryByStatus = (e) => {
    let value = e.target.value;
    if (this.status !== value) {
      this.status = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleKeyWordChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  handleKeyWordQuery = e => {
    if (e)
      e.preventDefault();
    this.state.startDate = '';
    this.state.endDate = '';
    this.status = '';
    this.doQuery(this.props);
  };

  componentWillReceiveProps(nextProps) {
    let newProductId = IdUtil.productId(nextProps);
    let productId = IdUtil.productId(this.props);

    if (newProductId !== productId) {
      this.props.dispatch(findNotariesByProduct(newProductId));
    }
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }

  render() {
    const {product, user} = this.props;
    let productId = IdUtil.productId(this.props);
    let all = productId ? product : user;
    let {products} = this.props;
    let productName = products.find(item => item.id === productId);

    return <div>
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
                this.keyWord = "";
                this.doQuery(this.props);
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({focusedInput})}
              isOutsideRange={() => false}
            />
            <select value={this.status} onChange={this.queryByStatus}>
              <option value="">{T.translate("notary.all-status")}</option>
              <option value="APPLY">{T.translate("notary.apply")}</option>
              <option value="ACCEPT">{T.translate("signature.finished")}</option>
              <option value="CANCEL">{T.translate("signature.canceled")}</option>
            </select>
          </div>
          <div className="search">
            <input placeholder={T.translate("notary.search")} ref="query" id="search-key" type="text" name="query"
                   value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
            <i className="iconfont font-search" onClick={this.handleKeyWordQuery}/>
          </div>
        </div>
        <div className="table-contents">
          <div className="table-list">
            <div className="title">
              <span style={{width: "15%"}}>{T.translate("notary.collect-code")}</span>
              <span style={{width: "16%"}}>{T.translate("notary.created-at")}</span>
              <span style={{width: "10%"}}>{T.translate("notary.number")}</span>
              <span style={{width: "13%"}}>{T.translate("notary.apply-status")}</span>
              <span style={{width: "14%"}}>{T.translate("notary.pay-status")}</span>
              <span style={{width: "10%"}}>{T.translate("notary.amount")}</span>
              <span style={{width: "22%"}} className="operates">{T.translate("notary.operate")}</span>
            </div>
          </div>
          <div className="table-list">
            <div>
              {
                this.state.loading ?
                  <div className="table-placeholder" colSpan="4">
                    <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
                    {T.translate("common.loading")}
                  </div>
                  : all.totalPage <= 0 ?
                  <div>
                    <div className="table-placeholder" colSpan="4">
                      <img
                        src={require("images/members/placeholder-attestations-list.png")}/><br/>
                      {T.translate("common.no-info")}
                    </div>
                  </div>
                  : all.list.map((item, index) => {
                    return <NotaryItem type={productId ? "product" : "user"} key={index} index={index}/>
                  })
              }
            </div>
          </div>
          <hr className="division"/>
          {all.totalPage > 0 ?
            <div className="paginate">
              <Paginate previousLabel={"<"}
                        nextLabel={">"}
                        breakLable={<a href="">...</a>}
                        pageNum={all.totalPage}
                        forceSelected={all.pageNo}
                        marginPagesDisplayed={Page.PAGE_DISPLAY}
                        pageRangeDisplayed={Page.RANGE_DISPLAY}
                        clickCallback={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
            </div>
            : ""}
        </div>
        </div>
  }
}
