import React, { Component } from "react";
import { reduxForm } from "redux-form";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import TokenUtil from "../../utils/TokenUtil";
import FormValidator from "../../utils/FormValidator";
import StorageUtil from "../../utils/StorageUtil";

import { addMember, findAllMembers, removeMember } from "../../actions/organizationAction";
import Modal from "../commons/Modal";
import LoadingButton from "../commons/LoadingButton";
import ConfirmModal from "../commons/ConfirmModal";

import T from "i18n-react";

const styles = {
  tBody: {
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #E0E0E0'
  },
  railsButton: {
    marginTop: 16,
    marginLeft: 8
  },
  modalButton: {
    marginTop: 8,
    float: "right"
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8
  },
  textfield: {
    width: "100%",
  }
};
const fields = ["phoneNumber"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("phoneNumber", "手机号码")
    .phoneNumber("phoneNumber", "手机号码")
    .errors;
};

@reduxForm(
  {form: "memberForm", fields, validate},
  state => {
    return {
      members: state.user.members,
      organization: state.organization.info,
      params: state.router.params
    };
  })
export default class Member extends Component {
  state = {
    open: false
  };

  handleInvite = () => {
    this.refs.modal.show();
  };

  handleClose = () => {
    this.refs.modal.hide();
  };

  constructor(props) {
    super(props);
    this.wantToDelete = {};
  }

  componentDidMount() {
    this.props.dispatch(
      findAllMembers(IdUtil.organizationId(this.props))
    );
  }

  handleDestroyMember = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(removeMember(organizationId, this.wantToDelete.id));
    this.refs.confirm.hide();
  };

  handleConfirmDestroyMember = e => {
    this.wantToDelete = e;
    this.forceUpdate();
    this.refs.confirm.show(e.phoneNumber);
  };

  handleAddMember = e => {
    e.preventDefault();

    this.props.dispatch(
      addMember(IdUtil.organizationId(this.props), this.props.fields.phoneNumber.value, () => {
          this.refs.modal.hide();
        }
      ));
  };

  render() {
    const {fields: {phoneNumber}, organization, members} = this.props;
    let uid = TokenUtil.uid;

    return <div className="container-wrapper">

      <div className="container members-manage">
        <ul className="breadcrumb">
          <li>{StorageUtil.organizationName()}</li>
          <li>{T.translate("sidebar.org-member")}</li>
        </ul>

        {/*<Table>
         <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
         <TableRow>
         <TableHeaderColumn>{T.translate("member.name")}</TableHeaderColumn>
         <TableHeaderColumn>{T.translate("member.phone-number")}</TableHeaderColumn>
         <TableHeaderColumn>{T.translate("member.done")}</TableHeaderColumn>
         </TableRow>
         </TableHeader>
         <TableBody displayRowCheckbox={false} style={styles.tBody}>
         {
         members.map(item => {
         return <TableRow key={item.id}>
         <TableRowColumn>{item.realName}</TableRowColumn>
         <TableRowColumn>{item.phoneNumber}</TableRowColumn>
         <TableRowColumn>
         {
         item.id != uid ?
         <FlatButton primary={true} label={T.translate("common.delete")}
         onClick={e => this.handleConfirmDestroyMember(item)}/> : ""
         }
         </TableRowColumn>
         </TableRow>
         })
         }
         </TableBody>
         </Table>*/}
        <div>
          <button label={T.translate("common.add-member")} style={styles.railsButton} onClick={this.handleInvite}/>
        </div>
      </div>
      <ConfirmModal ref="confirm" title={T.translate("common.delete-member")}
                    prompt={T.translate("common.input-delete-member")}
                    label={T.translate("common.delete")}
                    onConfirmOk={this.handleDestroyMember}/>

      <Modal ref="modal" title={T.translate("common.add-member")}>
        <form autoComplete="off" onSubmit={this.handleAddMember} className="form-group">
          <div className="cancel-button">
            <button style={styles.iconButton} onTouchTap={this.handleClose}/>
          </div>

          <input {...FormUtil.extract(phoneNumber)} type="text"
                 placeholder={T.translate("common.input-member-no")}
                 style={styles.textfield}
          />
          <LoadingButton style={styles.modalButton} type="submit"
                         label={T.translate("common.invite")}
                         buttonStyle="flat"
                         loadingLabel={T.translate("common.inviting")}/>
        </form>
      </Modal>
    </div>
  }
};
