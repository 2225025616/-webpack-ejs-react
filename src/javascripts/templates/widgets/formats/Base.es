import React from "react";

export  default class Base extends React.Component {
  constructor(props) {
    super() ;
    this.state = {} ;

    this.form = props.form ;
  }

  changeState(newState) {
    this.form.changeState(newState) ;
  }

  fixFraction(len) {
    let zero = 0.0;
    return zero.toFixed(len).substring(1);
  }
}
