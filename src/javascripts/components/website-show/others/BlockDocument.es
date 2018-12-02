import React, { Component } from "react";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import { getBlockChainDetail } from "../../../actions/websiteDataAction";
import AttestationUtil from "../../../utils/AttestationUtil";

@connect(state => ({
  location: state.router.location,
  blockDoc: state.website.blockDoc,
}))
export default class BlockDocument extends Component {

  data = {
    title: '保全网俞学劢参加区块链“信任危机”时代的风口会议',
    time: '2017-6-22 11:50',
    source: '浙金网',
    pdf: 'https://status.im/whitepaper-cn.pdf',
  };

  componentWillMount = () => {
    let id = this.props.params['documentId'];
    this.props.dispatch(getBlockChainDetail(id));
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? '保全网-区块链文档' : 'BAOQUAN.COM - Blockchain Doc - ') + this.data.title;
  };

  render() {
    const {blockDoc} = this.props;
    let url = AttestationUtil.viewBlockDoc(blockDoc);

    return <div className="web-show-container">
      <Header haveScrollEvent={false}/>
      <FloatBar/>
      <div className="news-nav">
        <div className="nav-container">
          <Link to={'/other/block-documents'}
                className="a">{LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? '区块链文档' : 'Blockchain Doc'}</Link>
          <span className="arrow">></span>
          {blockDoc.title}
        </div>
      </div>
      <iframe src={url || this.data.pdf}
              className="document-article website-article-card"/>
      <Footer/>
    </div>
  }
}
