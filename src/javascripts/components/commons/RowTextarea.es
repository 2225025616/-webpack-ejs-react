import React, { Component } from "react";

const styles = {
  showError: {
    display: "flex",
  },
  border: {
    borderColor: "#ea2c2c",
    outline: "none",
  }
};

export default class RowTextarea extends Component {

  render() {
    let {placeholder, file, errorText} = this.props;

    return <div className="textarea-component">
      <textarea {...file} placeholder={placeholder} style={errorText ? styles.border : null} rows="5" cols="30"/>
      <p className="error-content" style={errorText ? styles.showError : null}>
        <i className="iconfont font-error"/>
        <label className="error-text">{errorText}</label>
      </p>
    </div>
  }
}
