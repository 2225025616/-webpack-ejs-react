import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import CommonAttestationList from "../members/CommonAttestationList";

@connect(state => {
  return {

  }
})

export default class OrgAttestations extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return <div className="container-wrapper">
      <div className="container member-container">
        <p className="table-name">我的保全</p>
        <div className="ctn member-content">
          <CommonAttestationList size="10" haveInput="0" type="org"/>
        </div>
      </div>
    </div>
  }
};

