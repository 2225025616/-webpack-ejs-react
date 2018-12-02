import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHighcharts from "react-highcharts";
import Formatter from "../../lib/formatter";
import T from "i18n-react";
import FileUtil from "../../utils/FileUtil";

@connect(state => {
  return {product: state.product.info}
})
export default class ProductDetail extends Component {
  render() {
    const {product} = this.props;
    let content = [];
    let entry = [];
    let day = [];

    let fmt = Formatter.get("mm-dd");

    if (product.saveStatistic) {
      product.saveStatistic.forEach(item => {
          day.push(fmt.format(item.date));
          entry.push(item.success);
          content.push(item.attachment);
        }
      );
    }

    let config = {
      title: {
        text: T.translate("product.data"),
        x: -20
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: day
      },
      yAxis: [{
        labels: {
          format: '{value} ' + T.translate("product.strip")
        },
        lineWidth: 1,
        title: {
          text: T.translate("product.entry"),
        }
      }, {
        labels: {
          formatter: function () {
            return FileUtil.humanableSize(this.value);
          }
        },
        title: {
          text: T.translate("product.volume"),
        },
        lineWidth: 1,
        opposite: true
      }],
      series: [{
        name: T.translate("product.volume"),
        yAxis: 1,
        data: content,
        tooltip: {
          pointFormatter: function () {
            return T.translate("product.volume") + ': ' + FileUtil.humanableSize(this.y);
          }
        }
      }, {
        name: T.translate("product.entry"),
        data: entry,
        tooltip: {
          valueSuffix: T.translate("product.strip")
        }
      }]
    };

    return <div>
      <div className="product-detail">
        <div className="data">
          <h3>{T.translate("product.list")}</h3>
          <p className="attachment">{product.saveRecords} <span className="unit">{T.translate("product.strip")}</span>
          </p>
          <p>{T.translate("product.today")}: {product.todaySaveRecords}</p>
          <p>{T.translate("product.yesterday")}: {product.yesterdaySaveRecords}</p>
        </div>
        <div className="capacity">
          <h3>{T.translate("product.data-volume")}</h3>
          <p className="remain">{FileUtil.humanableSize(product.dataSize)} </p>
          <p>{T.translate("product.today")}: {FileUtil.humanableSize(product.todayDataSize)} </p>
          <p>{T.translate("product.yesterday")}: {FileUtil.humanableSize(product.yesterdayDataSize)} </p>
        </div>
      </div>
      <div key="chart" id="chart-attestation-status" className="chart-attestation-status">
        <ReactHighcharts config={config}/>
      </div>
    </div>
  }
}
