import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatBar from "./FloatBar";
import LanguageUtil from "../../utils/LanguageUtil";
import T from "i18n-react";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))

export default class CFCA extends Component {

  data = '';

  dataZh = {
    name: 'CFCA证书',
    banner: {
      logo: require('../../../images/logo@2x.png'),
      img: require('../../../images/website-show/CFCA/banner-CFCA.jpg'),
      bgColor: 'transparent',
    },
    what: {
      text: '数字证书是基于密码技术生成的一种电子文件，作为网络世界中的身份证件，由 CA 机构颁发。'
    },
    why: {
      text: '中国金融认证中心（China Financial Certification Authority，简称CFCA） 是经中国人民银行和国家信息安全管理机构批准成立的国家级权威安全认证机构， 是国家重要的金融信息安全基础设施之一。作为权威的第三方安全认证机构，通过数字证书注册机构（简称“RA”）向网上用户发放数字证书，为用户网上交易提供信息安全保障。通过使用数字证书，各种网络应用可以实现可信网络身份、信息加密和可靠电子签名。'
    },
    advantages: [
      {
        name: '信息的保密性',
        description: ['区块链+大数据', '加密技术保障数据安全'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-1.png')
      },
      {
        name: '加密机制的安全性',
        description: ['采用国密算法', '符合国家安全标准'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-2.png'),
      },
      {
        name: '交易者身份的确定性',
        description: ['通过CA认证确认身份', '开展交易'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-3.png')
      },
      {
        name: '交易信息的可读性',
        description: ['使用数字证书进行加密和签名', '信息实时可读取'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-4.png')
      },
      {
        name: '抗抵赖性',
        description: ['通过证书的数字签名', '确保行为不可抵赖'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-5.png')
      },
      {
        name: '不可修改性',
        description: ['电子文件不可修改', '保障公正性'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-6.png')
      },
    ],
    applications: [
      {
        name: '金融业',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-1.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-1.png')
      },
      {
        name: '电子政务',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-2.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-2.png')
      },
      {
        name: '电子商务',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-3.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-3.png')
      },
      {
        name: '网上银行',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-4.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-4.png')
      },
      {
        name: '网上商城',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-5.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-5.png')
      },
      {
        name: '电子医疗',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-6.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-6.png')
      },
    ],
    process: {
      img: require('../../../images/website-show/CFCA/pic-CFCA-process.png')
    },
  };

  dataEn = {
    name: 'CFCA',
    banner: {
      logo: require('../../../images/logo@2x.png'),
      img: require('../../../images/website-show/CFCA/banner-CFCA-en.jpg'),
      bgColor: 'transparent',
    },
    what: {
      text: 'A digital certificate is an electronic “passport” that allows a person, computer or organization to exchange information securely over the Internet, which is issued by an authoritative organization——CA (Certification Authority).'
    },
    why: {
      text: 'China Financial Certification Authority (CFCA) is approved by People’s Bank of China and National Information Security Management Organization, which represents the largest secure e-commerce infrastructure effort ever undertaken in China. CFCA provides security services for China’s entire financial sector. As the third-party authorized organization, Registration Authority(RA) would issue the digital certificate to users, then to guarantee the information security for online exchange. By using the digital certificate, the network application can access to the trustworthy network identity, information encryption and e-signature.'
    },
    advantages: [
      {
        name: 'Information Privacy',
        description: ['Blockchain + Big data', 'Data safety with encryption technique'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-1.png')
      },
      {
        name: 'Encryption Security',
        description: ['SSF33，SCB2，SM2，SM3…', 'Accord with national safety standard'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-2.png'),
      },
      {
        name: 'Identity Confirmation',
        description: ['Confirm identity by CA', 'For business transaction'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-3.png')
      },
      {
        name: 'Information Readability',
        description: ['Encrypted and signatured by CA', 'Readable in real time'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-4.png')
      },
      {
        name: 'Non-repudiation',
        description: ['E-signature by Certificate', 'Responsibility for actions'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-5.png')
      },
      {
        name: 'Immutability',
        description: ['Modify is not allowed', 'With impartiality'],
        img: require('../../../images/website-show/CFCA/icon-CFCA-6.png')
      },
    ],
    applications: [
      {
        name: 'Finance',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-1.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-1.png')
      },
      {
        name: 'E-government',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-2.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-2.png')
      },
      {
        name: 'E-commerce',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-3.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-3.png')
      },
      {
        name: 'Online Bank',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-4.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-4.png')
      },
      {
        name: 'Online Mall',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-5.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-5.png')
      },
      {
        name: 'E-health',
        bg: require('../../../images/website-show/CFCA/pic-CFCA-scene-6.jpg'),
        icon: require('../../../images/website-show/CFCA/icon-CFCA-scene-6.png')
      },
    ],
    process: {
      img: require('../../../images/website-show/CFCA/pic-CFCA-process-en.png')
    },
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

  render() {

    return <div className="web-show-container">
      <Header/>
      <FloatBar/>
      <div className="banner"
           style={{backgroundImage: `url(${this.data.banner.img})`, backgroundColor: this.data.banner.bgColor}}/>
      <article className="what-why">
        <h1 className="h1">{this.data.name}</h1>
        <div className="content">
          <img
            src={require('../../../images/website-show/CFCA/icon-CFCA.png')}
            alt=""/>
          <aside>
            <h2>{T.translate('pss.what', {content: this.data.name})}</h2>
            <p>{this.data.what.text}</p>
            <h2>{T.translate('pss.why', {content: this.data.name})}</h2>
            <p>{this.data.why.text}</p>
          </aside>
        </div>
      </article>
      <article className="cfca-advantages">
        <h1 className="h1">{T.translate('pss.advantages')}</h1>
        <div className="advantages-container">
          {
            this.data.advantages.map((item) => {
              return <section className="advantage">
                <img src={item.img} alt=""/>
                <div className="text">
                  <h2>{item.name}</h2>
                  <p>{item.description[0]}</p>
                  <p>{item.description[1]}</p>
                </div>
              </section>
            })
          }
        </div>
      </article>
      <article className="cfca-applications">
        <h1 className="h1">{T.translate('pss.apply')}</h1>
        <div className="scenes">
          {this.data.applications.map(
            (item, i) => <div key={i} className="scene" style={{backgroundImage: `url(${item.bg})`}}>
              <img src={item.icon} alt=""/>
              <h2>{item.name}</h2>
            </div>
          )}
        </div>
      </article>
      <article className="process">
        <h1 className="h1">{T.translate('pss.process')}</h1>
        <div className="map">
          <img src={this.data.process.img} alt=""/>
        </div>
      </article>
      <Footer noMargin={true}/>
    </div>
  }
}
