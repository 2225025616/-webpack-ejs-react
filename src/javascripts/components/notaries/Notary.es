import React, { Component } from "react";
import LoadingButton from "../commons/LoadingButton";
import { reduxForm } from "redux-form";
import { findNotary, publicNotary } from "../../actions/notaryPublicAction";
import Formatter from "../../lib/formatter";
import Api from "../../utils/Api";
import NotaryStatus from "../../constants/NotaryStatus";
import Factom from "../commons/Factom";
import IdentityUtil from "../../utils/IdentityUtil";
import StorageUtil from "../../utils/StorageUtil";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

const fields = ["collectCode"];
let code = "";

@reduxForm({
    form: "notaryPublic", fields
  },
  state => {
    return {
      info: state.notaryPublic.info,
      collectCode: state.notaryPublic.collectCode,
      onSubmit: (values, dispatch) => {
        dispatch(findNotary(values.collectCode));
      }
    }
  }
)
export default class Notary extends Component {

  state = {
    showNotaryModal: false,
  };

  openNotaryModal = () => {
    this.setState({showNotaryModal: true});
  };

  closeNotaryModal = () => {
    this.setState({showNotaryModal: false});
  };

  componentDidMount() {
    let collectCode = StorageUtil.collectCode();
    if (collectCode) {
      code = collectCode;
      this.handleNotary(collectCode);
    }
    StorageUtil.cleanCollectCode();
  }

  handleConfirmPublic = () => {
    this.refs.confirm.show(this.props.collectCode);
  };

  handlePublic = () => {
    this.props.dispatch(publicNotary(this.props.collectCode));
    this.refs.confirm.hide();
  };

  handleNotary = (e) => {
    this.props.dispatch(findNotary(e));
  };

  render() {
    let {fields: {collectCode}, info, handleSubmit} = this.props;
    let token = info.token;

    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    return <div className="container-wrapper">
      <div className="container notary-container">
        <form onSubmit={handleSubmit} className="attestations-search notary-panel">
          <h2>公证提取码</h2>
          <div className="search-input">
            <div>
              <img className="search-img"
                   src={require("images/components/information/search-img.png")}/>
              <input type="text" className="form-control" {...collectCode}
                     placeholder="请输入提取码..."/>
            </div>
            <LoadingButton class="search-btn" type="submit" style={{width: "60px", height: "34px"}} label="查询"/>
          </div>
        </form>

        <div className="search-result">

          { info.list.length <= 0 ?
            <div className="no-result-tip">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/><br/>
              <p>请输入提取码获取保全信息</p>
            </div>
            :
            <table className="table notary-table">
              <thead>
              <tr>
                <th style={{width: "15%"}}>企业名称</th>
                <th style={{width: "20%"}}>保全时间</th>
                <th style={{width: "15%"}}>用户信息</th>
                <th style={{width: "40%"}}>数据指纹</th>
                <th style={{width: "10%"}}>下载</th>
              </tr>
              </thead>
              <tbody>
              { info.list.map(item => {
                return <tr key={item.id}>
                  <td style={{width: "15%"}}>{item.organizationName}</td>
                  <td style={{width: "20%"}}>{fmt.format(item.completedAt)}</td>
                  <td style={{width: "15%"}} className="number">{IdentityUtil.toString(item.identities)}</td>
                  <td style={{width: "40%"}} className="number"><Factom fileHash={item.fileHash}
                                                                        entryHash={item.entryHash}/>
                  </td>
                  <td style={{width: "10%"}} className="pic"><a target="_blank"
                                                                href={Api.getEndpoint(`/notary-public/${item.id}/download?token=${token}`)}><img
                    src={require("images/download.png")}/></a>
                  </td>
                </tr>
              }) }
              </tbody>
            </table>
          }

          <div className="notary-attestation">
            { (() => {
              switch (info.status) {
                case NotaryStatus.APPLY:
                  return <button className="notary-button" type="button" onClick={this.openNotaryModal}
                                 style={{width: "100px"}}>出证</button>;
                case NotaryStatus.ACCEPT:
                  return "已出证";
                case NotaryStatus.CANCEL:
                  return "已取消";
              }
            })()
            }
          </div>
        </div>

        {this.state.showNotaryModal ?
          <ModalContainer onClose={this.closeNotaryModal}>
            <ModalDialog onClose={this.closeNotaryModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>确认出证</h1>
              <form className="confirm">
                <p>确认出证?</p>
                <div className="button-group">
                  <button type="button" className="yes" onClick={this.handlePublic}>出证</button>
                  <button type="button" className="no" onClick={this.closeNotaryModal}>取消</button>
                </div>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
        {/*
         <ConfirmModal ref="confirm"
         title="确认出证"
         prompt="请再次输入提取号出证"
         label="出证"
         onConfirmOk={this.handlePublic}/>
         */}
      </div>
    </div>
  }
}
