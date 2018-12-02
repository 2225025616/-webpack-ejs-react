import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class IntellectualPropertySolution extends Component {

  data = {};

  dataZh = {
    name: '知识产权解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-intellectual-property.png'),
      bgColor: '#00b7ee',
      info: {
        title: '知识产权',
        subtitle: '利用区块链有效地解决知识产权的确权和保护等方面遇到的问题',
      },
    },
    requirement: {
      text: [
        '流程繁琐：登记确权流程繁琐，需要准备的材料多，过程比较长，费用高；',
        '易受攻击：版权保护平台基于中心化网站，易受攻击，无法完全保障数据安全；',
        '取证手段匮乏：现有的版权保护没有严格可信的可追溯性，调查取证手段匮乏；',
        '支撑力不够理想：出现版权纠纷后法律支撑力不够理想，法律法规亟待完善。',
      ]
    },
    description: {
      text: '随着人们对知识产权的保护越来越重视，如何及时有效地对知识产权进行确权和保护成为一个亟待解决的问题。',
      features: [
        {name: '数据安全', description: '将区块链技术和密码学技术有效结合，保证数据不可篡改和系统安全。', iconClass: 'font-cleancodeprog'},
        {name: '维权取证', description: '将网络侵权页面进行实时抓取，实现维权证据固定，防止侵权方事后证据删除。', iconClass: 'font-cardvisitingpa'},
        {name: '在线确权', description: '利用区块链技术下的时间戳与数据唯一性特点，实现对知识产权所有权的第一时间线上证据固定，完成确权。', iconClass: 'font-signature'},
        {name: '产权流转溯源', description: '将涉及版权申请、使用和交易环节中所有痕迹记录至区块链，后续可以查看并追溯它们的全过程。', iconClass: 'font-banknotemoney'},
      ]
    },
    advantages: [],
    scenes: [
      {
        name: '商标领域',
        description: '对商标创意和结果进行保全，保障设计者的权益。',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-1.jpg')
      },
      {
        name: '专利领域',
        description: '利用区块链技术，保全专利创作过程中的数据和结果。',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-2.jpg')
      },
      {
        name: '版权领域',
        description: '结合版权行业的特点，将涉及的重要数据进行保全。',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-3.jpg')
      },
      {
        name: '互联网微版权',
        description: '将互联网微版权的数据进行保全，便捷快速、保证创作者的合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-4.jpg')
      },
    ],
    cases: [
      {
        logo: '拾贝',
        img: require('../../../../images/website-show/logo/logo-shibei.png')
      },
    ],
  };

  dataEn = {
    name: 'Intellectual Property Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-intellectual-property-en.png'),
      bgColor: '#00b7ee',
      info: {
        title: 'Intellectual Property Solution',
        subtitle: 'Create timestamp for tracking the original works',
      },
    },
    requirement: {
      text: [
        'Cumbersome process: The whole process would take a long time with high costs, and also have to prepare for the detail materials.',
        'Vulnerability: The copyright protection platform that based on the centralized network, which lay open to attack that cannot ensure the data security.',
        'Lack of evidence: There is no trust traceability for the copyright protection, as well as lacking of evidence acquisition method.',
        'Not enough support: The legal support is not enough for the copyright dispute, the laws and regulations need to be perfected.',
      ]
    },
    description: {
      text: 'People is paying more and more attention to the rights protection of intellectual property, then how to effectively authenticate and protect rights has become an urgent issue to be solved.',
      features: [
        {
          name: 'Data Security',
          description: 'Combined blockchain technology with cryptography technology, to ensure the data immutability and system security.',
          iconClass: 'font-cleancodeprog'
        },
        {
          name: 'Rights Protection',
          description: 'Capture the web page of internet infringement in real-time, and fix the evidence avoid being deleted.',
          iconClass: 'font-cardvisitingpa'
        },
        {
          name: 'Online Authentic',
          description: 'Using the Blockchain characteristics of timestamp and data uniqueness, to record the evidence at the first time, then to complete rights authentication.',
          iconClass: 'font-signature'
        },
        {
          name: 'Transfer & Traceability',
          description: 'All the information of transaction process would  be recorded on the Blockchain, then to realize the traceability of data.',
          iconClass: 'font-banknotemoney'
        },
      ]
    },
    advantages: [],
    scenes: [
      {
        name: 'Trademark',
        description: 'Recordkeeping the originality and result of trademark, to guarantee the rights and interests of designers.',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-1.jpg')
      },
      {
        name: 'Patent',
        description: 'Using blockchain technology, recordkeeping the data and result during the creation process.',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-2.jpg')
      },
      {
        name: 'Copyright',
        description: 'Recordkeeping the important data by considering the characteristics of copyright.',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-3.jpg')
      },
      {
        name: 'Micro Internet copyright',
        description: 'Recordkeeping the copyright data, to guarantee the legal rights and interests of author in a convenient way.',
        img: require('../../../../images/website-show/solution/bg-solution-intellectual-property-4.jpg')
      },
    ],
    cases: [
      {
        logo: '拾贝',
        img: require('../../../../images/website-show/logo/logo-shibei.png')
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
