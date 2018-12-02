import React, { Component } from "react";

class ViewPicture extends Component{
    constructor(props){
        super(props)
        this.state={
            show:this.props.show,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            show: nextProps.show
        })
    }
    render(){
        let {src}=this.props;
        return <div className="view-image">
            {this.state.show ?
                <div className="model-image">
                    <div className="icon" onClick={()=>this.props.closeImage()}>x</div>
                    <div className="pic-box">
                        <div className="img-box">
                            <img src={src} alt="" style={this.props.style}/>
                        </div>
                        <div className="imageButton">
                            <span>
                                <i className="iconfont font-youxuanzhuan" onClick={()=>this.props.yxz()}></i>
                            </span>
                            <span><i className="iconfont font-zuoxuanzhuan" onClick={()=>this.props.zxz()}></i></span>
                            <span><i className="iconfont font-suoxiao" onClick={()=>this.props.sx()}></i></span>
                            <span><i className="iconfont font-fangda" onClick={()=>this.props.fd()}></i></span>
                        </div>
                    </div>
                </div>
                :
                ""
            }
        </div>
    }
}

export default ViewPicture;