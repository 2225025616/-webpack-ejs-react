import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import DataTop from "./DataTop" ;
import DataMiddle from "./DataMiddle" ;
import DataBottom from "./DataBottom" ;

@connect(
  state => {
    return {}
  }
)

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {


    return <div className="dashboard">
      <div className="page-title">数据中心</div>
      <div>
        <DataTop/>
        <DataMiddle/>
        <DataBottom/>
      </div>
    </div>
  }
}