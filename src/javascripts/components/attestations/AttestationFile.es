import { toastr } from "react-redux-toastr";
import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import LoadingButton from "../commons/LoadingButton";
import { uploadFile } from "../../actions/userAction";
import Dropzone from "react-dropzone";
import { uploadFileProduct, uploadFileOrg } from "../../actions/productAction.es";
import StorageUtil from "../../utils/StorageUtil.es";
import { findAllSummaryProduct } from "../../actions/attestationAction";

@connect(state => {
  return {
    user: state.user.kycs,
    productSummary: state.attestation.productSummary,
  }
})
export default class AttestationFile extends Component {
  constructor(props) {
    super(props);
    this.productId = '__private_system_upload';
  }

  state = {
    file: '',
    fileName: ''
  };
  file = '';
  fileName = '';

  componentWillMount() {
    let isOrg = StorageUtil.showOrganization();
    if(isOrg === "true")
      this.props.dispatch(findAllSummaryProduct());
  }

  bytesToSize(bytes) {
    if (bytes === 0)
      return '0';
    let k = 1024;
    return (bytes / k / k);
  }

  onDrop = (files) => {
    const { user } = this.props;
    let isOrg = StorageUtil.showOrganization();

    if(user.isKycPass !== "PASS" && isOrg === "false"){
      toastr.error("请先完成实名认证");
    } else {
      let size = this.bytesToSize(files[0].size);
      let mime = files[0].name.substr(files[0].name.lastIndexOf("."));
      /*    let reg=/\.(pdf|txt|doc|docx|dot|wp[s|t]|txt|xl[s|t]|xlsx)$/;*/
      let reg=/\.(exe|sh|bat|iso|dll|com)$/;
      if (size > 20) {
        toastr.error(T.translate("signature.toastr-size"));
      } else if(reg.test(mime)){
        toastr.error("请上传正确的文件类型");
      }else {
        this.setState({file: files, fileName: files[0] && files[0].name});
      }
    }
  };

  handleUpload = (e) => {
    const {user, productId} = this.props;
    let isOrg = StorageUtil.showOrganization();

    if (!productId){
      if(isOrg === "true") {
        this.props.dispatch(uploadFileProduct(
          this.productId, this.state.file, () => {
            this.setState({file: '', fileName: ''});
          },
          err => toastr.error(err))
        );
      }
      else if(isOrg === "false") {
        this.props.dispatch(uploadFile(
          user.id, this.state.file, () => {
            this.setState({file: '', fileName: ''});
          },
          err => toastr.error(err))
        );
      }
    }
    else
      this.props.dispatch(uploadFileProduct(
        productId, this.state.file, () => {
          this.setState({file: '', fileName: ''});
        },
        err => toastr.error(err))
      );
  };

  showError = () => {
    const { user } = this.props;
    let isOrg = StorageUtil.showOrganization();
    if(user.isKycPass !== "PASS" && isOrg === "false"){
      toastr.error("请先完成实名认证");
    } else {
      toastr.error("请先上传需保全的文件");
    }
  };

  selectProduct = (e) => {
    this.productId = e.target.value;
    this.forceUpdate();
  };

  render() {
    const { productSummary } = this.props;
    let isOrg = StorageUtil.showOrganization();

    return <section className="file-content">
      {/*<h2>{T.translate("attestation.file-attestation")}</h2>
      <div className="description">
        <p>{T.translate("attestation.file-attestation-descript")}</p>
        <p>{T.translate("attestation.file-attestation-tip")} </p>
      </div>*/}
      {
        isOrg === "false" ?
          ""
          :
          <div className="select-product">
            <span>请选择产品: </span>
            <select value={this.productId} onChange={this.selectProduct}>
              {
                productSummary.length > 0 ?
                  productSummary.map(item => {
                    if(item.name !== '网页取证')
                      return <option value={item.id}>{item.name}</option>;
                  }) : ""
              }
            </select>
          </div>
      }
      <div className="to-upload-file article-content">
        <Dropzone onDrop={this.onDrop} className="dropzone">
          {
            this.state.fileName ?
              <div className="show-file">
                <p className="file-name file-name-height">{this.state.fileName}</p>
              </div>
              :
              <div className="show-file">
                <i className="iconfont font-upload"/>
                <p className="click-upload">{T.translate("kyc.upload")}</p>
                <p>{T.translate("attestation.tip")}</p>
                <p className="file-types">上传类型支持Word、Excel、PDF、TXT、图片...</p>
              </div>
          }
        </Dropzone>
        <LoadingButton className="blueButton"
                       onClick={this.state.fileName ? this.handleUpload : this.showError}
                       label={T.translate("attestation.to-attestation")}
                       loadingLabel={T.translate("common.uploading")}/>
      </div>
    </section>
  }


}
