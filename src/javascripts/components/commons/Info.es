import React, { Component } from "react";
import Link from "../commons/LangLink";
import Dialog from "../commons/Dialog";
import { connect } from "react-redux";
import { signOut, getToDoList, getBalance, getUser, switchUser } from "../../actions/userAction";
import { readNotification } from "../../actions/notificationAction";
import cx from "classnames";
import T from "i18n-react";
import push from "../../utils/push";
import StorageUtil from "../../utils/StorageUtil";
import format from "../../utils/format.es";

@connect(state => {
  return {
    params: state.router.params,
    user: state.user.info,
    location: state.router.location,
    toDo: state.user.toDoList,
    userKycs: state.user.kycs,
    orgInfo: state.organization.orgInfo,
    balanceHolder: state.user.balanceHolder,
  }
})



export default class Info extends Component {

  state = {
    isOrg: "false",
  };

  componentWillMount = () => {
    this.props.dispatch(getToDoList());
    this.props.dispatch(getBalance());
  };

  componentDidMount = () => {
    this.setState({isOrg: StorageUtil.showOrganization()});
  };

  handleSignOut = e => {
    e.preventDefault();
    this.props.dispatch(signOut());
  };

  handleReadNotification = item => {
    this.props.dispatch(readNotification(item.id));
  };

  changeAccount = () => {
    const { user } =this.props;
    this.props.dispatch(switchUser(()=>{
      if(user.type=="ENTERPRISE"){
        StorageUtil.showOrganization("false");
        this.props.dispatch(push(`/attestations`));
      }
      else {
        StorageUtil.showOrganization("true");
        this.props.dispatch(push(`/org-statistic`));
      }
    }));
  };

  render() {
    let { user, toDo, userKycs, orgInfo, balanceHolder } = this.props;
    /*    StorageUtil.organizationId(orgInfo.id);//把第一个企业id存储，方便其他页面获取组织信息*/
    let balance = format.fmoney(balanceHolder.balance);
    let amount = balance.toString().split('.');

    let isOrg = StorageUtil.showOrganization();
    let borderBottom={
      borderBottom:"10px solid #fff"
    };

    return <div className="info">
      <li className={cx("message",{notice: toDo.countNotification>0})} style={{position:'relative'}}>
        <i className="toDoNumber">{toDo.countNotification>=100?'···':toDo.countNotification}</i>
        <i className="iconfont font-notic"/>
        <div className="hover-notice">
          <p>当前你有 <span className="number">{toDo.countNotification>=100?'···':toDo.countNotification}</span> 条未读消息</p>
          <Link to={`/notifications`}>
            <span>查看消息</span>
          </Link>
        </div>
      </li>
      {
        user.phoneNumber ?
          <li className="balance" style={{position:'relative'}}>
            <i className="iconfont font-balance"/>
            <div className="amount-hover">
              <p>
                <span className="name">余额：</span>
                <Link to={`/pay`}>
                  <span className="pay">充值</span>
                </Link>
              </p>
              <p className="money">{balance}</p>
            </div>
          </li>
          : ""
      }
      <div className={cx("notify-container")}>
        {
          user.phoneNumber ?
            <div className="user">
              <div className="user-content">
                {
                  isOrg === "true" ?
                    <span className="phone">{orgInfo.name}</span>
                    :
                    <span className="phone">{userKycs.isKycPass !== "PASS" ? userKycs.phoneNumber : userKycs.realName}</span>

                }
                <i className="iconfont font-down"/>
              </div>
              <ul>
                {
                  userKycs.userType && userKycs.userType.length>=2 ?
                    <li onClick={this.changeAccount}>切换{user.type=="ENTERPRISE" ? '个人' : '企业'}帐号</li>
                    :
                    ""
                }
                <Link to={`/setting`}>
                  <li>{T.translate("head.account")}</li>
                </Link>
              </ul>
            </div>
            : ""
        }
      </div>
      {
        user.phoneNumber ?
          <li className="login-out" onClick={this.handleSignOut}>
            <i className="iconfont font-quit"/>
            <T.a className="name" href="#" text={T.translate("head.login-out")}/>
          </li>
          : ""
      }
    </div>
      ;
  }
}
