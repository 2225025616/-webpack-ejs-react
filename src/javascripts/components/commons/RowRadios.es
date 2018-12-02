import React, { Component } from "react";

export default class RowRadios extends Component {

  render() {
    let {file, items} = this.props;

    return <div className="radios">
      {items.map(
        (item, i) => [
          file.value !== undefined ?
            <input key={`${i}-1`} id={`${file.name}-${i}`} name={file.name} type="radio" value={item.value}
                   checked={file.value.toString() === item.value.toString()} onChange={file.onChange}/> :
            <input key={`${i}-1`} id={`${file.name}-${i}`} name={file.name} type="radio" value={item.value}
                   defaultChecked={item.defaultChecked || false} onChange={file.onChange}/>,
          <label key={`${i}-2`} htmlFor={`${file.name}-${i}`}>{item.text}</label>
        ]
      )}
    </div>
  }
}
