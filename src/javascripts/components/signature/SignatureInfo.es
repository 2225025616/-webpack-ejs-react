import React, { Component } from "react";
import IdUtil from "../../utils/IdUtil";
import T from "i18n-react";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import RowInput from "../commons/RowInput";
import { reduxForm } from "redux-form";
import { SingleDatePicker } from "react-dates";
import { findSignatureMembers, postSignatureInfo } from "../../actions/signatureAction";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { goBack } from "redux-router";
import { toastr } from "react-redux-toastr";
import BackMenu from "../commons/BackMenu";

const fields = ["title", "remarks"];
let userPhone = "";

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("title", T.translate("signature.title"))
    .errors;
};

@reduxForm({form: "addSignature", fields, validate}, state => {
  return {
    user: state.user.info,
    members: state.signature.members,
    params: state.router.params,
  }
})

export default class SignatureInfo extends Component {

  constructor(props) {
    super(props);
    this.count = 1;
    this.select = {};
    this.linkPhone = "";
    this.linkName = "";
    this.default = true;
  }

  state = {
    date: '',
    showMemberModal: false,
    member: [{
      name: '',
      phone: '',
      id: this.count,
    }],
  };

  componentDidMount() {
    this.props.dispatch(findSignatureMembers());
    const {user} = this.props;
    userPhone = user.phoneNumber;
  };

  componentWillReceiveProps(nextProps) {

  };

  handleGoBack = () => {
    this.props.dispatch(goBack());
  };

  openMemberModal = (item) => {
    this.selectMember(item);
    this.forceUpdate();
    this.setState({showMemberModal: true});
  };

  closeMemberModal = () => {
    this.setState({showMemberModal: false});
  };

  addRow = () => {
    this.count += 1;
    const newMember = this.state.member;
    newMember.push({
      name: '',
      phone: '',
      id: this.count,
    });
    this.setState({member: newMember});
  };

  removeRow = item => {
    const DelMember = this.state.member;
    let newMember = DelMember.filter(x => item.id !== x.id);
    this.setState({member: newMember});
  };

  selectMember = (item) => {
    this.select = item;
    this.forceUpdate();
  };

  updateMemberName = (e) => {
    let member = this.state.member;
    for (let i = 0; i < member.length; i++) {
      if (this.select.id === member[i].id) {
        this.state.member[i] = {name: e.target.value, phone: this.select.phone, id: this.select.id};
        this.forceUpdate();
      }
    }
  };

  updateMemberPhone = (e) => {
    let member = this.state.member;
    for (let i = 0; i < member.length; i++) {
      if (userPhone === e.target.value) {
        toastr.error(T.translate("signature.not-add-current"));
        break;
      }
      if (member[i].phone === e.target.value) {
        toastr.error(T.translate("signature.setting"));
        break;
      }
      if (this.select.id === member[i].id) {
        this.state.member[i] = {name: this.select.name, phone: e.target.value, id: this.select.id};
        this.forceUpdate();
      }
    }
  };

  getDate = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  addSignature = e => {
    e.preventDefault();
    const id = IdUtil.signatureId(this.props);
    let array = [userPhone];
    for (let i = 0; i < this.state.member.length; i++) {
      if (this.state.member[i].phone !== "") {
        array.push(
          this.state.member[i].phone,
        );
      }
    }

    let endAt = this.state.date === '' ? '' : this.getDate(this.state.date) === 0 ? "" : this.getDate(this.state.date);
    let title = this.props.fields.title.value;
    let remark = this.props.fields.remarks.value;

    if(array.length<=1){
      toastr.error("请添加签署方");
    } else if(!title){
      toastr.error("请填写合同标题");
    } else {
      this.props.dispatch(postSignatureInfo(id, {
        remark,
        title,
        endAt,
        phone: array,
      }));
    }
  };

  changeLinkMan = (e) => {
    this.linkPhone = e.target.value;
    const {members} = this.props;
    for (let i = 0; i < members.length; i++) {
      if (this.linkPhone === members[i].linkPhone) {
        this.linkName = members[i].linkName
      }
    }
    this.default = false;
    this.forceUpdate();
  };

  updateMember = () => {
    for (let i = 0; i < this.state.member.length; i++) {
      if (this.state.member[i].phone === this.linkPhone) {
        toastr.error(T.translate("signature.setting"));
        break;
      }
      if (this.select.id === this.state.member[i].id) {
        this.state.member[i] = {name: this.linkName, phone: this.linkPhone, id: this.select.id};
        this.forceUpdate();
        this.closeMemberModal();
      }
    }
  };

