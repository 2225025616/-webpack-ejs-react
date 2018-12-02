import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import UploadModal from "./UploadModal";
import Link from "../commons/LangLink";
import Image from "../commons/Image";
import { findAttestationsSummaryByUser } from "../../actions/attestationAction";
import moment from "moment";
import FileUtil from "../../utils/FileUtil";
import Formatter from "../../lib/formatter";

@connect(state => {
  return {
    user: state.user.info,
    summary: state.attestation.summary
  }
})
export default class AttestationSummary extends Component {
  handleOpen = () => {
    this.refs.upload.show();
  };

  componentDidMount() {
    this.props.dispatch(findAttestationsSummaryByUser());
  }

  render() {
    const {summary, user} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    let id = user.id;
    return <div className="container-wrapper">
      <div className="container attestation-summary">
        <ul className="breadcrumb view-head">
          <li>{T.translate("sidebar.user-attestation")}</li>
          <li>{T.translate("sidebar.my-attestation")}</li>
        </ul>
        <UploadModal ref="upload"/>

        <div className="item-head">
          <span>{T.translate("user.classify")}</span>
        </div>

        <div className="item">
          <Link to="/attestations/upload"/>
          <div>
            <p className="org-name">{T.translate("user.my-upload")}</p>
          </div>
          <div className="record">
            <p><span className="text">{T.translate("user.total")}:</span>
              {summary.upload.count ? summary.upload.count : 0} {T.translate("user.item")}</p>
            <p><span className="text">{T.translate("product.volume")}:</span>
              {FileUtil.humanableSize(summary.upload.totalSize)}</p>

            <p><span className="text">{T.translate("user.last-item")}:</span>
              <abbr title={fmt.format(summary.upload.lastUploadAt)}>
                {summary.upload.lastUploadAt ? moment(summary.upload.lastUploadAt).fromNow() : T.translate("attestation.never-upload")}
              </abbr>
            </p>

          </div>
          <div className="operate-btn">
            <button label={T.translate("common.upload-file")} onClick={this.handleOpen}/>
          </div>
        </div>

        {
          summary.products.map(item => {
            return <div className="item" key={item.id}>
              <Link to={`/attestations/by-product/${item.productId}`}/>
              <div className="product-logo">
                <Image src={item.logo}
                       altSrc={require("images/default-product-logo.png")}/>
                <p className="org-name">{item.productName}</p>
              </div>
              <div className="record">
                <p><span className="text">{T.translate("user.total")}:</span>
                  {item.count}{T.translate("user.item")}</p>
                <p><span className="text">{T.translate("product.volume")}:</span>
                  {FileUtil.humanableSize(item.totalSize)}</p>
                <p><span className="text">{T.translate("user.last-item")}:</span>
                  <abbr title={fmt.format(item.lastUploadAt)}>
                    {moment(item.lastUploadAt).fromNow()}
                  </abbr>
                </p>
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}
