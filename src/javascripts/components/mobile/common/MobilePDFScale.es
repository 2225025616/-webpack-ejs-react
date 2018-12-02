import React, { Component } from "react";
import ReactPDF from "react-pdf";
import T from "i18n-react";
import ElementInfo from "./ElementInfo.es";
import { stopBubbleAndDefault } from "../../../utils/eventPrevent.es";

require('style-loader!../../../../stylesheets/mobile/common/mobile-pdf.scss');

export default class MobilePDFScale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: this.props.pdfConfig.pageIndex || 0,
      total: undefined,
      showBtn: false,
    };
    this.container = null;
    this.containerInfo = null;
    this.windowSize = {width: 0, height: 0};
    this.dblClick = {isTrue: false, time: 0};
    this.dblFinger = {isTrue: false, time: 0};
    this.originPoint = {x: 0, y: 0};
    this.originScale = 1;
  }

  componentDidMount = () => {
    this.container = this.refs.container;
    this.windowSize.width = this.refs.wrap.scrollWidth;
    this.windowSize.height = this.refs.wrap.scrollHeight;
    this.initialContainer();
  };

  initialContainer = () => {
    this.containerInfo = new ElementInfo(this.container, this.windowSize, 3);
  };

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
    return e => {
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

  onBlur = e => {
    const pageIndex = this.state.pageIndex || 0;
    this.setState({pageIndex: pageIndex});
  };

  toggle = cb => {
    return e => {
      let showBtn = !this.state.showBtn;
      this.setState({showBtn});
      if (typeof cb === 'function') cb(showBtn);
    }
  };

  touchStart = e => {
    stopBubbleAndDefault(e);
    const time = e.timeStamp;
    this.originScale = this.containerInfo.scale;
    if (e.touches.length === 2) {
      this.dblFinger.isTrue = true;
      this.canSwitch = false;
      this.originLength = this.calcLength({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }, {
        x: e.touches[1].clientX,
        y: e.touches[1].clientY
      });
    } else if (e.touches.length === 1) {
      if (time - this.dblClick.time < 200) {
        this.dblClick.isTrue = true;
        this.scale(2);
      } else {
        this.dblClick.isTrue = false;
        this.dblFinger.isTrue = false;
        this.originPoint.x = e.touches[0].clientX;
        this.originPoint.y = e.touches[0].clientY;
        const container = this.container;
        this.canSwitch = (container.width <= this.windowSize.width && container.height <= this.windowSize.height)
          || container.offsetLeft >= 0 || container.offsetLeft <= -container.width + this.windowSize.width;
      }
    }
    this.dblClick.time = time;
  };

  touchMove = e => {
    stopBubbleAndDefault(e);
    const points = e.touches;
    if (!this.dblFinger.isTrue && !this.dblClick.isTrue) {
      this.containerInfo.dx = points[0].clientX - this.originPoint.x;
      this.containerInfo.dy = points[0].clientY - this.originPoint.y;
      const container = this.container;
      this.canSwitch = this.canSwitch ? (container.offsetLeft >= 0 && this.containerInfo.dx >= 0)
        || (container.offsetLeft <= -container.width + this.windowSize.width && this.containerInfo.dx <= 0) : false;

      if (!this.canSwitch) {
        let left = this.containerInfo.origin.x + this.containerInfo.dx;
        let top = this.containerInfo.origin.y + this.containerInfo.dy;
        this.containerInfo.move = {left, top};
      }
    } else if (points.length === 2) {
      const length = this.calcLength({
        x: points[0].clientX,
        y: points[0].clientY
      }, {
        x: points[1].clientX,
        y: points[1].clientY
      });
      this.scale(length / this.originLength);
    }
  };

  touchEnd = e => {
    stopBubbleAndDefault(e);
    this.containerInfo.origin.x = parseInt(this.container.style.left) || 0;
    this.containerInfo.origin.y = parseInt(this.container.style.top) || 0;
  };

  scale(val) {
    const scale = this.containerInfo.scale;
    if (val !== 1 && scale < this.containerInfo.maxScale) {
      const scale1 = this.originScale * val;
      this.containerInfo.scale = scale1 >= 1 ? scale1 : 1;
    } else if (scale >= this.containerInfo.maxScale) {
      if (this.dblClick.isTrue) {
        this.containerInfo.scale = 1;
      } else {
        const scale1 = this.originScale * val;
        this.containerInfo.scale = scale1 >= 1 ? scale1 : 1;
      }
    }
  }

  calcLength(point1, point2) {
    let point = point2 !== undefined ? point2 : this.originPoint;
    return Math.sqrt(Math.pow(point1.x - point.x, 2) + Math.pow(point1.y - point.y, 2));
  }

  render() {
    let {pdfConfig, operator, loading, pdfContainerClick, containerWidth, containerHeight, onDocumentLoad, onDocumentError, onPageLoad, onPageRender, onPageError,} = this.props;
    // pdfConfig = {file, loading, error, noData, pageIndex, rotate, scale, width};
    // operator = {toPrevFunc, toNextFunc, turnToFunc, download};
    pdfConfig.pageIndex = this.state.pageIndex;

    return <div className="view-pdf-wrap" ref='wrap'>
      {
        operator && operator.showBtn && this.state.showBtn ? <div className="pdf-operator">
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
      <div className="pdf-container"
           ref='container'
           onClick={operator.showBtn ? this.toggle(pdfContainerClick) : () => ''}
           onTouchStart={!operator.showBtn ? this.touchStart : () => ''}
           onTouchMove={!operator.showBtn ? this.touchMove : () => ''}
           onTouchEnd={!operator.showBtn ? this.touchEnd : () => ''}>
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
    </div>
  }
}