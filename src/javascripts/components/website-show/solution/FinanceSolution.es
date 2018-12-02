import React, { Component } from "react";
import SolutionTemplate from "./SolutionTemplate";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class FinanceSolution extends Component {

  data = {};

  dataZh = {
    name: '科技金融解决方案',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-finance.png'),
      bgColor: '#2497ff',
      info: {
        title: '科技金融',
        subtitle: '为用户提供电子签名及数据保全服务，保障用户的合法权益',
      },
    },
    requirement: {
      text: ['互联网金融各平台风控能力参差不齐，现有在线协议和涉及资金的操作大多没有操作方的身份证明和操作时间记录，操作数据存储的安全性也受到怀疑，一旦发生纠纷，电子记录很难作为证据被采纳，参与方的权利无法得到保障。保全网团队结合丰富的金融行业经验，为金融行业客户提供科技金融解决方案，使金融资产交易过程中的资金流、信息流能够得到有效的记录并还原。']
    },
    description: {
      text: '互联网金融平台交易过程的电子数据实时地同步到第三方的安全云环境，以第三方身份记录事实，明确交易方的权利和义务，防范电子数据毁损或丢失造成的法律风险，使金融平台信息透明，参与方的权益得到保障。',
      features: [
        {
          name: '数据安全、真实',
          description: '各类数据均有数据生成者签名再写入区块链，保证数据可验证、不可篡改和伪造。同时可根据区块链中存储的数据对数据溯源。',
          iconClass: 'font-cleancodeprog'
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
        {
          name: '数据保全',
          description: '将重要的数据保全在区块链中并获得保全证书，在出现纠纷时可对所保全的数据申请司法鉴定意见书，获得司法有效性。',
          iconClass: 'font-mapservicesea'
        },
      ]
    },
    advantages: [],
    scenes: [
      {
        name: 'P2P业务',
        description: '将P2P交易过程中产生的关于交易方的权利义务数据以第三方保全的方式固化到云上。',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-1.jpg')
      },
      {
        name: '银行业务',
        description: '结合银行的行业特点，对各项协议和交易凭证进行存储。',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-2.jpg')
      },
      {
        name: '券商业务',
        description: '保全远程开户数据、尽职调查数据、风险提示数据、投资过程数据等。',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-3.jpg')
      },
      {
        name: '众筹业务',
        description: '提供登记资料第三方存证、出资证明及权益证明、合同协议第三方存证。',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-4.jpg')
      },
    ],
    cases: [
      {
        logo: '浙金网',
        img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
      },
    ],
  };

  dataEn = {
    name: 'FinTech Solution',
    banner: {
      img: require('../../../../images/website-show/solution/banner-solution-finance-en.png'),
      bgColor: '#2497ff',
      info: {
        title: 'FinTech Solution',
        subtitle: 'Ensure the data security for cash flow and information flow',
      },
    },
    requirement: {
      text: ['Due to the low risk control level , as well as the lacking of identity proof and time logs , the safety issue of data storage on the Internet Financial platform is always been concerned. Once any disruption happened, electronic record is less admissible as evidence, and the legal rights of parties cannot be insured. With a rich experience in the financial industry, Baoquan.com can guarantee the recording of capital flow and information flow during the transaction process.']
    },
    description: {
      text: 'The full transaction data of the Internet Finance platform will be constantly synchronised to the third-party safe cloud environment, so that the truth and fact will be recorded by the neutral party. That could explicitly ensure the specific rights and obligation of parties, and preventing the legal risks caused by the lost or damage of the electronic data. It will resulting to a transparent platform and keep stakes of participants insured.',
      features: [
        {
          name: 'Data Security',
          description: 'All data would be recorded on the Blockchain after signed, to ensure the immutability and verification of data, and realize the data traceability according to Blockchain info.',
          iconClass: 'font-cleancodeprog'
        },
        {
          name: 'Privacy Protection',
          description: 'Encrypt data by using the valid combination of different encryption algorithm, then to protect user privacy, removing the sensitive data at the same time.',
          iconClass: 'font-portfoliocaseb'
        },
        {
          name: 'E-signature',
          description: 'Apply for CA certificate for users, together with e-signature to ensure that the data source is corresponding to the facts, further to guarantee the data reality.',
          iconClass: 'font-agreementpenm'
        },
        {
          name: 'Data Attestation',
          description: 'The full transaction data will be constantly synchronised to the Blockchain. Once any disruption occurred, apply for judicial authentication directly, which has the force of law.',
          iconClass: 'font-mapservicesea'
        },
      ]
    },
    advantages: [],
    scenes: [
      {
        name: 'P2P',
        description: 'The process of data transaction will be solidified on the Blockchain by the third-party so that the rights and obligations of trade counterparties will be settled and unchangeable.。',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-1.jpg')
      },
      {
        name: 'Banks',
        description: 'By compacting with the features of banking business, BAOQUAN.COM can store and attest all kind of trading agreements and receipts.',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-2.jpg')
      },
      {
        name: 'Securities Companies',
        description: 'Attesting the remote account opening data, and due diligence, risk revealing information, as well as the process data of trading and investment.',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-3.jpg')
      },
      {
        name: 'Crowd-funding',
        description: 'Providing the services to store and attest those registry information, capital contribution certificate , certificate of rights and interests and agreements.',
        img: require('../../../../images/website-show/solution/bg-solution-finance-apply-4.jpg')
      },
    ],
    cases: [
      {
        logo: '浙金网',
        img: require('../../../../images/website-show/logo/logo-zhejinwang.png')
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
