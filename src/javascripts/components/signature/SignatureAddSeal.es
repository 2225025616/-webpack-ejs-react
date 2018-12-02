import React, { Component } from "react";
import IdUtil from "../../utils/IdUtil";
import { reduxForm } from "redux-form";
import { addSignatureSeals, findAllSeals, findSignature, getPdfSeals } from "../../actions/signatureAction";
import Link from "../commons/LangLink";
import T from "i18n-react";
import Image from "../commons/Image";
import AttestationUtil from "../../utils/AttestationUtil";
import LanguageUtil from "../../utils/LanguageUtil";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import ColumnInput from "../commons/ColumnInput";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { verifySmsCode } from "../../actions/smsVerifyAction";
import { getAbsScrollTop } from "../../lib/getAbsScrollTop";
import push from "../../utils/push";
import LoadingButton from "../commons/LoadingButton";
import { getBalance } from "../../actions/userAction.es";
import MallProductType from "../../utils/MallProductType.es";
import SmsType from "../../utils/SmsType.es";

let ViewPDF;
if (typeof window !== 'undefined') {
  ViewPDF = require("../commons/ViewPDF").default;
}

export const fields = ['smsVerifyCode'];

let signId = "";

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("smsVerifyCode", T.translate("common.verify-code"))
    .errors
};

@reduxForm({form: 'seal', fields, validate}, state => {
    return {
      ...state.sms,
      user: state.user.info,
      seals: state.signature.seals,
      info: state.signature.info,
      pdfSeals: state.signature.pdfSeals,
      params: state.router.params,
      balanceHolder: state.user.balanceHolder,
    }
  }
)
export default class SignatureAddSeal extends Component {

  constructor(props) {
    super(props);
    this.defaultSeal = [];
    this.userSeal = "";
    this.file = "";
    this.seals = [];
    this.selectSeal = {};
    this.showSeal = false;
  }

  state = {
    showSealsModal: false,
    showDisableModal: false,
    showSmsModal: false,
    pageIndex: 0,
    seals: [],
    originalSize: {},
    signType: ''
  };

  sealWrapPosition = {x: 0, y: 0};
  sealImgPosition = {x: 0, y: 0};

  componentWillMount() {
    signId = IdUtil.signatureId(this.props);

    this.props.dispatch(findAllSeals());
    this.props.dispatch(findSignature(signId));
    this.props.dispatch(getPdfSeals(signId));
    this.props.dispatch(getBalance());
  }

  componentDidMount() {
    this.getSealWrapPosition();
  };

  // getSignatureFile() {
  //   this.props.dispatch(findSignature(signId));
  // }

  getSealWrapPosition = () => {
    const ele = this.refs.sealWrap;
    this.sealWrapPosition = getAbsScrollTop(ele)
  };

  getSealImgPosition = (e) => {
    const ele = e.target;
    this.sealImgPosition = getAbsScrollTop(ele);
  };

  openSmsModal = () => {
    const {balanceHolder, info} = this.props,
      count = balanceHolder.econtract || {},
      perCount = count.free + (count.nofree ? count.nofree.per : 0),
      orgCount = (count.nofree ? count.nofree.org : 0);

    if (info.status === 'DRAFT') {
      if (info.signType === 'personal') {
        if (!perCount) {
          return this.disableModal(true, T.translate('signature.personal-sign'))();
        }
      } else {
        if (!orgCount) {
          return this.disableModal(true, T.translate('signature.org-sign'))();
        }
      }
    }
    this.setState({showSmsModal: true});
  };

  disableModal = (showDisableModal, signType) => () => this.setState({showDisableModal, signType});

  closeSmsModal = () => {
    this.setState({showSmsModal: false});
  };

  openSealsModal = () => {
    this.setState({showSealsModal: true});
  };

  closeSealsModal = () => {
    this.setState({showSealsModal: false});
  };

  changeDefault = (item) => {
    this.selectSeal = item;
    this.forceUpdate();
  };

  changeSeal = () => {
    this.defaultSeal = this.selectSeal;
    this.forceUpdate();
    this.closeSealsModal();
  };

