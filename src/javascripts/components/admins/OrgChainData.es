import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Formatter from "../../lib/formatter";
import TokenUtil from "../../utils/TokenUtil";
import { findOrgChainData } from "../../actions/adminAction";
import Paginate from "react-paginate";
import { DateRangePicker } from "react-dates";


@connect(
  state => {
    return {orgChainData: state.admin.orgChainData}
  }
)


export default class OrgChainData extends Component {

  constructor(props) {
    super(props);
    this.resetCondition();
  }

  resetCondition() {
    this.pageNo = 0;
    this.keyWord = "" ;
  }

  state = {
    startDate: '',
    endDate: '',
    pageSize: 3,
  };


  componentWillMount() {
    this.doQuery();
  };

  date = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  doQuery(props) {
    let pageNo = this.pageNo;
    let keyWord = this.keyWord;
    let startDate = this.state.startDate === '' ? '' : this.date(this.state.startDate);
    let endDate = this.state.endDate === '' ? '' : this.date(this.state.endDate) === 0 ? "" : this.date(this.state.endDate);//日期选择中止时间
    this.props.dispatch(findOrgChainData({pageSize:this.state.pageSize,
      pageNo,
      keyWord,
      startDate,
      endDate,
    }));
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
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

  showPercent = (point) => {
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
  };

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.state.startDate = this.state.startDate?this.state.startDate:'';
      this.state.endDate = this.state.endDate?this.state.endDate:'';
      this.pageNo = 0;
      this.keyWord = '';
      this.doQuery(this.props);
    }
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }

  render() {
    let {orgChainData} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let uid = TokenUtil.uid;

    return <div id="company-kyc">
      <div className="title">企业上链数据</div>
      <div className="admin-table-search-bar">
        <div>
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
          <input placeholder="请输入企业名称进行查询" type="text" className="search-input"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>
      <table className="admin-table org-chain-data-table">
        <thead>
        <tr>
          <th>企业名称</th>
          <th>总数</th>
          <th>NO_CHECK</th>
          <th>PASS</th>
          <th>NOT_FOUND</th>
          <th>链</th>
          <th>NO_CHECK</th>
          <th>PASS</th>
          <th>NOT_FOUND</th>
          <th>未上链占比</th>
        </tr>
        </thead>
        <tbody>
        { orgChainData.list ? orgChainData.list.map(item => {
          return [
            <tr>
              <td rowSpan={item.chainDetail.length}>{item.name}</td>
              <td rowSpan={item.chainDetail.length}>{item.total}</td>
              <td rowSpan={item.chainDetail.length}>{item.totalNoCheck}</td>
              <td rowSpan={item.chainDetail.length}>{item.totalPass}</td>
              <td rowSpan={item.chainDetail.length}>{item.totalNotFound}</td>
              <td>{item.chainDetail[0].target ? item.chainDetail[0].target : 0}</td>
              <td>{item.chainDetail[0].totalNoCheck ? item.chainDetail[0].totalNoCheck : 0}</td>
              <td>{item.chainDetail[0].totalPass ? item.chainDetail[0].totalPass : 0}</td>
              <td>{item.chainDetail[0].totalNotFound ? item.chainDetail[0].totalNotFound : 0}</td>
              <td>{item.chainDetail[0].percent ? this.showPercent(item.chainDetail[0].percent) : 0}</td>
            </tr>,
            item.chainDetail.map((chain,i) => {
              return i !== 0 ?
               <tr key={i}>
                 <td>{chain.target ? chain.target : 0}</td>
                 <td>{chain.totalNoCheck ? chain.totalNoCheck : 0}</td>
                 <td>{chain.totalPass ? chain.totalPass : 0}</td>
                 <td>{chain.totalNotFound ? chain.totalNotFound : 0}</td>
                 <td>{chain.percent ? this.showPercent(chain.percent) : 0}</td>
                </tr>
              : ""
            })
            ,
          ]
        }) : ""  }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{orgChainData.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="3">3</option>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="30">30</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        {
          orgChainData.totalPage > 0 ? <Paginate previousLabel={"<"}
                                                 nextLabel={">"}
                                                 breakLable={<a href="">...</a>}
                                                 pageNum={orgChainData.totalPage}
                                                 forceSelected={orgChainData.pageNo}
                                                 marginPagesDisplayed={5}
                                                 pageRangeDisplayed={2}
                                                 clickCallback={this.handlePageClick}
                                                 containerClassName={"pagination"}
                                                 subContainerClassName={"pages pagination"}
                                                 activeClassName={"active"}/> : "" }
      </div>
    </div>;

  }
}
