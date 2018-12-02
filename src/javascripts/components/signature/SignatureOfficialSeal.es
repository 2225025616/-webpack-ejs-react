import React, { Component } from "react";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { createSeal, deleteSeal, findAllSeals, setDefaultSeal } from "../../actions/signatureAction";
import Formatter from "../../lib/formatter";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import Image from "../commons/Image";
import ColumnInput from "../commons/ColumnInput";

const fields = ["name", "file"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("name", T.translate("signature.seal-remark"))
    .nonEmpty("file", T.translate("common.no-empty"))
    .errors;
};

@reduxForm({
    form: "offcial-seal",
    fields,
    validate
  },
  state => {
    return {
      seals: state.signature.seals,
    }
  })

export default class SignatureOfficialSeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewModal: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(findAllSeals());
  }

  openNewModal = () => {
    this.setState({showNewModal: true});
  };

  closeNewModal = () => {
    this.setState({showNewModal: false});
  };

  handleSetDefault = (e) => {
    this.props.dispatch(setDefaultSeal(e));
  };

  handleDeleteSeal = (e) => {
    this.props.dispatch(deleteSeal(e));
  };

  addSeal = () => {
    const {fields: {name, file}} = this.props;
    let values = {
      name: name.value,
      file: file.value
    };

    this.props.dispatch(createSeal(FormUtil.trimStringImage(values, "file"), () => {
      this.closeNewModal();
    }));
  };

  render() {
    const {fields: {name, file}, handleSubmit, seals} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let defaultSeals = seals.default;

    return <div className="container-wrapper">

      <div className="container official-seal member-container">
        <p className="table-name">{T.translate("sidebar.seals")}</p>
        <div className="items member-content ">
          <div className="item add-seal">
            <span onClick={this.openNewModal}>+</span>
            {this.state.showNewModal ?
              <ModalContainer onClose={this.closeNewModal}>
                <ModalDialog onClose={this.closeNewModal} width={450}>
                  <h1>{T.translate("signature.add-seals")}</h1>
                  <form className="create-seal-form">
                    <div className="create-seal">
                      <Image
                        altSrc={require("images/default-product-logo.png")}
                        src={FormUtil.imageSrc(file)}/>
                      <div>
                        <div className="upload-seal">
                          <input type="file" accept=".png" { ...FormUtil.ignoreFileUrl(file,this)}/>
                          <span>{T.translate("signature.upload-seals")}</span>
                        </div>
                        <p>{T.translate("signature.seals-png")}</p>
                      </div>
                    </div>
                    <div className="seal-remark">
                      <span>{T.translate("signature.seals-name")}:</span>
                      <ColumnInput placeholder={T.translate("signature.seals-remarks")} type="text"
                                   file={name} {...FormUtil.extract(name)}/>
                    </div>
                    <div className="button-group">
                      <button className="yes" type="button" onClick={this.addSeal}>{T.translate("order.ok")}</button>
                      <button className="no" type="button"
                              onClick={this.closeNewModal}>{T.translate("common.cancel")}</button>
                    </div>
                  </form>
                </ModalDialog>
              </ModalContainer>
              : ""}
          </div>
          {
            defaultSeals && defaultSeals.fileKey ?
              <div className="item generated-seal">
                <img src={defaultSeals.fileKey}/>
                <div className="seal-content">
                  <p>
                    <span>{T.translate("evidence.name")}:</span>
                    <span>{defaultSeals.fileName}</span>
                  </p>
                  <p>
                    <span>{T.translate("signature.seals-time")}:</span>
                    <span>{fmt.format(defaultSeals.createdAt)}</span>
                  </p>
                  <div className="btns">
                    <button className="blueButton"><a target="_black" href={defaultSeals.fileKey} download>{T.translate("rpc.download")}</a>
                    </button>
                  </div>
                  <div className="default-option">
                    {T.translate("common.default")}
                  </div>
                </div>
              </div>
              : ""
          }
          {
            seals.userSignature ?
              seals.userSignature.map((item, index) => {
                return <div key={index} className="item generated-seal">
                  <img src={item.fileKey}/>
                  <div className="seal-content">
                    <p>
                      <span>{T.translate("evidence.name")}:</span>
                      <span>{item.fileName}</span>
                    </p>
                    <p>
                      <span>{T.translate("signature.seals-time")}:</span>
                      <span>{fmt.format(item.createdAt)}</span>
                    </p>
                    <div className="btns">
                      <button className="blueButton"><a target="_black" href={item.fileKey} download>{T.translate("rpc.download")}</a></button>
                      <button className="blueButton"
                        onClick={e => this.handleSetDefault(item.id)}>{T.translate("signature.set-default")}</button>
                      <button className="blueButton"
                        onClick={e => this.handleDeleteSeal(item.id)}>{T.translate("signature.delete-seals")}</button>
                    </div>
                  </div>
                </div>
              }) : ""
          }
        </div>
      </div>
    </div>
  }
}
