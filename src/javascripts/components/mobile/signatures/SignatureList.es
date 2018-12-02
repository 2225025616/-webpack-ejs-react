import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import Formatter from "../../../lib/formatter";
import { getSignatureMobile } from "../../../actions/signatureAction";
import { connect } from "react-redux";
import Link from "../../commons/LangLink";
import statusUtil from "./statusUtil";

@connect(state => {
    return {
      all: state.signature.lists,
      signatures: state.signature.mobileList,
      location: state.router.location,
    };
  }
)
export default class SignatureList extends Component {

  data = {
    title: '保全签列表',
    tabs: [
      {name: '全部', value: 'ALL'},
      {name: '待我签署', value: 'WAIT_ME'},
      {name: '待他人签署', value: 'WAIT_OTHERS'},
      {name: '已完成', value: 'DONE'},
      {name: '其他', value: 'OTHER'},
    ],
    signatures: [
      {
        attestationId: "",
        createAt: 1508727454000,
        endAt: 1511107200000,
        id: "2qEo589tf9b88Y3KHw1b9Q",
        remark: "ceshi",
        signUser: "刘志平,胡侃",
        status: "WAIT_OTHERS",
        title: "ceshi",
        token: "1mPTyu-_4hTEVYp6S4OW6G_8ZNUOKvpsfDl-WS0maaIYXK7maxiny_ZjgKBXKmzgsGLhK5qF5PD8lOj2D5z_J1Mvooq91szipH_BxqL7mG5cycjrEuyG5g69xCQ7Tw7s",
        userId: "jpbQm25n2tgN2RVTtS6KYU",
      },
    ]
  };

  state = {
    loading: true,
    active: 'ALL',
    animationClass: '',
    tips: '正在获取...',
  };

  pageNo = {ALL: 0, WAIT_ME: 0, WAIT_OTHERS: 0, DONE: 0};
  origin = {x: 0, y: 0};
  canQueryMore = true;

  componentWillMount() {
    this.doQuery(0, '');
  }

  componentWillReceiveProps = (next) => {
    let status = next.location.query.status, active;
    if (status && this.isOther(status)) active = 'OTHER';
    if (status !== this.props.location.query.status) {
      this.doQuery(0, status);
      this.setState({active});
    }
  };

  doQuery = (pageNo, status) => {
    this.props.dispatch(getSignatureMobile({
      pageNo,
      pageSize: 10,
      status,
      startDate: '',
      endDate: '',
    }, () => this.setState({loading: false})));
  };

  queryMore = () => {
    let active = this.state.active;
    active = active === 'OTHER' ? 'ALL' : active;
    let length = this.props.signatures[active].length;

    this.pageNo[active] = parseInt(length % 10 === 0 && length / 10 > 0 ? length / 10 - 1 : length / 10);

    if (this.pageNo[active] < this.props.all.totalPage - 1) this.doQuery(++this.pageNo[active], active === 'ALL' ? '' : active);
    else this.setState({tips: '没有更多了'})
  };

  touchStart = e => {
    let active = this.state.active;
    active = active === 'OTHER' ? 'ALL' : active;
    if (this.props.signatures[active].length === 0) return this.canQueryMore = false;

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


  changeStatus = (active) => {
    return () => {
      this.setState({active, loading: active !== 'OTHER'});
      if (active !== 'OTHER') {
        this.doQuery(0, active === 'ALL' ? '' : active);
      }
    }
  };

  isOther(status) {
    return status !== 'WAIT_ME' && status !== 'WAIT_OTHERS' && status !== 'DONE'
  }

  getIcon = (status) => {
    return statusUtil.getIcon(status);
  };

  getStatus = (status) => {
    return statusUtil.getStatus(status);
  };

  getColor = (status) => {
    return statusUtil.getColor(status);
  };

  render() {
    const {signatures} = this.props, fmt = Formatter.get('yyyy-mm-dd');
    return <div className="signatures-list">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      <nav className="nav">
        {this.data.tabs.map(
          (item, i) =>
            <span key={i} className={this.state.active === item.value ? 'active tab' : 'tab'}
                  onClick={this.changeStatus(item.value)}>{item.name}</span>
        )}
      </nav>
      <div className="signatures-container" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem - 4rem)'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : signatures[this.state.active].length > 0 ?
            signatures[this.state.active].map(
              (item, i) =>
                <Link to={`/mobile/signatures/${item.id}`} key={i} className="signature">
                  <img src={this.getIcon(item.status)} alt=""/>
                  <div className="text">
                    <h3>{item.title}</h3>
                    <time>文件期限：{fmt.format(item.endAt) || '长期有效'}</time>
                    <span style={{color: this.getColor(item.status)}}>{this.getStatus(item.status)}</span>
                  </div>
                </Link>
            ) : <div className='no-content-wrap'
                     style={{minHeight: 'calc(100vh - 4.2rem - 4rem)'}}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span>{this.state.active === 'ALL' ? '您当前没有保全签记录哦' : '您当前没有符合条件的保全签'}</span>
            </div>
        }
      </div>
      <p className={"get-more " + this.state.animationClass}>{this.state.tips}</p>
    </div>
  }
}