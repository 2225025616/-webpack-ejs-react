import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
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
export default class ElectronicCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      functionHoverIndex: parseInt(this.props.location.query.index) || 0,
      applyHoverIndex: 0,
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '可信电子凭证',
    banner: {
      img: require('../../../../images/website-show/production/banner-electronic-certificate.png'),
      bgColor: '#086cea',
      info: {
        title: '可信电子凭证',
        subtitle: '区块量数据保全，基于区块链价值网络，我们致力于将有价值的电子数据映射为可信电子凭证',
      },
    },
    whatIs: {
      text: ['保全网基于区块链三大特征：', '不可伪造不可篡改、可跟踪可溯源、公开透明可验证，对接司法、公证、仲裁通道，将原本比特世界易复制、易篡改的电子数据可信电子凭证化。基于保全网分层区块链存储体系，保全网实现了数据的唯一性。并且通过利用云存储技术及SDK封装技术的结合，实现了对于各类型电子数据的可信电子凭证化服务。即所有信息化系统工作过程中所产生与流转的数据都能够通过保全网区块链的接口式调用，简便地通过区块链实现完整、不可改、可追溯的数据记录，以此提供一站式数据保全服务。'],
      img: require('../../../../images/website-show/production/PIC.png')
    },
    why: [
      {
        name: '股权交易中心',
        description: '交易场所应当妥善保存各种交易记录、结算数据、交收资料等原始凭证，保管期限不少于 20 年。',
        cite: '——《山东省权益类交易场所管理暂行办法》',
        iconClass: 'font-invest'
      },
      {
        name: '互联网金融交易平台',
        description: '网络借贷信息中介机构应当采取适当的方法和技术，记录并妥善保存网络借贷业务活动数据和资料，做好数据备份。保存期限应当符合法律法规及网络借贷有关监管规定的要求。借贷合同到期后应当至少保存５年。',
        cite: '——《网络借贷信息中介机构业务活动管理暂行办法》',
        iconClass: 'font-finance-internet'
      },
      {
        name: '大宗商品交易市场',
        description: '商品现货交易场所应当实时记录商品仓储、交易、交收、结算、支付等相关信息，采取完整的数据安全保护和数据备份措施，确保登记、存管、结算、交收资料信息完整和安全，并保存5年以上。',
        cite: '——《河南省商品现货交易场所监督管理办法（试行）的通知》',
        iconClass: 'font-trade'
      },
    ],
    functions: [
      {
        name: '标准API接口',
        description: '完善的API，外部系统可以快速实现数据上链保全存证。',
        img: require('../../../../images/website-show/production/pic-API.jpg'),
      },
      {
        name: '支持各种数据类型',
        description: '丰富的数据类型支持，满足各种场景下的保全存证需求。',
        img: require('../../../../images/website-show/production/pic-datatype.jpg'),
      },
      {
        name: '分布式网络存储',
        description: '原始数据打散存储至云端，保证数据安全与隐私。',
        img: require('../../../../images/website-show/production/pic-distributed-storage.png'),
      },
      {
        name: '多路由公链保全',
        description: 'Baas多路由上链，最大程度保障可靠性。',
        img: require('../../../../images/website-show/production/pic-baas.png'),
      },
      {
        name: '司法有效性',
        description: '通过保全网保全存证的数据，可在线申请出具司法鉴定意见书，具备完整法律效力。',
        img: require('../../../../images/website-show/production/pic-forensic.png'),
      },
    ],
    applications: [
      {
        name: '互联网金融',
        img: require('../../../../images/website-show/production/pic-finance-internet.png')
      },
      {
        name: '电子商务',
        img: require('../../../../images/website-show/production/pic-e-commerce.png')
      },
      {
        name: '电子合同',
        img: require('../../../../images/website-show/production/pic-e-contract.png')
      },
      {
        name: '证书档案',
        img: require('../../../../images/website-show/production/pic-record.png')
      },
      {
        name: '数据存储',
        img: require('../../../../images/website-show/production/pic-data.png')
      },
    ],
    interfaces: [
      {
        name: 'API接入',
        features: ['无需对现有系统进行改造', '标准化接口', '接入时间快（5个工作日内）'],
        img: require('../../../../images/website-show/production/pic-API2.png'),
        cases: [
          {
            logo: '杭州市地方税务局',
            img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
          },
          {
            logo: '浙金网',
            img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
          },
          {
            logo: '拾贝',
            img: require('../../../../images/website-show/logo/logo-shibei.png')
          },
          {
            logo: '灵析',
            img: require('../../../../images/website-show/logo/logo-lingxi.png')
          },
          {
            logo: '算力宝',
            img: require('../../../../images/website-show/logo/logo-suanlibao.png')
          },
        ]
      },
      {
        name: '私有化部署',
        features: ['深度结合业务', '数据不通过平台', '定制化部署'],
        img: require('../../../../images/website-show/production/pic-deploy.png'),
        cases: [
          {
            logo: '杭州银行',
            img: require('../../../../images/website-show/logo/logo-hangzhouyinhang.png')
          },
        ]
      }
    ]
  };

  dataEn = {
    name: 'Trustworthy Electronic Certificate',
    shortName: 'TEC',
    banner: {
      img: require('../../../../images/website-show/production/banner-electronic-certificate-en.png'),
      bgColor: '#086cea',
      info: {
        title: 'Trustworthy Electronic Certificate',
        subtitle: 'Blockchain attestation for e-data, based on the Blockchain network, we are devoting ourselves to transfer the valued e-data to the trustworthy electronic certificate',
      },
    },
    whatIs: {
      text: ['For the three key technical features of Blockchain:', '1. Immutable, unfalsifiable; 2. Public distributed ledger which is transparent and verifiable; 3. Trackable from the end to the source. Access to the channels of judicature, notarization and arbitration, it can provide the trustworthy electronic certificate for the e-data. Based on the multi-layer Blockchain storage system, Baoquan.com guarantees the uniqueness of data, as well as provides the trustworthy electronic certificate service, which combining  the cloud storage technology with SDK packaging technology. All the produced and circulated data could be called via the interface of Baoquan.com, and then storaged on the Blockchain with the proof of immutability and traceability, further providing the one-stop data attestation service.'],
      img: require('../../../../images/website-show/production/PIC-en.png')
    },
    why: [
      {
        name: 'Equity Trading Centre',
        description: 'The trading centre should recordkeeping the original certificates which involve the transaction records data and settlement data,  and the storage period must be no less than  20 years.',
        cite: '《Shandong Interim Measures for the equity trading centre》',
        iconClass: 'font-invest'
      },
      {
        name: 'Internet financial trading platform',
        description: 'The suitable method and technology should be adopted by the Internet loan intermediary agency, and all the involved business data and information should be recorded and back-up. The storage period must meet the requirement of the related rules. It should be kept for at least 5 years when the contract expired.',
        cite: '《Interim Measures for the Internet loan intermediary agency》',
        iconClass: 'font-finance-internet'
      },
      {
        name: 'Commondity-trading market',
        description: 'All the involved information of storage, trade, settlement and payment should be recorded in the commondity-trading market, as well as taking measures for the data protection and data back-up, then to ensure the integrity of information which would be kept for more than 5 years.',
        cite: '《Henan Interim Measures for the commondity-trading market》',
        iconClass: 'font-trade'
      },
    ],
    functions: [
      {
        name: 'Standard API interface',
        description: 'Perfected API, the data from outer system can be recorded on the chain in a high speed.',
        img: require('../../../../images/website-show/production/pic-API-en.jpg'),
      },
      {
        name: 'Variety of data types',
        description: 'Support for a variety of data types, to satisfy the recordkeeping requirements under any scenes.',
        img: require('../../../../images/website-show/production/pic-datatype-en.jpg'),
      },
      {
        name: 'Distributed network storage',
        description: 'The original data would be scattered and recorded on the Cloud, to ensure data security and privacy.',
        img: require('../../../../images/website-show/production/pic-distributed-storage-en.png'),
      },
      {
        name: 'Multiple routing',
        description: 'Multi-route on chain based on Baas, to guarantee the reliability.',
        img: require('../../../../images/website-show/production/pic-baas-en.png'),
      },
      {
        name: 'Judicial efficiency',
        description: 'The attestation data can apply for the issuing of the trustworthy electronic certificate, which has the force of law.',
        img: require('../../../../images/website-show/production/pic-forensic-en.png'),
      },
    ],
    applications: [
      {
        name: 'Internet Financial',
        img: require('../../../../images/website-show/production/pic-finance-internet-en.png')
      },
      {
        name: 'E-commerce',
        img: require('../../../../images/website-show/production/pic-e-commerce-en.png')
      },
      {
        name: 'E-contract',
        img: require('../../../../images/website-show/production/pic-e-contract-en.png')
      },
      {
        name: 'Certificate archive',
        img: require('../../../../images/website-show/production/pic-record-en.png')
      },
      {
        name: 'Data storage',
        img: require('../../../../images/website-show/production/pic-data-en.png')
      },
    ],
    interfaces: [
      {
        name: 'API',
        features: ['No need for the reconstruction', 'Standard interface', 'High efficiency (5 weekdays)'],
        img: require('../../../../images/website-show/production/pic-API2-en.png'),
        cases: [
          {
            logo: '杭州市地方税务局',
            img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
          },
          {
            logo: '浙金网',
            img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
          },
          {
            logo: '拾贝',
            img: require('../../../../images/website-show/logo/logo-shibei.png')
          },
          {
            logo: '灵析',
            img: require('../../../../images/website-show/logo/logo-lingxi.png')
          },
          {
            logo: '算力宝',
            img: require('../../../../images/website-show/logo/logo-suanlibao.png')
          },
        ]
      },
      {
        name: 'Priv-Deploy',
        features: ['Combined with business', 'Without in platform', 'Customized deployment'],
        img: require('../../../../images/website-show/production/pic-deploy-en.png'),
        cases: [
          {
            logo: '杭州银行',
            img: require('../../../../images/website-show/logo/logo-hangzhouyinhang.png')
          },
        ]
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
    if (typeof window !== 'undefined') document.title = lang === 'zh' ? '保全网-可信电子凭证' : 'BAOQUAN.COM - Trustworthy Electronic Certificate';
  };

  changeIndex = (index, type) => {
    if (type !== 'apply') {
      return () => {
        this.setState({
          functionHoverIndex: index
        });
      }
    }

    return () => {
      this.setState({
        applyHoverIndex: index
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
          index: 0,
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
          <Link to="/attestations" className="btn-yellow a">{T.translate('pss.access')}</Link>
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
        <h1
          className="h1">{T.translate('pss.what', {content: this.data.shortName || this.data.name})}</h1>
        <h2>{this.data.whatIs.text[0]}</h2>
        <p>{this.data.whatIs.text[1]}</p>
        <div className="map1" style={{height: '520px'}}>
          <img src={this.data.whatIs.img} alt=""/>
        </div>
      </article>
      <article className="why">
        <h1
          className="h1">{T.translate('pss.why', {content: this.data.shortName || this.data.name})}</h1>
        {this.data.why.map(
          (item, i) =>
            <article key={i} className="why-item">
              <span className={"iconfont " + item.iconClass}/>
              <div className="why-item-container">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <cite>{item.cite}</cite>
              </div>
            </article>
        )}
      </article>
      <article className="product-functions" ref="function">
        <h1 className="h1">{T.translate('pss.function')}</h1>
        <div className="tab">
          {this.data.functions.map(
            (item, i) =>
              <button key={i} className={this.state.functionHoverIndex === i ? "selected" : ''}
                      onMouseEnter={this.changeIndex(i, '')}>
                {item.name}
              </button>
          )}
        </div>
        <p>{this.data.functions[this.state.functionHoverIndex].description}</p>
        <div className="map">
          <img src={this.data.functions[this.state.functionHoverIndex].img} alt=""/>
        </div>
      </article>
      <article className="applications">
        <h1 className="h1">{T.translate('pss.apply')}</h1>
        <div className="tab">
          {this.data.applications.map(
            (item, i) =>
              <button key={i} className={this.state.applyHoverIndex === i ? "selected" : ''}
                      onMouseEnter={this.changeIndex(i, 'apply')}>
                {item.name}
              </button>
          )}
        </div>
        <div className="map">
          <img src={this.data.applications[this.state.applyHoverIndex].img} alt=""/>
        </div>
        <span className="tip">
          {T.translate('pss.more-app')}
          <a href="http://wpa.qq.com/msgrd?v=3&uin=371335076&site=qq&menu=yes" target="_blank" className="a">
            {T.translate('pss.contact')}
          </a>
        </span>
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
              <section className="cases">
                <h3>{T.translate('pss.cases')}</h3>
                <div className="cases-container">
                  {item.cases.map(
                    (item, i) =>
                      <div key={i} className="case">
                        <img src={item.img} alt={item.logo}/>
                      </div>
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
