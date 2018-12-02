import React, { Component } from "react";

const styles = {
  showError: {
    display: "flex",
  },
  border: {
    outline: "none",
  }
};

export default class ColumnTextarea extends Component {

  render() {
    let {placeholder, file, errorText, width, height, value, maxLength} = this.props;

    return <div className="column-textarea-component">
      <textarea {...file} placeholder={placeholder} maxLength={maxLength}
             style={errorText ? Object.assign({height: height + 'px', width: width + 'px'}, styles.border) : {
               height: height + 'px',
               width: width + 'px'
             }} value={value}/>
      <span className="error-text" style={errorText ? styles.showError : null}>{errorText}</span>
    </div>
  }
}
