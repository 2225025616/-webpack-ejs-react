import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Header from "../Header";
import Production from "./Production";
import Solution from "./Solution";
import Footer from "../Footer";
import Link from "../../commons/LangLink";
import FloatBar from "../FloatBar";
import Banner from "../Banner";
import Formatter from "../../../lib/formatter/index";
import { getBlockChain, getHomeData, getIndustryNews, getMediaReport } from "../../../actions/websiteDataAction";
import T from "i18n-react";
import LanguageUtil from "../../../utils/LanguageUtil";

const fields = ['userCount', 'blockHeight', 'blockCount'];

@reduxForm({form: 'home', fields},
  state => {
    return {
      userCount: state.website.userCount,
      blockHeight: state.website.blockHeight,
      blockCount: state.website.blockCount,
      location: state.router.location,
      report: state.website.report,
      media: state.website.media,
      blockChain: state.website.blockChain,
    }
  })
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solutionIndex: 0,
      isLogoHover: -1,
    }
  }

  timer = null;

  data = {};

  dataZh = {
    banner: {
      blocks: [
        {name: '保全用户量', count: 12202200, iconClass: 'font-connect',},
        {name: '区块高度', count: 12202200, iconClass: 'font-block',},
        {name: '保全数据', count: 12202200, iconClass: 'font-data',},
      ],
      bannerSwitch: [
        {
          img: require('../../../../images/website-show/home/banner-home-6.jpg'),
          bgColor: 'transparent',
          info: {
            title: '数秦科技任首届理事长单位',
            subtitle: '工信部旗下「中国信息化推进联盟区块链实验室」成立',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-1.jpg'),
          bgColor: 'transparent',
          info: {
            title: '保全存证 限时免费',
            subtitle: '区块链电子数据存证，提升平台公信力',
          },
          btn: [
            {name: '查看详情', className: 'middle-btn', route: '/marketing', useBtnWrap: true},
          ]
        },
        {
          img: require('../../../../images/website-show/home/banner-home-2.jpg'),
          bgColor: 'transparent',
          info: {
            title: '',
            subtitle: '',
          },
          btn: [
            {name: '查看详情', className: 'middle-btn', route: '/CFCA', useBtnWrap: true},
          ]
        },
        {
          img: require('../../../../images/website-show/home/banner-home-3.jpg'),
          bgColor: 'transparent',
          info: {
            title: '区块链网络千万用户为你见证',
            subtitle: '保全网分层区块链网络，实现各类数据区块链存证，并能够最终锚定公有区块链，获得技术公信力',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-4.jpg'),
          bgColor: 'transparent',
          info: {
            title: '可信大数据多维度分析 还原真相',
            subtitle: '基于区块链可信互联网结构，连通数信平台可信大数据服务',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-5.jpg'),
          bgColor: 'transparent',
          info: {
            title: '数据鉴定添附司法证据有效性',
            subtitle: '对接公证处、司法鉴定中心与仲裁委员会，为区块链技术增添司法认可信任加成，线上申请，节约取证成本',
          },
          btn: []
        },
      ]
    },
    productions: [
      {
        name: '可信电子凭证',
        description: '基于保全网分层区块链存储体系，保全网实现了数据的唯一性。并且通过利用云存储技术及SDK封装技术的结合，实现了对于各类型电子数据的可信电子凭证化服务。即所有信息化系统工作过程中所产生与流转的数据都能够通过保全网区块链的接口式调用，简便地通过区块链实现完整、不可篡改、可追溯的数据记录，以此提供一站式数据保全服务。',
        industries: [
          {name: '金融行业', iconClass: 'font-finance'},
          {name: '电子商务', iconClass: 'font-e-commerce'},
          {name: '公益慈善', iconClass: 'font-community'},
          {name: '大数据交易', iconClass: 'font-big-data'},
          {name: '防伪溯源', iconClass: 'font-trace'},
        ],
        functions: ['数据保全', '网页保全', 'API对接', '在线出证'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-electronic-certificate.png'),
        route: '/production/electronic-certificate',
        join: '/attestations',
      }, {
        name: '保全签',
        description: '越来越多的合同通过在线方式签署。保全网通过传统CA与区块链技术进行结合，推出基于区块链的协议签署——保全签。在保证合同数据仅签署方可以看到的同时，使合同具备完整的法律效力。',
        industries: [
          {name: '金融行业', iconClass: 'font-finance'},
          {name: '电子商务', iconClass: 'font-e-commerce'},
          {name: '公益慈善', iconClass: 'font-community'},
          {name: '电子政务', iconClass: 'font-affair'},
          {name: '旅游行业', iconClass: 'font-travel'},
        ],
        functions: ['数据完全隐私', '对接司法通道', '合同记录可溯源'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-baoquan-visa.png'),
        route: '/production/baoquan-visa',
        join: '/signatures/profile',
      }, {
        name: '网页取证',
        description: '网页取证是一款针对网页形式电子数据进行证据保全的产品，通过对网页内容实时固化保全，形成具备公证效力的电子证据，当需要出证时，可在线申请司法鉴定。',
        industries: [
          {name: '个人', iconClass: 'font-personal'},
          {name: '企业', iconClass: 'font-company'},
        ],
        functions: ['负面谣言传播', '知识产权侵权', '诽谤、侮辱', '网站镜像仿冒'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-baoquan-visa.png'),
        route: '/production/web-forensics',
        join: '/evidences',
      }
    ],
    services: [
      {
        name: '司法鉴定通道',
        description: '保全网提供一站式数据保全与司法鉴定服务，在区块链保全技术公信力的基础上进一步保证司法效力。。',
        img: require('../../../../images/website-show/home/img-sample-1.jpg'),
        route: '/service/forensic'
      }, {
        name: '区块链私有化部署',
        description: '区块链技术三大特征：不可伪造不可篡改、可跟踪可溯源、公开透明可验证，能够为企业发展赋予新势能。',
        img: require('../../../../images/website-show/home/img-sample-2.jpg'),
        route: '/service/privatisation-deployment'
      }
    ],
    solutions: [
      {
        name: '科技金融',
        iconClass: 'font-tech',
        description: '保全网团队结合丰富的金融行业经验，为金融行业客户提供科技金融解决方案，使金融资产交易过程中的资金流、信息流能够得到有效的保全。',
        functions: ['数据真实、安全', '隐私保护', '电子签名', '数据保全'],
        cases: [
          {
            logo: '浙金网',
            img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
          },
          {
            logo: '算力宝',
            img: require('../../../../images/website-show/logo/logo-suanlibao.png')
          },
        ],
        route: '/solution/finance'
      }, {
        name: '大数据交易',
        iconClass: 'font-big-data',
        description: '保全网大数据交易解决方案，通过对大数据交易全流程的记录和溯源，解决数据卖方确权难、买方维权难、数据造假等问题。',
        functions: ['确权证书', '数据授权记录', '数据流转追溯', '数据真实可验'],
        cases: [
          // {logo: '亚欧大数据交易所', img: require('../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png'):'../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png'},
        ],
        route: '/solution/big-data-trade'
      }, {
        name: '知识产权',
        iconClass: 'font-IPR',
        description: '随着人们对知识产权的保护越来越重视，如何及时有效地对知识产权进行确权和保护成为一个亟待解决的问题。',
        functions: ['数据安全', '维权取证', '在线确权', '产权流转溯源'],
        cases: [
          {
            logo: '拾贝',
            img: require('../../../../images/website-show/logo/logo-shibei.png')
          },
        ],
        route: '/solution/intellectual-property'
      }, {
        name: '电子政务',
        iconClass: 'font-affair',
        description: '电子政务的过程相比其他网络活动更加严谨，数据的准确性和完整性关系到政府机关的权威，和政务相对人之间发生的活动必须可追溯......',
        functions: ['存证节点私有化', '内网隔离', '电子签名', '数据真实可验'],
        cases: [
          {
            logo: '杭州市地方税务局',
            img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
          },
        ],
        route: '/solution/e-government-affair'
      }, {
        name: '防伪溯源',
        iconClass: 'font-trace',
        description: '保全网为有需要的企业提供防伪溯源解决方案，结合区块链电子数据保全及传统软硬件，为商品全流程提供防伪溯源服务。',
        functions: ['构建溯源证据链', '实时抽取与验证', '电子标签数据指纹', '数据保全'],
        cases: [],
        route: '/solution/security-traceability'
      }, {
        name: '公益',
        iconClass: 'font-community',
        description: '所有爱心数字资产将被记录在链上，链上记录着公益组织捐赠的金额、资金流向，公开透明，每个人一生的助人行为均被记录下来。',
        functions: ['项目信息管理', '隐私保护', '电子签名', '可信电子凭证'],
        cases: [
          {
            logo: '灵析',
            img: require('../../../../images/website-show/logo/logo-lingxi.png')
          },
        ],
        route: '/solution/public-benefit'
      }, {
        name: '积分',
        iconClass: 'font-points',
        description: '用户积分从获取到兑换再到换取服务的支付过程数据均全流程上链。联盟链节点成员能够从区块链直接抽取原始真实数据进行对账、审计。',
        functions: ['兑换机制固化', '交易记录保全', '可信电子凭证', '积分流转溯源'],
        cases: [
          {
            logo: '瑞泰鸿信',
            img: require('../../../../images/website-show/logo/logo-ruitaihongxin.png')
          },
        ],
        route: '/solution/point'
      }
    ],
    news: [
      {
        name: '保全资讯',
        route: '/other/industry-news',
        defaultPic: require('../../../../images/website-show/others/pic-industry-default.jpg'),
        headline: {
          title: '区块链技术哪里好 是否可以颠覆金融业？',
          time: '',
          url: '/industry-news/1'
        },
        list: [
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/industry-news/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/industry-news/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/industry-news/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/industry-news/1'},
        ],
      },
      {
        name: '媒体报道',
        route: '/other/media-reports',
        defaultPic: require('../../../../images/website-show/others/pic-news-default.jpg'),
        headline: {
          title: '区块链技术哪里好 是否可以颠覆金融业？',
          time: '',
          url: '/media-reports/1'
        },
        list: [
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/media-reports/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/media-reports/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/media-reports/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/media-reports/1'},
        ],
      },
      {
        name: '区块链文档',
        route: '/other/block-documents',
        defaultPic: require('../../../../images/website-show/others/pic-block-dcoument.jpg'),
        headline: {
          title: '区块链技术哪里好 是否可以颠覆金融业？',
          time: '',
          url: '/block-documents/1'
        },
        list: [
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/block-documents/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/block-documents/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/block-documents/1'},
          {title: '区块链创企数秦科技获2500万元天使轮融资区块链创企数秦科技获2500万元天使轮融资', time: '04-20', url: '/block-documents/1'},
        ],
      }
    ],
    partners: [
      {
        logo: '阿里云',
        img: require('../../../../images/website-show/logo/logo-aliyun.png'),
        img1: require('../../../../images/website-show/logo/logo-aliyun-1.png'),
      },
      {
        logo: 'FACTOM',
        img: require('../../../../images/website-show/logo/logo-FACTOM.png'),
        img1: require('../../../../images/website-show/logo/logo-FACTOM-1.png'),
      },
      {
        logo: '千信网',
        img: require('../../../../images/website-show/logo/logo-qianxinwang.png'),
        img1: require('../../../../images/website-show/logo/logo-qianxinwang-1.png'),
      },
      {
        logo: '拾贝',
        img: require('../../../../images/website-show/logo/logo-shibei.png'),
        img1: require('../../../../images/website-show/logo/logo-shibei-1.png'),
      },
      {
        logo: '信安在线',
        img: require('../../../../images/website-show/logo/logo-xinanzaixian.png'),
        img1: require('../../../../images/website-show/logo/logo-xinanzaixian-1.png'),
      },
      {
        logo: 'GOSUN',
        img: require('../../../../images/website-show/logo/logo-GOSUN.png'),
        img1: require('../../../../images/website-show/logo/logo-GOSUN-1.png'),
      },
      {
        logo: '孚嘉科技',
        img: require('../../../../images/website-show/logo/logo-fujiakeji.png'),
        img1: require('../../../../images/website-show/logo/logo-fujiakeji-1.png'),
      },
      {
        logo: '浙江清华长三角研究院',
        img: require('../../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan.png'),
        img1: require('../../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan-1.png'),
      },
      {
        logo: '杭州市地方税务局',
        img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png'),
        img1: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju-1.png'),
      },
      {
        logo: '数牛金服',
        img: require('../../../../images/website-show/logo/logo-shuniujinfu.png'),
        img1: require('../../../../images/website-show/logo/logo-shuniujinfu-1.png'),
      },
      {
        logo: '易商互动',
        img: require('../../../../images/website-show/logo/logo-yishanghudong.png'),
        img1: require('../../../../images/website-show/logo/logo-yishanghudong-1.png'),
      },
      {
        logo: '银江股份',
        img: require('../../../../images/website-show/logo/logo-yinjianggufen.png'),
        img1: require('../../../../images/website-show/logo/logo-yinjianggufen-1.png'),
      },
    ]
  };

  dataEn = {
    banner: {
      blocks: [
        {name: 'User Volume', count: 12202200, iconClass: 'font-connect',},
        {name: 'Block Height', count: 12202200, iconClass: 'font-block',},
        {name: 'Attestation data', count: 12202200, iconClass: 'font-data',},
      ],
      bannerSwitch: [
        {
          img: require('../../../../images/website-show/home/banner-home-6-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: 'NumChain：As The First Boar',
            subtitle: 'MemberMIIT Launch 「China Blockchain Alliance Lab」',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-1-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: 'Record For Free      Keep For A Lifetime',
            subtitle: 'Recordkeeping on the Blockchain , further to improve the public credibility',
          },
          btn: [
            {name: 'LEARN MORE', className: 'middle-btn', route: '/marketing', useBtnWrap: true},
          ]
        },
        {
          img: require('../../../../images/website-show/home/banner-home-2-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: '',
            subtitle: '',
          },
          btn: [
            {name: 'LEARN MORE', className: 'middle-btn', route: '/CFCA', useBtnWrap: true},
          ]
        },
        {
          img: require('../../../../images/website-show/home/banner-home-3-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: 'Blockchain: Witnessed by Millions of Users',
            subtitle: 'Multi-layer Blockchain Network, Build upon Data-Blockchain, anchoring to public chain, thus gaining public technical credibility',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-4-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: 'Trust Big Data: Multi-dimension Analysis, Return to The Truth',
            subtitle: 'Trustworthy Internet Architecture based on Blockchain, Access to Big data service, with complete and accurate data analysis, leading to sound judgement',
          },
          btn: []
        },
        {
          img: require('../../../../images/website-show/home/banner-home-5-en.jpg'),
          bgColor: 'transparent',
          info: {
            title: 'Data Verify: Powering with Judicial Effect',
            subtitle: 'Cooperate with Notary, Forensic and Arbitration, Increase judicial approval for Blockchain, as well as reduce evidence cost through online apply',
          },
          btn: []
        },
      ]
    },
    productions: [
      {
        name: 'Trustworthy Electronic Certificate',
        description: 'Based on the multi-layer Blockchain storage system, Baoquan.com guarantees the uniqueness of data, as well as provides the trustworthy electronic certificate service, which combining  the cloud storage technology with SDK packaging technology. All the produced and circulated data could be called via the interface of Baoquan.com, and then storaged on the Blockchain with the proof of immutability and traceability, further providing the one-stop data attestation service.',
        industries: [
          {name: 'Financial Industry', iconClass: 'font-finance'},
          {name: 'E-commerce', iconClass: 'font-e-commerce'},
          {name: 'Public Welfare', iconClass: 'font-community'},
          {name: 'Big data Exchange', iconClass: 'font-big-data'},
          {name: 'Anti-forgery', iconClass: 'font-trace'},
        ],
        functions: ['Data Attestation', 'Web Attestation', 'API', 'Online Issue'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-electronic-certificate.png'),
        route: '/production/electronic-certificate',
        join: '/attestations',
      },
      {
        name: 'Baoquan Sig',
        description: 'Based on the multi-layer Blockchain storage system, Baoquan.com guarantees the uniqueness of data, as well as provides the trustworthy electronic certificate service, which combining  the cloud storage technology with SDK packaging technology. All the produced and circulated data could be called via the interface of Baoquan.com, and then storaged on the Blockchain with the proof of immutability and traceability, further providing the one-stop data attestation service.',
        industries: [
          {name: 'Financial Industry', iconClass: 'font-finance'},
          {name: 'E-commerce', iconClass: 'font-e-commerce'},
          {name: 'Public Welfare', iconClass: 'font-community'},
          {name: 'E-government', iconClass: 'font-affair'},
          {name: 'Tourism Industry', iconClass: 'font-travel'},
        ],
        functions: ['Data Privacy', 'Judicial Access', 'Contract Record'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-baoquan-visa.png'),
        route: '/production/baoquan-visa',
        join: '/signatures/profile',
      }, {
        name: 'Network Forensics',
        description: '‘Network Forensics’ is a product for e-data attestation in the form of web-evidence. Based on the real-time processing, the web content would be transformed into electronic evidence, which has the legal effect. When certificate issuing required, you can apply for the online judicial expertise.',
        industries: [
          {name: 'Personal', iconClass: 'font-personal'},
          {name: 'Enterprise', iconClass: 'font-company'},
        ],
        functions: ['Negative Rumor Spread', 'IP Infringement', 'Slander & Insult', 'Mirroring Counterfeiting'],
        iconClass: 'font-data',
        img: require('../../../../images/website-show/home/icon-home-baoquan-visa.png'),
        route: '/production/web-forensics',
        join: '/evidences',
      }
    ],
    services: [
      {
        name: 'Judicial Access',
        description: 'Baoquan.com provides one-stop service for digital notarization and judicial expertise',
        img: require('../../../../images/website-show/home/img-sample-1.jpg'),
        route: '/service/forensic'
      }, {
        name: 'Blockchain Deployment',
        description: 'Blockchain has three key technical features: Immutability + Traceability + Transparency',
        img: require('../../../../images/website-show/home/img-sample-2.jpg'),
        route: '/service/privatisation-deployment'
      }
    ],
    solutions: [
      {
        name: 'Fintech',
        iconClass: 'font-finance',
        description: 'With a rich experience in the financial industry, Baoquan.com can guarantee the integrity of capital flow and information flow during the exchange process.',
        functions: ['Data Security', 'Privacy Protection', 'E-signature', 'Data Attestation'],
        cases: [
          {
            logo: '浙金网',
            img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
          },
          {
            logo: '算力宝',
            img: require('../../../../images/website-show/logo/logo-suanlibao.png')
          },
        ],
        route: '/solution/finance'
      }, {
        name: 'Big data Exchange',
        shortName: 'Big-data-Ex',
        iconClass: 'font-big-data',
        description: 'Through the whole supervision process for recording and tracing, Baoquan.com can solve the issues of rights, including rights authentication, rights protection...',
        functions: ['Authentic Certificate', 'Authorized Record', 'Data Traceability', 'Data  Accuracy'],
        cases: [
          // {logo: '亚欧大数据交易所', img: require('../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png'):'../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png'},
        ],
        route: '/solution/big-data-trade'
      }, {
        name: 'Intellectual Property',
        shortName: 'IP',
        iconClass: 'font-IPR',
        description: 'People is paying more and more attention to the rights protection of intellectual property, then how to effectively authenticate and protect rights has...',
        functions: ['Online Authenticate', 'Property Flow-transfer', 'Rights Defense', 'Data Security'],
        cases: [
          {
            logo: '拾贝',
            img: require('../../../../images/website-show/logo/logo-shibei.png')
          },
        ],
        route: '/solution/intellectual-property'
      }, {
        name: 'E-government',
        iconClass: 'font-affair',
        description: 'The process of E-government seems more rigorous compared with other network activities, and the accuracy and integrity of data which are related to the authority...',
        functions: ['Privatized Nodes', 'Inner Isolation', 'E-archive Management', 'E-signature'],
        cases: [
          {
            logo: '杭州市地方税务局',
            img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
          },
        ],
        route: '/solution/e-government-affair'
      }, {
        name: 'Anti-forgery',
        iconClass: 'font-trace',
        description: 'Combined Blockchain e-data attestation system with traditional system, Baoquan.com provides the anti-counterfeiting and traceability service...',
        functions: ['Evidence Chain', 'Data Attestation', 'Realtime Verify', 'Digital Fingerprint'],
        cases: [],
        route: '/solution/security-traceability'
      }, {
        name: 'Public Welfare',
        iconClass: 'font-community',
        description: 'All of the  charity digital assets will be recorded on the chain, including the donated amount, capital flows, further keeping for a life time with transparency.',
        functions: ['Project Management', 'Privacy Protection', 'Trustworthy Electronic Certificate', 'E-signature'],
        cases: [
          {
            logo: '灵析',
            img: require('../../../../images/website-show/logo/logo-lingxi.png')
          },
        ],
        route: '/solution/public-benefit'
      }, {
        name: 'Points',
        iconClass: 'font-points',
        description: 'The whole process from retrieval to convert finally to exchange service would be recorded on the chain, and the nodes members on the consortium chain...',
        functions: ['Exchange Mechanism', 'Record Keeping', 'Trustworthy Electronic Certificate', 'Points Transfer'],
        cases: [
          {
            logo: '瑞泰鸿信',
            img: require('../../../../images/website-show/logo/logo-ruitaihongxin.png')
          },
        ],
        route: '/solution/point'
      }
    ],
    partners: [
      {
        logo: '阿里云',
        img: require('../../../../images/website-show/logo/logo-aliyun.png'),
        img1: require('../../../../images/website-show/logo/logo-aliyun-1.png'),
      },
      {
        logo: 'FACTOM',
        img: require('../../../../images/website-show/logo/logo-FACTOM.png'),
        img1: require('../../../../images/website-show/logo/logo-FACTOM-1.png'),
      },
      {
        logo: '千信网',
        img: require('../../../../images/website-show/logo/logo-qianxinwang.png'),
        img1: require('../../../../images/website-show/logo/logo-qianxinwang-1.png'),
      },
      {
        logo: '拾贝',
        img: require('../../../../images/website-show/logo/logo-shibei.png'),
        img1: require('../../../../images/website-show/logo/logo-shibei-1.png'),
      },
      {
        logo: '信安在线',
        img: require('../../../../images/website-show/logo/logo-xinanzaixian.png'),
        img1: require('../../../../images/website-show/logo/logo-xinanzaixian-1.png'),
      },
      {
        logo: 'GOSUN',
        img: require('../../../../images/website-show/logo/logo-GOSUN.png'),
        img1: require('../../../../images/website-show/logo/logo-GOSUN-1.png'),
      },
      {
        logo: '孚嘉科技',
        img: require('../../../../images/website-show/logo/logo-fujiakeji.png'),
        img1: require('../../../../images/website-show/logo/logo-fujiakeji-1.png'),
      },
      {
        logo: '浙江清华长三角研究院',
        img: require('../../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan.png'),
        img1: require('../../../../images/website-show/logo/logo-zhejiangqinghuachangsanjiaoyanjiuyuan-1.png'),
      },
      {
        logo: '杭州市地方税务局',
        img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png'),
        img1: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju-1.png'),
      },
      {
        logo: '数牛金服',
        img: require('../../../../images/website-show/logo/logo-shuniujinfu.png'),
        img1: require('../../../../images/website-show/logo/logo-shuniujinfu-1.png'),
      },
      {
        logo: '易商互动',
        img: require('../../../../images/website-show/logo/logo-yishanghudong.png'),
        img1: require('../../../../images/website-show/logo/logo-yishanghudong-1.png'),
      },
      {
        logo: '银江股份',
        img: require('../../../../images/website-show/logo/logo-yinjianggufen.png'),
        img1: require('../../../../images/website-show/logo/logo-yinjianggufen-1.png'),
      },
    ]
  };

  changeIndex = (e, index) => {
    this.state.solutionIndex = index;
    this.setState({});
  };

  hover = (index) => {
    return () => {
      this.setState({
        isLogoHover: index
      })
    }
  };

  getData = () => {
    this.props.dispatch(getHomeData());
    this.timer = setInterval(() => {
      this.props.dispatch(getHomeData());
    }, 1000 * 60 * 10);
  };

  componentWillMount = () => {
    this.props.dispatch(getIndustryNews());
    this.props.dispatch(getMediaReport());
    this.props.dispatch(getBlockChain());
    this.getData();
    this.changeLang();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.changeLang();
    }
  };

  componentWillUnmount = () => {
    if (this.timer) clearInterval(this.timer);
  };

  changeLang = () => {
    this.data = LanguageUtil.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = LanguageUtil.lang === 'zh' ? '保全网-区块链电子数据存证服务一站式平台' : 'BAOQUAN.COM';
  };

  changeStyle = (isHover) => {
    return () => {
      this.setState({isHover: isHover})
    }
  };

  render() {
    let fmt = Formatter.get('yyyy-mm-dd');
    this.data.banner.blocks[0].count = this.props.userCount;
    this.data.banner.blocks[1].count = this.props.blockHeight;
    this.data.banner.blocks[2].count = this.props.blockCount;
    const {report, blockChain, media} = this.props;

    let defaultPic = require('../../../../images/website-show/others/pic-block-dcoument.jpg');

    return <div className="web-show-container" style={{backgroundColor: '#f6f7fb'}}>
      <Header/>
      <FloatBar/>
      <Banner bannerData={this.data.banner}>
        <div className="block-statistics">
          {this.data.banner.blocks.map(
            (item, i) =>
              <article key={i} className="items">
                <span className={"icon iconfont " + item.iconClass}/>
                <aside>
                  <span>{item.count}</span>
                  <h2>{item.name}</h2>
                </aside>
              </article>
          )}
        </div>
      </Banner>
      <Production data={this.data.productions}/>
      <article className="services">
        <h1 className="h1">{T.translate('home.service')}</h1>
        <div className="services-container">
          {this.data.services.map(
            (item, i) =>
              <article key={i} className="row">
                <img src={item.img} alt=""/>
                <Link to={item.route} className="brief a">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <span href="javascript:void 0" className="a">{T.translate('home.learn-more-1')}></span>
                </Link>
              </article>
          )}
        </div>
      </article>
      <article className="solutions">
        <h1 className="h1">{T.translate('home.solution')}</h1>
        <div className="solutions-container">
          {this.data.solutions.map(
            (item, i) =>
              <Solution key={i} isHover={this.state.solutionIndex === i}
                        data={item}
                        onMouseEnter={(e) => {
                          this.changeIndex(e, i)
                        }}/>
          )}
        </div>
      </article>
      <article className="news">
        <h1 className="h1">{T.translate('home.info')}</h1>
        <div className="news-container">
          <article className="news-list">
            <h2><span>{T.translate('home.news')}</span><Link to="/other/industry-news"
                                                             className="a">{T.translate('home.more')}></Link></h2>
            {
              report.length > 0 ?
                <ul>
                  <li>
                    <Link to={`/other/industry-news/${report[0].id}`} className="a">
                      <img src={report[0].fileKey || defaultPic} alt=""/>
                      <h3>{report[0].title}</h3>
                    </Link>
                  </li>
                  {report.slice(1, (report.length >= 5 ? 5 : report.length)).map(
                    (item1, i) =>
                      <li key={i}>
                        <time>{fmt.format(item1.time)}</time>
                        <Link to={`/other/industry-news/${item1.id}`} className="a">{item1.title}</Link>
                      </li>
                  )}
                </ul>
                : ""
            }
          </article>
          <article className="news-list">
            <h2><span>{T.translate('home.media')}</span><Link to="/other/media-reports"
                                                              className="a">{T.translate('home.more')}></Link></h2>
            {
              media.length > 0 ?
                <ul>
                  <li>
                    <Link to={`/other/media-reports/${media[0].id}`} className="a">
                      <img src={media[0].fileKey || defaultPic} alt=""/>
                      <h3>{media[0].title}</h3>
                    </Link>
                  </li>
                  {media.slice(1, (media.length >= 5 ? 5 : media.length)).map(
                    (item1, i) =>
                      <li key={i}>
                        <time>{fmt.format(item1.time)}</time>
                        <Link to={`/other/media-reports/${item1.id}`} className="a">{item1.title}</Link>
                      </li>
                  )}
                </ul>
                : ""
            }
          </article>
          <article className="news-list">
            <h2><span>{T.translate('home.blockchain')}</span><Link to="/other/block-documents"
                                                                   className="a">{T.translate('home.more')}></Link></h2>
            {
              blockChain.length > 0 ?
                <ul>
                  <li>
                    <Link to={`/other/block-documents/${blockChain[0].id}`} className="a">
                      <img src={defaultPic} alt=""/>
                      <h3>{blockChain[0].title}</h3>
                    </Link>
                  </li>
                  {blockChain.slice(1, (blockChain.length >= 5 ? 5 : blockChain.length)).map(
                    (item1, i) =>
                      <li key={i}>
                        <time>{fmt.format(item1.time)}</time>
                        <Link to={`/other/block-documents/${item1.id}`} className="a">{item1.title}</Link>
                      </li>
                  )}
                </ul>
                : ""
            }
          </article>
        </div>
      </article>
      <article className="partners">
        <h1 className="h1">{T.translate('home.partner')}</h1>
        <div className="partners-container">
          {this.data.partners.map(
            (item, i) =>
              <span key={i} className="a" onMouseEnter={this.hover(i)} onMouseLeave={this.hover(-1)}>
                  <img src={this.state.isLogoHover === i ? item.img : item.img1} alt={item.logo}/>
                </span>
          )}
        </div>
      </article>
      <Footer/>
    </div>
  }
}
