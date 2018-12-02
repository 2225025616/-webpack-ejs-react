import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import { reduxForm } from "redux-form";
import { bindEmail } from "../../../actions/userAction";
import FormValidator from "../../../utils/FormValidator";
import Link from "../../commons/LangLink";

const fields = ['email'];

const validate = values => {
  return new FormValidator(values)
    .email("email", '邮箱')
    .errors;
};

@reduxForm({form: 'email-bound', fields, validate},
  state => {
    return {
      user: state.user.info,
    }
  })
export default class EmailBound extends Component {

  data = {
    title: '绑定邮箱'
  };

  handleBindEmail = e => {
    e.preventDefault();
    this.props.dispatch(bindEmail(this.props.fields.email.value, () => {
    }));
  };

  render() {
    const {fields: {email}, user, invalid} = this.props;
    return <div className="user-common">
      <Header >
        <Back />
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      {
        !user.id ?
          <div className="form">
            <Link to='/mobile/sign-in' className="warning">请先登录</Link>
          </div>
          : <form onSubmit={this.handleBindEmail}>
          <input placeholder='请输入常用邮箱' type="text" {...email}/>
          <button type='submit' className={`action ${invalid ? 'btn-disabled' : ''}`}
                  disabled={invalid}>确认绑定
          </button>
        </form>
      }
    </div>
  }
}