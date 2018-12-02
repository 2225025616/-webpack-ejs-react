import React, { Component } from "react";
// import Dialog from 'material-ui/Dialog';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {open: !!props.open};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== undefined) {
      this.setState({open: !!nextProps.open});
    }
  }

  hide() {
    this.setState({open: false});
  }

  show() {
    this.setState({open: true});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }

    this.setState({open: false});
  };

  render() {
    return <div>
      {/*<Dialog
       title={this.props.title}
       modal={false}
       contentStyle={modalStyle}
       open={this.state.open}
       onRequestClose={this.handleClose}>
       {this.props.children}
       </Dialog>*/}
    </div>;
  }
}

// import React, {PropTypes,Component} from 'react';
// import {ModalContainer, ModalDialog} from 'react-modal-dialog';
//
// export default class HomePageExampleModalButton extends Component {
//   static propTypes = {
//     className: PropTypes.string,
//   }
//   state = {
//     showModal: false,
//   }
//
//   openModal = () => {
//     this.setState({showModal: true});
//   }
//   closeModal = () => {
//     this.setState({showModal: false});
//   }
//   render() {
//     return <div>
//       <a onClick={this.openModal}>
//         Open A Modal
//         {this.state.showModal ?
//           <FirstModal onClose={this.closeModal}/>
//         : null}
//       </a>
//       <br></br>
//       <a onClick={this.openModal}>
//         Open B Modal
//         {this.state.showModal ?
//           <SecondModal onClose={this.closeModal}/>
//         : null}
//       </a>
//     </div>;
//   }
// }
//
// class SecondModal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func,
//   }
//   render() {
//     return <ModalContainer ref="b" onClose={this.props.onClose}>
//       <ModalDialog onClose={this.props.onClose} width={350}>
//         <h1>Second Dialog</h1>
//         <p>When you hit esc, only this one will close</p>
//       </ModalDialog>
//     </ModalContainer>;
//   }
// }
//
// class FirstModal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func,
//   }
//   render() {
//     return <ModalContainer ref="a" onClose={this.props.onClose}>
//       <ModalDialog onClose={this.props.onClose} width={350}>
//         <h1>first Dialog</h1>
//         <p>When you hit esc, only this one will close</p>
//       </ModalDialog>
//     </ModalContainer>;
//   }
// }
