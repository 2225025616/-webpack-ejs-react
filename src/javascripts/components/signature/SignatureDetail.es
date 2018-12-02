import React, { Component } from "react";
import Formatter from "../../lib/formatter";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import IdUtil from "../../utils/IdUtil";
import push from "../../utils/push";
import Link from "../commons/LangLink";
import { findSignature, refuseSignature } from "../../actions/signatureAction";
import StorageUtil from "../../utils/StorageUtil";
import SignatureStatus from "../../constants/SignatureStatus";
import AttestationUtil from "../../utils/AttestationUtil";
import LanguageUtil from "../../utils/LanguageUtil";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { verifySmsCode } from "../../actions/smsVerifyAction";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import ColumnInput from "../commons/ColumnInput";
import SmsType from "../../utils/SmsType.es";
import BackMenu from "../commons/BackMenu";

export const fields = ['smsVerifyCode'];

const validate = values => {
  return (new FormValidator(values))
    .verifyCode("smsVerifyCode", T.translate("common.verify-code"))
    .errors
};


@reduxForm({form: 'deleteSign', fields, validate}, state => {
    return {
      ...state.sms,
      info: state.signature.info,
      params: state.router.params,
      user: state.user.info,
    }
  }
)

export default class SignatureDetail extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    showRefuseModal: false,
  };

  componentDidMount() {
    let signatureId = IdUtil.signatureId(this.props);
    this.handleShowSignature(signatureId);
  }

  openRefuseModal = () => {
    this.setState({showRefuseModal: true});
  };

  closeRefuseModal = () => {
    this.setState({showRefuseModal: false});
  };

  handleShowSignature = (signatureId) => {
    this.props.dispatch(findSignature(signatureId));
  };

  toNotary(items) {
    StorageUtil.selectedAttestations(items);
    this.props.dispatch(push('/notarization'));
  }

  handleToNotary = (item) => {
    this.toNotary([item]);
  };

  changeStyle = (index, length, status, signStatus) => {
    if (signStatus === 'WAIT' || signStatus === 'INIT')
      return 'last';
    else {
      if (length === index + 1 && status === 'DONE')
        return 'finished';
    }
  };

  progress = (status, index, length) => {
    if (index === 0) {
      return status === 'DONE' ? T.translate("signature.start") : T.translate("signature.wait-sign");
    } else {
      if (status === 'DONE')
        return length === index + 1 ? T.translate("signature.finished-sign") : T.translate("signature.sign");
      else {
        switch (status) {
          case 'WAIT':
            return T.translate("signature.wait-sign");
          case 'CANCEL':
            return T.translate("signature.cancel-sign");
          case 'REJECT':
            return T.translate("signature.reject-sign");
          case 'EXPIRE':
            return T.translate("signature.outside");
        }
      }
    }
  };

  cancel = () => {
    let {fields: {smsVerifyCode}, info} = this.props;

    this.props.dispatch(refuseSignature(info.id, {
      status: info.isCreator === true ? "CANCEL" : "REJECT",
      smsVerifyCode: smsVerifyCode.value
    }, () => {
      this.props.dispatch(findSignature(info.id));
      this.closeRefuseModal();
    }));
  };

  render() {
    let {fields: {smsVerifyCode}, remainTime, dispatch, info, user} = this.props,
      smsType = SmsType.EContract,
      date = Formatter.get("yyyy年mm月dd日"),
      fmt = Formatter.get("yyyy/mm/dd hh:MM:ss");

    return <div className="container-wrapper">
      <div className="container member-container">
        <div className="signature-detail">
          <BackMenu title={T.translate("signature.view-sign")}/>
          <div className="member-content">
          <article>
            <h2>{T.translate("signature.work-management")}</h2>
            <div className="detail">
              <section className="status">
                <span>{SignatureStatus.toStatus(info.status)}</span>
                {/* <span className="wait-count">1</span> */}
              </section>
              <hr/>
              <section>
                {
                  info.endDate === "" ? T.translate("signature.forever")
                    : <p>{date.format(info.startDate)}
                      <span className="to">{T.translate("signature.to")}</span>
                      {date.format(info.endDate)}
                    </p>
                }
              </section>
              <hr/>
              <section className="operate">
       {/*         {
                  info.status === "WAIT_ME" || info.status === "DRAFT" ?
                    [
                      <Link to={`/signatures/${info.id}/add-seal`}>
                        <button>{T.translate("signature.to-sign")}</button>
                      </Link>,
                      info.isCreator === true ? ""
                        : <button onClick={this.openRefuseModal} className="refuse-sign">
                          {T.translate("signature.reject")}</button>
                    ] : ""
                }*/}
         {/*       {
                  (info.status === "DRAFT" || info.status === "WAIT_ME" || info.status === "WAIT_OTHERS") && info.isCreator === true ?
                    <button onClick={this.openRefuseModal}
                            className="refuse-sign">{T.translate("signature.cancel")}</button>
                    : ""
                }*/}
                <a target="blank" href={AttestationUtil.getSignDownloadUrl(info) + "&lang=" + LanguageUtil.lang}>
                  <button className="download">{T.translate("common.download")}</button>
                </a>
                <a target="blank" href={AttestationUtil.viewSignature(info) + "&lang=" + LanguageUtil.lang}>
                  <button>{T.translate("signature.view")}</button>
                </a>
              </section>
            </div>
          </article>
          <article>
            <h2>{T.translate("signature.info")}</h2>
            {
              info.status === "CANCEL" || info.status === "REJECT" || info.status === "EXPIRE" ?
                <div className="contract-progress">
                  {
                    info.signList.map((item, index) => {
                      return <section className="last">
                        <p className="status">{this.progress(item.status, index, info.signList.length)}</p>
                        <div className="progress-detail">
                          <p className="info">
                            <span>{item.name}</span>
                            <span className="phone">{item.phoneNumber}</span>
                          </p>
                          {
                            item.status !== 'WAIT' ?
                              <p>{T.translate("signature.times-map")}：{fmt.format(item.createdAt)}</p>
                              : ""
                          }
                        </div>
                      </section>
                    })
                  }
                  {
                    info.status === "EXPIRE" ?
                      <section className="last">
                        <p className="status">{T.translate("signature.outside")}</p>
                        <div className="progress-detail">
                          <p>{T.translate("signature.outside-time")}{fmt.format(info.endDate)}</p>
                        </div>
                      </section>
                      : ''
                  }
                </div>
                :
                <div className="contract-progress">
                  {
                    info.signList.map((item, index) => {
                      return <section
                        className={this.changeStyle(index, info.signList.length, info.status, item.status)}>
                        <p className="status">{this.progress(item.status, index, info.signList.length)}</p>
                        <div className="progress-detail">
                          <p className="info">
                            <span>{item.name}</span>
                            <span className="phone">{item.phoneNumber}</span>
                          </p>
                          {
                            item.status === 'DONE' ?
                              <p>{T.translate("signature.times-map")}：{fmt.format(item.createdAt)}</p>
                              : ""
                          }
                        </div>
                      </section>
                    })
                  }
                </div>
            }
          </article>
          {
            info.status === "DONE" ?
              <article>
                <h2>{T.translate("signature.attestation")}</h2>
                <div className="contract">
                  <div className="contract-detail">
                    <img
                      src={require("images/components/pdf.png")}/>
                    <div>
                      <p className="title">{info.fileName}</p>
                      <p>
                        <span>{info.size}</span>
                        <span className="time">{fmt.format(info.startDate)}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/attestations/${info.attestationMap.id}`}>
                      <button>{T.translate("common.details")}</button>
                    </Link>
            {/*        <button className="to-notary"
                            onClick={e => this.handleToNotary(info.attestationMap)}>{T.translate("attestation.notary")}</button>*/}
                  </div>
                </div>
              </article> : ""
          }
          </div>
        </div>

        {this.state.showRefuseModal ?
          <ModalContainer onClose={this.closeRefuseModal}>
            <ModalDialog onClose={this.closeRefuseModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{info.isCreator === true ? T.translate("signature.cancel-sign") : T.translate("signature.reject-sign")}</h1>
              <form>
                <article>
                  <section>
                    <span>{T.translate("member.phone-number")}</span>
                    <div>
                      <span>{user.phoneNumber}</span>
                      <button type="button" className="signature-code"
                              disabled={remainTime[smsType] > 0 ? "disabled" : ""}
                              onClick={e => dispatch(verifySmsCode(user.phoneNumber, smsType, info.id))}>
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
                    <button type="button" className="yes"
                            onClick={this.cancel}>{info.isCreator === true ? T.translate("signature.cancel") : T.translate("signature.reject")}</button>
                    <button type="button" className="no"
                            onClick={this.closeRefuseModal}>{T.translate("common.cancel")}</button>
                  </section>
                </article>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>
    </div>
  }
}
