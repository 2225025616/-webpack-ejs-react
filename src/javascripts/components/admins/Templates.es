import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import Paginate from "react-paginate";
import TemplateStatus from "../../constants/TemplateStatus";
import ColumnInput from "../commons/ColumnInput";
import {findTemplates, auditTemplate,rejectTemplate} from "../../actions/adminAction";
import Formatter from "../../lib/formatter";
import { DateRangePicker } from "react-dates";
import LoadingButton from "../commons/LoadingButton";

@connect(
  state => {
    return {
      templates: state.admin.templates
    }
  }
)
export default class Templates extends Component {
  constructor(props) {
    super(props);
    this.resetCondition();
  } ;

  resetCondition() {
    this.pageNo = 0;
    this.status = "" ;
    this.keyWord = "" ;
  }

  state = {
    showAccept: false,
    showReject: false,
    startDate: '',
    endDate: '',
    pageSize: 10,
  };

  componentDidMount() {
    this.doQuery();
  };

  doQuery(props) {
    let pageNo = this.pageNo;
    let status = this.status;
    let keyWord = this.keyWord;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    this.props.dispatch(findTemplates({pageSize:this.state.pageSize,
      pageNo,
      status,
      keyWord,
      startDate,
      endDate,
    }));
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleAcceptDo = (e) => {
    this.wantTodo = e;
    this.setState({showAccept: true});
    this.forceUpdate();
  };

  closeAcceptModal = () => {
    this.setState({showAccept: false});
  };

  handleRejectDo = (e) => {
    this.wantTodo = e;
    this.setState({showReject: true});
    this.forceUpdate();
  };

  closeRejectModal = () => {
    this.setState({showReject: false});
  };

  handleAccept = () => {
    this.props.dispatch(auditTemplate(this.wantTodo.id, TemplateStatus.APPROVED,()=>{
      this.closeAcceptModal();
    })) ;
  } ;

  handleReject = () => {
    this.props.dispatch(rejectTemplate(this.wantTodo.id, TemplateStatus.REJECTED, this.reason,()=>{
      this.closeRejectModal();
    }));
  } ;

  handleReasonChange = e => {
    this.reason = e.target.value;
    this.forceUpdate();
  };

  templateStatus = (status) => {
    switch (status) {
      case 'IN_REVIEW':
        return "审核中";
      case 'APPROVED':
        return "已同意";
      case 'REJECTED':
        return "拒绝";
    }
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

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.status = this.status?this.status:'';
      this.state.startDate=this.state.startDate?this.state.startDate:'';
      this.state.endDate=this.state.endDate?this.state.endDate:'';
      this.pageNo = 0;
      this.keyWord = this.keyWord?this.keyWord:'';
      this.doQuery(this.props);
    }
  };

  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }
  render() {
    let {templates} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <section id="template-kyc">
      <div className="title">模板认证</div>
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">状态:</span>
          <select value={this.status} onChange={this.queryByStatus}>
            <option value ="">全部</option>
            <option value ="IN_REVIEW">待审核</option>
            <option value ="APPROVED">已同意</option>
            <option value ="REJECTED">已拒绝</option>
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
          <input placeholder="请输入机构名称/产品名称进行查询" type="text" className="search-input"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>申请时间</th>
          <th>机构名称</th>
          <th>产品名称</th>
          <th>模板名称</th>
          <th>审核时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        { templates.list ? templates.list.map(item => {
          return <tr key={item.id}>
            <td>{fmt.format(item.createdAt)}</td>
            <td>{item.organizationName}</td>
            <td>{item.productName}</td>
            <td>{item.title}</td>
            <td>{item.checkedAt ? fmt.format(item.checkedAt) : "———"}</td>
            <td>{this.templateStatus(item.state)}</td>
            <td className="operate">
              <a className="view-detail" target="_blank" href={`/templates/${item.id}`}>查看</a>
              {
                item.state=='IN_REVIEW'?
                  [
                    <button type="button" onClick={e=>this.handleAcceptDo(item)}>通过</button>,
                    <button type="button" onClick={e=>this.handleRejectDo(item)}>拒绝</button>
                  ]
                  :
                  ""
              }
            </td>
          </tr>
        }) : ""
        }
        </tbody>
      </table>

      {this.state.showAccept ?
        <ModalContainer onClose={this.closeAcceptModal}>
          <ModalDialog onClose={this.closeAcceptModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">审核模板</h1>
            <form className="model-confirm">
              <p>是否通过:<span className="delete-item">{this.wantTodo.title}</span>模板?</p>
              <div className="button-group">
                <button className="yes" type="button" onClick={this.handleAccept}>确定</button>
                <button className="no" type="button" onClick={this.closeAcceptModal}>取消</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}

      {this.state.showReject ?
        <ModalContainer onClose={this.closeRejectModal}>
          <ModalDialog onClose={this.closeRejectModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form autoComplete="off">
              <h1 className="admin-table-title">审核模板</h1>
              <article className="modal-content">
                <section>
                  <span className="title">拒绝原因</span>
                  <textarea placeholder="请输入拒绝原因" onChange={this.handleReasonChange}/>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className="blueButton"
                                 onClick={this.handleReject}
                                 label="确定"
                                 type="button"
                                 loadingLabel="提交中..."/>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}

      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{templates.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { templates.totalPage > 0 ? <Paginate previousLabel={"<"}
                                              nextLabel={">"}
                                              breakLable={<a href="">...</a>}
                                              pageNum={templates.totalPage}
                                              forceSelected={templates.pageNo}
                                              marginPagesDisplayed={5}
                                              pageRangeDisplayed={2}
                                              clickCallback={this.handlePageClick}
                                              containerClassName={"pagination"}
                                              subContainerClassName={"pages pagination"}
                                              activeClassName={"active"}/> : "" }
      </div>
    </section>
  }
}
