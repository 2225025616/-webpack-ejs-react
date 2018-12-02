import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct, switchProduct, updateProduct } from "../../actions/productAction";
import IdUtil from "../../utils/IdUtil";
import FileUtil from "../../utils/FileUtil.es";
import T from "i18n-react";

const styles = {
  show: {
    display: "flex",
    alignItems: "center",
  },
  hide: {
    display: "none",
  }
};

@connect(state => {
    return {
      info: state.product.info,
      params: state.router.params
    }
  }
)

export default class ProductInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: false,
      website: false,
      nameValue: "",
      websiteValue: "",
    }
  }

  componentDidMount() {
    let productId = IdUtil.productId(this.props);
    this.props.dispatch(getProduct(productId));
  }

  componentWillReceiveProps(nextProps) {
    let newProductId = IdUtil.productId(nextProps);
    let productId = IdUtil.productId(this.props);

    if (newProductId !== productId) {
      this.props.dispatch(getProduct(newProductId));
    }
  }

  handleOpenName = e => {
    this.setState({name: !this.state.name});
  };

  handleOpenWebsite = e => {
    this.setState({website: !this.state.website});
  };

  handleChangeName = e => {
    this.setState({nameValue: e.target.value});
  };

  handleChangeWebsite = e => {
    this.setState({websiteValue: e.target.value});
  };

  handleUpdateProduct = e => {
    let productId = IdUtil.productId(this.props);
    let nameValue = this.state.nameValue;
    let websiteValue = this.state.websiteValue;
    let {name, website, attestationDownload} = this.props.info;
    if (!nameValue) {
      nameValue = this.props.info.name;
    }
    if (!websiteValue) {
      websiteValue = this.props.info.website;
    }
    if (!attestationDownload) {
      attestationDownload = this.props.info.attestationDownload;
    }
    this.props.dispatch(updateProduct(productId, {
      name: nameValue,
      website: websiteValue,
      attestationDownload: attestationDownload
    }));
  }

  handleSwitchProduct = (e) => {
    let productId = IdUtil.productId(this.props);
    this.props.dispatch(switchProduct(productId, !this.props.info.live));
  };

  render() {
    const {id, name, website, live, logo, saveRecords, dataSize} = this.props.info;

    return <div className="product-info">
      <div className="item">
        <span className="left-bar">{T.translate("product.name")}：</span>
        <div style={this.state.name === false ? styles.show : styles.hide}>
          <div className="product-descript">{name}</div>
          <button className="blueBorderButton" onClick={this.handleOpenName}>{T.translate("common.modify")}</button>
        </div>

        <div style={this.state.name === true ? styles.show : styles.hide}>
          <input onChange={this.handleChangeName}/>
          <button className="blueButton modify" onClick={this.handleUpdateProduct}>{T.translate("common.modify")}</button>
          <button className="blueBorderButton" onClick={this.handleOpenName}>{T.translate("common.cancel")}</button>
        </div>
      </div>

      <div className="item">
        <span className="left-bar">{T.translate("product.web-url")}：</span>
        <div style={this.state.website === false ? styles.show : styles.hide}>
          <div className="product-descript">{website}</div>
          <button className="blueBorderButton" onClick={this.handleOpenWebsite}>{T.translate("common.modify")}</button>
        </div>

        <div style={this.state.website === true ? styles.show : styles.hide}>
          <input onChange={this.handleChangeWebsite}/>
          <button className="blueButton modify" onClick={this.handleUpdateProduct}>{T.translate("common.modify")}</button>
          <button className="blueBorderButton" onClick={this.handleOpenWebsite}>{T.translate("common.cancel")}</button>
        </div>
      </div>

      <div className="item">
        <span className="left-bar">{T.translate("product.pro-status")}：</span>
        <div className="product-descript">{live ? <span>{T.translate("product.online")}</span> :
          <span>{T.translate("product.offline")}</span>}</div>
        <button className="blueBorderButton"
             onClick={this.handleSwitchProduct}>{live ? T.translate("product.to-offline") : T.translate("product.to-online")}</button>
      </div>

      <div className="item">
        <span className="left-bar">{T.translate("product.list")}：</span>
        <div>{saveRecords > 0 ? saveRecords : 0}{T.translate("product.strip")}</div>
        <div/>
      </div>

      <div className="item">
        <span className="left-bar">{T.translate("product.data-volume")}：</span>
        <div>{FileUtil.humanableSize(dataSize)}</div>
      </div>
    </div>;
  }
}
