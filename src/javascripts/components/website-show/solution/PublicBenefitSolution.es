import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class PublicBenefitSolution extends Component {

  data = {};

  dataZh = {
    name: '公益解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-public-benefit.png'),
      bgColor: '#68cccc',
      info: {
        title: '公益',
        subtitle: '区块链记录公益全部数据，将助人行为留存并真实追溯爱心价值',
      },
    },
    requirement: {
      text: [
        '近些年，借助互联网，公益活动开始朝向精细化、全民化、广覆盖式发展开来。然而，日益红火的网络公益也因受助人信息造假、资金用途不透明等问题备受质疑，甚至成为一些不法分子的“生财之道”。',
        '1、审核把关不严：个人求助信息审核把关不严、对信息真实客观和完整性甄别不够等。',
        '2、信息不对称：受捐助方个人的家庭信息无法核实，社会组织之间信息也不对称。',
        '3、资金募集和流向的不透明：钱款的募集过程和使用去向很难做到公开透明，很容易导致项目方违规使用捐赠资金，甚至会借此虚设项目，骗取社会捐助。',
        '4、征信缺位：个人信息严重不透明，这给公益众筹提供了欺骗和不信任的土壤，由此导致公益众筹道德风险畸高。',
      ]
    },
    description: {
      text: '所有公益发起与参与记录将被记录在区块链上，从公益组织捐赠的金额、资金流向，公开透明，公众监督，让每个人一生的助人行为均被记录下来并且真实追溯爱心价值。',
      features: [
        {
          name: '项目信息管理',
          description: '项目从发起创建到执行持续数据存证，保证项目信息的真实客观和完整，并能够追踪公益获得实时情况。',
          iconClass: 'font-cardvisitingpa'
        },
        {
          name: '隐私保护',
          description: '利用不同加密算法的有效组合对重要数据加密，保护用户隐私，对于需要公示的数据涉及的敏感部分脱敏，保护用户隐私。',
          iconClass: 'font-portfoliocaseb'
        },
        {
          name: '电子签名',
          description: '为用户申请相对应的CA证书，用户对电子合同进行电子签名，确保数据来源与实际主体相对应，并保障其真实性。',
          iconClass: 'font-agreementpenm'
        },
        {name: '可信电子凭证', description: '重要数据进行区块链保全，可以对保全的数据申请出具保全证书，获得唯一性的数字公益凭证。', iconClass: 'font-onlinetraining'},
      ]
    },
    advantages: [],
    scenes: [],
    cases: [
      {
        logo: '灵析',
        img: require('../../../../images/website-show/logo/logo-lingxi.png')
      },
    ],
  };

  dataEn = {
    name: 'Public Welfare Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-public-benefit-en.png'),
      bgColor: '#68cccc',
      info: {
        title: 'Public Welfare Solution',
        subtitle: 'Support for ‘Love and Charity',
      },
    },
    requirement: {
      text: [
        'Recently, the charity activity starts toward to the refined development for all based on Internet. However, information accuracy and capital transparency of the online charity have been exploded into problems, even as the way to earn illegal money. ',
        '1、Relaxed review: It is not strict to review the personal information, lacking of the information accuracy and information integrity.',
        '2、Information asymmetry: It is unable to verify the accuracy of suppliant’s information, as well as the asymmetry information.',
        '3、Lack of transparency: The whole process for recruitment is lacking of transparency and openness, which may lead to social fraud.',
        '4、Uncompleted credit: For the uncompleted credit system, it offers chance for the illegal person to earn money.',
      ]
    },
    description: {
      text: 'All of the charity digital assets will be recorded on the chain, including the donated amount, capital flows, then keeping for a life time with transparency.',
      features: [
        {
          name: 'Project Management',
          description: 'Recordkeeping the whole process of project, to ensure the objective authenticity of project information, tracking information in real-time.',
          iconClass: 'font-cardvisitingpa'
        },
        {
          name: 'Privacy Protection',
          description: 'Encrypt data by using the valid combination of different encryption algorithm, then to protect user privacy, removing the sensitive data at the same time. ',
          iconClass: 'font-portfoliocaseb'
        },
        {
          name: 'E-signature',
          description: 'Apply for CA certificate for users, together with e-signature to ensure that the data source is corresponding to the facts, further to guarantee the data reality.',
          iconClass: 'font-agreementpenm'
        },
        {
          name: 'Trustworthy Electronic Certificate',
          description: 'The full transaction data will be constantly synchronised to the Blockchain, issuing the trustworthy electronic certificate at the same time.',
          iconClass: 'font-onlinetraining'
        },
      ]
    },
    advantages: [],
    scenes: [],
    cases: [
      {
        logo: '灵析',
        img: require('../../../../images/website-show/logo/logo-lingxi.png')
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
