// TODO: baoquan2.0 page...
import React, { Component } from "react";
import { findAttestationByProduct, findAttestationByUser } from "../../actions/attestationAction";
import Link from "../commons/LangLink";
import push from "../../utils/push";
import Paginate from "react-paginate";
import Page from "../../constants/Page";
import Formatter from "../../lib/formatter";
import LoadingButton from "../commons/LoadingButton";
import cx from "classnames";
import { connect } from "react-redux";
import T from "i18n-react";
import IdUtil from "../../utils/IdUtil";
import StorageUtil from "../../utils/StorageUtil";
import UploadModal from "./UploadModal";

const styles = {
  icon: {
    fill: "#03a9f4"
  },
  submit: {
    marginTop: -9,
    minWidth: 80,
    height: 34
  },
  notaryBtn: {
    position: "absolute",
    bottom: 32,
    minWidth: 140,
    height: 35
  },
  select: {
    width: 140,
    height: 50,
    marginLeft: 15,
    fontSize: 14
  }
};


@connect(state => {
  return {
    attestation: state.attestation,
    params: state.router.params,
    products: state.product.all,
  }
})
export default class AttestationList extends Component {
  constructor(props) {
    super(props);

    this.selectedItems = {};
  }

  componentDidMount() {
    this.resetCondition();
    this.doQuery(this.props);
  }

  doQuery = (props) => {
    let query = this.query;
    let period = this.period;
    let identityType = this.identityType;
    let sandbox = this.sandbox;
    let productId = props.productId;
    let type = props.type;
    let pageNo = this.pageNo;

    if (type === "product") {
      this.props.dispatch(findAttestationByProduct(productId, {
        pageNo: this.pageNo,
        pageSize: Page.PAGE_SIZE,
        identityType,
        query,
        period,
        sandbox
      }));
    } else {
      this.props.dispatch(findAttestationByUser({
        pageNo: this.pageNo,
        pageSize: Page.PAGE_SIZE,
        identityType,
        query,
        period,
        productId
      }));
    }
  };

