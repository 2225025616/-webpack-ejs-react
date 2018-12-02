import React, { Component } from "react";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";
import { getMediaReport } from "../../../actions/websiteDataAction";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import Formatter from "../../../lib/formatter";


@connect(state => ({
  location: state.router.location,
  media: state.website.media,
}))
export default class MediaReports extends Component {

  data = {};

  dataZh = {
    name: '媒体报道',
    defaultPic: require('../../../../images/website-show/others/pic-news-default-inside.png'),
    otherNav: [
      {name: '公司简介', route: '/other/about-us', selected: false},
      {name: '媒体报道', route: '/other/media-reports', selected: true},
      {name: '保全资讯', route: '/other/industry-news', selected: false},
      {name: '区块链文档', route: '/other/block-documents', selected: false},
      {name: '联系我们', route: '/other/contact', selected: false},
    ],
  };

  dataEn = {
    name: 'Media',
    defaultPic: require('../../../../images/website-show/others/pic-news-default-inside.png'),
    otherNav: [
      {name: 'Introduction', route: '/other/about-us', selected: false},
      {name: 'Media', route: '/other/media-reports', selected: true},
      {name: 'News', route: '/other/industry-news', selected: false},
      {name: 'Blockchain Doc', route: '/other/block-documents', selected: false},
      {name: 'Contact us', route: '/other/contact', selected: false},
    ],
  };

  componentWillMount = () => {
    this.props.dispatch(getMediaReport());
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
    const {media} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="web-show-container">
      <Header haveScrollEvent={false} otherNav={this.data.otherNav}/>
      <FloatBar/>
      <article className="media-reports website-article-card">
        <h1 className="head">{this.data.name}</h1>
        {
          media.length > 0 ?
            media.map(
              (item, i) => <Link key={i} to={item.route || `/other/media-reports/${item.id}`} className="report">
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
