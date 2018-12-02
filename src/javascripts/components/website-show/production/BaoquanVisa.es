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
export default class BaoquanVisa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      functionHoverIndex: parseInt(this.props.location.query.index) || 0,
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '保全签',
    banner: {
      img: require('../../../../images/website-show/production/banner-baoquan-visa.png'),
      bgColor: '#086cea',
      info: {
        title: '保全签',
        subtitle: '有效、隐私的电子合同，保全网通过传统的CA与区块链技术进行结合，推出基于区块链的协议部署——保全签。在保证合同数据仅签署方可以看到的同事，使合同具备完整的法律效力',
      },
    },
    whatIs: {
      text: '保全签是保全网结合区块链特性，引入CA中心、司法鉴定中心、仲裁机构等权威节点，用户注册后作为轻节点接入区块链网络，所有参与节点行为均被区块链网络记录，签署合同记录可溯源，同时具有司法效力。',
      img: require('../../../../images/website-show/production/pic-what-is-baoquan-visa.png')
    },
    functions: [
      {
        name: '数据完全隐私',
        description: '对文件加密保全，合同文件仅签署节点有权限查看',
        img: require('../../../../images/website-show/production/pic-data-secrecy.jpg')
      },
      {
        name: '司法有效性',
        description: '签署的合同具备司法有效性，可出具司法鉴定意见书，用于仲裁、调解等。',
        img: require('../../../../images/website-show/production/pic-effectiveness.jpg')
      },
      {
        name: '合同记录可溯源',
        description: '所有签署方涉及文件的操作均通过区块链进行保全，合同记录可溯源',
        img: require('../../../../images/website-show/production/pic-traceability.png')
      },
    ],
    applications: [
      {
        name: '金融',
        description: '投资协议 、担保协议',
        img: require('../../../../images/website-show/production/pic-scene-finance.jpg')
      },
      {
        name: '旅游',
        description: '旅游协议 、保险协议',
        img: require('../../../../images/website-show/production/pic-scene-traver.jpg')
      },
      {
        name: '政务',
        description: '政府文书 、采购协议',
        img: require('../../../../images/website-show/production/pic-scene-gov.jpg')
      },
      {
        name: '公益',
        description: '求助记录 、捐助记录',
        img: require('../../../../images/website-show/production/pic-scene-public-benefit.jpg')
      },
      {
        name: '传统',
        description: '雇佣合同 、合作协议',
        img: require('../../../../images/website-show/production/pic-scene-custom.jpg')
      },
    ],
    process: {
      img: require('../../../../images/website-show/production/pic-process.png')
    },
    interfaces: [
      {
        name: '平台签',
        features: ['原文签署', '文档保全', '手绘签章'],
        img: require('../../../../images/website-show/production/pic-baoquan-visa-platform.png'),
        scenes: ['个人借款协议', '个人买卖合同', '小企业劳动协议', '个人租房协议'],
      },
      {
        name: 'API签',
        features: ['API接入', 'hash摘要签署', '签章自动生成'],
        img: require('../../../../images/website-show/production/pic-baoquan-visa-api.png'),
        scenes: ['物流单据', '旅游合同', '交易协议', '招投标合同', '入驻协议'],
      }
    ]
  };

  dataEn = {
    name: 'Baoquan Sig',
    banner: {
      img: require('../../../../images/website-show/production/banner-baoquan-visa-en.png'),
      bgColor: '#086cea',
      info: {
        title: 'Baoquan Sig',
        subtitle: 'E-contract with efficiency and privacy, Combined CA with blockchain technology, Baoquan.com launched the Blockchain contract signature——Baoquan Sig. Data is only visible for the signatories, while the contract has the judicial efficiency.',
      },
    },
    whatIs: {
      text: 'Through the technical features of Blockchain, Baoquan Sig introduces the nodes of CA, notarization and arbitration, and takes the users as the light nodes on Blockchain, all the behaviors of the full nodes would be recorded to ensure the traceability of signed contract, which have the legal validity.',
      img: require('../../../../images/website-show/production/pic-what-is-baoquan-visa-en.png')
    },
    functions: [
      {
        name: 'Data privacy',
        description: 'Encrypt the file with hash, only visible for the signed nodes.',
        img: require('../../../../images/website-show/production/pic-data-secrecy-en.jpg')
      },
      {
        name: 'Judicial efficiency',
        description: 'The signed contract has the judicial efficiency, issuing the judicial expertise certificate for mediating.',
        img: require('../../../../images/website-show/production/pic-effectiveness-en.jpg')
      },
      {
        name: 'Contract traceability',
        description: 'All the involved files would be recorded on Blockchain, trackable from the end to the source.',
        img: require('../../../../images/website-show/production/pic-traceability-en.jpg')
      },
    ],
    applications: [
      {
        name: 'Finance',
        description: 'Investment agreement, Guarantee agreement',
        img: require('../../../../images/website-show/production/pic-scene-finance.jpg')
      },
      {
        name: 'Tourism',
        description: 'Travel agreement, Insurance agreement',
        img: require('../../../../images/website-show/production/pic-scene-traver.jpg')
      },
      {
        name: 'Government affair',
        description: 'Government document, Purchase agreement',
        img: require('../../../../images/website-show/production/pic-scene-gov.jpg')
      },
      {
        name: 'Public welfare',
        description: 'Help record, Assistance record',
        img: require('../../../../images/website-show/production/pic-scene-public-benefit.jpg')
      },
      {
        name: 'Traditional',
        description: 'Employment contract, Cooperation agreement',
        img: require('../../../../images/website-show/production/pic-scene-custom.jpg')
      },
    ],
    process: {
      img: require('../../../../images/website-show/production/pic-process.png')
    },
    interfaces: [
      {
        name: 'Platform Sig',
        features: ['Original-text Sign', 'File Attestation', 'Hand-drawn Signature'],
        img: require('../../../../images/website-show/production/pic-baoquan-visa-platform-en.png'),
        scenes: ['Rental Agreement', 'Labour Agreement', 'Exchange Contract', 'Loan Agreement'],
      },
      {
        name: 'API Sig',
        features: ['API Access', 'Hash-digest Sig', 'Auto-generation of signature'],
        img: require('../../../../images/website-show/production/pic-baoquan-visa-api-en.png'),
        scenes: ['Logistics Document', 'Travel Contract', 'Trading Agreement', 'Bidding Contract', 'Settled Agreement'],
      }
    ]
  };

  componentWillMount = () => {
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  componentDidMount = () => {
    let {location} = this.props;
    if (location.query.hasOwnProperty('index')) {
      this.setScrollTop();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = lang === 'zh' ? '保全网-可信电子凭证' : 'BAOQUAN.COM - Baoquan Sig';
  };

  changeIndex = (index) => {
    return () => {
      this.setState({
        functionHoverIndex: index
      });
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
    return <article className="web-show-container" style={{backgroundColor: '#f6f7fb'}}>
      <Header noRoute={{
        product: {
          index: 1,
          clickFactory: (i) => {
            return () => {
              this.changeIndex(i)();
              this.setScrollTop()
            }
          }
        }
      }}/>
      <FloatBar/>
      <Banner bannerData={this.data.banner}>
        <nav>
          <Link to="/signatures/profile" className="btn-yellow a">{T.translate('pss.access')}</Link>
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
        <h1 className="h1">{T.translate('pss.what', {content: this.data.name})}</h1>
        <p>{this.data.whatIs.text}</p>
        <div className="map">
          <img src={this.data.whatIs.img} alt=""/>
        </div>
      </article>
      <article className="product-functions functions-bq" ref="function">
        <h1 className="h1">{T.translate('pss.function')}</h1>
        <div className="tab">
          {this.data.functions.map(
            (item, i) =>
              <button key={i} className={this.state.functionHoverIndex === i ? "selected" : ''}
                      onMouseEnter={this.changeIndex(i)}>
                {this.data.functions[i].name}
              </button>
          )}
        </div>
        <p>{this.data.functions[this.state.functionHoverIndex].description}</p>
        <div className="map margin-bottom">
          <img src={this.data.functions[this.state.functionHoverIndex].img} alt=""/>
        </div>
      </article>
      <article className="applications applications-bq">
        <h1 className="h1">{T.translate('pss.apply')}</h1>
        <div className="tab">
          {(() => {
            let fragment = [];
            for (let i = 0; i < this.data.applications.length; i++) {
              fragment.push(
                <section key={i}>
                  <img src={this.data.applications[i].img} alt=""/>
                  <h2>{this.data.applications[i].name}</h2>
                  <p>{this.data.applications[i].description}</p>
                  <span>......</span>
                </section>
              )
            }
            return fragment;
          })()}
        </div>
      </article>
      <article className="interfaces">
        <h1 className="h1">{T.translate('pss.access-method')}</h1>
        {this.data.interfaces.map(
          (item, i) =>
            <article key={i}>
              <h2>{item.name}
                {item.features.map(
                  (item, i) => <em key={i}><span>&bull;</span>{item}</em>
                )}
              </h2>
              <div className="map">
                <img src={item.img} alt=""/>
              </div>
              <section className="scenes">
                <h3>{T.translate('pss.cases')}</h3>
                <div className="scenes-container">
                  {item.scenes.map(
                    (item, i) =>
                      <div key={i} className="scene">{item}</div>
                  )}
                </div>
              </section>
            </article>
        )}
      </article>
      <Footer/>
    </article>
  }
}
