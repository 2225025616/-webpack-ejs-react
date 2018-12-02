import React, { Component } from "react";
import Link from "../commons/LangLink";
import T from "i18n-react";
import { connect } from "react-redux";
import LanguageUtil from "../../utils/LanguageUtil";
import JvsCert from "../../utils/webcert";

@connect(state => {
  return {
    location: state.router.location,
  }
})
export default class Footer extends Component {

  data = {};

  dataZh = {
    contact: [
      {
        name: '杭州总部',
        phone: {number: '0571-28221076', time: '工作日（9:00~18:00）'},
        email: 'hz@baoquan.com',
        place: '浙江省杭州市学院路77号黄龙国际中心G座-907'
      },
      {name: '北京', place: '北京市东城区安定门东滨河路甲一号大象投资大厦208'},
    ],
    official: [require('../../../images/website-show/logo/logo-official-2.png'), require('../../../images/website-show/logo/logo-official-1.png'),],
    productions: [
      {name: '可信电子凭证', route: '/production/electronic-certificate'},
      {name: '保全签', route: '/production/baoquan-visa'},
      {name: '诚信档案', route: '/production/credit-records'},
      {name: '私有化部署', route: '/service/privatisation-deployment'},
      {name: '司法鉴定', route: '/service/forensic'},
      {name: '解决方案', route: '/solution/finance'},
    ],
    aboutUs: [
      {name: '关于我们', route: '/other/about-us'},
      {name: 'API文档', route: 'https://baoquan.readthedocs.io/zh/latest/'},
      // {name: 'SDK文档', route: '/other/block-documents'},
      {name: '帮助中心', route: '/other/help-document'},
      {name: '媒体报道', route: '/other/media-reports'},
    ],
    QRCode: {
      others: [
        // {name: '网站公告', route: '/other/industry-news'},
        {name: '保全资讯', route: '/other/industry-news'},
      ],
      img: require('../../../images/website-show/QRCode.jpg')
    },
    friendlyLinks: [
      {name: '千信网', route: 'http://www.eqianxin.com'},
      // {name: '亚欧大数据交易中心', route: 'http://dsj.baoquan.com/'},
      {name: '算力网', route: 'http://www.suanli.com'},
      {name: '数秦科技', route: 'http://www.numchain.com'},
    ],

  };

  dataEn = {
    contact: [
      {
        name: 'Hangzhou Headquarter',
        phone: {number: '0571-28221076', time: 'Weekdays（9:00~18:00）'},
        email: 'hz@baoquan.com',
        place: 'Room 907,Block G, Huanglong International Centre, Xueyuan Road, Xihu District, Hangzhou City, Zhejiang Prov, China'
      },
      {
        name: 'Beijing',
        place: 'Room 208, Daxiang Investment Mansion, Andingmen East Binhe Road, Dongcheng District, Beijing City, China'
      },
    ],
    official: [require('../../../images/website-show/logo/logo-official-2.png'), require('../../../images/website-show/logo/logo-official-1.png'),],
    productions: [
      {name: 'Trustworthy electronic certificate', route: '/production/electronic-certificate'},
      {name: 'Baoquan sig', route: '/production/baoquan-visa'},
      {name: 'Integrity Archive', route: '/production/credit-records'},
      {name: 'Privatized deployment', route: '/service/privatisation-deployment'},
      {name: 'Judicial expertise', route: '/service/forensic'},
      {name: 'Solutions', route: '/solution/finance'},
    ],
    aboutUs: [
      {name: 'About us', route: '/other/about-us'},
      {name: 'API Doc', route: 'https://baoquan.readthedocs.io/zh/latest/'},
      // {name: 'SDK Doc', route: '/other/block-documents'},
      {name: 'Help', route: '/other/help-document'},
      {name: 'Media', route: '/other/media-reports'},
    ],
    QRCode: {
      others: [
        // {name: '网站公告', route: '/other/industry-news'},
        {name: 'Baoquan News', route: '/other/industry-news'},
      ],
      img: require('../../../images/website-show/QRCode.jpg')
    },
    friendlyLinks: [
      {name: 'Eqianxin', route: 'http://www.eqianxin.com'},
      // {name: 'Asia-Europe Big data exchange center', route: 'http://dsj.baoquan.com/'},
      {name: '算力网', route: 'http://www.suanli.com'},
      {name: 'Shuqin Tech', route: 'http://www.numchain.com'},
    ],

  };

