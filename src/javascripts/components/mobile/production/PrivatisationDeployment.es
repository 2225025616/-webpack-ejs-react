import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";

export default class PrivatisationDeployment extends Component {

  data = {
    linkTo: '/mobile/notaries/list',
    'block': [
      {title: '不可伪造不可篡改', img: require('../../../../images/mobile/production/privatisation-deployment/p1.png')},
      {title: '可跟踪可溯源', img: require('../../../../images/mobile/production/privatisation-deployment/p2.png')},
      {title: '公开透明可验证', img: require('../../../../images/mobile/production/privatisation-deployment/p3.png')}
    ]
  };

  render() {
    return <div className="privatisation-deployment product-common">
      <Header >
        <Back />
        <span className="title">私有化部署</span>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../../images/mobile/production/privatisation-deployment/banner.png')}/>
        {/*<Link to={this.data.linkTo} className="button">在线咨询</Link>*/}
      </header>
      <div className="card product block">
        <h3 className="subTitle">区块链是什么</h3>
        <article>
          <p>区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。
            所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法。</p>
          <section>
            {this.data.block.map(
              (item, i) =>
                <div key={i} className="items">
                  <div className="img-wrap"><img src={item.img} alt=""/></div>
                  <span className="title">{item.title}</span>
                </div>
            )}
          </section>
        </article>
      </div>
      <div className="card advant">
        <h3 className="subTitle">产品优势</h3>
        <section>
          <div>
            <img src={require('../../../../images/mobile/production/privatisation-deployment/1.png')}/>
            <span>数据安全不泄露</span>
          </div>
          <div>
            <img src={require('../../../../images/mobile/production/privatisation-deployment/2.png')}/>
            <span>直连上链保实时</span>
          </div>
        </section>
        <section>
          <div>
            <img src={require('../../../../images/mobile/production/privatisation-deployment/3.png')}/>
            <span>业务扩展定制化</span>
          </div>
          <div>
            <img src={require('../../../../images/mobile/production/privatisation-deployment/4.png')}/>
            <span>快速实现区块链+</span>
          </div>
        </section>
      </div>
      <div className="card scene">
        <h3 className="subTitle">司法有效性</h3>
        <section>
          <img src={require('../../../../images/mobile/production/privatisation-deployment/flow.png')}/>
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