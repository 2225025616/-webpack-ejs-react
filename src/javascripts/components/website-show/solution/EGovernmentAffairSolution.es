import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class EGovernmentAffairSolution extends Component {

  data = {};

  dataZh = {
    name: '电子政务解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-e-government-affair.png'),
      bgColor: '#43c5d1',
      info: {
        title: '电子政务',
        subtitle: '在现有的电子政府基础上为政府提供更加透明和有效的基础设施',
      },
    },
    requirement: {
      text: ['电子政务的过程相比其他网络活动更加严谨，数据的准确性和完整性关系到政府机关的权威，和政务相对人之间发生的活动必须可追溯。同时，电子数据易被篡改和伪造，而依靠电子政务的平台本身来处理所有的信任问题，很可能给相对人造成信任危机。']
    },
    description: {
      text: '电子政务的过程相比其他网络活动更加严谨，数据的准确性和完整性关系到政府机关的权威。此外，区块链将为政府提供更为阳光、透明的服务基础设施。',
      features: [
        {name: '存证节点私有化', description: '将存证节点进行私有化，保证数据安全，防止数据被盗用和流出。', iconClass: 'font-setting'},
        {name: '内网隔离', description: '内网节点按照政府机构内网安全要求及备份要求部署于机构内部服务器。', iconClass: 'font-programplatform'},
        {
          name: '电子签名',
          description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
          iconClass: 'font-agreementpenm'
        },
        {name: '电子档案管理', description: '减少电子档案管理，在节点上进行数据保存。', iconClass: 'font-cleancodeprog'},
      ]
    },
    advantages: [],
    scenes: [
      {
        name: '不动产登记机关',
        description: '结合不动产登记机关制度，将各类数据进行保全。',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-1.jpg')
      },
      {
        name: '执法机构',
        description: '将执法过程的数据保全在区块链中，使得数据不可篡改和伪造。',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-2.jpg')
      },
      {
        name: '社保中心',
        description: '保全社保中各种流转数据，保证各方的合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-3.jpg')
      },
      {
        name: '税务机关',
        description: '各类数据进行保全，保护财务数据隐私的同时保证数据安全。',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-4.jpg')
      },
    ],
    cases: [
      {
        logo: '杭州市地方税务局',
        img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
      },
    ],
  };

  dataEn = {
    name: 'E-government Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-e-government-affair-en.png'),
      bgColor: '#43c5d1',
      info: {
        title: 'E-government Solution',
        subtitle: 'Provide more transparency and efficiency for infrastructure',
      },
    },
    requirement: {
      text: ['The governance procedure involved in e-government system is more strict and rigorous than other internet activities. The data accuracy and integrity is the key for showing government authority, therefore, any activities participants of governance process should be traceable. However, the conventional way is to rely all the trust issue on platform itself which lead to a counterparty trust problem.']
    },
    description: {
      text: 'The process of E-government seems more rigorous compared with other network activities, and the accuracy and integrity of data which are related to the authority of government. In addition, Blockchain help to provide the more transparent service infrastructure for the government.',
      features: [
        {
          name: 'Privatized Nodes',
          description: 'The privatization of recordkeeping nodes to ensure the data security, avoid the data theft and data breach.',
          iconClass: 'font-setting'
        },
        {
          name: 'Inner Isolution',
          description: 'The inner nodes would be deployed in the inner service according to the network security requirements and backup requirements.',
          iconClass: 'font-programplatform'
        },
        {
          name: 'E-signature',
          description: 'Apply for CA certificate for users, together with e-signature to ensure that the data source is corresponding to the facts, further to guarantee the data reality.',
          iconClass: 'font-agreementpenm'
        },
        {
          name: 'E-archive Management',
          description: 'Recordkeeping data on the nodes by reducing the management of e-profile.',
          iconClass: 'font-cleancodeprog'
        },
      ]
    },
    advantages: [],
    scenes: [
      {
        name: 'Real estate registration institution',
        description: 'Recordkeeping the various data by considering the related institutions.',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-1.jpg')
      },
      {
        name: 'Law enforcement agency',
        description: 'Recordkeeping the data in the process law of enforcement, to ensure the data immutability and data unforgeability.',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-2.jpg')
      },
      {
        name: 'Centres for medicare service',
        description: 'Recordkeeping the circulation data to guarantee the legal rights and interests of any parties.',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-3.jpg')
      },
      {
        name: 'Tax authority',
        description: 'Recordkeeping the online process data for real-time, to protect the data privacy as well as data security.',
        img: require('../../../../images/website-show/solution/bg-solution-e-government-affair-4.jpg')
      },
    ],
    cases: [
      {
        logo: '杭州市地方税务局',
        img: require('../../../../images/website-show/logo/logo-hangzhoudifangshuiwuju.png')
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

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? '保全网-' : 'BAOQUAN.COM - ') + this.data.name;
  };

  render() {

    return <SolutionTemplate data={this.data}/>
  }
}
