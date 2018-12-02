import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import FormValidator from "../../../utils/FormValidator";
import { reduxForm } from "redux-form";
import FormUtil from "../../../utils/FormUtil";
import Image from "../../commons/Image";
import T from "i18n-react";
import { isAndroid, isWeiXin } from "../../../utils/UserAngent";
import { createSeal } from "../../../actions/signatureAction";
import push from "../../../utils/push";

const fields = ["name", "file"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("signature.seal-remark"))
    .nonEmpty("file", T.translate("common.no-empty"))
    .errors;
};

@reduxForm({form: "seal-add", fields, validate},
  state => ({
    seals: state.signature.seals,
  })
)
export default class SignatureSealAdd extends Component {

  data = {title: '添加签章'};

  needCapture = () => {
    return isWeiXin() && isAndroid();
  };

  addSeal = e => {
    e.preventDefault();
    const {fields: {name, file}} = this.props;
    let values = {
      name: name.value,
      file: file.value
    };
    this.props.dispatch(createSeal(FormUtil.trimStringImage(values, "file"), () => {
      this.props.dispatch(push('/mobile/signatures/seals'));
    }));
  };

  render() {
    const {fields: {name, file}, invalid} = this.props, needCapture = this.needCapture();
    return <div className="signatures-seal product-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      <form onSubmit={this.addSeal} className="form">
        <div className="sub-items">
          <section className="item">签章名称
            <input placeholder="请输入签章名称" type="text" {...FormUtil.extract(name)} ref="input"/>
          </section>
          <section className="item">签章
            <label htmlFor="seal" className="img">
              <Image altSrc={require('../../../../images/mobile/user/add.png')} src={FormUtil.imageSrc(file)}
                     className={!file.value ? 'add' : ''} alt=""/>
              {
                needCapture ?
                  <input type="file" accept='image/*'
                         id="seal" {...FormUtil.ignoreFileUrl(file, this)} hidden multiple/>
                  : <input type="file" accept='image/png'
                           id="seal" {...FormUtil.ignoreFileUrl(file, this)} hidden/>
              }
              <span className='tip'>请上传png格式图片</span>
            </label>
          </section>
        </div>
        <button type='submit' className="btn" disabled={invalid}>确认添加</button>
      </form>
    </div>
  }
}