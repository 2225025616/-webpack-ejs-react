import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Paginate from "react-paginate";
import { DateRangePicker } from "react-dates";
import { getTemplates } from "../../actions/templateAction";
import { findAttestationByProduct } from "../../actions/attestationAction";
import push from "../../utils/push";
import Link from "../commons/LangLink";
import Formatter from "../../lib/formatter";
import IdUtil from "../../utils/IdUtil";
import StorageUtil from "../../utils/StorageUtil";

const styles = {
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  }
};

@connect(state => {
  return {
    user: state.user.info,
    attestations: state.attestation.product,
    params: state.router.params,
    products: state.product.all,
    all: state.template.all,
  }
})

export default class ProductAttestation extends Component {
  constructor(props) {
    super(props);
    this.selectedItems = {};
    this.selectedLength = 0;
    this.resetCondition();
  }

  state = {
    loading: true,
    startDate: '',
    endDate: '',
    canDelete: true,
    pageSize: 6,
  };

  file = '';

  resetCondition() {
    this.query = "";
    this.period = "";
    this.pageNo = 0;
    this.sandbox = false;
    this.productId = IdUtil.productId(this.props);
    this.templateId = "";
  }

  componentDidMount() {
    this.doQuery(this.props);
    let productId = IdUtil.productId(this.props);
    if (productId) {
      this.props.dispatch(getTemplates(productId));
    }
  }

  date = e => {
    let date = new Date(e);
    return date.getTime();
  };

  doQuery = (props) => {
    let query = this.query;//保全号或者手机号
    let period = this.period;//保全2.0 按照 week,month查询;
    let pageNo = this.pageNo;//页码
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);//日期选择起始时间
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    /*let keyWord = this.keyWord;//search框关键字*/
    let sandbox = this.sandbox;//产品沙箱
    let templateId = this.templateId;//模板id

