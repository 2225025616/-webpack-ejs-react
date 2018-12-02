import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class SecurityTraceabilitySolution extends Component {

  data = {};

  dataZh = {
    name: '防伪溯源解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-security-traceability.png'),
      bgColor: '#4e8df5',
      info: {
        title: '防伪溯源',
        subtitle: '将区块链数据保全和物联网软硬件结合，为商品提供伪溯源服务',
      },
    },
    requirement: {
      text: [
        '食品安全是一项关系国际民生的“民心工程”，目前食品溯源系统问题：',
        '1、主要以企业为基础进行开发，虽能够满足企业溯源需求，但信息共享难以实现；',
        '2、溯源系统的链条不够长，导致上游和企业之间信息传递很难实现，一些产品的信息难以及时找到，影响食品安全问题的调查；',
        '3、由于第三方平台的公信力不足，消费者对溯源数据存在怀疑态度，同时合作企业在提供运营数据的时候有顾虑，导致平台数据缺乏而不能精确认证和管理。'
      ]
    },
    description: {
      text: '保全网为有需要的企业提供防伪溯源解决方案，结合区块链电子数据保全及物联网软硬件，为商品全流程提供防伪溯源服务。',
      features: [
        {
          name: '构建溯源证据链',
          description: '将商品生产到被消费全部过程进行记录保全，构建成消费者、商品、商家、服务商、农户和物流的完整溯源链。',
          iconClass: 'font-data-graphanaly'
        },
        {name: '实时抽取与验证', description: '与各子系统实时API连接，建立实时数据抽取和验证系统。', iconClass: 'font-strategyplanpr'},
        {name: '电子标签数据指纹', description: '每个物品有对应的电子标签，将电子标签的数据指纹写入区块链，保证标签无法伪造。', iconClass: 'font-phonesmartphone'},
        {name: '数据保全', description: '对各环节所涉及的重要数据进行保全，形成可信电子凭证，保障各方的合法权益。', iconClass: 'font-mapservicesea'},
      ]
    },
    advantages: [
      {name: '区块链技术应用', description: '信息不可篡改的，有效防范制假问题；产品验真的可信链条及事后追溯渠道。', iconClass: 'font-block'},
      {name: '保障数据安全', description: '敏感数据使用加密算法；按需授权查看方式保证企业的商业机密。', iconClass: 'font-identify-code'},
      {name: '维护企业的形象', description: '降低市场上假货的数量，有利于树立企业品牌形象。', iconClass: 'font-company-1'},
      {name: '提升消费者信赖感', description: '消费者便捷的查询食品来源，建立起企业与终端消费者的连接。', iconClass: 'font-credible'},
    ],
    scenes: [
      {
        name: '食品领域',
        description: '保全食品相关的全部流程信息，保障食品安全。',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-1.jpg')
      },
      {
        name: '制造业领域',
        description: '从制造业最初环节到最后环节的所有信息均保全在区块链中，形成完整的信息链。',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-2.jpg')
      },
      {
        name: '文物领域',
        description: '保全文物出土开始到后续保存、流通的所有信息，解决信息溯源问题。',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-3.jpg')
      },
      {
        name: '服装业领域',
        description: '将服装生产、运输到销售等全部信息保全至区块链，形成完整的溯源链，保障用户合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-4.jpg')
      },
    ],
    cases: []
  };

  dataEn = {
    name: 'Anti-forgery Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-security-traceability-en.png'),
      bgColor: '#4e8df5',
      info: {
        title: 'Anti-forgery Solution',
        subtitle: 'Socialized system based on Blockchain & Big data',
      },
    },
    requirement: {
      text: [
        'Problem of food safety is causing global attention increasingly, the current traceability system has the following issues:',
        '1、Developer mainly based on enterprise, which can satisfy the requirement for traceability but difficult for information sharing.',
        '2、The chain for traceability system is too short to transfer information between upstream and enterprise, directly affect the survey of food safety problem.',
        '3、Due to the lack of credibility of the third party platform, consumers have doubts about the trackable data, while the cooperative enterprises prefer not to provide operation data that is difficult to control administration all around.'
      ]
    },
    description: {
      text: 'Combined with Blockchain e-data attestation system with traditional system, Baoquan.com provides the anti-counterfeiting and traceability service for the products during the whole process.',
      features: [
        {
          name: 'Evidence Chain',
          description: 'The whole process of goods from produce to consumption would be recorded on the chain, then to form a full chain system.',
          iconClass: 'font-data-graphanaly'
        },
        {
          name: 'Realtime Verify',
          description: 'Connect to API of each sub-system in real-time, then to advance a real-time system for data extraction and verification.',
          iconClass: 'font-strategyplanpr'
        },
        {
          name: 'Digital Fingerprint',
          description: 'Each subject has the corresponding e-tag, the digital fingerprint of itself will be recorded on the Blockchain, then to ensure the unforgeability of tags.',
          iconClass: 'font-phonesmartphone'
        },
        {
          name: 'Data Attestation',
          description: 'Recordkeeping the important data in any sector, and issue the trustworthy electronic certificate to guarantee the rights and interests of all parties.',
          iconClass: 'font-mapservicesea'
        },
      ]
    },
    advantages: [
      {
        name: 'Blockchain application',
        description: 'Keep the information on the trust chain to prevent from counterfeiting issue.',
        iconClass: 'font-block'
      },
      {
        name: 'Data security',
        description: 'Using the encryption algorithm and authorized method to protect trade secrets.',
        iconClass: 'font-identify-code'
      },
      {
        name: 'Corporate identity',
        description: 'Promote the corporate values through reduce the number of fake goods.',
        iconClass: 'font-company-1'
      },
      {
        name: 'Consumer trust',
        description: 'Connect enterprise with the terminal consumer through the convenient referral system.',
        iconClass: 'font-credible'
      },
    ],
    scenes: [
      {
        name: 'Foodstuff',
        description: 'Recordkeeping the involved process information on Baoquan.com to guarantee the food safety.',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-1.jpg')
      },
      {
        name: 'Manufacturing',
        description: 'All the information during the whole process would be recorded on the Blockchain to form the entire information chain.',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-2.jpg')
      },
      {
        name: 'Cultural relics',
        description: 'Recordkeeping the circulation and preservation information to solve the issue of traceability.',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-3.jpg')
      },
      {
        name: 'Rag trade',
        description: 'The process information of the whole flow would be recorded on the Blockcahin, then to form an entire traceability chain.',
        img: require('../../../../images/website-show/solution/bg-solution-security-traceability-4.jpg')
      },
    ],
    cases: []
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
