import React, { Component } from "react";
import LanguageUtil from "../../utils/LanguageUtil";

export default class LangLink extends Component {
  render() {
    let to;
    if (this.props.href)
      to = this.props.href + "?lang=" + LanguageUtil.lang;

    return <button href={to} style={this.props.style} className={this.props.className} label={this.props.label}
                   onTouchTap={this.props.onTouchTap} onClick={this.props.onClick}>
      {this.props.children}
    </button>;
  }

}
