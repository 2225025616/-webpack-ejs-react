import React, { Component } from "react";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";
import Header from "../common/Header";
import { findAllAttestationByUser, findAllSummary } from "../../../actions/attestationAction";
import { connect } from "react-redux";
import Formatter from "../../../lib/formatter";

@connect(state => ({
  summary: state.attestation.allSummary,
  attestations: state.attestation.mobileAttestations,
  all: state.attestation.user,
}))
export default class Attestations extends Component {
  data = {
    title: '电子数据保全',
    timeFilter: [
      {name: '全部时间', id: 0},
      {name: '最近一周', id: 1},
      {name: '最近一个月', id: 2},
    ],
    attestations: []
  };

  state = {
    loading: true,
    type: {name: '全部', id: ''},
    time: {name: '全部时间', id: 0},
    active: {},
    height: 0,
    tips: '正在获取...',
    animationClass: ''
  };

  pageNo = 0;
  origin = {};
  canQueryMore = true;

  componentWillMount = () => {
    this.doQuery(0, 0, '');
    this.props.dispatch(findAllSummary());
  };

  doQuery = (timeId, pageNo, productId) => {
    let date = this.date(timeId);
    let startDate = date.startDate && date.startDate.getTime();
    let endDate = date.endDate && date.endDate.getTime();

    this.props.dispatch(findAllAttestationByUser({
      pageNo,
      pageSize: 10,
      productId,
      startDate,
      endDate,
      keyWord: '',
    }, () => this.setState({loading: false})));
  };

  queryMore = () => {
    let length = this.props.attestations.length;
    this.pageNo = parseInt(length % 10 === 0 && length / 10 > 0 ? length / 10 - 1 : length / 10);
    if (this.pageNo < this.props.all.totalPage - 1) this.doQuery(this.state.time.id, ++this.pageNo, this.state.type.id);
    else this.setState({tips: '没有更多了'})
  };

  date = (timeId) => {
    let startDate = new Date(), endDate = new Date(), id = timeId || this.state.time.id;
    if (id === 1) {
      startDate.setDate(startDate.getDate() - 7);
    } else if (id === 2) {
      startDate.setDate(startDate.getDate() - 30);
    }
    return {
      startDate: id === 0 ? '' : startDate,
      endDate: id === 0 ? '' : endDate,
    };
  };

  filter = (item) => {
    return e => {
      e.stopPropagation();
      let state = Object.assign({}, item, {active: {}, loading: true});
      this.setState(state);
      this.pageNo = 0;
      this.doQuery((item.time && item.time.id) || this.state.time.id, 0, (item.type && item.type.id) || this.state.type.id);
    }
  };

  active = (item) => {
    return e => {
      let active = {}, height = `calc(${document.body.scrollHeight}px - 4.2rem - 4.25rem - 4rem - 1px)`;
      active[item] = !this.state.active[item];
      this.setState({active, height})
    }
  };

  getIcon = (fileName) => {
    const video = /\.(mp4|avi|wav|mp3|rmvb|wma|flash)$/g, img = /\.(jpg|jpeg|gif|webp|png|svg|bmp)$/g;
    if (video.test(fileName))
      return require('../../../../images/mobile/icon-video.png');
    else if (img.test(fileName))
      return require('../../../../images/mobile/icon-pic.png');
    else return require('../../../../images/mobile/icon-file.png');
  };

  touchStart = e => {
    if (this.props.attestations.length === 0) return this.canQueryMore = false;
    if (typeof window !== 'undefined') {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.canQueryMore = scrollTop >= (document.body.clientHeight - window.screen.availHeight * window.devicePixelRatio);
      if (this.canQueryMore) {
        this.origin.x = e.touches[0].clientX;
        this.origin.y = e.touches[0].clientY;
      }
    }
  };

  touchEnd = e => {
    if (this.canQueryMore && typeof window !== 'undefined') {
      let top = e.changedTouches[0].clientY - this.origin.y;
      if (top < 0 && Math.abs(top) >= 50 * window.devicePixelRatio) {
        this.setState({
          animationClass: 'animation'
        });
        this.queryMore();
        setTimeout(() => this.setState({animationClass: ''}), 2000)
      }
    }
  };

  render() {
    const {summary, attestations} = this.props, {tips} = this.state, fmt = Formatter.get('yyyy-mm-dd hh:MM');

    return <div className="attestation-container">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="tab">
        <Link to="/mobile/attestations/list" className="active">我的保全</Link>
        <Link to="/mobile/notaries/list">我的出证</Link>
      </div>
      <div className="filter">
        <div className="item" onClick={this.active('type')}>
          <span className={"value " + (this.state.active.type ? 'active' : '')}>{this.state.type.name}</span>
          {
            this.state.active.type ? <div className="options" style={{height: this.state.height}}>
              <span className={"option " + (this.state.type.id === '' ? 'selected' : '')}
                    onClick={this.filter({type: {name: '全部', id: ''}})}>全部</span>
              {
                summary.map(
                  (item, i) =>
                    <span key={i} className={"option " + (this.state.type.id === item.pId ? 'selected' : '')}
                          onClick={this.filter({type: {name: item.pName, id: item.pId}})}>{item.pName}</span>
                )
              }
            </div> : ''
          }
        </div>
        <div className="item" onClick={this.active('time')}>
          <span className={"value " + (this.state.active.time ? 'active' : '')}>{this.state.time.name}</span>
          {
            this.state.active.time ? <div className="options" style={{height: this.state.height}}>
              {this.data.timeFilter.map(
                (item, i) =>
                  <span key={i} className={"option " + (this.state.time.id === item.id ? 'selected' : '')}
                        onClick={this.filter({time: {name: item.name, id: item.id}})}>{item.name}</span>
              )}
            </div> : ''
          }
        </div>
      </div>
      <div className="attestation-list" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
        {
          this.state.loading ?
            <div className='loading-wrap' style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem - 4rem - 1px)'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : attestations.length > 0 ?
            attestations.map(
              (item, i) =>
                <Link key={i} to={`/mobile/attestations/${item.id}`} className="attestation">
                  <img src={this.getIcon(item.fileName)} alt=""/>
                  <div className="text">
                    <h3>{item.fileName}</h3>
                    <time>{fmt.format(item.createdAt)}</time>
                  </div>
                  <span className="icon-go"/>
                </Link>
            ) : <div className='no-content-wrap' style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem - 4rem - 1px)'}}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span>{this.state.type.id || this.state.time.id ? '没有符合条件的记录' : '您当前没有保全记录哦'}</span>
            </div>
        }
      </div>
      <p className={"get-more " + this.state.animationClass}>{tips}</p>
    </div>
  }
}