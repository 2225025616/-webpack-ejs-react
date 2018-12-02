import React, { Component } from "react";
import ViewPicture from './ViewPicture'

let deg=0,scale=1;
let style={};

export default class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state={
      src:this.props.src
    }
    this.viewPicture = false;
  }

  componentWillReceiveProps(nextProps) {

  }
    openViewPicture=()=>{
        this.viewPicture=true;
        this.forceUpdate();
        console.log(this.props)
        // this.props.changeShow(this.viewPicture)
    }
    closeImage=()=>{
        this.viewPicture=false;
        scale=1;
        deg=0;
        style={};
        this.forceUpdate();
      // this.props.changeShow(this.viewPicture)
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

  render() {
    return <div>
      <img style={this.props.style} src={this.state.src} onClick={this.openViewPicture}/>
      <ViewPicture show={this.viewPicture} src={this.state.src} closeImage={this.closeImage} zxz={this.zuoxuanzhuan} yxz={this.youxuanzhuan} sx={this.suoxiao} fd={this.fangda} style={style}/>
    </div>
  }
}
