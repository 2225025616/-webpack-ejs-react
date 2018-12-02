import React, { Component } from "react";
import { connect } from "react-redux";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import {
  addNotifications,
  findNotifications,
  findSecretKey,
  updateNotifications
} from "../../actions/organizationAction";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import Formatter from "../../lib/formatter/index";
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
  textField: {
    width: 400,
    height: 60,
    paddingTop: 12,
  },
  raisedBtn: {
    margin: "24px 0",
    width: 160
  },
};

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("notifyUrl", "通知地址")
    .errors;
};

const getInitialValues = state => {
  if (IdUtil.organizationId(state.router)) {
    return {
      ...state.organization.notifications
    };
  }
};

const fields = ['notifyUrl'];
@reduxForm(
  {form: "callback", fields, validate},
  state => {
    return {
      initialValues: {
        ... getInitialValues(state)
      },
      organization: state.organization.info,
      notifyUrl: state.organization.notifications,
      params: state.router.params,
      onSubmit: (values, dispatch) => {
        const id = IdUtil.organizationId(state.router);
        const notificationsId = state.organization.notifications.id;
        const notify = values.notifyUrl;
        const oldKey = state.organization.notifications.secretKey;
        const newKey = state.organization.secretKey.secretKey;
        let key = "";
        if (newKey) {
          key = newKey;
        } else {
          key = oldKey;
        }
        let a = {
          notifyUrl: notify,
          secretKey: key
        };
        let b = {
          notifyUrl: notify,
          secretKey: key,
          id: notificationsId,
        }
        if (notificationsId) {
          dispatch(updateNotifications(id, b));
        } else {
          dispatch(addNotifications(id, a));
        }
      }
    }
  })

@connect(state => {
  return {
    notifications: state.organization.notifications,
    secretKey: state.organization.secretKey,
  }
})

export default class Callback extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let organizationId = IdUtil.organizationId(this.props);
    let secretKey = this.props.secretKey.secretKey;
    if (organizationId) {
      this.props.dispatch(findNotifications(organizationId));
    }
  }

  componentWillReceiveProps(nextProps) {
    let newId = IdUtil.organizationId(nextProps);
    let oldId = IdUtil.organizationId(this.props);
    if (newId !== oldId) {
      this.props.dispatch(findNotifications(organizationId));
    }
  }

  handleBuildKey = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(findSecretKey(organizationId));
  };

  handleRebuildKey = e => {
    let organizationId = IdUtil.organizationId(this.props);
    this.props.dispatch(findSecretKey(organizationId));
  };

  render() {
    let {secretKey, notifications, fields: {notifyUrl}, handleSubmit, organization} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd");
    let oldKey = notifications.secretKey;
    let newKey = secretKey.secretKey;

    return <form className="callback-form" onSubmit={handleSubmit}>
      <section>
        <span>{T.translate("notifications.address")}: </span>
        <input {...FormUtil.extract(notifyUrl)} placeholder={T.translate("notifications.input-address")}/>
      </section>
      <section>
        <span>{T.translate("notifications.key")}:</span>
        <div className="keys">
          <p>{newKey ? newKey : oldKey}</p>
          {
            newKey || oldKey ?
              <button className="new-key" type="button"
                      onClick={this.handleRebuildKey}>{T.translate("common.rebuild")}</button>
              :
              <button className="new-key build" type="button"
                      onClick={this.handleBuildKey}>{T.translate("common.build")}</button>
          }
        </div>
      </section>
      <section>
        <span/>
        <button type="submit"
                className="blueButton submit">{notifications ? T.translate("common.update-address") : T.translate("common.create-address")}</button>
      </section>
    </form>;


    {/*<div className="container-wrapper">
     <div className="container callback">
     <form onSubmit={handleSubmit}>
     <div className="org-info callback-info">
     <div>
     <div>
     <span>{T.translate("notifications.address")}: </span>
     <input style={style.textField}  {...FormUtil.extract(notifyUrl)}
     placeholder={T.translate("notifications.input-address")}
     />
     </div>
     <div>
     <span>{T.translate("notifications.key")}: {newKey ? newKey : oldKey}</span>
     {
     newKey || oldKey ?
     <button style={style.button} type="button" primary={true} label={T.translate("common.rebuild")} onClick={this.handleRebuildKey}/>
     :
     <button style={style.button} type="button" primary={true} label={T.translate("common.build")} onClick={this.handleBuildKey}/>
     }
     </div>
     <LoadingButton style={style.raisedBtn}
     type="submit" name="commit"
     label={notifications?T.translate("common.update-address"):T.translate("common.create-address")}
     loadingLabel={notifications?T.translate("common.updating-address"):T.translate("common.creating-address")}
     />
     </div>
     </div>
     </form>
     </div>
     </div>

     */
    }

  }
};
