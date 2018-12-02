import { toastr } from "react-redux-toastr";
import React, { Component } from "react";
import Header from "../Header";
import { reduxForm } from "redux-form";
import Footer from "../Footer";
import Link from "../../commons/LangLink";
import FloatBar from "../FloatBar";
import { validateAttestations, validateAttFile, validateSignFile } from "../../../actions/queryAction";
import Dropzone from "react-dropzone";
import { Line } from "rc-progress";
import LanguageUtil from "../../../utils/LanguageUtil";
import T from "i18n-react";

const styles = {
  active: {
    border: "1px solid #6cc091",
    fontWeight: "700",
    backgroundColor: "#6cc091"
  },
  showItem: {
    display: "flex",
  },
  showBtn: {
    display: "block",
  },
  hideItem: {
    display: "none",
  },
  progress: {
    width: 300,
  }
};

const fields = ['ano', 'id'];

@reduxForm({form: 'query', fields},
  state => {
    return {
      attestation: state.query.isExist,
      sign: state.query.result,
      location: state.router.location
    }
  })
export default class Query extends Component {

  index = 0;

  file = '';
  fileName = '';
  fileAttr = '';
  fileNameAttr = '';

  example = [
    {
      img: require('../../../../images/website-show/others/credit-archives-one.png'),
    }, {
      img: require('../../../../images/website-show/others/credit-archives-two.png'),
    }, {
      img: require('../../../../images/website-show/others/credit-archives-three.png'),
    }, {img: require('../../../../images/website-show/others/credit-archives-four.png'),}
  ];

  state = {
    showFileAttr: false,
    showFile: false,
    // canQuery: true,
    signStep: 'one',
    attStep: 'one',
    percentAttr: 0,//user for progressBar
    percent: 0,//user for progressBar
  };

  data = {};

  dataZh = {
    name: '查询验证',
  };

  dataEn = {
    name: 'Query',
  };

