import React, { Component } from "react";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import Formatter from "../../lib/formatter";
import { findUserConsults } from "../../actions/adminAction";

@connect(
  state => {
    return {consults: state.admin.consults}
  }
)
export default class UserConsults extends Component {
  constructor(props) {
    super(props);
    this.pageNo = 0;
  }

  state = {
    pageSize: 10,
  };

  componentDidMount() {
    this.doQuery();
  }

  doQuery(props) {
    let page = this.pageNo;
    this.props.dispatch(findUserConsults({pageSize:this.state.pageSize,
      page
    }));
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  render() {
    let {consults} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <section id="company-kyc">
      <div className="title">用户咨询</div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>用户名称</th>
          <th>手机号码</th>
          <th>咨询时间</th>
          <th>咨询标题</th>
          <th>咨询内容</th>
        </tr>
        </thead>
        <tbody>
        { consults.list ? consults.list.map(item => {
          return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{fmt.format(item.createdAt)}</td>
            <td title={item.email}>{item.email}</td>
            <td title={item.company}>{item.company}</td>
          </tr>
        }) : ""  }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{consults.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { consults.totalPage > 0 ? <Paginate previousLabel={"<"}
                                             nextLabel={">"}
                                             breakLable={<a href="">...</a>}
                                             pageNum={consults.totalPage}
                                             forceSelected={consults.pageNo}
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
