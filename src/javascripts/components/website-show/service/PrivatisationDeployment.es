import React, { Component } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Link from "../../commons/LangLink";
import { getAbsScrollTop } from "../../../lib/getAbsScrollTop";
import FloatBar from "../FloatBar";
import Banner from "../Banner";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";
import T from "i18n-react";

@connect(state => ({
  location: state.router.location
}))
export default class PrivatisationDeployment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '区块链私有化部署',
    banner: {
      img: require('../../../../images/website-show/service/banner-privatisation-deployment.jpg'),
      bgColor: '#182029',
      info: {
        title: '区块链私有化部署',
        subtitle: '区块链技术的三大特征：不可伪造不可篡改、可跟踪可溯源、公开透明可验证，能够为企业的发展赋予新势能。保全网根据行业特性，定制行业方案，是企业轻松进入区块链时代',
      },
    },
    whatIs: [
      {
        title: '区块链是什么',
        text: '区块链，是指通过去中心化和去信任的方式集体维护一个可靠数据库的技术方案。该技术方案主要让参与系统中的任意多个节点，通过一串使用密码学方法相关联产生的数据块，每个数据块中包含了一定时间内的系统全部信息交流数据，并且生成数据指纹用于验证其信息的有效性和链接下一个数据库块。',
        features: [
          {name: '不可伪造不可篡改', iconClass: 'font-keyboard-switch'},
          {name: '可跟踪可溯源', iconClass: 'font-track'},
          {name: '公开透明可验证', iconClass: 'font-identify-code'},
        ]
      }, {
        title: '司法有效性',
        text: '由保全网私有化部署的区块链存证系统，企业可以自行通过API接口对存证的数据申请司法鉴定，获取司法鉴定意见书。',
        img: require('../../../../images/website-show/service/pic-privatisation-deployment-forensic-effectiveness.png')
      }, {
        title: '应用案例',
        text: '以银行为例',
        img: require('../../../../images/website-show/service/pic-case-map.png')
      }
    ],
    advantages: [
      {name: '数据安全不泄露', iconClass: 'font-coin-internet'},
      {name: '直连上链保实时', iconClass: 'font-data-repository'},
      {name: '业务扩展定制化', iconClass: 'font-webpage'},
      {name: '快速实现区块链+', iconClass: 'font-host'},
    ],
    footer: {
      text: '马上进入区块链时代',
      btn: '在线咨询'
    }
  };

  dataEn = {
    name: 'Blockchain Privatized Deployment',
    banner: {
      img: require('../../../../images/website-show/service/banner-privatisation-deployment-en.jpg'),
      bgColor: '#182029',
      info: {
        title: 'Blockchain Privatized Deployment',
        subtitle: 'Blockchain has three key technical features: Immutability + Traceability + Transparency, which can enhance new energy for the development of enterprise. According to the industry characteristics, Baoquan.com provides the customized service help enterprise early moves into the Blockchain era.',
      },
    },
    whatIs: [
      {
        title: 'What is Blockchain',
        text: 'Blockchain is the underlying technology used by Bitcoin. It could be described as a distributed ledger or database, and all nodes of the ledger will be synchronized, which can keep every transaction data in record permanently. It is a series of data blocks linked by crypto-algorithm, once a piece of information is verified and become a part of the blockchain, it will then store permanently and unchangeable. ',
        features: [
          {name: 'Immutable &  Unfalsifiable', iconClass: 'font-keyboard-switch'},
          {name: 'Trackable & Traceable', iconClass: 'font-track'},
          {name: 'Transparent & Verifiable', iconClass: 'font-identify-code'},
        ]
      }, {
        title: 'Judicial Effect',
        text: 'Through the Blockchain recordkeeping system , the attestation data that in Baoquan.com can directly apply for judicial expertise, issuing the judicial expertise certificate.',
        img: require('../../../../images/website-show/service/pic-privatisation-deployment-forensic-effectiveness-en.png')
      }, {
        title: 'Cases',
        text: 'Take Bank as an example',
        img: require('../../../../images/website-show/service/pic-case-map-en.png')
      }
    ],
    advantages: [
      {name: 'Data security', iconClass: 'font-coin-internet'},
      {name: 'Real-time on chain', iconClass: 'font-data-repository'},
      {name: 'Customized service', iconClass: 'font-webpage'},
      {name: 'Blockchain +', iconClass: 'font-host'},
    ],
    footer: {
      text: 'Move into Blockchain era',
      btn: 'Online Contact'
    }
  };

  componentWillMount = () => {
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? '保全网-' : 'BAOQUAN.COM - ') + this.data.name;
  };

  componentDidMount = () => {
    let {location} = this.props;
    if (location.query.hasOwnProperty('index')) {
      this.setScrollTop();
    }
  };

  setScrollTop = () => {
    setImmediate(() => {
      document.body.scrollTop = document.documentElement.scrollTop = getAbsScrollTop(this.refs.function).y - 80;
    })
  };

  changeStyle = (isHover) => {
    return () => {
      this.setState({isHover: isHover})
    }
  };

  render() {
    return <div className="web-show-container" style={{backgroundColor: '#f6f7fb'}}>
      <Header noRoute={{
        product: {
          index: 4, clickFactory: (i) => {
            return this.setScrollTop;
          }
        }
      }}/>
      <FloatBar/>
      <Banner bannerData={this.data.banner}>
        <nav>
          <div className="a-solution-wrap" onMouseEnter={this.changeStyle(true)} onMouseLeave={this.changeStyle(false)}
               style={this.state.isHover ? {
                 borderColor: '#fff',
                 backgroundColor: '#fff',
                 color: this.data.banner.bgColor
               } : {}}>
            <a href='http://wpa.qq.com/msgrd?v=3&uin=1434851251&site=qq&menu=yes' target="_blank"
               className="btn-solution-white">{T.translate('pss.contact')}</a>
          </div>
        </nav>
      </Banner>
      <article className="what">
        <h1 className='h1'>
          <span className='decoration-left'/>{this.data.whatIs[0].title}<span className='decoration-right'/>
        </h1>
        <p>{this.data.whatIs[0].text}</p>
        <div className="features">
          {this.data.whatIs[0].features.map(
            (item, i) =>
              <div key={i} className="feature">
                <span className={"iconfont " + item.iconClass}/>
                <h3>{item.name}</h3>
              </div>
          )}
        </div>
      </article>
      <article className="what bg-transparent">
        <h1 className='h1'>
          <span className='decoration-left'/>{this.data.whatIs[1].title}<span className='decoration-right'/>
        </h1>
        <p className="text-center">{this.data.whatIs[1].text}</p>
        <div className="map1" style={{height: '90px'}}>
          <img src={this.data.whatIs[1].img} alt=""/>
        </div>
      </article>
      <article className="advantages" ref="function">
        <h1 className="h1">{T.translate('pss.advantages')}</h1>
        <div className="advantages-container">
          {this.data.advantages.map(
            (item, i) =>
              <section key={i} className="advantage">
                <span className={'iconfont ' + item.iconClass}/>
                <h2>{item.name}</h2>
              </section>
          )}
        </div>
      </article>
      <article className="what negative-margin">
        <h1 className='h1'>
          <span className='decoration-left'/>{this.data.whatIs[2].title}<span className='decoration-right'/>
        </h1>
        <p className="text-center">{this.data.whatIs[2].text}</p>
        <div className="map1">
          <img src={this.data.whatIs[2].img} alt=""/>
        </div>
      </article>
      <div className="footer-banner position-80">
        <h2>{this.data.footer.text}</h2>
        <Link to="" className="a">{this.data.footer.btn}</Link>
      </div>
      <Footer/>
    </div>
  }
}