    this.props.dispatch(findAttestationByProduct(
      this.productId,
      {
        pageNo,
        pageSize: this.state.pageSize,
        period,
        query,
        startDate,
        endDate,
/*        keyWord,*/
        sandbox,
        templateId
      },
      () => this.setState({loading: false})
    ));
  };

  queryByPeriod = (value) => {//baoquan2.0 按照week,month 查询保全
    if (this.period !== value) {
      this.period = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleAttestationQuery = e => {
    if (e)
      e.preventDefault();
    this.state.startDate = '';
    this.state.endDate = '';
    this.templateId = '';
    this.forceUpdate();
    this.doQuery(this.props);
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleQueryChange = e => {
    this.query = e.target.value;
    this.forceUpdate();
  };

  selectItem(e) {
    let select = document.getElementsByTagName("input");

    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
      this.selectedLength += 1;
    } else {
      delete this.selectedItems[e.id];
      this.selectedLength -= 1;
    }

    let {attestations} = this.props;
    select[5].checked = attestations.list.length === this.selectedLength;

    this.forceUpdate();
  }

  selectedCount() {
    let len = Object.keys(this.selectedItems).length;
    if (len > 0) {
      return "(" + len + ")";
    } else {
      return "";
    }
    this.forceUpdate();
  }

  selectAll(e) {
    let {attestations} = this.props;
    let select = document.getElementsByTagName("input");
    if (select[5].checked) {
      for (let i = 5; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = true;
      }
      for (let a = 0; a < attestations.list.length; a++) {
        this.selectedItems[attestations.list[a].id] = attestations.list[a];
      }
      this.selectedLength = attestations.list.length;
    }
    if (!select[5].checked) {
      for (let i = 5; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = false;
      }
      this.selectedItems = {};
      this.selectedLength = 0;
    }
    this.forceUpdate();
  }

  handleToNotaries = () => {
    let result = [];
    for (let item in this.selectedItems) {
      result.push(this.selectedItems[item]);
    }

    this.toNotary(result);
  };

  toNotary(items) {
    StorageUtil.selectedAttestations(items);
    this.props.dispatch(push(`/products/${this.productId}/notarization`));
  }

  handleToNotary = (item) => {
    this.toNotary([item]);
  };

  setPageSize = (ev) => {
    let num = parseInt(ev.target.value);
    if (!num) num = 0;
    this.setState({pageSize: num});
  };

  afterSetPageSize = (ev) => {
    this.pageNo = 0;
    this.doQuery();
  };

  queryByTemplate = (e) => {
    if(e.target.value != this.templateId) {
      this.templateId = e.target.value;
      this.pageNo = 0;
      this.query = "";
      this.forceUpdate();
      this.doQuery();
    }
  };

  render() {
    const { attestations, all } = this.props;
    
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let type = this.props.id;
    let name = this.props.name;

    return <div className="container-wrapper">
      <div className="">
        <div className="table-search-bar">
          <div className="table-container">
         {/*   <button className="blueButton to-notary" disabled={this.selectedCount() <= 0}
                    onClick={this.handleToNotaries}>{T.translate("attestation.notary")} {this.selectedCount()}</button>*/}
            <DateRangePicker
              startDatePlaceholderText={T.translate("common.filter-start")}
              endDatePlaceholderText={T.translate("common.filter-end")}
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({startDate, endDate}) => {
                this.setState({startDate, endDate});
                this.state.startDate = startDate;
                this.state.endDate = endDate;
                this.query = "";
                this.doQuery(this.props);
              }} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
              isOutsideRange={() => false}
            />

            <select className="attestations-selector" value={this.templateId} onChange={this.queryByTemplate}>
              <option value="">全部模板</option>
              {
                all.length > 0 ?
                  all.map(item => {
                    if(item.state == 'APPROVED')
                      return <option value={item.id}>{item.title}</option>;
                  }) : ""
              }
            </select>
          </div>
          <div style={styles.flex}>
            <div className="search">
              <input placeholder={T.translate("attestation.search")} ref="query" id="search-key" type="text"
                     name="query"
                     value={this.query} onChange={this.handleQueryChange}/>
              <i className="iconfont font-search" onClick={this.handleAttestationQuery}/>
            </div>
            <button type="button" className="blueButton sandbox-btn" name="sandbox"
                    onClick={e => {
                      this.sandbox = !this.sandbox;
                      this.handleAttestationQuery()
                    }}>
              {this.sandbox ? T.translate("product.close-sandbox") : T.translate("product.sandbox")}
            </button>

          </div>
        </div>

        <table className="common-table-list">
          <thead>
          <tr>
            <th className="selected" style={{width: "5%"}}>
              <input type="checkbox" name="select" value="all" onClick={e => this.selectAll()}/>
            </th>
            <th style={{width: "30%"}}>{T.translate("notarization.id")}</th>
            <th style={{width: "26%"}}>{T.translate("common.file-name")}</th>
            <th style={{width: "14%"}}>{T.translate("notarization.time")}</th>
            <th style={{width: "10%"}}>{T.translate("common.phone-number")}</th>
            <th style={{width: "15%"}} className="operate-name">{T.translate("notary.operate")}</th>
          </tr>
          </thead>
          <tbody>

          {
            this.state.loading ?
              <div className="table-placeholder" colSpan="6">
                <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
                {T.translate("common.loading")}
              </div>
              : attestations.totalPage === 0 ?
              <div className="table-placeholder" colSpan="6">
                <img
                  src={require("images/members/placeholder-attestations-list.png")}/><br/>
                {T.translate("common.no-info")}
              </div>
              : attestations.list.map((item, index) => {
                return <tr key={index}>
                  <td className="selected" style={{width: "5%"}}>
                    <input type="checkbox" name="select"
                           onClick={e => this.selectItem(item)}/> {/* checked={this.selectedItems[item.id] ? true : false} */}
                  </td>
                  <td style={{width: "30%"}}>{item.id}</td>
                  <td style={{width: "26%"}}>{item.fileName ? item.fileName : "——"}</td>
                  <td style={{width: "14%"}}>{fmt.format(item.createdAt)}</td>
                  <td style={{width: "10%"}}>{item.identities && item.identities.MO}</td>
                  <td className="operates" style={{width: "15%"}}>
                    <a href={this.sandbox ? `/attestations/${item.id}?sandbox=true` : `/attestations/${item.id}`} target="blank">
                      <p>{T.translate("home.learn-more")}</p>
                    </a>
                    <Link to={this.sandbox ? `/attestations/${item.id}?sandbox=true` : `/attestations/${item.id}`}>

                    </Link>
             {/*       <p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
                  </td>
                </tr>;
              })
          }
          </tbody>
        </table>
        <hr className="division"/>
        {attestations.totalPage > 0 ?
          <div className="paginate">
            <div className="set-page-size">
              <input type="text" onInput={this.setPageSize} value={this.state.pageSize}/>
              <button onClick={this.afterSetPageSize}>确定</button>
              <span className="tip">设置每页保全数</span>
            </div>
            <Paginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLable={<a href="">...</a>}
              pageNum={attestations.totalPage}
              forceSelected={attestations.pageNo}
              marginPagesDisplayed={4}
              pageRangeDisplayed={4}
              clickCallback={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div> : ""}
      </div>
    </div>
  }
};