  deleteSeal = (i) => {
    return (e) => {
      let seals = this.state.seals;
      seals.splice(i, 1);
      this.setState({seals})
    }
  };

  getOriginalSize = (val) => {
    this.setState({
      originalSize: {...val}
    });
    this.showSeal = true;
    this.forceUpdate();
  };

  onDragStart = (type, val) => {
    return (e) => {
      let data = {};
      if (type !== 'move') {
        data = {
          id: val,
          src: e.target.src,
          position: {
            x: e.pageX - this.sealImgPosition.x,
            y: e.pageY - this.sealImgPosition.y,
          }
        };
        e.dataTransfer.setData("sealInfo", JSON.stringify(data));
      } else {
        data = {
          index: val,
          position: {
            x: e.pageX,
            y: e.pageY,
          }
        };
        e.dataTransfer.setData("sealIndex", JSON.stringify(data));
      }
    }
  };

  allowDrop = (e) => {
    e.preventDefault();
  };

  onDrop = (e) => {
    e.preventDefault();
    let sealInfo = e.dataTransfer.getData("sealInfo"),
      sealIndex = e.dataTransfer.getData("sealIndex");
    const seals = this.state.seals,
      originalSize = this.state.originalSize,
      pageIndex = this.state.pageIndex;
    sealInfo = sealInfo ? JSON.parse(sealInfo) : sealInfo;
    sealIndex = sealIndex ? JSON.parse(sealIndex) : sealIndex;
    if (sealInfo) {
      seals.push({
        id: sealInfo.id,
        src: sealInfo.src,
        pageIndex,
        left: e.pageX - this.sealWrapPosition.x - sealInfo.position.x,
        top: e.pageY - this.sealWrapPosition.y - sealInfo.position.y,
        refPageOriginalSize: originalSize
      });
      this.setState({seals});
    } else if (sealIndex) {
      seals[sealIndex.index].left += e.pageX - sealIndex.position.x;
      seals[sealIndex.index].top += e.pageY - sealIndex.position.y;
      this.setState({seals});
    }
  };

  getPdfIndex = (val) => {
    this.setState({
      pageIndex: val
    })
  };

  getPosY = (seal) => {
    const img = this.refs.showImg;
    let pdfWrapHeight = seal.refPageOriginalSize.scale * seal.refPageOriginalSize.height;
    let pdfImgHeight = seal.refPageOriginalSize.scale * img.height * 600 / 900;
    let bottom = pdfWrapHeight - pdfImgHeight - seal.top;
    return bottom / pdfWrapHeight;
  };

  finalSealsData = () => {
    return this.state.seals.map((item, i) => ({
      id: item.id,
      page: item.pageIndex,
      posX: item.left / (item.refPageOriginalSize.scale * item.refPageOriginalSize.width),
      posY: this.getPosY(item),
    }));
  };

  onSubmit = () => {
    const seals = this.finalSealsData();
    let {fields: {smsVerifyCode}} = this.props;

    this.props.dispatch(addSignatureSeals(signId, {
      smsVerifyCode: smsVerifyCode.value,
      status: 'DONE',
      signature_id: seals[seals.length - 1].id,
      page: (seals[seals.length - 1].page + 1).toString(),
      posX: seals[seals.length - 1].posX,
      posY: seals[seals.length - 1].posY,
    }, () => {
      this.props.dispatch(push(`/signatures/${signId}`));
    }))
  };

