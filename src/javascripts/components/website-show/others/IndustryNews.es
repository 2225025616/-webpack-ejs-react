import React, { Component } from "react";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import { getIndustryNews } from "../../../actions/websiteDataAction";
import Formatter from "../../../lib/formatter";

@connect(state => ({
  location: state.router.location,
  report: state.website.report,
}))
export default class IndustryNews extends Component {

  data = {};

  dataZh = {
    name: '保全资讯',
    defaultPic: require('../../../../images/website-show/others/pic-news-default-inside.png'),
    otherNav: [
      {name: '公司简介', route: '/other/about-us', selected: false},
      {name: '媒体报道', route: '/other/media-reports', selected: false},
      {name: '保全资讯', route: '/other/industry-news', selected: true},
      {name: '区块链文档', route: '/other/block-documents', selected: false},
      {name: '联系我们', route: '/other/contact', selected: false},
    ],
  };

  dataEn = {
    name: 'News',
    defaultPic: require('../../../../images/website-show/others/pic-news-default-inside.png'),
    otherNav: [
      {name: 'Introduction', route: '/other/about-us', selected: false},
      {name: 'Media', route: '/other/media-reports', selected: false},
      {name: 'News', route: '/other/industry-news', selected: true},
      {name: 'Blockchain Doc', route: '/other/block-documents', selected: false},
      {name: 'Contact us', route: '/other/contact', selected: false},
    ],
  };

  componentWillMount = () => {
    this.props.dispatch(getIndustryNews());
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' ? this.dataZh : this.dataEn;
    document.title = (lang === 'zh' ? '保全网-' : 'BAOQUAN.COM - ') + this.data.name;
  };

  render() {
    const {report} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="web-show-container">
      <Header haveScrollEvent={false} otherNav={this.data.otherNav}/>
      <FloatBar/>
      <article className="industry-news-list website-article-card">
        <h1 className="head">{this.data.name}</h1>
        {
          report.length > 0 ?
            report.map(
              (item, i) => <Link key={i} to={item.route || `/other/industry-news/${item.id}`} className="news">
                <div className="pic">
                  <img src={item.fileKey || this.data.defaultPic} alt=""/>
                </div>
                <div className="text">
                  <h2>{item.title}</h2>
                  <cite>{item.source}
                    <time>{fmt.format(item.createdAt)}</time>
                  </cite>
                  {item.description.length > 150 ?
                    <p title={item.description}>{item.description.substring(0, 150) + '...'}</p>
                    : <p>{item.description}</p>
                  }
                </div>
              </Link>
            ) : ""
        }
      </article>
      <Footer/>
    </div>
  }
}
