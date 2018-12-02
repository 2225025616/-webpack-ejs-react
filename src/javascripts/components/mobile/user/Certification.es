import React, { Component } from "react";
import Header from "../common/Header";
import NavMenu from "../common/NavMenu";
import { reduxForm } from "redux-form";
import FormValidator from "../../../utils/FormValidator";
import { getKyc, updateKyc } from "../../../actions/userAction";
import FormUtil from "../../../utils/FormUtil";
import { isAndroid, isWeiXin } from "../../../utils/UserAngent";
import Image from "../../commons/Image";
import Back from "../common/Back";

const fields = ['realName', 'idCard', "idCardFront", "idCardBack"];

const validate = values => {
  return new FormValidator(values)
    .realName("realName", '实名认证')
    .idCard("idCard", '身份证号码')
    .nonEmpty("idCardFront", "身份证正面照片")
    .nonEmpty("idCardBack", "身份证背面照片")
    .errors;
};

const getInitialValues = state => {
  return {
    ...state.user.kyc,
  };
};

@reduxForm({form: 'user_kyc', fields, validate},
  state => {
    return {
      initialValues: {
        ... getInitialValues(state)
      },
      user: state.user.kyc,

      onSubmit: (values, dispatch) => {
        dispatch(updateKyc(FormUtil.trimStringImage(values, "idCardFront", "idCardBack"), () => {
          dispatch(getKyc());
        }));
      }
    }
  })
export default class Certification extends Component {

  data = {
    title: '实名认证'
  };

  componentWillMount() {
    this.props.dispatch(getKyc());
  }

  needCapture = () => {
    return isWeiXin() && isAndroid();
  };

  render() {
    const {fields: {realName, idCard, idCardFront, idCardBack}, invalid, user, handleSubmit} = this.props,
      needCapture = this.needCapture();

    return <div className="user-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      {
        user.status === 'PASS' ?
          [
            <div className="banner">
              <p>{user.status === 'PASS' ? '身份信息已认证' : '身份信息未认证'}</p>
            </div>,
            <div className="common-container" style={{minHeight: 'calc(100vh - 16.2rem)'}}>
              <div className="sub-nav">
                <section className="item">真实姓名 <span>{user.realName}</span></section>
                <section className="item">身份证号码 <span>{user.idCard}</span></section>
                {/*<section className="item">身份证正面
                 <label className="img">
                 <Image altSrc={require('../../../../images/mobile/user/add.png')}
                 src={FormUtil.imageSrc(idCardFront)}
                 className={!idCardFront.value ? 'add' : ''} alt=""/>
                 </label>
                 </section>
                 <section className="item">身份证反面
                 <label className="img">
                 <Image altSrc={require('../../../../images/mobile/user/add.png')}
                 src={FormUtil.imageSrc(idCardBack)}
                 className={!idCardBack.value ? 'add' : ''} alt=""/>
                 </label>
                 </section>*/}
              </div>
              <p className="tips">注：当前账号已认证，认证完成后资料暂不可修改，如需修改，请联系客服。</p>
            </div>
          ] : <form className="common-container" onSubmit={handleSubmit}>
          <div className="sub-nav">
            <section className="item">真实姓名
              <input placeholder="请输入您的真实姓名" type="text" {...realName}/>
            </section>
            <section className="item">身份证号码
              <input placeholder="请输入您的身份证号" type="text" {...idCard}/>
            </section>
            <section className="item">身份证正面
              <label htmlFor="front" className="img">
                <Image altSrc={require('../../../../images/mobile/user/add.png')} src={FormUtil.imageSrc(idCardFront)}
                       className={!idCardFront.value ? 'add' : ''} alt=""/>
                {
                  needCapture ?
                    <input type="file" accept='image/*' capture="camera"
                           id="front" {...FormUtil.ignoreFileUrl(idCardFront,this)} hidden multiple/>
                    : <input type="file" accept='image/jpeg,image/gif,image/png'
                             id="front" {...FormUtil.ignoreFileUrl(idCardFront,this)} hidden/>
                }
              </label>
            </section>
            <section className="item">身份证反面
              <label htmlFor="back" className="img">
                <Image altSrc={require('../../../../images/mobile/user/add.png')} src={FormUtil.imageSrc(idCardBack)}
                       className={!idCardBack.value ? 'add' : ''} alt=""/>
                {
                  needCapture ?
                    <input type="file" accept='image/*' capture="camera"
                           id="back" {...FormUtil.ignoreFileUrl(idCardBack,this)}
                           hidden multiple/>
                    : <input type="file" accept='image/jpeg,image/gif,image/png'
                             id="back" {...FormUtil.ignoreFileUrl(idCardBack,this)} hidden/>
                }
              </label>
            </section>
          </div>
          <div style={{margin: '0 1.5rem'}}>
            <button type='submit' className={`action ${invalid ? 'btn-disabled' : ''}`} disabled={invalid}>确认提交</button>
          </div>
          <p className="tips">注：认证完成后资料暂不可修改，如需修改，请联系客服。</p>
        </form>
      }
    </div>
  }
}