  componentWillMount = () => {
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    this.data = lang === 'zh' || this.props.location.query.lang === 'zh' ? this.dataZh : this.dataEn;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? '保全网-' : 'BAOQUAN.COM - ') + this.data.name;
  };

  changeIndex = (index) => {
    return () => {
      this.index = index;
      this.setState({});
      this.forceUpdate();
    }
  };

  searchAttestation = e => {
    e.preventDefault();
    let {fields: {ano, id}} = this.props;
    if (!ano.value || !id.value) {
      toastr.error("请填写信息");
    } else {
      this.props.dispatch(validateAttestations({attestationId: ano.value, idCardOrcode: id.value}, () => {
        this.setState({attStep: 'two'});
      }));
    }
  };
  handleAttUpload = (e) => {
    if (this.fileAttr === '') {
      toastr.error("请先上传文件");
    } else {
      this.setState({attStep: 'two', percentAttr: 0}, () => {
        this.attIncrease();
      });
      this.props.dispatch(validateAttFile(this.fileAttr, (data) => {
        this.setState({attStep: 'three'});
      }));
      this.setState({percentAttr: 0});
    }
  };
  handleUpload = (e) => {
    if (this.file === '') {
      toastr.error("请先上传文件");
    } else {
      this.setState({signStep: 'two', percent: 0}, () => {
        this.increase();
      });
      this.props.dispatch(validateSignFile(this.file, () => {
        this.setState({signStep: 'three'});
      }));
      this.setState({percent: 0});
    }
  };

  handleAttrCancel = (e) => {
    this.setState({attStep: 'one'});
    this.forceUpdate();
  };
  handleCancel = (e) => {
    this.setState({signStep: 'one'});
    this.forceUpdate();
  };

  onDropAttr(files) {
    if (!files[0]) {
      toastr.error("请上传文件");
    } else {
      this.fileAttr = files;
      this.fileNameAttr = this.fileAttr[0].name;
      if (this.fileNameAttr !== '') {
        this.setState({showFileAttr: true});
        this.forceUpdate();
      }
    }
  }
  onDrop(files) {
    if (!files[0]) {
      toastr.error("请上传pdf格式文件");
    } else {
      this.file = files;
      this.fileName = this.file[0].name;
      if (this.fileName !== '') {
        this.setState({showFile: true});
        this.forceUpdate();
      }
    }
  }

  attIncrease = (i) => {//进度条
    const percentAttr = this.state.percentAttr + 1;
    if (percentAttr >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({percentAttr}) // this.setState({a: A})
    this.tm = setTimeout(this.attIncrease, 10);
  };
  increase = (i) => {//进度条
    const percent = this.state.percent + 1;
    if (percent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({percent})
    this.tm = setTimeout(this.increase, 10);
  };
  reSearchAtt = () => {
    this.setState({attStep: "one", showFileAttr: false});
    this.fileAttr = '';
    this.fileNameAttr = '';
    this.forceUpdate();
  };

  reSearchSign = () => {
    this.setState({signStep: "one", showFile: false});
    this.file = '';
    this.fileName = '';
    this.forceUpdate();
  };

  render() {
    const {fields: {ano, id}, attestation} = this.props;

    let i = this.index
    return <div className="web-show-container">
      <Header haveScrollEvent={false}/>
      <FloatBar/>
      <article className="query-content">
        <h1>{T.translate("query.query")}</h1>
        <h2>Welcome to BlockChain</h2>
        <nav>
          <ul>
            <li onClick={this.changeIndex(0)}
                style={this.index === 0 ? styles.active : null}>保全书验证</li>
            <li onClick={this.changeIndex(1)}
                style={this.index === 1 ? styles.active : null}>{T.translate("query.att-query")}</li>
            <li onClick={this.changeIndex(2)}
                style={this.index === 2 ? styles.active : null}>{T.translate("query.sign-query")}</li>
          </ul>
        </nav>
        <section className="ano-validate" style={this.index === 0 ? styles.showItem : styles.hideItem}>
          <div style={this.state.attStep === 'one' ? styles.showItem : styles.hideItem} className="validate">
            <p>{T.translate("attestation.no")}</p >
            <input className="ano" {...ano}/>
            <p>{T.translate("query.att-no")}</p >
            <input {...id}/>
            <button className="submit" type="button"
                    onClick={this.searchAttestation}>{T.translate("header.query")}</button>
          </div>
          <div style={this.state.attStep === 'two' ? styles.showItem : styles.hideItem} className="show-att-result">
            <p>验证结果</p >
            <div className="content result att-result">
              <p className="validate-result" style={attestation.isExist === true ? styles.showItem : styles.hideItem}>
                <i className="iconfont font-right2"/>
                <span>{T.translate("query.att-result-yes")}</span>
              </p >
              <p className="fail" style={attestation.isExist === false ? styles.showItem : styles.hideItem}>
                <i className="iconfont font-right2"/>
                <span>{T.translate("query.att-result-no")}</span>
              </p >
            </div>
            <button className="submit" type="button" onClick={this.reSearchAtt}>{T.translate("query.go-on")}</button>
          </div>
        </section>


        <section className="sign-validate" style={this.index === 1 ? styles.showItem : styles.hideItem}>
          <p>{T.translate("query.fileAttr")}</p>
          <Dropzone onDrop={this.onDropAttr.bind(this)} className="dropzone">
            <div className="content upload" style={this.state.attStep === 'one' ? styles.showItem : styles.hideItem}>
              <div style={this.state.showFileAttr === false ? styles.showItem : styles.hideItem }>
                <p className="upload-tip">{T.translate("query.fileAttr-ing")}</p>
              </div>
              <div className="show-file" style={this.state.showFileAttr === true ? styles.showItem : styles.hideItem }>
                <img
                  src={require("images/components/pdf.png")}
                  alt=""/>
                <p>{this.fileNameAttr}</p>
              </div>
              <p className="tip">{T.translate("signature.file-drag")}</p>
            </div>
          </Dropzone>
          <button className="submit" onClick={this.handleAttUpload}
                  style={this.state.attStep === 'one' ? styles.showBtn : styles.hideItem}>
            {T.translate("header.query")}</button>

          <div className="content upload-progress"
               style={this.state.attStep === 'two' ? styles.showItem : styles.hideItem}>
            <img
              src={require("images/components/pdf.png")}
              alt=""/>
            <Line style={styles.progress} strokeWidth="4" percent={this.state.percentAttr}/>
            <div className="confirm">
              {/*<button className="yes">{T.translate("order.ok")}</button>*/}
              <button className="no" onClick={this.handleAttrCancel}>{T.translate("common.cancel")}</button>
            </div>
          </div>

          <div className="content result sign-result"
               style={this.state.attStep === 'three' ? styles.showItem : styles.hideItem}>
            <img
              src={require("images/components/pdf.png")}
              alt=""/>
            <p className="validate-result" style={attestation.isExist === true ? styles.showItem : styles.hideItem}>
              <i className="iconfont font-right2"/>
              <span>{T.translate("query.att-result-yes")}</span>
              {
                attestation.attestationId ?
                  <button className="yes"><a target="blank" href={`/attestations/${attestation.attestationId[0]}`}>
                      {T.translate("query.view-att")}
                  </a></button>
                  : ""
              }
            </p>
            <p className="fail" style={attestation.isExist === false ? styles.showItem : styles.hideItem}>
              <i className="iconfont font-right2"/>
              <span>{T.translate("query.att-result-no")}</span>
            </p>
            <p></p>
          </div>
          <button className="submit" type="button" onClick={this.reSearchAtt}
                  style={this.state.attStep === 'three' ? styles.showBtn : styles.hideItem}>{T.translate("query.go-on")}</button>
        </section>
        <section className="sign-validate" style={this.index === 2 ? styles.showItem : styles.hideItem}>
          <p>{T.translate("query.file")}</p>
          <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone" accept="application/pdf">
            <div className="content upload" style={this.state.signStep === 'one' ? styles.showItem : styles.hideItem}>
              <div style={this.state.showFile === false ? styles.showItem : styles.hideItem }>
                <p className="upload-tip">{T.translate("query.file-ing")}</p>
              </div>
              <div className="show-file" style={this.state.showFile === true ? styles.showItem : styles.hideItem }>
                <img
                  src={require("images/components/pdf.png")}
                  alt=""/>
                <p>{this.fileName}</p>
              </div>
              <p className="tip">{T.translate("signature.file-drag")}</p>
            </div>
          </Dropzone>
          <button className="submit" onClick={this.handleUpload}
                  style={this.state.signStep === 'one' ? styles.showBtn : styles.hideItem}>
            {T.translate("header.query")}</button>

          <div className="content upload-progress"
               style={this.state.signStep === 'two' ? styles.showItem : styles.hideItem}>
            <img
              src={require("images/components/pdf.png")}
              alt=""/>
            <Line style={styles.progress} strokeWidth="4" percent={this.state.percent}/>
            <div className="confirm">
              {/*<button className="yes">{T.translate("order.ok")}</button>*/}
              <button className="no" onClick={this.handleCancel}>{T.translate("common.cancel")}</button>
            </div>
          </div>

          <div className="content result sign-result"
               style={this.state.signStep === 'three' ? styles.showItem : styles.hideItem}>
            <img
              src={require("images/components/pdf.png")}
              alt=""/>
            <p className="validate-result" style={attestation.isExist === true ? styles.showItem : styles.hideItem}>
              <i className="iconfont font-right2"/>
              <span>{T.translate("query.sign-result-yes")}</span>
            </p>
            <p className="fail" style={attestation.isExist === false ? styles.showItem : styles.hideItem}>
              <i className="iconfont font-right2"/>
              <span>{T.translate("query.sign-result-no")}</span>
            </p>
            <p></p>
          </div>
          <button className="submit" type="button" onClick={this.reSearchSign}
                  style={this.state.signStep === 'three' ? styles.showBtn : styles.hideItem}>{T.translate("query.go-on")}</button>
        </section>
      </article>
      <Footer noMargin={true}/>
    </div>
  }
}
