import React, { Component } from "react";
import Formatter from "../../lib/formatter";
import { deleteEvidence, findEvidence, } from "../../actions/evidenceAction.es";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import { DateRangePicker } from "react-dates";
import Link from "../commons/LangLink";
import Page from "../../constants/Page";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import push from "../../utils/push";
import StorageUtil from "../../utils/StorageUtil";
import MallProductType from "../../utils/MallProductType.es";

const styles = {
  hide: {
    display: 'none',
  },
};

@connect(state => {
  return {
    evidence: state.evidence.lists,
    params: state.router.params,
  }
})

export default class Evidences extends Component {

  constructor(props) {
    super(props);
    this.deleteItem = {};
    this.selectedItems = {};
    this.selectedLength = 0;
  };

  state = {
    loading: true,
    showDeleteModal: false,
    startDate: '',
    endDate: '',
  };

  resetCondition() {
    this.key = "";
    this.pageNo = 0;
    this.pageSize = 5;
  }

  componentDidMount() {
    this.resetCondition();
    this.doQuery(this.props);
  }

  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };

  doQuery = (props) => {
    let { size } = this.props;

    let pageNo = this.pageNo;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    let keyWord = this.key;

    this.props.dispatch(findEvidence(
      {
        pageNo,
        pageSize: size,
        startDate,
        endDate,
        keyWord,
      },
      () => this.setState({loading: false})
    ));
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleQueryChange = e => {
    this.key = e.target.value;
    this.forceUpdate();
  };

  handleFindEvidence = e => {
    if (e) e.preventDefault();
    this.state.startDate = '';
    this.state.endDate = '';
    this.doQuery(this.props);
  };

  openDeleteModal = item => {
    this.deleteItem = item.attestationUrlId;
    this.forceUpdate();
    this.setState({showDeleteModal: true});
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  handleDeleteEvidence = () => {
    this.props.dispatch(deleteEvidence(this.deleteItem, () => {
      this.closeDeleteModal();
    }));
  };

  selectItem(e) {
    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
      this.selectedLength += 1;
    } else {
      delete this.selectedItems[e.id];
      this.selectedLength -= 1;
    }

    let {evidence} = this.props;
    let select = document.getElementsByTagName("input");
    select[3].checked = evidence.list.length === this.selectedLength;
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
    let {evidence} = this.props;

    let select = document.getElementsByTagName("input");
    if (select[3].checked) {
      for (let i = 3; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = true;
      }
      for (let a = 0; a < evidence.list.length; a++) {
        this.selectedItems[evidence.list[a].id] = evidence.list[a];
      }
      this.selectedLength = evidence.list.length;
    }
    if (!select[3].checked) {
      for (let i = 3; i < select.length; i++) {
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

    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleFindEvidence();
        }
    }

  render() {
    const {evidence} = this.props;
    let fmt = Formatter.get("yyyy/mm/dd hh:MM:ss");
    let { wholeList } = this.props;

    return <div>
      <div className="table-search-bar member-search-bar-first" style={ wholeList === "false" ? styles.hide : {}}>
        <div className="table-container">
{/*          <button className="blueButton to-notary" disabled={this.selectedCount() <= 0}
                  onClick={this.handleToNotaries}>{T.translate("attestation.notary")} {this.selectedCount()}</button>*/}
          <DateRangePicker
            startDatePlaceholderText={T.translate("common.filter-start")}
            endDatePlaceholderText={T.translate("common.filter-end")}
            isOutsideRange={() => false}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({startDate, endDate}) => {
              this.setState({startDate, endDate});
              this.state.startDate = startDate;
              this.state.endDate = endDate;
              this.key = "";
              this.doQuery(this.props);
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({focusedInput})}
          />
        </div>
        <div className="search evidence-search">
          <input placeholder={T.translate("evidence.search")} value={this.key} onChange={this.handleQueryChange} onKeyDown={this.handleKeydown}/>
          <i className="iconfont font-search" onClick={this.handleFindEvidence}/>
        </div>
      </div>

      <table className="common-table-list">
        <thead>
        <tr>
          {
            wholeList === "false" ?
              "" :
              <th className="selected" style={{width: "5%"}}>
                <input type="checkbox" name="select" value="all" onClick={e => this.selectAll()}/>
              </th>
          }
          <th style={{width: "15%"}}>{T.translate("evidence.name")}</th>
          <th style={{width: "15%"}}>{T.translate("evidence.url")}</th>
          <th style={{width: "15%"}}>存证时间</th>
          <th style={{width: "15%"}}>上链时间</th>
          <th style={{width: "15%"}}>{T.translate("evidence.remarks")}</th>
          <th style={{width: "20%"}} className="operate-name">{T.translate("notary.operate")}</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.loading ?
            <div className="table-placeholder" colSpan="4">
              <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
              {T.translate("common.loading")}
            </div>
            : evidence.totalPage === 0 ?
            <div className="table-placeholder" colSpan="4">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/><br/>
              {T.translate("evidence.no-info")}
            </div>
            :
            evidence.list.map(item => {
              return [
                wholeList === "false" ?
                <tr>
                  <td style={{width: "15%"}}>
                <p className="evidence-item" title={item.webName}>{item.webName}</p>
              </td>
                <td style={{width: "15%"}}><a href={item.url}/>
                  <p className="evidence-item" title={item.url}>{item.url}</p>
                </td>
                <td style={{width: "15%"}}>{fmt.format(item.createdAt)}</td>
                <td style={{width: "15%"}}>{item.completedAt ? fmt.format(item.completedAt) : "——"}</td>
                <td style={{width: "15%"}}>
                  <p className="evidence-item" title={item.remark}>{item.remark ? item.remark : "——"}</p>
                </td>
                <td className="more-operates" style={{width: "20%"}}>
                  <a target="blank" href={`/attestations/${item.id}`}>
                    <p>查看保全</p>
                  </a>
                  {/*  <p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
                  <p onClick={e => this.openDeleteModal(item)}>{T.translate("common.delete")}</p>
                </td>
              </tr>:
                <tr onClick={e => this.selectItem(item)}>
                  <td className="selected" style={{width: "5%"}}>
                    <input type="checkbox" name="select" checked={!!this.selectedItems[item.id]}/>
                  </td>
                  <td style={{width: "15%"}}>
                  <p className="evidence-item" title={item.webName}>{item.webName}</p>
                </td>
                  <td style={{width: "15%"}}><a href={item.url}/>
                    <p className="evidence-item" title={item.url}>{item.url}</p>
                  </td>
                  <td style={{width: "15%"}}>{fmt.format(item.createdAt)}</td>
                  <td style={{width: "15%"}}>{item.completedAt ? fmt.format(item.completedAt) : ""}</td>
                  <td style={{width: "15%"}}>
                    <p className="evidence-item" title={item.remark}>{item.remark}</p>
                  </td>
                  <td className="more-operates" style={{width: "20%"}}>
                    <a target="blank" href={`/attestations/${item.id}`}>
                      <p>{T.translate("home.learn-more-2")}</p>
                    </a>
                    {/*  <p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
                    <p onClick={e => this.openDeleteModal(item)}>{T.translate("common.delete")}</p>
                  </td>
                </tr>
                ]
              // return <tr>
              //   {
              //     wholeList === "false" ?
              //       "" :
              //       <td className="selected" style={{width: "5%"}}>
              //         <input type="checkbox" name="select" onClick={e => this.selectItem(item)}/>
              //       </td>
              //   }
              //   <td style={{width: "15%"}}>
              //     <p className="evidence-item" title={item.webName}>{item.webName}</p>
              //   </td>
              //   <td style={{width: "15%"}}><a href={item.url}/>
              //     <p className="evidence-item" title={item.url}>{item.url}</p>
              //   </td>
              //   <td style={{width: "15%"}}>{fmt.format(item.createdAt)}</td>
              //   <td style={{width: "15%"}}>{item.completedAt ? fmt.format(item.completedAt) : ""}</td>
              //   <td style={{width: "15%"}}>
              //     <p className="evidence-item" title={item.remark}>{item.remark}</p>
              //   </td>
              //   <td className="more-operates" style={{width: "20%"}}>
              //     <a target="blank" href={`/attestations/${item.id}`}>
              //       <p>{T.translate("home.learn-more-2")}</p>
              //     </a>
              //   {/*  <p onClick={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</p>*/}
              //     <p onClick={e => this.openDeleteModal(item)}>{T.translate("common.delete")}</p>
              //   </td>
              // </tr>
              //   ;
            })
        }
        </tbody>
      </table>

      <hr className="division" style={ wholeList === "false" ? styles.hide : {}}/>
      {
        wholeList === "false" ?
          "" :
          <Paginate previousLabel={"<"}
                    nextLabel={">"}
                    breakLable={<a href="">...</a>}
                    pageNum={evidence.totalPage}
                    forceSelected={evidence.pageNo}
                    marginPagesDisplayed={Page.PAGE_DISPLAY}
                    pageRangeDisplayed={Page.RANGE_DISPLAY}
                    clickCallback={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      }

      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteModal}>
          <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>{T.translate("evidence.delete")}</h1>
            <form className="confirm">
              <p>是否删除本条取证记录？</p>
              <div className="button-group">
                <button type="button" className="yes"
                        onClick={this.handleDeleteEvidence}>{T.translate("notification.delete")}</button>
                <button type="button" className="no"
                        onClick={this.closeDeleteModal}>{T.translate("common.cancel")}</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>

  }
}
