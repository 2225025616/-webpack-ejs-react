import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import { getSignatures } from "../../actions/adminAction";
import Formatter from "../../lib/formatter";
import Paginate from "react-paginate";

@connect(
  state => {
    return {signatures: state.admin.signatures}
  }
)

export default class AdminSignatures extends Component {
  constructor(props) {
    super(props);
    this.resetCondition();
  }

  resetCondition() {
    this.pageNo = 0;
    this.keyWord = "" ;
    this.type = "" ;
  }

  state = {
    pageSize: 10,
  };

  componentWillMount() {
    this.doQuery(this.props);
  }

  doQuery(props) {
    let pageNo = this.pageNo;
    let keyWord = this.keyWord;
    let type = this.type;
    this.props.dispatch(getSignatures({pageSize:this.state.pageSize,
      pageNo,
      keyWord,
      type,
    }));
  }

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.pageNo = 0;
      this.keyWord = this.keyWord?this.keyWord:"";
      this.type = this.type?this.type:"";
      this.doQuery(this.props);
    }
  };

  changeType = (e) => {
    var value = e.target.value;
    this.type = value;
    this.keyWord = "";
    this.pageNo = 0;
    this.forceUpdate();
    this.doQuery(this.props);
  };

  changeKeyWord = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  handleKeyWordQuery = e => {
    if (e)
      e.preventDefault();
    this.pageNo = 0;
    this.type = "";
    this.doQuery(this.props);
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  signType = (type) => {
    if(type == "enterprise"){
      return "企业";
    } else if(type == "personal"){
      return "个人";
    }
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }
  render() {
    let {signatures} =  this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div id="company-kyc">
      <div className="title">电子合同</div>
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">名称:</span>
          <input className="search-input" placeholder="请输入手机号或名称" type="text" value={this.keyWord} onChange={this.changeKeyWord} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
          <select className="admin-sign-select" value={this.type} onChange={this.changeType}>
            <option value ="">全部</option>
            <option value ="personal">个人</option>
            <option value ="enterprise">企业</option>
          </select>
        </div>
      </div>

      <table className="admin-table">
        <thead>
        <tr>
          <th>手机号</th>
          <th>名称</th>
          <th>途径</th>
          <th>类型</th>
          <th>签署次数</th>
          <th>首次签署时间</th>
          <th>最近签署时间</th>
        </tr>
        </thead>
        <tbody>
        { signatures.list ? signatures.list.map(item => {
          return <tr key={item.id}>
            <td>{item.phoneNumber}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{this.signType(item.econtractCountType)}</td>
            <td>{item.total}</td>
            <td>{fmt.format(item.firstSignAt)}</td>
            <td>{fmt.format(item.latestSignAt)}</td>
          </tr>
        }) : "" }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{signatures.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { signatures.totalPage > 0 ? <Paginate previousLabel={"<"}
                                               nextLabel={">"}
                                               breakLable={<a href="">...</a>}
                                               pageNum={signatures.totalPage}
                                               forceSelected={signatures.pageNo}
                                               marginPagesDisplayed={5}
                                               pageRangeDisplayed={2}
                                               clickCallback={this.handlePageClick}
                                               containerClassName={"pagination"}
                                               subContainerClassName={"pages pagination"}
                                               activeClassName={"active"}/> : "" }
      </div>
    </div>
  }
}