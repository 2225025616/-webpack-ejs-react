import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";

export default class ElectronicCertificate extends Component {

  data = {
    linkTo: '/mobile/attestations/list',
    'product': [
      {
        title: '标准API接口',
        sub: '完善的API，外部系统可以快速实现数据上链保全存证。',
        img: require('../../../../images/mobile/production/electronic-certificate/p1.png')
      },
      {
        title: '支持各种数据类型',
        sub: '丰富的数据类型支持，满足各种场景下的保全存证需求。',
        img: require('../../../../images/mobile/production/electronic-certificate/p2.png')
      },
      {
        title: '分布式网络存储',
        sub: '原始数据打散存储至云端，保证数据安全与隐私。',
        img: require('../../../../images/mobile/production/electronic-certificate/p3.png')
      },
      {
        title: '多路由公链保全',
        sub: 'Baas多路由上链，最大程度保障可靠性。',
        img: require('../../../../images/mobile/production/electronic-certificate/p4.png')
      },
      {
        title: '司法有效性',
        sub: '通过保全网保全存证的数据，可在线申请出具司法鉴定意见书，具备完整法律效力。',
        img: require('../../../../images/mobile/production/baoquan-visa/p2.png')
      },
    ],
    'scene': [
      {img: require('../../../../images/mobile/production/electronic-certificate/1.png')},
      {img: require('../../../../images/mobile/production/electronic-certificate/2.png')},
      {img: require('../../../../images/mobile/production/electronic-certificate/3.png')},
      {img: require('../../../../images/mobile/production/electronic-certificate/4.png')},
      {img: require('../../../../images/mobile/production/electronic-certificate/5.png')},
    ]
  };

  render() {
    return <div className="electronic-certificate product-common">
      <Header >
        <Back />
        <span className="title">可信电子凭证</span>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../../images/mobile/production/electronic-certificate/banner.png')}/>
        <Link to={this.data.linkTo} className="button">查看我的保全</Link>
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