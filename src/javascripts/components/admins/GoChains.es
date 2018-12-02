import React, { Component } from "react";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import {gochains,reSubmitChains} from "../../actions/adminAction";
import T from "i18n-react";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {toastr} from "react-redux-toastr";
import Formatter from "../../lib/formatter";


@connect(
  state => {
    return {chains: state.admin.chains,}
  }
)
export default class GoChains extends Component {
  constructor(props) {
    super(props);
    this.wantToSend = {};
    this.resetCondition();
  }

  state = {
    showApplyModal: false,
    pageSize: 10,
  };

  resetCondition() {
    this.pageNo = 0;
    this.checkStatus = "" ;
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

  queryByCheckStatus = (e) => {
    if (this.checkStatus !== e.target.value) {
      this.checkStatus = e.target.value;
      this.pageNo = 0;
      this.keyWord = '';
      this.doQuery(this.props);
    }
  };

  componentDidMount() {
    this.doQuery();
  }

  doQuery(props) {
    let pageNo = this.pageNo;
    let checkStatus = this.checkStatus;
    let keyWord = this.keyWord;
    this.props.dispatch(gochains({pageSize:this.state.pageSize,
      pageNo,
      checkStatus,
      keyWord,
    }));
  }

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.pageNo = 0;
      this.keyWord = this.keyWord?this.keyWord:'';
      this.checkStatus = this.checkStatus?this.checkStatus:"" ;
      this.doQuery(this.props);
    }
  };

  queryByStatus = (e) => {
    var value = e.target.value;
    if (this.status != value) {
      this.status = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleKeyWordChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  handleChainsQuery = e => {
    if (e)
      e.preventDefault();
    this.status = '';
    this.doQuery(this.props);
  };
  handleToChains = () => {
    let result = [];
    for (let item in this.selectedItems) {
      result.push(this.selectedItems[item].batchNo);
    }
    this.toChain(result);
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleChainsQuery();
        }
    }
  // reSubmitChain(batchNo){
  //   let result = [];
  //   result.push(batchNo);
  //   this.toChain(result);
  // }
  toChain(items) {
    this.props.dispatch(reSubmitChains({
      batchNo: items,
    }, () => {this.doQuery(this.props);}));
  }
  render() {
    const {chains}= this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <section id="company-kyc">
      <div className="title">上链信息</div>
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">状态:</span>
          <select value={this.status} onChange={this.queryByCheckStatus}>
            <option value="">全部</option>
            <option value="NO_CHECK">NO_CHECK</option>
            <option value="PASS">PASS</option>
            <option value="NOT_FOUND">NOT_FOUND</option>
          </select>
        </div>
        <div className="search-bar">
          <input placeholder="请输入保全号进行查询" type="text" className="search-input"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleChainsQuery}>搜索</button>
        </div>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>保全号</th>
          <th>保全时间</th>
          <th>区块链类别</th>
          <th>上链状态</th>
        </tr>
        </thead>
        <tbody>
        { chains.list ? chains.list.map(item => {
          return <tr key={item.batchNo}>
            <td>{item.attestationId}</td>
            <td>{fmt.format(item.completedAt)}</td>
            <td>{item.attestTarget}</td>
            <td>{item.checkStatus}</td>
          </tr>
        }) : ""  }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{chains.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { chains.totalPage > 0 ? <Paginate previousLabel={"<"}
                                           nextLabel={">"}
                                           breakLable={<a href="">...</a>}
                                           pageNum={chains.totalPage}
                                           forceSelected={chains.pageNo}
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
