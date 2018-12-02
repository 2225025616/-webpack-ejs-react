import { toastr } from "react-redux-toastr";
import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";
import cx from "classnames";
import T from "i18n-react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import { DataSet } from '@antv/data-set';
import { getItems, getSecurity, getChartCount, getApiSignatureByTime } from "../../actions/signatureAction";
import format from "../../utils/format";
import { getAllConfig } from "../../actions/configAction";
import { listOrganizations } from "../../actions/organizationAction";
import { listProducts } from "../../actions/productAction";
import { currentUser, getUserKycs, getBalance, switchUser } from "../../actions/userAction";
import StorageUtil from "../../utils/StorageUtil";
/*import { DateRangePicker } from "react-dates";*/
import { DateRangePicker } from 'element-react';
import push from "../../utils/push";

@connect(state => {
  return {
    chainCount: state.signature.secStatistics,
    secStatisticsType: state.signature.secStatisticsType,
    itemStatistics: state.signature.itemStatistics,
    itemStatisticsCount: state.signature.itemStatisticsCount,
    chartCount: state.signature.chartCount,
    apiSignatureDataByTime: state.signature.apiSignatureDataByTime,
    apiSignatureDataByTimeType: state.signature.apiSignatureDataByTimeType,

    orgInfo: state.organization.orgInfo,
    balanceHolder: state.user.balanceHolder,
  }
})
export default class OrgChart extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    time: 'all',
    startDate: '',
    endDate: '',
    dates: null,
    tempId: '',
  };

  componentWillMount() {
    this.props.dispatch(getBalance());

    //切换帐号后要重新获取用户信息
    this.props.dispatch(currentUser());
    this.props.dispatch(getUserKycs());
    this.props.dispatch(listOrganizations());
    this.props.dispatch(listProducts());
    this.props.dispatch(getAllConfig());

    this.getData(this.state.time,getSecurity);
    this.getData(this.state.time,getItems);
    this.getData(this.state.time,getApiSignatureByTime);
    this.props.dispatch(getChartCount());
  }

  date = (time) => {
    let date = new Date(time);
    return date.getTime();
  };

  getData(time,fun) {
    let start = '';
    let end = '';
    if(time==='') {
      start = this.date(this.state.startDate);
      end = this.date(this.state.endDate);

      if(fun === getApiSignatureByTime){
        this.props.dispatch(fun({
          startDate: start,
          endDate: end,
          type: time,
        }))
      } else {
        this.props.dispatch(fun({
          start: start,
          end: end,
          type: time,
        }))
      }
    }
    else {
      start = time==='days' ? (new Date().getTime() - 86400000*30) : (time==='months' ? (new Date().getTime() - 86400000*365) : "0");
      end = new Date().getTime();

      if(fun === getApiSignatureByTime){
        this.props.dispatch(fun({
          startDate: start,
          endDate: end,
          type: time,
        }))
      } else {
        this.props.dispatch(fun({
          start: start,
          end: end,
          type: time,
        }))
      }
    }
  };

  changeAccount = () => {
    this.props.dispatch(switchUser(()=>{
      StorageUtil.showOrganization("false");
      this.props.dispatch(push(`/attestations`));
    }));
  };

  handleChangeType = (time) => {
    if(time!=''){
      this.setState({time:time});
      this.setState({startDate:'',endDate:'',dates:null});
    } else {
      this.setState({time:time});
    }
    this.getData(time,getSecurity);
    this.getData(time,getItems);
    this.getData(time,getApiSignatureByTime);
  };

  render() {
    let { chainCount, secStatisticsType, itemStatistics, itemStatisticsCount, apiSignatureDataByTime, apiSignatureDataByTimeType, chartCount, orgInfo, balanceHolder} = this.props;
    let balance = '';
    if(balanceHolder.balance)
      balance = format.fmoney(balanceHolder.balance);
    let current = new Date().getTime();

    if(chainCount.length>0) {
      chainCount = chainCount.map(item => {
        return Object.assign({}, item, {attachment: format.fSizeMb(item.attachment)});
      });
    }
    let size = format.fBytesUnit(chartCount.fileSize);

    const chainCols = {
      success: { alias: '上链数量' },
      name: {
        range: [ 0 , 1 ],
        type: 'timeCat',
        tickCount: 7,
        mask: (secStatisticsType==='days' ? 'YYYY-MM-DD' : 'YYYY-MM'),
      }
    };
    
    const attCols = {
      attachment: { alias: '保全容量' },
      name: {
        range: [ 0 , 1 ],
        type: 'timeCat',
        tickCount: 7,
        mask: (secStatisticsType==='days' ? 'YYYY-MM-DD' : 'YYYY-MM'),
      }
    };

    const signCols = {
      count: { alias: ['11', '22'], },
      name: {
        range: [ 0 , 1 ],
        type: 'timeCat',
        tickCount: 7,
        mask: (apiSignatureDataByTimeType==='days' ? 'YYYY-MM-DD' : 'YYYY-MM'),
      },
    };

    let arr = [];
    if(apiSignatureDataByTime && apiSignatureDataByTime.length>0)
      arr = apiSignatureDataByTime;
    const ds = new DataSet();
    const dv = ds.createView().source(arr);
    dv.transform({
      type: 'fold',
      fields: ['签署份数', '签署人数'], // 展开字段集
      key: 'city', // key字段
      value: 'temperature', // value字段
    });

    const { DataView } = DataSet;
    const { Html } = Guide;
    const attCount = new DataView();
    if(itemStatistics && itemStatistics.length>0){
      attCount.source(itemStatistics).transform({
        type: 'percent',
        field: 'success',
        dimension: 'name',
        as: 'percent'
      });
    }

    return <div className="org-chart">
      <div className="head-info">
        <div className="main-info">
          <div className="icon-box">
            <img src={require('../../../images/account-avatar.png')} alt=""/>
          </div>
          <div className="content">
            <h1 className="title">欢迎，{orgInfo.name}</h1>
            <p className="account">
              <span>保全账号： {orgInfo.contactPhoneNumber}</span>
              <span className="switch-account" onClick={this.changeAccount}>切换个人账号></span>
            </p>
            <p>
              <span>账号余额：</span>
              <span className="money"> ¥ {balanceHolder.balance ? balance : 0}</span>
            </p>
          </div>
        </div>
        <div className="count-box">
          <div className="item blue-item">
            <i className="iconfont font-att-count"/>
            <p className="info">
              <span className="number">{chartCount.total ? chartCount.total : 0}</span>
              <span className="name">保全条目(条)</span>
            </p>
          </div>
          <div className="item red-item">
            <i className="iconfont font-chain-count"/>
            <p className="info">
              <span className="number">{chartCount.chainSuccess ? chartCount.chainSuccess : 0}</span>
              <span className="name">上链数量(条)</span>
            </p>
          </div>
          <div className="item green-item">
            <i className="iconfont font-size-count"/>
            <p className="info">
              <span className="number">{size.num !== "NaN" ? size.num : 0}</span>
              <span className="name">保全容量({size.unit ? size.unit : "kb"})</span>
            </p>
          </div>
        </div>
      </div>
      <div className="chart-box">
        <div className="filter">
          <div className="time">
            <span className={cx({active: this.state.time === "all"})} onClick={this.state.time === "all" ? "" : e=>this.handleChangeType('all')}>全部</span>
            <span className={cx({active: this.state.time === "months"})} onClick={this.state.time === "months" ? "" : e=>this.handleChangeType('months')}>近一年</span>
            <span className={cx({active: this.state.time === "days"})} onClick={this.state.time === "days" ? "" : e=>this.handleChangeType('days')}>近一月</span>
            <p className="count-tip">本页统计数据截止到昨天</p>
          </div>
          <DateRangePicker
            value={this.state.dates}
            placeholder="选择日期范围"
            disabledDate={(Date, selectionMode)=>{
              return Date.getTime()>current
            }}
            onChange={date=>{
            this.setState({dates: date, startDate:date[0],endDate: date[1]});
            this.state.startDate = date[0];
            this.state.endDate = date[1];
            this.handleChangeType('');
          }}
          />
        </div>
        <div className="top-chart">
          <div className="card left">
            <h2 className="card-title">保全条目</h2>
            <div className="content">
              {
                itemStatistics && itemStatistics.length>0?
                  <div className="sector-chart">
                    <Chart height="312" data={attCount} padding={[ 50, 0, 50, 160 ]} forceFit>
                      <Coord type={'theta'} radius={1} innerRadius={0.6} />
                      <Axis name="percent" />
                      <Legend position='left'
                              textStyle={{fontSize: '16', maxWidth: 170,}}
                              offsetY={-(190-16*itemStatistics.length)}
                              offsetX={30}
                              useHtml={true}/>
                      {/*            <Legend position='left'
                              textStyle={{fontSize: '16'}}
                              offsetY={-(200-16*itemStatistics.length)}
                              offsetX={30}
                              useHtml={true}

                              ontainerTpl='<div class="g2-legend"><ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul></div>'
                              itemTpl={
                                (value, color, checked, index) => {
                                  const obj = attCount.rows[index];
                                  console.log(obj);
                                  let count=obj?obj.success:0;
                                  checked = checked ? 'checked' : 'unChecked';
                                  return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
                                    '" data-value="' + value + '" data-color=' + color +
                                    ' style="cursor:pointer;">' +
                                    '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
                                    '<span class="g2-legend-text">' + value + '：</span>' +'<span class="g2-legend-count">'+count+'条</span>'
                                  '</li>';
                                }
                              }
                              g2-legend-marker={{width:'12px',height:'12px',marginRight:'10px',marginTop: '-1px'}}
                              g2-legend-text={{color: '#33475b',fontSize:'16px'}}

                      />*/}
                      <Tooltip
                        showTitle={false}
                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                      />
                      <Guide>
                        <Html position ={[ '50%', '50%' ]} alignX='middle' alignY='middle'
                              html={() => {return ('<div class="chart-style">全部<br><span class="main-info">' +
                              itemStatisticsCount+'条')}}/>
                      </Guide>
                      <Geom
                        type="intervalStack"
                        position="percent"
                        color='name'
                        tooltip={['name*percent',(item, percent) => {
                        percent = (percent * 100) + '%';
                        return {
                          name: item,
                          value: percent
                        };
                      }]}
                        style={{lineWidth: 1,stroke: '#fff'}}
                      >
                        <Label content='percent' formatter={(val, item) => {
                          return item.point.name + ': ' + item.point.success+ '条';}} />
                      </Geom>
                    </Chart>
                  </div>
                  :
                  itemStatistics && itemStatistics.length==0?
                    <div className="no-data-image">
                      <img src={require('../../../images/components/no-att-data.png')} />
                      <span className="tip">暂无保全数据</span>
                    </div>
                    :
                    ""
              }
            </div>
            </div>
          <div className="card right">
            <h2 className="card-title">电子签约</h2>
            <div className="content">
              {
                apiSignatureDataByTime && apiSignatureDataByTime.length>0 ?
                  <Chart height="300" padding={[50, 50, 80, 70]} data={dv} scale={signCols} forceFit>
                    <Legend/>
                    <Axis name="name" />
                    <Axis name="temperature"/>
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="name*temperature" size={2} color={'city'} />
                    <Geom type='point' position="name*temperature" size={2} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                  </Chart>
                  :
                  <div className="no-data-image">
                    <img src={require('../../../images/components/no-att-data.png')} />
                    <span className="tip">暂无保全数据</span>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className="bottom-chart">
          <div className="card">
            <h2 className="card-title">保全容量</h2>
            <div className="content">
              {
                chainCount.length>0?
                  <span className="unit">(MB)</span>
                  :
                  ""
              }
              {
                chainCount.length>0?
                  <Chart padding={[50, 40, 50, 50]} height="312" data={chainCount}
                         scale={attCols} forceFit>
                    <Axis name="name" line={{ stroke: '#DDD'}} />
                    <Axis name="attachment" line={{ stroke: '#DDD'}} grid={null} label={{
                      formatter: val => {
                        return val;
                      }
                    }}/>
                    <Tooltip crosshairs={{type:'line'}}/>
                    <Geom type="area" position="name*attachment" color="#77dde4" shape="smooth"/>
                    <Geom type="line" position="name*attachment" size={2} color="#77dde4" shape="smooth"/>
                  </Chart>
                  :
                  <div className="no-data-image">
                    <img src={require('../../../images/components/no-att-data.png')} />
                    <span className="tip">暂无保全数据</span>
                  </div>
              }
            </div>
          </div>
          <div className="card">
            <h2 className="card-title">上链数量</h2>
            <div className="content">
              {
                chainCount.length>0?
                  <Chart padding={[50, 40, 50, 50]} height="312" data={chainCount}
                         scale={chainCols} forceFit>
                    <Axis name="name" line={{ stroke: '#DDD'}} />
                    <Axis name="success" line={{ stroke: '#DDD'}} grid={null}/>
                    <Tooltip crosshairs={{type : "line"}}/>
                    <Geom type="area" position="name*success" shape="smooth"/>
                    <Geom type="line" position="name*success" size={2} shape="smooth"/>
                  </Chart>
                  :
                  <div className="no-data-image">
                    <img src={require('../../../images/components/no-att-data.png')} />
                    <span className="tip">暂无保全数据</span>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

