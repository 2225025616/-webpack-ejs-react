import React, { Component } from "react";
import { stopBubbleAndDefault } from "../../../utils/eventPrevent.es";

export default class Handwrite extends Component {

  state = {
    width: 100,
    height: 100,
  };

  canvas = null;
  ctx = null;
  canvasPos = {};
  baseWidth = window.devicePixelRatio * 6;
  minWidth = window.devicePixelRatio;
  maxSpeed = window.devicePixelRatio * 6;
  oldTime = 0;
  oldPos = {};

  componentDidMount = () => {
    this.setState({width: this.canvas.scrollWidth, height: this.canvas.scrollHeight});
    const {parentClientX, parentClientY} = this.props;
    this.canvasPos = {
      x: parentClientX !== 'undefined' ? parentClientX : this.wrap.parentElement.offsetLeft,
      y: parentClientY !== 'undefined' ? parentClientY : this.wrap.parentElement.offsetTop,
    };
    this.initialCanvas();
  };

  componentWillReceiveProps = (next) => {
    const {parentClientX, parentClientY} = next;
    if (parentClientX !== this.props.parentClientX) this.canvasPos.x = parentClientX;
    if (parentClientY !== this.props.parentClientY) this.canvasPos.y = parentClientY;
  };

  initialCanvas = () => {
    this.ctx = this.canvas.getContext('2d');
  };

  canvasRef = ref => {
    this.canvas = ref;
    const {canvasRef} = this.props;
    if (typeof canvasRef === 'function') canvasRef(ref);
  };

  baseSet = (ctx) => {
    ctx.strokeStyle = '#333';
    ctx.lineJion = 'round';
    ctx.lineCap = 'round';
  };

  getPoint = (...point) => {
    return [point[0] - this.canvasPos.x, point[1] - this.canvasPos.y];
  };

  setLineWidth = e => {
    let width, touch = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0], {clientX, clientY} = touch;
    if (e.type === 'touchstart') {
      width = this.baseWidth;
    } else {
      let d = Math.sqrt(Math.pow(clientX - this.oldPos.clientX, 2) + Math.pow(clientY - this.oldPos.clientY, 2)),
        speed = d / (e.timeStamp - this.oldTime), dSpeed = speed - this.maxSpeed;
      width = dSpeed >= 0 ? this.minWidth : this.baseWidth * (-dSpeed) / this.maxSpeed;
    }
    this.oldTime = e.timeStamp;
    this.oldPos = {clientX, clientY};
    return width;
  };

  touchStart = e => {
    stopBubbleAndDefault(e);
    const touch = e.touches[0], c = this.ctx;
    c.beginPath();
    this.baseSet(c);
    c.moveTo(...this.getPoint(touch.clientX, touch.clientY));
  };

  touchMove = e => {
    stopBubbleAndDefault(e);
    const touch = e.touches[0], c = this.ctx;
    c.lineWidth = this.setLineWidth(e);
    c.lineTo(...this.getPoint(touch.clientX, touch.clientY));
    c.stroke();
    c.beginPath();
    this.baseSet(c);
    c.moveTo(...this.getPoint(touch.clientX, touch.clientY));
  };

  touchEnd = e => {
    stopBubbleAndDefault(e);
    const touch = e.changedTouches[0], c = this.ctx;
    c.closePath();
  };

  clear = e => {
    stopBubbleAndDefault(e);
    const c = this.ctx, {width, height} = this.state;
    c.clearRect(0, 0, width, height);
  };

  render() {
    return <div className='handwrite-wrap-module' ref={ref => this.wrap = ref}>
      <canvas ref={this.canvasRef}
              width={this.state.width}
              height={this.state.height}
              className='handwrite-module'
              onTouchStart={this.touchStart}
              onTouchMove={this.touchMove}
              onTouchEnd={this.touchEnd}>
      </canvas>
      <button className='' onClick={this.clear}>清除</button>
    </div>
  }
}