import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import { addSignatureSeals, findAllSeals, findSignature, getPdfSeals } from "../../../actions/signatureAction";
import FormValidator from "../../../utils/FormValidator";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import AttestationUtil from "../../../utils/AttestationUtil";
import LanguageUtil from "../../../utils/LanguageUtil";
import FloatModal from "../common/FloatModal";
import FormUtil from "../../../utils/FormUtil";
import { verifySmsCode } from "../../../actions/smsVerifyAction";
import { toastr } from "react-redux-toastr";
import { stopBubbleAndDefault } from "../../../utils/eventPrevent.es";
import push from "../../../utils/push";
import { createSeal } from "../../../actions/signatureAction.es";
import { convertBlobToFile } from "../../../utils/convertBase64UrlToBlob.es";
import SmsType from "../../../utils/SmsType.es";

let MobilePDF, Handwrite;
if (typeof window !== 'undefined') {
  MobilePDF = require("../common/MobilePDF").default;
  Handwrite = require("../common/Handwrite").default;
}

export const fields = ['smsVerifyCode'];

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("smsVerifyCode", T.translate("common.verify-code"))
    .errors
};

@reduxForm({form: 'sign', fields, validate}, state => {
    return {
      ...state.sms,
      user: state.user.info,
      seals: [state.signature.seals.default].concat(state.signature.seals.userSignature),
      info: state.signature.info,
      pdfSeals: state.signature.pdfSeals,
      signId: state.router.params.id,
      location: state.router.location,
    }
  }
)
export default class SignatureSign extends Component {

  data = {title: '签署'};

  state = {
    pageIndex: 0,
    scale: 1,
    originalSize: {},
    showOperator: false,
    showStep1: true,
    signWay: '',
    seal: {},
    seals: [],
    showSeals: false,
    chooseSeals: false,
    selected: 0,
    showModal: false,
  };

  file = '';

  canvasRef = null;
  handwriteWrap = null;

  componentWillMount() {
    let signId = this.props.signId;

    this.props.dispatch(findAllSeals());
    this.props.dispatch(findSignature(signId));
    this.props.dispatch(getPdfSeals(signId));
  }

  getPdfIndex = (val) => {
    this.setState({
      pageIndex: val
    })
  };

  getOriginalSize = (val) => {
    this.setState({
      originalSize: {...val},
      showSeals: true,
      showOperator: true,
    });
  };

  toSign = () => {
    this.setState({showOperator: false, showStep1: false});
  };

  openSmsModal = () => {
    if (this.state.seals[0] && this.state.seals[0].fileKey) this.setState({showModal: true});
    else toastr.error('还没用签章签署，无法提交')
  };

  hideModal = () => {
    this.setState({showModal: false});
  };

  touchStart = (e) => {
    stopBubbleAndDefault(e);
    let touch = e.touches[0];
    this.setState({
      seals: [Object.assign({}, this.state.seal, {
        pageIndex: this.state.pageIndex,
        left: touch.pageX,
        bottom: document.body.scrollHeight - touch.pageY,
        refPageOriginalSize: this.state.originalSize,
      })]
    });
  };

  touchMove = (e) => {
    stopBubbleAndDefault(e);
    let touch = e.touches[0], seals = this.state.seals;
    seals[0].left = touch.pageX;
    seals[0].bottom = document.body.scrollHeight - touch.pageY;
    this.setState({seals})
  };

  touchEnd = (e) => {
    stopBubbleAndDefault(e);
  };

  finalSealsData = () => {
    return this.state.seals.map((item, i) => {
      let pos = this.getPos(item);
      return {
        id: item.id,
        page: item.pageIndex,
        posX: pos.x,
        posY: pos.y,
      }
    });
  };

  getPos = (seal) => {
    let pageSize = {
      width: seal.refPageOriginalSize.width * seal.refPageOriginalSize.scale,
      height: seal.refPageOriginalSize.height * seal.refPageOriginalSize.scale
    }, posX = seal.left, posY = seal.bottom;
    posX -= (this.container.offsetWidth - pageSize.width) / 2;
    posY -= (this.container.offsetHeight - pageSize.height) / 2;
    return {x: posX / pageSize.width, y: posY / pageSize.height};
  };

  setPos = (seal) => {
    let pageSize = {
      width: this.state.originalSize.width * this.state.originalSize.scale,
      height: this.state.originalSize.height * this.state.originalSize.scale
    }, posX = seal.posX, posY = seal.posY;
    posX = posX * pageSize.width + (this.container.offsetWidth - pageSize.width) / 2;
    posY = posY * pageSize.height + (this.container.offsetHeight - pageSize.height) / 2;
    return {left: posX, bottom: posY};
  };

