import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Link from "../../commons/LangLink";
import { getAbsScrollTop } from "../../../lib/getAbsScrollTop";
import FloatBar from "../FloatBar";
import Banner from "../Banner";
import { connect } from "react-redux";
import T from "i18n-react";
import LanguageUtil from "../../../utils/LanguageUtil";

@connect(state => ({
  location: state.router.location
}))
export default class CreditRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '诚信档案',
    banner: {
      img: require('../../../../images/website-show/production/banner-credit-record.jpg'),
      bgColor: '#086cea',
      info: {
        title: '诚信档案',
        subtitle: '诚信是社会发展与和谐的基础，保全网结合区块链，为个人与企业构建诚信档案，助力诚信社会的构建',
      },
    },
    whatIs: {
      text: '保全网以“区块链+大数据”技术为基础，构建企业和个人的诚信档案，对诚信信用信息进行存证、验证、聚合，同时采用社会化验真、质疑机制，为企业和个人提供全方位、有公信力的信用信息展示窗口。',
      img: require('../../../../images/website-show/production/pic-what-is-credit-record.png')
    },
    services: [
      {name: '企业信用聚合', description: '聚合企业认证信息，一站式查询认证项目，保障企业的真实可靠', iconClass: 'font-aggregate'},
      {name: '区块链存证信用 ', description: '区块链诚信认证是社会化诚信体系基础，企业诚信经营的保障', iconClass: 'font-block'},
      {name: '社会化验证真伪', description: '大众评判，社会化验证，构建全方位社会化验证体系', iconClass: 'font-identify-code'},
      {name: '一站式信用溯源', description: '运用区块链技术，企业认证信息不可篡改，企业信用一站式溯源', iconClass: 'font-trace'},
    ],
    process: {
      img: require('../../../../images/website-show/production/pic-process-credit-record.png'),
      cases: [
        {
          logo: '浙金网',
          img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
        },
        {
          logo: '算力宝',
          img: require('../../../../images/website-show/logo/logo-suanlibao.png')
        },
        {
          logo: '钱保姆',
          img: require('../../../../images/website-show/logo/logo-qianbaomu.jpg')
        },
        {
          logo: '钱庄网',
          img: require('../../../../images/website-show/logo/logo-qianzhuangwang.jpg')
        },
      ]
    },
    footer: {
      text: '向更多人展示你的信用',
      btn: '查看试用'
    }
  };

  dataEn = {
    name: 'Integrity Archives',
    banner: {
      img: require('../../../../images/website-show/production/banner-credit-record-en.jpg'),
      bgColor: '#086cea',
      info: {
        title: 'Integrity Archives',
        subtitle: 'Integrity is the basis for the development of society, combined with Blockchain, Baoquan.com provides the archive service  for personal and enterprise, further to promote the construction of credit society.',
      },
    },
    whatIs: {
      text: 'Based on the technologies of “Blockchain + Big data”, Baoquan.com provides the archive service  for personal and enterprise, recordkeeping the credit information while using the socialized verification and questioning mechanism, together to perfect the credit information display platform.',
      img: require('../../../../images/website-show/production/pic-what-is-credit-record-en.png')
    },
    services: [
      {
        name: 'Enterprise Credit Integration',
        description: 'Information aggregation, one-stop project for query and verify, to guarantee the reality of enterprise.',
        iconClass: 'font-aggregate'
      },
      {
        name: 'Credit Recordkeeping ',
        description: 'Blockchain credit authentication is the basis for the social credit system, to guarantee the business integrity of enterprise.',
        iconClass: 'font-block'
      },
      {
        name: 'Socialized Verification',
        description: 'Public evaluation, socialized verification, to supply comprehensive and socialized verification system',
        iconClass: 'font-identify-code'
      },
      {
        name: 'One-stop credit traceability',
        description: 'Using blockchain tech to ensure the immutability of the verified info, reach to one-stop credit traceability service',
        iconClass: 'font-trace'
      },
    ],
    process: {
      img: require('../../../../images/website-show/production/pic-process-credit-record-en.png'),
      cases: [
        {
          logo: '浙金网',
          img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
        },
        {
          logo: '算力宝',
          img: require('../../../../images/website-show/logo/logo-suanlibao.png')
        },
        {
          logo: '钱保姆',
          img: require('../../../../images/website-show/logo/logo-qianbaomu.jpg')
        },
        {
          logo: '钱庄网',
          img: require('../../../../images/website-show/logo/logo-qianzhuangwang.jpg')
        },
      ]
    },
    footer: {
      text: 'Show your credit for public access',
      btn: 'Experience Now'
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
    if (typeof window !== 'undefined') document.title = lang === 'zh' ? '保全网-可信电子凭证' : 'BAOQUAN.COM - Integrity Archives';
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
    return <article className="web-show-container" style={{backgroundColor: '#f6f7fb'}}>
      <Header noRoute={{
        product: {
          index: 3,
          clickFactory: (i) => {
            return this.setScrollTop
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
        <h1 className="h1">{T.translate('pss.what', {content: this.data.name})}</h1>
        <p>{this.data.whatIs.text}</p>
        <div className="map1" style={{height: '400px'}}>
          <img src={this.data.whatIs.img} alt=""/>
        </div>
      </article>
      <article className="services-product" ref="function">
        <h1 className="h1">{T.translate('pss.services')}</h1>
        <div className="services-container">
          {this.data.services.map(
            (item, i) =>
              <section key={i}>
                <span className={"iconfont " + item.iconClass}/>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </section>
          )}
        </div>
      </article>
      <article className="process position-80">
        <h1 className="h1">{T.translate('pss.flow')}</h1>
        <div className="map">
          <img src={this.data.process.img} alt=""/>
        </div>
        <div className="cases">
          <h2>{T.translate('pss.cases')}</h2>
          <div className="cases-container">
            {this.data.process.cases.map(
              (item, i) =>
                <div key={i} className="case">
                  <img src={this.data.process.cases[i].img} alt={this.data.process.cases[i].logo}/>
                </div>
            )}
          </div>
        </div>
      </article>
      <div className="footer-banner position-80">
        <h2>{this.data.footer.text}</h2>
        <Link to="" className="a">{this.data.footer.btn}</Link>
      </div>
      <Footer/>
    </article>
  }
}
