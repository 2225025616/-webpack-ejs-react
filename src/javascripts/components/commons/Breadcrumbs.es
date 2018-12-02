import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";

@connect(
  state => {
    return {breadcrumbs: state.breadcrumbs};
  }
)
export default class Breadcrumbs extends Component {
  render() {
    let {breadcrumbs} = this.props;
    return <ol className="breadcrumbs">
      { breadcrumbs.map(
        (item, index) => {
          if (item.href) {
            return <li key={index}>
              <Link to={item.href}>{item.name}</Link>
            </li>;
          } else {
            return <li key={index}>{item.name}</li>
          }
        }
      )}
    </ol>
  }
}