import React, { Component } from "react";
import { reduxForm } from "redux-form";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import TokenUtil from "../../utils/TokenUtil";
import FormValidator from "../../utils/FormValidator";
import { addApiKey, findApiKeys, removeApiKey } from "../../actions/organizationAction";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import Formatter from "../../lib/formatter/index";
import moment from "moment";
import T from "i18n-react";
import ActionTypes from "../../constants/ActionTypes";
import {toastr} from "react-redux-toastr";

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
      organization: state.organization.info,
      apiKeys: state.organization.apiKeys,
      inNewKey: state.organization.inNewKey,
      params: state.router.params,
      orgInfo: state.organization.orgInfo,
      location: state.router.location,
      onSubmit: (values, dispatch) => {
        let id = IdUtil.organizationId(state.router);
        console.log(type);
        dispatch(addApiKey(id, {key: values.key, type}));
      }
    }
  })

export default class orgKeyManagement extends Component {

  constructor(props) {
    super(props);
    this.wantToDelete = {};
  }

  state = {
    showItem: 'key',
    showDeleteKeyModal: false,
  };

  openDeleteKeyModal = (item) => {
    this.wantToDelete = item;
    this.forceUpdate();
    this.setState({showDeleteKeyModal: true});
  };

  closeDeleteKeyModal = () => {
    this.setState({showDeleteKeyModal: false});
  };

  componentDidMount() {
    let organizationId = IdUtil.organizationId(this.props);
    if (organizationId) {
      this.props.dispatch(findApiKeys(organizationId));
    }
    const { location, orgInfo } = this.props;
    if(orgInfo.rsaCount === 0 && location.query.from){
      toastr.info("请先设置密钥");
    }

  }

  handleDestroyKey = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(removeApiKey(organizationId,this.wantToDelete.id));
    this.closeDeleteKeyModal();
  };

  changeItem = (value) => {
    return () => {
      this.state.showItem = value;

      this.setState({});
    }
  };

  handleNewKey = e => {
    type = "TRUSTY";
    this.forceUpdate();
    trusty = true;
    if (!this.props.inNewKey) {
      this.props.dispatch({type: ActionTypes.SWITCH_TO_NEW_KEY});
    }
  };

  handleCloseNewKey = e => {
    if (this.props.inNewKey) {
      this.props.dispatch({type: ActionTypes.CLOSE_TO_NEW_KEY});
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
    let {apiKeys, fields: {key, phoneNumber}, handleSubmit, inNewKey, organization} = this.props;
    let uid = TokenUtil.uid;
    let fmt = Formatter.get("yyyy-mm-dd");
    let item = this.state.showItem;

    return <div className="container-wrapper">
      <div className="container member-container">
        <p className="table-name">{T.translate("sidebar.attestation-manage")}</p>
        <div className="management member-content">
          <article className="key">
            {
              apiKeys.length === 0 ?
                <div>
                  <p className="no-kyc-tip">{T.translate("apikey.new-key")}</p>
                </div>
                :
                apiKeys.map(item => {
                    return <div className="content-info">
                      <div className="org-info">
                        <div className="api-key">
                          <img
                            src={require(item.type === "TRUSTY" ? "images/members/api-keys-trusty.png" : "images/members/api-keys-sandbox.png")}/>
                          <p>{item.type === "TRUSTY" ? T.translate("apikey.product") : T.translate("apikey.test") }</p>
                        </div>
                        <div className="info-key">
                          <p className="access-key">Access Key：{item.id}</p>
                          <p>{T.translate("apikey.org-name")}：{item.subjectName}</p>
                          <p>{T.translate("apikey.cert-org")}：{item.issuerName}</p>
                          <p>{T.translate("apikey.validate")}：{fmt.format(item.notAfter) }</p>
                          <div className="use-time">
                            {
                              !item.lastUsedAt ?
                                T.translate("apikey.never-use") : T.translate("apikey.last-use") + moment(item.lastUsedAt).fromNow()
                            }
                          </div>
                        </div>
                            <span className="deleted"
                                  onClick={e => this.openDeleteKeyModal(item)}>{T.translate("common.delete")}</span>
                        {this.state.showDeleteKeyModal ?
                          <ModalContainer onClose={this.closeDeleteKeyModal}>
                            <ModalDialog onClose={this.closeDeleteKeyModal} width={665} className="example-dialog"
                                         dismissOnBackgroundClick={true}>
                              <h1>{T.translate("common.delete-key")}</h1>
                              <form>
                                <article>
                                  <section>
                                    <span>{T.translate("apikey.public-key")}</span>
                                    <p class="warn">{this.wantToDelete.id}</p>
                                  </section>
                                  <section className="button-group">
                                    <span/>
                                    <button type="button" className="yes"
                                            onClick={this.handleDestroyKey}>{T.translate("order.ok")}</button>
                                    <button type="button" className="no"
                                            onClick={this.closeDeleteKeyModal}>{T.translate("common.cancel")}</button>
                                  </section>
                                </article>
                              </form>
                            </ModalDialog>
                          </ModalContainer>
                          : null}
                      </div>
                    </div>
                  }
                )
            }
            <button className="blueButton add" onClick={this.handleNewKey}>{T.translate("apikey.new")}</button>
            {inNewKey ?
              <form className="add-key-form" onSubmit={handleSubmit}>
                <div className="select-group">
                  <p className="key-name">{T.translate("apikey.public-key")}:</p>
                  <input name="type" type="radio" value="TRUSTY" defaultChecked onClick={this.changeType}/>
                  <label>{T.translate("common.product")}</label>
                  <input name="type" type="radio" value="SANDBOX" className="sandbox"
                         onClick={this.changeType}/>
                  <label>{T.translate("common.test")}</label>
                </div>
                <div className="text">
                      <textarea style={{width: "100%", height: "300px"}}
                                placeholder={T.translate("apikey.rsa-public-key")}{...key} />
                  <div className="btn-group">
                    <button className="blueButton" type="submit">{T.translate("common.save")}</button>
                    <button className="cancel" type="button"
                            onClick={this.handleCloseNewKey}>{T.translate("common.cancel")}</button>
                  </div>
                </div>
              </form>
              :
              ""
            }
          </article>
        </div>
      </div>
    </div>
  }
};
