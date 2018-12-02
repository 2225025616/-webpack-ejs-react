import React, { Component } from "react";
import { connect } from "react-redux";
import Formatter from "../../lib/formatter";
import Api from "../../utils/Api";
import Link from "../commons/LangLink";
import T from "i18n-react";

@connect(
  (state, ownerProps) => {
    return {
      collectCode: ownerProps.collectCode,
      expanded: state.notary.expanded
    }
  })
export default class NotaryInfo extends Component {

  casePropertys = e => {
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

  anoList = () => {
    this.refs.anoDiv.style.display = ' inline-block';
  };

  render() {
    let {notaries, collectCode, expanded} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let token = expanded.token;

    return <div className="unfold">
      {collectCode === expanded.collectCode ?
        <div className="notary-data">
          <div className="infos">
            <span className="infoName">{T.translate("notarization.business-type")}</span>
            <span>{T.translate("notarization.verify")}</span>
          </div>

          <div className="infos">
            <span className="infoName">{T.translate("notarization.list")}</span>
            <span>{Object.keys(expanded.list).length}{T.translate("notary.item")}
              <a className="anoList" onClick={this.anoList}>{T.translate("notary.open")}</a> <br />
                             <div className="anoDiv" ref="anoDiv">
                               {expanded.list.map(item => {
                                 return <p>
                                   {
                                     item.source !== "localhost" ?
                                       <a target="_blank"
                                          href={Api.getEndpoint(`/notary-public/${item.id}/download?token=${token}`)}>{item.ano}</a>
                                       : <Link
                                       to={`/attestations/${item.ano}` + (this.sandbox === true ? "?sandbox=true" : "")}>{item.ano}</Link>
                                   }
                                 </p>
                               })}
                             </div>
                         </span>
          </div>
          <div className="infos">
            <span className="infoName">{T.translate("notarization.descrip")}</span><span>{expanded.caseDescribe}</span>
          </div>
          <div className="infos">
            <span
              className="infoName">{T.translate("notarization.property")}</span><span>{this.casePropertys(expanded.caseProperty)}</span>
          </div>
          <div className="infos">
                         <span
                           className="infoName">{T.translate("notarization.lawsuit")}</span><span>{expanded.lawSuit === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</span>
          </div>
          <div className="infos">
                         <span
                           className="infoName">{T.translate("notarization.identify")}</span><span>{expanded.everVerify === 1 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</span>
          </div>
          <div className="infos">
                         <span
                           className="infoName">{T.translate("notarization.entrust")}</span><span>{expanded.delegate === 0 ? (T.translate("notarization.yes")) : (T.translate("notarization.no"))}</span>
          </div>
        </div>
        : "" }

    </div>;
  }
}
