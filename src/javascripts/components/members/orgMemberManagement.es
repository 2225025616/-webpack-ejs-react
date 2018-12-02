import React, { Component } from "react";
import { reduxForm } from "redux-form";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import TokenUtil from "../../utils/TokenUtil";
import FormValidator from "../../utils/FormValidator";
import { addMember, findAllMembers, removeMember } from "../../actions/organizationAction";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import Formatter from "../../lib/formatter/index";
import moment from "moment";
import T from "i18n-react";
import ActionTypes from "../../constants/ActionTypes";

const style = {
  active: {
    borderBottom: '1px solid #fff',
    backgroundColor: '#fff'
  },
};
const fields = ["phoneNumber", 'key'];

let trusty = true;
let type = "TRUSTY";

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("phoneNumber", "手机号码")
    .phoneNumber("phoneNumber", "手机号码")
    .errors;
};

@reduxForm(
  {form: "apiKeys", fields},
  state => {
    return {
      members: state.user.members,
      organization: state.organization.info,
      params: state.router.params,
    }
  })

export default class orgMemberManagement extends Component {

  constructor(props) {
    super(props);
    this.wantToDelete = {};
  }

  state = {
    showItem: 'key',
    showAddMemberModal: false,
    showDeleteMemberModal: false,
    showDeleteKeyModal: false,
  };

  openAddMemberModal = () => {
    this.setState({showAddMemberModal: true});
  };

  closeAddMemberModal = () => {
    this.setState({showAddMemberModal: false});
  };

  openDeleteMemberModal = () => {
    this.setState({showDeleteMemberModal: true});
  };

  closeDeleteMemberModal = () => {
    this.setState({showDeleteMemberModal: false});
  };

  componentDidMount() {
    this.props.dispatch(
      findAllMembers(IdUtil.organizationId(this.props))
    );
  }

  handleDestroyMember = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(removeMember(organizationId, this.wantToDelete.id));
    this.closeDeleteMemberModal();
  };

  handleConfirmDestroyMember = e => {
    this.wantToDelete = e;
    this.forceUpdate();
    this.openDeleteMemberModal();
  };

  handleAddMember = e => {
    e.preventDefault();

    this.props.dispatch(
      addMember(IdUtil.organizationId(this.props), this.props.fields.phoneNumber.value, () => {
          this.closeAddMemberModal()
        }
      ));
  };

  changeItem = (value) => {
    return () => {
      this.state.showItem = value;

      this.setState({});
    }
  };

  handleChangeType = e => {
    trusty = !trusty;
    this.forceUpdate();
  };

  changeType = (e) => {
    type = e.target.value;
    this.forceUpdate();
  };

  render() {
    let { fields: { phoneNumber}, organization, members} = this.props;
    let uid = TokenUtil.uid;
    let fmt = Formatter.get("yyyy-mm-dd");
    let item = this.state.showItem;

    return <div className="container-wrapper">
      <div className="container member-container">
        <p className="table-name">成员管理</p>
        <div className="management member-content">
          <article className="member">
            <button className="blueButton add" onClick={this.openAddMemberModal}>{T.translate("common.add-member")}</button>
            {this.state.showAddMemberModal ?
              <ModalContainer onClose={this.closeAddMemberModal}>
                <ModalDialog onClose={this.closeAddMemberModal} width={665} className="example-dialog"
                             dismissOnBackgroundClick={true}>
                  <h1>{T.translate("common.add-member")}</h1>
                  <form>
                    <article>
                      <section>
                        <span>{T.translate("common.member-phone")}</span>
                        <input type="text"
                               placeholder={T.translate("common.input-member-no")} {...FormUtil.extract(phoneNumber)}/>
                      </section>
                      <section className="button-group">
                        <span/>
                        <button type="button" className="yes"
                                onClick={this.handleAddMember}>{T.translate("common.invite")}</button>
                        <button type="button" className="no"
                                onClick={this.closeAddMemberModal}>{T.translate("common.cancel")}</button>
                      </section>
                    </article>
                  </form>
                </ModalDialog>
              </ModalContainer>
              : null}
            <table className="common-table-list">
              <thead>
              <tr>
                <th style={{width: "33%"}}>{T.translate("common.manager-name")}</th>
                <th style={{width: "33%"}}>{T.translate("common.contact")}</th>
                <th style={{width: "34%"}}>{T.translate("notary.operate")}</th>
              </tr>
              </thead>
              <tbody>
              {
                members.map(item => {
                  return <tr key={item.id}>
                    <td style={{width: "33%"}}>{item.realName}</td>
                    <td style={{width: "33%"}}>{item.phoneNumber}</td>
                    <td style={{width: "34%"}}>
                      {
                        item.id !== uid ?
                          <span className="deleted"
                                onClick={e => this.handleConfirmDestroyMember(item)}>{T.translate("common.delete")}</span>
                          : ""
                      }
                    </td>
                    {this.state.showDeleteMemberModal ?
                      <ModalContainer onClose={this.closeDeleteMemberModal}>
                        <ModalDialog onClose={this.closeDeleteMemberModal} width={665} className="example-dialog"
                                     dismissOnBackgroundClick={true}>
                          <h1>{T.translate("common.delete-member")}</h1>
                          <form>
                            <article>
                              <section>
                                <span>{T.translate("common.member-phone")}</span>
                                <p className="warn">{this.wantToDelete.phoneNumber}</p>
                              </section>
                              <section className="button-group">
                                <span/>
                                <button type="button" className="yes"
                                        onClick={this.handleDestroyMember}>{T.translate("order.ok")}</button>
                                <button type="button" className="no"
                                        onClick={this.closeDeleteMemberModal}>{T.translate("common.cancel")}</button>
                              </section>
                            </article>
                          </form>

                        </ModalDialog>
                      </ModalContainer>
                      : null}
                  </tr>
                })
              }
              </tbody>
            </table>

          </article>

        </div>
      </div>
    </div>
  }
};
