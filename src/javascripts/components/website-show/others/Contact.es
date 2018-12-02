import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Map from "react-amap/lib/map";
import Marker from "react-amap/lib/marker";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";
import T from "i18n-react";

@connect(state => ({
  location: state.router.location
}))
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0};
  }

  data = {};

  dataZh = {
    name: '联系我们',
    otherNav: [
      {name: '公司简介', route: '/other/about-us', selected: false},
      {name: '媒体报道', route: '/other/media-reports', selected: false},
      {name: '保全资讯', route: '/other/industry-news', selected: false},
      {name: '区块链文档', route: '/other/block-documents', selected: false},
      {name: '联系我们', route: '/other/contact', selected: true},
    ],
    addressTitle: '公司地址',
    address: [
      {
        name: '杭州总部',
        address: {
          content: '浙江省杭州市学院路77号黄龙国际中心G座-907',
          position: {longitude: 120.12611, latitude: 30.275155},
          zoom: 15
        },
        phone: '0571-28221076'
      },
      {
        name: '北京分公司',
        address: {
          content: '北京市东城区安定门东滨河路甲一号大象投资大厦208',
          position: {longitude: 116.424049, latitude: 39.950718},
          zoom: 18
        },
        phone: '0571-28221076'
      },
    ],
    customerPhone: {
      title: '客服电话',
      phone: '0571-28221076',
      text: [
        '如果您在使用baoquan.com平台的过程中有任何疑问请您与客服人员联系。',
        '客服电话：',
        '工作时间：9:00 - 21:00'
      ]
    },
    media: {
      title: '媒体采访',
      email: 'WL@baoquan.com',
      text: [
        '如果有媒体采访需求，请将您的媒体名称、采访提纲、联系方式发至：',
        '，我们会尽快与您联系。',
      ]
    },
    cooperator: {
      title: '商务合作',
      email: 'hz@baoquan.com',
      text: [
        '如果贵公司希望与我们建立商务合作关系，形成优势互补，请将合作意向进行简要描述并发送邮件至：',
        '，我们会尽快与您联系。',
      ]
    }
  };

  dataEn = {
    name: 'Contact us',
    otherNav: [
      {name: 'Introduction', route: '/other/about-us', selected: false},
      {name: 'Media', route: '/other/media-reports', selected: false},
      {name: 'News', route: '/other/industry-news', selected: false},
      {name: 'Blockchain Doc', route: '/other/block-documents', selected: false},
      {name: 'Contact us', route: '/other/contact', selected: true},
    ],
    addressTitle: 'Company Address',
    address: [
      {
        name: 'Hangzhou Headquarter',
        address: {
          content: 'Room 907,Block G, Huanglong International Centre, Xueyuan Road, Xihu District, Hangzhou City, Zhejiang Prov, China',
          position: {longitude: 120.12611, latitude: 30.275155},
          zoom: 15
        },
        phone: '0571-28221076'
      },
      {
        name: 'Beijing',
        address: {
          content: 'Room 208, Daxiang Investment Mansion, Andingmen East Binhe Road, Dongcheng District, Beijing City, China',
          position: {longitude: 116.424049, latitude: 39.950718},
          zoom: 18
        },
        phone: '0571-28221076'
      },
    ],
    customerPhone: {
      title: 'Customer Service',
      phone: '0571-28221076',
      text: [
        'If you have any question during the operation, please contact us.',
        'Tel：',
        'work time：9:00 - 21:00'
      ]
    },
    media: {
      title: 'Media Interview',
      email: 'WL@baoquan.com',
      text: [
        'If you have any request for media interview, please send email to us：',
        ', The information should including media name, interview outline, contact method, we will reply as soon as possible.',
      ]
    },
    cooperator: {
      title: 'Business',
      email: 'hz@baoquan.com',
      text: [
        'f you want to cooperate with us, please send email to us：',
        ', and give a brief description in the email, we will reply as soon as possible.',
      ]
    }
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

  changeIndex = (index) => {
    return () => {
      this.setState({index: index});
    }
  };

  render() {
    let {user} = this.props;

    return <div className="web-show-container">
      <Header haveScrollEvent={false} otherNav={this.data.otherNav}/>
      <FloatBar/>
      <div className="contact-us website-article-card">
        <article className="address">
          <h1 className="head">{this.data.addressTitle}</h1>
          <div className="map">
            <Map amapkey='2ded502ebeeb305657c8985398a606fd'
                 center={this.data.address[this.state.index].address.position}
                 zoom={this.data.address[this.state.index].address.zoom}
                 lang={LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? 'zh_cn' : 'en'}>
              <Marker position={this.data.address[this.state.index].address.position}>
                <div className="map-marker"/>
              </Marker>
            </Map>
            <div className="address-info-wrap">
              {this.data.address.map(
                (item, i) => <section key={i} className="address-info">
                  <h2 onClick={this.changeIndex(i)} className={this.state.index === i ? '' : 'up'}>{item.name}
                    <span className="iconfont font-down"/>
                  </h2>
                  {this.state.index === i ?
                    <div className="content" style={LanguageUtil.lang === 'en' ? {height: '200px'} : {}}>
                      <p>{T.translate('footer.address')}：{item.address.content}</p>
                      <p>{T.translate('footer.tel')}：{item.phone}</p>
                    </div> : ''}
                </section>
              )}
            </div>
          </div>
        </article>
        <article className="service-phone">
          <h1 className="head">{this.data.customerPhone.title}</h1>
          <p>{this.data.customerPhone.text[0]}</p>
          <p>{this.data.customerPhone.text[1]}<a
            href={`tel:${this.data.customerPhone.phone}`}>{this.data.customerPhone.phone}</a>
            <span>{this.data.customerPhone.text[2]}</span></p>
        </article>
        <article className="media-interview">
          <h1 className="head">{this.data.media.title}</h1>
          <p>{this.data.media.text[0]}<a
            href={`mailto:${this.data.media.email}`}>{this.data.media.email}</a>{this.data.media.text[1]}</p>
        </article>
        <article className="cooperation">
          <h1 className="head">{this.data.cooperator.title}</h1>
          <p>
            {this.data.cooperator.text[0]}<a
            href={`mailto:${this.data.cooperator.email}`}>{this.data.cooperator.email}</a>{this.data.cooperator.text[1]}
          </p>
        </article>
      </div>
      <Footer/>
    </div>
  }
}
