import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import { DataSet } from '@antv/data-set';
import { getAuthCount, getBusinessData } from "../../../actions/adminAction";
import format from "../../../utils/format";

@connect(
  state => {
    return {
      authCount: state.admin.authCount,
      businessData: state.admin.businessData,
    }
  }
)

export default class DataBottom extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    dateType: 'entry',
    time: 'today',
  };

  componentWillMount() {
    this.props.dispatch(getAuthCount());
    // this.queryBusinessData(this.props);
  }


  queryBusinessData(props) {
    let time = this.state.time;
    this.props.dispatch(getBusinessData({time}));
  }

  changeDateType = (type) => {
    this.setState({dateType: type});
  };

  changeTime = (time) => {
    this.setState({time: time});
    this.queryBusinessData(this.props);
  };

  render() {
    let { authCount, businessData } =  this.props;

    let realEnterpriseDetailed = [];
    let realUserDetailed = [];
    if(authCount.realEnterpriseDetailed){
      realEnterpriseDetailed = authCount.realEnterpriseDetailed.reverse();
    }
    if(authCount.realUserDetailed){
      realUserDetailed = authCount.realUserDetailed.reverse();
    }

    const authCols={
      sum: {
        min: 1
      },
      month: {
        range: [ 0 , 1 ]
      }
    };

    const realNameUser = [
      {name:"浙江数牛金融信息服务有限公司",user:"323234",new:"1111"},
      {name:"保全网",user:"323234",new:"1111"},
      {name:"千信旺旺",user:"23234",new:"111"},
      {name:"千麦",user:"23234",new:"23"},
      {name:"我高校啊啊",user:"3234",new:"111"},
      {name:"其他",user:"234",new:"1"},
    ];

    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      { item: '网页取证', count: 40 },
      { item: '电子签约', count: 21 },
      { item: '企业保全', count: 17 },
      { item: '企业签约', count: 13 },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    };

    let val = '66666';
    let per = '11%';

    return <article className="data-bottom">
      <section className="data-chart">
        <div className="head">
          <h2>实名用户</h2>
        </div>
        <div className="container">
          <article className="chart">
            <section className="chart-item">
              <h3>个人实名认证</h3>
              <p>
                <span className="total">{format.fcount(authCount.realUserAggregate ? authCount.realUserAggregate.sum : "0")}</span>
                {/*<span className="percent">88.46％</span>*/}
              </p>
              <div className="chart-box">
                <Chart padding="0" height={60} data={realUserDetailed} scale={authCols} forceFit>
                  <Tooltip crosshairs={{type:'line'}}/>
                  <Geom type="area" position="month*sum" shape="smooth"/>
                  <Geom type="line" position="month*sum" size={2} shape="smooth"/>
                </Chart>
              </div>
            </section>
            <section className="chart-item">
              <h3>组织实名认证</h3>
              <p>
                <span className="total">{format.fcount(authCount.realEnterpriseAggregate ? authCount.realEnterpriseAggregate.sum : "0")}</span>
                {/*<span className="percent">22.33％</span>*/}
              </p>
              <div className="chart-box">
                <Chart padding="0" height={60} data={realEnterpriseDetailed} scale={authCols} forceFit>
                  <Tooltip crosshairs={{type:'line'}}/>
                  <Geom type="area" position="month*sum" color="#77dde4" shape="smooth"/>
                  <Geom type="line" position="month*sum" size={2} color="#77dde4" shape="smooth"/>
                </Chart>
              </div>
            </section>
          </article>
          <table>
            <thead>
            <tr>
              <th style={{width: "10%"}}>排名</th>
              <th style={{width: "50%"}}>用户来源</th>
              <th style={{width: "20%"}}>用户数</th>
              <th style={{width: "20%",fontWeight: "normal"}}>月新增</th>
            </tr>
            </thead>
            <tbody>
            {
              authCount.userSourceStatistics ?
                authCount.userSourceStatistics.map((item,index)=> {
                  return <tr>
                    <td style={{width: "10%"}}>{index+1}</td>
                    <td style={{width: "50%"}} className="source">{item.name}</td>
                    <td style={{width: "20%"}}>{format.fcount(item.sum)}</td>
                    <td style={{width: "20%"}}>{format.fcount(item.currentMonth)}</td>
                  </tr>;
                }) : ""
            }
            </tbody>
          </table>
        </div>
      </section>
      <section className="data-chart loading-box">
        <img className="loading-page-large" src={require("images/admin/loading.png")}/>
        {/* <div className="head">
          <h2>各类业务占比</h2>
        </div>
        <div className="container">
          <div className="business-options">
            <div className="data-type">
              <span className={cx({activeType: this.state.dateType === "entry"})} onClick={e => this.changeDateType("entry")}>条目</span>
              <span className={cx({activeType: this.state.dateType === "capacity"})} onClick={e => this.changeDateType("capacity")}>容量</span>
            </div>
            <div className="time">
              <span className={cx({activeTime: this.state.time === "today"})} onClick={e => this.changeTime("today")}>今日</span>
              <span className={cx({activeTime: this.state.time === "week"})} onClick={e => this.changeTime("week")}>本周</span>
              <span className={cx({activeTime: this.state.time === "month"})} onClick={e => this.changeTime("month")}>本月</span>
              <span className={cx({activeTime: this.state.time === "year"})} onClick={e => this.changeTime("year")}>全年</span>
            </div>
          </div>
          <div className={cx('business-chart-box',{hide: this.state.dateType === "capacity"})}>
            <Chart height={280} data={dv} scale={cols} padding={[ 40, 100, 0, -180 ]} forceFit>
              <Coord type={'theta'} radius={1} innerRadius={0.8} />
              <Axis name="percent" />
              <Legend name="item" position='right' offsetY={-55} offsetX={-180} itemMarginBottom={16} itemWidth={150}
                      textStyle={{ textAlign: 'left', fill: '#666',fontSize: '14'}} />
              <Tooltip
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Guide >
                <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">条目<br><span style="color:#262626;font-size:1.5em">??????</span></div>' alignX='middle' alignY='middle'/>
                <Html  position={[ '100%', '49px' ]} alignX='middle' alignY='middle'
                       html={() => {return ('<div class="business-percent"><ul>' +
                        '<li>'+ per +'<span class="amount">'+ val +'</span></li>' +
                        '<li>'+ per +'<span class="amount">'+ val +'</span></li>' +
                        '<li>'+ per +'<span class="amount">'+ val +'</span></li>' +
                        '<li>'+ per +'<span class="amount">'+ val +'</span></li></ul></div>')}}
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
                color='item'
                tooltip={['item*percent',(item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent
              };
            }]}
                style={{lineWidth: 1,stroke: '#fff'}}
              >
              </Geom>
            </Chart>
          </div>

          <div className={cx('business-chart-box',{hide: this.state.dateType === "entry"})}>

          </div>
        </div>*/}
      </section>
    </article>
  }
}