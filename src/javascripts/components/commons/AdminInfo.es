import React, { Component } from "react";
import { connect } from "react-redux";
import { adminSignOut } from "../../actions/userAction";
import Image from "../commons/Image";


@connect(state => {
  return {
    user: state.user.info,
  }
})

export default class AdminInfo extends Component {
  handleSignOut = e => {
    e.preventDefault();
    this.props.dispatch(adminSignOut());
  };

  render() {
    let {user} = this.props;

    return <div className="admin-info">
      <li><Image src={user.avatar}
                 altSrc={require("images/new_02.png")}/></li>
      <li><span className="user-name">{user.realName}</span></li>
      <li><a className="sign-out" onClick={this.handleSignOut}>退出</a></li>
    </div>
  }
}
