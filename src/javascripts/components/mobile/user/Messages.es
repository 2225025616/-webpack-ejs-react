import React, { Component } from "react";
import Header from "../common/Header";
import Link from "../../commons/LangLink";
import NavMenu from "../common/NavMenu";
import { connect } from "react-redux";
import Formatter from "../../../lib/formatter";
import T from "i18n-react";
import { findNotifications, markAll } from "../../../actions/notificationAction";

@connect(state => ({
  msg: state.notification.mobileMsg,
  all: state.notification.all,
}))
export default class Messages extends Component {

  data = {
    title: '消息通知',
    messages: []
  };

  pageNo = 0;

  origin = {};
  canQueryMore = true;

  state = {tips: '正在获取...', animationClass: '', loading: true};

  componentWillMount() {
    this.doQuery(0, '');
    this.props.dispatch(markAll());
  };

  doQuery = (pageNo, notificationType) => {
    this.props.dispatch(findNotifications({
      pageNo,
      pageSize: 10,
      notificationType,
    }, () => this.setState({loading: false})));
  };

  queryMore = () => {
    let length = this.props.msg.length;
    this.pageNo = parseInt(length % 10 === 0 && length / 10 > 0 ? length / 10 - 1 : length / 10);
    if (this.pageNo < this.props.all.totalPage - 1) this.doQuery(++this.pageNo, '');
    else this.setState({tips: '没有更多了'})
  };

  touchStart = e => {
    if (this.props.msg.length === 0) return this.canQueryMore = false;
    if (typeof window !== 'undefined') {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.canQueryMore = scrollTop >= (document.body.clientHeight - window.screen.availHeight * window.devicePixelRatio);
      if (this.canQueryMore) {
        this.origin.x = e.touches[0].clientX;
        this.origin.y = e.touches[0].clientY;
      }
    }
  };

  touchEnd = e => {
    if (this.canQueryMore && typeof window !== 'undefined') {
      let top = e.changedTouches[0].clientY - this.origin.y;
      if (top < 0 && Math.abs(top) >= 50 * window.devicePixelRatio) {
        this.setState({
          animationClass: 'animation'
        });
        this.queryMore();
        setTimeout(() => this.setState({animationClass: ''}), 2000)
      }
    }
  };

  type(type) {
    switch (type) {
      case "other":
        return T.translate("notification.other");
      case "product":
        return T.translate("notification.product-message");
      case "system":
        return T.translate("notification.notification-system");
    }
  }

  subtype(type) {
    switch (type) {
      case "attestation_eContract":
        return T.translate("notification.sign");
      case "product_notary_person":
        return T.translate("common.user-notary");
      case "product_notary_organization":
        return T.translate("common.org-notary");
      case "attestation_trade":
        return T.translate("notification.user-att");
      case "attestation_eContract_trade":
        return T.translate("notification.user-sign");
      case "kyc_pass":
        return T.translate("notification.user-key-pass");
      case "kyc_reject":
        return T.translate("notification.user-key-reject");
      case "kycEnterprise_pass":
        return T.translate("notification.org-key-pass");
      case "kycEnterprise_reject":
        return T.translate("notification.org-key-reject");
    }
  }

  render() {
    const fmt = Formatter.get('yyyy-mm-dd'), {msg} = this.props, {tips} = this.state;

    return <div className="user-common">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="common-container" style={{padding: '0 1.5rem'}}
           onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem)', width: '100vw', marginLeft: '-1.5rem'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : msg.length > 0 ? msg.map(item =>
              <section className="message">
                <time>{fmt.format(item.createdAt)}</time>
                <h2>{this.subtype(item.notificationType)}</h2>
                <p>{item.data}</p>
              </section>
            ) : <div className='no-content-wrap'
                     style={{minHeight: 'calc(100vh - 4.2rem)', width: '100vw', marginLeft: '-1.5rem'}}>
              <img src={require('../../../../images/no-message.png')} alt=""/>
              <span>您当前没有消息内容哦</span>
            </div>
        }
      </div>
      <p className={"get-more " + this.state.animationClass}>{tips}</p>
    </div>
  }
}