import React, {Component} from "react";
import {connect} from "react-redux";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import DataAttestations from "./DataAttestations" ;
import DataSignatures from "./DataSignatures" ;
import cx from "classnames";

@connect(
  state => {
    return {}
  }
)

export default class DataProducts extends Component {
  constructor(props) {
    super(props);
    this.active = 1 ;
  }

  changeActive = pos => {
    this.active = pos ;
    this.forceUpdate();
  };

  render() {
    return <section id="company-kyc">
      <div className="title">网站管理</div>
      <div className="web-management">
        <div className="choose-items">
          <div className={cx("item",{active:this.active==1})} onClick={()=>this.changeActive(1)}>电子数据保全</div>
          <div className={cx("item",{active:this.active==2})} onClick={()=>this.changeActive(2)}>保全签</div>
        </div>
        <div className="choose-content">
          <div className={cx("passive",{active:this.active==1})}>
            <DataAttestations/>
          </div>
          <div className={cx("passive",{active:this.active==2})}>
            <DataSignatures/>
          </div>
        </div>
      </div>
    </section>

  }
}