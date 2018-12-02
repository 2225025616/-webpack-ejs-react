import React, { Component } from "react";

export default class Factom extends Component {
  render() {
    let entryHash = this.props.entryHash;
    if (entryHash) {
      entryHash = entryHash.toLowerCase();
    }

    return <a target="_blank" href={`http://explorer.factom.org/entry/${entryHash}`}>{this.props.fileHash}</a>
  }
}
