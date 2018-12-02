import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { createSignatureMember } from "../../../actions/signatureAction";
import Header from "../common/Header";
import Back from "../common/Back";
import push from "../../../utils/push";
import FormUtil from "../../../utils/FormUtil";
import FormValidator from "../../../utils/FormValidator";
import { findSignatureMember, updateSignatureMember } from "../../../actions/signatureAction.es";

const fields = ["phone", "name"];
const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", "姓名")
    .phoneNumber("phone", "帐号")
    .errors;
};

const getInitialValues = state => {
  return state.router.params.id ? {
    name: state.signature.member.linkName,
    phone: state.signature.member.linkPhone,
  } : {}
};

@reduxForm(
  {form: "signatureMemberForm", fields, validate},
  state => {
    return {
      initialValues: {
        ...getInitialValues(state)
      },
      params: state.router.params,
      isEdit: !!state.router.params.id,

      onSubmit: (values, dispatch) => {
        let id = state.router.params.id;
        if (!id)
          dispatch(createSignatureMember({...values}, "mobile", () => {
            dispatch(push(`/mobile/signatures/members`));
          }));
        else
          dispatch(updateSignatureMember(id, {...values}, () => {
            dispatch(push(`/mobile/signatures/members`));
          }));
      }
    };
  })


export default class SignatureMemberEdit extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    const id = this.props.params.id;
    if (id) this.props.dispatch(findSignatureMember(id));
  };

  render() {
    const {fields: {phone, name}, isEdit, invalid} = this.props;

    return <div className="add-signatures product-common">
      <Header>
        <Back/>
        <span className="title">{isEdit ? '编辑签署人' : '新建签署人'}</span>
        <span className="back" style={{opacity: 0}}/>
      </Header>
      <form onSubmit={this.props.handleSubmit}>
        <article className="add-member-info">
          <section>
            <span className="item-name">姓名</span>
            <input placeholder="请填写姓名" {...FormUtil.extract(name)}/>
          </section>
          <section>
            <span className="item-name">账号</span>
            <input placeholder="请输入手机号" {...FormUtil.extract(phone)}/>
          </section>
        </article>
        <button type="submit" className={`submit-member ${invalid ? 'btn-disabled' : ''}`} disabled={invalid}>
          {isEdit ? '确认修改' : '确认添加'}
        </button>
      </form>
    </div>
  }
}