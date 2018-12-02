import React, { Component } from "react";

const styles = {
  showError: {
    display: "block",
  }
};
let inputContent;
export default class ColumnInput extends Component {
  constructor(props){
    super(props)
      this.state={
      value:this.props.value
      }
  }
    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value
        })
    }
    onChange=()=>{
        let input=this.refs.input;
        inputContent=input.value;
    }
  render() {
    let {placeholder, type, file, errorText, maxLength} = this.props;

    return <div className="column-input input-component">
      <input {...file} placeholder={placeholder} type={type} style={{width: '100%'}} maxLength={maxLength}/>
      <span className="error-text" style={errorText ? styles.showError : null}>{errorText}</span>
    </div>
  }
}