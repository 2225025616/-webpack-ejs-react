import { toastr } from "react-redux-toastr";
import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";
import T from "i18n-react";
import push from "../../utils/push";
import { getSignProfile, uploadSignFile, getSignature } from "../../actions/signatureAction";
import StorageUtil from "../../utils/StorageUtil";
import Dropzone from "react-dropzone";
import LoadingButton from "../commons/LoadingButton";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import MallProductType from "../../utils/MallProductType.es";
import { getBalance } from "../../actions/userAction.es";
import SignatureStatus from "../../constants/SignatureStatus";
import AttestationUtil from "../../utils/AttestationUtil";
import LanguageUtil from "../../utils/LanguageUtil";
import Formatter from "../../lib/formatter";
import CommonSignatureList from "../members/CommonSignatureList";

const style = {};
let first = true;

@connect(state => {
  return {
    user: state.notary.user,
    info: state.notary.info,
    fileInfo: state.signature.fileInfo,
    profile: state.signature.profile,
    params: state.router.params,
    organizations: state.organization.all,
    userInfo: state.user.kycs,
    balanceHolder: state.user.balanceHolder,
    signatures: state.signature.lists,
  }
})
export default class SignatureProfile extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showFile: false,
    showTypeModal: false,
  };

  file = '';
  fileName = '';
  type = '';

  componentWillMount() {
    let startDate = "";
    let endDate = "";
    let status = "";

    this.props.dispatch(getSignature({
      pageNo:0,
      pageSize: 5,
      status,
      startDate,
      endDate,
    }, () => this.setState({loading: false})));
  }

  componentDidMount() {
    this.props.dispatch(getBalance());
    this.props.dispatch(getSignProfile());
    let {userInfo, profile, organizations} = this.props, organization = organizations[organizations.length - 1] || {};

    // if (userInfo.isKycPass === "PASS" && organization.organizationStatus !== "PASS") {
    //   this.type = "USER";
    // }
    // if (organization.organizationStatus === "PASS") {
    //   this.type = "ORGANIZATION";
    // }
  };

  // openTypeModal = () => {
  //   let {userInfo, profile, organizations} = this.props, organization = organizations[organizations.length - 1] || {};
  //
  //   if(userInfo.isKycPass === "PASS" && organization.organizationStatus !== "PASS"){
  //     this.type = "USER";
  //   }
  //   if(organization.organizationStatus === "PASS"){
  //     this.type = "ORGANIZATION";
  //   }
  //   this.setState({showTypeModal: true});
  // };

  // closeTypeModal = () => {
  //   this.setState({showTypeModal: false});
  // };

  componentWillReceiveProps(nextProps) {
  };

  bytesToSize(bytes) {
    if (bytes === 0)
      return '0';
    let k = 1024;
    return (bytes / k / k);
  }

  showFile = (e) => {
    first = false;
    let size = this.bytesToSize(e.target.files[0].size);
    if (size > 10) {
      toastr.error(T.translate("signature.toastr-size"));
    } else {
      this.file = e.target.files;
      this.fileName = this.file[0].name;
      if (this.fileName !== '') {
        this.setState({showFile: true});
        this.forceUpdate();
      }
    }
  };

  removeFile = () => {
    this.setState({showFile: false});
    this.file = '';
    this.fileName = '';
    this.forceUpdate();
  };

  handleUpload = (e) => {
    this.type="ORGANIZATION";
    this.props.dispatch(uploadSignFile(this.file, this.type, () => {
      let {fileInfo} = this.props;
      StorageUtil.signatureId(fileInfo.id);
      this.props.dispatch(push(`/signatures/${fileInfo.id}/info`));
    }));
  };

  onDrop(files) {
    if (!files[0]) {
      toastr.error(T.translate("signature.toastr-type"));
    } else {
      let size = this.bytesToSize(files[0].size);

      if (size > 10) {
        toastr.error(T.translate("signature.toastr-size"));
      } else {
        this.file = files;
        this.fileName = this.file[0].name;
        if (this.fileName !== '') {
          this.setState({showFile: true});
          this.forceUpdate();
        }
      }
    }
  }

  // changeType = (e) => {
  //   this.type = e.target.value;
  //   this.forceUpdate();
  // };

  showUsers = (user) => {
    console.log(user.split(","));
    console.log(user.split(",").slice(0, 1));
    return user.split(",");
  };

  statue(status) {
    switch (status) {
      case "PASS":
        return T.translate("user.certified");
      case "APPLY":
        return T.translate("user.certifing");
      case "REJECT":
        return T.translate("user.re-certify");
      case "":
        return T.translate("user.to-certify");
    }
  }

  fmoney(money) {
    let n = 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = money.split(".")[0].split("").reverse(),
      r = money.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }

