import React, { Component } from "react";
import Link from "../../commons/LangLink";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import { getBlockChain } from "../../../actions/websiteDataAction";
import LanguageUtil from "../../../utils/LanguageUtil";
import { connect } from "react-redux";
import Formatter from "../../../lib/formatter";

@connect(state => ({
  location: state.router.location,
  blockChain: state.website.blockChain,
}))
export default class BlockDocuments extends Component {

  data = {};

  dataZh = {
    name: '区块链文档',
    otherNav: [
      {name: '公司简介', route: '/other/about-us', selected: false},
      {name: '媒体报道', route: '/other/media-reports', selected: false},
      {name: '保全资讯', route: '/other/industry-news', selected: false},
      {name: '区块链文档', route: '/other/block-documents', selected: true},
      {name: '联系我们', route: '/other/contact', selected: false},
    ],
    documents: [
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
    ]
  };

  dataEn = {
    name: 'Blockchain Doc',
    otherNav: [
      {name: 'Introduction', route: '/other/about-us', selected: false},
      {name: 'Media', route: '/other/media-reports', selected: false},
      {name: 'News', route: '/other/industry-news', selected: false},
      {name: 'Blockchain Doc', route: '/other/block-documents', selected: true},
      {name: 'Contact us', route: '/other/contact', selected: false},
    ],
    documents: [
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
      {title: '保全网获数千万融资 欲借助区块链技术打造连接现实与虚拟的平台', time: '2017-05-11    08:12:59', route: '/block-documents/1'},
    ]
  };

  componentWillMount = () => {
    this.props.dispatch(getBlockChain());
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
    const {blockChain} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="web-show-container">
      <Header haveScrollEvent={false} otherNav={this.data.otherNav}/>
      <FloatBar/>
      <article className="block-documents website-article-card">
        <h1 className="head">{this.data.name}</h1>
        {blockChain.length > 0 ?
          blockChain.map(
            (item, i) => <Link key={i} to={item.route || `/other/block-documents/${item.id}`} className="document">
              <h2>{item.title}</h2>
              <time>{fmt.format(item.createdAt)}</time>
            </Link>
          ) : ""
        }
      </article>
      <Footer/>
    </div>
  }
}
