import React, { Component } from "react";
import cx from "classnames";

class Dialog extends Component{
    componentWillReceiveProps(nextProps){
        this.setState({
            show: nextProps.show
        })
    }
    constructor(props){
        super(props)
        this.state = {
            show: this.props.show
        }
    }
    render(){
    const {style,borderBottom,style1}=this.props;
    // const styles={
    //     width:this.props.width,
    //     height:this.props.height,
    //     background:this.props.background,
    //     border:this.props.border,
    //     borderRadius:this.props.borderRadius,
    //     marginLeft:-(this.props.width/2),
    // }
    return <div style={style} className={cx("diaLog",{diaLogActive:this.state.show})}>
            <div className="diaContent" style={style1}>{this.props.children}</div>
             <div className="diaSanjiao" style={borderBottom}></div>
            </div>
    }
}

export default Dialog;