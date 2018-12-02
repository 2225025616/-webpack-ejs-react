import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { replace } from "redux-router";
import { connect } from "react-redux";
import Link from "../../commons/LangLink";
import Formatter from "../../../lib/formatter";
import { getIndustryNews, getMediaReport } from "../../../actions/websiteDataAction";

@connect(state => ({
  report: state.website.report,
  media: state.website.media,
}))
export default class NewsList extends Component {

  data = {
    title: '新闻资讯',
    baoquan: [],
    media: []
  };

  state = {
    loading: true,
    data: this.props.location.query['type'] || 'baoquan',
    active: this.props.location.query['type'] === 'media' ? ['', 'active'] : ['active', '']
  };

  componentWillMount = () => {
    let type = this.props.location.query['type'];
    this.getNews(type);
  };

  componentWillReceiveProps = (next) => {
    let type = next.location.query['type'];
    if (type !== this.props.location.query['type']) {
      this.setState({
        data: type,
        active: type === 'baoquan' ? ['active', ''] : ['', 'active'],
        loading: true,
      });
      this.getNews(type);
    }
  };

  getNews = (type) => {
    if (type === 'media') {
      this.props.dispatch(getMediaReport(() => this.setState({loading: false})));
    } else {
      this.props.dispatch(getIndustryNews(() => this.setState({loading: false})));
    }
  };

  changeStatus = (item) => {
    return () => {
      this.props.dispatch(replace(`/mobile/news-list?type=${item}`));
    }
  };

  render() {
    let fmt = Formatter.get('yyyy-mm-dd'), {media, report} = this.props;
    this.data.baoquan = report;
    this.data.media = media;

    return <div className="news-list">
      <Header>
        <Back/>
        <span className="title">动态资讯</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      <header>
        <span className={this.state.active[0]} onClick={this.changeStatus('baoquan')}>保全动态</span>
        <span className={this.state.active[1]} onClick={this.changeStatus('media')}>媒体报道</span>
      </header>
      <article>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : this.data[this.state.data].length > 0 ?
            this.data[this.state.data].map(
              (item, i) =>
                <Link key={i} to={item.route || `/mobile/news/${item.id}`} className="items">
                  <div className="img-wrap">
                    <img
                      src={item.fileKey || require('../../../../images/website-show/others/pic-news-default-inside.png')}
                      alt=""/>
                  </div>
                  <aside>
                    <p className="title">{item.title}</p>
                    <div className="time">
                      <time>{fmt.format(item.createdAt)}</time>
                      <span>{item.source}</span>
                    </div>
                  </aside>
                </Link>
            ) : <div className='no-content-wrap'
                     style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)'}}>
              <img src={require('../../../../images/no-message.png')} alt=""/>
              <span>Oops! 新闻列表是空的!</span>
            </div>
        }
      </article>
    </div>
  }
}