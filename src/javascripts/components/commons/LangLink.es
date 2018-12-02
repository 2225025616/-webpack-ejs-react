import React, { Component } from "react";
import { Link } from "react-router";
import LanguageUtil from "../../utils/LanguageUtil";

export default class LangLink extends Component {
  render() {
    let { disableLink } = this.props;

    let to;
    if (!this.props.to) {
      to = {javascript: void 0};
    } else if (this.props.to.indexOf("?") >= 0) {
      to = this.props.to + "&lang=" + LanguageUtil.lang;
    } else {
      to = this.props.to + "?lang=" + LanguageUtil.lang;
    }

    return ( disableLink == "no" ?
        <span>
          {this.props.children}
        </span>
        :
        <Link to={to} className={this.props.className} style={this.props.style}>
          {this.props.children}
        </Link>
    );
  }

}
