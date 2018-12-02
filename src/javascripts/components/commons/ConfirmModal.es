import React, { Component } from "react";
import Modal from "./Modal";
import LoadingButton from "../commons/LoadingButton";

const style = {
  button: {
    marginTop: 8,
    float: "right",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  textfield: {
    width: "100%",
  },
}
export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {confirmText: this.props.confirmText, open: this.props.open};
  }

  show(confirmText) {
    this.setState({open: true, confirmText: confirmText});
  }

  hide() {
    this.setState({open: false, confirmText: ""});
  }

  handleConfirmOk = e => {
    this.props.onConfirmOk();
  };

  handleConfirmChange = e => {
    this.inputText = e.target.value;
    this.forceUpdate();
  };

  handleClose = () => {
    this.hide();
  }

  render() {
    return <Modal ref="modal" title={this.props.title} open={this.state.open}>
      <div>
        <div className="cancel-button">
          <button style={style.iconButton}
                  onTouchTap={this.handleClose}></button>
        </div>
        <p className="delete-name">{this.state.confirmText}</p>
        <input style={style.textfield} placeholder={this.props.prompt}
               onChange={this.handleConfirmChange}/>
        <LoadingButton buttonStyle="flat" style={style.button} loadingLabel={this.props.label + "中..." }
                       label={this.props.label}
                       disabled={!(this.inputText == this.state.confirmText)}
                       onTouchTap={this.handleConfirmOk}/>
      </div>
    </Modal>
  }
}
