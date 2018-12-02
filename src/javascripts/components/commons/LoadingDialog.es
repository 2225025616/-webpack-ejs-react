import React, { Component } from "react";

export default class LoadingDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: this.props.show
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            show: nextProps.show
        })
    }
  render() {

    return <div className="view-image">
      {this.state.show ?
        <div className="model-image">
          <div className="pic-box">
            <div className="spinner-loading">
              <div className="spinner-container container1">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
              <div className="spinner-container container2">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
              <div className="spinner-container container3">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
              </div>
            </div>
              <p>正在取证中...</p>
          </div>
        </div>
        :
        ""
      }
      </div>

  }
}
