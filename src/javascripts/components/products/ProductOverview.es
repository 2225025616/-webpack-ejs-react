import React, { Component } from "react";
import { connect } from "react-redux";
import IdUtil from "../../utils/IdUtil";
import ProductInfo from "../products/ProductInfo";
import ProductTemplate from "../products/ProductTemplate";
import ProductAttestation from "../products/ProductAttestations";
import ProductNotary from "../members/CommonBaseNotary";
import { getProduct } from "../../actions/productAction";
import T from "i18n-react";
import cx from "classnames";
import AttestationFile from "../attestations/AttestationFile.es";
import replace from "../../utils/replace";
import BackMenu from "../commons/BackMenu";
/*import Notary from "../members/CommonBaseNotary.es";*/

@connect(state => {
    return {
      info: state.product.info,
      params: state.router.params,
      location: state.router.location,
    }
  }
)

export default class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  componentDidMount() {
    let productId = IdUtil.productId(this.props);
    this.props.dispatch(getProduct(productId));
    this.setState({active: parseInt(this.props.location.query['active']) || 0});
  }

  componentWillReceiveProps(nextProps) {
    let newProductId = IdUtil.productId(nextProps);
    let productId = IdUtil.productId(this.props);

    if (newProductId !== productId) {
      this.props.dispatch(getProduct(newProductId));
    }
  }

  changeActive = pos => {
    this.props.dispatch(replace(`${this.props.location.pathname}?active=${pos}`));
  };

  render() {
    const {id, name, website, live, logo} = this.props.info;

    return <div className="container-wrapper">
      <div className="container product-overview">
        <BackMenu title={name}/>
        <div className="ctn">
        <div className="choose-items">
          <div className={cx("item", {active: this.state.active === 0})}
               onClick={() => this.changeActive(0)}>{T.translate("notarization.product-info")}</div>
          <div className={cx("item", {active: this.state.active === 1})}
               onClick={() => this.changeActive(1)}>{T.translate("sidebar.pro-template")}</div>
          {/*<div className={cx("item", {active: this.state.active === 2})}
               onClick={() => this.changeActive(2)}>{T.translate("attestation.file-attestation")}</div>*/}
          <div className={cx("item", {active: this.state.active === 3})}
               onClick={() => this.changeActive(3)}>{T.translate("sidebar.pro-attestation-list")}</div>
          {/*<div className={cx("item", {active: this.state.active === 4})}
               onClick={() => this.changeActive(4)}>{T.translate("sidebar.pro-notary")}</div>*/}
        </div>

        <div className="choose-content">
          <div className={cx("passive", {active: this.state.active === 0})}>
            <ProductInfo/>
          </div>

          <div className={cx("passive", {active: this.state.active === 1})}>
            <ProductTemplate/>
          </div>

          {/*<div className={cx("passive", {active: this.state.active === 2})}>
            <div className="attestations-profile">
              <div className="attestations-profile-content upload-content">
                <AttestationFile productId={id}/>
              </div>
            </div>
          </div>*/}

          <div className={cx("passive", {active: this.state.active === 3})}>
            <ProductAttestation/>
          </div>

          {/*<div className={cx("passive", {active: this.state.active === 4})}>
            <ProductNotary/>
          </div>*/}
        </div>
        </div>
      </div>

    </div>;
  }
}
