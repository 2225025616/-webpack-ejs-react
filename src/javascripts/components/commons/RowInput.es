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

export default class RowInput extends Component {

  render() {
    let {placeholder, type, file, errorText, width, height, value, maxLength} = this.props;

    return <div className="row-input input-component">
      <input {...file} placeholder={placeholder} type={type} maxLength={maxLength}
             style={errorText ? Object.assign({height: height + 'px', width: width + 'px'}, styles.border) : {
               height: height + 'px',
               width: width + 'px'
             }} value={value}/>
      <p className="error-content" style={errorText ? styles.showError : null}>
        <i className="iconfont font-error" style={{lineHeight: height + 'px'}}/>
        <label className="error-text" style={{lineHeight: height + 'px'}}>{errorText}</label>
      </p>
    </div>
  }
}
