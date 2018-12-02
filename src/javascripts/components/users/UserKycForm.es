import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getKyc, updateKyc } from "../../actions/userAction";
import FormUtil from "../../utils/FormUtil";
import Image from "../commons/Image";
import FormValidator from "../../utils/FormValidator";
import LoadingButton from "../commons/LoadingButton";

const fields = ["realName", "idCard", "idCardFront", "idCardBack"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("realName", "真实姓名")
    .nonEmpty("idCard", "身份证号")
    .nonEmpty("idCardFront", "身份证正面照片")
    .nonEmpty("idCardBack", "身份证背面照片")
    .errors;
};

@reduxForm({form: "user_kyc", fields, validate}, state => {
  return {
    initialValues: state.user.kyc,
    onSubmit: (values, dispatch) => {
      dispatch(updateKyc(FormUtil.trimStringImage(values, "idCardFront", "idCardBack")));
    }
  }
})
class UserKycForm extends Component {
  componentWillMount() {
    this.props.dispatch(getKyc());
  }

  render() {
    const {fields: {realName, idCard, idCardFront, idCardBack}, handleSubmit} = this.props;

    return <div className="container-wrapper">
      <div className="container panel-body realname-apply">
        <form onSubmit={handleSubmit} className="simple_form center-block auth-form" noValidate="novalidate"
              id="new_kyc">
          <h3>实名认证</h3>
          <div className="form-group">
            <label className="control-label" htmlFor="realName">真实姓名</label>
            <div className="input string required kyc_name">
              <input className="string required form-control" placeholder="请输入你的真实姓名" type="text" {...realName}/>
            </div>
            {FormUtil.error(realName)}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="pid">身份证号</label>
            <div className="input string required kyc_pid">
              <input className="string required form-control"
                     placeholder="请输入你的身份证号" type="text" {...idCard}/></div>
            {FormUtil.error(idCard)}
          </div>

          <label className="control-label">上传身份证正面</label>
          <div className="kyc-picture">
            <Image
              altSrc={require("images/kyc-frontend.png")}
              src={FormUtil.imageSrc(idCardFront)}/>
          </div>
          <p className="upload-p">你可以选择png/jpg格式的图像</p>
          <div className="input-group-btn">
            <button type="button" tabIndex="500"
                    title="Abort ongoing upload"
                    className="btn btn-default hide fileinput-cancel fileinput-cancel-button"/>
          </div>

          <div className="form-group">
            <div tabIndex="500" className="btn btn-primary upload-kyc">
              <span className="hidden-xs">身份证正面</span>
              <input className="file optional form-control upload-file-kyc"
                     type="file" { ... FormUtil.ignoreFileUrl(idCardFront, this)}/>
            </div>
            {FormUtil.error(idCardFront)}
          </div>

          <label className="control-label">上传身份证反面</label>
          <div className="kyc-picture">
            <Image altSrc={require("images/kyc-backend.png")}
                   src={FormUtil.imageSrc(idCardBack)}/>
          </div>
          <p className="upload-p">你可以选择png/jpg格式的图像</p>
          <div className="input-group-btn">
            <button type="button" tabIndex="500"
                    title="Abort ongoing upload"
                    className="btn btn-default hide fileinput-cancel fileinput-cancel-button"/>
          </div>

          <div className="form-group">
            <div tabIndex="500" className="btn btn-primary upload-kyc">
              <span className="hidden-xs">身份证反面</span>
              <input className="file optional form-control upload-file-kyc"
                     type="file" { ... FormUtil.ignoreFileUrl(idCardBack, this)}/>
            </div>
            {FormUtil.error(idCardBack)}
          </div>

          <LoadingButton className="btn btn-primary" type="submit" style={{width: "40%"}} label="提交"
                         loadingLabel="提交中..."/>
          <div className="label-tip">
            <i>人工审核一般要1～2个工作日</i>
          </div>
        </form>
      </div>
    </div>
  }
}

export default UserKycForm;
