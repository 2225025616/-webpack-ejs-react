import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import T from "i18n-react";
import Paginate from "react-paginate";
import {getToDoList} from "../../actions/userAction"

import { deleteNotification, findNotifications, markAll, readNotification } from "../../actions/notificationAction";
import Formatter from "../../lib/formatter";

@connect(state => {
  return {page: state.notification.all, list: state.notification.all.list}
})
export default class Notification extends Component {

  constructor(props) {
    super(props);
    this.selectedItems = {};
    this.identityType = "";
    this.pageNo = 0;
  }

  doQuery = (props) => {
    let notificationType = this.identityType;

    this.props.dispatch(findNotifications({
      pageNo: this.pageNo,
      pageSize: 10,
      notificationType,
    }));
  };

  componentDidMount() {
    this.doQuery(this.props);
  }

  handlePageClick = (e) => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  handleIdentityType = value => {
    if (this.identityType !== value) {
      this.pageNo = 0;
      this.identityType = value;
      this.doQuery(this.props);
    }
  };

  selectItem(e) {
    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
      this.selectedLength += 1;
    } else {
      delete this.selectedItems[e.id];
      this.selectedLength -= 1;
    }

    let {list} = this.props;
    let select = document.getElementsByTagName("input");
    select[0].checked = list.length === this.selectedLength;
    this.forceUpdate();
  }

  selectedCount() {
    let len = Object.keys(this.selectedItems).length;
    if (len > 0) {
      return "(" + len + ")";
    } else {
      return "";
    }
    this.forceUpdate();
  }

  selectAll(e) {
    let {list} = this.props;

    let select = document.getElementsByTagName("input");
    if (select[0].checked) {
      for (let i = 0; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = true;
      }
      for (let a = 0; a < list.length; a++) {
        this.selectedItems[list[a].id] = list[a];
      }
      this.selectedLength = list.length;
    }
    if (!select[0].checked) {
      for (let i = 0; i < select.length; i++) {
        if (select[i].type === "checkbox") select[i].checked = false;
      }
      this.selectedItems = {};
      this.selectedLength = 0;
    }
    this.forceUpdate();
  }

  handleMarkAll = () => {
    this.props.dispatch(markAll(()=>this.props.dispatch(getToDoList())));
  };

  // handleReadNotification = () => {
  //   let result = [];
  //   for (let item in this.selectedItems) {
  //     result.push(this.selectedItems[item].id);
  //   }
  //   this.props.dispatch(readNotification(result, () => {
  //     this.doQuery(this.props);
  //   }));
  // };
  handleReadOne=(id,isRead)=>{
    if(isRead!==true&&isRead!=='1'){
      let result=[];
      result.push(id)
      this.props.dispatch(readNotification(result, () => {
        this.doQuery(this.props);
        this.props.dispatch(getToDoList());
      }));
    }
  }

  handleDeleteNotification = () => {
    let result = [];
    for (let item in this.selectedItems) {
      result.push(this.selectedItems[item].id);
    }
    this.props.dispatch(deleteNotification(result, () => {
      this.doQuery(this.props);
    }));
  };

  type(type) {
    switch (type) {
      case "other":
        return T.translate("notification.other");
      case "product":
        return T.translate("notification.product-message");
      case "system":
        return T.translate("notification.notification-system");
    }
  }

  subtype(type) {
    switch (type) {
      case "attestation_eContract":
        return T.translate("notification.sign");
      case "product_notary_person":
        return T.translate("common.user-notary");
      case "product_notary_organization":
        return T.translate("common.org-notary");
      case "attestation_trade":
        return T.translate("notification.user-att");
      case "attestation_eContract_trade":
        return T.translate("notification.user-sign");
      case "kyc_pass":
        return T.translate("notification.user-key-pass");
      case "kyc_reject":
        return T.translate("notification.user-key-reject");
      case "kycEnterprise_pass":
        return T.translate("notification.org-key-pass");
      case "kycEnterprise_reject":
        return T.translate("notification.org-key-reject");
    }
  }

  render() {
    let {page, list} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let pageNotifications = this.props.page;

    return (
      <div className="container-wrapper">
        <div className="notification-container container member-container">
          <h2 className="table-name">{T.translate("notification.message-reminding")}</h2>
          <div className="member-content">
          <nav className="notify-tabs">
            <div>
              <button onClick={this.handleDeleteNotification}
                      disabled={this.selectedCount() <= 0}>{T.translate("notification.delete")}</button>
              {/*<button onClick={this.handleReadNotification}*/}
                      {/*disabled={this.selectedCount() <= 0}>{T.translate("notification.read")}</button>*/}
              <button onClick={this.handleMarkAll}>{T.translate("notification.all-read")}</button>
            </div>
            <hr/>
            <div className="button-group">
              <button className={cx({active: this.identityType === ""})}
                      onClick={e => this.handleIdentityType('')}>{T.translate("notification.all")}</button>
              <button className={cx({active: this.identityType === "product"})}
                      onClick={e => this.handleIdentityType('product')}>{T.translate("notification.product-message")}</button>
              {/*
               <button className={cx({active: this.identityType === "finance"})}
               onClick={e => this.handleIdentityType('finance')}>{T.translate("notification.financial-message")}</button>
               */}
              <button className={cx({active: this.identityType === "system"})}
                      onClick={e => this.handleIdentityType('system')}>{T.translate("notification.notification-system")}</button>
              <button className={cx({active: this.identityType === "other"})}
                      onClick={e => this.handleIdentityType('other')}>{T.translate("notification.other")}</button>
            </div>
          </nav>
          <div className="notification-table">
            <table>
              <thead>
              <tr>
                <td className="checkbox"><input type="checkbox" value="all" onClick={e => this.selectAll()}/></td>
                <td className="info">{T.translate("notification.content")}</td>
                <td className="date">{T.translate("notification.time")}</td>
                <td className="type">{T.translate("notification.type")}</td>
                <td className="subtype">{T.translate("notification.subtype")}</td>
              </tr>
              </thead>
              <tbody>
              {list.map(item => {
                return <tr key={item.id} className={cx({isRead: item.isRead === true || item.isRead === '1'})}>
                  <td className="checkbox"><input type="checkbox" onClick={e => this.selectItem(item)} checked={!!this.selectedItems[item.id]}/></td>
                  <td className="info" onClick={()=>this.handleReadOne(item.id,item.isRead)}>{item.data}</td>
                  <td>{fmt.format(item.createdAt)}</td>
                  <td>{this.type(item.category)}</td>
                  <td>{this.subtype(item.notificationType)}</td>
                </tr>
              })}
              </tbody>
            </table>
          </div>
          <hr/>
          <div className="all-page">
            {pageNotifications.totalPage > 0 ? <Paginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLable={<a href="">...</a>}
              pageNum={pageNotifications.totalPage}
              forceSelected={pageNotifications.pageNo}
              marginPagesDisplayed={5}
              pageRangeDisplayed={2}
              clickCallback={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            /> : ""}
          </div>
          </div>
        </div>
      </div>
    )
      ;
  }

}
