import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Formatter from "../../lib/formatter";
import TokenUtil from "../../utils/TokenUtil";
import ColumnInput from "../commons/ColumnInput";
import Image from "../commons/Image";
import { addOrgSignAuth, findAllOrgSignAuth, editOrgSignAuth, editOrgSignStatus } from "../../actions/adminAction";
import Paginate from "react-paginate";
import { toastr } from "react-redux-toastr";
import LoadingButton from "../commons/LoadingButton";

let file = "";

const fields = ["orgcode"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("orgcode", "机构代码")
    .errors;
};

@reduxForm(
  {form: "adminUser", fields, validate},
  state => {
    return {
      orgSignAuth: state.admin.orgSignAuth,
    };
  })


export default class OrgSignAuthorize extends Component {

  constructor(props) {
    super(props);
    this.resetCondition();
  }

  resetCondition() {
    this.pageNo = 0;
    this.selectItem = [];
    this.option = "";
  }

  state = {
    showAddModal: false,
    showDeleteModal: false,
    edit: false,
    pageSize: 10,
  };

  componentDidMount() {
    this.doQuery();
  };

  doQuery(props) {
    let pageNo = this.pageNo;
    this.props.dispatch(findAllOrgSignAuth({pageSize:this.state.pageSize,
      pageNo,
    }));
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  openEditModal = (e, option) => {
    this.selectItem = e;
    this.option = option;
    this.forceUpdate();
    this.setState({showEditModal: true});
  };

  closeEditModal = () => {
    this.setState({showEditModal: false});
  };

  openAddModal = (e) => {
    if (e.id) {
      this.selectItem = e;
      this.setState({edit: true});
      let {fields: {orgcode}} = this.props;
      orgcode.value = this.selectItem.orgcode;
    } else {
      this.setState({edit: false});
    }
    file = "";
    this.forceUpdate();
    this.setState({showAddModal: true});
  };

  closeAddModal = () => {
    this.setState({showAddModal: false});
  };

  changeAuthStatus = () => {
    this.props.dispatch(editOrgSignStatus(this.selectItem.id, this.option, () => {
      this.closeEditModal();
      this.selectItem = [];
      this.forceUpdate();
    }));
  };

  changeAuthFile = (e) => {
    file = e.target.files;
    if (file.length > 0) {
      this.forceUpdate();
    }
  };

  addAuth = () => {
    let {fields: {orgcode}} = this.props;
    let data = {
      orgcode: orgcode.value,
      file,
      id: ""
    };
    if (!orgcode.value)
      toastr.error("请输入机构代码");
    else if(file === "") {
      toastr.error("请上传授权照片")
    } else {
      this.props.dispatch(addOrgSignAuth(data, ()=>{
        this.closeAddModal();
        orgcode.value = "";
        this.forceUpdate();
      }));
    }
  };

  editAuth = () => {
    let {fields: {orgcode}} = this.props;
    let data = {
      orgcode: orgcode.value,
      file,
      id: this.selectItem.id
    };
    this.props.dispatch(editOrgSignAuth(data, ()=>{
      this.closeAddModal();
      this.selectItem = [];
      orgcode.value = "";
      this.forceUpdate();
    }));
  };

  showStatus = (status) => {
    switch (status) {
      case "INIT":
        return "授权中";
      case "DONE":
        return "已授权";
      case "DELETED":
        return "已取消";
    }
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
    let {fields: {orgcode}, orgSignAuth} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let uid = TokenUtil.uid;

    return <div id="company-kyc">
      <div className="title">企业授权</div>
      <button className="add-org-auth" onClick={this.openAddModal}>新增</button>
      <table className="admin-table">
        <thead>
        <tr>
          <th>企业名称</th>
          <th>授权时间</th>
          <th>机构代码</th>
          <th>授权照片</th>
          <th>授权状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        { orgSignAuth.list ? orgSignAuth.list.map(item => {
          return [
            <tr>
              <td>{item.name}</td>
              <td>{item.authorizedAt ? fmt.format(item.authorizedAt) : "─────"}</td>
              <td>{item.orgcode}</td>
              <td>
                <a target=" _blank" href={item.fileKey}>
                  <img className="sign-image" src={item.fileKey}/>
                </a>
              </td>
              <td>{this.showStatus(item.status)}</td>
              <td>
                {
                  item.status === "DELETED" || item.status === "INIT" ? [
                    <button onClick={e => this.openAddModal(item)}>编辑</button>,
                    <button onClick={e => this.openEditModal(item, "DONE")}>
                      { item.status === "DELETED" ? "重新授权" : "授权"}</button>
                  ]
                    :
                    <button onClick={e => this.openEditModal(item, "DELETED")}>取消授权</button>
                }
              </td>
            </tr>
          ]
        }) : ""  }
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{orgSignAuth.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        { orgSignAuth.totalPage > 0 ? <Paginate previousLabel={"<"}
                                                nextLabel={">"}
                                                breakLable={<a href="">...</a>}
                                                pageNum={orgSignAuth.totalPage}
                                                forceSelected={orgSignAuth.pageNo}
                                                marginPagesDisplayed={5}
                                                pageRangeDisplayed={2}
                                                clickCallback={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}/> : "" }
      </div>
      {this.state.showAddModal ?
        <ModalContainer onClose={this.closeAddModal}>
          <ModalDialog onClose={this.closeAddModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form autoComplete="off">
              <h1 className="admin-table-title">新增企业授权</h1>
              <article className="modal-content add-sign-auth-model">
                <section>
                  <span className="title">机构代码</span>
                  <ColumnInput placeholder="请输入机构代码" {...FormUtil.extract(orgcode)} file={orgcode}/>
                </section>
                <section>
                  <span className="title">授权照片</span>
                  <Image
                    altSrc={require('images/default-product-logo.png')}
                    src={(file && file[0]) || this.selectItem.fileKey}/>
                  <div className="upload-org-sign-file">
                    <input type="file" onChange={this.changeAuthFile} accept="image/jpg, image/png, image/jpeg"/>
                    <span>上传</span>
                  </div>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className={orgcode.value ? 'blueButton' : 'disable'}
                                 onClick={this.state.edit ? this.editAuth : this.addAuth}
                                 label="确定"
                                 type="button"
                                 loadingLabel="上传中..."/>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}

      {this.state.showEditModal ?
        <ModalContainer onClose={this.closeEditModal}>
          <ModalDialog onClose={this.closeEditModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">企业授权</h1>
            <form className="model-confirm">
              <p>确定{this.option == "DELETED" ? "删除" : "重新进行"}:
                <span className="delete-item">{this.selectItem.name}</span>
                授权?
              </p>
              <div className="button-group">
                <button type="button" className="yes" onClick={this.changeAuthStatus}>确定</button>
                <button type="button" className="no" onClick={this.closeEditModal}>取消</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>;

  }
}
