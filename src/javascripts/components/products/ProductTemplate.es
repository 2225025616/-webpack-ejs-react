import React, { Component, PropTypes } from "react";
import Formatter from "../../lib/formatter";
import { connect } from "react-redux";
import {
  createTemplate,
  destroyTemplate,
  getTemplates,
  submitTemplate,
  updateTitle
} from "../../actions/templateAction";
import IdUtil from "../../utils/IdUtil";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import Link from "../commons/LangLink";
import T from "i18n-react";
import cx from "classnames";

@connect((state, ownerProps) => {
    return {
      template: state.template.all[ownerProps.index],
      params: state.router.params
    }
  }, null, null, {withRef: true}
)
class TemplateItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
    };
  }

  templateState = (e) => {
    switch (e) {
      case "DRAFT":
        return T.translate("template.darft");
      case "INITIAL":
        return T.translate("template.initial");
      case "IN_REVIEW":
        return T.translate("template.in-review");
      case "APPROVED":
        return T.translate("template.approved");
      case "REJECTED":
        return T.translate("template.rejected");
      case "OFFLINE":
        return T.translate("template.offline");
    }
  };

  handleUpdateTitle = (e) => {
    let title = e.target.value;
    this.inEdit = false;
    this.props.dispatch(updateTitle(this.props.template.id, title));
  };

  handleKeyPress = (e) => {
    if (e.which === 13) {
      this.handleUpdateTitle(e);
    }
  };

  handleSwitchTitle = (e) => {
    this.inEdit = true;
    this.setState({});
  };

  handleNewTemplate = () => {
    let productId = IdUtil.productId(this.props);
    this.props.dispatch(createTemplate(productId, this.props.template.id))
  };

  handleSubmitTemplate = () => {
    this.props.dispatch(submitTemplate(this.props.template.id));
  };

  openDeleteModal = () => {
    this.setState({showDeleteModal: true});
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  handleDeleteTemplate = () => {
    let templateId = this.props.template.id;
    this.props.dispatch(destroyTemplate(templateId));
    this.setState({showDeleteModal: false});
  };


  render() {
    let formatter = Formatter.get("yyyy-mm-dd");
    let x = this.props.template;
    let tooltip = "";
    let title = x.title;
    if (x.title.length >= 21) {
      tooltip = x.title;
      title = x.title.substring(0, 20) + "...";
    }
    let titleDiv;

    if (this.inEdit)
      titleDiv = <div className="template-name">
        <input type="text" style={{width: "130px", color: "#333"}} defaultValue={x.title} autoFocus
               onBlur={this.handleUpdateTitle} onKeyPress={this.handleKeyPress}/></div>
    else
      titleDiv = <div className="template-name">
        {
          x.state === "DRAFT" || "REJECTED" ?
            <div className="edit-title">
              <span>{title}</span>
            </div>
            :
            <span className="show-title">{title}</span>
        }
      </div>;
    let footerButtons;
    let deleteButton;
    if (['DRAFT', 'REJECTED'].indexOf(x.state) > -1) {
      footerButtons = [
        <div key={1} className="template-footer">
          <a target="blank" href={`/templates/${x.id}`} title={tooltip}
             className="btn">{T.translate("template.view")}</a>
          <hr/>
          <button className="btn" onClick={this.handleSwitchTitle}>{T.translate("template.rename")}</button>
          <hr/>
          <button className="btn" onClick={this.handleSubmitTemplate}>{T.translate("template.submit")}</button>
          <hr/>
          <button className="btn" onClick={this.handleNewTemplate}>{T.translate("template.copy")}</button>
        </div>
      ];
      deleteButton = [
        <div key={1} className="template-delete" onClick={this.openDeleteModal}>
          <img
            src={require("images/components/product/delete.png")}/>
          {this.state.showDeleteModal ?
            <ModalContainer onClose={this.closeDeleteModal}>
              <ModalDialog onClose={this.closeDeleteModal}>
                <div className="delete-template">
                  <h1>{T.translate("common.delete-modal")}</h1>
                  <section className="content">
                    <p>{T.translate("common.confirm-delete-modal")}</p>
                    <button type="button" className="yes"
                            onClick={this.handleDeleteTemplate}>{T.translate("order.ok")}</button>
                    <button type="button" className="no"
                            onClick={this.closeDeleteModal}>{T.translate("common.cancel")}</button>
                  </section>
                </div>
              </ModalDialog>
            </ModalContainer>
            : ""}
        </div>
      ]
    } else {
      footerButtons = [
        <div key={1} className="template-footer audit">
          <a target="blank" href={`/templates/${x.id}`} title={tooltip}
             className="btn">{T.translate("template.view")}</a>
          <hr/>
          <button className="btn" onClick={this.handleNewTemplate}>{T.translate("template.copy")}</button>
        </div>
      ]
    }

    return (
      <div className="template-item">
        <div className="template-title">
          <div>
            <span className="template-state">
            {x.state === "REJECTED" ?
              <abbr title={T.translate("common.reject-reason") + x.rejectReason}>{this.templateState(x.state)}</abbr>
              :
              this.templateState(x.state)
            }
            </span>
            <span className="date-time">{formatter.format(x.updatedAt)}</span>
          </div>
          {deleteButton}
        </div>

        <div className="template-content">
          {titleDiv}
          <div className="template-id">{x.id}</div>
        </div>

        {footerButtons}
      </div>
    );
  }
}

