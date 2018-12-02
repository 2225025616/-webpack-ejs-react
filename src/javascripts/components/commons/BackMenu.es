import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Link from "../commons/LangLink";
import cx from "classnames";
import {goBack} from "redux-router";

@connect(state => {
  return {
  }
})

export default class BackMenu extends Component {

  handleGoBack = () => {
    this.props.dispatch(goBack());
  };

  render() {
    let { title } = this.props;

    return <p className="second-level-head table-name">
          <span onClick={this.handleGoBack}>
            <div>
              <i className="iconfont font-arrow-left"/>
              <span>{T.translate("signature.back")}</span>
            </div>
          </span>
          <span className="title-name">{title}</span>
        </p>
  }
}

