import React, { Component } from "react";
import T from "i18n-react";
import AddConsult from "./AddConsult";

export default class FloatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModel: false,
    }
  }

  scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  render() {

    return <div className="float-bar">
      <div className="float-item" onMouseEnter={()=>{this.setState({showModel:true})}}>
        <span className="iconfont font-service"/>
      </div>
      <div className="float-item" onMouseEnter={()=>{this.setState({showModel:false})}}>
        <span className="iconfont font-QQ"/>
        <div className="detail qq-detail">
          {/*<a href="http://wpa.qq.com/msgrd?v=3&uin=1434851251&site=qq&menu=yes"
             target="_blank">{T.translate('float-bar.customer')} QQ</a>*/}
          <a href="http://wpa.qq.com/msgrd?v=3&uin=371335076&site=qq&menu=yes"
             target="_blank">{T.translate('float-bar.business')} QQ</a>
        </div>
      </div>
      <div className="float-item" onMouseEnter={()=>{this.setState({showModel:false})}}>
        <span className="iconfont font-phone"/>
        <div className="detail detail-phone">
          <a href="tel://0571-28221076"><span>0571-</span><span>28221076</span></a>
        </div>
      </div>
      <div className="float-item" onMouseEnter={()=>{this.setState({showModel:false})}}>
        <span className="iconfont font-wechat"/>
        <div className="detail">
          <img
            src={require('../../../images/website-show/QRCode.jpg')}
            alt=""/>
        </div>
      </div>
      <div className="float-item" onClick={this.scrollToTop} onMouseEnter={()=>{this.setState({showModel:false})}}>
        <span className="iconfont font-top"/>
      </div>
      {
        this.state.showModel?
          <AddConsult hide={()=>this.setState({showModel:false})}/>
          : ""
      }
    </div>
  }
}