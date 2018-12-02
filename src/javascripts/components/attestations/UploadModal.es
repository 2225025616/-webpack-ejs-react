import React, { Component } from "react";
import Modal from "../commons/Modal";
import { uploadFile } from "../../actions/userAction";
import LoadingButton from "../commons/LoadingButton";
import push from "../../utils/push";
import { connect } from "react-redux";
import T from "i18n-react";

const styles = {
  iconStyles: {
    width: 48,
    height: 48
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8
  },
  uploadButton: {
    display: "block",
    margin: "16px 96px"
  },
  balanceButton: {
    margin: "0 8px"
  }
};

@connect(state => {
  return {
    user: state.user.info,
    balanceHolder: state.user.balanceHolder
  }
})
class InnerUploadModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleUpload = (e) => {
    e.preventDefault();
    let id = this.props.user.id;
    let files = this.refs.fileUpload.files;

    this.props.dispatch(uploadFile(id, files, () => {
      this.props.onClose();
    }));
  };

  handleToPay = () => {
    this.props.dispatch(push('/pay'));
  };

  handleToProfile = () => {
    this.props.dispatch(push('/profile'));
  };

  render() {
    return <div>
      {this.props.user.realNameStatus !== 1 ?
        <Modal ref="realName" open={this.props.open} onClose={this.handleClose} title={T.translate("user.hint")}>
          <form autoComplete="off" className="user-recharge">
            <div className="cancel-button">
              <button style={styles.iconButton} onTouchTap={this.handleClose}>
              </button>
            </div>
            <h2>{T.translate("user.need-realName")}</h2>
            <button style={styles.balanceButton} label={T.translate("user.real-name")}
                    onTouchTap={this.handleToProfile}/>
            <button style={styles.balanceButton} label={T.translate("common.cancel")} onTouchTap={this.handleClose}/>
          </form>
        </Modal>
        :

        //          this.props.balanceHolder.balance < 2.00 || this.props.balanceHolder.balance == undefined ?
        //         <Modal ref="balance" open={this.props.open} onClose={this.handleClose} title={T.translate("user.hint")}>
        //           <form autoComplete="off" className="user-recharge">
        //             <div className="cancel-button">
        //               <button style={styles.iconButton}
        //                           onTouchTap={this.handleClose}>
        //               </button>
        //             </div>
        //             <h2>{T.translate("user.need-pay")}</h2>
        //             <div className="recharge">
        //               <p>{T.translate("user.remind")}:</p>
        //               <p>{T.translate("user.fee")}</p>
        //             </div>
        //             <button style={styles.balanceButton}
        //                           label={T.translate("common.pay")}
        //                           primary={true}
        //                           onTouchTap={this.handleToPay}
        //             />
        //             <button style={styles.balanceButton}
        //                           label={T.translate("common.cancel")}
        //                           onTouchTap={this.handleClose}
        //             />
        //           </form>
        //         </Modal> :

        //  this.props.balanceHolder.balance < 2.00 || this.props.balanceHolder.balance == undefined ?
        // <Modal ref="balance" open={this.props.open} onClose={this.handleClose} title={T.translate("user.hint")}>
        //   <form autoComplete="off" className="user-recharge">
        //     <div className="cancel-button">
        //       <IconButton style={styles.iconButton}
        //                   onTouchTap={this.handleClose}>
        //         <Cancel />
        //       </IconButton>
        //     </div>
        //     <h2>{T.translate("user.need-pay")}</h2>
        //     <div className="recharge">
        //       <p>{T.translate("user.remind")}:</p>
        //       <p>{T.translate("user.fee")}</p>
        //     </div>
        //     <RaisedButton style={styles.balanceButton}
        //                   label={T.translate("common.pay")}
        //                   primary={true}
        //                   onTouchTap={this.handleToPay}
        //     />
        //     <RaisedButton style={styles.balanceButton}
        //                   label={T.translate("common.cancel")}
        //                   onTouchTap={this.handleClose}
        //     />
        //   </form>
        // </Modal>
        // :

        <Modal ref="upload" open={this.props.open} onClose={this.handleClose}
               title={T.translate("user.upload-file")}>
          <form onSubmit={this.handleUpload} autoComplete="off" className="user-upload-file">
            <div className="cancel-button">
              <button style={styles.iconButton} onTouchTap={this.handleClose}>
              </button>
            </div>

            <div className="upload-file">
              <input type="file" ref="fileUpload"/>
            </div>

            <LoadingButton style={styles.uploadButton}
                           label={T.translate("common.upload")}
                           loadingLabel={T.translate("common.uploading")}
                           type="submit"
            />
            <div className="remind">
              <p>{T.translate("user.remind")}:</p>
              {/*<p>{T.translate("user.fee")}</p>*/}
              <p>{T.translate("user.file-size")}</p>
            </div>
          </form>
        </Modal>
      }</div>
  }
}

export default class UploadModal extends Component {
  handleClose = () => {
    this.open = false;
    this.forceUpdate();
  };

  show() {
    this.open = true;
    this.forceUpdate();
  }

  render() {
    return <InnerUploadModal open={this.open} onClose={this.handleClose}/>
  }
}
