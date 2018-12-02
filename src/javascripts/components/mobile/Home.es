import React, { Component } from "react";
import Link from "../commons/LangLink";
import Header from "./common/Header";
import Footer from "./common/Footer";
import NavMenu from "./common/NavMenu";
import { connect } from "react-redux";
import { getIndustryNews, getMediaReport } from "../../actions/websiteDataAction";
import Formatter from "../../lib/formatter";

@connect(state => ({
  news: state.website.media.concat(state.website.report)
}))
export default class Home extends Component {
  data = {
    linkTo: '/mobile/attestations/list',
    'ad': [
      {title: '数据安全', sub: '区块链+大数据', img: require('../../../images/mobile/home/ad1.png')},
      {title: '技术保障', sub: '存证数据实时上链', img: require('../../../images/mobile/home/ad2.png')},
      {title: '隐私保护', sub: '全方位保障隐私', img: require('../../../images/mobile/home/ad3.png')},
      {title: '权威资质', sub: '区块链研究单位', img: require('../../../images/mobile/home/ad4.png')},
      {title: '司法出证', sub: '司法鉴定证书', img: require('../../../images/mobile/home/ad5.png')}
    ],
    'product': [
      {
        title: '可信电子凭证',
        sub: '将有价值的电子数据映射为可信电子凭证',
        img: require('../../../images/mobile/home/product1.png'),
        route: '/mobile/production/electronic-certificate'
      },
      {
        title: '保全签',
        sub: '区块链+CA中心+司法鉴定中心+仲裁机构',
        img: require('../../../images/mobile/home/product2.png'),
        route: '/mobile/production/baoquan-visa'
      },
      // {
      //   title: '诚信档案',
      //   sub: '以“区块链+大数据”技术为基础，构建企业和个人的诚信档案',
      //   img: require('../../../images/mobile/home/product3.png'),
      //   route: '/mobile/production/credit-records'
      // },
      // {
      //   title: '区块链私有化部署',
      //   sub: '区块链+CA中心+司法鉴定中心+仲裁机构',
      //   img: require('../../../images/mobile/home/product2.png'),
      //   route: '/mobile/production/privatisation-deployment'
      // },
      {
        title: '司法鉴定通道',
        sub: '以“区块链+大数据”技术为基础，构建企业和个人的诚信档案',
        img: require('../../../images/mobile/home/product3.png'),
        route: '/mobile/production/forensic'
      }
    ],
    'plan': [
      {title: '科技金融', sub: '使金融资产交易过程中的资金流、信息流能够得到有效的记录并还原。', img: require('../../../images/mobile/home/plan1.png')},
      {
        title: '大数据交易',
        sub: '通过对大数据交易全流程的区块链记录和溯源，解决 数据卖方确权难、买方维权难、数据造假等问题。',
        img: require('../../../images/mobile/home/plan2.png')
      },
      {title: '知识产权', sub: '如何及时有效地对知识产权进行确权和保护成为一个 亟待解决的问题。', img: require('../../../images/mobile/home/plan3.png')},
      {title: '电子政务', sub: '数据的准确性和完整性关系到政府机关的权威。', img: require('../../../images/mobile/home/plan4.png')},
      {title: '防伪溯源', sub: '将区块链数据保全和物联网软硬件结合，为商品提供伪溯源服务。', img: require('../../../images/mobile/home/plan3.png')},
      {title: '公益', sub: '区块链记录公益全部数据，将助人行为留存并真实追溯爱心价值。', img: require('../../../images/mobile/home/plan2.png')},
      {title: '积分', sub: '区块链保全积分获取到流传的整体过程数据，实现价值最大化。', img: require('../../../images/mobile/home/plan1.png')},
    ],
    'news': []
  };

  state = {
    showAll: false
  };

  componentWillMount = () => {
    this.props.dispatch(getMediaReport());
    this.props.dispatch(getIndustryNews());
  };

  render() {
    let showAll = this.state.showAll, {news} = this.props, fmt = Formatter.get('yyyy-mm-dd hh:MM');
    this.data.news = news;
    return <div className="home product-common">
      <Header>
        <img className="logo" src={require('../../../images/logo@2x.png')} alt=''/>
        <NavMenu/>
      </Header>
      <header>
        <img src={require('../../../images/website-show/home/banner-home-1.jpg')}/>
        {/*<Link to={this.data.linkTo} className="button">立即体验</Link>*/}
        <a className="button" href="/mobile/marketing">立即体验</a>
      </header>
      <div className="card advert">
        {this.data.ad.map(
          (item, i) =>
            <article key={i} className="items">
              <aside>
                <span className="title">{item.title}</span>
                <span className="sub">{item.sub}</span>
              </aside>
              <div className="img-wrap">
                <img src={item.img} alt=""/>
              </div>
            </article>
        )}
      </div>
      <div className="card product">
        <h3 className="subTitle">产品与服务</h3>
        {this.data.product.map(
          (item, i) =>
            <article key={i} className="items">
              <div className="article">
                <img src={item.img} alt=""/>
                <aside>
                  <span className="title">{item.title}</span>
                  <span className="sub">{item.sub}</span>
                </aside>
              </div>
              <Link to={item.route}>
                <button>详情</button>
              </Link>
            </article>
        )}
      </div>
      <div className="card plan">
        <h3 className="subTitle">解决方案</h3>
        {(showAll ? this.data.plan : this.data.plan.slice(0, 4)).map(
          (item, i) =>
            <article key={i} className="items">
              <aside>
                <span className="title">{item.title}</span>
                <span className="sub">{item.sub}</span>
              </aside>
              <img src={item.img} alt=""/>
            </article>
        )}
        <span className="showMore" onClick={() => this.setState({showAll: !showAll})}>
          {showAll ? '收起' : '查看更多解决方案'}
        </span>
      </div>
      <img className="banner2" src={require('../../../images/mobile/home/banner2.png')}/>
      <div className="card plan news-home">
        <h3 className="subTitle">新闻动态</h3>
        {this.data.news.slice(0, 2).map(
          (item, i) =>
            <Link to={`/mobile/news/${item.id}`} key={i} className="items">
              <div className="img-wrap">
                <img src={item.fileKey || require('../../../images/website-show/others/pic-news-default-inside.png')}
                     alt=""/>
              </div>
              <aside>
                <span className="title">{item.title}</span>
                <div className="time">
                  <span>{fmt.format(item.createdAt)}</span>
                  <span>{item.source}</span>
                </div>
              </aside>
            </Link>
        )}
        <Link to="/mobile/news-list" className="showMore">了解更多新闻动态</Link>
      </div>
      <div className="button-group">
        {/*<Link to="/mobile/sign-up" className="button">
          立即注册 进入区块链时代
        </Link>*/}
        <a className="button" href="/mobile/marketing">
          立即接入 进入区块链时代
        </a>
      </div>
      <Footer>
        <a className="phone-button" href="tel://0571-28221076">
          <span>客服电话:</span><span className="phone">0571- 28221076</span>
        </a>
        <span className="record"> © 2018 baoquan.com    浙ICP备15025396号</span>
      </Footer>
    </div>
  }

}