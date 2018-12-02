import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";

export default class CreditRecords extends Component {

  data = {
    linkTo: '/mobile/attestations/list',
    'product': [
      {
        title: '企业信用聚合',
        sub: '聚合企业认证信息，一站式查询认证项目，保障企业的真实可靠',
        img: require('../../../../images/mobile/production/credit-records/p1.png')
      },
      {
        title: '区块链存证信用 ',
        sub: '区块链诚信认证是社会化诚信体系基础，企业诚信经营的保障',
        img: require('../../../../images/mobile/production/credit-records/p2.png')
      },
      {
        title: '社会化验证真伪',
        sub: '  大众评判，社会化验证，构建全方位社会化验证体系',
        img: require('../../../../images/mobile/production/credit-records/p3.png')
      },
      {
        title: '一站式信用溯源',
        sub: '运用区块链技术，企业认证信息不可篡改，企业信用一站式溯源',
        img: require('../../../../images/mobile/production/credit-records/p4.png')
      }
    ]
  };

  render() {
    return <div className="credit-records product-common">
      <Header>
        <Back/>
        <span className="title">诚信档案</span>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../../images/mobile/production/credit-records/banner.png')}/>
        {/*<Link to={this.data.linkTo} className="button">在线咨询</Link>*/}
      </header>
      <div className="card product">
        <h3 className="subTitle">产品服务</h3>
        <article>
          {this.data.product.map(
            (item, i) =>
              <div key={i} className="items">
                <img src={item.img} alt=""/>
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
        <img src={require('../../../../images/mobile/production/credit-records/flow.png')}/>
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