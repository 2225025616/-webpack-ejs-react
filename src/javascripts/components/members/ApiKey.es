import React, { Component } from "react";
import IdUtil from "../../utils/IdUtil";
import ConfirmModal from "../commons/ConfirmModal";
import ActionTypes from "../../constants/ActionTypes";
import { addApiKey, findApiKeys, removeApiKey } from "../../actions/organizationAction";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import Formatter from "../../lib/formatter/index";
import LoadingButton from "../commons/LoadingButton";

import moment from "moment";
import StorageUtil from "../../utils/StorageUtil";
import T from "i18n-react";

const style = {
  button: {
    margin: 16,
    height: 36,
  },
  flatBtn: {
    marginTop: 94,
  },
  newBtn: {
    margin: "16px 0",
  },
  types: {
    width: 100,
    display: "flex",
  },
  icon: {
    fill: "#03a9f4",
  },
};

const validate = values => {
  return new FormValidator(values).nonEmpty("key", T.translate("apikey.public-key")).errors;
};

let trusty = true;
let type = "TRUSTY";

const fields = ['key'];
@reduxForm(
  {form: "apiKeys", fields},
  state => {
    return {
      organization: state.organization.info,
      apiKeys: state.organization.apiKeys,
      inNewKey: state.organization.inNewKey,
      params: state.router.params,
      onSubmit: (values, dispatch) => {
        let id = IdUtil.organizationId(state.router);
        dispatch(addApiKey(id, {key: values.key, type}));
      }
    }
  })
export default class ApiKey extends Component {
  constructor(props) {
    super(props);
    this.wantToDelete = {id: ""};
  }

  componentDidMount() {
    let organizationId = IdUtil.organizationId(this.props);
    if (organizationId) {
      this.props.dispatch(findApiKeys(organizationId));
    }
  }

  componentWillReceiveProps(nextProps) {
    let newId = IdUtil.organizationId(nextProps);
    let oldId = IdUtil.organizationId(this.props);
    if (newId !== oldId) {
      this.props.dispatch(findApiKeys(newId));
    }
  }

  handleDestroyKey = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(removeApiKey(organizationId, this.wantToDelete.id));
    this.refs.deleteConfirm.hide();
  };

  handleConfirmDestroyKey = e => {
    this.wantToDelete = e;
    this.refs.deleteConfirm.show(this.wantToDelete.id);
  };

  handleNewKey = e => {
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

  changeType = pos => {
    type = pos;
    this.forceUpdate();
  };

  render() {
    let {apiKeys, fields: {key}, handleSubmit, inNewKey, organization} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd");

    return <div className="container-wrapper">
      <div className="container ApiKey">
        <ul className="breadcrumb">
          <li>{StorageUtil.organizationName()}</li>
          <li>{T.translate("sidebar.org-key")}</li>
        </ul>
        {
          apiKeys.length === 0 ?
            <div className="new-keys">
              <span>{T.translate("apikey.no-key")}</span>
              <button style={style.button} type="button" label={T.translate("common.new")} onClick={this.handleNewKey}/>
            </div>
            :
            ""
        }
        {  apiKeys.map(item => {
            return <div>
              <div className="org-info">
                <div className="api-key">
                  <img
                    src={require(item.type === "TRUSTY" ? "images/members/api-keys-trusty.png" : "images/members/api-keys-sandbox.png")}/>
                  <p>{item.type === "TRUSTY" ? T.translate("apikey.product") : T.translate("apikey.test")}</p>
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
                <button style={style.flatBtn} onTouchTap={e => this.handleConfirmDestroyKey(item)}
                        label={T.translate("common.delete")}/>
              </div>
            </div>
          }
        )
        }
        {
          inNewKey ? <form className="simple_form" onSubmit={handleSubmit}>
            <div className="form-group">
              <button iconStyle={style.icon} value="TRUSTY" label={T.translate("common.product")}
                      onTouchTap={() => this.changeType("TRUSTY")}/>
              <button iconStyle={style.icon} value="SANDBOX" label={T.translate("common.test")}
                      onTouchTap={() => this.changeType("SANDBOX")}/>
            </div>
            <label className="required string">{T.translate("apikey.public-key")}:</label>
            <div className="from-group">
            <textarea style={{width: "100%", height: "300px"}}
                      placeholder={T.translate("apikey.rsa-public-key")}
                      {...key} />
            </div>
            <LoadingButton style={style.button} type="submit" loadingLabel={T.translate("common.saving")}
                           label={T.translate("common.save")}/>
            <button style={style.button} type="button" label={T.translate("common.cancel")}
                    onClick={this.handleCloseNewKey}/>
          </form>
            : apiKeys.length === 0 ? ""
            : <button style={style.newBtn} type="button" label={T.translate("common.new")} onClick={this.handleNewKey}/>
        }

      </div>

      <ConfirmModal ref="deleteConfirm"
                    title={T.translate("common.delete-key")}
                    prompt={T.translate("common.input-key-id")}
                    label={T.translate("common.delete")}
                    onConfirmOk={this.handleDestroyKey}/>
    </div>
      ;
  }
};
