import React, { Component } from "react";
import Formatter from "../../lib/formatter";
import { connect } from "react-redux";
import { deleteEvidence, findEvidence, postEvidence } from "../../actions/evidenceAction.es";
import { reduxForm } from "redux-form";
import Paginate from "react-paginate";
import { DateRangePicker } from "react-dates";
import Link from "../commons/LangLink";
import Page from "../../constants/Page";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import push from "../../utils/push";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import ColumnInput from "../commons/ColumnInput";
import StorageUtil from "../../utils/StorageUtil";
import LoadingButton from "../commons/LoadingButton";
import { getBalance } from "../../actions/userAction.es";
import MallProductType from "../../utils/MallProductType.es";
import CommonEvidenceList from "../members/CommonEvidenceList.es";
import Dialog from "../commons/Dialog"
import LoadingDialog from "../commons/LoadingDialog"

const fields = ["url", "webName", "remark"];

const styles = {
    showError: {
        display: "block",
    }
};

let urlFlag=true,webNameFlag=true,remarkFlag=true,urlBlur=true;


const validate = values => {
  return new FormValidator(values)
    .url("url", T.translate("evidence.hole-url"))
    .nonEmpty("webName", T.translate("evidence.url-name"))
    .errors;
};

let show=false;

@reduxForm({form: "evidence", fields, validate}, state => {
  return {
    evidence: state.evidence.lists,
    params: state.router.params,
    balanceHolder: state.user.balanceHolder,

    onSubmit: (values, dispatch) => {
      let data = {//因为提交后，后台返回数据缺少，所以从新获取一遍列表，data是get列表的参数
        pageSize: 5,
        pageNo: 0,
        startDate: '',
        endDate: '',
        keyWord: '',
      };
      show=true;
      dispatch(postEvidence(values, () => {
          dispatch(getBalance());
        show=false;
        webNameFlag=false;
        urlFlag=false;
        remarkFlag=false;
        urlBlur=false;
        // FormUtil.extract(url).errorText=''
        }, ()=>{
          show=false;
          webNameFlag=false;
          urlFlag=false;
          remarkFlag=false;
          urlBlur=false;
        }
      ));
    }
  }
})
@connect(
  state => {
    return {
      location: state.router.location
    }
  }
)

