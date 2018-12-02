import React, { Component } from "react";
import IdUtil from "../../utils/IdUtil";
import { findByCollectCode } from "../../actions/notaryAction";
import { connect } from "react-redux";
import Link from "../commons/LangLink";
import T from "i18n-react";
import Api from "../../utils/Api";
import push from "../../utils/push";


let payItem = '';

@connect(state => {
  return {
    params: state.router.params,
    expanded: state.notary.expanded,
    product: state.product.info,
    products: state.product.all,
    organizations: state.organization.all,
    // user: state.notary.user,
    // info: state.notary.info,
    // products: state.product.all,
  }
})

export default class NotaryDetails extends Component {

  handleShowNotary = (code) => {
    this.props.dispatch(findByCollectCode(code));
  };

  componentDidMount() {
    let code = IdUtil.collectCode(this.props);
    this.handleShowNotary(code);
  }

  componentWillReceiveProps(nextProps) {
  }

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

  toEdit = (code) => {
    let productId = IdUtil.productId(this.props);
    if (productId) {
      this.props.dispatch(push(`/products/${productId}/notarization/${code}/edit`));
    } else {
      this.props.dispatch(push(`/notarization/${code}/edit`));
    }
  };

  // hideInfo (str,frontLen,endLen) {
  //   console.log(str);
  //   var len = str.length-frontLen-endLen;
  //   var xing = '';
  //   for (var i=0;i<len;i++) {
  //     xing+='*';
  //   }
  //   return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
  // }
  //
  // phone = (tel) => {
  //   return tel.substr(0, 3) + '****' + tel.substr(7);
  // };

  organization = () => {
    const {organizations, products} = this.props;
    let productId = IdUtil.productId(this.props);
    let product = products.find(item => item.id === productId);
    if (product) {
      return organizations.find(item => item.id === product.organizationId);
    }
  };

  render() {
    let {expanded, product, products} = this.props;
    let token = expanded.token;
    let code = IdUtil.collectCode(this.props);
    let organization = this.organization();
    let productId = IdUtil.productId(this.props);

    return <div className="container-wrapper">
      <div className="container">
        <div className="second-level-head">
          <Link to={productId ? `/products/over-view/${productId}?active=3` : `/notaries`}>
            <div>
              <i className="iconfont font-arrow-left"/>
              <span>{T.translate("signature.back")}</span>
            </div>
          </Link>
          <span className="title-name">{T.translate("attestation.notary")}</span>
        </div>
        <div className="ctn notary-details">
          <div className="content">
            <div className="details user-details">
              <h2>{productId ? T.translate("notarization.product-info") : T.translate("notarization.person-info")}</h2>
              <article>
                <section>
                  <span>{T.translate("notarization.name")}</span>
                  <p>{productId ? expanded.contactName : expanded.realName}</p>
                </section>
                {
                  productId ?
                    <section>
                      <span className="tdleft">{T.translate("notarization.organization-name")}</span>
                      <p>{organization.name}</p>
                    </section>
                    :
                    <section>
                      <span className="tdleft">{T.translate("notarization.idcard")}</span>
                      <p>{expanded.idCard}</p>
                    </section>
                }
                <section>
                  <span>{T.translate("notarization.tel")}</span>
                  <p>{expanded.contactPhoneNumber}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.postcode")}</span>
                  <p>{expanded.postcode}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.add")}</span>
                  <p>{expanded.address}</p>
                </section>
              </article>
            </div>
            <div className="details business-details">
              <h2>{T.translate("notarization.business-info")}</h2>
              <article>
                <section>
                  <span>{T.translate("notarization.business-type")}</span>
                  <p>{T.translate("notarization.verify")}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.list")}</span>
                  <p>
                    <div>
                      {expanded.list.map(item => {
                        return <p className="list">
                          {
                            item.source !== "localhost" ?
                              <a target="_blank"
                                 href={Api.getEndpoint(`/notary-public/${item.id}/download?token=${token}`)}>{item.ano}</a>
                              :
                              <Link
                                to={`/attestations/${item.ano}` + (this.sandbox === true ? "?sandbox=true" : "")}>{item.ano}</Link>
                          }
                        </p>
                      })
                      }
                    </div>
                  </p>
                </section>
                <section>
                  <span>{T.translate("notarization.descrip")}</span>
                  <p>{expanded.caseDescribe}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.property")}</span>
                  <p>{this.caseProperties(expanded.caseProperty)}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.lawsuit")}</span>
                  <p
                    className="boolean">{expanded.lawSuit === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.identify")}</span>
                  <p
                    className="boolean">{expanded.everVerify === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
                </section>
                <section>
                  <span>{T.translate("notarization.entrust")}</span>
                  <p
                    className="boolean">{expanded.delegate === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</p>
                </section>
              </article>
            </div>
            {
              expanded.payStatus === "YES" || payItem === expanded.id ?
                ""
                :
                <div className="options">
                  {
                    expanded.status === "APPLY" ?
                      <div>
                        <button className="blueButton edit" type="button"
                                onClick={e => this.toEdit(code)}>{T.translate("notarization.edit")}</button>
                        <Link to={`/order/${expanded.tradeId}`}>
                          <button type="button" className="blueBorderButton stop">{T.translate("notary.pay")}</button>
                        </Link>
                      </div> : ""
                  }
                </div>
            }
            <p className="notary-tip">
              <span className="notary-price">{T.translate("notarization.price")}</span>
              <span>{T.translate("notarization.tip")}</span>
            </p>
            {/*{this.state.showPayModal ?
              <ModalContainer onClose={this.closePayModal}>
                <ModalDialog onClose={this.closePayModal} width={665} className="example-dialog"
                             dismissOnBackgroundClick={true}>
                  <h1>{T.translate("notarization.confirm-pay")}</h1>
                  <form>
                    <article>
                      <section>
                        <span>{T.translate("notarization.amount")}</span>
                        <p className="warn">￥{expanded.amount}</p>
                      </section>
                      <section className="button-group">
                        <span/>
                        <button type="button" className="yes"
                                onClick={this.handlePayNotary}>{T.translate("order.yes")}</button>
                        <button type="button" className="no"
                                onClick={this.closePayModal}>{T.translate("common.cancel")}</button>
                      </section>
                    </article>
                  </form>
                </ModalDialog>
              </ModalContainer>
              : null}*/}
          </div>
        </div>
      </div>
    </div>
  }
}
