import React, { Component } from "react";
import { browserHistory } from "react-router";
import Header from "../Header";
import FloatBar from "../FloatBar";
import Footer from "../Footer";
import LanguageUtil from "../../../utils/LanguageUtil";
import T from "i18n-react";
import { connect } from "react-redux";

@connect(state => ({
  location: state.router.location
}))
export default class HelpDocument extends Component {
  constructor(props) {
    super(props);
    let isFold = [],
      firstSelected = parseInt(this.props.location.query['firstSelected']) || 0,
      secondSelected = parseInt(this.props.location.query['secondSelected']) || 0;
    isFold[firstSelected] = true;
    this.state = {
      isFold,
      firstSelected,
      secondSelected,
    };
    this.pathname = this.props.location.pathname;
  }

  data = [];

  dataZh = [
    {
      name: '可信电子凭证',
      subContent: [
        {
          name: '原创保全',
          data: {
            brief: {
              name: '产品简介',
              content: '原创保全是保全网针对原创人员推出的防止侵权利器，保全网通过对接国家授时中心，在您上传原创作品的同时，进行作品实时固化，以方便您的作品在日后发生侵权时，及时证明您的作品优先时间。',
            },
            advantages: {
              name: '产品优势',
              children: [
                {name: '时间戳证明', description: '对接中国国家授时中心、苹果NTP服务，可靠的高精度的授时服务，保障时间的精准性。',},
                {name: '作品保全', description: '结合区块链技术，对上传的作品打散分布存储，保证作品的安全性与私密性。',},
                {name: '法律援助', description: '联合大成律师事务所，提供专业的法律援助服务',},
                {name: '司法出证', description: '联合司法鉴定机构，可在线快速申请出具公平公正的司法鉴定书',},
              ],
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [
                {
                  subtitle: '价格列表',
                  description: '',
                  tableHead: ['空间', '价格(元/年)'],
                  prices: [
                    {amount: '100M', price: '¥30.00'},
                    {amount: '300M', price: '¥88.00'},
                    {amount: '1G', price: '¥268.00'},
                  ],
                  tips: '付费会员单个文件容量大小，可升级至20M；如需更大保全空间，请联系客服',
                }
              ]
            },
            faqs: [
              {
                question: '为什么要对原创作品进行保全？',
                answer: '事前防范：及时进行原创作品的保全，在侵权发生前证明作品所属权益，防范侵权行为的发生。事后维权：当作品被侵权后，及时通过保全网咨询律师，申请法律援助，获得司法支持。'
              },
              {
                question: '保全网如何保障原创作品出证的司法效益？',
                answer: '保全网基于区块链三大特征：不可伪造不可篡改、可跟踪可溯源、公开透明可验证，对接司法、公证、仲裁通道，将原本比特世界易复制、易篡改的电子数据提供可信电子凭证化。'
              },
              {
                question: '发现作品被侵权后，如何在保全网上申请司法出证？',
                answer: '当发现您的作品被侵权后，您可通过保全网后台对已保全的文件进行申请出证服务，同时，您也可以通过网页取证服务，及时获取侵权证据'
              },
            ]
          },
        },
        {
          name: '网页取证',
          data: {
            brief: {
              name: '产品简介',
              content: '网页取证是一款针对网页形式电子数据进行证据保全的产品，通过对网页内容实时固化保全，并第一时间在司法鉴定中心背书，形成具备司法效力的电子证据。',
            },
            advantages: {
              name: '产品优势',
              children: '当发生侮辱、诽谤、隐私窃取、网站镜像仿冒、负面谣言传播、知识产权侵权等场景时，网页取证可以帮您瞬间固化证据，轻松解决取证难题；并且取证平台提供在线出证服务，不再需要您亲自前往司法鉴定中心办理鉴定，真正做到了足不出户获得司法保障的超高用户体验。',
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [
                {
                  subtitle: '价格列表',
                  description: '',
                  tableHead: ['次数', '价格(元/次)'],
                  prices: [
                    {amount: '5次以内', price: '免费'},
                    {amount: '超出5次部分', price: '¥2.00'},
                  ],
                  tips: '如果网页取证次数大于1000次，可联系客服详谈具体价格',
                }
              ]
            },
            faqs: [
              {
                question: '网页取证是否符合法律效力？',
                answer: '取证流程严格按照《电子签名法》相关规定，采用国家授时中心授权的可信时间戳技术实现。取证过程严谨，形成完整证据链，并出具详细的纸质取证报告。现已有众多法院直接采信，并有很多实际判例，可登录“中国裁判文书网”搜索“时间戳”查看已生效的判例。'
              },
              {
                question: '网页取证多久可以完成？',
                answer: '网页取证速度快，效率高，只需输入需要取证的网站，在几秒内即可完成。'
              },
              {
                question: '网页取证和传统截图有什么区别？',
                answer: '传统截图无法保证截图内容的准确性，而且传统截图容易被修改，无截图时间证明，无法律效力。网页取证则是通过互联网加密技术，结合互联网存证，保证司法效力。'
              },
            ]
          },
        },
        {
          name: '企业存证',
          data: {
            brief: {
              name: '产品简介',
              content: '保全网电子数据数据存证通过结合区块链技术，运用区块链不可篡改、可溯源等特性，实时固化电子数据的内容和形成时间，确保数据的真实公正，赋予电子数据文件法律证明效力',
            },
            advantages: {
              name: '产品特点',
              children: [
                {name: '大数据', description: '区块链+大数据加密技术保障数据安全',},
                {name: '区块链', description: '结合区块链，存证数据实时上链，构建完整证据链条',},
                {name: '法律援助', description: '联合大成律师事务所，提供专业的法律援助服务',},
                {name: '司法出证', description: '联合司法鉴定机构，可在线快速申请出具公平公正的司法鉴定书',},
              ],
            },
            prices: {
              name: '免费存证',
              description: '保全网企业电子数据存证永久免费，结合区块链+大数据技术，联合律师事务所与司法鉴定机构，存证数据保证法律效力。',
              children: [
                {
                  subtitle: '免费范围',
                  description: '',
                  tableHead: ['模块', '详细', '介绍'],
                  prices: [
                    {
                      amount: 'HASH存证',
                      price: 'HASH存证永久免费',
                      description: '企业将数据hash通过保全网锚定至区块链，生成数据保全书，对于保全的数据可申请司法鉴定意见书，具备司法效力。'
                    },
                    {
                      amount: '模板管理',
                      price: '模板数量不限',
                      description: '企业可以对模板进行管理，对最终保全书的数据条目进行修改'
                    },
                    {
                      amount: '成员管理',
                      price: '成员数量不限',
                      description: '企业可以添加企业成员，对保全功能进行授权操作'
                    },
                    {
                      amount: '存证条数',
                      price: '存证条数不限',
                      description: '企业存证的数据条数'
                    },
                    {
                      amount: '技术支持',
                      price: '售前支持、售后支持完全免费',
                      description: '企业技术对接、合同签署'
                    },
                    {
                      amount: '模板自定义',
                      price: '支持模板自定义',
                      description: '可以对存证模板内容修改调整已适应企业需求'
                    },
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: '使用指南',
              description: '保全网企业存证使用流程简介',
              subtitle: '使用流程',
              img: require('../../../../images/website-show/help-document/pic-help-certificate-process.jpg'),
            },
            faqs: [
              {
                question: '电子数据保全是什么？',
                answer: '电子数据保全是指对以电子数据形式(包括文字、图形、字母、数字、颜色组合和声音以及上述要素的组合等,下同) 存在的各类电子数据信息，运用专利技术进行运算、加密固定，载明保全生成的标准时间、运算值、档案编号等，以防止被人篡改，确保电子数据的原始性、客观性的程序及方法。'
              },
              {
                question: '为何要对电子数据进行保全？',
                answer: '第十一条 网络借贷信息中介机构申请备案登记时，应当如实提交以下申请材料：（十四）与第三方电子数据存证平台签订的委托合同存证的协议复印件。——《深圳市网络借贷信息中介机构备案登记管理办法（征求意见稿）》第十条 新设立的网络借贷信息中介机构申请办理备案登记的，应当提交以下申请材料：（十一）与第三方电子数据存证平台签订的委托合同存证的协议复印件；——《上海市网络借贷信息中介机构业务管理实施办法（征求意见稿）》网络借贷信息中介机构应当采取适当的方法和技术，记录并妥善保存网络借贷业务活动数据和资料，做好数据备份。保存期限应当符合法律法规及网络借贷有关监管规定的要求。借贷合同到期后应当至少保存５年。——《网络借贷信息中介机构业务活动管理暂行办法》'
              },
              {
                question: '电子数据保全的法律效力？',
                answer: '最新修正的《刑事诉讼法》《民事诉讼法》均将电子数据列为证据的一种。电子数据保全中心提供的保全证书，可作为司法人员和律师分析、认定案件事实的有效证据，让受保者在司法纠纷中占据有利地位。 根据受保者需要，电子数据保全中心还可以为受保者提供合作机构出具的公证书或司法鉴定书。'
              },
            ]
          },
        },
        {
          name: '个人存证接入指引',
          isAccessGuide: true,
          item: [
            {
              title: "1: 注册",
              description: "注册分为个人注册和企业注册，并且注册时个人注册和企业注册需绑定不同的手机号",
              img: require('../../../../images/website-show/help-document/access-guide-one.png'),
            },
            {
              title: "2: 实名认证",
              description: "注册完成后，需个人实名认证，点击“前往认证”进行实名认证",
              img: require('../../../../images/website-show/help-document/access-guide-two.png'),
            },
              {
                  title: "",
                  description: "填写个人认证信息申请认证，申请认证完成后，需要进行等待人工审核（一到两个工作日左右）",
                  img: require('../../../../images/website-show/help-document/access-guide-three.png'),
              },
            {
              title: "3: 原创保全",
              description: "上传您需要保全的文件进行保全（上传类型支持Word、Excel、PDF、TXT），保全成功后可在下方查看相关保全信息；",
              img: require('../../../../images/website-show/help-document/access-guide-four.png'),
            },
              {
                  title: "",
                  description: "",
                  img: require('../../../../images/website-show/help-document/access-guide-five.png'),
              },
            {
              title: "4: 网页保全",
              description: "输入您需要保全的网页地址和网页名称进行保全，保全成功后可在下方查看相关保全信息；",
              img: require('../../../../images/website-show/help-document/access-guide-six.png'),
            },
              {
                  title: "",
                  description: "",
                  img: require('../../../../images/website-show/help-document/access-guide-seven.png'),
              },
            {
              title: "5: 其他问题",
              description: "如有其它问题，请咨询技术人员。",
            },
          ]
        },
          {
              name: '企业存证接入指引',
              isAccessGuide: true,
              item: [
                  {
                      title: "1: 注册",
                      description: "注册分为个人注册和企业注册，并且注册时个人注册和企业注册需绑定不同的手机号；",
                      img: require('../../../../images/website-show/help-document/business-guide-one.png'),
                  },
                  {
                      title: "2: 实名认证",
                      description: "注册完成后，需企业实名认证，点击“前往认证”进行实名认证；",
                      img: require('../../../../images/website-show/help-document/business-guide-two.png'),
                  },
                  {
                      title: "",
                      description: "填写企业认证信息申请认证，申请认证完成后，需要进行等待人工审核（一到两个工作日左右）",
                      img: require('../../../../images/website-show/help-document/business-guide-three.png'),
                  },
                  {
                      title: "3: 私钥签名",
                      description: "点击“去设置密钥”按钮新建秘钥，具体步骤参见API文档：",
                      link: "https://baoquan.readthedocs.io/zh/latest/signature.html",
                      img: require('../../../../images/website-show/help-document/business-guide-four.png'),
                  },
                  {
                      title: "",
                      description: "",
                      img: require('../../../../images/website-show/help-document/business-guide-five.png'),
                  },
                  {
                      title: "4: 新增产品",
                      description: "在“企业保全”中的“企业产品”新增产品；",
                      img: require('../../../../images/website-show/help-document/business-guide-six.png'),
                  },
                  {
                      title: "5: 创建模版",
                      description: "可以根据需要创建不同的模板类型，创建完成后，模板需要审核；",
                      img: require('../../../../images/website-show/help-document/business-guide-seven.png'),
                  },
                  {
                      title: "6: API调用",
                      description: "API文档详见：",
                      link: "https://baoquan.readthedocs.io/zh/latest/api.html",
                      img: "",
                  },
                  {
                      title: "7: 其他问题",
                      description: "如有其它问题，请咨询技术人员。",
                      img: "",
                  },
              ]
          },
      ]
    },
    {
      name: '保全签',
      subContent: [
        {
          name: '网页签署',
          data: {
            brief: {
              name: '产品简介',
              content: '网页签署是指直接通过保全网在线签署合同的一种方式。所有签署流程都通过保全网进行，适用于个人或者对电子签名需求较少的小型企业。',
            },
            advantages: {
              name: '产品优势',
              children: [
                {name: '数据完全隐私', description: '签署文件加密，保障数据隐私',},
                {name: '司法有效性', description: '保全签对接CA中心， 保证具备司法效益',},
                {name: '合同记录可溯源', description: '合同记录可溯源',},
                {name: '司法出证', description: '联合司法鉴定机构，可在线快速申请出具公平公正的司法鉴定书',},
              ],
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [
                {
                  subtitle: '个人签署价格列表',
                  description: '个人签署：个人与个人之间的签署，如果含有企业，即为企业签署',
                  signTip: [
                    "如您的企业需要更多签署次数,我们可为您提供定制包年服务,详细信息请联系",
                    "邮箱: hz@baoquan.com",
                    "电话: 0571-28221076"
                  ],
                  tableHead: ['次数', '价格', '期限', '超额计价'],
                  prices: [
                    {amount: '5次以内', price: '免费', time: '终身', excessPrice: '5元/次'},
                    {amount: '25次', price: '¥125.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '50次', price: '¥200.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '100次', price: '¥350.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '1000次', price: '¥3000.00', time: '1年', excessPrice: '3元/次'},
                    {amount: '5000次', price: '¥10000.00', time: '1年', excessPrice: '2元/次'},
                    {amount: '20000次', price: '¥20000.00', time: '1年', excessPrice: '1元/次'},
                  ],
                  tips: '',
                },
                {
                  subtitle: '企业签署价格列表',
                  description: '企业签署：企业与企业之间的签署，如果含有企业，即为企业签署',
                  tableHead: ['次数', '价格', '期限', '超额计价'],
                  prices: [
                    {amount: '5次以内', price: '免费', time: '终身', excessPrice: '5元/次'},
                    {amount: '25次', price: '¥125.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '50次', price: '¥200.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '100次', price: '¥350.00', time: '1年', excessPrice: '5元/次'},
                    {amount: '1000次', price: '¥3000.00', time: '1年', excessPrice: '3元/次'},
                    {amount: '5000次', price: '¥10000.00', time: '1年', excessPrice: '2元/次'},
                    {amount: '20000次', price: '¥20000.00', time: '1年', excessPrice: '1元/次'},
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: '使用指南',
              description: '',
              subtitle: '使用流程',
              img: require('../../../../images/website-show/help-document/pic-help-baoquan-visa-process-1.jpg'),
            },
            faqs: [
              {
                question: '电子合同有法律效力么？',
                answer: '电子合同是《合同法》认可的一种合同形式。但由于电子合同以数据电文为载体，涉及到一系列的技术标准，其中最核心、也最重要的是电子签名技术。 这里说的电子签名是一串数据或代码，它采用数字证书的技术手段来确定签名人的真实身份。根据国家法律规定，只有使用可靠电子签名签订的电子合同才具有法律效力。《电子签名法》对可靠电子签名定义如下,电子签名同时符合下列条件的，视为可靠的电子签名：（一）电子签名制作数据用于电子签名时，属于电子签名人专有；（二）签署时电子签名制作数据仅由电子签名人控制；（三）签署后对电子签名的任何改动能够被发现；（四）签署后对数据电文内容和形式的任何改动能够被发现。因此，为保障电子签名的可靠性，用户最好在有强大技术保险的第三方平台进行合同的签订，使用具有防篡改、可识别文件签署人身份和签署时间的数字签名技术来签署合同，保证合同电子签名的可靠性和合同签署的安全性。'
              },
              {
                question: '什么是数字证书？什么是数字证书认证机构（CA）？',
                answer: '数字证书是目前国际上最成熟并得到广泛应用的信息安全技术。通俗地讲，数字证书就是个人或单位在网络上的身份证。数字证书以密码学为基础，采用数字签名、数字信封、时间戳服务等技术，在Internet上建立起有效的信任机制。它主要包含证书所有者的信息、证书所有者的公开密钥和证书颁发机构的签名等内容。所谓认证机构（CA，Certificate Authority），是采用公开密钥基础技术，专门提供网络身份认证服务，负责签发和管理数字证书，且具有权威性和公正性的第三方信任机构。它的作用类似于我们现实生活中颁发证件的机构，如身份证办理机构等。'
              },
              {
                question: '签署合同为什么要进行实名认证？',
                answer: '为了保证所签署合同完整的法律效力，所有参与电子合同签署的用户必须在线提交个人身份信息进行实名认证，系统会自动将您提交的信息与公安部的身份信息系统进行匹配，以核实合同签署主体的身份真实性，这是保障电子合同有效性的第一步。'
              },
              {
                question: '电子合同的适用范围有哪些？',
                answer: '根据《电子签名法》相关规定，以下文书不可使用电子签名，因此也不适用于电子合同：（一）涉及婚姻、收养、继承等人身关系的；（二）涉及土地、房屋等不动产权益转让的；（三）涉及停止供水、供热、供气、供电等公用事业服务的；（四）法律、行政法规规定的不适用电子文书的其他情形。'
              },
              {
                question: '为什么要使用PDF文档进行签署？',
                answer: 'PDF不仅是ISO 32000标准，同时也是中国国家推荐标准GB/T23286.1-2009。PDF具有内生的签名规范PADES，PDF中的电子签名可以使用Adobe Reader、福昕等第三方浏览器直接验证真伪。'
              },
            ]
          },
        },
        {
          name: '企业API签署',
          data: {
            brief: {
              name: '产品简介',
              content: 'API签署是指企业通过接入保全网API方式，将电子合同签署流程无缝的对接到现有业务中，不影响现有的流程和功能。快速安全地应用权威第三方合法有效的电子合同签署服务，签署的合同文件安全托管于平台上，保证签订过程的公正性和合法性。',
            },
            advantages: {
              name: '产品优势',
              children: [
                {name: '数据完全隐私', description: '签署文件HASH加密， 保障数据隐私',},
                {name: '司法有效性', description: '保全签对接CA中心， 保证具备司法效益',},
                {name: '合同记录可溯源', description: '合同记录可溯源',},
                {name: '司法出证', description: '联合司法鉴定机构，可在线快速申请出具公平公正的司法鉴定书',},
              ],
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [
                {
                  subtitle: '价格列表',
                  description: '',
                  tableHead: ['次数', '价格', '期限', '超额计价'],
                  prices: [
                    {amount: '5次以内', price: '免费', time: '终身', excessPrice: '18元/次'},
                    {amount: '100次', price: '¥1 800.00', time: '1年', excessPrice: '18元/次'},
                    {amount: '1000次', price: '¥13 000.00', time: '1年', excessPrice: '13元/次'},
                    {amount: '5000次', price: '¥50 000.00', time: '1年', excessPrice: '10元/次'},
                    {amount: '20000次', price: '¥100 000.00', time: '1年', excessPrice: '5元/次'},
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: '使用指南',
              description: '',
              subtitle: '使用流程',
              img: require('../../../../images/website-show/help-document/pic-help-baoquan-visa-process-2.jpg'),
            },
            faqs: [
              {
                question: '如何申请SDK和API的使用权限？',
                answer: '企业用户注册并认证完成后，可以在线申请接入保全签API，经过审核后，我们会向用户提供调用API的用户标识等信息'
              },
              {
                question: '电子合同的适用范围有哪些？',
                answer: '根据《电子签名法》相关规定，以下文书不可使用电子签名，因此也不适用于电子合同：（一）涉及婚姻、收养、继承等人身关系的；（二）涉及土地、房屋等不动产权益转让的；（三）涉及停止供水、供热、供气、供电等公用事业服务的；（四）法律、行政法规规定的不适用电子文书的其他情形。'
              },
              {
                question: '为什么要使用PDF文档进行签署？',
                answer: 'PDF不仅是ISO 32000标准，同时也是中国国家推荐标准GB/T23286.1-2009。PDF具有内生的签名规范PADES，PDF中的电子签名可以使用Adobe Reader、福昕等第三方浏览器直接验证真伪。'
              },
              {
                question: '保全签内部人员是否能查看到用户的合同内容？',
                answer: '绝对不会！保全签对用户的合同数据进行了多重加密存储，从合同进入保全签系统的那一刻起，保全签就对用户的合同使用数字信封进行保护，只有合同所有者以及合同参与者才有权限查看到合同的内容。其他人员包括保全签内部技术人员也无法查看合同内容。'
              },
            ]
          },
        },
      ]
    },
    {
      name: '私有化部署',
      subContent: [
        {
          name: '私有化部署',
          data: {
            brief: {
              name: '产品简介',
              content: '区块链技术的三大特征：不可伪造不可篡改、可跟踪可溯源、公开透明可验证，能够为企业发展赋予新势能。保全网根据行业特性，定制行业方案，使企业轻松进入区块链时代。',
            },
            advantages: {
              name: '产品优势',
              children: [
                {name: '技术优势', description: '丰富的区块链行业从业经验，专业区块链技术团队',},
                {name: '服务优势', description: '一对一专业技术咨询，部署快捷方便',},
                {name: '行业优势', description: '多年金融领域服务经验，多家合作机构技术认可',},
              ],
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [],
            },
            faqs: [
              {
                question: '什么是区块链？',
                answer: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的 新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法。'
              },
              {
                question: '区块链私有化部署有什么好处？',
                answer: '区块链私有化部署可以提高交易速度；更好的保护用户隐私；降低交易成本'
              },
              {
                question: '区块链私有化部署适用于什么行业？',
                answer: '智能合约、证券交易、电子商务、物联网、社交通讯、文件存储、存在性证明、 身份验证、股权众筹'
              },
            ]
          },
        }
      ]
    },
    {
      name: '司法鉴定通道',
      subContent: [
        {
          name: '司法鉴定通道',
          data: {
            brief: {
              name: '产品简介',
              content: '保全网对接了司法鉴定中心，用户可以在线申请对存证数据出具具备司法效力的公证书或司法鉴定证书。',
            },
            advantages: {
              name: '产品优势',
              children: [
                {name: '专业司法鉴定意见书', description: '通过联合司法鉴定中心，可出具专业的司法鉴定意见书。',},
                {name: '便捷出证方式', description: '直接通过后台可申请在线出证，出具的司法鉴定意见书全国通用',},
              ],
            },
            prices: {
              name: '价格与付费',
              description: '',
              children: [],
            },
          },
        }
      ]
    },
    {
      name: '其他问题',
      subContent: [
        {
          name: '注册登录',
          data: {
            faqs: [
              {
                type: '注册相关',
                children: [
                  {
                    question: '保全网可以通过什么方式注册账号？',
                    answer: '保全网目前仅支持通过手机号注册。'
                  },
                  {
                    question: '注册时没有收到验证码怎么办？',
                    answer: '2.1、 经过网关时，网络通讯异常可能会造成短信丢失，或延时收到短信，请您耐心等待一下；2.2、 手机状态不好、信号差。建议您尝试关机30分钟左右，或取出手机卡后换其它手机安装再试；2.3、 请您核实手机是否开启屏蔽系统短信，或安装了一些拦截短信的软件，建议 您换一部手机安装手机卡再试,或者打开屏蔽短信的软件，查看屏蔽短信；2.4、 手机停机、欠费状态下是不能够收到短信，若该手机还会使用，建议充值手机话费后操作；'
                  },
                  {
                    question: '显示手机号已注册怎么办？',
                    answer: '如果显示当前手机号已经被注册，建议您更换手机号再次进行尝试，或者联系客服提供有效身份证明文件解决'
                  },
                ]
              },
              {
                type: '登录相关',
                children: [
                  {
                    question: '登录时提示账户密码不正确怎么办？',
                    answer: '如果显示账户密码不正确，建议您更换手机号或密码后，再次进行尝试。'
                  },
                  {
                    question: '忘记密码时没有收到验证码怎么办？',
                    answer: '2.1、 经过网关时，网络通讯异常可能会造成短信丢失，或延时收到短信，请您耐心等待一下；2.2、 手机状态不好、信号差。建议您尝试关机30分钟左右，或取出手机卡后换其它手机安装再试；2.3、 请您核实手机是否开启屏蔽系统短信，或安装了一些拦截短信的软件，建议 您换一部手机安装手机卡再试,或者打开屏蔽短信的软件，查看屏蔽短信；2.4、 手机停机、欠费状态下是不能够收到短信，若该手机还会使用，建议充值手机话费后操作；'
                  },
                  {
                    question: '显示手机号未注册怎么办？',
                    answer: '如果显示当前手机号未注册，建议您先在网站注册再登陆。'
                  },
                ]
              },
              {
                type: '认证相关',
                children: [
                  {
                    question: '如何进行个人实名认证？',
                    answer: '如果您选择个人实名认证，需要填写身份证号、姓名、手机号，填写完成后，提交资料，系统将会自动对您的资料真实性进行判断。'
                  },
                  {
                    question: '如何进行企业实名认证？',
                    answer: '企业选择实名认证，首先需要创建企业，创建完成后，可以在线根据认证页面提示内容，上传或者填写响应的认证信息。认证资料提交后请等待客服人员审核。我们会在2个工作日内完成审核'
                  },
                  {
                    question: '个人认证与企业认证的区别是什么？',
                    answer: '企业认证权限较个人认证后多，如企业认证后可申请各种服务API的接入权限。'
                  },
                  {
                    question: '如何变更认证信息？',
                    answer: '认证信息暂不支持自助变更，如需变更，请与客服联系。'
                  },
                ]
              },
            ]
          },
        },
        {
          name: '财务相关',
          data: {
            faqs: [
              {
                type: '充值介绍',
                children: [
                  {
                    question: '有哪些充值方式可以选择？',
                    answer: '目前仅支持通过支付宝进行充值，更多充值方式正在开发中，如需通过其他方式充值，请联系客服'
                  },
                  {
                    question: '如何选择支付宝进行充值？',
                    answer: '如果您使用支付宝在线充值，系统自动跳转到支付宝等待支付界面，输入相关信息，确认订单。如果没有支付宝，可以通过右侧页面创建新的支付宝账户，使用网银支付。'
                  },
                  {
                    question: '充值完成后如何选择退款？',
                    answer: '目前暂不支持自助退款，如需退款，请您联系客服人员并提供相应的资料。'
                  },
                  {
                    question: '购买的套餐过期了怎么办？',
                    answer: '如果您购买的套餐尚未使用完成但已过有效期，那么剩余的套餐不可继续使用，如需继续使用，请重新购买'
                  },
                  {
                    question: '购买的套餐不想继续使用想退款怎么办？',
                    answer: '如果购买的套餐尚未使用完且在有效期内，您可通过练习客服，申请退款，具体的退款金额依据您的使用情况决定。'
                  },
                ]
              },
              {
                type: '代金券问题',
                children: [
                  {
                    question: '什么是代金券？',
                    answer: ' 代金券是可抵扣费用的优惠券，用户可在订单管理>代金券管理页面查看'
                  },
                  {
                    question: '如何使用代金券？',
                    answer: '代金券可以在订单支付时使用，一笔订单尽可使用一张代金券。每张代金券仅限使用一次，使用后不可再次使用。请在有效期内使用。'
                  },
                  {
                    question: '如何获得代金券？',
                    answer: '您可通过参加保全网活动等方式获取'
                  },
                  {
                    question: '纸质代金券与电子代金券的区别？',
                    answer: '电子代金券：开发者获得电子代金券后，会在费用中心的代金券页面查看到已发放的电子代金券，状态为“待使用”。纸质代金券：开发者获得纸质代金券后，须进行代金券兑换，兑换后将在费用中心的代金券页面看到已发放的电子代金券，状态为“待使用。'
                  },
                  {
                    question: '代金券的使用状态？',
                    answer: '代金券的状态分为待使用、已冻结、已使用、已过期。待使用：未使用且未过期的代金券。已冻结：显示已确认订单但未支付的代金券。已使用：已使用的代金券。已过期：已过有效期的代金券。'
                  },
                ]
              },
              {
                type: '发票问题',
                children: [
                  {
                    question: '发票信息不小心填错了，想退掉重开可以么？',
                    answer: ' 如果是由于您的开票信息或者邮寄信息填写错误导致发票开具、邮寄出现错误，则不能重新开具发票，请您申请开具发票时仔细确认。'
                  },
                  {
                    question: '我的可开票金额是如何计算的？',
                    answer: '您的可开票金额根据您实际支付的订单金额计算所得'
                  },
                ]
              },
            ]
          },
        },
        {
          name: '账户支持',
          data: {
            faqs: [
              {
                type: '支持渠道',
                children: [
                  {
                    question: '客服电话',
                    answer: ' 0571-28221076'
                  },
                  {
                    question: '商务合作邮箱',
                    answer: 'hz@baoquan.com'
                  },
                  {
                    question: '微信公众号',
                    answer: '区块链数据保全（baoquan-wang）'
                  },
                  {
                    question: '公司地址',
                    answer: '杭州：杭州市学院路77号黄龙国际中心G座907；北京：北京市东城区安定门东滨河路甲一号大象投资大厦208'
                  },
                ]
              },
            ]
          },
        },
      ]
    },
  ];

  dataEn = [
    {
      name: 'Trustworthy Electronic Certificate',
      subContent: [
        {
          name: 'Originality Attestation',
          data: {
            brief: {
              name: 'Product Introduction',
              content: 'Baoquan is devoting to protect the intellectual property of original works and the legal rights of original authors. By accessing to the national time authority centre, the works would be solidified when uploaded for the time proof.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {
                  name: 'Timestamp',
                  description: 'Access to national time authority centre and Apple NTP service, guarantee the high-precision of time service. ',
                },
                {
                  name: 'Work Attestation',
                  description: 'Combined with blockchain technology, the scatter and distributed storage for works to ensure the security and privacy.',
                },
                {
                  name: 'Legal Aid',
                  description: 'Together with Dentons, to provide the professional legal aid service.',
                },
                {
                  name: 'Judicial Issuance',
                  description: 'Cooperate with forensic, online issuing for the judicial expertise certificate.',
                },
              ],
            },
            prices: {
              name: 'Price Detail',
              description: '',
              children: [
                {
                  subtitle: 'Price list',
                  description: '',
                  tableHead: ['Size', 'Price(Yuan per year)'],
                  prices: [
                    {amount: '100M', price: '¥30.00'},
                    {amount: '300M', price: '¥88.00'},
                    {amount: '1G', price: '¥268.00'},
                  ],
                  tips: 'For the single file size of paid members, upgrade to 20M, for the greater size, please contract us.',
                }
              ]
            },
            faqs: [
              {
                question: 'Why shall we make attestation for electronic data?',
                answer: 'Precaution in advance: Recordkeeping the original works in time, then to protect the copyright before the copyright infringement appears. Protect copyright: When the copyright infringement happened, apply for the legal aid in time through Baoquan.com, then to obtain legal support.'
              },
              {
                question: 'How to protect the legitimation of the original works?',
                answer: 'Blockchain has three key technical features: Immutable, trackable, verifiable. With the approach of blockchain + forensic + notary + arbitration, providing the trustworthy electronic certificate for the e-data.'
              },
              {
                question: 'How to apply for the judicial issuance when the copyright infringement appeared?',
                answer: 'When the copyright infringement appears, you can apply for the certificate issuance, at the same time, you also can obtain the web-evidence service.'
              },
            ]
          },
        },
        {
          name: 'Web Evidence',
          data: {
            brief: {
              name: 'Product Introduction',
              content: 'Web evidence is a product of Baoquan.com for web e-data attestation. Through the web-solidify in real time, the content would be recorded with notary endorsement, which has the notary effect for the electronic evidence.',
            },
            advantages: {
              name: 'Product Superiority',
              children: ' For the different scenes, the web evidence can help you to solidify the evidence for the protection use of defamation, privacy and copyright infringement. And the online issuance service saves the process time, further to improve the judicial efficiency.',
            },
            prices: {
              name: 'Price Detail',
              description: '',
              children: [
                {
                  subtitle: 'Price list',
                  description: '',
                  tableHead: ['Times', 'Price(Yuan per time)'],
                  prices: [
                    {amount: 'Within 5', price: 'Free'},
                    {amount: 'Over 5', price: '¥2.00'},
                  ],
                  tips: 'If the times of web-evidence would be over 1000, please contact us for more detail.',
                }
              ]
            },
            faqs: [
              {
                question: 'Does the web evidence have the force of law?',
                answer: 'According to 《Electronic Signatures Law》, web evidence would apply the timestamp technology based on the national time authority centre. The whole process is strict to form an full evidence chain, issuing the detail evidence paper. In China, the trial cases with timestamp can be searched on http://wenshu.court.gov.cn/.'
              },
              {
                question: 'How long does it take to complete the web evidence?',
                answer: 'High speed and efficiency. Just need to enter the web address, then it will finish in several seconds.'
              },
              {
                question: 'What is the difference for the web evidence and traditional screenshot?',
                answer: 'For the traditional screenshot, the accuracy of content can not be ensured. Due to the lacking of time proof, have no force of law. By combining with the Internet encryption technology, as well as the Internet recordkeeping, to guarantee the judicial effect.'
              },
            ]
          },
        },
        {
          name: 'Enterprise Recordkeeping',
          data: {
            brief: {
              name: 'Product Introduction',
              content: 'Through the blockchain technology, Baoquan.com using the characteristics of  immutability and traceability, meanwhile solidifying the content and time of e-data in real time, then to ensure the reality and fairness, which has the force of law.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {
                  name: 'Big Data',
                  description: 'Blockchain + Big data encryption technology to ensure the data security',
                },
                {
                  name: 'Blockchain',
                  description: 'Combined with Blockchain, the recordkeeping evidence would be on chain in time, then to form a full evidence chain',
                },
                {
                  name: 'Law Aid',
                  description: 'Together with Dentons, to provide the professional legal aid service.',
                },
                {
                  name: 'Judicial Issuance',
                  description: 'Cooperate with forensic, online application for the judicial expertise certificate. ',
                },
              ],
            },
            prices: {
              name: 'Free Recordkeeping',
              description: 'Baoquan.com provides the free recordkeeping service for the e-data, combines Blockchain with Big data, together with law office and forensic agency, then to ensure the judicial effect.',
              children: [
                {
                  subtitle: 'List',
                  description: '',
                  tableHead: ['Module', 'Detail', 'Introduction'],
                  prices: [
                    {
                      amount: 'HASH Recordkeeping',
                      price: 'Permanent Free',
                      description: 'The hash fingerprint would be anchored to public chain by Baoquan.com, the issued certificate has the judicial effect'
                    },
                    {
                      amount: 'Template Management',
                      price: 'No limit for amount',
                      description: 'Manage the template, modify the data item'
                    },
                    {
                      amount: 'Member Management',
                      price: 'No limit for amount',
                      description: 'Add members, authorized attempts for the function'
                    },
                    {
                      amount: 'Attestation items',
                      price: 'No limit for items',
                      description: 'Item detail for the attestation enterprise'
                    },
                    {
                      amount: 'Technical Support',
                      price: 'Free service for pre-sale&post-sale',
                      description: 'Technique transfer, contract signing'
                    },
                    {
                      amount: 'Template Self-define',
                      price: 'Support for self-define',
                      description: 'Modify the template content to meet the enterprise demand'
                    },
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: 'User Guide',
              description: 'Brief introduction for the enterprise recordkeeping',
              subtitle: 'User Flows',
              img: require('../../../../images/website-show/help-document/pic-help-certificate-process-en.jpg'),
            },
            faqs: [
              {
                question: 'What is electronic data attestation?',
                answer: 'Electronic data attestation is a process and method to avoid falsification and assure the originality and objectiveness of information which is in form of electronic data(including text, diagram, alphabet, number, combination of colors, sound and any combination of them). This process and method achieve the goal by applying specific algorithm and encryption to record the exact standard time of attesting, calculated value and file reference etc.'
              },
              {
                question: 'Why shall we make attestation for electronic data?',
                answer: 'Article 11: When applying for archival registration, the Internet lending information intermediary should submit the copy of the commission contract which signed with the third party of data recordkeeping. ——《Shenzhen Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft) 》 Article 10, Chapter 2: The newly established Internet lending information intermediary should submit the commission contract which signed with the third party of data recordkeeping when apply for the archival registration. ——《Shanghai Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft) 》 Article 5, Chapter 2: When applying for archival registration, the newly established Internet lending information intermediary should submit the copy of the commission contract which signed with the third party of data recordkeeping to the Finance Office. ——《Xiamen Archival Registration Measures for the administration of Internet lending information intermediary (Exposure Draft) 》'
              },
              {
                question: 'The legitimation of electronic data attestation.',
                answer: 'It is the common agreement of international law systems to acknowledge the electronic data as digital evidence. In the UK Association of Chief Police Officers Guidelines for cyber security, an independent third party verifiable data is included as the principle of integrity of evidence. Therefore, throw the blockchain data attestation process, the digital evidence would has a more comprehensive foundation. Additionally, if you would like to use your data in China as a digital evidence, the BAOQUAN.COM will provide the notarization and forensic authentication from our partnered authorities.'
              },
            ]
          },
        },
        {
          name: 'Attestation Access Guide',
          isAccessGuide: true,
          item: [
            {
              title: "1: 注册",
              description: "",
              img: require('../../../../images/website-show/help-document/access-guide-one.png'),
            },
            {
              title: "2: 创建企业",
              description: "在账户信息下点击“创建组织”",
              img: require('../../../../images/website-show/help-document/access-guide-two.png'),
            },
            {
              title: "3: 企业认证",
              description: "创建完成企业后，申请认证，申请认证完成后，需要进行等待人工审核（一到两个工作日左右）",
              img: require('../../../../images/website-show/help-document/access-guide-three.png'),
            },
            {
              title: "4: 私钥签名",
              description: "在“电子数据保全”-“保全管理”创建私钥。具体步骤参见API文档：",
              link: "https://baoquan.readthedocs.io/zh/latest/signature.html",
              img: require('../../../../images/website-show/help-document/access-guide-four.png'),
            },
            {
              title: "5: 添加产品",
              description: "在“电子数据保全”-“我的产品”添加产品",
              img: require('../../../../images/website-show/help-document/access-guide-five.png'),
            },
            {
              title: "6: 创建模版",
              description: "可以根据需要创建不同的模板类型，创建完成后，模板需要审核",
              img: require('../../../../images/website-show/help-document/access-guide-six.png'),
            },
            {
              title: "7: API调用",
              description: "API文档详见：",
              link: "https://baoquan.readthedocs.io/zh/latest/api.html",
              img: "",
            },
            {
              title: "8: 其他问题",
              description: "如有其它问题，请咨询技术人员。",
              img: "",
            },
          ]
        },
      ]
    },
    {
      name: 'Baoquan Sig',
      subContent: [
        {
          name: 'Web sig',
          data: {
            brief: {
              name: 'Product introduction',
              content: 'Web sig is a method for the online sign through Baoquan.com. All the signing process would be recorded on Baoquan.com, which is suitable for personal or the enterprise that has few demand of electronic signature.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {name: 'Data Privacy', description: 'HASH encryption for the signed file, to guarantee data privacy',},
                {name: 'Judicial Effect', description: 'Access to CA centre,  to ensure the judicial effect',},
                {name: 'Traceable Record', description: 'Trackable from the end to the source',},
                {
                  name: 'Judicial Issuance',
                  description: 'Cooperate with forensic, online application for the judicial expertise certificate.',
                },
              ],
            },
            prices: {
              name: 'Price Detail',
              description: '',
              children: [
                {
                  subtitle: '个人签署价格列表',
                  description: 'Personal Sig: Just for personal to personal, if enterprise included, taking as Enterprise Sig.',
                  tableHead: ['Times', 'Price(Yuan per time)', 'Duration', 'Excess Part'],
                  prices: [
                    {amount: 'Within 5 ', price: 'Free', time: 'Lifelong', excessPrice: '5 Yuan per time'},
                    {amount: '25', price: '¥125.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '50', price: '¥200.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '100', price: '¥350.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '1000', price: '¥3000.00', time: '1 year', excessPrice: '3 Yuan per time'},
                    {amount: '5000', price: '¥10000.00', time: '1 year', excessPrice: '2 Yuan per time'},
                    {amount: '20000', price: '¥20000.00', time: '1 year', excessPrice: '1 Yuan per time'},
                  ],
                  tips: '',
                },
                {
                  subtitle: '企业签署价格列表',
                  description: 'Enterprise Sig: Just for enterprise to enterprise, if enterprise included, taking as Enterprise Sig.',
                  tableHead: ['Times', 'Price(Yuan per time)', 'Duration', 'Excess Part'],
                  prices: [
                    {amount: 'Within 5', price: 'Free', time: 'Lifelong', excessPrice: '5 Yuan per time'},
                    {amount: '25', price: '¥125.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '50', price: '¥200.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '100', price: '¥350.00', time: '1 year', excessPrice: '5 Yuan per time'},
                    {amount: '1000', price: '¥3000.00', time: '1 year', excessPrice: '3 Yuan per time'},
                    {amount: '5000', price: '¥10000.00', time: '1 year', excessPrice: '2 Yuan per time'},
                    {amount: '20000', price: '¥20000.00', time: '1 year', excessPrice: '1 Yuan per time'},
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: 'User Guide',
              description: '',
              subtitle: 'User Flow',
              img: require('../../../../images/website-show/help-document/pic-help-baoquan-visa-process-1-en.jpg'),
            },
            faqs: [
              {
                question: 'The legitimation of electronic contract？',
                answer: 'The electronic contract is a contract form approved by 《Contract Law》, which is based on data message as well as a series of technical standard involved, and the key for this is the electronic signature technology. Electronic signature is a series of data or code, then to verify the real identity of the signatory  by the digital certificate technology. According to the national laws, only by owning the electronic signature can have the legitamation of electronic contract. Therefore, to guarantee the reliability of  electronic signature, users should sign the contract on the third party platform with powerful technical support, by using the digital signature technology to ensure the reliability of e-signature and the safety of contract signing. '
              },
              {
                question: 'What is the digital certificate? And what is the digital certificate authority (CA) for?',
                answer: 'The digital certificate is a information security technology for widely applied. In brief, it also represents the identity certificate for personal or enterprise on the Internet. Based on cryptography, the digital certificate establish trust mechanism on the Internet by using these technologies like digital signature, digital envelope and timestamp. And mainly including the information about owner’s detail, public key and the signature of certificate authority. For the Certificate Authority(CA), it is an entity that issues digital certificates. A digital certificate certifies the ownership of a public key by the named subject of the certificate. This allows others (relying parties) to rely upon signatures or on assertions made about the private key that corresponds to the certified public key. A CA acts as a trusted third party—trusted both by the subject (owner) of the certificate and by the party relying upon the certificate.'
              },
              {
                question: 'The necessity of identity authentication when signing the contract.',
                answer: 'All the participants should submit the personal information online for the identity authentication to guarantee the law effect of  the signed contract. Our system will check your information in time, this is the first step to ensure the validity of the e-contract by verifying the the signatory’s identity.'
              },
              {
                question: 'What is the applicable scope for electronic contract?',
                answer: 'According to  《Electronic Signatures Law》, the electronic signature is not suitable for the following files, as well as the electronic contract: 1.Relating to marriage, adoption, inheritance, etc. 2.Relating to the transfer of property interest, such as land transfer, housing transfer… 3.Relating to the public service, such as stopping water supply, heat supply, electronic supply … 4.According to the law or administration regulation, these electronic files does not apply to.'
              },
              {
                question: 'Why use PDF for the signature?',
                answer: 'PDF is not only for ISO 3200 standard, but also for the national recommendation standard GB/T23286.1-2009.  PDF has the self signature specification PADES, the inside electronic signature can be verified by the third party browser like Adobe Reader or Foxit browser.'
              },
            ]
          },
        },
        {
          name: 'Enterprise API Sig',
          data: {
            brief: {
              name: 'Product Introduction ',
              content: 'API Sig is a method for enterprise accessing to Baoquan API, then connecting the electronic contract signing with the current business but not influence the process and function. We provide the electronic contract signing service, which has the authority and significance, then the contract would be storaged on the platform to ensure the fairness and legality during the whole process.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {name: 'Data Privacy', description: 'HASH encryption for the signed file, to guarantee data privacy',},
                {name: 'Judicial Effect', description: 'Access to CA centre,  to ensure the judicial effect',},
                {name: 'Traceable Record', description: 'Trackable from the end to the source',},
                {
                  name: 'Judicial Issuance',
                  description: 'Cooperate with forensic, online application for the judicial expertise certificate',
                },
              ],
            },
            prices: {
              name: 'Price Detail',
              description: '',
              children: [
                {
                  subtitle: '价格列表',
                  description: '',
                  tableHead: ['Times', 'Price(Yuan per time)', 'Duration', 'Excess Part'],
                  prices: [
                    {amount: 'Within 5', price: 'Free', time: 'Lifelong', excessPrice: '18 Yuan per time'},
                    {amount: '100', price: '¥1 800.00', time: '1 year', excessPrice: '18 Yuan per time'},
                    {amount: '1000', price: '¥13 000.00', time: '1 year', excessPrice: '13 Yuan per time'},
                    {amount: '5000', price: '¥50 000.00', time: '1 year', excessPrice: '10 Yuan per time'},
                    {amount: '20000', price: '¥100 000.00', time: '1 year', excessPrice: '5 Yuan per time'},
                  ],
                  tips: '',
                }
              ]
            },
            userGuide: {
              name: 'User Guide',
              description: '',
              subtitle: 'User Flow',
              img: require('../../../../images/website-show/help-document/pic-help-baoquan-visa-process-2-en.jpg'),
            },
            faqs: [
              {
                question: 'How to apply for the permissions of SDK and API?',
                answer: 'When the enterprise finish the authentication, you can apply for Baoquan Sig API access online. We will provide the user label of API call when the review completed.'
              },
              {
                question: 'What is the applicable scope for electronic contract?',
                answer: 'According to  《Electronic Signatures Law》, the electronic signature is not suitable for the following files, as well as the electronic contract: 1.Relating to marriage, adoption, inheritance, etc. 2.Relating to the transfer of property interest, such as land transfer, housing transfer… 3.Relating to the public service, such as stopping water supply, heat supply, electronic supply … 4.According to the law or administration regulation, these electronic files does not apply to.'
              },
              {
                question: 'Why use PDF for the signature?',
                answer: 'PDF is not only for ISO 3200 standard, but also for the national recommendation standard GB/T23286.1-2009.  PDF has the self signature specification PADES, the inside electronic signature can be verified by the third party browser like Adobe Reader or Foxit browser.'
              },
              {
                question: 'Is the contract content visible for Baoquan.com?',
                answer: 'Absolutely not! Baoquan Sig  applies the multiple encryption on contract data, it worked  when the contract enters into Baoquan sig system by digital envelope. And it only visible for the contract owner and participants. The people who outside the process have no permission to view the detail.'
              },
            ]
          },
        },
      ]
    },
    {
      name: 'Blockchain Privatized Deployment',
      subContent: [
        {
          name: 'Blockchain Privatized Deployment',
          data: {
            brief: {
              name: 'Product Introduction',
              content: 'Blockchain has three key technical features: Immutability + Traceability + Transparency, which can enhance new energy for the development of enterprise. According to the industry characteristics, Baoquan.com provides the customized service help enterprise early moves into the Blockchain era.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {
                  name: 'Technical Superiority',
                  description: 'Rich experience in Blockchain industry, together with professional team',
                },
                {
                  name: 'Service Superiority',
                  description: 'One to one technical service, for quick and convenient deployment',
                },
                {
                  name: 'Industry Superiority',
                  description: 'Years of financial service experience, technical approval from different institutions',
                },
              ],
            },
            prices: {
              name: 'Price Detail',
              description: '',
              children: [],
            },
            faqs: [
              {
                question: 'What is blockchain?',
                answer: 'Blockchain is the underlying technology used by Bitcoin. It could be described as a distributed ledger or database, which can keep every transaction data in record permanently. This technology has gain concerns by bank and financial industry because of its safety and convenience. It is a series of data blocks linked by crypto-algorithm, once a piece of information is verified and become a part of the blockchain, it will then store permanently and unchangeable.'
              },
              {
                question: 'What is the benefit for Blockchain privatized deployment?',
                answer: 'It can improve the speed of trading, further to protect the user privacy, and reduce the trading costs.'
              },
              {
                question: 'What industry is Blockchain privatized deployment suitable for?',
                answer: 'Smart contract, stock exchange, e-commerce, Internet of things, social communication, file storage, existence proof, identity verify, equity crowdfunding.'
              },
            ]
          },
        }
      ]
    },
    {
      name: 'Judicial Expertise Channel',
      subContent: [
        {
          name: 'Judicial Expertise Channel',
          data: {
            brief: {
              name: 'Product Introduction',
              content: 'Together with judicial expertise centre, Baoquan.com provides one-stop online issuance service with notarization and judicial expertise for data certificate based on Blockchain.',
            },
            advantages: {
              name: 'Product Superiority',
              children: [
                {
                  name: 'Professional judicial expertise certificate',
                  description: 'Together with judicial expertise centre, issuing the professional judicial expertise certificate',
                },
                {
                  name: 'Easy-entry for issuance',
                  description: 'Online issuance, the judicial expertise certificate for nationwide use.',
                },
              ],
            },
            prices: {
              name: 'Price detail',
              description: '',
              children: [],
            },
          },
        }
      ]
    },
    {
      name: 'Others',
      subContent: [
        {
          name: 'Sign up & Sign in',
          data: {
            faqs: [
              {
                type: 'For Sign up',
                children: [
                  {
                    question: 'How to create an account on Baoquan.com?',
                    answer: 'Only support for mobile registration.'
                  },
                  {
                    question: 'When registering, failed to receive the phone code.',
                    answer: '1. When accessing to the gateway, the abnormal network communication may cause message lost or delay, please wait a moment. 2. Poor signal. Suggest you try to power off for 30 minutes, or change a mobile phone and try again. 3. Please check your phone, whether close the SMS function or install some apps for SMS spam manager. You should change a mobile phone and try again. 4. Your mobile phone is out of service. You should top up first and try again.'
                  },
                  {
                    question: 'The account has been registered.',
                    answer: 'If the account has been created, you should change the phone number and try again, or contact us to solve with identity verification.'
                  },
                ]
              },
              {
                type: 'For Sign in',
                children: [
                  {
                    question: 'What should I do for the password error?',
                    answer: 'You should check and change your  phone number or password, then try again later.'
                  },
                  {
                    question: 'When forgot password, failed to receive the phone code.',
                    answer: '1. When accessing to the gateway, the abnormal network communication may cause message lost or delay, please wait a moment. 2. Poor signal. Suggest you try to power off for 30 minutes, or change a mobile phone and try again. 3. Please check your phone, whether close the SMS function or install some apps for SMS spam manager. You should change a mobile phone and try again. 4. Your mobile phone is out of service. You should top up first and try again.'
                  },
                  {
                    question: 'The phone number has not been registered.',
                    answer: 'If your current phone number has not been registered, you should sign up first, and then sign in.'
                  },
                ]
              },
              {
                type: 'For Authentication',
                children: [
                  {
                    question: 'What should I do for the personal identity authentication?',
                    answer: 'If you choose the personal identity authentication, please enter the ID Card No, name, phone number, then submit, our system will check your information in time.'
                  },
                  {
                    question: 'What should I do for the enterprise authentication?',
                    answer: 'Enterprise should choose real name authentication, you should create enterprise first, and then finish the detail on the website. After submit the related materials, please wait for the reply, and we will finish the review within 2 weekdays.'
                  },
                  {
                    question: 'What is the difference for the personal identity authentication and enterprise authentication?',
                    answer: 'Enterprise authentication would enjoy more authorities compared with personal identity authentication, as well as apply for the access authority of service API.'
                  },
                  {
                    question: 'How to change the authentication information?',
                    answer: 'It can not support for the self-modify now, if you wanna change , please contact us.'
                  },
                ]
              },
            ]
          },
        },
        {
          name: 'Finance Related',
          data: {
            faqs: [
              {
                type: 'For Top up',
                children: [
                  {
                    question: 'Which way can I choose to top up?',
                    answer: 'Support for Ali Pay only.  The more top up way are under developing, if you need other way to top up, please contact us.'
                  },
                  {
                    question: 'What should I do for top up via Ali Pay?',
                    answer: 'If you choose Ali Pay for the online top up, our system will redirect to the payment page shortly, then to confirm the order. If you don’t have Ali Pay account, you can create an account on the right page, and then choose the e-currency payment.'
                  },
                  {
                    question: 'Can I apply for a refund after top up?',
                    answer: 'Sorry, we can not support for self-refund, if you have such request, please contact us and provide the related material.'
                  },
                  {
                    question: 'What should I do for the overdue package?',
                    answer: 'If your purchased package have not yet in use but expired, the remaining part cannot be used, if you wanna keep on, please re-purchase.'
                  },
                  {
                    question: 'Can I apply for a refund of the package if I don’t want to use any more after purchased?',
                    answer: 'If your purchased package still have spare volume  in valid, you can contact us to apply for a refund, the detail returned amount is according to your use condition.'
                  },
                ]
              },
              {
                type: 'For Vouchers',
                children: [
                  {
                    question: 'What is the cash coupon?',
                    answer: ' The cash coupon can be used as a cash deduction, you can find it in “Order Management > Cash-coupon Management ”.'
                  },
                  {
                    question: 'How to use the cash coupon?',
                    answer: 'You can use this when paying the order, only one coupon can be allowed in each order. And each coupon can be used only once. You must notice the expiry date.'
                  },
                  {
                    question: 'How to obtain the cash coupon?',
                    answer: 'You can participate in Baoquan activities to gain coupons.'
                  },
                  {
                    question: 'What is the difference between paper coupon and electronic coupon?',
                    answer: 'Electronic coupon: When you got the coupon, you can find it in the coupon page of fees centre, the status would be showed as “Pending ”. Paper coupon: When you got the coupon, you should exchange first, then you can find it in the coupon page of fees centre, the status would be showed as “Pending”.'
                  },
                  {
                    question: 'What are the status of  cash coupon?',
                    answer: 'The status are including Pending, Frozen, Used, Expired. Pending: the unused coupon which still in valid. Frozen: the confirmed order but unpaid coupon. Used: the coupon which have been used. Expired: the coupon which is out of date.'
                  },
                ]
              },
              {
                type: 'For Invoice',
                children: [
                  {
                    question: 'Can I apply for re-issue invoice due to the wrong information?',
                    answer: ' If it caused by your operation for the wrong issuing information and mailing information, the coupon is not refundable. Please check the information carefully.'
                  },
                  {
                    question: 'How to account for the invoice amount?',
                    answer: 'The total amount shall be accounted for according to the actual amount paid of the order amount.'
                  },
                ]
              },
            ]
          },
        },
        {
          name: 'Account Support',
          data: {
            faqs: [
              {
                type: 'Support Channel',
                children: [
                  {
                    question: 'Service Tel',
                    answer: ' 0571-28221076'
                  },
                  {
                    question: 'Business Email',
                    answer: 'hz@baoquan.com'
                  },
                  {
                    question: 'Wechat',
                    answer: '区块链数据保全（baoquan-wang）'
                  },
                  {
                    question: 'Company Add',
                    answer: 'Hangzhou: Room 907,Block G, Huanglong International Centre, Xueyuan Road, Xihu District, Hangzhou City, Zhejiang Prov, China. Beijing：Room 208,  Daxiang Investment Mansion, Andingmen East Binhe Road, Dongcheng District, Beijing City, China'
                  },
                ]
              },
            ]
          },
        },
      ]
    },
  ];

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
    if (typeof window !== 'undefined') document.title = lang === 'zh' ? '保全网-帮助文档' : 'BAOQUAN.COM - Help Document';
  };

  toggleFold = (i) => {
    return () => {
      let isFold = this.state.isFold;
      isFold[i] = !isFold[i];
      this.setState({
        isFold,
      });
    }
  };

  change = (i, j) => {
    return () => {
      this.setState({
        firstSelected: i,
        secondSelected: j,
      });
      browserHistory.replace({
        pathname: this.pathname,
        query: {firstSelected: i, secondSelected: j, lang: LanguageUtil.lang}
      });
    }
  };

  toArray = (obj) => {
    let arr = [];
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) arr.push(obj[i]);
    }
    return arr;
  };

  render() {
    let firstIndex = this.state.firstSelected,
      secondIndex = this.state.secondSelected,
      selectedItem = this.data[firstIndex].subContent[secondIndex].data;
    let selectedGuide = this.data[firstIndex].subContent[secondIndex].item;

    return <div className="web-show-container bg-white">
      <Header haveScrollEvent={false}/>
      <FloatBar/>
      <section className="help-search">
        <div className="help-search-container">
          <h1>{T.translate('help.title')}</h1>
          {/*<div className="search-wrap">
           <input type="text" placeholder={T.translate('help.holder')}/>
           <button type="submit">{T.translate('help.search')}</button>
           </div>*/}
        </div>
      </section>
      <div className="help-content">
        <aside className="help-menu">
          <h1>{T.translate('help.head')}</h1>
          <ul>
            {this.data.map(
              (item, i) => <li key={i} className="menu">
                <a href="javascript:void 0" onClick={firstIndex !== i ? this.toggleFold(i) : ''}>
                  {item.name}
                  <span className={this.state.isFold[i] ? "iconfont font-down" : "iconfont font-down rotate"}/>
                </a>
                <ul style={this.state.isFold[i] ? {} : {display: 'none'}}>
                  {item.subContent.map(
                    (item, j) => <li key={j}
                                     className={firstIndex === i && secondIndex === j ? "submenu selected" : 'submenu'}
                                     onClick={this.change(i, j)}>{item.name}</li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </aside>
        {
          this.data[firstIndex].subContent[secondIndex].isAccessGuide === true ?
            <article className="help-text">
              <header>
                {T.translate('help.title')}
                <span className="arrow">></span>
                {this.data[firstIndex].name}
                <span className="arrow">></span>
                <span className="dark">{this.data[firstIndex].subContent[secondIndex].name}</span>
              </header>
              {selectedGuide.map(
                (item, i) => <section key={i} className="access-guide">
                  <p className="title">{item.title}</p>
                  {
                    item.description ?
                      <p className="description">{item.description}
                        {
                          item.link ?
                            <a href={item.link} target="_blank">
                              <span className="link">{item.link}</span>
                            </a> : ""
                        }
                      </p> : ""
                  }
                  {
                    item.img ?
                      <img src={item.img} alt=""/> : ""
                  }
                </section>
              )}
            </article>
             :
            <article className="help-text">
              <header>
                {T.translate('help.title')}
                <span className="arrow">></span>
                {this.data[firstIndex].name}
                <span className="arrow">></span>
                <span className="dark">{this.data[firstIndex].subContent[secondIndex].name}</span>
              </header>
              {selectedItem.brief && selectedItem.brief.content ?
                <section className="brief">
                  <h1>{selectedItem.brief.name}</h1>
                  <p>{selectedItem.brief.content}</p>
                </section> : ''}
              {selectedItem.advantages && selectedItem.advantages.children ?
                <section className="help-item-advantages">
                  <h1>{selectedItem.advantages.name}</h1>
                  {selectedItem.advantages.children instanceof Array ? selectedItem.advantages.children.map(
                    (item, i) => <div key={i} className="advantage">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                  ) : <p>{selectedItem.advantages.children}</p>}
                </section> : ''}
              {selectedItem.prices ?
                <section className="help-item-prices">
                  <h1>{selectedItem.prices.name}</h1>
                  {!selectedItem.prices.description && selectedItem.prices.children.length <= 0 ? <p>
                    {T.translate('help.more')}<a href="http://wpa.qq.com/msgrd?v=3&uin=1434851251&site=qq&menu=yes"
                                                 target="_blank">{T.translate('help.service')}</a>
                  </p> : <p>{selectedItem.prices.description}</p>}
                  {selectedItem.prices.children.map(
                    (item, i) => <div key={i} className="prices-table">
                      {item.name ? <h3>{item.name}</h3> : ''}
                      {item.signTip ?
                        item.signTip.map(
                          (item, i) => <p className="sign-price-tip" key={i}>{item}</p>
                        )
                        :
                        ''}
                      {item.description ? <p>{item.description}</p> : ''}
                      <table>
                        <thead>
                        <tr>
                          {item.tableHead.map(
                            (item, i) => <th key={i}>{item}</th>
                          )}
                        </tr>
                        </thead>
                        <tbody>
                        {item.prices.map(
                          (item, i) => <tr key={i}>
                            {this.toArray(item).map(
                              (item, i) => <td key={i}>{item}</td>
                            )}
                          </tr>
                        )}
                        </tbody>
                      </table>
                      {item.tips ? <p className="tips">{item.tips}</p> : ''}
                    </div>
                  )}
                </section> : ''}
              {selectedItem.userGuide && selectedItem.userGuide.img ?
                <section className="user-guide">
                  <h1>{selectedItem.userGuide.name}</h1>
                  {selectedItem.userGuide.description ? <p>{selectedItem.userGuide.description}</p> : ''}
                  {selectedItem.userGuide.subtitle ? <h4>{selectedItem.userGuide.subtitle}</h4> : ''}
                  <div className="map">
                    <img src={selectedItem.userGuide.img} alt=""/>
                  </div>
                </section> : ''}
              {selectedItem.faqs && selectedItem.faqs.length > 0 ?
                <section className="help-faqs">
                  <h1>{T.translate('help.q')}</h1>
                  {selectedItem.faqs.map(
                    (item, i) => (item.children && item.children.length > 0 ?
                      <div key={i} className="faqs-type">
                        <h2>{item.type}</h2>
                        {item.children.map(
                          (item, i) => <article key={i} className="QA">
                            <h3>{i + 1 + '. ' + item.question}</h3>
                            <p>{item.answer}</p>
                          </article>
                        )}
                      </div> : <article key={i} className="QA">
                      <h3>{i + 1 + '. ' + item.question}</h3>
                      <p>{item.answer}</p>
                    </article>)
                  )}
                </section> : ''}
            </article>
        }

      </div>
      <Footer noMargin={true}/>
    </div>
  }
}