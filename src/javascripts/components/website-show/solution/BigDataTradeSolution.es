import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class BigDataTradeSolution extends Component {

  data = {};

  dataZh = {
    name: '大数据交易解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-big-data-trade.png'),
      bgColor: '#1072ff',
      info: {
        title: '大数据交易',
        subtitle: '对交易数据全流程区块链记录，解决大数据交易的各类问题',
      },
    },
    requirement: {
      text: [
        '1、确权、维权难：数据提供方卖出的数据面临被无限次盗卖、市场价值不断损减的风险，严重制约了数据市场的规模与发展；',
        '2、数据造假：某些数据提供方为获得利益提供造假的数据，根据真实数据扩充伪造的数据量，保证模型拟合性不变，但是伪造的数据会导致数据挖掘的结果错误；',
        '3、需求无法满足：数据价值在企业升级转型中的作用愈加凸显，企业对于专业数据的需求越来越强烈，但企业的这些需求无法得到及时的相应和满足。',
      ]
    },
    description: {
      text: '通过对大数据交易全流程的区块链记录和溯源，解决数据卖方确权难、买方维权难、数据造假等问题，符合《信息安全法》要求。',
      features: [
        {name: '确权证书', description: '数据作为受保护的虚拟资产，每份符合标准且有效的数据和交易都有对应的确权证书。', iconClass: 'font-onlinetraining'},
        {name: '数据授权记录', description: '数据拥有者对数据的使用进行授权，并将授权内容进行在区块链，只有获得数据使用授权才能够使用该数据。', iconClass: 'font-chat'},
        {name: '数据流转追溯', description: '将数据的来源、流向和使用等信息均写入区块链，可以完成数据流转溯源问题。', iconClass: 'font-searchsystemp'},
        {
          name: '数据真实可验',
          description: '对于保全数据，验证者可以利用写入区块链的hash值对其原始数据进行验证，保证数据真实非被篡改。',
          iconClass: 'font-operatingsystem'
        },
      ]
    },
    advantages: [
      {name: '数据确权', description: '保证有效数据的提供方权益，同时解决数据需求方的需求，打击盗卖，凸显正版数据价值。', iconClass: 'font-data'},
      {name: '隐私保护', description: '利用技术和方法，不仅保证数据提供方和数据需求方的隐私，还避免数据涉及者隐私泄露。', iconClass: 'font-privacy-protection'},
      {name: '价值转移', description: '有效激发数据交易的积极性，促进流通的繁荣，实现价值转移，构建诚信互联网络。', iconClass: 'font-data-transfer'},
    ],
    scenes: [
      {
        name: '金融领域',
        description: '保证数据拥有者的权益，将数据流转的所有过程保全在区块链。',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-1.jpg')
      },
      {
        name: '教育领域',
        description: '将涉及数据所有信息均写入区块链，形成证据链，保障各方的合法权益。',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-2.jpg')
      },
      {
        name: '医疗领域',
        description: '保全远程开户数据、尽职调查数据、风险提示数据、投资过程数据等。',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-3.jpg')
      },
      {
        name: '交通领域',
        description: '提供登记资料第三方存证、出资证明及权益证明、合同协议第三方存证。',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-4.jpg')
      },
    ],
    cases: [
      // {
      //   logo: '亚欧大数据交易中心',
      //   img: require('../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png')
      // },
    ],
  };

  dataEn = {
    name: 'Big data exchange solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-big-data-trade-en.png'),
      bgColor: '#1072ff',
      info: {
        title: 'Big data exchange solution',
        subtitle: 'Full-process record  Direction solving one round',
      },
    },
    requirement: {
      text: [
        '1、Rights issue: The data provider would face the risks of stolen sell and minus value, which limit the development of data market.',
        '2、Data forgery: There are powerful groups that benefit from the forgery data, which may lead to the erroneous result of data mining without affecting the fitness.',
        '3、Growth demand: Data value is the key for enterprise upgrading and transformation, hence, the enterprise have a stronger demand for the accuracy data but can not meet with.',
      ]
    },
    description: {
      text: 'Through the whole supervision process for recording and tracing, Baoquan.com can solve the rights issues, including rights authentication, rights protection, data forgery, etc. Meanwhile, it can ensure full compliance with 《security of Information  Act》.',
      features: [
        {
          name: 'Authentic Certificate',
          description: 'As the protected virtual asset, each valid data and standard transaction have the corresponded authentic certificate.',
          iconClass: 'font-onlinetraining'
        },
        {
          name: 'Authorized Record',
          description: 'Data would be authorized by the data owner, and be recorded on the Blockchain, then it can be used based on the authenticated access.',
          iconClass: 'font-chat'
        },
        {
          name: 'Transfer & Traceability',
          description: 'All the information of data source, data flows and data usage would  be recorded on the Blockchain, then to realize the traceability of data.',
          iconClass: 'font-searchsystemp'
        },
        {
          name: 'Verify & Reality',
          description: 'For the recorded data, user can verify the data reality by the hash on the Blockchain, to ensure that the data has not been tampered with.',
          iconClass: 'font-operatingsystem'
        },
      ]
    },
    advantages: [
      {
        name: 'Rights Authentication',
        description: 'Guarantee the rights and interests of data provider, as well as meet with the data demand,  further to highlight the value of the original data.',
        iconClass: 'font-data'
      },
      {
        name: 'Privacy Protection',
        description: 'Using technology and method, not only to ensure the privacy for providers and demanders, but also to avoid the privacy leakage of data stakeholders.',
        iconClass: 'font-privacy-protection'
      },
      {
        name: 'Value Transfer',
        description: 'Stimulate the enthusiasm of data exchange, promote the prosperity of circulation, realize the transfer of value, further to construct the trustworthy Internet.',
        iconClass: 'font-data-transfer'
      },
    ],
    scenes: [
      {
        name: 'Finance',
        description: 'Guarantee the rights and interests of data owner, recordkeeping all the process of data transfer.',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-1.jpg')
      },
      {
        name: 'Education',
        description: 'All the involved data information would be written into Blockchain to form an evidence chain, so as to guarantee the legal interests for any parties.',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-2.jpg')
      },
      {
        name: 'Medical',
        description: 'Recordkeeping all the data information, and protect the privacy of data stakeholder during the exchange process.',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-3.jpg')
      },
      {
        name: 'Traffic',
        description: 'Forming a data transfer chain to ensure the accuracy of data as well as the legal interests of data owners.',
        img: require('../../../../images/website-show/solution/bg-solution-big-data-trade-4.jpg')
      },
    ],
    cases: [
      // {
      //   logo: '亚欧大数据交易中心',
      //   img: require('../../../../images/website-show/logo/logo-yaoudashujujiaoyisuo.png')
      // },
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
