import React, { Component } from "react";
import { reduxForm } from "redux-form";
import ColumnInput from "../commons/ColumnInput";
import Image from "../commons/Image";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import { addPackage, getPackageDetail } from "../../actions/adminAction";
import AdminRoute from '../admins/AdminRoute';
import IdUtil from "../../utils/IdUtil";
import StorageUtil from "../../utils/StorageUtil";
import push from "../../utils/push";
import Link from "../commons/LangLink";

const fields = ["name", "amount", "usedCount", "expiryDate", "productType", "object"];

let id = "";

const validate = values => {
  return new FormValidator(values)
    .chineseLength("name", "套餐名称")
    .money("amount", "套餐价格")
    .positiveInteger("usedCount", "次数")
    .positiveInteger("expiryDate", "有效期")
    .errors;
};

const getInitialValues = state => {
  if (!IdUtil.packageId(state.router)) {
  }
  else
    return {
      ...state.admin.packageItem,
    };
};

@reduxForm({form: "add-new", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    packageItem: state.admin.packageItem,
    params: state.router.params,

    onSubmit: (values, dispatch) => {
      let adminRoute = AdminRoute.adminRoute();
      if(!values.productType)
        values.productType = "URLATTESTATION";
      if(!values.object)
        values.object = "ALL";
      let data = {...values, id: (id ? id : "")};
      dispatch(addPackage(data, () => {
        dispatch(push(`/${adminRoute}/packages`));
      }));
    }
  }
})

export default class AddPackage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    id = IdUtil.packageId(this.props);
    if (id) {
      this.props.dispatch(getPackageDetail(id));
    }
  }

  handleEditorChange = (e) => {
    text = e.target.getContent();
  };

  render() {
    const {fields: {name, amount, expiryDate, usedCount, productType, object}, packageItem, handleSubmit} = this.props;
    let adminRoute = AdminRoute.adminRoute();

    return <div id="company-kyc">
      <div className="title">
        <Link className="link" to={`/${adminRoute}/packages`}>
          套餐管理
        </Link> > 套餐新增</div>
      {
        !id || (id && id === packageItem.id) ?
          <form className="new-package-form" onSubmit={handleSubmit}>
            <article>
              <section className="left-section">
                <span className="package-item-name">分类</span>
                <select {...FormUtil.extract(productType, "select")}>
                  <option value="URLATTESTATION">网页取证</option>
                  <option value="ECONTRACT">电子签约</option>
                </select>
              </section>
              <section>
                <span className="package-item-name">选择适用对象</span>
                <select {...FormUtil.extract(object, "select")}>
                  <option value="ALL">全部</option>
                  <option value="PERSONAL">个人</option>
                  <option value="ENTERPRISE">企业</option>
                </select>
              </section>
            </article>
            <article>
              <section className="left-section">
                <span className="package-item-name">套餐名称</span>
                <ColumnInput type="text" {...FormUtil.extract(name)} file={name}/>
                <span className="number-tip">*10个汉字以内</span>
              </section>
              <section>
                <span className="package-item-name">套餐价格</span>
                <ColumnInput type="text" {...FormUtil.extract(amount)} file={amount}/>
                <span className="unit">元</span>
              </section>
            </article>
            <article>
              <section className="left-section">
                <span className="package-item-name">套餐次数</span>
                <ColumnInput type="text" {...FormUtil.extract(usedCount)} file={usedCount}/>
              </section>
              <section>
                <span className="package-item-name">有效期</span>
                <ColumnInput type="text" {...FormUtil.extract(expiryDate)} file={expiryDate}/>
                <span className="unit">年</span>
              </section>
            </article>
            <button type="submit" className="add-package">{id ? "编辑" : "提交"}</button>
          </form>
          : ""
      }
    </div>
  }
}