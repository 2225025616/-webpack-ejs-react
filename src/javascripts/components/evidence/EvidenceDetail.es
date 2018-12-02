import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import CommonEvidenceList from "../members/CommonEvidenceList.es";
import Link from "../commons/LangLink";
import BackMenu from "../commons/BackMenu";
import cx from "classnames";

@connect(state => {
  return {
  }
})

export default class EvidenceDetail extends Component {

  render() {

    return <div className="container-wrapper">
      <div className="container">
        <BackMenu title="我的取证"/>
        <div className="ctn">
          <CommonEvidenceList size="10" wholeList="true"/>
        </div>
      </div>
    </div>

  }
}