  clearDate = () => {
    this.setState({date: ""});
  };


  render() {
    const {fields: {title, remarks}, members, user} = this.props;
    if (members[0] && this.default) {
      this.linkPhone = members[0].linkPhone;
      this.linkName = members[0].linkName;
    }
    return <div className="container-wrapper">
      <div className="container member-container">
        <div className="signature-info">
          <BackMenu title={T.translate("signature.setting")}/>
          <div className="member-content">
          <form className="signature-form" onSubmit={this.addSignature}>
            <div className="signatory">
              <div className="head">
                <button type="button" onClick={this.addRow}>{T.translate("signature.add-sign-member")}</button>
              </div>
              <table className="members" id="tableId">
                <thead>
                <tr>
                  <th style={{width: "25%"}}>{T.translate("signature.sign-way")}</th>
                  <th style={{width: "25%"}}>{T.translate("signature.sign-name")}</th>
                  <th style={{width: "25%"}}>{T.translate("signature.account")}</th>
                  <th style={{width: "25%"}} className="operate">{T.translate("common.operate")}</th>
                </tr>
                </thead>
                <tbody id="table">
                <tr>
                  <td style={{width: "25%"}}>{T.translate("signature.launch")}</td>
                  <td style={{width: "25%"}}>{user.realName}</td>
                  <td style={{width: "25%"}}>{user.phoneNumber}</td>
                  <td style={{width: "25%"}} className="operate">——</td>
                </tr>
                {
                  this.state.member.map((item, index) => {
                    return <tr key={index}>
                      <td style={{width: "25%"}}>{T.translate("signature.member")}</td>
                      <td style={{width: "25%"}}>
                        <input value={item.name} onChange={this.updateMemberName}
                               onFocus={e => this.selectMember(item)}/>
                      </td>
                      <td style={{width: "25%"}}>
                        <input value={item.phone} onChange={this.updateMemberPhone}
                               onFocus={e => this.selectMember(item)}/>
                      </td>
                      <td style={{width: "25%"}} className="operate">
                        {
                          members[0] ?
                            <span
                              onClick={e => this.openMemberModal(item)}>{T.translate("signature.select-link")}</span>
                            :
                            ""
                        }
                        <span onClick={e => this.removeRow(item)}>{T.translate("common.delete")}</span>
                      </td>
                    </tr>
                  })
                }
                </tbody>
              </table>
            </div>
            <div className="sign-detail">
              <h2>{T.translate("signature.setting-info")}</h2>
              <section>
                <span>{T.translate("signature.title")}</span>
                <RowInput placeholder="" type="text" {...FormUtil.extract(title)} file={title} width="340" height="45"/>
              </section>
              <section>
                <span>{T.translate("signature.end-time")}</span>

                <SingleDatePicker
                  placeholder={T.translate("signature.select-end-time")}
                  date={this.state.date}
                  onDateChange={date => this.setState({date})}
                  focused={this.state.focused}
                  onFocusChange={({focused}) => this.setState({focused})}
                />
                <span className="clear-date" onClick={this.clearDate}>清空</span>
                <span className="end-date-tip">{T.translate("signature.select-date")}</span>
              </section>
              <section>
                <span>{T.translate("evidence.remarks")}</span>
                <textarea {...FormUtil.extract(remarks)}/>
              </section>
              <button type="submit" className="blueButton submit">{T.translate("common.next")}</button>
            </div>
          </form>
          </div>
        </div>

        {this.state.showMemberModal ?
          <ModalContainer onClose={this.closeMemberModal}>
            <ModalDialog onClose={this.closeMemberModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("signature.select-link")}</h1>
              <form>
                <article>
                  <section>
                    <span className="contact-name">{T.translate("organizarion.contact-name")}</span>
                    <select value={this.linkPhone} onChange={this.changeLinkMan} className="selece-member">
                      {
                        members.map(item => {
                          return <option value={item.linkPhone}>
                            {item.linkName}
                          </option>;
                        })
                      }
                    </select>
                  </section>
                  <section className="button-group">
                    <span/>
                    <button type="button" className="yes" onClick={this.updateMember}>{T.translate("order.ok")}</button>
                    <button type="button" className="no"
                            onClick={this.closeMemberModal}>{T.translate("common.cancel")}</button>
                  </section>
                </article>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>
    </div>

  }
}
