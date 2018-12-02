import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Formatter from "../../lib/formatter";
import TokenUtil from "../../utils/TokenUtil";
import ColumnInput from "../commons/ColumnInput";
import Image from "../commons/Image";
import { findAllPackages, deletePackages } from "../../actions/adminAction";
import Paginate from "react-paginate";
import { toastr } from "react-redux-toastr";
import AdminRoute from './AdminRoute'
import Link from "../commons/LangLink";
import push from "../../utils/push";


let authPic = "";

const fields = ["orgName", "orgCode"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("orgName", "企业名称")
    .nonEmpty("orgCode", "机构代码")
    .errors;
};

const getInitialValues = state => {
  return {
    ...state.admin.packages,
  };
};

@reduxForm(
  {form: "adminUser", fields, validate},
  state => {
    return {
      initialValues: {
        ... getInitialValues(state)
      },
      packages: state.admin.packages,
    };
  })


export default class Packages extends Component {

  constructor(props) {
    super(props);
    this.resetCondition();
  }

  resetCondition() {
    this.pageNo = 0;
    this.selectItem = [];
    this.productType = "URLATTESTATION";
  }

  state = {
    showAddModal: false,
    showDeleteModal: false,
    pageSize: 10,
  };

  componentDidMount() {
    this.doQuery();
  };

  doQuery(props) {
    let pageNo = this.pageNo;
    let productType = this.productType;
    this.props.dispatch(findAllPackages({pageSize:this.state.pageSize,
      pageNo,
      productType
    }));
  }

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.pageNo = 0;
      this.productType = this.productType?this.productType:'';
      this.doQuery(this.props);
    }
  };

  queryByType = (e) => {
    var value = e.target.value;
    if (this.productType != value) {
      this.productType = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  openDeleteModal = (e) => {
    this.selectItem = e;
    this.forceUpdate();
    this.setState({showDeleteModal: true});
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  deletePackage = () => {
    this.props.dispatch(deletePackages(this.selectItem.id, () => {
      this.closeDeleteModal();
    }));
  };

  showObject = (e) => {
    switch (e) {
      case "ALL" :
        return "全部";
      case "PERSONAL" :
        return "个人";
      case "ENTERPRISE" :
        return "企业";
    }
  };

  toEdit = (id) => {
    let adminRoute = AdminRoute.adminRoute();
    this.props.dispatch(push(`/${adminRoute}/packages/${id}`));
  };

  render() {
    let {fields: {orgName, orgCode}, packages} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let uid = TokenUtil.uid;
    let adminRoute = AdminRoute.adminRoute();
    
    return <div id="company-kyc">
      <div className="title">套餐管理</div>
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">产品:</span>
          <select value={this.productType} onChange={this.queryByType}>
            <option value="URLATTESTATION">网页取证</option>
            <option value="ECONTRACT">电子签约</option>
          </select>
        </div>
        <div className="search-bar">
          <Link to={`/${adminRoute}/packages/new`}>
            <button className="search">新增</button>
          </Link>
        </div>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>产品名称</th>
          <th>适用对象</th>
          <th>套餐名称</th>
          <th>套餐价格（元）</th>
          <th>次数</th>
          <th>有效期（年）</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {
          packages.list ?
            packages.list.map(item => {
              return <tr>
                <td>{item.productType == "URLATTESTATION" ? "网页取证" : "电子签约"}</td>
                <td>{this.showObject(item.object)}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.usedCount}</td>
                <td>{item.expiryDate}</td>
                <td>
                  <button onClick={e => this.toEdit(item.id)}>编辑</button>
                  <button onClick={e => this.openDeleteModal(item)}>删除</button>
                </td>
              </tr>
            })
            : ""
        }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{packages.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { packages.totalPage > 0 ? <Paginate previousLabel={"<"}
                                             nextLabel={">"}
                                             breakLable={<a href="">...</a>}
                                             pageNum={packages.totalPage}
                                             forceSelected={packages.pageNo}
                                             marginPagesDisplayed={5}
                                             pageRangeDisplayed={2}
                                             clickCallback={this.handlePageClick}
                                             containerClassName={"pagination"}
                                             subContainerClassName={"pages pagination"}
                                             activeClassName={"active"}/> : "" }
      </div>
      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteModal}>
          <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">删除套餐</h1>
            <form className="model-confirm">
              <p>是否删除:<span className="delete-item">{this.selectItem.name}</span>?</p>
              <div className="button-group">
                <button type="button" className="yes" onClick={this.deletePackage}>删除</button>
                <button type="button" className="no" onClick={this.closeDeleteModal}>取消</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>;

  }
}
