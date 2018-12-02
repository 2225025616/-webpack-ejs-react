import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import { getDataSignatures } from "../../actions/adminAction";
import Formatter from "../../lib/formatter";
import { DateRangePicker } from "react-dates";
import { Doughnut, Line } from 'react-chartjs-2';

@connect(
  state => {
    return {dateSignatures: state.admin.dateSignatures}
  }
)

export default class DataSignatures extends Component {
  constructor(props) {
    super(props);
    this.type = "totalSign";
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
    this.props.dispatch(getDataSignatures({
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

  render() {
    let {dateSignatures} =  this.props;
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
    
    if(dateSignatures.pieData) {
      let pieData = dateSignatures.pieData;
      for(let i = 0; i<pieData.length; i++){
        doughnutData.labels[i] = pieData[i].name;
      }
      for(let i = 0; i<pieData.length; i++){
        doughnutData.datasets[0].data[i] = pieData[i].count;
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
    if(dateSignatures.lineDate){
      let line = dateSignatures.lineDate;

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
          <p>已签署合同</p>
          <p className="number">{dateSignatures.totalSign}</p>
        </section>
        <section>
          <p>官网签署合同</p>
          <p className="number">{dateSignatures.webSign}</p>
        </section>
        <section>
          <p>企业API签署</p>
          <p className="number">{dateSignatures.apiSign}</p>
        </section>
      </article>
      <select value={this.type} onChange={this.changeType}>
        <option value ="totalSign">已签署合同</option>
        <option value ="webSign">官网签署合同</option>
        <option value ="apiSign">企业API签署</option>
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