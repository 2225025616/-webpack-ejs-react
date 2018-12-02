import React, { Component } from "react";

export default class Header extends Component {

  render() {
    return <div className="mobile-header">
      {this.props.children}
    </div>
  }
}