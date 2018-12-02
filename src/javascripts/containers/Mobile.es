import React, { Component } from "react";
import ProgressBar from "../components/commons/ProgressBar";
import ReduxToastr from "react-redux-toastr";

export default class Mobile extends Component {
  render() {
    return <div className="content-height">
      <ProgressBar />
      {this.props.children}
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-center"
      />
    </div>;
  }
}