export default class Evidences extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    showDisableModal: false,
  };

  componentDidMount() {
    this.getBalanceTick();
  }

  componentWillReceiveProps(nextProps) {
  }
    openHelp=()=>{
        this.setState({isHelp:true})
    }
    closeHelp=()=>{
        this.setState({isHelp:false})
    }
    changeWebName=()=>{
      webNameFlag=true;
      this.forceUpdate();
    }
    changeUrl=()=>{
        urlFlag=true;
        this.forceUpdate();
    }
    changeRemark=()=>{
        remarkFlag=true;
        this.forceUpdate();
    }
    blurUrl=()=>{
      urlBlur=true;
      this.forceUpdate();
    }
  getBalanceTick = () => {
    this.props.dispatch(getBalance())
  };
  disableModal = showDisableModal => () => this.setState({showDisableModal});

  textNodes =
    <div className="toolTip">
      <span className="arrow evidence-arrow"></span>
      <i className="iconfont font-practice"></i>
      <div className="context">
        <p className="title">网页取证</p>
        <p className="tipText">
          网页取证是一款针对网页形式电子数据进行证据保全的产品，通过对网页内容实时固化保全，形成具备法律效力的电子证据，当需要出证时，可在线申请司法鉴定。
        </p>
        <hr/>
        <p className="tipsMore evidence-tips-more">本功能适用场景如下：</p>
        <p className="evidence-tips">1、未经您本人许可，转载您的作品，并更改文章标题等部分内容将作品改头换面。</p>
        <p className="evidence-tips">2、未经您本人许可，转载您的作品且不标注作者信息。</p>
        <p className="evidence-tips">3、当您明确禁止转载时，强行转载，虽然注明作者并用链接方式指向原文，此类情况也属于侵权范围。</p>
        <p className="evidence-tips">4、满足以上任意一种情况您都可以通过取证固权功能保留证据，并在有需要的时候申请司法出证。</p>
        <img src={require('../../../images/components/evidence-step.png')}/>
      </div>
    </div>

  render() {
    const {fields: {url, webName, remark}, evidence, handleSubmit, balanceHolder} = this.props,
      count = balanceHolder.urlAttestation ? balanceHolder.urlAttestation.total : 0;

    let fmt = Formatter.get("yyyy/mm/dd hh:MM:ss");
      let helpStyle={
          maxWidth:1800,
          width:"calc(100vw - 135px)",
          minHeight:32,
          height:542,
          background:"#fff",
          boxShadow:"0 0 7px 3px rgba(0,0,0,0.05)",
          marginLeft:-460,
          padding:'30px 50px 60px',
          borderRadius:'3px',
          marginTop:-6,
      };
      let borderBottom={
          borderBottom:"10px solid #fff",
          left:450
      };
    return <div className="container-wrapper">
      <div className="container evidences-container">
        <p className="table-name">
          {T.translate("common.evidence")}
          <span>
            （当前剩余取证次数 <span className="count">{count}</span> 次
              <Link to={`/mall?productType=${MallProductType.evidence}`}><span className="to-buy">立即购买</span></Link>
            ）
          </span>
        </p>
        <div className="description">
          <p style={{display:'flex',alignItems:'center',height:18}}>
            输入网址，由保全网为您进行实时网页取证并进行区块链证据固定。
            <span onMouseOver={this.openHelp} onMouseOut={this.closeHelp} style={{position:'relative'}}>
              <span className="help" style={{color:'#0a6dee'}}>{T.translate("home.learn-more-1")}</span>
              <span className="iconHelp">?</span>
              <Dialog style={helpStyle} borderBottom={borderBottom} children={this.textNodes} show={this.state.isHelp}/>
            </span>
          </p>
        </div>
        <div className="evidence-ctn ctn">
          <form className="evidencesForm">
            <article>
              <section>
                <span className="required">*</span>
                <span>取证地址</span>
                <div className="column-input input-component">
                  <input file={url} placeholder="请输入需要取证的完整网站url,例如：http://www.XXX.com" type="text" style={{width: '100%'}}  ref="input" onInput={this.changeUrl} onBlurCapture={this.blurUrl} {...FormUtil.extract(url)} value={urlFlag?{...FormUtil.extract(url)}.value:""}/>
                  <span className="error-text" style={urlBlur&&{...FormUtil.extract(url)}.errorText?styles.showError:null}>{{...FormUtil.extract(url)}.errorText}</span>
                </div>
                {/*<ColumnInput placeholder={T.translate("evidence.write-url")} type="text" {...FormUtil.extract(url)}*/}
                            {/*file={url}/>*/}
              </section>
              <section>
                <span className="required">*</span>
                <span>取证名称</span>
                <div className="column-input input-component">
                  <input file={webName} placeholder="请输入需要取证的名称" type="text" style={{width: '100%'}}  ref="webName" onInput={this.changeWebName} {...FormUtil.extract(webName)} value={webNameFlag?{...FormUtil.extract(webName)}.value:""}/>
                  <span className="error-text" style={{...FormUtil.extract(webName)}.errorText?styles.showError:null}>{{...FormUtil.extract(webName)}.errorText}</span>
                </div>
                {/*<ColumnInput placeholder={T.translate("evidence.write-name")} maxLength="100"*/}
                            {/*type="text" {...FormUtil.extract(webName)} file={webName}/>*/}
              </section>
              <section className="remarks">
                <span>{T.translate("evidence.remarks")}</span>
                <textarea rows="4" maxLength="200" {...remark} placeholder={T.translate("evidence.write-remarks")} value={remarkFlag?{...remark}.value:""} onInput={this.changeRemark}/>
              </section>
              <section className="button-group">
                <span style={{opacity: 0}}>{T.translate("evidence.remarks")}</span>
                <LoadingDialog show={show}/>
                {
                  count && count>0 ?
                    <LoadingButton className="yes" type="button" onClick={this.props.handleSubmit} label={T.translate("attestation.to-attestation")}
                                   loadingLabel={T.translate("attestation.attestation-ing")}/>
                    :
                    <button className="yes" type="button" onClick={this.disableModal(true)}>{T.translate("attestation.to-attestation")}</button>
                }
              </section>
            </article>
          </form>
          <div className="member-list-title">
            <p className="title">最近取证记录</p>
            <Link to={`/evidences/lists`}>
              <p className="more">查看全部取证></p>
            </Link>
          </div>
          <CommonEvidenceList size="5" wholeList="false"/>
        </div>
        {this.state.showDisableModal ?
          <ModalContainer onClose={this.disableModal(false)}>
            <ModalDialog onClose={this.disableModal(false)} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("user.remind")}</h1>
              <form className="confirm">
                <p>您的取证次数已消耗完毕，如需继续使用，请先购买次数！</p>
                <div className="button-group">
                  <Link to={`/mall?productType=${MallProductType.evidence}`}>
                    <button type="button" className="yes">{T.translate("common.buy")}</button>
                  </Link>
                  <button type="button" className="no"
                          onClick={this.disableModal(false)}>{T.translate("common.cancel")}</button>
                </div>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>
    </div>

  }
}
