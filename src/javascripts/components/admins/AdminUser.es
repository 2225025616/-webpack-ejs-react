import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Formatter from "../../lib/formatter";
import TokenUtil from "../../utils/TokenUtil";
import ColumnInput from "../commons/ColumnInput";
import { addAdminUser, removeAdminUser, findAllAdminUsers } from "../../actions/adminAction";
import LoadingButton from "../commons/LoadingButton";

const fields = ["phoneNumber", "name"];

let closeModel = false;

const validate = values => {
  return new FormValidator(values)
    .phoneNumber("phoneNumber", "手机号码")
    .nonEmpty("name", "姓名")
    .errors;
};

@reduxForm(
  {form: "adminUser", fields, validate},
  state => {
    return {
      users: state.admin.users,
      onSubmit: (values, dispatch) => {
        dispatch(addAdminUser(values,()=>{
          closeModel = true;
        }));
      }
    };
  })


export default class AdminUser extends Component {
  state = {
    showAddModal: false,
    showDeleteModal: false,
    deleteId: "",
  };
  
  handleAddAdminUser = (values, dispatch) => {
    this.props.handleSubmit(values, dispatch);
  };
  
  openAddAdminUser = () => {
    this.setState({showAddModal: true});
    closeModel = false;
  };
  
  closeAddAdminUser = () => {
    this.setState({showAddModal: false});
  };
  
  openDeleteAdminUser = (e) => {
    this.setState({showDeleteModal: true, deleteId: e});
  };
  
  closeDeleteAdminUser = () => {
    this.setState({showDeleteModal: false});
  };
  
  addAdminUser = (e) => {
    this.props.dispatch(addAdminUser(values.phoneNumber));
    this.closeAddAdminUser();
  };
  
  toRemoveAdminUser = () => {
    this.props.dispatch(removeAdminUser(this.state.deleteId, () => {
      this.closeDeleteAdminUser();
    }));
  };

  constructor(props) {
    super(props);
    this.keyWord = "";
  }

  componentDidMount() {
    this.doQuery();
  };

  doQuery(props) {
    this.props.dispatch(findAllAdminUsers({keyWord: this.keyWord}));
  }

  componentWillReceiveProps(nextProps) {
    if (closeModel === true)
      this.closeAddAdminUser();
  }

  handleKeyWordChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  handleKeyWordQuery = e => {
    if (e)
      e.preventDefault();
    this.doQuery(this.props);
  };
    handleKeydown=(e)=>{
        if(e.keyCode===13){
            this.handleKeyWordQuery();
        }
    }
  render() {
    let {fields: {phoneNumber, name}, users} = this.props;
    console.log(users);
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let uid = TokenUtil.uid;

    return <div id="admin-users">
      <div className="title">管理员</div>
      <div className="admin-table-search-bar">
        <div>
        </div>
        <div className="search-bar">
          <input placeholder="请输入手机号/姓名进行查询" type="text" className="search-input"
                 value={this.keyWord} onChange={this.handleKeyWordChange} onKeyDown={this.handleKeydown}/>
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>
      <button className="add-admin-user" onClick={this.openAddAdminUser}>新增成员</button>
      <table className="admin-table">
        <thead>
        <tr>
          <th>姓名</th>
          <th>电话号码</th>
          <th>加入时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map(item => {
            return <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{fmt.format(item.createdAt)}</td>
              <td>
                {item.id != uid ?
                  <button onClick={e => this.openDeleteAdminUser(item.id)}>删除</button> : ""
                }
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
      
      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteAdminUser}>
          <ModalDialog onClose={this.closeDeleteAdminUser} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form>
              <h1 className="admin-table-title">删除管理员</h1>
              <div className="model-confirm">
                <p>确定删除该管理员？</p>
                <div className="button-group">
                  <button type="button" className="yes" onClick={this.toRemoveAdminUser}>确定</button>
                  <button type="button" className="no" onClick={this.closeDeleteAdminUser}>取消</button>
                </div>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
      {this.state.showAddModal ?
        <ModalContainer show>
          <ModalDialog onClose={this.closeAddAdminUser} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form onSubmit={this.handleAddAdminUser}>
              <h1 className="admin-table-title">邀请管理员</h1>
              <article className="modal-content">
                <section>
                  <span className="title">姓名</span>
                  <ColumnInput placeholder="请输入姓名" {...FormUtil.extract(name)} file={name}/>
                </section>
                <section>
                  <span className="title">手机号</span>
                  <ColumnInput placeholder="请输入新增管理员手机号" {...FormUtil.extract(phoneNumber)} file={phoneNumber}/>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className={phoneNumber.value && name.value? 'blueButton' : 'disable'}
                                 label="添加"
                                 type="submit"
                                 loadingLabel="添加中..."/>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>;

  }
}
