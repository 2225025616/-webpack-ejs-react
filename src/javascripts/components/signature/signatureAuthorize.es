import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import { getSignatureAuthorize, deleteSignatureAuthorize} from "../../actions/signatureAction";
import ColumnInput from "../commons/ColumnInput";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import Paginate from "react-paginate";

@connect(state => {
  return {
    authorize: state.signature.authorize,
  }
})

export default class signatureAuthorize extends Component {
  constructor(props) {
    super(props);
    this.selectItem = {};
    this.resetCondition();
  }

  state = {
    loading: true,
    showCancelModal: false,
  };

  resetCondition() {
    this.pageNo = 0;
    this.pageSize = 10;
  }

  componentDidMount() {
    this.doQuery();
  }

  doQuery = (props) => {
    this.props.dispatch(getSignatureAuthorize({
      page: this.pageNo,
      size: this.pageSize,
    },
      () => this.setState({loading: false})
    ));
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.forceUpdate();
    this.doQuery(this.props);
  };

  openCancelModal = item => {
    this.setState({showCancelModal: true});
    this.selectItem = item;
    this.forceUpdate();
  };

  closeCancelModal = () => {
    this.setState({showCancelModal: false});
  };

  handleDeleteAuthorize = () => {
    this.props.dispatch(deleteSignatureAuthorize(this.selectItem.id,
      () => {
        this.doQuery();
        this.closeCancelModal();
      }));
  };

  hidePhone = (phone) => {
    var tel = phone.substr(0, 3) + '****' + phone.substr(7);
    return tel;
  };

  showStatus = (status) => {
    switch (status){
      case "DONE":
        return T.translate("signature.authorized");
      case "INIT":
        return T.translate("signature.authorizeing");
      case "DELETED":
        return T.translate("notary.cancel");
    }
  };


  render() {
    const {authorize} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="container-wrapper">
      <div className="container member-container">
        <div className="signature-authorize">
          <p className="table-name">{T.translate("signature.authorize")}</p>
          <article className="member-content">
            <table className="common-table-list member-table-first">
              <thead>
              <tr>
                <th style={{width: "30%"}}>{T.translate("signature.authorize-org")}</th>
                <th style={{width: "20%"}}>{T.translate("signature.authorize-at")}</th>
                <th style={{width: "20%"}}>{T.translate("signature.authorize-phone")}</th>
                <th style={{width: "15%"}}>{T.translate("notary.status")}</th>
                <th style={{width: "15%"}} className="operate-name">{T.translate("notary.operate")}</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.loading ?
                  <div className="table-placeholder" colSpan="4">
                    <img style={{marginTop: 60}} src={require('../../../images/loading.gif')} alt=""/><br/><br/>
                    {T.translate("common.loading")}
                  </div>
                  : authorize.totalPage <= 0 ?
                  <div className="table-placeholder" colSpan="4">
                    <img
                      src={require("images/members/placeholder-attestations-list.png")}/><br/>
                    {T.translate("common.no-sign-auth-info")}
                  </div>
                  :
                  authorize.authorization.map(item => {
                    return <tr>
                      <td style={{width: "30%"}}>{item.organizationName}</td>
                      <td style={{width: "20%"}}>{fmt.format(item.createdAt)}</td>
                      <td style={{width: "20%"}}>{this.hidePhone(item.userPhone)}</td>
                      <td style={{width: "15%"}}>{this.showStatus(item.status)}</td>
                      <td className="operates" style={{width: "15%"}}>
                        {
                          item.status=="DONE" ?
                            <p onClick={e=>this.openCancelModal(item)}>{T.translate("signature.cancel-authorize")}</p>
                            :
                            <span className="authorize-cancel">——</span>
                        }
                      </td>
                    </tr>
                  })
              }
              </tbody>
            </table>
            <hr className="division"/>
            { authorize.totalPage > 0 ?
              <Paginate previousLabel={"<"}
                        nextLabel={">"}
                        breakLable={<a href="">...</a>}
                        pageNum={authorize.totalPage}
                        forceSelected={authorize.pageNo}
                        marginPagesDisplayed={Page.PAGE_DISPLAY}
                        pageRangeDisplayed={Page.RANGE_DISPLAY}
                        clickCallback={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/> : "" }

          </article>
          {this.state.showCancelModal ?
            <ModalContainer onClose={this.closeCancelModal}>
              <ModalDialog onClose={this.closeCancelModal} width={665} className="example-dialog"
                           dismissOnBackgroundClick={true}>
                <h1>{T.translate("signature.cancel-authorize")}</h1>
                <form className="confirm">
                  <p>{T.translate("signature.is-cancel-authorize")}{this.selectItem.organizationName}?</p>
                  <div className="button-group">
                    <button type="button" className="yes"
                            onClick={this.handleDeleteAuthorize}>{T.translate("common.delete")}</button>
                    <button type="button" className="no"
                            onClick={this.closeCancelModal}>{T.translate("common.cancel")}</button>
                  </div>
                </form>
              </ModalDialog>
            </ModalContainer>
            : null}
          <div>
          </div>
        </div>
      </div>
    </div>
  }
};
