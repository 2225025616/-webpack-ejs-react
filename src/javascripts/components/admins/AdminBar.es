import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink"; // 封装router的link url地址栏增加当前语言指标
import AdminRoute from "./AdminRoute";
import cx from "classnames"; // 控制css的动态绑定

@connect(
  state => {
    return {
      location: state.router.location,
      newsInfo: state.admin.newsInfo,
    }
  }
)

export default class AdminBar extends Component {
  constructor(props) {
    super(props);
    this.activeList = '';
  }

  onMenuClicked = pos => {
    this.activeList = pos;
    this.forceUpdate();
  };


  render() {
    const { newsInfo } = this.props;
    let adminRoute = AdminRoute.adminRoute();
    let url = this.props.location.pathname;
    let newsId = newsInfo.id;
    return <nav className="admin-tabs">
      <div className="admin-logo">
        <img src={require("images/admin/admin-logo.png")}/>
        <p>保全网后台管理</p>
      </div>
      <li className={cx({ actives: this.activeList === 0 || url === `/${adminRoute}/user-kyc` || url === `/${adminRoute}/organization-kyc`
      || url === `/${adminRoute}/templates` || url === `/${adminRoute}/templates/reset-state`})}>
        <div onClick={() => this.onMenuClicked(0)}>
          <img src={require("images/admin/organization.png")}/>
          <span>认证面板</span>
        </div>
        <ul>
          <Link to={`/${adminRoute}/user-kyc`}>
            <li className={cx({ active: url === `${adminRoute}/user-kyc`})}>个人实名认证</li></Link>
          <Link to={`/${adminRoute}/organization-kyc`}>
            <li className={cx({ active: url === `${adminRoute}/organization-kyc`})}>组织实名认证</li></Link>
          <Link to={`/${adminRoute}/templates`}>
            <li className={cx({ active: url === `${adminRoute}/templates`})}>模板认证</li></Link>
          <Link to={`/${adminRoute}/templates/reset-state`}>
            <li className={cx({ active: url === `${adminRoute}/templates/reset-state`})}>模板状态重置</li></Link>
        </ul>
      </li>
      <li className={cx({ actives: this.activeList === 1 || url === `/${adminRoute}/web-management` || url === `/${adminRoute}/api/request` || url === `/${adminRoute}/org-sign-authorize`
      || url === `/${adminRoute}/user/consults` || url === `/${adminRoute}/news/new` || url === `/${adminRoute}/news/${newsId}` || url === `/${adminRoute}/packages` || url === `/${adminRoute}/packages/new`
       || url === `/${adminRoute}/org-chain-data`})}>
        <div onClick={() => this.onMenuClicked(1)}>
          <img src={require("images/admin/user.png")}/>
          <span>网站管理</span>
        </div>
        <ul>
          <Link to={`/${adminRoute}/web-management`}>
            <li className={cx({ active: url === `${adminRoute}/web-management`})}>网站管理</li></Link>
          <Link to={`/${adminRoute}/packages`}>
            <li className={cx({ active: url === `${adminRoute}/packages`})}>套餐管理</li></Link>
          <Link to={`/${adminRoute}/org-sign-authorize`}>
            <li className={cx({ active: url === `${adminRoute}/org-sign-authorize`})}>企业授权</li></Link>
          <Link to={`/${adminRoute}/org-chain-data`}>
            <li className={cx({ active: url === `${adminRoute}/org-chain-data`})}>企业上链数据</li></Link>
          <Link to={`/${adminRoute}/api/request`}>
            <li className={cx({ active: url === `${adminRoute}/api/request`})}>查看API请求</li></Link>
          <Link to={`/${adminRoute}/user/consults`}>
            <li className={cx({ active: url === `${adminRoute}/user/consults`})}>查看用户咨询信息</li></Link>
        </ul>
      </li>
      <li className={cx({ actives: this.activeList === 2 || url === `/${adminRoute}/attestations` || url === `/${adminRoute}/signatures`})}>
        <div onClick={() => this.onMenuClicked(2)}>
          <img src={require("images/admin/organization.png")}/>
          <span>保全管理</span>
        </div>
        <ul>
          <Link to={`/${adminRoute}/attestations`}>
            <li className={cx({ active: url === `${adminRoute}/attestations`})}>电子数据保全</li></Link>
          <Link to={`/${adminRoute}/signatures`}>
            <li className={cx({ active: url === `${adminRoute}/signatures`})}>电子合同</li></Link>
        </ul>
      </li>
      <li className={cx({ actives: this.activeList === 3 || url === `/${adminRoute}/gochains` || url === `/${adminRoute}/data-center` || url === `/${adminRoute}/data-products`
       || url === `/${adminRoute}/dashboard`})}>
        <div onClick={() => this.onMenuClicked(3)}>
          <img src={require("images/admin/template.png")}/>
          <span>数据统计</span>
        </div>
        <ul>
          <Link to={`/${adminRoute}/dashboard`}>
            <li className={cx({ active: url === `${adminRoute}/dashboard`})}>数据中心</li></Link>
          <Link to={`/${adminRoute}/data-center`}>
            <li className={cx({ active: url === `${adminRoute}/data-center`})}>数据统计</li></Link>
          <Link to={`/${adminRoute}/data-products`}>
            <li className={cx({ active: url === `${adminRoute}/data-products`})}>数据统计产品分析</li></Link>
          <Link to={`/${adminRoute}/gochains`}>
            <li className={cx({active: url === `${adminRoute}/gochains`})}>上链信息</li>
          </Link>
        </ul>
      </li>
      <li className={cx({ actives: this.activeList === 4 || url === `/${adminRoute}/users` || url === `/${adminRoute}/notary-users`})}>
        <div onClick={() => this.onMenuClicked(4)}>
          <img src={require("images/admin/user.png")}/>
          <span>成员面板</span>
        </div>
        <ul>
          <Link to={`/${adminRoute}/users`}>
            <li className={cx({ active: url === `${adminRoute}/users`})}>管理员</li></Link>
          <Link to={`/${adminRoute}/notary-users`}>
            <li className={cx({ active: url === `${adminRoute}/notary-users`})}>公证员</li></Link>
        </ul>
      </li>
    </nav>
  }

}
