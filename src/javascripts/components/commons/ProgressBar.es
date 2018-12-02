import React, { Component } from "react";
import { connect } from "react-redux";
import Progress from "react-progress";

@connect(state => {
  return {loading: state.api.loading}
})
export default class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.percent = 100;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading) {
      if (nextProps.loading) {
        this.startLoading();
      } else {
        this.stopLoading();
      }
    }
  }

  startLoading() {
    this.percent = 0;
    this.showLoading();
  }

  stopLoading() {
    this.percent = 100;
    this.forceUpdate();
  }

  showLoading = () => {
    if (this.percent <= 20) {
      this.percent += 1;
    } else if (this.percent <= 40) {
      this.percent += 2;
    } else if (this.percent <= 60) {
      this.percent += 5;
    } else if (this.percent <= 80) {
      this.percent += 2;
    } else if (this.percent <= 90) {
      this.percent += 1;
    } else if (this.percent <= 95) {
      this.percent += 0.75;
    } else if (this.percent < 99.70) {
      this.percent += 0.25;
    } else if (this.percent < 100) {
      this.percent -= 10;
    }

    this.forceUpdate();

    if (this.percent < 100) {
      setTimeout(this.showLoading, 200);
    }
  };

  render() {
    return <Progress className="progress" hideDelay="0" speed="0.2" percent={this.percent} color="yellow"/>
  }
}