/*  toOrgAuth = () => {
    let {organizations} = this.props,
      organization = organizations[organizations.length - 1] || {};
    this.props.dispatch(push(`/organizations/${organization.id}`));
  };*/


  toSign = (signature) => {
    return e => {
      const {dispatch, balanceHolder} = this.props,
        count = balanceHolder.econtract || {},
        perCount = count.free + (count.nofree ? count.nofree.per : 0),
        orgCount = (count.nofree ? count.nofree.org : 0);

      if (signature.signType === 'personal') {
        if (!perCount) {
          return this.disableModal(true, T.translate('signature.personal-sign'))();
        }
      } else {
        if (!orgCount) {
          return this.disableModal(true, T.translate('signature.org-sign'))();
        }
      }
      dispatch(push(`/signatures/${signature.id}/add-seal`));
    }
  };

  render() {
    let {userInfo, profile, organizations, balanceHolder, signatures} = this.props,
      organization = organizations[organizations.length - 1] || {},
      fmt = Formatter.get("yyyy/mm/dd hh:MM:ss"),
      count = balanceHolder.econtract || {},
      perCount = count.free + (count.nofree ? count.nofree.per : 0),
      orgCount = (count.nofree ? count.nofree.org : 0);

    if (first) {
      if (userInfo.isKycPass === "PASS" && organization.organizationStatus !== "PASS") {
        this.type = "USER";
      }
      if (organization.organizationStatus === "PASS") {
        this.type = "ORGANIZATION";
      }
    }
    let balance = this.fmoney(balanceHolder.balance);
    let amount = balance.toString().split('.');

    return <div className="container-wrapper ">
      <div className="container member-container">
        <div className="signature">
          <p className="table-name">
            在线签约
          </p>
          <div className="member-content">
            <div className="item-box">
              <div className="to-sign">
                <p className="title">{T.translate("signature.start-sign")}</p>
                <p className="org-sign-times">（企业签约剩余 <span className="times">{orgCount}</span> 次）</p>
                <Link to={`/mall?productType=${MallProductType.eContract}`} className='to-buy'>立即购买</Link>
              </div>
            </div>
            <div className="upload">
              <div className="file">
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone" accept="application/pdf">
                  {
                    this.state.showFile ?
                      <div className="show-file-box">
                        <img
                          src={require("images/components/pdf.png")}/>
                        <p className="file-name">{this.fileName}</p>
                      </div>
                      :
                      <div className="show-file-box">
                        <i className="iconfont font-upload"/>
                        <p className="click-upload">{T.translate("kyc.upload")}</p>
                        <p>{T.translate("signature.file-pdf")}({T.translate("signature.file-size")})</p>
                      </div>
                  }
                </Dropzone>
                {/*
                  userInfo.isKycPass === "PASS" && organization.organizationStatus === "PASS" ?
                    <button type="button" className={this.fileName ? 'blueButton' : 'disable'}
                            onClick={this.fileName ? this.openTypeModal : ""}>{T.translate("common.next")}</button>
                    :
                    <LoadingButton className={this.fileName ? 'blueButton' : 'disable'}
                                   onClick={this.fileName ? this.handleUpload : ""}
                                   label={T.translate("common.next")}
                                   loadingLabel={T.translate("common.uploading")}/>
                */}
                <LoadingButton className="blueButton"
                               onClick={this.fileName ? this.handleUpload : ""}
                               label={T.translate("common.next")}
                               loadingLabel={T.translate("common.uploading")}/>
              </div>
            </div>

            <article>
              <div className="item-box">
                <p className="title">签约统计</p>
              </div>
              <div className="my-signature">
                <section>
                  <Link to={`/signatures?status=DRAFT`}>
                    <p>{T.translate("template.darft")}</p>
                    <span>{profile.DRAFT && profile.DRAFT.count !== 0 ? profile.DRAFT.count : "--"}</span>
                  </Link>
                  <img src={require('../../../images/components/draft.png')}/>
                </section>
                <section>
                  <Link to={`/signatures?status=WAIT_ME`}>
                    <p>{T.translate("signature.wait-me")}</p>
                    <span>{profile.WAIT_ME && profile.WAIT_ME.count !== 0 ? profile.WAIT_ME.count : "--"}</span>
                  </Link>
                  <img src={require('../../../images/components/wait-me.png')}/>
                </section>
                <section>
                  <Link to={`/signatures?status=WAIT_OTHERS`}>
                    <p>{T.translate("signature.wait-other")}</p>
                    <span>{profile.WAIT_OTHERS && profile.WAIT_OTHERS.count !== 0 ? profile.WAIT_OTHERS.count : "--"}</span>
                  </Link>
                  <img src={require('../../../images/components/wait-other.png')}/>
                </section>
                <section>
                  <Link to={`/signatures?status=DONE`}>
                    <p>{T.translate("signature.finish-sign")}</p>
                    <span>{profile.DONE && profile.DONE.count !== 0 ? profile.DONE.count : "--"}</span>
                  </Link>
                  <img src={require('../../../images/components/finished.png')}/>
                </section>
              </div>
            </article>

            <article>
              <div className="item-box">
                <p className="title">最近合同文件</p>
                <Link to={`/signatures`}>
                  <p className="more">查看全部合同></p>
                </Link>
              </div>
              <CommonSignatureList size="5" wholeList="false"/>
            </article>
          </div>
        </div>

        {/*this.state.showTypeModal ?
          <ModalContainer onClose={this.closeTypeModal}>
            <ModalDialog onClose={this.closeTypeModal} width={665} className="example-dialog"
                         dismissOnBackgroundClick={true}>
              <h1>{T.translate("signature.sign-type")}</h1>
              <form>
                <article>
                  <section>
                    <span>{T.translate("signature.sign-type")}</span>
                    <div className="sign-radio-group">
                      <input name="type" type="radio" value="USER"
                             onClick={this.changeType}/><label>{T.translate("attestation.person")}</label>
                      <input name="type" type="radio" value="ORGANIZATION" defaultChecked
                             onClick={this.changeType}/><label>{T.translate("attestation.enterprise")}</label>
                    </div>
                  </section>
                  <section className="button-group">
                    <span/>
                    <LoadingButton className="yes" type="button" label={T.translate("order.ok")}
                                   onClick={this.type ? this.handleUpload : ""}
                                   loadingLabel={T.translate("common.uploading")}/>
                    <button type="button" className="no"
                            onClick={this.closeTypeModal}>{T.translate("common.cancel")}</button>
                  </section>
                </article>
              </form>
            </ModalDialog>
          </ModalContainer>
          : null*/}

      </div>
    </div>

  }
}
