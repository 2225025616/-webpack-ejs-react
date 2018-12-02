import React, { Component } from "react";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import { deleteSignature, getSignature, getSignatureBykeyWord } from "../../actions/signatureAction";
import T from "i18n-react";
import { DateRangePicker } from "react-dates";
import SignatureStatus from "../../constants/SignatureStatus";
import Link from "../commons/LangLink";
import AttestationUtil from "../../utils/AttestationUtil";
import LanguageUtil from "../../utils/LanguageUtil";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import MallProductType from "../../utils/MallProductType.es";
import { getBalance } from "../../actions/userAction.es";
import push from "../../utils/push";
import cx from "classnames";
import StorageUtil from "../../utils/StorageUtil.es";

const styles = {
  hide: {
    display: 'none',
  },
}

@connect(state => {
    return {
      signatures: state.signature.lists,
      location: state.router.location,
      balanceHolder: state.user.balanceHolder,
    };
  }
)
export default class CommonSignatureList extends Component {

  constructor(props) {
    super(props);
    this.resetCondition();
  };

  state = {
    loading: true,
    startDate: '',
    endDate: '',
    showCancelModal: false,
    showDisableModal: false,
    signType: ''
  };

  currentSign = {};

  resetCondition() {
    this.keyWord = "";
    this.status = "";
    this.pageNo = 0;
    this.pageSize = 10;
  }

  componentDidMount() {
    let { size } = this.props;
    this.pageSize = size;

    if (this.props.location.query.status) {
      this.status = this.props.location.query.status;
      this.forceUpdate();
    }
    this.doQuery(this.props);
    this.props.dispatch(getBalance());
  }

  date = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  doQuery = (props) => {
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    let status = this.status;

    this.props.dispatch(getSignature({
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      status,
      startDate,
      endDate,
    }, () => this.setState({loading: false})));
  };

