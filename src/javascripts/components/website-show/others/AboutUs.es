import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import T from "i18n-react";

@connect(state => ({
  location: state.router.location
}))
export default class AboutUs extends Component {

  data = {};

  dataZh = {
    name: '关于我们',
    otherNav: [
      {name: '公司简介', route: '/other/about-us', selected: true},
      {name: '媒体报道', route: '/other/media-reports', selected: false},
      {name: '保全资讯', route: '/other/industry-news', selected: false},
      {name: '区块链文档', route: '/other/block-documents', selected: false},
      {name: '联系我们', route: '/other/contact', selected: false},
    ],
    profile: {
      name: '公司简介',
      content: '浙江数秦科技有限公司创立于2016年，是一家致力于区块链技术研发与应用的创新企业。核心团队自2013年即开始研究数字货币技术和区块链技术的非货币应用，对区块链网络底层构建、共识机制设计、数字资产交易、可信电子凭证服务等领域的发展都做出了长足的贡献。依托实践积累和人才优势，数秦科技探索出了一条区块链技术应用落地的创新之路。数秦科技研发了一个开放式服务的中间层，充分融合了区块链的技术先进性，同时克服了现有区块链公链服务的性能瓶颈和效率问题，推出了一系列“区块链+”的技术解决方案，打造了区块链可信电子凭证服务平台--保全网Baoquan.com，重点满足科技金融行业的痛点，构建出一个第三方存证、增信、鉴真的基础设施。同时，也建立了区块链技术公信力与项目应用实际司法落地之间的桥梁，打造了区块链+司法鉴定+公证+仲裁的连接模式。保全网是国内首个使用区块链实现电子数据保全，获得司法认可，能够提供电子数据存证、出证的网络服务平台，实现了数据世界真实性的构建，通过保全网能够实现比特世界与原子世界的映射关系，从而推动良好的社会信用体系的形成。',
      features: [
        {
          name: '存证',
          img: require('../../../../images/website-show/others/icon-file.png')
        },
        {
          name: '增信',
          img: require('../../../../images/website-show/others/icon-web.png')
        },
        {
          name: '鉴真',
          img: require('../../../../images/website-show/others/icon-computer.png')
        },
      ]
    },
    team: [
      {
        name: '高航',
        avatar: require('../../../../images/website-show/others/avatar-gaohang.jpg'),
        position: 'CEO',
        introduce: '数秦科技（保全网）创始人 、CEO。资深技术极客、连续创业者。曾任职：壹比特首席架构师、鸣金网创始CEO、浙金网创始CEO。区块链技术专家、科技金融专家，财税信息化专家，2013年从事区块链和数字货币研究。中国区块链应用研究中心常务理事及浙江分中心负责人。国家互联网金融安全技术专家委员会委员。杭州区块链技术与应用联合会发起人。曾出版《数字货币：比特币数据报告与操作指南》、《敏捷创新》《区块链与新经济:数字货币2.0 时代》等书。'
      },
      {
        name: '王毛路',
        avatar: require('../../../../images/website-show/others/avatar-wangmaolu.jpg'),
        position: '首席科学家',
        introduce: '北京航空航天大学电子工程博士，数秦科技首席科学家，金标委委员，中国上市公司协会信息委委员，中国信息化推进联盟创新委委员，中国计算机用户协会信息科技审计分会委员。曾任职中国证监会、中信信托。曾获得证券期货行业科技进步奖二等奖、三等奖各一次，在金融科技领域具有深厚的经验，曾起草多项金融行业标准、一项国家标准。主要研究领域包括神经网络、机器学习、分布式计算、大数据结构与交易规则等。曾出版《区块链与新经济：数字货币2.0时代》，并发表多篇论文分别收录于国家级、省级学术刊物。当前正在参与区块链国家标准制定工作，从事区块结构、通信标准与链上数据流三个方面的研究。'
      },
      {
        name: '俞学劢',
        avatar: require('../../../../images/website-show/others/avatar-yuxuemai.jpg'),
        position: '总经理助理',
        introduce: '数秦科技总经理助理。利物浦大学电子金融一等荣誉理学学士（BSc in E-Finance First Class Honours Degree），雷丁大学ICMA Centre金融风险管理卓越理学硕士（MSc in Financial Risk Management Distinction Degree），拥有国有、外资银行、民营金融机构、私募投行等工作经历，并担任鸣金网、链金社、共享财经等新媒体专栏海外新金融板块作者。省级、国家级期刊发布多篇数字经济相关论文，曾参与《敏捷创新》翻译及中国区块链应用研究中心《图解区块链》编写工作，并合著有《区块链与新经济:数字货币2.0时代》。'
      },
    ],
    history: {
      img: require('../../../../images/website-show/others/pic-history.png')
    }
  };

