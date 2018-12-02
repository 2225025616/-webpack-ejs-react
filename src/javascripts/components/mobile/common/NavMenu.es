import React, { Component } from "react";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";
import { signOut } from "../../../actions/userAction";
import { getUnreadNotifications } from "../../../actions/notificationAction";

@connect(state => ({
  user: Object.assign({}, state.user.info, state.user.kycs),
  message: state.notification.unread
}))
export default class NavMenu extends Component {
  state = {
    showUser: false,
    showProd: false,
    top: ''
  };

  componentDidMount = () => {
    window.addEventListener('click', this.hideNav);
    window.addEventListener('touchstart', this.hideNav);
  };

  componentWillUnmount = () => {
    if (this.props.user.id) this.props.dispatch(getUnreadNotifications());
    window.removeEventListener('click', this.hideNav);
    window.removeEventListener('touchstart', this.hideNav);
  };

  hideNav = () => {
    if (this.state.showUser || this.state.showProd) this.setState({showUser: false, showProd: false, top: ''})
  };

  setShowState = (state) => {
    return (e) => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop ? this.setState({...state, top: 42 * window.devicePixelRatio - scrollTop}) : this.setState(state);
    }
  };

  stopBubble = (e) => {
    e.stopPropagation();
  };

  loginOut = (e) => {
    e.preventDefault();
    this.props.dispatch(signOut('/mobile'));
  };

  render() {
    const {user, message} = this.props, {showUser, showProd, top} = this.state;

    return <div className="icon-wrap">
      {
        user.id ?
          <div className="nav-wrap" onClick={this.stopBubble} onTouchStart={this.stopBubble}>
            <span className="iconfont font-personal-1"
                  onClick={this.setShowState({showUser: !showUser, showProd: false})}/>
            {
              showUser ?
                <nav className="subNav" style={top !== '' ? {top} : {}}>
                  <Link to="/mobile/attestations/list" className="user-links">我的保全 <span
                    className="icon-go"/></Link>
                  <Link to="/mobile/signatures/profile" className="user-links">我的签名 <span
                    className="icon-go"/></Link>
                  <Link to="/mobile/messages" className="user-links">消息通知
                    <span className="wrap">
                      {message > 0 ? <span className="message">{message}</span> : ''}
                      <span className="icon-go"/>
                    </span>
                  </Link>
                  <Link to="/mobile/order-list" className="user-links">订单管理 <span
                    className="icon-go"/></Link>
                  <Link to="/mobile/balance" className="user-links">账户余额 <span className="icon-go"/></Link>
                  <Link to="/mobile/certification" className="user-links">实名认证
                    <span className="wrap">
                      <span
                        className="kyc">{!(user.status === 'PASS' || user.isKycPass === 'PASS') ? '未认证' : '已认证'}</span>
                      <span className="icon-go"/>
                    </span>
                  </Link>
                  <Link to="/mobile/settings" className="user-links">账户管理 <span className="icon-go"/></Link>
                  <div className="user-wrap">
                    <span className="phoneNumber">{user.phoneNumber || '158****1245'}</span>
                    <span className="btn-login-out" onClick={this.loginOut}>退出账号</span>
                  </div>
                </nav> : ''
            }
          </div>
          : <Link to='/mobile/sign-in' className="iconfont font-personal-1"/>
      }
      <div className="nav-wrap" onClick={this.stopBubble} onTouchStart={this.stopBubble}>
        <span className="iconfont font-more" onClick={this.setShowState({showProd: !showProd, showUser: false})}/>
        {
          showProd ?
            <nav className="subNav" style={top !== '' ? {top} : {}}>
              <h2>产品与服务</h2>
              <Link to="/mobile/production/electronic-certificate">可信电子凭证 <span className="icon-go"/></Link>
              <Link to="/mobile/production/baoquan-visa">保全签 <span className="icon-go"/></Link>
              {/*
               <Link to="/mobile/production/credit-records">诚信档案 <span className="icon-go"/></Link>
               <Link to="/mobile/production/privatisation-deployment">私有化部署 <span className="icon-go"/></Link>
              */}
              <Link to="/mobile/production/forensic">司法鉴定通道 <span className="icon-go"/></Link>
            </nav> : ''
        }
      </div>
    </div>
  }
}