  resetCondition() {
    this.query = "";
    this.period = "";
    this.identityType = "";
    this.sandbox = false;
    this.pageNo = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type || nextProps.productId !== this.props.productId) {
      this.resetCondition();
      this.doQuery(nextProps);
    }
  }

  handleIdentityType = value => {
    if (this.identityType !== value) {
      this.pageNo = 0;
      this.identityType = value;
      this.doQuery(this.props);
    }
  };

  isPerson(item) {
    let i = item.identities;
    if (i === null) {
      return false;
    }

    return i["MO"] || i ["ID"];
  }

  per(item) {
    let i = item.identities;
    if (i === null) {
      return T.translate("attestation.unknown");
    }
    else if (i["MO"] || i ["ID"]) {
      return T.translate("attestation.person-user");
    } else {
      return T.translate("attestation.organization-user");
    }
  }

  handleAttestationQuery = e => {
    if (e)
      e.preventDefault();

    this.doQuery(this.props);
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  pageAttestations() {
    const {attestation} = this.props;
    let productId = this.props.productId;
    let type = this.props.type;

    if (type === "product") {
      return attestation.product;
    } else {
      return attestation.user;
    }
  }

  selectItem(e) {
    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
    } else {
      delete this.selectedItems[e.id];
    }

    this.forceUpdate();
  }

  selectedCount() {
    let len = Object.keys(this.selectedItems).length;
    if (len > 0) {
      return "(" + len + ")";
    } else {
      return "";
    }
  }

  queryByPeriod = (value) => {
    if (this.period !== value) {
      this.period = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleToNotaries = () => {
    let result = [];
    for (let item in this.selectedItems) {
      result.push(this.selectedItems[item]);
    }

    this.toNotary(result);
  };

  toNotary(items) {
    StorageUtil.selectedAttestations(items);
    let type = this.props.type;

    type === "product" ?
      this.props.dispatch(push(`/products/${this.props.id}/notarization`))
      :
      this.props.dispatch(push('/notarization'));
  }

  handleToNotary = (item) => {
    this.toNotary([item]);
  };

  handleQueryChange = e => {
    this.query = e.target.value;
    this.forceUpdate();
  };

  handleOpen = () => {
    this.refs.upload.show();
  };

  render() {
    let pageAttestations = this.pageAttestations();
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let type = this.props.type;
    let name = this.props.name;
    let productId = IdUtil.productId(this.props);
    let {products} = this.props;
    let product = products.find(item => item.id === productId);

    return <div className="search-atteslist container">
      <div className="attestations-search">
        {
          type === "product" ?
            <ul className="breadcrumb">
              <li>{product ? product.name : ""}</li>
              <li>{T.translate("product.attestation")}</li>
            </ul>
            :
            <ul className="breadcrumb">
              <li>{T.translate("sidebar.user-attestation")}</li>
              <li>{T.translate("sidebar.my-attestation")}</li>
            </ul>
        }
        <UploadModal ref="upload"/>
        <div className="search-input">
          <img className="search-img"
               src={require("images/components/information/search-img.png")}/>
          <input ref="query" id="search-key" type="text" name="query" className="form-control"
                 placeholder={T.translate("attestation.input-no")} value={this.query}
                 onChange={this.handleQueryChange}/>
          <LoadingButton onTouchTap={this.handleAttestationQuery } className="submit-btn"
                         loadingLabel={T.translate("common.att-loading")}
                         label={T.translate("common.att-label")} style={styles.submit}/>
        </div>
        <div className="search-filter">
          <div>
            <a className={cx("filter-require", {active: this.identityType === ""})}
               onClick={e => this.handleIdentityType('')}>{T.translate("attestation.all")}</a>
            <a className={cx("filter-require", {active: this.identityType === "personal"})}
               onClick={e => this.handleIdentityType('personal')}>{T.translate("attestation.person")}</a>
            <a className={cx("filter-require", {active: this.identityType === "enterprise"})}
               onClick={e => this.handleIdentityType('enterprise')}>{T.translate("attestation.organization")}</a>
            <span> | </span>
          </div>
          <a className={cx("filter-require", {active: this.period === ""})}
             onClick={e => this.queryByPeriod('')}>{T.translate("attestation.all")}</a>
          <a className={cx("filter-require", {active: this.period === "week"})}
             onClick={e => this.queryByPeriod('week')}>{T.translate("attestation.week")}</a>
          <a className={cx("filter-require", {active: this.period === "month"})}
             onClick={e => this.queryByPeriod('month')}>{T.translate("attestation.month")}</a>
        </div>

        <LoadingButton onTouchTap={this.handleToNotaries} type="button"
                       disabled={this.selectedCount() <= 0}
                       label={T.translate("attestation.notary") + `${this.selectedCount()}`}
                       style={styles.notaryBtn}/>

        {type === "product" ? <button type="button" className="sandbox-btn" name="sandbox"
                                      onClick={
                                        e => {
                                          this.sandbox = !this.sandbox;
                                          this.handleAttestationQuery()
                                        } }>
          { this.sandbox ? "关闭沙箱" : "查看沙箱"} </button> : ""
        }

      </div>
      <div className="search-result">
        {pageAttestations.totalPage === 0 ?
          <div className="table-placeholder" colSpan="6">
            <img
              src={require("images/members/placeholder-attestations-list.png")}/><br/>
            {T.translate("common.no-info")}
          </div>
          : pageAttestations.list.map(item => {
              return <div className="search-content">
                <div className="checkbox">
                  <input type="checkbox" checked={!!this.selectedItems[item.id]}
                         onClick={e => this.selectItem(item)}/>
                </div>
                <div className="content-info">
                  <p>{item.id}</p>

                  {
                    this.isPerson(item) ?
                      <p><img
                        src={require("images/components/information/personal.png")}/>{this.per(item)}
                      </p>
                      :
                      <p><img
                        src={require("images/components/information/org.png")}/>{this.per(item)}
                      </p>
                  }
                  {
                    type === "product" ? "" :
                      <p><img
                        src={require("images/components/information/agency.png")}/>{item.organizationName}
                      </p>
                  }
                  {
                    this.isPerson(item) ?
                      <div>
                        {
                          item.identities&&item.identities.MO ?
                            <p><img
                              src={require("images/components/information/tel.png")}/>{item.identities.MO}
                            </p>
                            : ""
                        }
                        {
                          item.identities.ID ?
                            <p><img
                              src={require("images/components/information/name.png")}/>{item.identities.ID}
                            </p>
                            : ""
                        }
                      </div>
                      :
                      <div>
                        {
                          item.identities.ORGCODE ?
                            <p><img
                              src={require("images/components/information/orgcode.png")}/>{item.identities.ORGCODE}
                            </p>
                            : ""
                        }
                        {
                          item.identities.USCID ?
                            <p><img
                              src={require("images/components/information/uscid.png")}/>{item.identities.USCID}
                            </p>
                            : ""
                        }
                      </div>
                  }
                </div>
                <div className="content-status">
                  <p >{fmt.format(item.createdAt)}</p>
                  <div className="item-btn">
                    <Link to={`/attestations/${item.id}` + (this.sandbox === true ? "?sandbox=true" : "")}>
                      <button>{T.translate("attestation.details")}</button>
                    </Link>
                    {
                      this.sandbox ? "" :
                        <button onTouchTap={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</button>
                    }
                  </div>
                </div>
              </div>;
            }
          )
        }

        { pageAttestations.totalPage > 0 ? <Paginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLable={<a href="">...</a>}
          pageNum={pageAttestations.totalPage}
          forceSelected={pageAttestations.pageNo}
          marginPagesDisplayed={Page.PAGE_DISPLAY}
          pageRangeDisplayed={Page.RANGE_DISPLAY}
          clickCallback={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        /> : "" }

      </div>
    </div>
  }
}
;
