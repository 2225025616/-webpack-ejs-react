import React, { Component } from "react";
import T from "i18n-react";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import Header from "./Header";
import Footer from "./Footer";
import { getGraphicCode, sendUserConsult } from "../../actions/adminAction";
import FloatBar from "./FloatBar";
import ColumnInput from "../commons/ColumnInput";
import ColumnTextarea from "../commons/ColumnTextarea";
import LanguageUtil from "../../utils/LanguageUtil";

const styles = {
  smsInput: {
    position: "relative",
  },
  smsBtn: {
    position: "absolute",
    right: 0,
    top: 10,
    height: 40,
  }
};

export const fields = ['name', 'phone', 'verifyCode', 'email', 'company'];
const validate = values => {
  return new FormValidator(values)
    .name('name', T.translate("member.name"))
    .phone('phone', T.translate("common.phone-number"))
    .imageCode("verifyCode", T.translate("user.pic-verify-code"))
    .nonEmpty("email", "咨询标题")
    .nonEmpty("company", "咨询内容")
    .errors;
};

@reduxForm({form: "send-conult", fields, validate},
  state => {
    return {
      imageCode: state.admin.imageCode,
      initialValues: {name: "", phone: "", verifyCode: '', email: '', company: ''},
      location: state.router.location,
      onSubmit: (values, dispatch) => {
        dispatch(sendUserConsult(values.phone, values.name, values.verifyCode, values.email, values.company));
      }
    }
  })
