import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Formatter from "../../lib/formatter";
import { getItemCount, getNotaryCount } from "../../actions/userAction";
import Link from "../commons/LangLink";
import AttestationFile from "./AttestationFile.es";

@connect(state => {
  return {
    user: state.user.kycs,
    count: state.user.count,
    notaryCount: state.user.notaryCount,
  }
})
export default class AttestationProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getItemCount());
    this.props.dispatch(getNotaryCount());
  }

  render() {
    const {count, notaryCount} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="container-wrapper">
      <div className="container attestations-profile">
        <p className="table-name">{T.translate("sidebar.attestation")}</p>
        <article className="attestations-profile-content">
          <section className="att-content">
            <h2>{T.translate("common.my-preservation")}</h2>
            <div className="description">
              <p>{T.translate("attestation.my-att-tip")}</p>
            </div>
            <div className="article-content">
              <Link to={`/attestations`}>
                <article className="attestation">
                  <i className="iconfont font-data"/>
                  <div>
                    <span>{T.translate("product.data")}</span>
                    <span className="count">{count ? count.countAttestation : ""}</span>
                    <span>{T.translate("user.item")}</span>
                  </div>
                </article>
              </Link>
              {
                count && count.Attestation ?
                  <Link to={`/attestations/${count.Attestation.id}`}>
                    <div className="last-attestation">
                      <span className="title">{T.translate("attestation.recent")}</span>
                      <p className="att-info">
                        <span>{fmt.format(count.Attestation.createAt)}</span>
                        <span>{count.Attestation.pName}</span>
                        <span className="att-id">{count.Attestation.id}</span>
                      </p>
                    </div>
                  </Link>
                  :
                  <div className="last-attestation">
                    <span className="title">{T.translate("attestation.recent")}</span>
                    <p className="att-info">
                      <span>--</span>
                      <span>--</span>
                      <span className="att-id">--</span>
                    </p>
                  </div>
              }
            </div>
          </section>
          <section>
            <h2>{T.translate("sidebar.my-notary")}</h2>
            <div className="description">
              <p>{T.translate("attestation.notary-tip")}</p>
              <p>{T.translate("attestation.notary-time")}</p>
            </div>
            <Link to={`/notaries`}>
              <div className="notary article-content">
                <p>
                  <span>{T.translate("notary.applying")}</span>
                  <span className="count">{notaryCount ? notaryCount.apply : ""}</span>
                </p>
                <p>
                  <span>{T.translate("notary.finished")}</span>
                  <span className="count">{notaryCount ? notaryCount.finished : ""}</span>
                </p>
              </div>
            </Link>
          </section>
        </article>

        <article className="attestations-profile-content upload-content">
          <AttestationFile/>
          <section>
            <h2>{T.translate("sidebar.org-attestation")}</h2>
            <div className="description">
              <p>{T.translate("attestation.org-att-tip")}</p>
              <p>{T.translate("common.access")}
                <Link to={`/org-sign`} className="to-org-api">
                  {T.translate("common.access")}>
                </Link>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  }


}
