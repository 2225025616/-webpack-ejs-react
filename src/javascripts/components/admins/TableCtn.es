import React, { Component } from "react";
import { changeTemplateState } from "../../actions/adminAction";


export default class TableCtn extends Component {
  constructor(props) {
    super(props);
  };
  handleChangeState = () => {
    let templateId = this.props.template.id;
    this.props.dispatch(changeTemplateState(templateId));
  }
  render() {
    let {template, type} = this.props;
    console.log(template.id)
    return (
      <tr>
        <td><a href={`/templates/${template.id}`} target="blank">{template.id}</a></td>
        <td>{template.title}</td>
        <td>{template.productName}</td>
        <td>{template.organizationName}</td>
        <td>{type[template.state]}</td>
        <td>
          {
            template.id ?
              <button className="reset-btn" onTouchTap={this.handleChangeState}>重置</button>
              : ""
          }
        </td>
      </tr>
    )
  }
}
