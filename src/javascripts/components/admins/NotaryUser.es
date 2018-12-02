import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Formatter from "../../lib/formatter";
import TokenUtil from "../../utils/TokenUtil";
import ColumnInput from "../commons/ColumnInput";
import { addNotaryUser, removeNotaryUser, findAllNotaryUsers } from "../../actions/adminAction";
import LoadingButton from "../commons/LoadingButton";

const fields = ["phoneNumber", "organizationName"];

let closeModel = false;

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("organizationName", "公证机构")
    .phoneNumber("phoneNumber", "手机号码")
    .errors;
};

@reduxForm(
  {form: "notaryUser", fields, validate},
  state => {
    return {
      users: state.admin.notaryUsers,
      onSubmit: (values, dispatch) => {
        dispatch(addNotaryUser(values.phoneNumber, values.organizationName, ()=> {
          closeModel = true;
        }));
      }
    };
  }
)
export default class NotaryUser extends Component {
  constructor(props) {
    super(props);
    this.wantToDelete = {};
  }

  state = {
    showAddModal: false,
    showDeleteModal: false,
    deleteId: "",
  };

  componentDidMount() {
    this.props.dispatch(findAllNotaryUsers());
  };

  componentWillReceiveProps(nextProps) {
    if (closeModel === true)
      this.closeAddNotaryUser();
  }

  handleAddNotaryUser = (values, dispatch) => {
    this.props.handleSubmit(values, dispatch);
  };

  openAddNotaryUser = () => {
    this.setState({showAddModal: true});
    closeModel = false;
  };

  closeAddNotaryUser = () => {
    this.setState({showAddModal: false});
  };

  openDeleteNotaryUser = (e) => {
    this.setState({showDeleteModal: true, deleteId: e});
  };

  closeDeleteNotaryUser = () => {
    this.setState({showDeleteModal: false});
  };

  addNotaryUser = (e) => {
    this.props.dispatch(addNotaryUser(values.phoneNumber));
    this.closeAddNotaryUser();
  };

  toRemoveNotaryUser = () => {
    this.props.dispatch(removeNotaryUser(this.state.deleteId, ()=>{
      this.props.dispatch(findAllNotaryUsers());
      this.closeDeleteNotaryUser();
    }));
  };

  render() {
    let {fields: {phoneNumber, organizationName}, users} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let uid = TokenUtil.uid;

    return <div id="notary-users">
      <div className="title">公证员</div>

      <button className="add-notary-user" onClick={this.openAddNotaryUser}>新增成员</button>
      <table className="admin-table">
        <thead>
        <tr>
          <th>电话号码</th>
          <th>公证机构</th>
          <th>加入时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map(item => {
            return <tr key={item.id}>
              <td>{item.phoneNumber}</td>
              <td>{item.organizationName}</td>
              <td>{fmt.format(item.createdAt)}</td>
              <td>
                { item.id != uid ?
                  <button onClick={e => this.openDeleteNotaryUser(item.id)}>删除</button> : ""
                }
              </td>
            </tr>
          })
        }
        </tbody>
      </table>

      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteNotaryUser}>
          <ModalDialog onClose={this.closeDeleteNotaryUser} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form>
              <h1 className="admin-table-title">删除公证员</h1>
              <div className="model-confirm">
                <p>确定删除该公证员？</p>
                <div className="button-group">
                  <button type="button" className="yes" onClick={this.toRemoveNotaryUser}>确定</button>
                  <button type="button" className="no" onClick={this.closeDeleteNotaryUser}>取消</button>
                </div>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
      {this.state.showAddModal ?
        <ModalContainer onClose={this.closeAddNotaryUser}>
          <ModalDialog onClose={this.closeAddNotaryUser} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form onSubmit={this.handleAddNotaryUser}>
              <h1 className="admin-table-title">邀请公证员</h1>
              <article className="modal-content">
                <section>
                  <span className="title">手机号</span>
                  <ColumnInput placeholder="请输入新增公证员手机号" {...FormUtil.extract(phoneNumber)} file={phoneNumber}/>
                </section>
                <section>
                  <span className="title">所属机构</span>
                  <ColumnInput placeholder="请输入公证员所属机构" {...FormUtil.extract(organizationName)} file={organizationName}/>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className={phoneNumber.value && organizationName.value ? 'blueButton' : 'disable'}
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
