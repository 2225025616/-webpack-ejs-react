import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";
import LanguageUtil from "../../utils/LanguageUtil";
import replace from "../../utils/replace";
import T from "i18n-react";
import StorageUtil from "../../utils/StorageUtil";
import push from "../../utils/push";

@connect(state => {
  return {
    user: state.user.info,
    pathname: state.router.location.pathname,
    location: state.router.location,
    organizations: state.organization.all,
  }
})
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '',
      btnBgColor: 0,
      btnColor: 0,
      currHoverType: '',
      currProductChildrenIndex: 0,
      currSolutionChildrenIndex: 0,
      submenuLeft: 0,
    };
  }

  navData = {};

  navDataZh = {
    product: [
      {
        name: '可信电子凭证',
        children: [
          {name: '标准API接口', description: '标准化接口 快速实现数据上链保全', route: '/production/electronic-certificate?index=0'},
          {name: '支持各种数据类型', description: '满足多满足多场景保全存证需求', route: '/production/electronic-certificate?index=1'},
          {name: '分布式网络存储', description: '结合区块链技术 保证数据安全与隐私', route: '/production/electronic-certificate?index=2'},
          {name: '多路由公链保全', description: '多路由上链 保障可靠性', route: '/production/electronic-certificate?index=3'},
          {name: '司法有效性', description: '对接司法鉴定中心 在线申请司法鉴定意见书', route: '/production/electronic-certificate?index=4'},
        ],
        route: '/production/electronic-certificate'
      }, {
        name: '保全签',
        children: [
          {name: '数据完全隐私', description: '文件加密 保障数据隐私', route: '/production/baoquan-visa?index=0'},
          {name: '司法有效性', description: '对接CA中心 具备司法效益', route: '/production/baoquan-visa?index=1'},
          {name: '合同记录可溯源', description: '结合区块链技术 合同签署存证保全', route: '/production/baoquan-visa?index=2'},
        ],
        route: '/production/baoquan-visa'
      }, {
        name: '网页取证',
        children: [
          {name: '简单便捷', description: '仅需通过简单输入网址，即可在线取证', route: '/production/web-forensics?index=0'},
          {name: '数据存证', description: '取证信息实时打包，进行数据保全存证', route: '/production/web-forensics?index=0'},
          {name: '司法鉴定', description: '对接司法鉴定机构，提供一站式法律服务', route: '/production/web-forensics?index=0'},
          {name: '实时上链', description: '取证数据上链处理，不可篡改可追溯', route: '/production/web-forensics?index=0'},
        ],
        route: '/production/web-forensics'
      }, {
        name: '诚信档案',
        children: [
          {name: '企业信用聚合', description: '聚合企业信用 保障信息可靠', route: '/production/credit-records?index=0'},
          {name: '区块链存证信用', description: '社会化诚信体系基础 企业诚信经营的保障', route: '/production/credit-records?index=0'},
          {name: '社会化验证真伪', description: '社会化验证，构建全方位社会化验证体系', route: '/production/credit-records?index=0'},
          {name: '一站式信用溯源', description: '运用区块链技术，企业认证信息不可篡改', route: '/production/credit-records?index=0'},
        ],
        route: '/production/credit-records'
      }, {
        name: '私有化部署',
        children: [
          {name: '数据安全', description: '数据安全不泄露', route: '/service/privatisation-deployment?index=0'},
          {name: '实时上链', description: '直连上链保实时', route: '/service/privatisation-deployment?index=0'},
          {name: '定制化', description: '业务扩展定制化', route: '/service/privatisation-deployment?index=0'},
          {name: '结合区块链', description: '快速实现区块链+', route: '/service/privatisation-deployment?index=0'},
        ],
        route: '/service/privatisation-deployment'
      }, {
        name: '司法鉴定通道',
        children: [
          {name: '司法鉴定中心', description: '构建可信电子凭证的司法有效性闭环，为数字世界构建可信数据规则', route: '/service/forensic?index=0'},
        ],
        route: '/service/forensic'
      },
    ],
    solution: [
      {
        name: '科技金融',
        children: [
          {
            name: '数据安全、真实',
            description: '各类数据均有数据生成者签名再写入区块链，保证数据可验证、不可篡改和伪造。同时可根据区块链中存储的数据对数据溯源。',
            route: '/solution/finance'
          },
          {
            name: '隐私保护',
            description: '利用不同加密算法的有效组合对重要数据加密，保护用户隐私，对于需要公示的数据涉及的敏感部分脱敏，保护用户隐私。',
            route: '/solution/finance'
          },
          {
            name: '电子签名',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/finance'
          },
          {
            name: '数据保全',
            description: '将重要的数据保全在区块链中并获得保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
            route: '/solution/finance'
          },
        ],
        description: '为用户提供电子签名及数据保全服务，保障用户的合法权益',
        route: '/solution/finance'
      },
      {
        name: '大数据交易',
        children: [
          {
            name: '确权证书',
            description: '数据作为受保护的虚拟资产，每份符合标准且有效的数据和交易都有对应的确权证书。',
            route: '/solution/big-data-trade'
          },
          {
            name: '数据授权记录',
            description: '数据拥有者对数据的使用进行授权，并将授权内容进行在区块链，只有获得数据使用授权才能够使用该数据。',
            route: '/solution/big-data-trade'
          },
          {
            name: '数据流转追溯',
            description: '将数据的来源、流向和使用等信息均写入区块链，可以完成数据流转溯源问题。',
            route: '/solution/big-data-trade'
          },
          {
            name: '数据真实可验',
            description: '对于保全数据，验证者可以利用写入区块链的hash值对其原始数据进行验证，保证数据真实非被篡改。',
            route: '/solution/big-data-trade'
          },
        ],
        description: '对交易数据全流程区块链记录，解决大数据交易的各类问题',
        route: '/solution/big-data-trade'
      },
      {
        name: '知识产权',
        children: [
          {
            name: '数据安全',
            description: '将区块链技术和密码学技术有效结合，保证数据不可篡改和系统安全。',
            route: '/solution/intellectual-property'
          },
          {
            name: '维权取证',
            description: '将网络侵权页面进行实时抓取，实现维权证据固定，防止侵权方事后证据删除。',
            route: '/solution/intellectual-property'
          },
          {
            name: '在线确权',
            description: '利用区块链技术下的时间戳与数据唯一性特点，实现对知识产权所有权的第一时间线上证据固定，完成确权。',
            route: '/solution/intellectual-property'
          },
          {
            name: '产权流转溯源',
            description: '将涉及版权申请、使用和交易环节中所有痕迹记录至区块链，后续可以查看并追溯它们的全过程。',
            route: '/solution/intellectual-property'
          },
        ],
        description: '利用区块链有效地解决知识产权的确权和保护等方面遇到的问题',
        route: '/solution/intellectual-property'
      },
      {
        name: '电子政务',
        children: [
          {
            name: '存证节点私有化',
            description: '将存证节点进行私有化，保证数据安全，防止数据被盗用和流出。',
            route: '/solution/e-government-affair'
          },
          {
            name: '内网隔离',
            description: '内网节点按照政府机构内网安全要求及备份要求部署于机构内部服务器。',
            route: '/solution/e-government-affair'
          },
          {
            name: '电子签名',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/e-government-affair'
          },
          {
            name: '电子档案管理',
            description: '减少电子档案管理，在节点上进行数据保存。',
            route: '/solution/e-government-affair'
          },
        ],
        description: '在现有的电子政府基础上为政府提供更加透明和有效的基础设施',
        route: '/solution/e-government-affair'
      },
      {
        name: '防伪溯源',
        children: [
          {
            name: '构建溯源证据链',
            description: '将商品生产到被消费全部过程进行记录保全，构建成消费者、商品、商家、服务商、农户和物流的完整溯源链。',
            route: '/solution/security-traceability'
          },
          {
            name: '实时抽取与验证',
            description: '与各子系统实时API连接，建立实时数据抽取和验证系统。',
            route: '/solution/security-traceability'
          },
          {
            name: '电子标签数据指纹',
            description: '每个物品有对应的电子标签，将电子标签的数据指纹写入区块链，保证标签无法伪造。',
            route: '/solution/security-traceability'
          },
          {
            name: '数据保全',
            description: '对各环节所涉及的重要数据进行保全，形成可信电子凭证，保障各方的合法权益。',
            route: '/solution/security-traceability'
          },
        ],
        description: '将区块链数据保全和物联网软硬件结合，为商品提供伪溯源服务',
        route: '/solution/security-traceability'
      },
      {
        name: '公益',
        children: [
          {
            name: '项目信息管理',
            description: '项目从发起创建到执行持续数据存证，保证项目信息的真实客观和完整，并能够追踪公益获得实时情况。',
            route: '/solution/public-benefit'
          },
          {
            name: '隐私保护',
            description: '利用不同加密算法的有效组合对重要数据加密，保护用户隐私，对于需要公示的数据涉及的敏感部分脱敏，保护用户隐私。',
            route: '/solution/public-benefit'
          },
          {
            name: '电子签名',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/public-benefit'
          },
          {
            name: '可信电子凭证',
            description: '重要数据进行区块链保全，可以对保全的数据申请出具保全证书，获得唯一性的数字公益凭证。',
            route: '/solution/public-benefit'
          },
        ],
        description: '区块链记录公益全部数据，将助人行为留存并真实追溯爱心价值',
        route: '/solution/public-benefit'
      },
      {
        name: '积分',
        children: [
          {
            name: '兑换机制固化',
            description: '利用区块链技术，实现角色、媒介和账本均统一，将积分的兑换机制固化，同时实现发行兑换过程公开透明。',
            route: '/solution/point'
          },
          {
            name: '交易记录保全',
            description: '将涉及的所有记录和信息进行区块链保全，这些记录及信息均hash后存入区块链，保证保全数据的安全和不可删除。',
            route: '/solution/point'
          },
          {
            name: '可信电子凭证',
            description: '保全的数据均可生成相应的保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
            route: '/solution/point'
          },
          {
            name: '积分流转溯源',
            description: '解决积分流转过程中的来源和走向的问题，可以便捷的查找积分从哪来到哪去。',
            route: '/solution/point'
          },
        ],
        description: '区块链保全积分获取到流传的整体过程数据，实现价值最大化',
        route: '/solution/point'
      },
    ],
    verify: [],
    news: [],
    blockPublicity: []
  };

  navDataEn = {
    product: [
      {
        name: 'Trustworthy Electronic Certificate',
        children: [
          {
            name: 'Standard API Interface',
            description: '标准化接口 快速实现数据上链保全',
            route: '/production/electronic-certificate?index=0'
          },
          {
            name: 'Variety of data types',
            description: '满足多满足多场景保全存证需求',
            route: '/production/electronic-certificate?index=1'
          },
          {
            name: 'Distributed network storage',
            description: '结合区块链技术 保证数据安全与隐私',
            route: '/production/electronic-certificate?index=2'
          },
          {
            name: 'Multiple routing & Public chain',
            description: '多路由上链 保障可靠性',
            route: '/production/electronic-certificate?index=3'
          },
          {
            name: 'Judicial efficiency',
            description: '对接司法鉴定中心 在线申请司法鉴定意见书',
            route: '/production/electronic-certificate?index=4'
          },
        ],
        route: '/production/electronic-certificate'
      }, {
        name: 'Baoquan Sig',
        children: [
          {name: 'Data privacy', description: '文件加密 保障数据隐私', route: '/production/baoquan-visa?index=0'},
          {name: 'Judicial efficiency', description: '对接CA中心 具备司法效益', route: '/production/baoquan-visa?index=1'},
          {name: 'Contract traceability', description: '结合区块链技术 合同签署存证保全', route: '/production/baoquan-visa?index=2'},
        ],
        route: '/production/baoquan-visa'
      }, {
        name: 'Network Forensics',
        children: [
          {name: 'Simple & Convenient', description: '仅需通过简单输入网址，即可在线取证', route: '/production/web-forensics?index=0'},
          {name: 'Digital Attestation', description: '取证信息实时打包，进行数据保全存证', route: '/production/web-forensics?index=0'},
          {name: 'Judicial Identification', description: '对接司法鉴定机构，提供一站式法律服务', route: '/production/web-forensics?index=0'},
          {name: 'Real-time on chain', description: '取证数据上链处理，不可篡改可追溯', route: '/production/web-forensics?index=0'},
        ],
        route: '/production/web-forensics'
      }, {
        name: 'Integrity Archives',
        children: [
          {
            name: 'Enterprise credit points',
            description: '聚合企业信用 保障信息可靠',
            route: '/production/credit-records?index=0'
          },
          {
            name: 'Credit Recordkeeping',
            description: '社会化诚信体系基础 企业诚信经营的保障',
            route: '/production/credit-records?index=0'
          },
          {
            name: 'Socialized Verification',
            description: '社会化验证，构建全方位社会化验证体系',
            route: '/production/credit-records?index=0'
          },
          {
            name: 'One-stop credit traceability',
            description: '运用区块链技术，企业认证信息不可篡改',
            route: '/production/credit-records?index=0'
          },
        ],
        route: '/production/credit-records'
      }, {
        name: 'Privatized Deployment',
        children: [
          {name: 'Data security', description: '数据安全不泄露', route: '/service/privatisation-deployment?index=0'},
          {name: 'Real-time on chain', description: '直连上链保实时', route: '/service/privatisation-deployment?index=0'},
          {name: 'Customized service', description: '业务扩展定制化', route: '/service/privatisation-deployment?index=0'},
          {name: 'Blockchain +', description: '快速实现区块链+', route: '/service/privatisation-deployment?index=0'},
        ],
        route: '/service/privatisation-deployment'
      }, {
        name: 'Judicial Expertise Channel',
        children: [
          {
            name: 'Judicial Access',
            description: '构建可信电子凭证的司法有效性闭环，为数字世界构建可信数据规则',
            route: '/service/forensic?index=0'
          },
        ],
        route: '/service/forensic'
      },
    ],
    solution: [
      {
        name: 'Fintech',
        children: [
          {
            name: 'Data Security',
            description: '各类数据均有数据生成者签名再写入区块链，保证数据可验证、不可篡改和伪造。同时可根据区块链中存储的数据对数据溯源。',
            route: '/solution/finance'
          },
          {
            name: 'Privacy Protection',
            description: '利用不同加密算法的有效组合对重要数据加密，保护用户隐私，对于需要公示的数据涉及的敏感部分脱敏，保护用户隐私。',
            route: '/solution/finance'
          },
          {
            name: 'E-signature',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/finance'
          },
          {
            name: 'Data Attestation',
            description: '将重要的数据保全在区块链中并获得保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
            route: '/solution/finance'
          },
        ],
        description: '为用户提供电子签名及数据保全服务，保障用户的合法权益',
        route: '/solution/finance'
      },
      {
        name: 'Big data Exchange',
        children: [
          {
            name: 'Authentic Certificate',
            description: '数据作为受保护的虚拟资产，每份符合标准且有效的数据和交易都有对应的确权证书。',
            route: '/solution/big-data-trade'
          },
          {
            name: 'Authorized Record',
            description: '数据拥有者对数据的使用进行授权，并将授权内容进行在区块链，只有获得数据使用授权才能够使用该数据。',
            route: '/solution/big-data-trade'
          },
          {
            name: 'Data Traceability',
            description: '将数据的来源、流向和使用等信息均写入区块链，可以完成数据流转溯源问题。',
            route: '/solution/big-data-trade'
          },
          {
            name: 'Data  Accuracy',
            description: '对于保全数据，验证者可以利用写入区块链的hash值对其原始数据进行验证，保证数据真实非被篡改。',
            route: '/solution/big-data-trade'
          },
        ],
        description: '对交易数据全流程区块链记录，解决大数据交易的各类问题',
        route: '/solution/big-data-trade'
      },
      {
        name: 'Intellectual Property',
        children: [
          {
            name: 'Data Security',
            description: '将区块链技术和密码学技术有效结合，保证数据不可篡改和系统安全。',
            route: '/solution/intellectual-property'
          },
          {
            name: 'Rights Defense',
            description: '将网络侵权页面进行实时抓取，实现维权证据固定，防止侵权方事后证据删除。',
            route: '/solution/intellectual-property'
          },
          {
            name: 'Online Authenticate',
            description: '利用区块链技术下的时间戳与数据唯一性特点，实现对知识产权所有权的第一时间线上证据固定，完成确权。',
            route: '/solution/intellectual-property'
          },
          {
            name: 'Property Flow-transfer',
            description: '将涉及版权申请、使用和交易环节中所有痕迹记录至区块链，后续可以查看并追溯它们的全过程。',
            route: '/solution/intellectual-property'
          },
        ],
        description: '利用区块链有效地解决知识产权的确权和保护等方面遇到的问题',
        route: '/solution/intellectual-property'
      },
      {
        name: 'E-government',
        children: [
          {
            name: 'Privatized Nodes',
            description: '将存证节点进行私有化，保证数据安全，防止数据被盗用和流出。',
            route: '/solution/e-government-affair'
          },
          {
            name: 'Inner Isolation',
            description: '内网节点按照政府机构内网安全要求及备份要求部署于机构内部服务器。',
            route: '/solution/e-government-affair'
          },
          {
            name: 'E-signature',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/e-government-affair'
          },
          {
            name: 'E-archive Management',
            description: '减少电子档案管理，在节点上进行数据保存。',
            route: '/solution/e-government-affair'
          },
        ],
        description: '在现有的电子政府基础上为政府提供更加透明和有效的基础设施',
        route: '/solution/e-government-affair'
      },
      {
        name: 'Anti-forgery',
        children: [
          {
            name: 'Evidence Chain',
            description: '将商品生产到被消费全部过程进行记录保全，构建成消费者、商品、商家、服务商、农户和物流的完整溯源链。',
            route: '/solution/security-traceability'
          },
          {
            name: 'Data Realtime Verify',
            description: '与各子系统实时API连接，建立实时数据抽取和验证系统。',
            route: '/solution/security-traceability'
          },
          {
            name: 'Digital Fingerprint',
            description: '每个物品有对应的电子标签，将电子标签的数据指纹写入区块链，保证标签无法伪造。',
            route: '/solution/security-traceability'
          },
          {
            name: 'Data Attestation',
            description: '对各环节所涉及的重要数据进行保全，形成可信电子凭证，保障各方的合法权益。',
            route: '/solution/security-traceability'
          },
        ],
        description: '将区块链数据保全和物联网软硬件结合，为商品提供伪溯源服务',
        route: '/solution/security-traceability'
      },
      {
        name: 'Public Welfare',
        children: [
          {
            name: 'Project Management',
            description: '项目从发起创建到执行持续数据存证，保证项目信息的真实客观和完整，并能够追踪公益获得实时情况。',
            route: '/solution/public-benefit'
          },
          {
            name: 'Privacy Protection',
            description: '利用不同加密算法的有效组合对重要数据加密，保护用户隐私，对于需要公示的数据涉及的敏感部分脱敏，保护用户隐私。',
            route: '/solution/public-benefit'
          },
          {
            name: 'E-signature',
            description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
            route: '/solution/public-benefit'
          },
          {
            name: 'Trustworthy Electronic Certificate',
            description: '重要数据进行区块链保全，可以对保全的数据申请出具保全证书，获得唯一性的数字公益凭证。',
            route: '/solution/public-benefit'
          },
        ],
        description: '区块链记录公益全部数据，将助人行为留存并真实追溯爱心价值',
        route: '/solution/public-benefit'
      },
      {
        name: 'Points',
        children: [
          {
            name: 'Exchange Mechanism',
            description: '利用区块链技术，实现角色、媒介和账本均统一，将积分的兑换机制固化，同时实现发行兑换过程公开透明。',
            route: '/solution/point'
          },
          {
            name: 'Record Keeping',
            description: '将涉及的所有记录和信息进行区块链保全，这些记录及信息均hash后存入区块链，保证保全数据的安全和不可删除。',
            route: '/solution/point'
          },
          {
            name: 'Trustworthy Electronic Certificate',
            description: '保全的数据均可生成相应的保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
            route: '/solution/point'
          },
          {
            name: 'Points Transfer',
            description: '解决积分流转过程中的来源和走向的问题，可以便捷的查找积分从哪来到哪去。',
            route: '/solution/point'
          },
        ],
        description: '区块链保全积分获取到流传的整体过程数据，实现价值最大化',
        route: '/solution/point'
      },
    ],
    verify: [],
    news: [],
    blockPublicity: []
  };

  oldTop = 0;

  componentWillMount = () => {
    let lang = this.props.location.query['lang'];
    if (lang && lang !== LanguageUtil.lang)
      this.props.dispatch(replace(this.props.location.pathname));
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  componentDidMount = () => {
    if (this.props.haveScrollEvent !== false)
      window.addEventListener("scroll", this.scroll);
  };

  componentWillUnmount = () => {
    if (this.props.haveScrollEvent !== false)
      window.removeEventListener("scroll", this.scroll);
  };

  getData = () => {
    this.navData = LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? this.navDataZh : this.navDataEn;
  };

  scroll = e => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 420 && this.oldTop < 420) {
      this.setState({
        bgColor: '#202124',
        btnBgColor: '#1687ee',
        btnColor: '#fff',
      });
    } else if (scrollTop < 420) {
      let state = {};
      if (this.oldTop >= 420)
        state = {
          bgColor: 'rgba(32,33,36,' + scrollTop / 420 + ')',
          btnBgColor: 0,
          btnColor: 0
        };
      else
        state = {
          bgColor: 'rgba(32,33,36,' + scrollTop / 420 + ')',
        };
      this.setState(state);
    }
    this.oldTop = scrollTop;
  };

  dropDown = (type) => {
    return (e) => {
      this.setState({
        submenuLeft: e.target.offsetLeft,
        currProductChildrenIndex: 0,
        currSolutionChildrenIndex: 0,
        currHoverType: type,
      });
    };
  };

  packUp = () => {
    this.setState({
      currHoverType: ''
    });
  };

  changeIndex = (index, type) => {
    return type === 'product' ?
      () => {
        this.setState({
          currProductChildrenIndex: index
        });
      }
      : () => {
        this.setState({
          currSolutionChildrenIndex: index
        });
      }
  };

  changeLang = (lang) => {
    return () => {
      LanguageUtil.lang = lang;
      this.props.dispatch(replace(this.props.location.pathname));
      this.forceUpdate();
    }
  };

  toUserCenter = () => {
    let isOrg = StorageUtil.showOrganization();
    if(isOrg == "false")
     this.props.dispatch(push(`/attestations`))
    else
      this.props.dispatch(push(`/org-statistic`))
  };

  render() {
    let {haveScrollEvent, otherNav, btnFontColor, user, organizations} = this.props,
      organization = organizations[organizations.length - 1] || {};
    console.log(organization.organizationStatus);

    return <div className="show-header-container"
                style={haveScrollEvent !== false ? this.state.bgColor ? {backgroundColor: this.state.bgColor} : {} : {backgroundColor: this.props.bgColor || '#202124'}}>
      <header className="show-header width">
        <nav>
          <Link to="/home" className="a logo"/>
          <div className="a" onMouseEnter={this.dropDown('product')} onMouseLeave={this.packUp}>
            {T.translate('header.product')}
            <div className="submenu"
                 style={this.state.currHoverType === 'product' ? {display: 'block'} : {display: 'none'}}>
              <div className="subNav" style={{left: this.state.submenuLeft + 'px'}}>
                {this.navData.product.map(
                  (item, i) => {
                    let noRouteIndex = this.props.noRoute && this.props.noRoute.product && this.props.noRoute.product.index;
                    if (noRouteIndex !== i)
                      return <Link key={i} to={item.route || void 0}>
                        <div className={this.state.currProductChildrenIndex === i ? 'sub-a hover' : 'sub-a'}
                             onMouseEnter={this.changeIndex(i, 'product')}>
                          <span className="item" title={item.name}>{item.name}</span>
                          <span className="iconfont font-down"/>
                        </div>
                      </Link>;
                    return <a key={i} href="javascript:void 0">
                      <div className={this.state.currProductChildrenIndex === i ? 'sub-a hover' : 'sub-a'}
                           onMouseEnter={this.changeIndex(i, 'product')}>
                        <span className="item" title={item.name}>{item.name}</span>
                        <span className="iconfont font-down"/>
                      </div>
                    </a>
                  }
                )}
              </div>
              <div className="features" style={{left: this.state.submenuLeft + 200 + 'px'}}>
                {this.navData.product[this.state.currProductChildrenIndex].children.map(
                  (item, i) => {
                    let noRouteIndex = this.props.noRoute && this.props.noRoute.product && this.props.noRoute.product.index,
                      clickFactory = this.props.noRoute && this.props.noRoute.product && this.props.noRoute.product.clickFactory;
                    if (noRouteIndex !== this.state.currProductChildrenIndex)
                      return <Link key={i} to={item.route || void 0} className="feature">
                        <h4>{item.name}</h4>
                        {LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ?
                          <p>{item.description}</p> : ''}
                      </Link>;
                    return <a key={i} href='javascript:void 0' onClick={clickFactory(i)} className="feature">
                      <h4>{item.name}</h4>
                      {LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ?
                        <p>{item.description}</p> : ''}
                    </a>
                  }
                )}
              </div>
            </div>
          </div>
          <div className="a" onMouseEnter={this.dropDown('solution')} onMouseLeave={this.packUp}>
            {T.translate('header.solution')}
            <div className="submenu"
                 style={this.state.currHoverType === 'solution' ? {display: 'block'} : {display: 'none'}}>
              <div className="subNav" style={{left: this.state.submenuLeft + 'px'}}>
                {this.navData.solution.map(
                  (item, i) =>
                    <Link key={i} to={item.route || void 0}>
                      <div className={this.state.currSolutionChildrenIndex === i ? 'sub-a hover' : 'sub-a'}
                           onMouseEnter={this.changeIndex(i, 'solution')}>
                        <span className="item" title={item.name}>{item.name}</span>
                        <span className="iconfont font-down"/>
                      </div>
                    </Link>
                )}
              </div>
              <div className="solution-features" style={{left: this.state.submenuLeft + 200 + 'px'}}>
                {this.navData.solution[this.state.currSolutionChildrenIndex].children.map(
                  (item, i) =>
                    <Link key={i} to={item.route || void 0} className="solution-feature">
                      <h4>{item.name}</h4>
                      {LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ?
                        <p>{item.description}</p> : ''}
                    </Link>
                )}
              </div>
            </div>
          </div>
          <Link to="/other/query" className="a">{T.translate('header.query')}</Link>
          <Link to="/other/industry-news" className="a">{T.translate('header.news')}</Link>
          <Link to="/other/dashboard" className="a">{T.translate('header.blockchain')}</Link>
          {/*<a href="https://explorer.baoquan.com" target="_blank" className="a">{T.translate('header.veraxchain')}</a> 保全链还未发布所以先隐藏*/}
        </nav>
        <div className="header-right">
 {/*         {
            (LanguageUtil.lang === "zh") ?
              <a href='javascript:void 0' onClick={this.changeLang('en')} className="route-a">English</a>
              : <a href='javascript:void 0' onClick={this.changeLang('zh')} className="route-a">简体中文</a>
          }*/}
          <Link to="/other/help-document" className="route-a">{T.translate('header.support')}</Link>
          <Link to="/other/about-us" className="route-a">{T.translate('header.about')}</Link>
          {
            !user.id ?
              <div className="login-content">
                <Link to="/sign-in" className="route-a">{T.translate('header.sign-in')}</Link>
                <Link to="/sign-up/personal" className="route-sign-up"
                      style={haveScrollEvent !== false ? {
                        borderColor: this.state.btnBgColor || '',
                        backgroundColor: this.state.btnBgColor || '',
                        color: this.state.btnColor || btnFontColor,
                      } : {
                        borderColor: '#1687ee',
                        backgroundColor: '#1687ee',
                        color: '#fff',
                      }}>{T.translate('header.sign-up')}</Link>
                <Link to="/sign-in" className="route-manage">{T.translate('header.my-account')}</Link>
              </div>
              :
              <div className="login-content">
                <span className="phone" onClick={this.toUserCenter}>{user.phoneNumber}</span>
                <span className="route-manage1" onClick={this.toUserCenter}>{T.translate('header.my-account')}</span>
              </div>
          }
        </div>
      </header>
      {otherNav ?
        <nav className="other-nav">
          <div className="nav-container">
            {otherNav.map(
              (item, index) => <Link key={index} to={item.route}
                                     className={'a' + `${item.selected ? ' selected' : ''}`}>{item.name}</Link>
            )}
          </div>
        </nav> : ''}
    </div>
  }
}
