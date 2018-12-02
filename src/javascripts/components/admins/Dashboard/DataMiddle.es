import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { getAttestationData } from "../../../actions/adminAction";
import format from "../../../utils/format";

const styles = {
  topThree: {
    color: "white",
    backgroundColor: "#646464",
  }
};

@connect(
  state => {
    return {
      attData: state.admin.attestationData,
    }
  }
)

export default class DataMiddle extends Component {

  constructor(props) {
    super(props);
    this.time = 'month';
    this.dateType = 'entry';
  }

  componentWillMount() {
    this.queryBusinessData();
  }

  changeDateType = (type) => {
    this.dateType = type;
    this.forceUpdate();
    this.queryBusinessData(this.props);
  };

  changeTime = (time) => {
    this.time = time;
    this.forceUpdate();
    this.queryBusinessData(this.props);
  };

  queryBusinessData(props) {
    let now = new Date();
    let start = "";
    let end = "";

    if(this.time === 'month') {
      start = (now.getTime() - 86400000*30);
      end = now.getTime();
    } else if(this.time === 'year') {
      start = (now.getTime() - 86400000*365);
      end = now.getTime();
    }
    this.props.dispatch(getAttestationData({
      start: start,
      end:end,
      type:this.time,
    }));
  }

  render() {
    let { attData } =  this.props;

    let totalCountList = [];
    let totalCount = 0;
    let totalSizeList = [];
    let totalSize = 0;
    if(attData.ranking) {
      totalCountList = attData.ranking.totalRankding;
      totalSizeList = attData.ranking.fileSizeRankding;
      for (let i = 0; i < totalCountList.length; i++)
        totalCount += totalCountList[i].total;
      for (let i = 0; i < totalSizeList.length; i++)
        totalSize += totalSizeList[i].fileSize;
    }

    let data = [];
    if(attData.statistics){
      let arr = [];
      arr = attData.statistics.reverse();
      for(let i=0;i<arr.length;i++)
        arr[i].fileSize = format.fSizeGb(arr[i].fileSize);
      data = arr;
    }

    const monthLabel =  {
      formatter(text, item, index) {
        if(index==1 || index%2 == 1)
          return "";
        else
          return text;
      }
    };

    const normalLabel =  {
      formatter(text, item, index) {
        return text;
      }
    };

    return <article className="data-middle">
        <div className="head">
          <div className="data-type">
            <span className={cx({activeType: this.dateType === "entry"})} onClick={e => this.changeDateType("entry")}>条目</span>
            <span className={cx({activeType: this.dateType === "capacity"})} onClick={e => this.changeDateType("capacity")}>容量</span>
          </div>
          <div className="options">
            {/*<span className={cx({activeTime: this.time === "days"})} onClick={e => this.changeTime("days")}>今日</span>*/}
            <span className={cx({activeTime: this.time === "month"})} onClick={e => this.changeTime("month")}>近一月</span>
            <span className={cx({activeTime: this.time === "year"})} onClick={e => this.changeTime("year")}>近一年</span>
          </div>
        </div>
        <div className="main">
          <div className="chart">
            <h2>趋势{this.dateType === "entry" ? "(条)" : "(GB)"}</h2>
            <div className="chart-box">
              {
                this.dateType === "entry" ?
                  <Chart height={290} data={data} forceFit padding={[30, 40, 50, 60]}>
                    <Axis name="name" label={this.time === "month" ? monthLabel : normalLabel}/>
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="interval" position="name*total" />
                  </Chart>
                  :
                  <Chart height={290} data={data} forceFit padding={[30, 40, 50, 60]}>
                    <Axis name="name" label={this.time === "month" ? monthLabel : normalLabel}/>
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="interval" position="name*fileSize" />
                  </Chart>
              }
            </div>
          </div>
          <div className="ranking">
            <h2>排名</h2>
            <ul className={cx({show: this.dateType === "entry"})}>
              {
                totalCountList.map((item,index)=> {
                  return <li>
                    <div>
                      <span className="number" style={index<=2 ? styles.topThree : []}>{index+1}</span>
                      <span className="name">{item.name}</span>
                    </div>
                    <span className="count">{format.fcount(item.total)}</span>
                  </li>;
                })
              }
            </ul>
            <ul className={cx({show: this.dateType === "capacity"})}>
              {
                totalSizeList.map((item,index)=> {
                  return <li>
                    <div>
                      <span className="number" style={index<=2 ? styles.topThree : []}>{index+1}</span>
                      <span className="name">{item.name}</span>
                    </div>
                    <span className="count">{format.fBytes(item.fileSize)}</span>
                  </li>;
                })
              }
            </ul>
            <div className="sum">
              <span>合计</span>
              <span>{this.dateType === "entry" ? format.fcount(totalCount) : format.fBytes(totalSize)}</span>
            </div>
          </div>
        </div>
      </article>
  }
}