  queryByStatus = (e) => {
    this.keyWord = "";
    let value = e.target.value;
    if (this.status !== value) {
      this.status = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleKeyWorkChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  handleSignatureQuery = e => {  //点击搜索按钮时 将pageNo置为0
    if (e)
      e.preventDefault();
    this.state.startDate = '';
    this.state.endDate = '';
    this.status = "";
    this.forceUpdate();

    this.props.dispatch(getSignatureBykeyWord({
      pageNo: 0,
      pageSize: this.pageSize,
      keyWord: this.keyWord,
    }));
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.forceUpdate();

    if (this.keyWord) {   //判断分页按钮是属于哪个方法的分页
      this.props.dispatch(getSignatureBykeyWord({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        keyWord: this.keyWord,
      }));
    } else {
      this.doQuery(this.props);
    }
  };

  showUsers = (user) => {
    return user.split(",");
  };

  openCancelModal = (item) => {
    return () => {
      this.setState({showCancelModal: true});
      this.currentSign = item;
    }
  };

  closeCancelModal = () => {
    this.setState({showCancelModal: false});
  };


  handleDeleteOrder = (id) => {
    this.props.dispatch(deleteSignature(id, () => {
      this.closeCancelModal();
    }));
  };

  toSign = (signature) => {
    return e => {
      const {dispatch, balanceHolder} = this.props,
        count = balanceHolder.econtract || {},
        perCount = count.free + (count.nofree ? count.nofree.per : 0),
        orgCount = (count.nofree ? count.nofree.org : 0);

      if (signature.signType === 'personal') {
        if (!perCount) {
          return this.disableModal(true, T.translate('signature.personal-sign'))();
        }
      } else {
        if (!orgCount) {
          return this.disableModal(true, T.translate('signature.org-sign'))();
        }
      }
      dispatch(push(`/signatures/${signature.id}/add-seal`));
    }
  };

  disableModal = (showDisableModal, signType) => () => this.setState({showDisableModal, signType});

  render() {
    let {signatures, balanceHolder} = this.props,
      fmt = Formatter.get("yyyy/mm/dd hh:MM:ss"),
      count = balanceHolder.econtract || {},
      perCount = count.free + (count.nofree ? count.nofree.per : 0),
      orgCount = (count.nofree ? count.nofree.org : 0);
    let { wholeList } = this.props;
    let isOrg = StorageUtil.showOrganization();

    return <div>
      <div className="table-search-bar member-search-bar-first" style={ wholeList === "false" ? styles.hide : {}}>
        <div className="table-container">
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
              this.keyWord = "";
              this.doQuery(this.props);
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => {
              this.setState({focusedInput});
            }}
          />
          <select value={this.status} onChange={this.queryByStatus}>
            <option value="">{T.translate("signature.all-status")}</option>
            <option value="DRAFT">{T.translate("template.darft")}</option>
            <option value="WAIT_ME">{T.translate("signature.wait-me")}</option>
            <option value="WAIT_OTHERS">{T.translate("signature.wait-other")}</option>
            <option value="DONE">{T.translate("signature.finished")}</option>
            <option value="CANCEL">{T.translate("signature.canceled")}</option>
            <option value="EXPIRE">{T.translate("signature.outside")}</option>
            <option value="REJECT">{T.translate("signature.refuse")}</option>
          </select>
        </div>
        <div className="search">
          <input placeholder={T.translate("signature.search-tip")} ref="query" id="search-key" type="text"
                 name="query"
                 value={this.keyWord} onChange={this.handleKeyWorkChange}/>
          <i className="iconfont font-search" onClick={this.handleSignatureQuery}/>
        </div>
      </div>

      <table className="common-table-list">
        <thead>
        <tr>
          <th style={{width: "15%"}}>{T.translate("signature.start-at")}</th>
          <th style={{width: "14%"}}>{T.translate("signature.title")}</th>
          <th style={{width: "15%"}}>{T.translate("signature.member")}</th>
          <th style={{width: "15%"}}>{T.translate("signature.status")}</th>
          <th style={{width: "15%"}}>{T.translate("signature.end-at")}</th>
          <th style={{width: "9%"}}>备注</th>
          <th style={{width: "17%"}} className="operate-name">{T.translate("notary.operate")}</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.loading ?
            <div className="table-placeholder" colSpan="6">
              <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
              {T.translate("common.loading")}
            </div>
            : signatures.totalPage === 0 ?
            <div className="table-placeholder" colSpan="4">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/><br/>
              没有相关合同信息
            </div>
            :
            signatures.list.map(item => {
              return <tr>
                <td style={{width: "15%"}}>{fmt.format(item.createAt)}</td>
                <td style={{width: "14%"}}>
                  <p className="sign-name" title={item.title}>{item.title}</p>
                </td>
                <td style={{width: "15%"}} title={item.signUser}>{item.signUser ?
                  this.showUsers(item.signUser).map(user => {
                    return <span className="sign-user">{user}</span>;
                  })
                  : "——"
                }</td>
                <td style={{width: "15%"}}>{SignatureStatus.toStatus(item.status)}</td>
                <td
                  style={{width: "15%"}}>{item.endAt !== "" ? fmt.format(item.endAt) : T.translate("signature.forever")}</td>
                <td style={{width: "9%"}}>
                  <p className="sign-name" title={item.remark}>{item.remark}</p>
                </td>
                <td className="operates" style={{width: "17%"}}>
                  {
                    item.status !== 'DRAFT' ?
                      isOrg === "true" ?
                        <Link to={`/signatures/${item.id}`}>
                          <p>{T.translate("signature.detail")}</p>
                        </Link>
                        :
                        <Link to={`/signatures/personal/${item.id}`}>
                          <p>{T.translate("signature.detail")}</p>
                        </Link>
                      : ''
                  }
                  {
                    item.status === 'DONE' ?
                      [
                        <a target="_blank"
                           href={AttestationUtil.getSignDownloadUrl(item) + "&lang=" + LanguageUtil.lang}>
                          <p>{T.translate("common.download")}</p>
                        </a>,
                        <a target="_blank"
                           href={AttestationUtil.viewSignature(item) + "&lang=" + LanguageUtil.lang}>
                          <p>{T.translate("signature.view")}</p>
                        </a>
                      ]
                      : ''
                  }
          {/*        {
                    item.status === 'WAIT_ME' ?
                      <Link to={`/signatures/${item.id}/add-seal`}>
                        <p>{T.translate("signature.to-sign")}</p>
                      </Link>
                      : ''
                  }*/}
         {/*         {
                    item.status === 'DRAFT' ? [
                        <p onClick={this.toSign(item)}>{T.translate("signature.draft-start")}</p>,
                        <p onClick={this.openCancelModal(item)}>{T.translate("notification.delete")}</p>
                      ]
                      : ''
                  }*/}
                </td>
              </tr>;
            })
        }
        </tbody>
      </table>

      <hr style={ wholeList === "false" ? styles.hide : {}} className="division"/>
      {signatures.totalPage > 0 && wholeList === "true" ?
        <Paginate previousLabel={"<"}
                  nextLabel={">"}
                  breakLable={<a href="">...</a>}
                  pageNum={signatures.totalPage}
                  forceSelected={signatures.pageNo}
                  marginPagesDisplayed={Page.PAGE_DISPLAY}
                  pageRangeDisplayed={Page.RANGE_DISPLAY}
                  clickCallback={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/> : ""}

      {this.state.showCancelModal ?
        <ModalContainer onClose={this.closeCancelModal}>
          <ModalDialog onClose={this.closeCancelModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>{T.translate("signature.delete-sign")}</h1>
            <form className="confirm">
              <p>{T.translate("signature.confirm-delete-sign")}?</p>
              <div className="button-group">
                <button type="button" className="yes"
                        onClick={e => this.handleDeleteOrder(this.currentSign.id)}>{T.translate("order.ok")}</button>
                <button type="button" className="no"
                        onClick={this.closeCancelModal}>{T.translate("common.cancel")}</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
      {this.state.showDisableModal ?
        <ModalContainer onClose={this.disableModal(false)}>
          <ModalDialog onClose={this.disableModal(false)} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>{T.translate("user.remind")}</h1>
            <form className="confirm">
              <p>{T.translate("signature.not-enough", {type: this.state.signType})}</p>
              <div className="button-group">
                <Link to={`/mall?productType=${MallProductType.eContract}`}>
                  <button type="button" className="yes">{T.translate("common.buy")}</button>
                </Link>
                <button type="button" className="no"
                        onClick={this.disableModal(false)}>{T.translate("common.cancel")}</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>
  }
}
