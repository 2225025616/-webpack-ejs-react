import React, { Component } from "react";
import { reduxForm } from "redux-form";
import LoadingButton from "../commons/LoadingButton";
import FormUtil from "../../utils/FormUtil";
import { findRequest } from "../../actions/adminAction";

const fields = ["organizationId", "requestId"];

const validate = values => {
  return ""
};

@reduxForm(
  {form: "requestForm", fields, validate},
  state => {
    return {
      request: state.admin.request,
      onSubmit: (values, dispatch) => {
        dispatch(findRequest(values.organizationId, values.requestId));
      }
    };
  }
)
export default class AdminApiRequest extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    let {fields: {requestId, organizationId}, request, handleSubmit} = this.props;

    return <div id="api-request">
      <div className="title">客户API请求管理</div>
      
      <div className="search-api">
        <p className="api-title">查看API请求</p>
        <form onSubmit={handleSubmit} className="api-form">
          <div className="form-item">
            <label>RequestId</label>
            <input type="text" className="form-control"
                   placeholder="请输入RequestId" {...FormUtil.extract(requestId)} />
          </div>
          <div className="form-item">
            <label>OrganizationId</label>
            <input type="text" className="form-control"
                   placeholder="请输入organizationId" {...FormUtil.extract(organizationId)} />
          </div>
          <LoadingButton type="submit" loadingLabel="查询中..." label="查询"/>
        </form>
      </div>
      
      <div className="payload">
        {request.payload}
      </div>
    </div>

  }
}
