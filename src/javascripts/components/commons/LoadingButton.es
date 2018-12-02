import React, { Component } from "react";
import { connect } from "react-redux";

@connect(state => {
  return {loading: state.api.loading}
})
export default class LoadingButton extends Component {
  handleTouchTap = (e) => {
    this.clicked = true;
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    let clicked = this.clicked;
    this.clicked = false;
    let {className, type, style, buttonStyle} = this.props;

    return <button className={className} type={type} style={style}
                   disabled={this.props.disabled || this.props.loading} onClick={this.handleTouchTap}>
      {clicked && this.props.loading ? this.props.loadingLabel : this.props.label}
    </button>;
  }
}
