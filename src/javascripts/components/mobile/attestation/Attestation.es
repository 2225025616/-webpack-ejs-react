import React, { Component } from "react";
import NavMenu from "../common/NavMenu";
import Header from "../common/Header";
import Back from "../common/Back";
import IdUtil from "../../../utils/IdUtil";
import { getAttestation, getBlockChainHash } from "../../../actions/attestationAction";
import { connect } from "react-redux";
import AttestationUtil from "../../../utils/AttestationUtil";
import Hash from "../../commons/Hash";
import T from "i18n-react";
import StorageUtil from "../../../utils/StorageUtil";
import push from "../../../utils/push";

@connect(state => ({
  factom: state.attestation.factom,
  attestation: state.attestation.info,
  params: state.router.params,
  location: state.router.location
}))
export default class Attestation extends Component {
  data = {
    title: '保全详情'
  };

  componentWillMount = () => {
    let attestationId = IdUtil.attestationId(this.props);
    if (attestationId) {
      this.props.dispatch(getAttestation(attestationId, this.props.location.query.sandbox));
      this.props.dispatch(getBlockChainHash(attestationId));
    }
  };

  componentWillReceiveProps = (nextProps) => {
    let oldAttestationId = IdUtil.attestationId(this.props);
    let newAttestationId = IdUtil.attestationId(nextProps);

    if (newAttestationId && newAttestationId !== oldAttestationId) {
      this.props.dispatch(getAttestation(newAttestationId, nextProps.location.query.sandbox));
      this.props.dispatch(getBlockChainHash(newAttestationId));
    }
  };

  toNotary = (item) => {
    return e => {
      StorageUtil.selectedAttestations([item]);
      this.props.dispatch(push('/mobile/notaries/add'));
    }
  };

  render() {
    let {attestation, factom} = this.props;
    let attestationId = IdUtil.attestationId(this.props);
    let sandbox = this.props.location.query.sandbox;

    return <div className="attestation-container">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      {attestation.html && attestation.id === attestationId ?
        <div className="attestation-wrap">
          {(factom.BROP !== "" || factom.FACTOM !== "" || factom.VERAX !== "") && factom.id === attestationId ?
            <Hash x={attestation.fileHash} y={factom}/> : ""}
          {sandbox === "true" ?
            <div className="attestation-result attestation-test" dangerouslySetInnerHTML={{__html: attestation.html}}/>
            :
            <div className="attestation-result" dangerouslySetInnerHTML={{__html: attestation.html}}/>
          }
          <div className="bottom-btn">
            {
              attestation.hasFile ?
                <a className="green" target="_blank"
                   href={AttestationUtil.getDownloadUrl(attestation, sandbox)}>
                  <T.text text="attestation.download"/>
                </a> : ""
            }
            <button className="btn" onClick={this.toNotary(attestation)}>申请出证</button>
          </div>
        </div> :
        <div className="spinner">
          <div className="double-bounce1"/>
          <div className="double-bounce2"/>
        </div>
      }
    </div>
  }
}