  render() {
    const {fields: {smsVerifyCode}, seals, info, user, remainTime, dispatch, pdfSeals, balanceHolder} = this.props,
      count = balanceHolder.econtract || {},
      perCount = count.free + (count.nofree ? count.nofree.per : 0),
      orgCount = (count.nofree ? count.nofree.org : 0),
      smsType = SmsType.EContract;

    if (info.id === signId) {
      this.file = AttestationUtil.viewSignature(info) + "&lang=" + LanguageUtil.lang;
    }
    if (!this.selectSeal.id && seals.default) {
      this.defaultSeal = seals.default;
    }
    this.userSeal = seals.userSignature;

    let height = this.state.originalSize.scale * this.state.originalSize.height;
    let scale = this.state.originalSize.scale * 600 / 900;

    return <div className="container-wrapper">
      <div className="container member-container">
        <div className="signature-info signature-new">
          <div className="head table-name">
            <Link to={`/signatures`}>
              <i className="iconfont font-arrow-left"/>
              <span className="back">{T.translate("signature.back")}</span>
            </Link>
            <h1>
              {T.translate("signature.post")}
              <span className='balance'>
                （剩余企业签约次数： <span className={!orgCount ? 'red-font' : 'blue-font'}>{orgCount}</span>）
                {/*剩余个人签约次数： <span className={!perCount ? 'red-font' : 'blue-font'}>{perCount}</span>，*/}
              </span>
              <Link to={`/mall?productType=${MallProductType.eContract}`} className='btn'>立即购买</Link>
            </h1>
          </div>
          <div className="member-content">
          <article className="add-sign">
            <div className="sign-pdf" ref="pdfContainer">
              {typeof window !== 'undefined' ?
                <ViewPDF loading={info.id === signId}
                         pdfConfig={{file: this.file, scale: 1, width: 600}}
                         onPageLoad={this.getOriginalSize}
                         operator={{
                           toPrevFunc: this.getPdfIndex,
                           toNextFunc: this.getPdfIndex,
                           turnToFunc: this.getPdfIndex,
                         }}/> : ''}

              {
                this.showSeal && pdfSeals ?
                  pdfSeals.signature.map((item) => {
                      return <div className="seal-wrap" style={{height: height}}>
                        {item.page - 1 === this.state.pageIndex ?
                          <img className="signed-seal" style={{
                            left: (item.posX) * 600, bottom: (item.posY) * height,
                            transform: `scale(${scale})`
                          }} src={item.fileKey} alt=""/> : ''
                        }
                      </div>
                    }
                  ) : ''
              }

              <div className="seal-wrap" style={{height: height}} onDrop={this.onDrop} onDragOver={this.allowDrop}
                   ref="sealWrap">
                {/*{this.state.seals.map(
                 (item, i) => {
                 return item.pageIndex === this.state.pageIndex ?
                 <div key={i} className="img-wrap"
                 style={{
                 position: 'absolute',
                 left: item.left + 'px',
                 top: item.top + 'px',
                 }}>
                 <img src={item.src} style={{
                 transform: `scale(${item.refPageOriginalSize.scale})`
                 }} alt="" onDragStart={this.onDragStart('move', i)}/>
                 <div className="iconfont font-delete" onClick={this.deleteSeal(i)}/>
                 </div> : ''
                 }
                 )}*/}
                {
                  this.state.seals.length > 0 && this.state.seals[this.state.seals.length - 1].pageIndex === this.state.pageIndex ?
                    <div className="img-wrap"
                         style={{
                           position: 'absolute',
                           left: this.state.seals[this.state.seals.length - 1].left + 'px',
                           top: this.state.seals[this.state.seals.length - 1].top + 'px',
                         }}>
                      <img ref="showImg" src={this.state.seals[this.state.seals.length - 1].src} style={{
                        transform: `scale(${scale})`
                      }} alt="" onDragStart={this.onDragStart('move', this.state.seals.length - 1)}/>
                      <div className="iconfont font-delete" onClick={this.deleteSeal(this.state.seals.length - 1)}/>
                    </div> : ''
                }
              </div>
            </div>
            <div className="sign">
              <section className="select-seal">
                <div className="header">
                  <h2>{T.translate("signature.my-seal")}</h2>
                  {
                    seals.userSignature !== "" || seals.default ?
                      <p className="change-seal"
                         onClick={this.openSealsModal}>{T.translate("signature.change-seal")}</p>
                      :
                      <Link to="/signatures/official-seal">
                        <p className="change-seal">{T.translate("signature.upload")}</p>
                      </Link>
                  }
                </div>
                <div className="show-seal">
                  {
                    seals.userSignature !== "" || seals.default ?
                      <Image src={this.defaultSeal.fileKey}
                             onDragStart={this.onDragStart('drag-add', this.defaultSeal.id)}
                             onLoad={this.getSealImgPosition}/>
                      :
                      <p className="please-upload">{T.translate("signature.to-upload")}</p>
                  }
                </div>
              </section>
              <section className="step-describe">
                <h2>{T.translate("signature.seal-progress")}</h2>
                <ul>
                  <li>{T.translate("signature.progress-1")}</li>
                  <li>{T.translate("signature.progress-2")}</li>
                  <li>{T.translate("signature.progress-3")}</li>
                </ul>
              </section>
              <section className="post-seal">
                <button className="blueButton post" type="button"
                        onClick={this.openSmsModal}>{T.translate("signature.submit")}</button>
              </section>
            </div>
          </article>
          </div>
        </div>

        {this.state.showSmsModal ?
          <ModalContainer onClose={this.closeSmsModal}>
            <ModalDialog onClose={this.closeSmsModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("user.hint")}</h1>
              <form>
                <article>
                  <section>
                    <span>{T.translate("member.phone-number")}</span>
                    <div>
                      <span>{user.phoneNumber}</span>
                      <button type="button" className="signature-code"
                              disabled={remainTime[smsType] > 0 ? "disabled" : ""}
                              onClick={e => dispatch(verifySmsCode(user.phoneNumber, smsType, this.props.params['signatureId']))}>
                        {remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
                      </button>
                    </div>
                  </section>
                  <section>
                    <span>{T.translate("common.verify-code")}</span>
                    <ColumnInput placeholder="" type="text" {...FormUtil.extract(smsVerifyCode)}
                                 file={smsVerifyCode}/>
                  </section>
                  <section className="button-group">
                    <span/>
                    <LoadingButton type="button" onClick={this.onSubmit} className="yes"
                                   label={T.translate("common.submit")}
                                   loadingLabel={T.translate("marketing.submiting")}/>
                    <button type="button" className="no"
                            onClick={this.closeSmsModal}>{T.translate("common.cancel")}</button>
                  </section>
                </article>
              </form>
            </ModalDialog>
          </ModalContainer>
          : ""}

        {this.state.showSealsModal ?
          <ModalContainer onClose={this.closeSealsModal}>
            <ModalDialog onClose={this.closeSealsModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("signature.change-seal")}</h1>
              <div className="select-seal-model">
                <div className="seal-list">
                  {
                    seals.default ?
                      <section onClick={e => this.changeDefault(seals.default)}>
                        <img className="seal-pic" src={seals.default.fileKey}/>
                        <p className="seal-name">{seals.default.fileName}</p>
                        {
                          (this.selectSeal.id === seals.default.id) || !this.selectSeal.id ?
                            <div className="default-seal">
                              {T.translate("common.default")}
                            </div>
                            : ""
                        }
                      </section>
                      : ""
                  }
                  {
                    this.userSeal ?
                      this.userSeal.map((item, index) => {
                        return <section key={index} onClick={e => this.changeDefault(item)}>
                          <img className="seal-pic" src={item.fileKey}/>
                          <p className="seal-name">{item.fileName}</p>
                          {
                            this.selectSeal.id === item.id ?
                              <div className="default-seal">
                                {T.translate("common.default")}
                              </div>
                              : ""
                          }
                        </section>
                      })
                      : ""
                  }
                </div>
                <div className="button-group">
                  <button type="button" className="yes"
                          onClick={this.changeSeal}>{T.translate("signature.select-seal")}</button>
                  <Link to="/signatures/official-seal">
                    <button type="button" className="no">{T.translate("signature.add-seal")}</button>
                  </Link>
                </div>
              </div>
            </ModalDialog>
          </ModalContainer>
          : ""}

        {this.state.showDisableModal ?
          <ModalContainer onClose={this.disableModal(false)}>
            <ModalDialog onClose={this.disableModal(false)} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("user.remind")}</h1>
              <form className="confirm">
                <p>{T.translate("signature.not-enough", {type: this.state.signType})}</p>
                <div className="button-group">
                  <Link to={`/mall?productType=${MallProductType.eContract}`}>
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
