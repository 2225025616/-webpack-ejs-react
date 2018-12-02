import React, { Component } from "react";

export default class FloatModal extends Component {
  state = {
    show: !!this.props.show,
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps(next) {
    let show = next.show;
    if (show !== this.state.show) this.setState({show})
  }

  confirm = () => {
    const {confirmFn} = this.props;
    if (typeof confirmFn === 'function') confirmFn();
    else console.error('confirmFn is not a function')
  };

  close = () => {
    const {closeFn} = this.props;
    if (typeof closeFn === 'function') closeFn();
    else console.error('closeFn is not a function')
  };

  render() {
    const {confirmText, closeText, confirmDisabled} = this.props;
    return this.state.show ?
      <div className="float-wrap">
        <div className="float-win">
          {this.props.children}
          <div className="buttons">
            <button className="confirm" onClick={this.confirm} disabled={confirmDisabled}>{confirmText || '确认'}</button>
            <button className="cancel" onClick={this.close}>{closeText || '取消'}</button>
          </div>
        </div>
      </div>
      : <div/>
  }
}