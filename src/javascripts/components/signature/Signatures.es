import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import CommonSignatureList from "../members/CommonSignatureList";

@connect(state => {
    return {

    };
  }
)
export default class Signatures extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    return <div className="container-wrapper">
      <div className="container member-container">
        <div className="signatures">
          <p className="table-name">
            {T.translate("signature.management")}
          </p>
          <article className="member-content">
            <CommonSignatureList size="10" wholeList="true"/>
          </article>
        </div>
      </div>
    </div>
  }
}
