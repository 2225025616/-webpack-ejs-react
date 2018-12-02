import React, { Component } from "react";
import { reduxForm } from "redux-form";
import FormUtil from "../../utils/FormUtil";
import TableCtn from "./TableCtn";
import { findTemplate } from "../../actions/adminAction";

const fields = ["templateId"];
const validate = values => {
  return ""
};

@reduxForm(
  {form: "templateForm", fields, validate},
  state => {
    return {
      template: state.admin.template,
      onSubmit: (values, dispatch) => {
        dispatch(findTemplate(values.templateId));
      }
    };
  }
)

export default class ResetTemplateState extends Component {
  static STATE_NAMES = {
    DRAFT: "草稿",
    INITIAL: "新建",
    IN_REVIEW: "审核中",
    APPROVED: "同意",
    REJECTED: "拒绝",
    OFFLINE: "离线"
  };

  constructor(props) {
    super(props);
  };

  render() {
    let {fields: {templateId}, template, handleSubmit} = this.props;
    return <div id="template-reset">
      <div className="title">模板状态重置</div>

      <form onSubmit={handleSubmit} className="search-template">
        <label>模板 ID</label>
        <input type="text"
               placeholder="请输入模板ID" {...FormUtil.extract(templateId)}/>
        <button type="submit">查询</button>
      </form>

      <div className="show-template">
        <table className="admin-table">
          <thead>
          <tr>
            <th>模板ID</th>
            <th>模板标题</th>
            <th>来源产品</th>
            <th>来源平台</th>
            <th>模板状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
            {template.id ? <TableCtn template={template} type={ResetTemplateState.STATE_NAMES}/> : ''}
          </tbody>
        </table>
      </div>
    </div>
  }

}

