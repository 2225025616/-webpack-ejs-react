import React, { Component } from "react";
import ReduxToastr from 'react-redux-toastr';
import ProgressBar from '../components/commons/ProgressBar';

export default class App extends Component {
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
