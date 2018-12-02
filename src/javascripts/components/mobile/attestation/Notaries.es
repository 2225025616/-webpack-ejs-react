import React, { Component } from "react";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";
import Header from "../common/Header";
import { findNotariesByUser } from "../../../actions/notaryAction";
import TokenUtil from "../../../utils/TokenUtil";
import { connect } from "react-redux";
import NotaryStatus from "../../../constants/NotaryStatus";
import Formatter from "../../../lib/formatter";

@connect(state => {
  return {
    all: state.notary.user,
    notaries: state.notary.mobileNotaries,
  }
})
export default class Notaries extends Component {
  data = {
    title: '电子数据保全',
    notaries: [
      {}
    ]
  };

  state = {
    loading: true,
    height: 0,
    animationClass: '',
    tips: '正在获取...',
  };

  origin = {};
  canQueryMore = true;

  pageNo = 0;

  componentWillMount = () => {
    this.doQuery(0);
  };

  doQuery(pageNo) {
    const params = {
      pageNo,
      pageSize: 10,
      startDate: '',
      endDate: '',
      status: '',
      keyWord: '',
    };
    this.userId = TokenUtil.uid;
    this.props.dispatch(findNotariesByUser(this.userId, params, () => this.setState({loading: false})));
  }

  queryMore = () => {
    let length = this.props.notaries.length;
    this.pageNo = parseInt(length % 10 === 0 && length / 10 > 0 ? length / 10 - 1 : length / 10);
    if (this.pageNo < this.props.all.totalPage - 1) this.doQuery(++this.pageNo);
    else this.setState({tips: '没有更多了'})
  };

  touchStart = e => {
    if (this.props.notaries.length === 0) return this.canQueryMore = false;
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

  status = (payStatus, status) => {
    if (payStatus !== 'YES' && status !== 'CANCEL') return '未支付';
    else {
      return NotaryStatus.toName(status);
    }
  };

  render() {
    const {notaries} = this.props, fmt = Formatter.get('yyyy-mm-dd hh:MM');

    return <div className="attestation-container">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <div className="tab">
        <Link to="/mobile/attestations/list">我的保全</Link>
        <Link to="/mobile/notaries/list" className="active">我的出证</Link>
      </div>
      <div className="notaries" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem - 4.25rem)', width: '100vw', margin: '0 0 -1.5rem -1.5rem'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : notaries.length > 0 ?
            notaries.map(
              (item, i) =>
                <Link key={i} className="notary" to={`/mobile/notaries/${item.collectCode}`}>
                  <header>
                    <h3>
                      <span className="fileName">{(item.itemName && item.itemName[0]) || '文件名'}</span>
                      <span className="count">等{item.itemSize}条数据</span>
                    </h3>
                    <span
                      className={item.payStatus !== 'YES' && item.status !== 'CANCEL' ? "status red"
                        : item.status === 'ACCEPT' ? 'status green' : item.status === 'CANCEL' ? 'status grey' : 'status'}>
                    {this.status(item.payStatus, item.status)}
                  </span>
                  </header>
                  <p className="code">出证提取码 {item.collectCode}</p>
                  <span className="cut-line"/>
                  <p className="time">
                    申请出证时间
                    <time>{fmt.format(item.createdAt)}</time>
                  </p>
                </Link>
            ) : <div className='no-content-wrap'
                     style={{
                       minHeight: 'calc(100vh - 4.2rem - 4.25rem)',
                       width: '100vw',
                       margin: '0 0 -1.5rem -1.5rem'
                     }}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span>您当前没有出证记录哦</span>
            </div>
        }
      </div>
      <p className={"get-more " + this.state.animationClass}>{this.state.tips}</p>
    </div>
  }
}