  handwriteOutput = e => {
    stopBubbleAndDefault(e);
    try {
      let base64 = this.canvasRef.toDataURL(),
        name = `签名-${Math.random().toFixed(5).toString().slice(2)}`,
        values = {
          name: name,
          base64
        };
      this.props.dispatch(createSeal(values, seal => {
        this.setState({
          seal: seal.UserSignature,
          showHandwrite: false,
          chooseSeals: false,
          signWay: 'hand'
        })
      }));
    } catch (e) {
      console.error(e);
    }
  };

  handleSign = () => {
    const seals = this.finalSealsData(), seal = seals[seals.length - 1];
    let {fields: {smsVerifyCode}, signId} = this.props;


    this.props.dispatch(addSignatureSeals(signId, {
      smsVerifyCode: smsVerifyCode.value,
      status: 'DONE',
      signature_id: seal.id,
      page: (seal.page + 1).toString(),
      posX: seal.posX,
      posY: seal.posY,
    }, () => {
      this.props.dispatch(push(`/mobile/signatures/${signId}`));
    }))
  };

  render() {
    const {fields: {smsVerifyCode}, seals, info, user, remainTime, dispatch, pdfSeals, signId, location, invalid, pristine} = this.props,
      justShow = location.query.type === 'show', smsType = SmsType.EContract;

    if (info.id === signId) {
      this.file = AttestationUtil.viewSignature(info) + "&lang=" + LanguageUtil.lang;
    }

    return !justShow ?
      <div className="signatures-sign">
        <Header>
          <Back/>
          <span className="title">{this.data.title}</span>
          <span className="back" style={{opacity: 0}}/>
        </Header>
        <article className="sign-container" ref={ref => this.container = ref}>
          {
            typeof window !== 'undefined' ?
              <MobilePDF loading={info.id === signId}
                         pdfConfig={{
                           file: this.file,
                           scale: this.state.scale,
                           width: 325 * window.devicePixelRatio
                         }}
                         pdfContainerClick={bool => this.setState({showStep1: bool})}
                         onPageLoad={this.getOriginalSize}
                         operator={{
                           toPrevFunc: this.getPdfIndex,
                           toNextFunc: this.getPdfIndex,
                           turnToFunc: this.getPdfIndex,
                           showBtn: this.state.showOperator,
                         }}/>
              : ''
          }
          {
            this.state.showSeals && pdfSeals && pdfSeals.signature && pdfSeals.signature.length > 0 ?
              <div className='seals-show'>
                {
                  pdfSeals.signature.filter(item => (item.page - 1) === this.state.pageIndex).map(
                    (item, i) => {
                      let pos = this.setPos(item);
                      return <img key={i} src={item.fileKey} alt=""
                                  style={{
                                    transform: `scale(${this.state.originalSize.scale})`,
                                    left: pos.left,
                                    bottom: pos.bottom
                                  }}/>
                    }
                  )
                }
              </div> : ''
          }
          {
            this.state.seals.length > 0 ?
              <div className='seals-show'>
                {
                  this.state.seals.filter(item => item.pageIndex === this.state.pageIndex).map(
                    (item, i) =>
                      <img key={i} src={item.fileKey} alt=""
                           style={{
                             transform: `scale(${item.refPageOriginalSize.scale})`,
                             left: item.left + 'px',
                             bottom: item.bottom + 'px'
                           }}/>
                  )
                }
              </div> : ''
          }
          {
            this.state.showOperator ?
              this.state.showStep1 ? <button className='btn-to-sign' onClick={this.toSign}>在此页签署</button> : ''
              : this.state.showStep1 ? ''
              : <div className="sign-operator">
                {
                  this.state.signWay !== '' ? [
                    <div key={1} className="tip-sign-way">
                      <div className="sign-way"
                           onClick={e => this.setState({signWay: '', showHandwrite: false, chooseSeals: false,})}>
                        <img src={require('../../../../images/mobile/icon-back.png')} alt=""/>
                      </div>
                    </div>,
                    <div key={2} className="tip-sign-way">
                      <div onClick={this.openSmsModal} className="sign-way btn-submit">确认</div>
                    </div>,
                    this.state.seal.fileKey ?
                      <div key={3} className="seal">
                        <img src={this.state.seal.fileKey}
                             onTouchStart={this.touchStart}
                             onTouchMove={this.touchMove}
                             onTouchEnd={this.touchEnd}
                             alt=""/>
                      </div> : ''
                  ] : [
                    <div key={1} className="tip-sign-way">
                      <div className="sign-way"
                           onClick={e => this.setState({
                             showOperator: true,
                             showHandwrite: false,
                             chooseSeals: false,
                             showStep1: true
                           })}>
                        <img src={require('../../../../images/mobile/icon-back.png')} alt=""/>
                      </div>
                    </div>,
                    <div key={2} className="tip-sign-way">
                      <div className="sign-way"
                           onClick={e => this.setState({chooseSeals: true, showHandwrite: false})}>签章
                      </div>
                    </div>,
                    <div key={3} className="tip-sign-way">
                      <div className="sign-way"
                           onClick={e => this.setState({showHandwrite: true, chooseSeals: false})}>手写
                      </div>
                    </div>
                  ]
                }
              </div>
          }
        </article>
        <div style={{height: this.container ? this.container.scrollHeight : 0}}/>
        {
          this.state.chooseSeals ?
            <section className="seal-choose">
              <h2>签章选择
                <span className="btn" onClick={e => this.setState({
                  seal: seals[this.state.selected],
                  chooseSeals: false,
                  showHandwrite: false,
                  signWay: 'seal'
                })}>确定</span>
              </h2>
              <div className="seals">
                {
                  seals.map(
                    (item, i) =>
                      <section key={i}
                               className={this.state.selected === i ? 'seal selected' : 'seal'}
                               onClick={e => this.setState({selected: i})}>
                        <div className="img-wrap">
                          <img src={item.fileKey} alt=""/>
                        </div>
                        <h3>{item.fileName}</h3>
                      </section>
                  )
                }
              </div>
            </section>
            : ''
        }
        {
          this.state.showHandwrite ?
            <section className='handwrite-wrap'>
              <h2>手写签名
                <span className="btn" onClick={this.handwriteOutput}>确定</span>
              </h2>
              <div className='handwrite'>
                {
                  typeof window !== 'undefined' ?
                    <Handwrite canvasRef={ref => this.canvasRef = ref}
                               parentClientX={0}
                               parentClientY={this.container.offsetHeight + 42 * window.devicePixelRatio - (333 - 40) * window.devicePixelRatio}/>
                    : ''
                }
              </div>
            </section> : ''
        }

        <FloatModal show={this.state.showModal} confirmFn={this.handleSign} closeFn={this.hideModal}
                    confirmText='确认签署' confirmDisabled={invalid || pristine}>
          <div className="code">
            <span className="tip">请输入{user.phoneNumber}的验证码</span>
            <div className="input-wrap">
              <input type="number" {...FormUtil.extract(smsVerifyCode)}/>
              <button className="signature-code" disabled={remainTime[smsType] > 0 ? "disabled" : ""}
                      onClick={e => dispatch(verifySmsCode(user.phoneNumber, smsType, info.id))}>
                {remainTime[smsType] > 0 ? (`${remainTime[smsType]}` + T.translate("common.reset-sms")) : T.translate("common.send-sms")}
              </button>
            </div>
          </div>
        </FloatModal>
      </div>

      : <div className="signatures-sign">
        <Header>
          <Back/>
          <span className="title">{this.data.title}</span>
          <span className="back" style={{opacity: 0}}/>
        </Header>
        <article className="sign-container" ref={ref => this.container = ref}>
          {
            typeof window !== 'undefined' ?
              <MobilePDF loading={info.id === signId}
                         pdfConfig={{
                           file: this.file,
                           scale: this.state.scale,
                           width: 325 * window.devicePixelRatio
                         }}
                         pdfContainerClick={bool => this.setState({showStep1: bool})}
                         onPageLoad={this.getOriginalSize}
                         operator={{
                           toPrevFunc: this.getPdfIndex,
                           toNextFunc: this.getPdfIndex,
                           turnToFunc: this.getPdfIndex,
                           showBtn: this.state.showOperator,
                         }}/>
              : ''
          }
          {
            this.state.showSeals && pdfSeals.signature && pdfSeals.signature.length > 0 ?
              <div className='seals-show'>
                {
                  pdfSeals.signature.filter(item => (item.page - 1) === this.state.pageIndex).map(
                    (item, i) => {
                      let pos = this.setPos(item);
                      return <img key={i} src={item.fileKey} alt=""
                                  style={{
                                    transform: `scale(${this.state.originalSize.scale})`,
                                    left: pos.left,
                                    bottom: pos.bottom
                                  }}/>
                    }
                  )
                }
              </div> : ''
          }
        </article>
      </div>
  }
}