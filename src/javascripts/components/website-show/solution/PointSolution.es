import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class PointSolution extends Component {

  data = {};

  dataZh = {
    name: '积分解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-point.png'),
      bgColor: '#13a7b5',
      info: {
        title: '积分',
        subtitle: '区块链保全积分获取到流传的整体过程数据，实现价值最大化',
      },
    },
    requirement: {
      text: [
        '1、信用中介运营成本高：传统通兑平台更需要自行垫付大量资金以完成多个发行方于商户之间的结算、对账与协调，增加了通兑平台的运营成本；',
        '2、返佣差异影响商户积极性：不同品牌的返佣机制并不统一，且定价机制不透明，造成希望通过承兑积分提高商品销量的中小商户反而承担过多成本，影响其参与积极性；',
        '3、不透明信任成本高：不透明与信息不对称导致加盟积分发行方、商户以及积分持有用户对于平台的信任缺失。',
      ]
    },
    description: {
      text: '用户积分从获取到兑换再到换取服务的支付过程数据均全流程上链。联盟链节点成员能够从区块链直接抽取原始真实数据进行对账、审计。',
      features: [
        {
          name: '兑换机制固化',
          description: '利用区块链技术，实现角色、媒介和账本均统一，将积分的兑换机制固化，同时实现发行兑换过程公开透明。',
          iconClass: 'font-handbanknotem'
        },
        {name: '交易记录保全', description: '将涉及的所有记录和信息进行区块链保全，这些记录及信息均hash后存入区块链，保证保全数据的安全和不可删除。', iconClass: 'font-chat'},
        {
          name: '可信电子凭证',
          description: '保全的数据均可生成相应的保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
          iconClass: 'font-onlinetraining'
        },
        {name: '积分流转溯源', description: '解决积分流转过程中的来源和走向的问题，可以便捷的查找积分从哪来到哪去。', iconClass: 'font-boxsavemoney'},
      ]
    },
    advantages: [],
    scenes: [
      {
        name: '银行领域',
        description: '实现相关数据的有效保全，便捷、高效的形成积分流通机制。',
        img: require('../../../../images/website-show/solution/bg-solution-point-1.jpg')
      },
      {
        name: '通信业领域',
        description: '将交易的所有记录均进行保全，保证各方的合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-point-2.jpg')
      },
      {
        name: '保险领域',
        description: '结合保险行业相关积分规则，将相关数据有效保全。',
        img: require('../../../../images/website-show/solution/bg-solution-point-3.jpg')
      },
      {
        name: '餐饮业领域',
        description: '保全相关的所有信息，实现积分流转的溯源，保障用户合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-point-4.jpg')
      },
    ],
    cases: [
      {
        logo: '瑞泰鸿信',
        img: require('../../../../images/website-show/logo/logo-ruitaihongxin.png')
      },
    ],
  };

  dataEn = {
    name: 'Points Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-point-en.png'),
      bgColor: '#13a7b5',
      info: {
        title: 'Points Solution',
        subtitle: 'Points system to maximize the business value',
      },
    },
    requirement: {
      text: [
        '1、High operating cost: The traditional platform need to advance large funds to finish the settlement, accounting and coordination between multiple issuers, increase the operating costs.',
        '2、Low enthusiasm: Due to the rebate difference between different brands and the non-transparent pricing mechanism, the small and medium businesses need to absorb the higher cost, thus it is related to influence the participation enthusiasm.',
        '3、High trust cost: Information non-transparent and information asymmetry which lead users suffering from a deficit of trust.',
      ]
    },
    description: {
      text: 'The whole process from retrieval to convert finally to exchange service would be recorded on the chain, and the nodes members on the consortium chain can extract data from Blockchain to checking and auditing.',
      features: [
        {
          name: 'Exchange Mechanism',
          description: 'Using blockchain technology to realize the integrity of roles, media and account ledger, solidifying the exchange mechanism, then to ensure the transparency and openness during the whole process.',
          iconClass: 'font-handbanknotem'
        },
        {
          name: 'Record Keeping',
          description: 'All the involved information data would be recorded on the Blockchain after hash, to guarantee the security and immutability.',
          iconClass: 'font-chat'
        },
        {
          name: 'Trustworthy Electronic Certificate',
          description: 'The full transaction data will be constantly synchronised to the Blockchain, issuing the trustworthy electronic certificate at the same time, which has the force of law.',
          iconClass: 'font-onlinetraining'
        },
        {
          name: 'Transfer & Traceability',
          description: 'The accumulate points would be tracked from the source to the end, which brings more convenience.',
          iconClass: 'font-boxsavemoney'
        },
      ]
    },
    advantages: [],
    scenes: [
      {
        name: 'Bank',
        description: 'To realize the high efficiency for data recordkeeping and points circulation mechanism.',
        img: require('../../../../images/website-show/solution/bg-solution-point-1.jpg')
      },
      {
        name: 'Telecommunication',
        description: 'Recordkeeping all the transaction data to guarantee the judicial rights.',
        img: require('../../../../images/website-show/solution/bg-solution-point-2.jpg')
      },
      {
        name: 'Insurance',
        description: 'Combined with the points rule to record and keep the related data.',
        img: require('../../../../images/website-show/solution/bg-solution-point-3.jpg')
      },
      {
        name: 'Catering',
        description: 'Recordkeeping the involved information to realize the traceability of points, then to guarantee the rights and interests of users.',
        img: require('../../../../images/website-show/solution/bg-solution-point-4.jpg')
      },
    ],
    cases: [
      {
        logo: '瑞泰鸿信',
        img: require('../../../../images/website-show/logo/logo-ruitaihongxin.png')
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
