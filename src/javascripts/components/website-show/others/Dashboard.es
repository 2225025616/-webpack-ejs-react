import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import { reduxForm } from "redux-form";
import { getHomeData, getTradeData } from "../../../actions/websiteDataAction";
import Formatter from "../../../lib/formatter/index";
import LanguageUtil from "../../../utils/LanguageUtil";

const fields = ['userCount', 'blockHeight', 'blockCount'];

@reduxForm({form: 'home', fields},
  state => {
    return {
      userCount: state.website.userCount,
      blockHeight: state.website.blockHeight,
      blockCount: state.website.blockCount,
      trades: state.website.trades,
      location: state.router.location
    }
  })
export default class Dashboard extends Component {

  data = {};

  dataZh = {
    name: '区块链公示',
    title: ['当前区块高度', '保全用户量', '保全数据'],
    blockHeight: 0,
    userCount: 0,
    blockCount: 0,
    table: '最新交易',
    tableHead: ['交易hash', '所属应用', '保全人', '交易时间'],
    trades: [
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
    ]
  };

  dataEn = {
    name: 'Blockchain',
    title: ['Block Height', 'User Volume', 'Attestation Data'],
    blockHeight: 0,
    userCount: 0,
    blockCount: 0,
    table: 'Updated Trading',
    tableHead: ['Trading Hash', 'Belong to', 'User', 'Trading Time'],
    trades: [
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
      {
        hash: 'eda3994d0a20915332fd00bd84be2b250c888d19303deffe94824cf74 ...',
        source: '算力宝',
        account: '158****6632',
        time: '2016-11-09 16:27:46'
      },
    ]
  };


  componentWillMount = () => {
    this.getDataInterval();
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

  getDataInterval = () => {
    this.getData1();
    this.timer = setInterval(() => {
      this.getData1();
    }, 1000 * 60 * 10);
  };

  getData1 = () => {
    this.props.dispatch(getHomeData());
    this.props.dispatch(getTradeData());
  };

  render() {
    let fmt = Formatter.get('yyyy-mm-dd hh:MM:ss');
    this.data.userCount = this.props.userCount;
    this.data.blockHeight = this.props.blockHeight;
    this.data.blockCount = this.props.blockCount;
    this.data.trades = this.props.trades;

    return <div className="web-show-container" style={{backgroundColor: '#fff'}}>
      <Header/>
      <FloatBar/>
      <div className="banner"
           style={{background: 'linear-gradient(to top, #0a6381 0%, #0e1114 74%, #0e1114 100%)', height: '700px'}}>
        <div className="animation">
          <div className="animation-light"/>
          <div className="animation-logo"/>
          <div className="animation-circle position-1"/>
          <div className="animation-circle position-2"/>
          <div className="animation-circle position-3"/>
          <div className="animation-circle position-4"/>
        </div>
        <div className="statistic-data">
          <section className="data-item block-height">
            <p>{this.data.blockHeight}</p>
            <h1>{this.data.title[0]}</h1>
          </section>
          <section className="data-item">
            <h1>{this.data.title[1]}</h1>
            <p>{this.data.userCount}</p>
          </section>
          <section className="data-item">
            <h1>{this.data.title[2]}</h1>
            <p>{this.data.blockCount}</p>
          </section>
        </div>
      </div>
      <article className="new-trades">
        <h1>{this.data.table}</h1>
        <table>
          <thead>
          <tr>
            <th className="table-col-1">{this.data.tableHead[0]}</th>
            <th className="table-col-2">{this.data.tableHead[1]}</th>
            <th className="table-col-3">{this.data.tableHead[2]}</th>
            <th className="table-col-4">{this.data.tableHead[3]}</th>
          </tr>
          </thead>
          <tbody>
          {this.data.trades.map(
            (item, i) => <tr key={i} className={i % 2 === 0 ? '' : 'line-gray'}>
              <td className="table-col-1" title={item.hash}>{item.hash}</td>
              <td className="table-col-2" title={item.source}>{item.source}</td>
              <td className="table-col-3" title={item.account}>{item.account}</td>
              <td className="table-col-4" title={fmt.format(item.time)}>{fmt.format(item.time)}</td>
            </tr>
          )}
          </tbody>
        </table>
      </article>
      <Footer/>
    </div>
    /*<div className="web-show-container" style={{backgroundColor: '#fff'}}>
     <Header haveScrollEvent={false} bgColor="#0d0f1e"/>
     <FloatBar/>
     <iframe src="http://dashboard.baoquan.com"/>
     <Footer noMargin={true} onlyCopyright={true} bgColor="#0c0f20"/>
     </div>*/
  }
}
