import React, { Component } from "react";
import { reduxForm } from "redux-form";
import IdUtil from "../../utils/IdUtil";
import { createOrganization, getOrganization, updateOrganization } from "../../actions/organizationAction";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Link from "../commons/LangLink";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import BackMenu from "../commons/BackMenu";

const styles = {
  dropdown: {
    width: "65%",
    height: 60
  },
  underline: {
    margin: 0
  },
  textField: {
    width: "65%",
    height: 60,
    paddingTop: 12,
  },
  railsButton: {
    width: "100%",
    margin: "24px 0"
  }
};

const fields = ["name", "street", "contactName", "contactPhoneNumber", "contactEmail"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("organizarion.org-name"))
    .nonEmpty("street", T.translate("organizarion.org-address"))
    .realName("contactName", T.translate("organizarion.contact-name"))
    .phoneNumber("contactPhoneNumber", T.translate("member.phone-number"))
    .email("contactEmail", T.translate("marketing.email"))
    .errors;
};


const getInitialValues = state => {
  return {
    ...state.organization.info
  };
};

@reduxForm(
  {form: "org-edit", fields, validate},
  state => {
    return {
      initialValues: {
        ... getInitialValues(state)
      },
      params: state.router.params,
      organization: state.organization.info,
      onSubmit: (values, dispatch) => {
        let id = IdUtil.organizationId(state.router);
        if (!id) {
          dispatch(createOrganization(values));
        }
      }
    }
  }
)
export default class OrganizationProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }

  componentWillMount() {
    let id = IdUtil.organizationId(this.props);
    if (id) {
      this.props.dispatch(getOrganization(id));
    }
  }

  componentWillReceiveProps(nextProps) {
    // let newOrganizationId = IdUtil.organizationId(nextProps);
    // let organizationId = IdUtil.organizationId(this.props);
    //
    // if(newOrganizationId != organizationId) {
    //   this.props.dispatch(getOrganization(newOrganizationId));
    // }
  }

  updateOrganization = (val) => {
    return () => {
      let id = IdUtil.organizationId(this.props);
      this.props.dispatch(updateOrganization(id, val, () => this.setState({editable: false})));
    }
  };

  render() {
    let {fields: {name, street, contactName, contactPhoneNumber, contactEmail}, handleSubmit, organization} = this.props;
    let id = IdUtil.organizationId(this.props);

    return <div className="container-wrapper">
      <div className="container">
        {id === undefined || this.state.editable ?
          <BackMenu title={id === undefined ? T.translate("common.create-org") : T.translate("kyc.view-comp")}/>
          :
          <BackMenu title={T.translate("kyc.view-comp")}/>
        }
        {id === undefined || this.state.editable ?
          <form className="create-organization ctn" onSubmit={handleSubmit}>
            <article>
              <h2>{T.translate("kyc.org-info")}</h2>
              <section>
                <span>{T.translate("marketing.company")}</span>
                <RowInput placeholder="" type="text"
                          {...FormUtil.extract(name)} file={name}
                          width="300" height="30"/>
              </section>
              <section>
                <span>{T.translate("organizarion.org-address")}</span>
                <RowInput placeholder="" type="text"
                          {...FormUtil.extract(street)}
                          file={street} width="300" height="30"/>
              </section>
            </article>
            <article>
              <h2>{T.translate("organizarion.contact-info")}</h2>
              <section>
                <span>{T.translate("organizarion.contact-name")}</span>
                <RowInput placeholder="" type="text"
                          {...FormUtil.extract(contactName)}
                          file={contactName}
                          width="300" height="30"/>
              </section>
              <section>
                <span>{T.translate("member.phone-number")}</span>
                <RowInput placeholder="" type="text"
                          {...FormUtil.extract(contactPhoneNumber)}
                          file={contactPhoneNumber} width="300" height="30"/>
              </section>
              <section>
                <span>{T.translate("marketing.email")}</span>
                <RowInput placeholder="" type="text"
                          {...FormUtil.extract(contactEmail)}
                          file={contactEmail}
                          width="300" height="30"/>
              </section>
              <section>
                <span/>
                <div className="add-org">
                  {!id ?
                    <button type="submit" className="save blueButton">{T.translate("common.save")}</button>
                    : <div className="btn-group">
                      <button className="blueBorderButton edit" onClick={this.updateOrganization({
                        name: name.value,
                        street: street.value,
                        contactName: contactName.value,
                        contactPhoneNumber: contactPhoneNumber.value,
                        contactEmail: contactEmail.value,
                      })}>{T.translate("common.save")}
                      </button>
                    </div>}
                  <p>*{T.translate("kyc.to-auth")}</p>
                </div>
              </section>
            </article>
          </form>
          : <form className="create-organization ctn" onSubmit={handleSubmit}>
            <article>
              <h2>{T.translate("kyc.org-info")}</h2>
              <section>
                <span>{T.translate("marketing.company")}</span>
                <p>{name.value}</p>
              </section>
              <section>
                <span>{T.translate("organizarion.org-address")}</span>
                <p>{street.value}</p>
              </section>
            </article>
            <article>
              <h2>{T.translate("organizarion.contact-info")}</h2>
              <section>
                <span>{T.translate("organizarion.contact-name")}</span>
                <p>{contactName.value}</p>
              </section>
              <section>
                <span>{T.translate("member.phone-number")}</span>
                <p>{contactPhoneNumber.value}</p>
              </section>
              <section>
                <span>{T.translate("marketing.email")}</span>
                <p>{contactEmail.value}</p>
              </section>
              <section>
                <span/>
                <div className="add-org">
                  <div className="btn-group">
                    {
                      organization.organizationStatus === 'PASS' || organization.organizationStatus === 'APPLY' ? ''
                        : <button className="blueBorderButton edit" onClick={() => this.setState({editable: true})}>{T.translate("notarization.edit")}</button>
                    }
                    <Link to={`/organizations/${id}/kyc`}>
                      <button type="button" className="blueButton">{T.translate("user.org-certify")}</button>
                    </Link>
                  </div>
                  <p>*{T.translate("kyc.to-auth")}</p>
                </div>
              </section>
            </article>
          </form>}
      </div>
    </div>;
  }
}
