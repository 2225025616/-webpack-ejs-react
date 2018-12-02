import React, { Component } from "react";
import Header from "../common/Header";
import Back from "../common/Back";
import NavMenu from "../common/NavMenu";
import { reduxForm } from "redux-form";
import IdUtil from "../../../utils/IdUtil";
import { findByCollectCode, getNotarization, openNotary, postNotarization } from "../../../actions/notaryAction";
import StorageUtil from "../../../utils/StorageUtil";
import FormValidator from "../../../utils/FormValidator";
import T from "i18n-react";
import RowRadios from "../../commons/RowRadios";
import FormUtil from "../../../utils/FormUtil";
import push from "../../../utils/push";
import Link from "../../commons/LangLink";

const fields = ["postcode", "address", "caseDescribe", "caseProperty", "lawSuit", "everVerify", "entrust", "delegate"];

let notaryPublicType = "VERIFY";
let notaryPublicId = "1";

const validate = values => {
  return new FormValidator(values)
    .postCode("postcode", (T.translate("notarization.postcode")))
    .nonEmpty("address", (T.translate("notarization.detailed-address")))
    .nonEmpty("caseDescribe", (T.translate("notarization.descrip")))
    .errors;
};

const getInitialValues = state => {
  if (!IdUtil.collectCode(state.router)) {
    return {
      caseProperty: "NORMAL",
      lawSuit: 0,
      everVerify: 0,
      delegate: 1
    };
  } else
    return {
      ...state.notary.expanded,
    };
};


@reduxForm({form: "notarization", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    notary: state.notary.info,
    products: state.product.all,
    organizations: state.organization.all,
    params: state.router.params,
    expanded: state.notary.expanded,
    location: state.router.location,

    onSubmit: (values, dispatch) => {
      let collectCode = IdUtil.collectCode(state.router);
      dispatch(postNotarization({
        ...values,
        collectCode: collectCode,
        notaryPublicType,
        notaryPublicId,
        type: "PERSON",
        anos: [StorageUtil.selectedAttestations().map(item => {
          return item.id
        })]
      }, info => {
        dispatch(push(`/mobile/notaries/${info.collectCode}`));
      }));
    }
  }
})

export default class Notary extends Component {

  data = {
    title: '出证信息'
  };

  state = {
    title: '',
    isEdit: true,
  };

  componentWillMount() {
    this.props.dispatch(getNotarization());
    let id = IdUtil.collectCode(this.props);
    if (this.props.location.pathname.indexOf('/add') === -1 && id) {
      this.props.dispatch(findByCollectCode(id));
    }
  };

  toNotary = () => {
    StorageUtil.selectedAttestations([this.props.expanded]);
    this.props.dispatch(push(`/mobile/notaries/${IdUtil.collectCode(this.props)}/edit`));
  };

  caseProperties = e => {
    if (e === "COMPLICATE") {
      return T.translate("notarization.complicate");
    }
    else if (e === "HARD") {
      return T.translate("notarization.hard");
    }
    else {
      return T.translate("notarization.normal");
    }
  };

  reOpenNotary = (e) => {
    this.props.dispatch(openNotary(this.props.expanded.id));
  };

