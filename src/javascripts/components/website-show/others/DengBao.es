import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";

@connect(state => ({
  location: state.router.location
}))
export default class DengBao extends Component {

  data = {};

  dataZh = {
    name: '等保三级证书',
  };

  dataEn = {
    name: 'DengBao',
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

    return <div className="web-show-container">
      <Header haveScrollEvent={false}/>
      <FloatBar/>
      <article className="website-article-card deng-bao-page">
        <img
          src={require('../../../../images/website-show/others/pic-dengbao.jpg')}
          alt=""/>
      </article>
      <Footer noMargin={true}/>
    </div>
  }
}
