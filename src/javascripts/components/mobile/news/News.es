import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { connect } from "react-redux";
import { getIndustryNewsDetail, getMediaReportDetail } from "../../../actions/websiteDataAction";
import Formatter from "../../../lib/formatter";

@connect(state => ({
  location: state.router.location,
  newsDetail: state.website.newsDetail,
}))
export default class News extends Component {
  data = {
    title: '新闻详情',
    article: {}
  };

  componentWillMount = () => {
    const id = this.props.params['id'];

    if (this.props.location.url) {
      this.props.dispatch(getMediaReportDetail(id));
    }
    else {
      this.props.dispatch(getIndustryNewsDetail(id));
    }
  };

  render() {
    let article = this.props.newsDetail, fmt = Formatter.get('yyyy-mm-dd hh:MM');
    return <div className="news">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      <article>
        <h1>{article.title}</h1>
        <div className="sub">
          <time>{fmt.format(article.createdAt)}</time>
          <span className="source">{article.source}</span>
        </div>
        <div className="content">
          {article.fileKey ? <img src={article.fileKey} alt=""/> : ''}
          <div dangerouslySetInnerHTML={{__html: article.text}}/>
        </div>
      </article>
    </div>
  }
}