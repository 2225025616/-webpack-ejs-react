import React, {Component} from "react";
import {connect} from "react-redux";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import NewsList from "./NewsList" ;
import BlockChain from "./BlockChain" ;
import cx from "classnames";

@connect(
  state => {
    return {}
  }
)

export default class WebManagement extends Component {
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
          {/*
           <div className={cx("item",{active:this.active==0})} onClick={()=>this.changeActive(0)}>banner设置</div>
          */}
          <div className={cx("item",{active:this.active==1})} onClick={()=>this.changeActive(1)}>新闻管理</div>
          <div className={cx("item",{active:this.active==2})} onClick={()=>this.changeActive(2)}>区块链文档</div>
          {/*
           <div className={cx("item",{active:this.active==3})} onClick={()=>this.changeActive(3)}>帮助管理</div>
           */}
        </div>
        <div className="choose-content">
          <div className={cx("passive",{active:this.active==1})}>
            <NewsList/>
          </div>
          <div className={cx("passive",{active:this.active==2})}>
            <BlockChain/>
          </div>
        </div>
        {/*
         <div className={cx("passive",{active:this.active==0})}>
         <Banner/>
         </div>
         <div className={cx("passive",{active:this.active==3})}>
         <Help/>
         </div>
         */}
      </div>
    </section>

  }
}