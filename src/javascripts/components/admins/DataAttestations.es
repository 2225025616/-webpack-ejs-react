import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import { getDataAttestations } from "../../actions/adminAction";
import Formatter from "../../lib/formatter";
import { DateRangePicker } from "react-dates";
import { Doughnut, Line } from 'react-chartjs-2';
import format from "../../utils/format";

@connect(
  state => {
    return {dateAttestations: state.admin.dateAttestations}
  }
)

export default class DataAttestations extends Component {
  constructor(props) {
    super(props);
    this.type = "total";
    this.defaultStart = "";
    this.defaultEnd = "";
    this.default = true;
  }

  state = {
    startDate: '',
    endDate: '',
    legend: '',
  };

  componentWillMount() {
    this.getDefaultData();
    this.doQuery(this.props);
  }

  getDefaultData = () => {
    var toDate = new Date();
    this.defaultEnd = toDate;

    var date = new Date();
    date.setDate(date.getDate() - 14);
    this.defaultStart = date;
    this.forceUpdate();
  };

  doQuery(props) {
    let start = "";
    let end = "";
    if(this.default === true) {
      start = this.setDate(this.defaultStart);
      end = this.setDate(this.defaultEnd);
    } else {
      start = this.state.startDate === '' ? '' : this.setDate(this.state.startDate);
      end = this.state.endDate === '' ? '' : this.setDate(this.state.endDate) === 0 ? "" : this.setDate(this.state.endDate);//日期选择中止时间
    }
    let type = this.type;
    this.props.dispatch(getDataAttestations({
      start,
      end,
      type,
    }));
  }

  setDate = (e) => {
    let date = new Date(e);
    return date.getTime();
  };

  handleKeyWordQuery = e => {
    if (e)
      e.preventDefault();
    this.pageNo = 0;
    this.doQuery(this.props);
  };

  changeType = (e) => {
    var value = e.target.value;
    if (this.type != value) {
      this.type = value;
      this.doQuery(this.props);
    }
  };

  getMB = (bytes) => {
    if (bytes === 0) return '0';
    var k = 1024*1024;
    let num = bytes /k;
    return num.toFixed(2);
  };

  render() {
    let {dateAttestations} =  this.props;
    let fmt = Formatter.get("mm/dd/yyyy");

    // 扇形图
    const doughnutData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#9e4bb1',
          '#d27237',
          '#379088',
          '#962121',
          '#487398',
          '#5f6265',
          '#ffa500',
        ],
      }],
      position: "bottom",
    };

    this.state.legend = {
      display: true,
      position: 'bottom',
      fullWidth: true,
      reverse: false,
      labels: {
        fontColor: 'rgb(88, 87, 86)'
      }
    };

    if(dateAttestations.pieData) {
      let pieData = dateAttestations.pieData;
      for(let i = 0; i<pieData.length; i++){
        doughnutData.labels[i] = pieData[i].name;
      }
      for(let i = 0; i<pieData.length; i++){
        if(this.type == "size"){
          doughnutData.datasets[0].data[i] = this.getMB(pieData[i].count);
        } else {
          doughnutData.datasets[0].data[i] = pieData[i].count;
        }
      }
    }
    // 折线图
    const borderColor = [
      '#FF6384', '#36A2EB', '#FFCE56', '#9e4bb1', '#d27237', '#379088', '#962121', '#487398', '#5f6265', '#ffa500',
      '#FF6384', '#36A2EB', '#FFCE56', '#9e4bb1', '#d27237', '#379088', '#962121', '#487398', '#5f6265', '#ffa500',
      '#FF6384', '#36A2EB', '#FFCE56', '#9e4bb1', '#d27237', '#379088', '#962121', '#487398', '#5f6265', '#ffa500',
    ];

    const lineData = {
      labels: [],
      datasets: []
    };

    if(dateAttestations.lineDate){
      let line = dateAttestations.lineDate;
      
      for(let i = 0; i<line.length;i++){
        lineData.datasets[i] =    {
          label: '',
          fill: false,
          borderColor: borderColor[i],
          data: []
        };
      }
      
      let time = line[0].Data;
      
      for(let i = 0; i<time.length; i++){
        lineData.labels[i] = time[i].day;
      }
      
      for(let i = 0; i<line.length; i++){
        lineData.datasets[i].label = line[i].name;
        
        for(let j = 0; j<line[i].Data.length; j++){
          lineData.datasets[i].data.push(line[i].Data[j].count);
        }
      }
    }

    return  <div className="data-center">
      <div className="admin-table-search-bar">
        <div>
          <span className="search-type-name">日期:</span>
          <DateRangePicker
            startDatePlaceholderText={this.default === true ? fmt.format(this.defaultStart) : "开始时间"}
            endDatePlaceholderText={this.default === true ? fmt.format(this.defaultEnd) : "结束时间"}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({startDate, endDate}) => {
                      this.setState({startDate, endDate});
                      this.state.startDate = startDate;
                      this.state.endDate = endDate;
                      this.default = false;
                      this.forceUpdate();
                      }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({focusedInput})}
            isOutsideRange={() => false}
          />
          <button className="search" onClick={this.handleKeyWordQuery}>搜索</button>
        </div>
      </div>
      <article className="data-count">
        <section>
          <p>保全数据条目</p>
          <p className="number">{dateAttestations.total}</p>
        </section>
        <section>
          <p>保全数据容量(MB)</p>
          <p className="number">{dateAttestations.totalSize ? format.fBytes(dateAttestations.totalSize) : ""}</p>
        </section>
        <section>
          <p>上链数据</p>
          <p className="number">{dateAttestations.totalChain}</p>
        </section>
      </article>
      <select value={this.type} onChange={this.changeType}>
        <option value ="total">保全数据条目</option>
        <option value ="size">保全数据容量</option>
        <option value ="chain">上链数据</option>
      </select>
      <div className="charts">
        <div className="doughnut-chart">
          <Doughnut data={doughnutData}
                    legend={this.state.legend}
          />
        </div>
        <div className="line-chart">
          <Line data={lineData} />
        </div>
      </div>
    </div>
  }
}