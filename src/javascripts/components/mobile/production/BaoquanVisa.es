import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";

export default class BaoquanVisa extends Component {

  data = {
    linkTo: '/mobile/signatures/profile',
    'product': [
      {
        title: '数据完全隐私',
        sub: '对文件进行HASH加密保全，合同文件仅签署节点有权限查看。',
        img: require('../../../../images/mobile/production/baoquan-visa/p1.png')
      },
      {
        title: '司法有效性',
        sub: '签署的合同具备司法有效性，可出具司法鉴定意见书，用于仲裁、调解等。',
        img: require('../../../../images/mobile/production/baoquan-visa/p2.png')
      },
      {
        title: '合同记录可溯源',
        sub: '所有签署方涉及文件的操作均通过区块链进行保全，合同记录可溯源。',
        img: require('../../../../images/mobile/production/baoquan-visa/p3.png')
      }
    ],
    'scene': [
      {
        title: '金融',
        sub: '投资协议 、担保协议',
        symbol: '......',
        img: require('../../../../images/website-show/production/pic-scene-finance.jpg')
      },
      {
        title: '旅游',
        sub: '旅游协议 、保险协议',
        symbol: '......',
        img: require('../../../../images/website-show/production/pic-scene-traver.jpg')
      },
      {
        title: '政务',
        sub: '政府文书 、采购协议',
        symbol: '......',
        img: require('../../../../images/website-show/production/pic-scene-gov.jpg')
      },
      {
        title: '公益',
        sub: '求助记录 、捐助记录',
        symbol: '......',
        img: require('../../../../images/website-show/production/pic-scene-public-benefit.jpg')
      },
      {
        title: '传统',
        sub: '雇佣合同 、合作协议',
        symbol: '......',
        img: require('../../../../images/website-show/production/pic-scene-custom.jpg')
      },
    ]
  };

  render() {
    return <div className="baoquan-visa product-common">
      <Header>
        <Back/>
        <span className="title">保全签</span>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../../images/mobile/production/baoquan-visa/banner.png')}/>
        <Link to={this.data.linkTo} className="button">查看我的签名</Link>
      </header>
      <div className="card product">
        <h3 className="subTitle">产品功能</h3>
        <article>
          {this.data.product.map(
            (item, i) =>
              <div key={i} className="items">
                <aside>
                  <span className="title">{item.title}</span>
                  <span className="sub">{item.sub}</span>
                </aside>
                <img src={item.img} alt=""/>
              </div>
          )}
        </article>
      </div>
      <div className="card scene">
        <h3 className="subTitle">应用场景</h3>
        <section>
          {this.data.scene.map(
            (item, i) =>
              <article key={i} className="items">
                <img src={item.img} alt=""/>
                <div className="content">
                  <span className="title">{item.title}</span>
                  <span className="sub">{item.sub}</span>
                  <span className="sub">{item.symbol}</span>
                </div>
              </article>
          )}
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