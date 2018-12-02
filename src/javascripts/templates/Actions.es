import { Component } from 'react';
import {connect} from "react-redux";
import {Button} from "react-bootstrap";

@connect(state=> {
  return {loading: state.api.loading}
})
export default class Buttons extends Component {
  constructor(props) {
    super(props);
  };

  handleUpdateTemplate = () => {
    this.buttonClick = "save";
    this.props.facade.updateTemplate();
  };

  handlePreview = () => {
    this.buttonClick = "preview";
    this.props.facade.previewTemplate();
  };

  render() {
    let facade = this.props.facade;
    let buttonClick = this.buttonClick ;
    this.buttonClick = "" ;

    let editButtons;
    if (facade.editable) {
      editButtons = [
        <Button key="source" className="btn btn-info btn-lg" onClick={facade.showSourceDialog}>源代码</Button>,
        <Button key="save" className="btn btn-primary btn-lg" onClick={this.handleUpdateTemplate} disable={this.props.loading}>
          {buttonClick=="save" && this.props.loading ? "保存中...":"保存" }</Button>
      ];
    }

    return (
      <div className="page-actions">
        <Button className="btn btn-info btn-lg" onClick={this.handlePreview}
                disabled={this.props.loading}>
          {buttonClick == "preview" && this.props.loading ? "预览中..." :"预览"} </Button>
        {editButtons}
      </div>
    );
  }
}
