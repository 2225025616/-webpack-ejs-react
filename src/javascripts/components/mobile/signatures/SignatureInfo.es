import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import Link from "../../commons/LangLink";
import { findSignature, refuseSignature } from "../../../actions/signatureAction";
import { reduxForm } from "redux-form";
import FormValidator from "../../../utils/FormValidator";
import T from "i18n-react";
import statusUtil from "./statusUtil";
import Formatter from "../../../lib/formatter";
import FloatModal from "../common/FloatModal";
import FormUtil from "../../../utils/FormUtil";
import { verifySmsCode } from "../../../actions/smsVerifyAction";
import StorageUtil from "../../../utils/StorageUtil";
import push from "../../../utils/push";
import { getBalance } from "../../../actions/userAction.es";
import MallProductType from "../../../utils/MallProductType.es";
import SmsType from "../../../utils/SmsType.es";

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
      user: state.user.info,
      id: state.router.params.id,
      balanceHolder: state.user.balanceHolder,
    }
  }
)
export default class SignatureInfo extends Component {

  data = {
    title: '保全签列表'
  };

  state = {
    show: false,
    type: '',
    showDisableModal: false,
    signType: '',
  };

  componentWillMount() {
    let signatureId = this.props.id;
    this.handleShowSignature(signatureId);
    this.props.dispatch(getBalance());
  }

  handleShowSignature = (signatureId) => {
    this.props.dispatch(findSignature(signatureId));
  };

  changeStyle = (i, length, status, signStatus) => {
    if (signStatus === 'WAIT' || signStatus === 'INIT')
      return 'last';
    else {
      if (length === i + 1 && status === 'DONE')
        return 'finished';
    }
  };

  progress = (status, i, length) => {
    if (length === i + 1) {
      return status === 'DONE' ? T.translate("signature.start") : T.translate("signature.wait-sign");
    } else {
      if (status === 'DONE')
        return i === 0 ? T.translate("signature.finished-sign") : T.translate("signature.sign");
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

  cancelSign = () => {
    let {fields: {smsVerifyCode}, info} = this.props;

    this.props.dispatch(refuseSignature(info.id, {
      status: info.isCreator === true ? "CANCEL" : "REJECT",
      smsVerifyCode: smsVerifyCode.value
    }, () => {
      this.props.dispatch(findSignature(info.id));
      this.setState({show: false});
    }));
  };

  showModal = (type) => {
    return e => {
      this.setState({show: true, type});
    }
  };

  hideModal = () => {
    this.setState({show: false});
  };

  toNotary(items) {
    return e => {
      StorageUtil.selectedAttestations(items);
      this.props.dispatch(push('/mobile/notaries/add'));
    }
  }

  toSign = () => {
    const {balanceHolder, info} = this.props,
      count = balanceHolder.econtract || {},
      perCount = count.free + (count.nofree ? count.nofree.per : 0),
      orgCount = (count.nofree ? count.nofree.org : 0);
    if (info.signType === 'personal') {
      if (!perCount) return this.disableModal(true, T.translate('signature.personal-sign'))();
    } else {
      if (!orgCount) return this.disableModal(true, T.translate('signature.org-sign'))();
    }
    this.confirmModal(true)();
  };

  disableModal = (showDisableModal, signType) => () => this.setState({showDisableModal, signType});

  confirmModal = (showConfirmModal) => () => this.setState({showConfirmModal});

  toBuy = () => {
    this.props.dispatch(push(`/mobile/mall?productType=${MallProductType.eContract}`))
  };

  sign = () => {
    const {dispatch, id} = this.props;
    dispatch(push(`/mobile/signatures/${id}/sign`));
  };

  render() {
    const {id, info, user, remainTime, dispatch, fields: {smsVerifyCode}} = this.props,
      fmt = Formatter.get('yyyy-mm-dd'),
      fmt1 = Formatter.get('hh:MM'), signList = Object.assign([], info.signList),
      smsType = SmsType.EContract;

    return <div className="signatures-info">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        {
          info.status === 'DRAFT' || info.status === 'WAIT_ME' ?
            < span className='back' style={{opacity: 0}}/>
            : < Link to={`/mobile/signatures/${id}/sign?type=show`} className='link'>查看合同</Link>
        }
      </Header>
      <section className="signature">
        <img src={statusUtil.getIcon(info.status)} alt=""/>
        <div className="text">
          <h3>{info.title}
            <span style={{color: statusUtil.getColor(info.status)}}>{statusUtil.getStatus(info.status)}</span></h3>
          <time>文件期限：{fmt.format(info.endAt) || '长期有效'}</time>
          <p>{info.remarks}</p>
        </div>
      </section>
      {
        info.status !== 'DRAFT' ?
          <div className="sign-flow">
            {
              info.status === "EXPIRE" ?
                <section className="last" style={{color: statusUtil.getColor(info.status)}}>
                  <div className="time">
                    <span className="hour">{fmt1.format(info.endDate)}</span>
                    <span className="date">{fmt.format(info.endDate)}</span>
                  </div>
                  <div className="progress-detail">
                    <h3 className="status status-cancel">{T.translate("signature.outside")}</h3>
                  </div>
                </section>
                : ''
            }
            {
              signList.reverse().map(
                (item, i) =>
                  <section key={i} className="last"
                           style={i === 0 && info.status !== 'EXPIRE' ? {color: statusUtil.getColor(info.status)} : {}}>
                    <div className="time">
                      {
                        item.status !== 'WAIT' ? [
                          <span className="hour">{fmt1.format(item.createdAt)}</span>,
                          <span className="date">{fmt.format(item.createdAt)}</span>
                        ] : ''
                      }
                    </div>
                    <div className="progress-detail">
                      <h3 className={i === 0 && info.status !== 'EXPIRE'
                        ? "status " + statusUtil.getClass(info.status) : 'status'}>{this.progress(item.status, i, info.signList.length)}</h3>
                      <p className="info">
                        <span>{item.name}</span>
                        <span className="phone">{item.phoneNumber}</span>
                      </p>
                    </div>
                  </section>
              )
            }
          </div>
          : ''
      }
      <div className="bottom-btn">
        {
          info.status === 'DRAFT' ?
            <span className="btn" onClick={this.toSign}>发送</span>
            : info.status === 'WAIT_ME' ? [
              <Link to={`/mobile/signatures/${id}/sign`} className="btn">签署</Link>,
              <button className="btn red" onClick={this.showModal('驳回')}>驳回</button>
            ] : info.status === 'WAIT_OTHERS' ?
            <button className="btn red" onClick={this.showModal('撤销')}>撤销</button>
            : info.status === 'DONE' ? [
              <Link to={`/mobile/attestations/${info.attestationMap.id}`} className="btn">查看保全</Link>,
              <button onClick={this.toNotary([info.attestationMap])} className="btn green">申请出证</button>
            ] : ''
        }
      </div>

      <FloatModal show={this.state.show} confirmFn={this.cancelSign} closeFn={this.hideModal}
                  confirmText={this.state.type}>
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
      <FloatModal show={this.state.showDisableModal} confirmFn={this.toBuy} closeFn={this.disableModal(false)}
                  confirmText={'去购买'}>
        <p className='do-tip'>您的{this.state.signType}次数不够了，去购买吧</p>
      </FloatModal>
      <FloatModal show={this.state.showConfirmModal} confirmFn={this.sign} closeFn={this.confirmModal(false)}
                  confirmText={'去签署'}>
        <p className='do-tip'>签署完成后将自动发送</p>
      </FloatModal>
    </div>
  }
}