  render() {
    let code = IdUtil.collectCode(this.props);
    const {fields: {postcode, address, caseDescribe, caseProperty, lawSuit, everVerify, delegate}, notary, dispatch, expanded, handleSubmit, invalid, location, params} = this.props;

    return <div className="attestation-container">
      <Header>
        {
          code ?
            <span className='back' onClick={() => dispatch(push(`/mobile/notaries/list`))}/>
            : <Back/>
        }
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      {
        location.pathname.indexOf('/add') > -1 || location.pathname.indexOf('/edit') > -1 ?
          <form className="notary-wrap" onSubmit={handleSubmit}>
            <div className="sub-items">
              <section className="item">案件属性
                <RowRadios file={caseProperty} items={[
                  {value: 'NORMAL', text: T.translate("notarization.normal"), defaultChecked: true},
                  {value: 'COMPLICATE', text: T.translate("notarization.complicate")},
                  {value: 'HARD', text: T.translate("notarization.hard")},
                ]}/>
              </section>
              <section className="item">是否进入诉讼程序
                <RowRadios file={lawSuit} items={[
                  {value: '1', text: T.translate("notarization.yes")},
                  {value: '0', text: T.translate("notarization.no"), defaultChecked: true},
                ]}/>
              </section>
              <section className="item">是否曾经进行鉴定
                <RowRadios file={everVerify} items={[
                  {value: '1', text: T.translate("notarization.yes")},
                  {value: '0', text: T.translate("notarization.no"), defaultChecked: true},
                ]}/>
              </section>
              <section className="item">是否委托领证
                <RowRadios file={delegate} items={[
                  {value: '1', text: T.translate("notarization.yes"), defaultChecked: true},
                  {value: '0', text: T.translate("notarization.no")},
                ]}/>
              </section>
            </div>
            <div className="sub-items">
              <section className="item">收件人
                <p className="left">{notary.realName}</p>
              </section>
              <section className="item">联系电话
                <p className="left">{notary.phoneNumber}</p>
              </section>
              <section className="item">邮编
                <input className="left" placeholder="请输入邮编" type="number" {...FormUtil.extract(postcode)}/>
              </section>
              <section className="item">城市
                <textarea className="left" placeholder="请输入详细地址，方便我们邮寄司法鉴定意见书" {...FormUtil.extract(address)}/>
              </section>
              <section className="item">案件描述
                <textarea className="left" placeholder="请输入案件描述" {...FormUtil.extract(caseDescribe)}/>
              </section>
            </div>
            <div className="bottom-btn">
              {
                location.pathname.indexOf('edit') > -1 ?
                  <button className={invalid ? 'btn btn-disabled' : 'btn'} type="submit" disabled={invalid}>
                    确认修改
                  </button>
                  : <button className={invalid ? 'btn btn-disabled' : 'btn'} type="submit" disabled={invalid}>
                    确认出证
                  </button>
              }
            </div>
          </form>
          : <div className="notary-wrap">
            <div className="sub-items">
              <section className="item">案件属性
                <p>{this.caseProperties(expanded.caseProperty)}</p>
              </section>
              <section className="item">是否进入诉讼程序
                <p>{expanded.lawSuit === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
              </section>
              <section className="item">是否曾经进行鉴定
                <p>{expanded.everVerify === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
              </section>
              <section className="item">是否委托领证
                <p>{expanded.delegate === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
              </section>
            </div>
            <div className="sub-items">
              <section className="item">收件人
                <p>{expanded.realName}</p>
              </section>
              <section className="item">联系电话
                <p>{expanded.contactPhoneNumber}</p>
              </section>
              <section className="item">邮编
                <p>{expanded.postcode}</p>
              </section>
              <section className="item">城市
                <p className="multi-line">{expanded.address}</p>
              </section>
              <section className="item">案件描述
                <p className="multi-line">{expanded.caseDescribe}</p>
              </section>
            </div>
            {
              expanded.payStatus !== 'YES' && expanded.status !== 'CANCEL' ?
                <div className="bottom-btn">
                  <span onClick={this.toNotary} className='btn'>重新编辑</span>
                  <Link to={`/mobile/order/${expanded.tradeId}`} className='btn green'>去付款</Link>
                </div>
                : expanded.status === 'CANCEL' ?
                <div className="bottom-btn">
                  <button className='btn' onClick={this.reOpenNotary}>重新出证</button>
                  <Link to={`/mobile/order/${expanded.tradeId}`} className='btn green'>查看订单</Link>
                </div>
                : <div className="bottom-btn">
                  <Link to={`/mobile/order/${expanded.tradeId}`} className='btn'>查看订单</Link>
                </div>
            }
          </div>
      }
    </div>
  }
}