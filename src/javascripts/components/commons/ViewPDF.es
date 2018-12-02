import React, { Component } from "react";
import ReactPDF from "react-pdf";
import T from "i18n-react";

require('style-loader!../../../stylesheets/components/common/view-pdf.scss');

export default class ViewPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: this.props.pdfConfig.pageIndex || 0,
      total: undefined,
    }
  }

  onDocumentLoad = ({total}) => {
    this.setState({total: total})
  };

  onPageLoad = ({originalWidth, originalHeight, scale}) => {
    const {onPageLoad} = this.props, originalSize = {
      width: originalWidth,
      height: originalHeight,
      scale
    };
    if (onPageLoad) onPageLoad(originalSize);
  };

  onDocumentError = ({message}) => {
    const {onDocumentError} = this.props;
    if (onDocumentError) onDocumentError(message);
  };

  onPageRender = () => {
    const {onPageRender} = this.props;
    if (onPageRender) onPageRender();
  };

  onPageError = ({message}) => {
    const {onPageError} = this.props;
    if (onPageError) onPageError(message);
  };

  toPrevFunc = (cb) => {
    return () => {
      const pageIndex = this.state.pageIndex - 1;
      if (pageIndex > -1) this.setState({pageIndex});
      if (cb) cb(pageIndex);
    }
  };

  toNextFunc = (cb) => {
    return () => {
      const pageIndex = this.state.pageIndex + 1;
      if (pageIndex < this.state.total) this.setState({pageIndex});
      if (cb) cb(pageIndex);
    }
  };

  turnToFunc = (cb) => {
    return (e) => {
      const val = e.target.value;
      if (!isNaN(parseInt(val))) {
        this.setState({pageIndex: parseInt(val) - 1});
      } else {
        this.setState({pageIndex: ''});
      }
      let that = this;
      if (cb) cb(that.state.pageIndex || 0);
    }
  };

  onBlur = (e) => {
    const pageIndex = this.state.pageIndex || 0;
    this.setState({pageIndex: pageIndex});
  };

  render() {
    let {pdfConfig, operator, loading, onDocumentLoad, onDocumentError, onPageLoad, onPageRender, onPageError} = this.props;
    // pdfConfig = {file, loading, error, noData, pageIndex, rotate, scale, width};
    // operator = {toPrevFunc, toNextFunc, turnToFunc, download};
    pdfConfig.pageIndex = this.state.pageIndex;

    return <div className="view-pdf-wrap" style={{width: parseInt(pdfConfig.width) + 20 + 'px'}}>
      {
        operator ? <div className="pdf-operator">
          <div className="pdf-nav">
            <div className="prev" onClick={this.state.pageIndex === 0 ? '' : this.toPrevFunc(operator.toPrevFunc)}>
              {T.translate("signature.previous")}</div>
            <div className="turnTo">
              <input type="text" value={this.state.pageIndex === '' ? '' : this.state.pageIndex + 1}
                     onChange={this.turnToFunc(operator.turnToFunc)} onBlur={this.onBlur}/>
              /<span className="total-page">{this.state.total}</span>
            </div>
            <div className="next"
                 onClick={this.state.pageIndex === this.state.total - 1 ? '' : this.toNextFunc(operator.toNextFunc)}>
              {T.translate("signature.next")}</div>
          </div>
          {
            operator.download && operator.download.url ?
              <a href={operator.download.url} download={true}
                 className="btn-download">{T.translate("rpc.download")}</a> : ''
          }
        </div> : ''
      }
      {
        loading ? <ReactPDF {...pdfConfig} {...{
          onDocumentLoad: this.onDocumentLoad,
          onPageLoad: this.onPageLoad,
          onDocumentError: this.onDocumentError,
          onPageRender: this.onPageRender,
          onPageError: this.onPageError,
        }} /> : T.translate("common.notary-loading")
      }
    </div>
  }
}