export default class MarketingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spreadForm: true,
      currIndex: 0,
      isLogoHover: 0,
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '推广',
    banner: {
      logo: require('../../../images/logo@2x.png'),
      img: require('../../../images/website-show/home/banner-home-1.jpg'),
      features: [
        {name: '免费存证', description: '基础存证永久免费', iconClass: 'font-file'},
        {name: '司法有效', description: '对接司法鉴定中心，保障司法有效', iconClass: 'font-forensic-consult'},
        {name: '法律援助', description: '提供免费法律援助服务	', iconClass: 'font-cooperation'},
      ],
      bgColor: 'transparent',
    },
    why: [
      {
        name: '深圳市互联网金融交易平台',
        description: '第十一条 网络借贷信息中介机构申请备案登记时，应当如实提交以下申请材料：（十四）与第三方电子数据存证平台签订的委托合同存证的协议复印件。',
        cite: '——《深圳市网络借贷信息中介机构备案登记管理办法（征求意见稿）》',
        iconClass: 'font-invest'
      },
      {
        name: '上海市互联网金融交易平台',
        description: '第二章 备案管理 第十条 新设立的网络借贷信息中介机构申请办理备案登记的，应当提交以下申请材料：（十一）与第三方电子数据存证平台签订的委托合同存证的协议复印件；',
        cite: '——《上海市网络借贷信息中介机构业务管理实施办法（征求意见稿）》',
        iconClass: 'font-finance-internet'
      },
      {
        name: '厦门市互联网金融交易平台',
        description: '第二章 新设机构备案登记 第五条 新设立的网贷机构申请办理登记备案时，应向市金融办提交以下文件资料：（十）已与第三方电子数据存证平台签订合同存证的委托合同复印件；',
        cite: '——《厦门市网络借贷信息中介机构备案登记管理暂行办法》',
        iconClass: 'font-trade'
      },
    ],
    advantages: [
      {
        name: '数据安全',
        description: ['区块链+大数据', '加密技术保障数据安全'],
        img: require('../../../images/website-show/marketing/icon-marketing-data-security.png')
      },
      {
        name: '技术保障',
        description: ['结合区块链，存证数据', '实时上链构建完整证据链条'],
        img: require('../../../images/website-show/marketing/icon-marketing-tech-protection.png')
      },
      {
        name: '隐私保护',
        description: ['存证数据只上链数据', '简要信息全方位保障数据隐私'],
        img: require('../../../images/website-show/marketing/icon-marketing-privacy-protection.png')
      },
      {
        name: '权威资质',
        description: ['中国区块链应用研究中心等', '多家区块链研究协会发起单位'],
        img: require('../../../images/website-show/marketing/icon-marketing-authority.png')
      },
      {
        name: '司法出证',
        description: ['联合司法鉴定机构，落地全球', '首张区块链电子数据司法鉴定证书'],
        img: require('../../../images/website-show/marketing/icon-marketing-forensic-certificate.png')
      },
      {
        name: '高效快捷',
        description: ['无需改造现有系统', '5个工作日内快速完成API对接'],
        img: require('../../../images/website-show/marketing/icon-marketing-efficiency.png')
      },
    ],
    applications: [
      {
        name: '互联网金融',
        img: require('../../../images/website-show/marketing/pic-marketing-finance-internet.png')
      },
      {
        name: '电子商务',
        img: require('../../../images/website-show/marketing/pic-marketing-e-commerce.png')
      },
      {
        name: '电子合同',
        img: require('../../../images/website-show/marketing/pic-marketing-contract.png')
      },
      {
        name: '证书档案',
        img: require('../../../images/website-show/marketing/pic-marketing-record.png')
      },
      {
        name: '数据存储',
        img: require('../../../images/website-show/marketing/pic-marketing-data.png')
      },
    ],
    process: {
      img: require('../../../images/website-show/marketing/pic-marketing-process.png')
    },
    partners: [
      {
        logo: '阿里云',
        img: require('../../../images/website-show/logo/logo-aliyun.png'),
        img1: require('../../../images/website-show/logo/logo-aliyun-1.png'),
      },
      {
        logo: 'FACTOM',
        img: require('../../../images/website-show/logo/logo-FACTOM.png'),
        img1: require('../../../images/website-show/logo/logo-FACTOM-1.png'),
      },
      {
        logo: '千信网',
        img: require('../../../images/website-show/logo/logo-qianxinwang.png'),
        img1: require('../../../images/website-show/logo/logo-qianxinwang-1.png'),
      },
      {
        logo: '拾贝',
        img: require('../../../images/website-show/logo/logo-shibei.png'),
        img1: require('../../../images/website-show/logo/logo-shibei-1.png'),
      },
      {
        logo: '信安在线',
        img: require('../../../images/website-show/logo/logo-xinanzaixian.png'),
        img1: require('../../../images/website-show/logo/logo-xinanzaixian-1.png'),
      },
      {
        logo: 'GOSUN',
        img: require('../../../images/website-show/logo/logo-GOSUN.png'),
        img1: require('../../../images/website-show/logo/logo-GOSUN-1.png'),
      },
      {
        logo: '孚嘉科技',
        img: require('../../../images/website-show/logo/logo-fujiakeji.png'),
        img1: require('../../../images/website-show/logo/logo-fujiakeji-1.png'),
      },
      {
        logo: '浙江清华长三角研究院',
        img: require('../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan.png'),
        img1: require('../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan-1.png'),
      },
      {
        logo: '杭州市地方税务局',
        img: require('../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png'),
        img1: require('../../../images/website-show/logo/logo-hangzhoudifangshuiwuju-1.png'),
      },
      {
        logo: '数牛金服',
        img: require('../../../images/website-show/logo/logo-shuniujinfu.png'),
        img1: require('../../../images/website-show/logo/logo-shuniujinfu-1.png'),
      },
      {
        logo: '易商互动',
        img: require('../../../images/website-show/logo/logo-yishanghudong.png'),
        img1: require('../../../images/website-show/logo/logo-yishanghudong-1.png'),
      },
      {
        logo: '银江股份',
        img: require('../../../images/website-show/logo/logo-yinjianggufen.png'),
        img1: require('../../../images/website-show/logo/logo-yinjianggufen-1.png'),
      },
    ]
  };

  dataEn = {
    name: 'Marketing',
    banner: {
      logo: require('../../../images/logo@2x.png'),
      img: require('../../../images/website-show/home/banner-home-1-en.jpg'),
      features: [
        {
          name: 'Free Recordkeeping',
          description: 'Permanent free for basic recordkeeping service',
          iconClass: 'font-file'
        },
        {
          name: 'Judicial Effect',
          description: 'Access to judicial, to guarantee judicial effect',
          iconClass: 'font-forensic-consult'
        },
        {name: 'Legal Aid', description: 'Provide the legal aid for free', iconClass: 'font-cooperation'},
      ],
      bgColor: 'transparent',
    },
    why: [
      {
        name: 'Shenzhen Internet Financial Trading Platform',
        description: 'Article 11: When applying for archival registration, the Internet lending information intermediary should submit the copy of the commission contract which signed by the third party of data recordkeeping.',
        cite: '《Shenzhen Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft) 》',
        iconClass: 'font-invest'
      },
      {
        name: 'Shanghai Internet Financial Trading Platform',
        description: 'Article 10, Chapter 2: The newly established Internet lending information intermediary should submit the commission contract which signed by the third party of data recordkeeping when apply for the archival registration.',
        cite: '《Shanghai Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft) 》',
        iconClass: 'font-finance-internet'
      },
      {
        name: 'Xiamen Internet Financial Trading Platform',
        description: 'Article 5, Chapter 2: When applying for archival registration, the newly established Internet lending information intermediary should submit the copy of the commission contract which signed by the third party of data recordkeeping to the Finance Office.',
        cite: '《Xiamen Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft)》',
        iconClass: 'font-trade'
      },
    ],
    advantages: [
      {
        name: 'Data Security',
        description: ['Blockchain+Big Data', 'Encryption Technology to guarantee data security'],
        img: require('../../../images/website-show/marketing/icon-marketing-data-security.png')
      },
      {
        name: 'Technical Guarantee',
        description: ['Combined with Blockchain, recordkeeping data', 'On chain for real time, to build a full evidence chain'],
        img: require('../../../images/website-show/marketing/icon-marketing-tech-protection.png')
      },
      {
        name: 'Privacy Protection',
        description: ['Only data allowed on chain', 'Full protection for data privacy'],
        img: require('../../../images/website-show/marketing/icon-marketing-privacy-protection.png')
      },
      {
        name: 'Authority Qualification',
        description: ['China Blockchain research and application centre', 'China Blockchain research and application centre'],
        img: require('../../../images/website-show/marketing/icon-marketing-authority.png')
      },
      {
        name: 'Judicial Issuance',
        description: ['Together with judicial agency, for worldwide landing', 'The first Blockchain judicial expertise certificate for e-data '],
        img: require('../../../images/website-show/marketing/icon-marketing-forensic-certificate.png')
      },
      {
        name: 'Convenient & Efficient',
        description: ['No need for system modification', 'Quick API access within 5 workdays'],
        img: require('../../../images/website-show/marketing/icon-marketing-efficiency.png')
      },
    ],
    applications: [
      {
        name: 'Fintech',
        img: require('../../../images/website-show/marketing/pic-marketing-finance-internet.png')
      },
      {
        name: 'E-commerce',
        img: require('../../../images/website-show/marketing/pic-marketing-e-commerce.png')
      },
      {
        name: 'E-contract',
        img: require('../../../images/website-show/marketing/pic-marketing-contract.png')
      },
      {
        name: 'Certificate Archive',
        img: require('../../../images/website-show/marketing/pic-marketing-record.png')
      },
      {
        name: 'Data Storage',
        img: require('../../../images/website-show/marketing/pic-marketing-data.png')
      },
    ],
    process: {
      img: require('../../../images/website-show/marketing/pic-marketing-process.png')
    },
    partners: [
      {
        logo: '阿里云',
        img: require('../../../images/website-show/logo/logo-aliyun.png'),
        img1: require('../../../images/website-show/logo/logo-aliyun-1.png'),
      },
      {
        logo: 'FACTOM',
        img: require('../../../images/website-show/logo/logo-FACTOM.png'),
        img1: require('../../../images/website-show/logo/logo-FACTOM-1.png'),
      },
      {
        logo: '千信网',
        img: require('../../../images/website-show/logo/logo-qianxinwang.png'),
        img1: require('../../../images/website-show/logo/logo-qianxinwang-1.png'),
      },
      {
        logo: '拾贝',
        img: require('../../../images/website-show/logo/logo-shibei.png'),
        img1: require('../../../images/website-show/logo/logo-shibei-1.png'),
      },
      {
        logo: '信安在线',
        img: require('../../../images/website-show/logo/logo-xinanzaixian.png'),
        img1: require('../../../images/website-show/logo/logo-xinanzaixian-1.png'),
      },
      {
        logo: 'GOSUN',
        img: require('../../../images/website-show/logo/logo-GOSUN.png'),
        img1: require('../../../images/website-show/logo/logo-GOSUN-1.png'),
      },
      {
        logo: '孚嘉科技',
        img: require('../../../images/website-show/logo/logo-fujiakeji.png'),
        img1: require('../../../images/website-show/logo/logo-fujiakeji-1.png'),
      },
      {
        logo: '浙江清华长三角研究院',
        img: require('../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan.png'),
        img1: require('../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan-1.png'),
      },
      {
        logo: '杭州市地方税务局',
        img: require('../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png'),
        img1: require('../../../images/website-show/logo/logo-hangzhoudifangshuiwuju-1.png'),
      },
      {
        logo: '数牛金服',
        img: require('../../../images/website-show/logo/logo-shuniujinfu.png'),
        img1: require('../../../images/website-show/logo/logo-shuniujinfu-1.png'),
      },
      {
        logo: '易商互动',
        img: require('../../../images/website-show/logo/logo-yishanghudong.png'),
        img1: require('../../../images/website-show/logo/logo-yishanghudong-1.png'),
      },
      {
        logo: '银江股份',
        img: require('../../../images/website-show/logo/logo-yinjianggufen.png'),
        img1: require('../../../images/website-show/logo/logo-yinjianggufen-1.png'),
      },
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

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? '保全网-' : 'BAOQUAN.COM - ') + this.data.name;
  };

  componentDidMount = () => {
    this.handleGetGraphicCode();
  };

  handleGetGraphicCode = () => {
    this.props.dispatch(getGraphicCode());
  };

  changeIndex = (index) => {
    return () => {
      this.setState({currIndex: index});
    }
  };

  setBoolean = (val) => {
    return () => {
      this.setState({spreadForm: val});
    }
  };

  hover = (index) => {
    return () => {
      this.setState({
        isLogoHover: index
      })
    }
  };

  changeStyle = (isHover) => {
    return () => {
      this.setState({isHover: isHover})
    }
  };

  render() {
    let {fields: {name, phone, verifyCode, email, company}, imageCode, handleSubmit} = this.props;
    let data = this.data;

    let emailBtn = <button className="email-btn" onClick={this.setBoolean(true)}>
      <span className="iconfont font-service"/>{T.translate('marketing.btn-fold')}
    </button>;

    let emailForm = <div className="email-form">
      <header className="header">{T.translate('marketing.form')} <span className="btn-close"
                                                                       onClick={this.setBoolean(false)}/></header>
      <form className="inputs" onSubmit={this.props.handleSubmit}>
        <ColumnInput placeholder={T.translate('marketing.name')} type="text" {...FormUtil.extract(name)} file={name}/>
        <ColumnInput placeholder={T.translate('marketing.phone')} type="text" {...FormUtil.extract(phone)}
                     file={phone}/>
        <div style={styles.smsInput}>
          <ColumnInput placeholder={T.translate('marketing.verify-code')} type="text" {...FormUtil.extract(verifyCode)}
                       file={verifyCode}/>
          <p style={styles.smsBtn} onClick={this.handleGetGraphicCode}>
            <img src={"data:image/png;base64," + imageCode}/>
          </p>
        </div>
        <ColumnInput placeholder="咨询标题（必填）" type="text" {...FormUtil.extract(email)} file={email} maxLength="500"/>
        <ColumnTextarea placeholder="咨询内容（必填）" {...FormUtil.extract(company)} file={company} maxLength="1000"/>
        <button type="submit">{T.translate('marketing.btn')}</button>
      </form>
    </div>;

    return <div className="web-show-container">
      <Header/>
      <FloatBar/>
   {/*   <div className="email-form-wrap">
        {this.state.spreadForm ? emailForm : emailBtn}
      </div>*/}
      <div className="marketing-banner" style={{backgroundImage: 'url(' + this.data.banner.img + ')'}}>
        <div className="features">
          <div className="features-container">
            {
              data.banner.features.map(item => {
                return <section className="feature">
                  <span className={`iconfont ${item.iconClass}`}/>
                  <div className="text">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                </section>
              })
            }
          </div>
        </div>
      </div>
      <article className="marketing-why">
        <h1 className="h1">{T.translate('marketing.head-1')}</h1>
        {
          data.why.map(item => {
            return <article className="why-item">
              <span className={`iconfont ${item.iconClass}`}/>
              <div className="why-item-container">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <cite>{item.cite}</cite>
              </div>
            </article>
          })
        }
      </article>
      <article className="marketing-advantages">
        <h1 className="h1">{T.translate('marketing.head-2')}</h1>
        <div className="advantages-container">
          {
            data.advantages.map((item) => {
              return <section className="advantage">
                <div className="icon">
                  <img src={item.img} alt=""/>
                </div>
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
      <article className="marketing-applications">
        <h1 className="h1">{T.translate('marketing.head-3')}</h1>
        <div className="tab">
          {(() => {
            let fragment = [];
            for (let i = 0; i < this.data.applications.length; i++) {
              fragment.push(
                <button className={this.state.currIndex === i ? "selected" : ''}
                        onMouseEnter={this.changeIndex(i)}>{this.data.applications[i].name}</button>
              )
            }
            return fragment;
          })()}
        </div>
        <div className="map">
          <img src={this.data.applications[this.state.currIndex].img} alt=""/>
        </div>
        <div className="tip">
          {T.translate('pss.more-app')}
          <a href="http://wpa.qq.com/msgrd?v=3&uin=1434851251&site=qq&menu=yes"
             className="a" target="_blank">{T.translate('pss.contact')}</a>
        </div>
      </article>
      <article className="marketing-process">
        <h1 className="h1">{T.translate('marketing.head-4')}</h1>
        <div className="map">
          <img src={this.data.process.img} alt=""/>
        </div>
      </article>
      <article className="marketing-partners">
        <h1 className="h1">{T.translate('marketing.head-5')}</h1>
        <div className="partners-container">
          {this.data.partners.map(
            (item, i) =>
              <span key={i} className="a" onMouseEnter={this.hover(i)} onMouseLeave={this.hover(-1)}>
                  <img src={this.state.isLogoHover === i ? item.img : item.img1} alt={item.logo}/>
              </span>
          )}
        </div>
      </article>
      <div className="marketing-footer-banner"/>
      <Footer noMargin={true}/>
    </div>
  }
}