@connect(state => {
  return {
    template: state.template.info,
    all: state.template.all,
    mothers: state.template.mothers,
    product: state.product.all,
    params: state.router.params,
    orgInfo: state.organization.orgInfo,
  }
})

export default class ProductTemplate extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showNewModal: false,
    };
  }

  openNewModal = () => {
    this.setState({showNewModal: true});
  };

  closeNewModal = () => {
    this.setState({showNewModal: false});
  };

  componentDidMount() {
    let productId = IdUtil.productId(this.props);
    if (productId) {
      this.props.dispatch(getTemplates(productId));
    }
  }

  componentWillReceiveProps(nextProps) {
    let newProductId = IdUtil.productId(nextProps);
    let productId = IdUtil.productId(nextProps);

    if (newProductId !== productId) {
      this.props.dispatch(getTemplates(newProductId));
    }

    if (!IdUtil.sameProduct(nextProps, this.props)) {
      if (productId) {
        this.props.dispatch(getTemplates(productId));
      }
    }
  }

  handleNewTemplate = (template) => {
    let productId = IdUtil.productId(this.props);
    this.props.dispatch(createTemplate(productId, template.id));
    this.setState({showNewModal: false});
  };

  render() {
    const {all, mothers, product, orgInfo} = this.props;
    let productId = IdUtil.productId(this.props);
    let productName = product.find(item => item.id === productId);
    let tempList = [];

    if(all.length>0){
      if(all[0].productId === productId){
        tempList = all;
      }
    }

    return (
      <div className="template-list">
        <div className="new-item">
          <span onClick={this.openNewModal}>+</span>
          {this.state.showNewModal ?
            <ModalContainer onClose={this.closeNewModal}>
              <ModalDialog onClose={this.closeNewModal}>
                <div className="template-modal">
                  <h2>{T.translate("common.select-modal")}</h2>
                  <p className="template-tip">模板仅为API保全使用，如需调用API保全接口，请先设置密钥。
                    <Link to={`/organizations/${orgInfo.id}/orgKeyManagement`}>
                      <span>前往设置</span>
                    </Link>
                  </p>
                  <div className="templates">
                    {
                      Object.keys(mothers).map((x) => {
                        let template = mothers[x];
                        return (
                          <div key={x} className={"modal-container " + template.coverStyle}
                               onClick={e => this.handleNewTemplate(template)}>
                            <p className="title">{template.title}</p>
                            <p className="comment">{template.comment}</p>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </ModalDialog>
            </ModalContainer>
            : ""}
          <p>
            {T.translate("template.new-template")}
          </p>
        </div>
        {
          tempList.map((x, index) => {
            return <TemplateItem key={index} index={index}/>;
          })
        }
      </div>
    );
  }
};
