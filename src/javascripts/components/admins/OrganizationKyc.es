import React, { Component } from "react";
import { reduxForm } from "redux-form"; // 第三方form 中间插件
import Paginate from "react-paginate"; // 第三方分页插件
import {findOrganizationKycs, sendOrganizationKyc, rejectOrganizationKyc, addOrgAuth} from "../../actions/adminAction"; // 封装后的接口
import T from "i18n-react";
import {ModalContainer, ModalDialog} from 'react-modal-dialog'; // 第三方弹框
import Formatter from "../../lib/formatter"; // 时间格式化
import FormValidator from "../../utils/FormValidator"; // input输入 正则判断
import { DateRangePicker } from "react-dates";
import ColumnInput from "../commons/ColumnInput"; // input组件
import FormUtil from "../../utils/FormUtil"; // formList Rule
import LoadingButton from "../commons/LoadingButton";

let showAddModal = false;
const fields = ["name", "orgcode", "phone"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", "企业名称")
    .nonEmpty("orgcode", "统一社会信用代码")
    .phoneNumber("phone", "手机号")
    .errors;
};


@reduxForm({form: "add-org-reject", fields, validate}, state => {
  return {
    kycs: state.admin.organizationKycs,

    onSubmit: (values, dispatch) => {
      dispatch(addOrgAuth({...values}, () => {
        showAddModal = false;
        dispatch(findOrganizationKycs({pageSize:8,
          pageNo:0}));
      }));
    }
  }
})

export default class OrganizationKyc extends Component {
  constructor(props) {
    super(props);
    this.wantToSend = {};
    this.resetCondition();
  }

  state = {
    showApplyModal: false,
    // showRefuseModal: false,
    // showAddModal: false,
    startDate: '',
    endDate: '',
    pageSize: 10,
  };

  resetCondition() {
    this.pageNo = 0;
    this.status = "" ;
    this.keyWord = "" ;
  }

  componentDidMount() {
    this.doQuery(this.props);
  }

  doQuery(props) {
    let pageNo = this.pageNo;
    let status = this.status;
    let keyWord = this.keyWord;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    this.props.dispatch(findOrganizationKycs({pageSize:this.state.pageSize,
      pageNo,
      status,
      keyWord,
      startDate,
      endDate,
    }));
  }

  openApplyModal = (e) => {
    this.wantToSend = e;
    this.forceUpdate();
    this.setState({showApplyModal: true});
  };

  closeApplyModal = () => {
    this.setState({showApplyModal: false});
  };

  openAddModal = () => {
    showAddModal = true;
    this.forceUpdate();
  };

  closeAddModal = () => {
    showAddModal = false;
    this.forceUpdate();
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleSend = e => {
    this.props.dispatch(sendOrganizationKyc(this.wantToSend.id, "PASS", () => {
      this.closeApplyModal();
    }));
  };

  handleReject = e => {
    if(!this.reason){
      toastr.error(T.translate("请输入拒绝原因"));
    } else {
      this.props.dispatch(rejectOrganizationKyc(this.wantToSend.id, this.reason, "REJECT",()=>{
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
    console.log(value)
  };

  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };

  render() {
    let {fields: {phone, orgcode, name}, kycs, handleSubmit} =  this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <section id="company-kyc">
      <div className="title">组织实名认证</div>
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
          <input className="search-input" placeholder="请输入手机号/组织名称进行查询" type="text"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>

      <button className="add-org" onClick={e => this.openAddModal()}>新增企业认证</button>

      <table className="admin-table">
        <thead>
        <tr>
          <th>组织名称</th>
          <th>手机号</th>
          <th>统一社会信用代码</th>
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
            <td>{item.orgcode}</td>
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
          <ModalDialog onClose={this.closeApplyModal} width={800} className="example-dialog " dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">企业审核</h1>
            <form className="org-kyc-form">
              <article>
                <section>
                  <span>企业名称:</span>
                  <span className="item">{this.wantToSend.name}</span>
                </section>
                <section>
                  <span>统一社会信用代码:</span>
                  <span className="item">{this.wantToSend.orgcode}</span>
                </section>
                <section>
                  <span>企业地址:</span>
                  <span className="item">{this.wantToSend.street}</span>
                </section>
              </article>
              <article>
                <section>
                  <span>企业开户名称:</span>
                  <span className="item">{this.wantToSend.orgAccountname}</span>
                </section>
                <section>
                  <span>企业开户银行:</span>
                  <span className="item">{this.wantToSend.orgAccountbank}</span>
                </section>
                <section>
                  <span>企业银行账号:</span>
                  <span className="item">{this.wantToSend.orgAccountno}</span>
                </section>
              </article>
              <article>
                <section>
                  <span>联系人:</span>
                  <span className="item">{this.wantToSend.contactName}</span>
                </section>
                <section>
                  <span>手机号:</span>
                  <span className="item">{this.wantToSend.phoneNumber}</span>
                </section>
                <section>
                  <span>邮箱:</span>
                  <span className="item">{this.wantToSend.contactEmail}</span>
                </section>
              </article>
              <div className="img-group">
                <section className="licence">
                  <p>营业执照:</p>
                  <a target=" _blank" href={this.wantToSend.licenceFilekey}>
                    <img src={this.wantToSend.licenceFilekey}/>
                  </a>
                </section>
                <section>
                  <p>认证公函:</p>
                  <a target=" _blank" href={this.wantToSend.authorizaFilekey}>
                    <img src={this.wantToSend.authorizaFilekey}/>
                  </a>
                </section>
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
      {showAddModal ?
        <ModalContainer onClose={this.closeAddModal}>
          <ModalDialog onClose={this.closeAddModal} width={665} className="example-dialog" dismissOnBackgroundClick={true}>


            <form onSubmit={handleSubmit}>
              <h1 className="admin-table-title">新增企业认证</h1>
              <article className="modal-content org-kyc-model">
                <section>
                  <span className="title">企业名称</span>
                  <ColumnInput {...FormUtil.extract(name)} file={name}/>
                </section>
                <section>
                  <span className="title">联系人电话</span>
                  <ColumnInput {...FormUtil.extract(phone)} file={phone}/>
                </section>
                <section>
                  <span className="title">联系人电话</span>
                  <ColumnInput {...FormUtil.extract(orgcode)} file={orgcode}/>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className={name.value && phone.value && orgcode.value? 'blueButton' : 'disable'}
                                 label="确定"
                                 type="submit"
                                 loadingLabel="提交中..."/>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </section>
  }
}
