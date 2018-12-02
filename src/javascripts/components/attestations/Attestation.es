import React, { Component } from "react";
import IdUtil from "../../utils/IdUtil";
import { connect } from "react-redux";
import { getAttestation, getBlockChainHash } from "../../actions/attestationAction";
import Hash from "../commons/Hash";
import AttestationUtil from "../../utils/AttestationUtil";
import T from "i18n-react";
import LanguageUtil from "../../utils/LanguageUtil";

@connect(state => {
  return {
    factom: state.attestation.factom,
    attestation: state.attestation.info,
    params: state.router.params,
    location: state.router.location
  }
})
export default class Attestation extends Component {
  componentDidMount() {
    let attestationId = IdUtil.attestationId(this.props);
    if (attestationId) {
      this.props.dispatch(getAttestation(attestationId, this.props.location.query.sandbox));
      this.props.dispatch(getBlockChainHash(attestationId));
    }
  }

  componentWillReceiveProps(nextProps) {
    let oldAttestationId = IdUtil.attestationId(this.props);
    let newAttestationId = IdUtil.attestationId(nextProps);

    if (newAttestationId && newAttestationId !== oldAttestationId) {
      this.props.dispatch(getAttestation(newAttestationId, nextProps.location.query.sandbox));
      this.props.dispatch(getBlockChainHash(newAttestationId));
    }
  }

  render() {
    const {attestation, factom} = this.props;
    let attestationId = IdUtil.attestationId(this.props);
    let sandbox = this.props.location.query.sandbox;
    return <div className="attestations show attestation-mob">
      {attestation.html && attestation.id === attestationId ?
        <div className="page-height">
          <div className="zoom">
            {/*(factom.BROP !== "" || factom.FACTOM !== "" || factom.VERAX !== "") && factom.id === attestationId ?
              <div className="item">
                <T.span text="attestation.block-chain-check"/>
                <img
                  src={require("images/logo-attestation.png")}/>
              </div>
              : ""
             {(factom.BROP !== "" || factom.FACTOM !== "" || factom.VERAX !== "") && factom.id === attestationId ?
              */}
            {(factom.FACTOM !== "" || factom.VERAX !== "") && factom.id === attestationId ?
              <Hash x={attestation.fileHash} y={factom}/> : ""}
            {
              attestation.hasFile ?
                <div className="attestation-actions">
                  <a className="btn btn-success download-pdf downloadable" target="_blank"
                     href={AttestationUtil.getDownloadUrl(attestation, sandbox) + "&lang=" + LanguageUtil.lang}><T.text
                    text="attestation.download"/></a>
                </div> : ""
            }
            {/* <div className="download-button">
              <a className="btn downloadable"
                 href={AttestationUtil.getDownloadUrl(attestation, sandbox)}><T.text text="attestation.download"/></a>
            </div>*/}
          </div>
          {sandbox === "true" ?
            <div className="attestation-result attestation-test" dangerouslySetInnerHTML={{__html: attestation.html}}/>
            :
            <div className="attestation-result" dangerouslySetInnerHTML={{__html: attestation.html}}/>
          }
        </div> :
        <div className="spinner">
          <div className="double-bounce1"/>
          <div className="double-bounce2"/>
        </div>
      }
    </div>;
  }


}