  dataEn = {
    name: 'About Us',
    otherNav: [
      {name: 'Introduction', route: '/other/about-us', selected: true},
      {name: 'Media', route: '/other/media-reports', selected: false},
      {name: 'News', route: '/other/industry-news', selected: false},
      {name: 'Blockchain Doc', route: '/other/block-documents', selected: false},
      {name: 'Contact us', route: '/other/contact', selected: false},
    ],
    profile: {
      name: 'Introduction',
      content: 'Zhejiang Shuqin Technology Co., Ltd was founded on 2016, is a blockchain based R&D and application service provider. Core team started the research of cryptocurrency and non-currency blockchain applications since 2013, and have made certain effort on the aspects such as blockchain infrastructure, consensus algorithms, digital assets exchange, trustworthy electronic certificate, etc. Based on the practical experiences and team experts, Shuqin tech has discovered a new way for blockchain technology to be applied on real user cases. Shuqin tech has developed an open middle tier, by fusion up the technical advances for blockchain and overcome the capacity issue of public blockchain we provided a “Blockchain+” technical solutions, and established a trustworthy electronic certificate service platform - Baoquan.com. This platform is focusing on filling the gaps and resolve the pain point for fintech industry, and has constructed an infrastructure with “Third-party” data preservation, credit enhancement, and truth verification. Mainwhile, a blockchain technical trustworthiness has been bind with juristic acknowledgement by us through the approach of blockchain + forensic + notary + arbitration. Baoquan.com is the first blockchain data attestation service provider approved by traditional juristic system, which has formed the bridge and mapping between physical world and the digital world, and finally will push forward the social credit system to be formed',
      features: [
        {
          name: 'Proof',
          img: require('../../../../images/website-show/others/icon-file.png')
        },
        {
          name: 'Trust',
          img: require('../../../../images/website-show/others/icon-web.png')
        },
        {
          name: 'Truth',
          img: require('../../../../images/website-show/others/icon-computer.png')
        },
      ]
    },
    team: [
      {
        name: 'Gao Hang',
        avatar: require('../../../../images/website-show/others/avatar-gaohang.jpg'),
        position: 'CEO',
        introduce: 'The founder and CEO of Baoquan.com, has been working as the CTO of Yibite and the CEO of Zjmax.com. Specialist in Finance and Taxation Informationlize, as the director of China Blockchain Applied Research Centre, an expert of the National Internet Financial security technology Committee. The co-author of “Blockchain and the new economy: the era of Cryptocurrency 2.0”, ”Digital Currency: Data Report in Bitcoin and Operating Instructions”, ”Agility and Innovation”'
      },
      {
        name: 'Wang Maolu',
        avatar: require('../../../../images/website-show/others/avatar-wangmaolu.jpg'),
        position: 'Chief Scientist',
        introduce: 'Received the doctor degree of Beihang University in Electronic Engineering. Have been working for CSRC, CAPCO and Citic Trust Co.Ltd. She earned the second/third prize of technology progress in Secutities and Futures Industry. She has drafted the financial industry standard and a national standard. and focused on the research for ANN, machine learning, distributed computing and big data. The co-author of “Blockchain and the new economy: the era of Cryptocurrency 2.0”'
      },
      {
        name: 'Yu Xuemai',
        avatar: require('../../../../images/website-show/others/avatar-yuxuemai.jpg'),
        position: 'General Manager Assistant',
        introduce: 'Graduated from University of Liverpool with First class degree in BSc E-Finance, and also holding MSc in Financial Risk Management with Distinction from ICMA Centre, University of Reading. Have been working in stated-owned banks, foreign banks, private financial corporate as well as PE sector. Translated “Agile Innovation” and is the co-author of “Blockchain and the new economy: the era of Cryptocurrency 2.0”'
      },
    ],
    history: {
      img: require('../../../../images/website-show/others/pic-history-en.png')
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

  render() {

    return <div className="web-show-container">
      <Header haveScrollEvent={false} otherNav={this.data.otherNav}/>
      <FloatBar/>
      <article className="company-profile website-article-card">
        <section className="text">
          <h1>{this.data.profile.name}</h1>
          <p>{this.data.profile.content}</p>
        </section>
        <div className="features">
          {this.data.profile.features.map(
            (item, i) => <div key={i} className="feature">
              <span className="icon" style={{backgroundImage: `url(${item.img})`}}/>
              {item.name}
            </div>
          )}
        </div>
      </article>
      <article className="team-info website-article-card">
        <h1 className="head">{T.translate('other.team')}</h1>
        <div className="members-container">
          {this.data.team.map(
            (item, i) => <article key={i} className="member">
              <img src={item.avatar} alt=""/>
              <h2>{item.name}</h2>
              <h3>{item.position}</h3>
              <p>{item.introduce}</p>
            </article>
          )}
        </div>
      </article>
      <article className="company-history website-article-card">
        <h1 className="head">{T.translate('other.flow')}</h1>
        <div className="history-pic">
          <img src={this.data.history.img} alt=""/>
        </div>
      </article>
      <Footer/>
    </div>
  }
}
