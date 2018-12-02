import React, { Component } from "react";
import LanguageUtil from "../../utils/LanguageUtil";
import TosEn from "./TosEn.es";
import TosZh from "./TosZh.es";

export default class Tos extends Component {

  render() {
    return <div>
      {LanguageUtil.lang === "en" ? <TosEn/> : <TosZh/>}
    </div>
  }
}