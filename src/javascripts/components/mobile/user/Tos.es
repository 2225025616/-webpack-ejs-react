import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import TosDeskTop from "../../commons/Tos";

export default class Tos extends Component {
  data = {
    title: '用户协议',
  };


  componentWillMount = () => {
  };

  render() {
    return <div className="user-common">
      <Header >
        <Back />
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <TosDeskTop/>
    </div>
  }
}