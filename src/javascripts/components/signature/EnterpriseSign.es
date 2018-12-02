import { toastr } from "react-redux-toastr";
import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import push from "../../utils/push";
import Link from "../commons/LangLink";
import { getApiSignature } from "../../actions/signatureAction";
/*import { transLines, transX } from "../../utils/DateChart";*/
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import { DataSet } from '@antv/data-set';
/*import MyLine from "../commons/myLines";*/

@connect(state => {
  return {
    apiSignature: state.signature.apiSignature,
    apiSignatureData: state.signature.apiSignatureData,
  }
})
export default class EnterpriseSign extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // let { organizations, apiSignature } = this.props;
    // let organization = organizations[organizations.length - 1] || {};
    // if(organization.organizationStatus === "PASS"){
    this.props.dispatch(getApiSignature());
    // }
  }


  statue(status) {
    switch (status) {
      case "PASS":
        return T.translate("user.certified");
      case "APPLY":
        return T.translate("user.certifing");
      case "REJECT":
        return T.translate("user.re-certify");
      case "":
        return T.translate("user.to-certify");
    }
  }
  setOption = (data) => {
    const dv = ds.createView().source(data);
    return dv.transform({
      type: 'fold',
      fields: [ 'totalSign', 'totalSigner' ], // 展开字段集
      key: 'number', // key字段
      value: 'acc', // value字段
    });
  };

  render() {
    let { apiSignature, apiSignatureData } = this.props;
    const signCols = {
      count: { alias: ['11', '22'], },
      name: {
        type: 'time',
        tickCount: 10,
      },
    };
    let arr = [];
    if(apiSignatureData && apiSignatureData.length>0)
      arr = apiSignatureData;

    const ds = new DataSet();
    const dv = ds.createView().source(arr);
    dv.transform({
      type: 'fold',
      fields: ['签署份数', '签署人数'], // 展开字段集
      key: 'city', // key字段
      value: 'temperature', // value字段
    });


    return <div className="container-wrapper">
      <div className="container enterprise-sign member-container">
        <p className="table-name">
          {T.translate("sidebar.org-sign-api")}
          <Link to={`/other/help-document?firstSelected=1&lang=zh&secondSelected=1`}>
            <span className="link-help">接入指南</span>
          </Link>
        </p>
        <div className="member-content">
          <p className="chart-tip">本页统计数据截止到昨天</p>
          <article className="sign-times">
            <section>
              <p className="title">{T.translate("signature.sign-count")} {T.translate("signature.time-unit")}</p>
              <span>{apiSignature ? apiSignature.countSign : ""}</span>
            </section>
            <section>
              <p className="title">{T.translate("signature.sign-count")} {T.translate("signature.user-unit")}</p>
              <span>{apiSignature ? apiSignature.countSigner : ""}</span>
            </section>
          </article>
          <p className="total">目前通过调用接口实现的电子签约合同总数为
            <span className="number">{apiSignature ? apiSignature.countSign : ""}</span>份，总签署人次为
            <span className="number">{apiSignature ? apiSignature.countSigner : ""}</span>人。其中详细情况如下：</p>
          <div className="chart">
            {
              apiSignature.lineData && apiSignature.lineData.length>0 ?
                <Chart height={300} data={dv} scale={signCols} forceFit>
                  <Legend/>
                  <Axis name="day" />
                  <Axis name="temperature"/>
                  <Tooltip crosshairs={{type : "y"}}/>
                  <Geom type="line" position="day*temperature" size={2} color={'city'} />
                  <Geom type='point' position="day*temperature" size={2} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  }
}
