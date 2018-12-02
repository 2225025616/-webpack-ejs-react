import React, { Component } from "react";

export default class Back extends Component {
  test = () => {
    window.history.back();
  };

  render() {
    return <span className="back" onClick={this.test}/>
  }
}