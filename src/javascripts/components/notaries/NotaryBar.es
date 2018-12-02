import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";
import { findPublicOffice } from "../../actions/notaryPublicAction";

@connect(state => {
  return {
    user: state.notaryPublic.user
  };
})

export default class NotaryBar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(findPublicOffice());
  }

  render() {

    const {user} = this.props;

    return <nav className="sidebar-wrapper sidebar">

      <div className="control-panel">{user.organizationName}</div>
      <ul className="menu">
        <li>
          <img
            src={require("images/members/member-manage.png")}/>
          <Link to="/notary/public">提取公证</Link>
        </li>
        <li>
          <img
            src={require("images/members/organization.png")}/>
          <Link to="/notary/public/list">公证列表</Link>
        </li>
        <li>
          <img
            src={require("images/members/notary.jpg")}/>
          <Link to="/notary/notarized">已出证</Link>
        </li>
      </ul>
    </nav>
  }

}
