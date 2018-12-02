import React, { Component } from "react";


export default class Hint extends Component {

  render() {
    return <div className="hint">
      <img className="logo"
           src={require("images/users/hint-logo.png")}/>
      <div className="hint-content">
        <img
          src={require("images/users/hint-tip.png")}/>
        <p className="tip">此体验金不可提现，仅可在保全网使用</p>
        <img
          src={require("images/users/hint-money.png")}/>
        <p className="tip-middle">请在<span>PC端</span>查看并体验</p>
        <p>www.baoquan.com</p>
        <p className="tips">最终解释权归保全网所有</p>
      </div>
    </div>
  }
}
