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

export default class WebForensics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '网页取证',
    toEvidence: require('../../../../images/website-show/production/to-evidence.png'),
    banner: {
      img: require('../../../../images/website-show/production/banner-web-forensics.jpg'),
      bgColor: '#086cea',
    },
    whatIs: {
      text: '网页取证是一款针对网页形式电子数据进行证据保全的产品，通过对网页内容实时固化保全，形成具备法律效力的电子证据，当需要出证时，可在线申请司法鉴定。',
      features: [
        {name: '诽谤、侮辱', url: require('../../../../images/website-show/production/web-forensic-info-one.png')},
        {name: '知识产权侵权', url: require('../../../../images/website-show/production/web-forensic-info-two.png')},
        {name: '负面谣传传播', url: require('../../../../images/website-show/production/web-forensic-info-three.png')},
        {name: '网站镜像仿冒', url: require('../../../../images/website-show/production/web-forensic-info-four.png')},
      ]
    },
    functions: [
      {
        name: '简单便捷',
        description: '仅需通过简单输入网址，即可在线取证。',
        img: require('../../../../images/website-show/production/web-forensic-advantage-one.png')
      },
      {
        name: '数据存证',
        description: '取证过程、源数据、路由等信息会全部被记录下来，并打包进行数据保全存证。',
        img: require('../../../../images/website-show/production/web-forensic-advantage-two.png')
      },
      {
        name: '司法鉴定',
        description: '对接第三方独立司法鉴定机构，提供一站式法律出证服务。',
        img: require('../../../../images/website-show/production/web-forensic-advantage-three.png')
      },
      {
        name: '实时上链',
        description: '取证数据进行上链处理，通过区块链实现完整、不可篡改、可追溯的数据记录。',
        img: require('../../../../images/website-show/production/web-forensic-advantage-four.png')
      },
    ],
    process: [
      {
        title: "发现",
        text: "发现目标网页",
        img: require('../../../../images/website-show/production/web-forensic-step-one.png')
      },
      {
        title: "登录／注册",
        text: "登录平台",
        img: require('../../../../images/website-show/production/web-forensic-step-two.png')
      },
      {
        title: "取证",
        text: "输入目标网址进行取证",
        img: require('../../../../images/website-show/production/web-forensic-step-three.png')
      },
      {
        title: "证据",
        text: "得到证据包",
        img: require('../../../../images/website-show/production/web-forensic-step-four.png')
      },
      {
        title: "法律服务",
        text: "申请司法鉴定或律师维权",
        img: require('../../../../images/website-show/production/web-forensic-step-five.png')
      },
    ],
  };

  dataEn = {
    name: 'Network Forensics',
    toEvidence: require('../../../../images/website-show/production/to-evidence.png'),
    banner: {
      img: require('../../../../images/website-show/production/banner-web-forensics-en.jpg'),
      bgColor: '#086cea',
    },
    whatIs: {
      text: '‘Network Forensics’ is a product for e-data attestation in the form of web-evidence. Based on the real-time processing, the web content would be transformed into electronic evidence, which has the legal effect. When certificate issuing required, you can apply for the online judicial expertise.',
      features: [
        {name: 'Slander & Insult', url: require('../../../../images/website-show/production/web-forensic-info-one.png')},
        {name: 'IP Infringement', url: require('../../../../images/website-show/production/web-forensic-info-two.png')},
        {name: 'Negative Rumor Spread', url: require('../../../../images/website-show/production/web-forensic-info-three.png')},
        {name: 'Mirroring Counterfeiting', url: require('../../../../images/website-show/production/web-forensic-info-four.png')},
      ]
    },
    functions: [
      {
        name: 'Simple & Convenient',
        description: 'Online network forensics by entering the URL.',
        img: require('../../../../images/website-show/production/web-forensic-advantage-one.png')
      },
      {
        name: 'Digital Attestation',
        description: 'All the information during the whole process would be recorded, and then packaged for digital attestation.',
        img: require('../../../../images/website-show/production/web-forensic-advantage-two.png')
      },
      {
        name: 'Judicial Expertise',
        description: 'Access to the judicial expertise institution, provide one-stop legal certificate issuing service.',
        img: require('../../../../images/website-show/production/web-forensic-advantage-three.png')
      },
      {
        name: 'Real-time on chain',
        description: 'Forensics data would be processed on Blockchain, then to realize a complete, immutable and traceable record. ',
        img: require('../../../../images/website-show/production/web-forensic-advantage-four.png')
      },
    ],
    process: [
      {
        title: "Discovery",
        text: "Find the target page",
        img: require('../../../../images/website-show/production/web-forensic-step-one.png')
      },
      {
        title: "Sign in/Sign up",
        text: "Sign in the platform",
        img: require('../../../../images/website-show/production/web-forensic-step-two.png')
      },
      {
        title: "Forensics",
        text: "Enter the target URL",
        img: require('../../../../images/website-show/production/web-forensic-step-three.png')
      },
      {
        title: "Evidence",
        text: "Obtain the evidence package",
        img: require('../../../../images/website-show/production/web-forensic-step-four.png')
      },
      {
        title: "Legal Service",
        text: "Apply for judicial expertise or rights safeguard",
        img: require('../../../../images/website-show/production/web-forensic-step-five.png')
      },
    ],
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
    if (typeof window !== 'undefined') document.title = lang === 'zh' ? '保全网-网页取证' : 'BAOQUAN.COM - Network Forensics';
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
          index: 2,
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
            <Link to="/evidences" className="btn-solution-white">{T.translate('common.to-evidence')}</Link>
          </div>
        </nav>
      </Banner>
      <article className="what">
        <h1 className="h1">{T.translate('pss.what', {content: this.data.name})}</h1>
        <p>{this.data.whatIs.text}</p>
        <div className="web-info">
          {this.data.whatIs.features.map(
            (item, i) =>
              <div key={i} className="feature">
                <img src={item.url} alt=""/>
                <h3>{item.name}</h3>
              </div>
          )}
        </div>
      </article>
      <article className="web-forensic-advantage" ref="function">
        <h1 className="h1">{T.translate('common.superiority')}</h1>
        <div className="advantage-item">
          {this.data.functions.map(
            (item, i) =>
              <section key={i}>
                <div className="image-content">
                  <img src={item.img} alt=""/>     
                </div>
                <aside>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </aside>
              </section>
          )}
        </div>
      </article>

      <article className="web-forensic-process">
        <h1 className="h1">{T.translate('common.process')}</h1>
        <div className="content">
          {this.data.process.map(
            (item, i) =>
              <section key={i} className="step">
                <img src={item.img} alt=""/>
                <aside>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </aside>
              </section>
          )}
        </div>
      </article>

      <article className="to-evidence">
        <img src={this.data.toEvidence} alt=""/>
        <Link to="/evidences">
          <button>{T.translate('common.to-evidence')}</button>
        </Link>
      </article>
      <Footer noMargin={true}/>
    </article>
  }
}