import React, { Component } from "react";
import ViewPicture from './ViewPicture'

let deg=0,scale=1;
let style={};

export default class OrgImage extends Component {
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
        console.log(1)
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
    return <span>
      <span style={{color:'rgb(10, 109, 238)',textDecoration:'underline'}} onClick={this.openViewPicture}>查看图片</span>
      <ViewPicture show={this.viewPicture} src={this.state.src} closeImage={this.closeImage} zxz={this.zuoxuanzhuan} yxz={this.youxuanzhuan} sx={this.suoxiao} fd={this.fangda} style={style}/>
    </span>
  }
}
