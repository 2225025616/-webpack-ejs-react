import React, { Component } from "react";
import Dialog from "./Dialog"

const style={
    width:640,
    height:340,
    background:"#fff",
    boxShadow:"0 0 7px 3px rgba(0,0,0,0.05)",
    marginLeft:-220,
    padding:'20px 15px',
    // textAlign:'center',
    // lineHeight:'340'
}
const style1={
    width:600,
    height:310,
}
const borderBottom={
    borderBottom:"10px solid #fff",
    left:200
}

class CardImage extends Component{
    constructor(props){
        super(props);
    }
    state={
        show:false
    }
    openImage=()=>{
        this.setState({show:true})
    }
    closeImage=()=>{
        this.setState({show:false})
    }
    render(){
        const {frontSrc,backSrc}=this.props;
        const children = (
            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={frontSrc} alt="" style={{minWidth:200,maxWidth:300,minHeight:200,maxHeight:300,width:300,height:200,marginRight:15}}/>
                <img src={backSrc} alt="" style={{minWidth:200,maxWidth:300,minHeight:200,maxHeight:300,width:300,height:200}}/>
            </div>
        );
        return <span style={{color:'#0a6dee',textDecoration:'underline',position:'relative'}} onMouseOver={this.openImage} onMouseOut={this.closeImage}>查看图片
                <Dialog style={style} style1={style1} borderBottom={borderBottom} children={children} show={this.state.show}/>
            </span>
    }
}

export default CardImage;