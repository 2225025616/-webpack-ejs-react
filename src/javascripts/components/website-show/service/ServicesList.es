import React, { Component } from "react";
import Footer from "../Footer";
import Header from "../Header";
import FloatBar from "../FloatBar";

export default class ServicesList extends Component {

  render() {
    return <div className="web-show-container">
      <Header/>
      <FloatBar/>
      <Footer/>
    </div>
  }
}