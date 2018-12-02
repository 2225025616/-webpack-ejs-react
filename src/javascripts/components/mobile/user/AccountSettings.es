import React, { Component } from "react";
import Header from "../common/Header";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";

@connect(state => ({user: state.user.info}))
export default class AccountSettings extends Component {
  data = {
    title: '账户管理',
  };

  render() {
    const {user} = this.props;
    return <div className="user-common">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="common-container">
        <div className="sub-nav">
          <Link to="/mobile/password" style={{alignItems: 'center'}}>密码修改 <span className="icon-go"/></Link>
          {
            !user.email ?
              <Link to="/mobile/email-bound">绑定邮箱 <span className="icon-go"/></Link>
              : <Link to="/mobile/email-bound">修改邮箱
                <div className="wrap"> {user.email} <span className="icon-go"/></div>
              </Link>
          }
        </div>
      </div>
    </div>
  }
}