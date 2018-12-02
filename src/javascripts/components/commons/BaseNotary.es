import React, { Component } from "react";
import T from "i18n-react";
import { connect } from "react-redux";
import NotaryList from "../members/CommonBaseNotary";
import IdUtil from "../../utils/IdUtil.es";

@connect(state => {
  return {

  }
})
export default class Notary extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    let productId = IdUtil.productId(this.props);

    return <div className="container-wrapper">
      <div className="container member-container">
        {
          productId ? "" : <p className="table-name">{T.translate("notary.Judicial")}</p>
        }
        <div className="ctn">
          <NotaryList/>
        </div>
      </div>
    </div>

  }
}
