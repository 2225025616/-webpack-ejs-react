import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";

export default class Forensic extends Component {

  data = {
    linkTo: '/mobile/attestations/list',
    'product': [
      {title: '登录账户', sub: '登录保全网账户', img: require('../../../../images/mobile/production/forensic/01.png')},
      {
        title: '选择数据',
        sub: '点击“我的保全”菜单，选择需要保全的数据（可多选），点击“申请出证”',
        img: require('../../../../images/mobile/production/forensic/02.png')
      },
      {
        title: '填写信息',
        sub: '确认保全数据，选择公证类型，填写其他信息，并选择相关内容类型，确认后点击“下一步”',
        img: require('../../../../images/mobile/production/forensic/03.png')
      },
      {
        title: '申请成功',
        sub: '申请成功，我们的工作人员会在3个工作日内联系您',
        img: require('../../../../images/mobile/production/forensic/04.png')
      }
    ]
  };

  render() {
    return <div className="forensic product-common">
      <Header>
        <Back/>
        <span className="title">司法鉴定通道</span>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../../images/mobile/production/forensic/banner.png')}/>
        <Link to={this.data.linkTo} className="button">立即出证</Link>
      </header>
      <div className="card product">
        <h3 className="subTitle">保全网出证流程</h3>
        <article>
          {this.data.product.map(
            (item, i) =>
              <div key={i} className="items">
                <div className="img-bg">
                  <img src={item.img} alt=""/>
                </div>
                <aside>
                  <span className="title">{item.title}</span>
                  <span className="sub">{item.sub}</span>
                </aside>
              </div>
          )}
        </article>
      </div>
      <div className="card scene">
        <h3 className="subTitle">使用流程</h3>
        <section>
          <img src={require('../../../../images/mobile/production/forensic/book.png')}/>
          <p>全球首张区块链电子数据司法鉴定证书落地</p>
        </section>
      </div>
      <Footer>
        <img className="qr-code" src={require('../../../../images/website-show/QRCode.jpg')}/>
        <p className="tips">长按保存图片，在微信中扫描二维码</p>
        <a className="phone-button" href="tel://0571-28221076">
          <span>客服电话:</span><span className="phone">0571- 28221076</span>
        </a>
        <span className="record"> © 2018 baoquan.com    浙ICP备15025396号</span>
      </Footer>
    </div>;
  }
}