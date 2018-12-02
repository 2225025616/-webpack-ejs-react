import React from "react";
import {render} from "react-dom";
import {Modal,Button} from "react-bootstrap" ;

export class DialogDispatch {
  ok(okFunc) {
    this.okFunc = okFunc;
    return this;
  }

  cancel(cancelFunc) {
    this.cancelFunc = cancelFunc;
    return this;
  }

  doOk() {
    if (this.okFunc) {
      this.okFunc();
    }
  }

  doCancel() {
    if (this.cancelFunc) {
      this.cancelFunc();
    }
  }
}

export default class Dialog extends React.Component {
  static dialogDispatch = new DialogDispatch();


  static show(title, content, sure = '确定', cancel = '取消') {

    render(<Dialog title={title} content={content} sure={sure}
                         cancel={cancel}/>,
      document.getElementById("__dialog_anchor"));

    return Dialog.dialogDispatch ;
  }

  constructor(props) {
    super(props);
    this.state = {opened: true};
  }

  componentWillReceiveProps(nextProps) {
    this.state = {opened: true};
  }

  handleCancel = () => {
    Dialog.dialogDispatch.doCancel() ;

    this.setState({opened: false});
  };

  handleOk = () => {
    Dialog.dialogDispatch.doOk() ;

    this.setState({opened: false});
  };

  render() {
    if (this.state.opened) {
      return <div>
        <Modal show={true} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.content}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleOk}>{this.props.sure}</Button>
            <Button onClick={this.handleCancel}>{this.props.cancel}</Button>
          </Modal.Footer>
        </Modal>
      </div>;
    } else {
      return <div></div>;
    }
  }
}