import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Paginate from "react-paginate";
import Link from "../commons/LangLink";
import LoadingButton from "../commons/LoadingButton";
import Dropzone from "react-dropzone";
import Formatter from "../../lib/formatter";
import CommonAttestationList from "../members/CommonAttestationList";
import AttestationFile from "../attestations/AttestationFile.es";
import Dialog from "../commons/Dialog"
import StorageUtil from "../../utils/StorageUtil.es";
import cx from "classnames";
import { listOrganizations } from "../../actions/organizationAction";
import { listProducts } from "../../actions/productAction";
import { currentUser, getUserKycs } from "../../actions/userAction";

@connect(state => {
  return {
    user: state.user.kycs,
    params: state.router.params
  }
})



export default class Attestations extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    file: '',
    fileName: '',
      isHelp:false
  };
  file = '';
  fileName = '';

  componentWillMount() {
    this.props.dispatch(currentUser());
    this.props.dispatch(getUserKycs());
  }

  openHelp=()=>{
    this.setState({isHelp:true})
  };

  closeHelp=()=>{
    this.setState({isHelp:false})
  };
  
  textNodes =
    <div className="toolTip">
      <span className="arrow att-arrow"></span>
      <i className="iconfont font-console"></i>
      <div className="context">
        <p className="title">原创保全 <span>永久免费</span></p>
        <p className="tipText">
          原创保全是保全网针对原创人员推出的防止侵权利器，保全网通过对接国家授时中心，在您上传原创作品的同时，进行作品实时固化，以方便您的作品在日后发生侵权时，及时证明您的作品优先时间。
        </p>
        <hr/>
        <p className="tipsMore att-tips-more">原创保全的功能优势</p>
        <p className="tips">时间戳证明</p>
        <p className="tipsText">对接中国国家授时中心、苹果NTP服务，可靠的高精度的授时服务，保障时间的精准性。</p>
        <p className="tips">作品保全</p>
        <p className="tipsText">结合区块链技术，对上传的作品打散分布存储，保证作品的安全性与私密性。</p>
        <p className="tips">司法出证</p>
        <p className="tipsText">联合司法鉴定机构，可在线快速申请出具公平公正的司法鉴定书。</p>
      </div>
    </div>
  
  render() {
    const {} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let isOrg = StorageUtil.showOrganization();

/*    let dataFrom = [
      {name:"算力网", src: require("../../../images/components/sunliLogo.png")},
      {name:"千信网", src: require("../../../images/components/qianxinLogo.png")},
      {name:"浙金网", src: require("../../../images/components/zhejinLogo.png")},
    ];*/
      let helpStyle={
          maxWidth: (isOrg === 'true' ? 1500 : 1800),
          width:  (isOrg === 'true' ? "calc(100vw - 416px)" : "calc(100vw - 135px)"),
          minHeight:32,
          height:542,
          background:"#fff",
          boxShadow:"0 0 7px 3px rgba(0,0,0,0.05)",
          marginLeft:-670,
          padding:'30px 50px 60px',
          borderRadius:'3px',
          marginTop:-6,
      };
      let borderBottom={
          borderBottom:"10px solid #fff",
          left:660
      };

    return (
    <div className="container-wrapper">
      <div className={cx("container", {'member-container': isOrg === 'true'})}>
        <p className="table-name">{T.translate("common.my-preservation")}</p>
        <div className="description">
          <p style={{display:'flex',alignItems:'center',height:18}}>
            <span>{T.translate("attestation.original-baoquan-tip")}</span>
            <span onMouseOver={this.openHelp} onMouseOut={this.closeHelp} style={{position:'relative'}}>
              <span className="help" style={{color:'#0a6dee'}}>了解更多</span>
              <span className="iconHelp">?</span>
              <Dialog style={helpStyle} borderBottom={borderBottom} children={this.textNodes} show={this.state.isHelp}/>
            </span>
          </p>
        </div>
        <div className={cx("ctn", {'member-content': isOrg === 'true'})}>
          <div className="attestations-profile">
            <div className="attestations-profile-content upload-content">
              <AttestationFile/>
            </div>
          </div>
          <p className="signText">{T.translate("attestation.my-new-tip")}</p>
{/*          <p className="dataSourceLists">
            {
              dataFrom.map(item => {
                return <span><img src={item.src}/></span>
              })
            }
          </p>*/}
          {
            isOrg === 'true' ?
              <CommonAttestationList size="5" haveInput="1" type="org"/>
              :
              <CommonAttestationList size="5" haveInput="1" type="user"/>
          }
        </div>
      </div>
    </div>
    )
  }
};
