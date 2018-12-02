import React, { Component } from "react";
import cx from "classnames";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

const styles = {
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8
  },
  hide: {
    display: "none",
  }
};

export default class Hash extends Component {
  constructor(props) {
    super(props);
    this.index = -1;
  }

  state = {
    showHashModal: false,
  };


  componentDidMount() {
    if (this.props.x && this.props.y) {
      this.startCompare();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.x !== this.props.x || nextProps.y === this.props.y ) && nextProps.x && nextProps.y) {
      this.startCompare();
    }
  }

  openHashModal = () => {
    this.setState({showHashModal: true});
  };

  closeHashModal = () => {
    this.setState({showHashModal: false});
  };

  handleOpen = () => {
    this.state.showHashModal.show();
  };

  handleClose = () => {
    this.refs.hash.hide();
  };

  doCompare = () => {
    this.index++;
    this.forceUpdate();

    const {x, y} = this.props;
    const index = this.index;

    if ((x && index < x.length) ||
      (y && index < y.length)) {
      setTimeout(this.compare, 5);
    } else {
      this.compare = undefined;
    }
  };

  startCompare() {
    if (this.compare) {
      return;
    }

    this.index = -1;
    this.compare = this.doCompare;
    this.compare();
  }

  same(base, check, index) {
    if (base && check) {
      if (index < base.length && index < check.length) {
        return base[index] === check[index];
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  row(base, check, index) {
    return <div key={index} className={cx("col",
      {
        active: index <= this.index && index >= this.index - 12,
        failure: index <= this.index && !this.same(base, check, index),
        success: index <= this.index && this.same(base, check, index)
      })}>{base[index]}</div>
  }

  setChains(chains) {
    // if(chains.BROP.hash !== ''){
    //   return  chains.BROP.hash;
    // } else
    //
    if (chains.FACTOM && chains.FACTOM.hash !== '') {
      return chains.FACTOM.hash
    } else if (chains.VERAX && chains.VERAX.hash !== '') {
      return chains.VERAX.hash
    } else {
      return '';
    }
  }

  getHash(url) {
    var index = url .lastIndexOf("\/");
    var hash  = url .substring(index + 1, url .length);
    return hash;
  }

  box(x, chains) {
    let y = this.setChains(chains);
    if (!x || !y) {
      if (x && !y) {
        return <div>
          {T.translate("attestation.wait-create-hash")}</div>;
      } else if (y && !x) {
        return <div>
          {T.translate("attestation.wait-for-return")}</div>;
      } else {
        return <div>
          {T.translate("attestation.data-loading")}</div>;
      }
    }

    return <div>
      <div className="chain">
        <p className="block-chain-hash">
          <span>{T.translate("attestation.fileHash")}</span>
          <div className="hash-mob">
            {x.split("").map((e, index) => {
              return this.row(x, y, index);
            })}
          </div>
        </p>
      </div>
    </div>;
  }

  render() {
    const {x, y} = this.props;
    let checked;

    if (x && this.setChains(y)) {
      if (this.index === x.length || this.index === this.setChains(y).length) {
        if (x === this.setChains(y)) {
          checked = [<div className="result">
            <i className="iconfont font-dui"/>
            <p>{T.translate("attestation.right-result")}
              <button onClick={this.openHashModal}>{T.translate("attestation.principle")}></button>
            </p>
          </div>,
            y.VERAX ? <div className="block-chain-item" style={y.VERAX.checkUrl === '' ? styles.hide : {}}>
              <span className="chain-name">VERAXCHAIN</span>
              <div className="info">
                <p className="description">{T.translate("attestation.baoquan-chain")}</p>
                <p>
                  <span className="hash">{T.translate("attestation.block-chain-hash")}：</span>
                  <a href={y.VERAX.checkUrl} target="_blank">
                    <span className="hash-code">{this.getHash(y.VERAX.checkUrl)}</span>
                  </a>
                </p>
              </div>
              <i className="iconfont font-dui"/>
            </div> : '',
            y.FACTOM ? <div className="block-chain-item" style={y.FACTOM.checkUrl === '' ? styles.hide : {}}>
              <span className="chain-name">FACTOM</span>
              <div className="info">
                <p className="description">{T.translate("attestation.factom")}</p>
                <p>
                  <span className="hash">{T.translate("attestation.block-chain-hash")}：</span>
                  <a href={y.FACTOM.checkUrl} target="_blank">
                    <span className="hash-code">{this.getHash(y.FACTOM.checkUrl)}</span>
                  </a>
                </p>
              </div>
              <i className="iconfont font-dui"/>
            </div> : '']
        } else {
          checked = <div className="result">
            <img src={require("images/error.png")}/>
            <p>{T.translate("attestation.wrong-result")}
              <button onClick={this.openHashModal}>{T.translate("attestation.principle")}></button>
            </p>
          </div>
        }
      }
    }

    return <div className="block-chain">
      <div className="block-chain-title">
        <img src={require("images/logo-attestation.png")}/>
        <span>{T.translate("attestation.block-chain-verify")}</span>
      </div>
      {this.box(x, y)}{checked}
      {this.state.showHashModal ?
        <ModalContainer onClose={this.closeHashModal}>
          <ModalDialog onClose={this.closeHashModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>{T.translate("attestation.hash-title")}</h1>
            <form>
              <article className="hash-modal">
                <h5>{T.translate("attestation.hash-sub-title")}：</h5>
                <p>1、{T.translate("attestation.create-sha256")}</p>
                <p>2、{T.translate("attestation.save-file-hash")}</p>
                <p><span
                  style={{color: "#FF0000"}}>{T.translate("attestation.remarks")}:</span>{T.translate("attestation.sha256")}
                </p>
                <h5 className="subtitle">{T.translate("attestation.how-to-verify")}</h5>
                <p>1、{T.translate("attestation.download-pdf")}</p>
                <p>2、{T.translate("attestation.on")}
                  {T.translate("attestation.block-chain")}{T.translate("attestation.search-file-hash")}
                </p>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </div>;
  }
}
