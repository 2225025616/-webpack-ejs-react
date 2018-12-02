/*
import React, { Component } from "react";
import Link from "../commons/LangLink";
import { connect } from "react-redux";
import { getBalance, getItemCount, getToDoList } from "../../actions/userAction";
import T from "i18n-react";

const styles = {
  modalButton: {
    marginTop: 8,
    float: "right",
  },
  flatButton: {
    margin: "6px 0",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  textfield: {
    width: "100%",
  }
};

@connect(state => {
  return {
    user: state.user.kycs,
    count: state.user.count,
    toDo: state.user.toDoList,
    organizations: state.organization.all,
    balanceHolder: state.user.balanceHolder,
  }
})

export default class UserProfile extends Component {
  componentWillMount() {
    this.props.dispatch(getBalance());
    this.props.dispatch(getItemCount());
    this.props.dispatch(getToDoList());
  }

  componentDidMount() {

  }

  statue(status) {
    switch (status) {
      case "PASS":
        return T.translate("user.certified");
      case "APPLY":
        return T.translate("user.certifing");
      case "REJECT":
        return T.translate("user.re-certify");
      case "":
        return T.translate("user.to-certify");
    }
  }

  fmoney(money) {
    let n = 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = money.split(".")[0].split("").reverse(),
      r = money.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }

  render() {
    let {user, balanceHolder, count, toDo, organizations} = this.props,
      organization = organizations[organizations.length - 1] || {};
    let balance = this.fmoney(balanceHolder.balance);
    let amount = balance.toString().split('.');

    return <div className="container-wrapper">
      <div className="container">
        <div className="user-profile">
          <h1>{T.translate("user.welcome")},{user.phoneNumber}</h1>
          <div className="content">
            <article className="account">
              <section className="org">
                <h2>{T.translate("user.my-certify")}</h2>
                <div className="certification">
                  <div className="business">
                    <h3>{T.translate("user.org-certify")}</h3>
                    {
                      organization.id ? [
                        <Link key="2" to={`/organizations/${organization.id}`}>
                          <p key="1" className="name">{organization.name}</p>
                        </Link>,
                        <Link key="3" to={`/organizations/${organization.id}/kyc`}>
                          <button className="pass-org-kyc">{this.statue(organization.organizationStatus)}</button>
                        </Link>
                      ] : <Link to={`/organizations/new`}>
                        <button className="blueButton">{T.translate("user.new-org")}</button>
                      </Link>
                    }
                  </div>
                  <div className="user">
                    <h3>{T.translate("user.user-certify")}</h3>
                    {
                      user.isKycPass !== "" ?
                        <p>
                          <span className="name is-user-auth">{user.realName}</span>
                          <Link to={`/user-kyc`}>
                            <button className="pass-user-kyc">{this.statue(user.isKycPass)}</button>
                          </Link>
                        </p>
                        :
                        <Link to={`/user-kyc`}>
                          <button className="blueButton">{T.translate("user.to-certify")}</button>
                        </Link>
                    }
                  </div>
                </div>
              </section>
              <section className="balance">
                <h2>{T.translate("user.balance")}</h2>
                <div className="content">
                  <p>
                    <span className="amount">{amount[0]}</span>
                    <span className="decimal">.{amount[1]}</span>
                    <span className="unit">{T.translate("common.rmb")}</span>
                  </p>
                  <div>
                    <Link to={`/pay`}>
                      <button className="blueButton">{T.translate("pay.instant-recharge")}</button>
                    </Link>
                    {/!*<Link to={`/mall`}>
                      <span className="word">{T.translate("pay.mall")}</span>
                    </Link>*!/}
                    {/!*
                     <Link to={`/order-management?showOrder=false`}>
                     <span>代金券</span>
                     </Link>
                     *!/}
                  </div>
                </div>
              </section>
              <section className="notice">
                <h2>{T.translate("user.to-do")}</h2>
                <div className="all">
                  <Link to={`/notifications`}>
                    <p>
                      <span className="count">{toDo.countNotification}</span>
                      <span className="detail">{T.translate("user.to-read")}</span>
                    </p>
                  </Link>
                  <Link to={`/order-management`}>
                    <p>
                      <span className="count">{toDo.countTrade}</span>
                      <span className="detail">{T.translate("user.to-pay")}</span>
                    </p>
                  </Link>
                  <Link to={`/signatures`}>
                    <p>
                      <span className="count">{toDo.countContract}</span>
                      <span className="detail">{T.translate("user.to-sign")}</span>
                    </p>
                  </Link>
                </div>
              </section>

            </article>
            <article className="product">
              <h2>{T.translate("product.my-products")}</h2>
              <div className="content">
                <Link to={`/attestations`}>
                  <section>
                    <i className="iconfont font-data"/>
                    <div>
                      <p className="title">{T.translate("product.data")}</p>
                      <p>
                        <span className="count">{count ? count.countAttestation : ""}</span>
                        <span>{T.translate("user.item")}</span>
                      </p>
                    </div>
                  </section>
                </Link>
                <Link to={`/signatures/profile`}>
                  <section>
                    <i className="iconfont font-contract1"/>
                    <div>
                      <p className="title">{T.translate("signature.all-signature")}</p>
                      <p>
                        <span className="count">{count ? count.countContract : ""}</span>
                        <span>{T.translate("common.portion")}</span>
                      </p>
                    </div>
                  </section>
                </Link>
                {/!*
                 <Link to={`/attestations`}>
                 <section>
                 <i className="iconfont font-record"></i>
                 <div>
                 <p className="title">诚信档案评分</p>
                 <p>
                 <span className="count">10000</span>
                 <span>分</span>
                 </p>
                 </div>
                 </section>
                 </Link>
                 *!/}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  }
};
*/
