import React, { Component } from "react";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import {findAdminUserKycs, sendUserKyc, rejectUserKyc} from "../../actions/adminAction";
import T from "i18n-react";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {toastr} from "react-redux-toastr";
import Formatter from "../../lib/formatter";
import { DateRangePicker } from "react-dates";


@connect(
  state => {
    return {kycs: state.admin.userKycs}
  }
)
export default class UserKyc extends Component {
  constructor(props) {
    super(props);
    this.wantToSend = {};
    this.resetCondition();
  }

  state = {
    showApplyModal: false,
    startDate: '',
    endDate: '',
    pageSize: 10,
  };

  resetCondition() {
    this.pageNo = 0;
    this.status = "" ;
    this.keyWord = "" ;
  }
  
  openApplyModal = (e) => {
    this.wantToSend = e;
    this.forceUpdate();
    this.setState({showApplyModal: true});
  };

  closeApplyModal = () => {
    this.setState({showApplyModal: false});
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  componentDidMount() {
    this.doQuery();
  }

  doQuery(props) {
    let pageNo = this.pageNo;
    let status = this.status;
    let keyWord = this.keyWord;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    this.props.dispatch(findAdminUserKycs({pageSize:this.state.pageSize,
      pageNo,
      status,
      keyWord,
      startDate,
      endDate,
    }));
  }

  handleSend = e => {
    this.props.dispatch(sendUserKyc(this.wantToSend.id, "PASS", () => {
      this.closeApplyModal();
    }));
  };

  handleReject = e => {
    if(!this.reason){
      toastr.error(T.translate("请输入拒绝原因"));
    } else {
      this.props.dispatch(rejectUserKyc(this.wantToSend.id, this.reason, "REJECT",()=>{
        this.closeApplyModal();
      }));
    }
  };

  handleReasonChange = e => {
    this.reason = e.target.value;
    this.forceUpdate();
  };
  
  getStatus = item => {
    if(item.status == "APPLY"){
      return "待审核";
    }else if (item.status == "PASS")
      return "已通过";
    else if (item.status == "REJECT")
      return <abbr title={item.rejectReason}>已拒绝</abbr>;
  };

  queryByStatus = (e) => {
    var value = e.target.value;
    if (this.status != value) {
      this.status = value;
      this.pageNo = 0;
      this.keyWord = '';
      this.doQuery(this.props);
    }
  };

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.status=this.status?this.status:'';
      this.state.startDate=this.state.startDate?this.state.startDate:'';
      this.state.endDate=this.state.endDate?this.state.endDate:'';
      this.pageNo = 0;
      this.keyWord =this.keyWord?this.keyWord:'';
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
    this.status = '';
    this.state.startDate = '';
    this.state.endDate = '';
    this.doQuery(this.props);
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }
  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };
    render() {
    let {kycs} =  this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
        return <section id="company-kyc">
      <div className="title">个人实名认证</div>
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">状态:</span>
          <select value={this.status} onChange={this.queryByStatus}>
            <option value ="">全部</option>
            <option value ="APPLY">待审核</option>
            <option value ="PASS">已通过</option>
            <option value ="REJECT">已拒绝</option>
          </select>
          <span className="search-type-name">日期:</span>
          <DateRangePicker
            startDatePlaceholderText="开始时间"
            endDatePlaceholderText="结束时间"
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
        </div>
        <div className="search-bar">
          <input placeholder="请输入手机号/姓名/身份证进行查询" type="text" className="search-input"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>姓名</th>
          <th>手机号</th>
          <th>身份证</th>
          <th>用户来源</th>
          <th>申请时间</th>
          <th>审核时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        { kycs.list ? kycs.list.map(item => {
          return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.idCard}</td>
            <td>{item.source ? item.source : "保全网"}</td>
            <td>{fmt.format(item.createdAt)}</td>
            <td>{item.status=='APPLY' ? '————' : fmt.format(item.checkedAt)}</td>
            <td>{this.getStatus(item)}</td>
            <td>
              <button onClick={e => this.openApplyModal(item)}>{item.status=='APPLY' ? '审核' : '查看'}</button>
            </td>
          </tr>
        }) : ""  }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{kycs.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { kycs.totalPage > 0 ? <Paginate previousLabel={"<"}
                                         nextLabel={">"}
                                         breakLable={<a href="">...</a>}
                                         pageNum={kycs.totalPage}
                                         forceSelected={kycs.pageNo}
                                         marginPagesDisplayed={5}
                                         pageRangeDisplayed={2}
                                         clickCallback={this.handlePageClick}
                                         containerClassName={"pagination"}
                                         subContainerClassName={"pages pagination"}
                                         activeClassName={"active"}/> : "" }
      </div>

      {this.state.showApplyModal ?
        <ModalContainer onClose={this.closeApplyModal}>
          <ModalDialog onClose={this.closeApplyModal} width={800} className="example-dialog" dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">个人审核</h1>
            <form className="admin-kyc-form">
              <article>
                <section>
                  <span>手机号:</span>
                  <span className="item">{this.wantToSend.phoneNumber}</span>
                </section>
                <section>
                  <span>姓名:</span>
                  <span className="item">{this.wantToSend.name}</span>
                </section>
                <section>
                  <span>身份证号:</span>
                  <span className="item">{this.wantToSend.idCard}</span>
                </section>
              </article>
              <div className="id-card">
                <p>身份证正反面</p>
                <div className="img-groups">
                  <a target=" _blank" href={this.wantToSend.idCardFront}>
                    <img className="first-img" src={this.wantToSend.idCardFront}/>
                  </a>
                  <a target=" _blank" className="back" href={this.wantToSend.idCardBack}>
                    <img src={this.wantToSend.idCardBack}/>
                  </a>
                </div>
              </div>
              <div className="reason">
                <p>如拒绝,请输入拒绝的原因:</p>
                <input className="form-control" placeholder="" onChange={this.handleReasonChange}/>
              </div>
              <div className="kyc-button-group">
                <button type="button" className="reject" onClick={this.handleReject}>审核拒绝</button>
                <button type="button" className="apply" onClick={this.handleSend}>审核通过</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </section>

  }
}
