import React, { Component } from "react";
import ViewPicture from './ViewPicture'

let deg=0,scale=1;
let style={};

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {src: props.src ? props.src : props.altSrc, draggable: !!props.src};
    this.reader = new FileReader();
    this.viewPicture = false;
    let that = this;
    this.reader.onload = (e) => {
      that.setState({src: e.target.result, draggable: true});
    };
  }


  same(nextProps, props) {
    let newSrc = nextProps.src;
    let oldSrc = props.src;
    if (newSrc === oldSrc)
      return true;


    if (newSrc && oldSrc) {
      if (newSrc instanceof File && oldSrc instanceof File && newSrc.name === oldSrc.name && newSrc.size === oldSrc.size) {
        return true;
      }
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.same(nextProps, this.props)) {
      let src = nextProps.src;

      if (!src) {
        return;
      }

      if (src instanceof File) {
        if (src.type.match(/image.*/)) {
          this.reader.readAsDataURL(src);
        }
      } else {
        this.setState({src: src, draggable: true});
      }
    }
  }
    openViewPicture=()=>{
        this.viewPicture=true;
        this.forceUpdate();
    }
    closeImage=()=>{
        this.viewPicture=false;
        scale=1;
        deg=0;
        style={};
        this.forceUpdate();
    }
    youxuanzhuan=()=>{
        deg+=90;
        style={
            transform:'scale('+scale+') rotate('+deg+'deg)'
        }
        this.forceUpdate();
    }
    zuoxuanzhuan=()=>{
        deg-=90;
        style={
            transform:'scale('+scale+') rotate('+deg+'deg)',
        }
        this.forceUpdate();
    }
    suoxiao=()=>{
        scale/=1.1;
        style={
            transform:'scale('+scale+') rotate('+deg+'deg)',
        }
        this.forceUpdate();
    }
    fangda=()=>{
        scale*=1.1;
        style={
            transform:'scale('+scale+') rotate('+deg+'deg)'
        }
        this.forceUpdate();
    }
  handleError = (e) => {
    let state = {draggable: false};
    if (this.props.src !== this.props.altSrc)
      state.src = this.props.altSrc;
    this.setState(state);
  };

  render() {
    return <div>
      <img className={this.props.className} style={this.props.style}
                src={this.state.src} onError={this.handleError} draggable={this.state.draggable}
                onDragStart={this.props.onDragStart} onLoad={this.props.onLoad}
           onClick={this.openViewPicture}/>
      <ViewPicture show={this.viewPicture} src={this.state.src} closeImage={this.closeImage} zxz={this.zuoxuanzhuan} yxz={this.youxuanzhuan} sx={this.suoxiao} fd={this.fangda} style={style}/>
    </div>
  }
}