  jvsCert = null;

  componentWillMount = () => {
    this.getData();
  };

  componentDidMount = () => {
    this.jvsCert = new JvsCert();
    this.jvsCert.runTimer();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  componentWillUnmount = () => {
    this.jvsCert.timerClear();
  };

  getData = () => {
    this.data = LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
  };


  render() {
    let {noMargin, onlyCopyright} = this.props;

    return <footer className="page-footer"
                   style={noMargin === true ? {marginTop: 0, backgroundColor: this.props.bgColor || ''} : null}>
      {!onlyCopyright ?
        <div className="about-info">
          <article className="company-info">
            <h1>{T.translate('footer.contact')}</h1>
            <div className="info">
              <h2>{this.data.contact[0].name}</h2>
              <p>{T.translate('footer.tel')}：
                <a href={"tel://" + this.data.contact[0].phone.number}>{this.data.contact[0].phone.number}</a>
                <span className="work-time">{this.data.contact[0].phone.time}</span>
              </p>
              <p>{T.translate('footer.email')}：{this.data.contact[0].email}</p>
              <p>{T.translate('footer.address')}：{this.data.contact[0].place}</p>
            </div>
            <div className="info">
              <h2>{this.data.contact[1].name}</h2>
              <p>{T.translate('footer.address')}：<span>{this.data.contact[1].place}</span></p>
            </div>
            <div className="official-logo">
              <a href="https://webcert.cnmstl.net/cert/grade?sn=fc75337090e345169710a009a9751bb9" target="_blank"
                 id="jvs-cert"/>
              <Link to="/other/dengbao"><img className="official" src={this.data.official[1]} alt=""/></Link>
            </div>
          </article>
          <div className="middle">
            <div className="about-us">
              {this.data.aboutUs.map((item, i) => {
                return item.route.indexOf('http') > -1 ?
                  <a key={i} href={item.route} className="a" target="_blank">{item.name}</a>
                  : <Link key={i} to={item.route} className="a">{item.name}</Link>
              })}
            </div>
            <article className="productions">
              <h1>{T.translate('footer.hot')}</h1>
              <div className="text-wrap">
                {this.data.productions.map((item, i) => <Link key={i} to={item.route} className="a">{item.name}</Link>)}
              </div>
            </article>
            <article className="friendly-links">
              <h1>{T.translate('footer.link')}</h1>
              <div className="text-wrap">
                {this.data.friendlyLinks.map((item, i) => <a key={i} href={item.route} className="a"
                                                             target="_blank">{item.name}</a>)}
              </div>
            </article>
          </div>
          <div className="QRCode">
            <h1>{T.translate('footer.follow')}</h1>
            {this.data.QRCode.others.map(
              (item, i) =>
                <Link key={i} to={item.route} className="a">{item.name}</Link>)
            }
            <img src={this.data.QRCode.img} alt=""/>
            <span>{T.translate('footer.tip')}</span>
          </div>
        </div> : ''}
      <div className="copyright" style={onlyCopyright ? {border: 'none'} : {}}>
        Copyright &copy; 2011-2018&nbsp;&nbsp;&nbsp;&nbsp;{T.translate('footer.company')}&nbsp;&nbsp;&nbsp;&nbsp;All
        Rights Reserved {T.translate('footer.ICP')}
      </div>
    </footer>
  }
}
