import React, { Component } from "react";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import {
  createSignatureMember,
  deleteSignatureMember,
  findSignatureMembers,
  updateSignatureMember
} from "../../actions/signatureAction";
import ColumnInput from "../commons/ColumnInput";

const fields = ["phone", "name"];
const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("notarization.name"))
    .phoneNumber("phone", T.translate("common.phone-number"))
    .errors;
};

@reduxForm(
  {form: "signatureMemberForm", fields, validate},
  state => {
    return {
      members: state.signature.members,
      params: state.router.params,

      // onSubmit: (values,dispatch) => {
      //   dispatch(createSignatureMember({... values}
      //
      //   ));
      // }
    };
  })

export default class SignatureMember extends Component {
  state = {
    loading: true,
    showNewModal: false,
    showDeleteModal: false,
    edit: false,
  };

  constructor(props) {
    super(props);
    this.item = {};
  }

  componentDidMount() {
    this.props.dispatch(findSignatureMembers(() => this.setState({loading: false})));
  }

  openNewModal = item => {
    if (item.id) {
      this.setState({edit: true});
      this.item = item;
      let {fields: {phone, name}} = this.props;
      name.value = item.linkName;
      phone.value = item.linkPhone;
      this.forceUpdate();
    } else {
      this.setState({edit: false});
    }
    this.setState({showNewModal: true});
  };

  closeNewModal = () => {
    this.setState({showNewModal: false});
    let {fields: {phone, name}} = this.props;
    phone.value = '';
    name.value = '';
    this.item = {};
    this.forceUpdate();
  };

  openDeleteModal = item => {
    this.setState({showDeleteModal: true});
    this.item = item;
    this.forceUpdate();
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  handleAddMember = e => {
    e.preventDefault();
    let {fields: {phone, name}} = this.props;
    this.props.dispatch(createSignatureMember({phone: phone.value, name: name.value}, "pc",
      () => {
        this.closeNewModal();
      }
    ));
  };

  handleDeleteMember = () => {
    this.props.dispatch(deleteSignatureMember(this.item.id,
      () => {
        this.closeDeleteModal();
      }));
  };

  handleUpdateMember = e => {
    e.preventDefault();

    let {fields: {phone, name}} = this.props;
    if (!phone.value)
      phone.value = this.item.linkPhone;
    if (!name.value)
      name.value = this.item.linkName;

    this.props.dispatch(updateSignatureMember(this.item.id, {phone: phone.value, name: name.value},
      () => {
        this.closeNewModal();
      }
    ));
  };

  render() {
    const {fields: {phone, name}, members} = this.props;

    return <div className="container-wrapper">
      <div className="container signature-member member-container">
        <p className="table-name">{T.translate("sidebar.linkmans")}</p>
        <article className="member-content">
          <button className="word float-btn" onClick={this.openNewModal}>
            <b>+&nbsp;{T.translate("signature.add-linkman")}</b>
          </button>
          <table className="member-table">
            <thead>
            <tr>
              <td>{T.translate("signature.sign-name")}</td>
              <td>{T.translate("signature.account")}</td>
              <td>{T.translate("notary.operate")}</td>
            </tr>
            </thead>
            <tbody>
            {
              this.state.loading ?
                <div className="table-placeholder" colSpan="6">
                  <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
                  {T.translate("common.loading")}
                </div>
                : members.length > 0 ?
                members.map(item => {
                  return <tr>
                    <td>{item.linkName}</td>
                    <td>{item.linkPhone}</td>
                    <td>
                      <button onClick={e => this.openNewModal(item)}
                              className="word float-btn">{T.translate("common.edit")}</button>
                      <button onClick={e => this.openDeleteModal(item)}
                              className="word float-btn">{T.translate("common.delete")}</button>
                    </td>
                  </tr>
                }) : <div className="table-placeholder" colSpan="6">
                <img src={require('images/members/placeholder-attestations-list.png')} alt=""/><br/>
                {T.translate("common.no-member")}
              </div>
            }
            </tbody>
          </table>
        </article>
        {this.state.showNewModal ?
          <ModalContainer onClose={this.closeNewModal}>
            <ModalDialog onClose={this.closeNewModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{this.state.edit ? T.translate("signature.edit-linkman") : T.translate("signature.add-linkman")}</h1>
              <form onSubmit={this.state.edit ? this.handleUpdateMember : this.handleAddMember}>
                <article>
                  <section>
                    <span>{T.translate("notarization.name")}</span>
                    <ColumnInput placeholder={T.translate("common.input-member-name")}
                                 type="text" {...FormUtil.extract(name)} file={name}/>
                  </section>
                  <section>
                    <span>{T.translate("common.phone-number")}</span>
                    <ColumnInput placeholder={T.translate("common.input-member-no")}
                                 type="text" {...FormUtil.extract(phone)} file={phone}/>
                  </section>
                  <section className="button-group">
                    <span/>
                    <button type="submit" className="yes">{T.translate("common.submit")}</button>
                    <button type="button" className="no"
                            onClick={this.closeNewModal}>{T.translate("common.cancel")}</button>
                  </section>
                </article>
              </form>
            </ModalDialog>
          </ModalContainer>
          : ""}
        {this.state.showDeleteModal ?
          <ModalContainer onClose={this.closeDeleteModal}>
            <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("signature.delete-linkman")}</h1>
              <form className="confirm">
                <p>{T.translate("signature.confirm-delete-linkman")}</p>
                <div className="button-group">
                  <button type="button" className="yes"
                          onClick={this.handleDeleteMember}>{T.translate("common.delete")}</button>
                  <button type="button" className="no"
                          onClick={this.closeDeleteModal}>{T.translate("common.cancel")}</button>
                </div>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
        <div>
        </div>
      </div>
    </div>
  }
};
