import React, {Component} from "react";
import {connect} from "react-redux";
import Link from "../../commons/LangLink";
import cx from "classnames";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { getPending, getUserCount, getRechargeCount, getUpperChainCount } from "../../../actions/adminAction";
import format from "../../../utils/format";



// const styles = {
//   topThree: {
//     width: "calc(100 * 0.3)",
//   }
// };


@connect(
  state => {
    return {
      pending: state.admin.pending,
      userCount: state.admin.userCount,
      rechargeCount: state.admin.rechargeCount,
      upperChainCount: state.admin.upperChainCount,
    }
  }
)

export default class DataTop extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getPending());
    this.props.dispatch(getUserCount());
    // this.props.dispatch(getRechargeCount());
    // this.props.dispatch(getUpperChainCount());
  }

  render() {
    let {pending, userCount, rechargeCount, upperChainCount} =  this.props;

    let toDo = 0;
    if(pending.kyc){
      toDo = pending.kyc.point + pending.KycEnterprise.point + pending.Template.point;
    }
    const moneyData = [
      { date: '4月1日', money: 38 },
      { date: '4月2日', money: 52 },
      { date: '4月3日', money: 61 },
      { date: '4月4日', money: 145 },
      { date: '4月5日', money: 48 },
      { date: '4月6日', money: 38 },
      { date: '4月7日', money: 38 },
      { date: '4月8日', money: 38 },
      { date: '4月9日', money: 38 },
      { date: '4月10日', money: 52 },
      { date: '4月11日', money: 61 },
      { date: '4月12日', money: 145 },
      { date: '4月13日', money: 48 },
      { date: '4月14日', money: 38 },
      { date: '4月15日', money: 38 },
      { date: '4月16日', money: 38 },
      { date: '4月17日', money: 38 },
      { date: '4月18日', money: 52 },
      { date: '4月19日', money: 61 },
      { date: '4月20日', money: 145 },
      { date: '4月21日', money: 48 },
      { date: '4月22日', money: 38 },
      { date: '4月23日', money: 50 },
      { date: '4月24日', money: 80 },
      { date: '4月25日', money: 111 },
      { date: '4月26日', money: 0 },
      { date: '4月27日', money: 0 },
      { date: '4月28日', money: 20 },
      { date: '4月29日', money: 90 },
      { date: '4月30日', money: 90 },
    ];
    const moneyCols = {
      'money': {tickInterval: 20},
    };

    let userData = [];
    if(userCount.detailed){
      userData = userCount.detailed.reverse();
    };

    const userCols={
      sum: {
        min: 1
      },
      month: {
        range: [ 0 , 1 ]
      }
    };


const percent = "50%";
    const styles = {
      progress: {
        width: `${percent}`,
      },
    };

    return <article className="data-top">
        <section className="data-item">
          <div className="chart">
            <div className="head">
              <span className="title">待审核</span>
              <i title="待审核：目前网站内相关审核业务" className="iconfont font-tip"/>
            </div>
            <span className="number">12</span>
            <div className="backlog">
              <div className="backlog-content">
                <div>
                  <span className="item">个人认证</span>
                  <span>{pending.kyc ? pending.kyc.sum : '0'}</span>
                </div>
                <div>
                  <span className="item">企业认证</span>
                  <span>{pending.KycEnterprise ? pending.KycEnterprise.sum : '0'}</span>
                </div>
              </div>
              <div className="backlog-content">
                <div>
                  <span className="item">模板认证</span>
                  <span>{pending.Template ? pending.Template.sum : '0'}</span>
                </div>
                {/*<div>
                  <span className="item">用户咨询</span>
                  <span>???</span>
                </div>*/}
              </div>
            </div>
          </div>
          <div className="bottom">
            <span className="main-name">三日内待处理 </span><span className="main-count">{toDo}</span>
          </div>
        </section>
        <section className="data-item">
          <div className="chart">
            <div className="head">
              <span className="title">总用户</span>
              <i title="累计用户，包含个人和组织未实名认证的" className="iconfont font-tip"/>
            </div>
            <span className="number">{format.fcount(userCount.total ? userCount.total.sum : '0')}</span>
            <div className="item-chart">
              <div className="item-chart-content">
                <Chart padding="0" height={40} data={userData} scale={userCols} forceFit>
                  <Tooltip crosshairs={{type:'line'}}/>
                  <Geom type="area" position="month*sum" color="#975fe4" opacity="1" shape="smooth"/>
                </Chart>
              </div>
            </div>
          </div>
          <div className="bottom">
            <span className="main-name">本月新增用户 </span><span className="main-count">{format.fcount(userCount.total ? userCount.total.currentMonth : '0')}</span>
          </div>
        </section>
        <section className="data-item">
          <img className="loading-page" src={require("images/admin/loading.png")}/>
          {/*<div className="chart">
            <div className="head">
              <span className="title">充值金额</span>
              <i title="充值金额：每月1号0点清零" className="iconfont font-tip"/>
            </div>
            <span className="number">??????</span>
            <div className="item-chart">
              <div className="item-chart-content">
                <Chart padding="0" height={40} data={moneyData} scale={moneyCols} forceFit>
                  <Tooltip crosshairs={{type : "y"}}/>
                  <Geom type="interval" position="date*money" shape="smooth"/>
                </Chart>
              </div>
            </div>
          </div>
          <div className="bottom">
            <span className="main-name">日消费金额 </span><span className="main-count">￥ {format.fmoney(11111)}</span>
          </div>*/}
        </section>
        <section className="data-item">
          <img className="loading-page" src={require("images/admin/loading.png")}/>
          {/*<div className="chart">
            <div className="head">
              <span className="title">上链成功率</span>
              <i title="上链成功率：不包含等待上链的条目，修复过后的失败条目并不会改变上链成功率" className="iconfont font-tip"/>
            </div>
            <span className="number">??????</span>
            <div className="progress" id="progress">
              <div className="cur" style={styles.progress}>
                <div className="animation"></div>
              </div>
              <div className="stop">
                <div className="hover"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <span className="main-name">最近1万次上链中有<span className="main-count">2200</span>次失败</span>
          </div>*/}
        </section>
      </article>
  }
}