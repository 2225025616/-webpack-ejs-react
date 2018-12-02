/*
import React, { Component } from "react";
import cx from "classnames";
import { reduxForm } from "redux-form";
import { getKyc, updateKyc } from "../../actions/organizationAction";
import IdUtil from "../../utils/IdUtil";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";

import StorageUtil from "../../utils/StorageUtil";
import T from "i18n-react";

const styles = {
  info: {
    width: 400,
    marginLeft: 40,
  },
  apply: {
    minWidth: 120,
    margin: "30px 0 80px 300px",
  },
  radioButtonGroup: {
    width: "100%",
    display: "flex",
    marginLeft: 145,
  },
  radioButton: {
    width: 210,
  },
  icon: {
    fill: "#03a9f4",
  },
};

const fields = ["name", "orgcode", "legalName", "legalIdno", "regno"];

let versions = "V2";

const validate = values => {
  if (versions === "V2") {
    return new FormValidator(values)
      .nonEmpty("name", T.translate("common.no-empty"))
      .nonEmpty("orgcode", T.translate("common.no-empty"))
      .nonEmpty("legalName", T.translate("common.no-empty"))
      .idCard("legalIdno", T.translate("common.id-card"))
      .nonEmpty("regno", T.translate("common.no-empty"))
      .errors;
  }
  else if (versions === "V3") {
    return new FormValidator(values)
      .nonEmpty("name", T.translate("common.no-empty"))
      .nonEmpty("orgcode", T.translate("common.no-empty"))
      .nonEmpty("legalName", T.translate("common.no-empty"))
      .idCard("legalIdno", T.translate("common.id-card"))
      .errors;
  }
};

const getInitialValues = state => {

  if (!state.organization.kyc.name) {
    return {
      name: "",
      orgcode: "",
      legalName: "",
      legalIdno: "",
      regno: "",
      version: ""
    };
  }
  else if (!state.organization.kyc.regno) {
    return {
      ...state.organization.kyc,
      regno: ""
    };
  }
  else
    return {
      ...state.organization.kyc
    };
};

@reduxForm({form: "org-kyc", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    kyc: state.organization.kyc,
    params: state.router.params,
    organizationTypes: state.config.organization_type,
    organizations: state.organization.all,

    onSubmit: (values, dispatch) => {
      let id = IdUtil.organizationId(state.router);
      let version = versions.toString();
      dispatch(updateKyc(id, {...values, version}));
    }
  }
})
export default class Kyc extends Component {
  constructor(props) {
    super(props);
  };

  changeType = pos => {
    versions = pos;
    this.forceUpdate();
  };

  componentWillMount() {
    let id = IdUtil.organizationId(this.props);
    if (id) {
      this.props.dispatch(getKyc(id));
    }
  };

  componentDidMount() {
    let organizationId = IdUtil.organizationId(this.props);
    if (organizationId) {
      this.props.dispatch(getKyc(organizationId));
    }
  };

  componentWillReceiveProps(nextProps) {
    let oldOrganizationId = IdUtil.organizationId(this.props);
    let newOrganizationId = IdUtil.organizationId(nextProps);
    if (newOrganizationId !== oldOrganizationId) {
      this.props.dispatch(getKyc(newOrganizationId));
    }
    if (nextProps.kyc !== this.props.kyc) {
      if (nextProps.kyc.version)
        versions = nextProps.kyc.version;
      else
        versions = "V2";
    }
  }

  handleSubmits = () => {
    this.props.handleSubmit();
  };

  status = (e) => {
    switch (e) {
      case "APPLY":
        return T.translate("kyc.application-apply");
      case "REJECT":
        return T.translate("kyc.application-reject");
      default :
        return T.translate("kyc.application");
    }
  };

  render() {
    let {fields: {name, legalName, legalIdno, orgcode, regno}, handleSubmit} = this.props;
    const {kyc} = this.props;
    let nameS, legalNameS, legalIdnoS, orgcodeS, regnoS;
    if (kyc.version === "V2") {
      nameS = T.translate("kyc.org-name");
      legalNameS = T.translate("kyc.legal-person");
      legalIdnoS = T.translate("kyc.legal-id");
      orgcodeS = T.translate("kyc.org-code");
      regnoS = T.translate("kyc.bussness-license");
    } else if (kyc.version === "V3") {
      nameS = T.translate("kyc.comp-name");
      legalNameS = T.translate("kyc.legal-person");
      legalIdnoS = T.translate("kyc.legal-id");
      orgcodeS = T.translate("kyc.social-code");
      regnoS = "";
    }

    return (
      <div className="container-wrapper">
        <div className="container">
          <ul className="breadcrumb">
            <li>{StorageUtil.organizationName()}</li>
            <li>{T.translate("sidebar.org-iden")}</li>
          </ul>
          {
            (kyc.status === "PASS") ?
              <div className="success">
                <img
                  src={require("images/components/successicon.png")}/>
                <p>{T.translate("kyc.certified")}</p>
                <span>{nameS}</span><span className="successInfo">{kyc.name}</span><br />
                <span>{orgcodeS}</span><span className="successInfo">{kyc.orgcode}</span><br />
                <span>{legalNameS}</span><span className="successInfo">{kyc.legalName}</span><br />
                <span>{legalIdnoS}</span><span className="successInfo">{kyc.legalIdno}</span><br />
                <span>{regnoS}</span><span className="successInfo">{kyc.regno}</span><br />
              </div>
              :
              <div className="companyInfo">

                <button iconStyle={styles.icon} value="V2" label={T.translate("kyc.v2")} style={styles.radioButton}
                        onClick={() => this.changeType("V2")} disabled={kyc.status === "APPLY" ? "true" : ""}/>
                <button iconStyle={styles.icon} value="V3" label={T.translate("kyc.v3")} style={styles.radioButton}
                        onClick={() => this.changeType("V3")} disabled={kyc.status === "APPLY" ? "true" : ""}/>

                <form onSubmit={handleSubmit}>
                  <table className={cx("content", "passive", {active: versions === "V2"})}>
                    <tbody>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.org-name")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-org-name")} {...FormUtil.extract(name)}/></td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.org-code")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-org-code")} {...FormUtil.extract(orgcode)}/></td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.legal-person")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-legal-person")} {...FormUtil.extract(legalName)}/>
                      </td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.id-number")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-id-number")} {...FormUtil.extract(legalIdno)}/>
                      </td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.bussness-license")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-bussness-license")} {...FormUtil.extract(regno)}/>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <table className={cx("content", "passive", {active: versions === "V3"})}>
                    <tbody>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.comp-name")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-comp-name")} {...FormUtil.extract(name)}/></td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.social-code")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-social-code")} {...FormUtil.extract(orgcode)}/>
                      </td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.legal-person")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-legal-person")} {...FormUtil.extract(legalName)}/>
                      </td>
                    </tr>
                    <tr>
                      <td className="nameInfo">{T.translate("kyc.legal-id")}</td>
                      <td><input style={styles.info}
                                 placeholder={T.translate("kyc.input-legal-id")}
                                 {...FormUtil.extract(legalIdno)}/>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                </form>
                {kyc.status === "REJECT" ?
                  <p className="reject-reason"> {T.translate("common.reject-reason")}{kyc.rejectReason}</p> : ""}
                <button disabled={kyc.status === "APPLY" ? "true" : ""} label={this.status(kyc.status)}
                        style={styles.apply}
                        onClick={this.handleSubmits}/>

              </div>
          }
        </div>
      </div>
    );
  }
} ;
*/
