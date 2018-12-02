import React, { Component } from "react";
import { reduxForm } from "redux-form";
import IdUtil from "../../utils/IdUtil";
import { createProduct, updateProduct } from "../../actions/productAction";
import FormUtil from "../../utils/FormUtil.es";
import FormValidator from "../../utils/FormValidator";
import T from "i18n-react";
import RowInput from "../commons/RowInput";
import StorageUtil from "../../utils/StorageUtil.es";
import BackMenu from "../commons/BackMenu";

const fields = ["name", "website", "logo", "category", "attestationDownload"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("product.name"))
    .errors;
};

const getInitialValues = state => {
  if (!IdUtil.productId(state.router)) {
    return {};
  } else {
    return state.product.info;
  }
};

@reduxForm({
    form: "product",
    fields,
    validate
  },
  state => {
    return {
      initialValues: getInitialValues(state),
      params: state.router.params,
      orgInfo: state.organization.orgInfo,

      onSubmit: (values, dispatch) => {
        let productId = IdUtil.productId(state.router);

        let organizationId = state.organization.orgInfo.id;
        if (productId) {
          dispatch(updateProduct(productId, FormUtil.trimStringImage(values, "logo")));
        } else {
          dispatch(createProduct(organizationId, FormUtil.trimStringImage(values, "logo")));
        }
      }
    }
  })
export default class NewProduct extends Component {

  render() {
    const {fields: {name, website, logo, category, attestationDownload}, handleSubmit} = this.props;
    let id = IdUtil.productId(this.props);

    return <div className="container-wrapper">
      <div className="container new-product">
        <BackMenu title={T.translate("product.add")}/>
        <div className="ctn">
        <form onSubmit={handleSubmit} className="content">
          <div className="item">
            <span>{T.translate("product.name")}</span>
            <RowInput placeholder={T.translate("product.input-name")}
                      type="text" {...FormUtil.extract(name)} file={name}
                      width="300" height="30"/>
          </div>

          <div className="item">
            <span>{T.translate("product.web-url")}</span>
            <input {...FormUtil.extract(website)}
                   placeholder={T.translate("product.input-website")}
            />
          </div>

          <div className="item">
            <span>{T.translate("product.type")}</span>
            <select {...FormUtil.extract(attestationDownload, "select")}>
              <option value="">{T.translate("product.type")}</option>
              <option value="PDF">pdf</option>
              <option value="ZIP">zip</option>
            </select>
          </div>

          <button type="submit" name="commit" className="blueButton submit">{T.translate("notarization.submit")}</button>
        </form>
        </div>
      </div>
    </div>
  }
} ;
