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
export default class Forensic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  data = {};

  dataZh = {
    name: '司法鉴定通道',
    banner: {
      img: require('../../../../images/website-show/service/banner-forensic.jpg'),
      bgColor: '#1b1e25',
      info: {
        title: '司法鉴定通道',
        subtitle: '让电子数据具有法律效力，保全网提供一站式数字公证与司法鉴定服务，在区块链保全技术公信力的基础上进一步保证司法效力。',
      },
    },
    whatIs: {
      text: '通过对接司法鉴定中心，保全网除了能够针对每一笔数据记录出具相应的保全证书外，还能够根据需求获得符合国家《电子数据法庭科学鉴定通用方法》的司法鉴定意见书，从而使得数据证据具有司法效力。保全网还将进一步联合大成律师事务所、浙江法院电子商务网上法庭、杭州仲裁委员会、中国互联网协会人民调解委员会构建可信电子凭证的司法有效性闭环，为数字世界构建可信数据规则。同时，大成律师事务所作为保全网战略合作单位，将提供针对可信电子凭证的全套法律服务。',
      img: require('../../../../images/website-show/service/pic-what-is-forensic.png')
    },
    process: [
      {
        name: '登录账户',
        description: '登录保全网账户',
        img: require('../../../../images/website-show/service/pic-forensic-process-1.png')
      },
      {
        name: '选择数据',
        description: '点击"我的保全"菜单，选择需要保全的数据（可多选），点击"申请出证"',
        img: require('../../../../images/website-show/service/pic-forensic-process-2.png')
      },
      {
        name: '填写信息',
        description: '确认保全数据，选择公证类型，填写其他信息，并选择相关内容类型，确认后点击"下一步"',
        img: require('../../../../images/website-show/service/pic-forensic-process-3.png')
      },
      {
        name: '申请成功',
        description: '申请成功，我们的工作人员会在3个工作日内联系您',
        img: require('../../../../images/website-show/service/pic-forensic-process-4.png')
      },
    ],
    other: {
      name: '司法鉴定意见书',
      title: '全球首张区块链电子数据司法鉴定证书落地',
      img: require('../../../../images/website-show/service/pic-forensic-verified-written-opinion.jpg'),
      text: ['区块链数据保全服务平台保全网与浙江千麦司法鉴定中心共同宣布达成战略合作，这意味着区块链技术在电子数据的存证、鉴真领域获得了司法认可，并且真正实现在司法鉴定领域的实际落地，进一步实现整个区块链技术与现实法律应用领域相连接的渠道形成。',
        '随着互联网的不断普及与智能手机功能的不断提升，人类生活的足迹逐渐从线下向线上转移。在离不开虚拟世界的当下，小到衣食住行，大到金融法律，几乎所有的行为都在互联网上留下了记录，而在互联网上的数字世界中，留存记录的不再是白纸黑字，而是看不见摸不着的数据。这些容易被轻易复制、修改、变造的数据在存证与取证的过程中往往受到真实性的质疑，也因此使得互联网世界的行为记录缺失了一个可信的维度。……'],
      logos: [
        {
          logo: '人民网',
          img: require('../../../../images/website-show/logo/logo-renminwang.jpg')
        },
        {
          logo: '国网',
          img: require('../../../../images/website-show/logo/logo-guowang.jpg')
        },
        {
          logo: '新华网',
          img: require('../../../../images/website-show/logo/logo-xinhuawang.jpg')
        },
      ]
    }
  };

  dataEn = {
    name: 'Judicial Expertise Channel',
    banner: {
      img: require('../../../../images/website-show/service/banner-forensic-en.jpg'),
      bgColor: '#1b1e25',
      info: {
        title: ' Judicial Expertise Channel',
        subtitle: 'Baoquan.com  provides one-stop service for data notarization and judicial expertise based on Blockchain, further to enhance the judicial effect',
      },
    },
    whatIs: {
      text: 'Together with judicial expertise centre, Baoquan.com provides the attestation certificate for each trading data, as well as the judicial expertise certificate, which has the force of law. Furthermore, Baoquan.com is  committed to forming the closed loop for the trustworthy electronic certificate, cooperating with Dentons law offices, Zhejiang E-commerce online court, Hangzhou arbitration commission and so on. Meanwhile, as the strategic cooperation unit for Baoquan.com, Dentons provides the full legal service for the trustworthy electronic certificate.',
      img: require('../../../../images/website-show/service/pic-what-is-forensic-en.png')
    },
    process: [
      {
        name: 'Sign in',
        description: 'Sign in Process',
        img: require('../../../../images/website-show/service/pic-forensic-process-1.png')
      },
      {
        name: 'Select Data',
        description: 'Click "My Attestation", Select the attestation data(Multiple choice), Click "Issue a Certificate"',
        img: require('../../../../images/website-show/service/pic-forensic-process-2.png')
      },
      {
        name: 'Enter detail',
        description: 'Confirm attestation data, select notary type, enter other information, Click "Next"',
        img: require('../../../../images/website-show/service/pic-forensic-process-3.png')
      },
      {
        name: 'Success',
        description: 'Success! Our staff will contact you within 3 weekdays.',
        img: require('../../../../images/website-show/service/pic-forensic-process-4.png')
      },
    ],
    other: {
      name: 'Judicial Expertise Certificate',
      title: "The world's first Blockchain e-data judicial expertise certificate",
      img: require('../../../../images/website-show/service/pic-forensic-verified-written-opinion.jpg'),
      text: ['Baoquan.com has a term strategic partnership with Chain Forensic Science, which means that Blockchain has got the judicial approval in the e-data recordkeeping and  facticity verification field, further to realize the connection between blockchain technology and realistic law application.',
        'With the increasing popularity of Internet, the footprint of human life gradually shift from offline to online. All the behavior data would be recorded on the Internet, which is also easy to be copied and modified, and then the reality of evidence is now being questioned, so that the behavior record for the Internet world has missed a credible dimension  …'],
      logos: [
        {
          logo: '人民网',
          img: require('../../../../images/website-show/logo/logo-renminwang.jpg')
        },
        {
          logo: '国网',
          img: require('../../../../images/website-show/logo/logo-guowang.jpg')
        },
        {
          logo: '新华网',
          img: require('../../../../images/website-show/logo/logo-xinhuawang.jpg')
        },
      ]
    }
  };

  processIndex = 0;

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

  turnTo = (operator) => {
    if (operator === 'pre') {
      return () => {
        this.processIndex = (this.processIndex - 1 + this.data.process.length) % this.data.process.length;
        this.setState({});
      }
    } else {
      return () => {
        this.processIndex = (this.processIndex + 1 + this.data.process.length) % this.data.process.length;
        this.setState({});
      }
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
    return <div className='web-show-container' style={{backgroundColor: '#f6f7fb'}}>
      <Header noRoute={{
        product: {
          index: 5,
          clickFactory: (i) => {
            return this.setScrollTop
          }
        }
      }}/>
      <FloatBar/>
      <Banner bannerData={this.data.banner}>
        <nav>
          <Link to='/attestations' className='a btn-blue'>{T.translate('pss.issue')}</Link>
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
      <article className='what' ref="function">
        <h1 className='h1'>
          <span className='decoration-left'/>{this.data.name}<span className='decoration-right'/>
        </h1>
        <p>{this.data.whatIs.text}</p>
        <div className="map1" style={{height: '290px'}}>
          <img src={this.data.whatIs.img} alt=''/>
        </div>
      </article>
      <article className='process-forensic'>
        <h1 className='h1'>
          <span className='decoration-left'/>
          {T.translate('pss.issue-process')}
          <span className='decoration-right'/>
        </h1>
        <div className='steps'>
          {this.data.process.map(
            (item, i) => {
              let fragment = [];
              fragment.push(
                <div key={i}
                     className={'step ' + (this.processIndex > i ? 'active' : this.processIndex === i ? 'cur' : '')}>
                  <span className={this.processIndex > i ? 'iconfont font-right-1' : ''}>
                    {this.processIndex <= i ? i + 1 : ''}
                  </span>
                  {item.name}
                </div>
              );
              if (i < (this.data.process.length - 1))
                fragment.push(
                  <div
                    className={this.processIndex > i ? "decoration-line decoration-line-active" : "decoration-line"}/>
                );
              return fragment;
            }
          )}
        </div>
        <div className='map-container-box'>
          <button className='iconfont font-arrow-left' onClick={this.turnTo('pre')}/>
          <div className='map-container'>
            <div className='map'>
              <img src={this.data.process[this.processIndex].img} alt=''/>
            </div>
            <h2>{this.data.process[this.processIndex].description}</h2>
          </div>
          <button className='iconfont font-arrow-left' onClick={this.turnTo('next')}/>
        </div>
      </article>
      <article className='verified-written-opinion position-80'>
        <h1 className='h1'>
          <span className='decoration-left'/>
          {T.translate('pss.judicial')}
          <span className='decoration-right'/>
        </h1>
        <div className='opinion-container'>
          <img src={this.data.other.img} alt=''/>
          <section>
            <h2>{this.data.other.title}</h2>
            <p>{this.data.other.text[0]}</p>
            <p>{this.data.other.text[1]}</p>
            <div className='logos'>
              <div className='logo'>
                <img src={this.data.other.logos[0].img} alt={this.data.other.logos[0].logo}/>
              </div>
            </div>
          </section>
        </div>
      </article>
      <Footer/>
    </div>
  }
}
