import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Paginate from "react-paginate";
import { findAllAttestationByUser, findAllSummary } from "../../actions/attestationAction";
import push from "../../utils/push";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import StorageUtil from "../../utils/StorageUtil";
import { DateRangePicker } from "react-dates";
import {getTemplates} from "../../actions/templateAction.es";

const styles = {
  progress: {
    width: 120,
    paddingTop: 8,
    height: 24,
  }
};

@connect(state => {
  return {
    user: state.user.kycs,
    attestations: state.attestation.user,
    summary: state.attestation.allSummary,
    params: state.router.params,
    template: state.template.all
  }
})

export default class CommonAttestationList extends Component {
  constructor(props) {
    super(props);
    this.selectedItems = {};
    this.selectedLength = 0;
    this.resetCondition();
    this.noTemplate=false;
  }

  state = {
    loading: true,
    startDate: '',
    endDate: '',
  };

  file = '';
  fileName = '';

  resetCondition() {
    this.keyWord = "";
    this.productId = "";
    this.templateId = "";
    this.pageNo = 0;
  }

  componentDidMount() {
    this.doQuery(this.props);
    this.props.dispatch(findAllSummary());
  }

  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };

  doQuery = (props) => {
    let { size } = this.props;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    let keyWord = this.keyWord;
    let productId = this.productId;
    let templateId = this.templateId;

    this.props.dispatch(findAllAttestationByUser({
      pageNo: this.pageNo,
      pageSize: size,
      productId,
      templateId,
      startDate,
      endDate,
      keyWord,
    }, () => this.setState({loading: false})));
  };

  queryByProduct = (e) => {
    const {summary,type} = this.props;

    if (this.productId !== e.target.value) {
      this.productId = e.target.value;
      this.pageNo = 0;
      this.keyWord = '';
      this.templateId = '';
      this.forceUpdate();
      this.noTemplate=false;

      if(type != "user" && this.productId != ""){
        let currentProduct = summary.filter(item => {
          return item.pId === this.productId;
        });
        if(currentProduct[0].isProduct == true){
          this.props.dispatch(getTemplates(this.productId));
        } else {
          this.noTemplate=true;
        }
      }
      this.doQuery(this.props);
    }
  };

  queryByTemplate = (e) => {
    if (this.templateId !== e.target.value) {
      this.templateId = e.target.value;
      this.pageNo = 0;
      this.keyWord = '';
      this.doQuery(this.props);
    }
  };
  handleKeydown=(e)=>{
    if(e.keyCode===13){
      this.handleAttestationQuery();
    }
  }

  handleAttestationQuery = e => {
    if (e)
      e.preventDefault();
    this.state.startDate = '';
    this.state.endDate = '';
    this.productId = '';
    this.doQuery(this.props);
    console.log(1);
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleKeyWordChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  selectItem(e) {
    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
      this.selectedLength += 1;
    } else {
      delete this.selectedItems[e.id];
      this.selectedLength -= 1;
    }

    let {attestations} = this.props;
    let select = document.getElementsByTagName("input");
    select[3].checked = attestations.list.length === this.selectedLength;
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
    let { haveInput } = this.props;
    let selectInputIndex = parseInt(haveInput) + 3;

    let {attestations} = this.props;
    let select = document.getElementsByTagName("input");
    if (select[selectInputIndex].checked) {
      for (let i = selectInputIndex; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = true;
      }
      for (let a = 0; a < attestations.list.length; a++) {
        this.selectedItems[attestations.list[a].id] = attestations.list[a];
      }
      this.selectedLength = attestations.list.length;
    }
    if (!select[selectInputIndex].checked) {
      for (let i = selectInputIndex; i < select.length; i++) {
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
    this.props.dispatch(push('/notarization'));
  }

  handleToNotary = (item) => {
    this.toNotary([item]);
  };

  getProductName = (id) => {
    const {summary} = this.props;
    for (let i = 0; i < summary.length; i++) {
      if (summary[i].pId === id) {
        return summary[i].pName;
      }
    }
  };

  render() {
    const {attestations, summary, template, type} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div>
      <div className="table-search-bar member-search-bar-first">
        <div className="table-container">
          {/*    <button className="blueButton to-notary" disabled={this.selectedCount() <= 0}
                      onClick={this.handleToNotaries}>{T.translate("attestation.notary")} {this.selectedCount()}</button>*/}
          <DateRangePicker
            startDatePlaceholderText={T.translate
            ("common.filter-start")}
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
          <select className="attestations-selector" value={this.productId} onChange={this.queryByProduct}>
            <option value="">全部产品</option>
            {
              summary.length > 0 ?
                summary.map(item => {
                  return <option value={item.pId}>{item.pName}</option>;
                }) : ""
            }
          </select>
          {
            type === "user" ?
              "" :
              <select className="attestations-selector" value={this.templateId} onChange={this.queryByTemplate}>
                <option value="">证书名称</option>
                {
                  template.length > 0 && this.productId != "" && !this.noTemplate?
                    template.map(item => {
                      return <option value={item.id}>{item.title}</option>;
                    })
                    : ""
                }
              </select>
          }
        </div>
        <div className="search">
          <input placeholder={T.translate("attestation.search")} ref="keyWord" id="search-key" type="text"
                 name="keyWord"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <i className="iconfont font-search" onClick={this.handleAttestationQuery}/>
        </div>
      </div>
      {
        type === "user" ?
          <table className="common-table-list">
            <thead>
            <tr>
              <th className="selected" style={{width: "5%"}}>
                <input type="checkbox" name="select" value="all" onClick={e => this.selectAll()}/>
              </th>
              <th style={{width: "25%"}}>{T.translate("attestation.no")}</th>
              <th style={{width: "25%"}}>{T.translate("common.file-name")}</th>
              <th style={{width: "15%"}}>{T.translate("notarization.time")}</th>
              <th style={{width: "15%"}}>{T.translate("order.product")}</th>
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
                : attestations.list.map(
                  (item, i) => <tr key={i}  onClick={e => this.selectItem(item)}>
                    <td className="selected" style={{width: "5%"}}>
                      <input type="checkbox" name="select" checked={!!this.selectedItems[item.id]}/>
                    </td>
                    <td style={{width: "25%"}} title={item.id}>{item.id}</td>
                    <td style={{width: "25%"}} title={item.fileName}>{item.fileName ? item.fileName : "——"}</td>
                    <td style={{width: "15%"}}>{fmt.format(item.createdAt)}</td>
                    <td style={{width: "15%"}} title={this.getProductName(item.pId)}>{this.getProductName(item.pId)}</td>
                    <td className="operates" style={{width: "15%"}}>
                      <a target="blank" href={`/attestations/${item.id}`}>
                        <p>查看保全</p>
                      </a>
                      {/*<p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
                    </td>
                  </tr>
                )
            }
            </tbody>
          </table>
          :
          <table className="common-table-list">
            <thead>
            <tr>
              <th className="selected" style={{width: "5%"}}>
                <input type="checkbox" name="select" value="all" onClick={e => this.selectAll()}/>
              </th>
              <th style={{width: "25%"}}>{T.translate("attestation.no")}</th>
              <th style={{width: "21%"}}>{T.translate("common.file-name")}</th>
              <th style={{width: "14%"}}>{T.translate("notarization.time")}</th>
              <th style={{width: "10%"}}>{T.translate("order.product")}</th>
              <th style={{width: "10%"}}>证书名称</th>
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
                : attestations.list.map(
                  (item, i) => <tr key={i}  onClick={e => this.selectItem(item)}>
                    <td className="selected" style={{width: "5%"}}>
                      <input type="checkbox" name="select" checked={!!this.selectedItems[item.id]}/>
                    </td>
                    <td style={{width: "25%"}} title={item.id}>{item.id}</td>
                    <td style={{width: "21%"}} title={item.fileName}>{item.fileName ? item.fileName : "——"}</td>
                    <td style={{width: "14%"}}>{fmt.format(item.createdAt)}</td>
                    <td style={{width: "10%"}} title={this.getProductName(item.pId)} >{this.getProductName(item.pId)}</td>
                    <td style={{width: "10%"}} title={item.templateName}>{item.templateName}</td>
                    <td className="operates" style={{width: "15%"}}>
                      <a target="blank" href={`/attestations/${item.id}`}>
                        <p>查看保全</p>
                      </a>
                      {/*<p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
                    </td>
                  </tr>
                )
            }
            </tbody>
          </table>
      }
      <hr className="division"/>
      {attestations.totalPage > 0 ?
        <div className="paginate">
          <Paginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLable={<a href="">...</a>}
            pageNum={attestations.totalPage}
            forceSelected={attestations.pageNo}
            marginPagesDisplayed={Page.PAGE_DISPLAY}
            pageRangeDisplayed={Page.RANGE_DISPLAY}
            clickCallback={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div> : ""}
    </div>
  }
};

