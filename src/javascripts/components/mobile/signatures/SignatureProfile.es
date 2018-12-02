import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../common/Header";
import NavMenu from "../common/NavMenu";
import Link from "../../commons/LangLink";
import { getSignProfile } from "../../../actions/signatureAction";
import push from "../../../utils/push";
import MallProductType from "../../../utils/MallProductType.es";
import { getBalance } from "../../../actions/userAction.es";

@connect(state => {
  return {
    profile: state.signature.profile,
    userInfo: state.user.kycs,
    organizations: state.organization.all,
    balance: state.user.balanceHolder,
  }
})

export default class SignatureProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getSignProfile());
    this.props.dispatch(getBalance(balance => {
      const count = balance.econtract || {};
      this.data.links[3].value.per = count.free + (count.nofree ? count.nofree.per : 0);
      this.data.links[3].value.org = (count.nofree ? count.nofree.org : 0);
    }));
  };

  data = {
    title: '保全签',
    links: [
      {
        title: '实名认证',
        detail: '实名认证使用保全签进行文件签署',
        font: "iconfont font-id",
        router: '/mobile/certification',
      },
      {
        title: '签章管理 ',
        detail: '管理在签署文件上显示的签章样式',
        font: "iconfont font-signatures",
        router: '/mobile/signatures/seals',
      },
      {
        title: '联系人管理',
        detail: '管理联系人便于快速发起签署',
        font: "iconfont font-link-man",
        router: '/mobile/signatures/members',
      },
      {
        title: '保全签次数',
        detail: '剩余能够用于发起保全签的次数',
        font: "iconfont font-values",
        router: `/mobile/mall?productType=${MallProductType.eContract}`,
        value: {per: 0, org: 0}
      },
    ]
  };

  toAuthentication = () => {
    this.props.dispatch(push(`/mobile/signatures/seals`));
  };

  render() {
    let {userInfo, profile, organizations} = this.props,
      organization = organizations[organizations.length - 1] || {};

    return <div className="signatures-profile product-common">
      <Header>
        <Link to="/mobile">
          <img className="logo" src={require('../../../../images/logo@2x.png')} alt=''/>
        </Link>
        <span className="title">{this.data.title}</span>
        <NavMenu/>
      </Header>
      {
        userInfo.isKycPass === "PASS" || organization.organizationStatus === "PASS" ?
          "" :
          <div className="real-name-bar">
            <p>
              <i className="iconfont font-attention"/>
              <span>使用保全签进行文件签署，需要完成实名认证。</span>
            </p>
            <button onClick={this.toAuthentication}>立即认证</button>
          </div>
      }
      <div className="signatures-content">
        <article className="file-status">
          <section>
            <p className="count">{profile.WAIT_ME ? profile.WAIT_ME.count : ''}</p>
            <p className="status">待我签署</p>
          </section>
          <section>
            <p className="count">{profile.WAIT_OTHERS ? profile.WAIT_OTHERS.count : ''}</p>
            <p className="status">待别人签署</p>
          </section>
          <section>
            <p className="count">{profile.DONE ? profile.DONE.count : ''}</p>
            <p className="status">完成签署</p>
          </section>
        </article>
        <Link to="/mobile/signatures/list" className="my-files">
          <p>
            <i className="iconfont font-files"/>
            我的文件
          </p>
          <i className="iconfont font-arrow-left"/>
        </Link>
      </div>
      <article className="signatures-items">
        {this.data.links.map(
          (item, i) =>
            <Link to={item.router} className="items" key={i}>
              <i className={item.font}/>
              <aside>
                <p className="title">{item.title}</p>
                <p className="detail">{item.detail}</p>
              </aside>
              {
                item.value && item.value.per ?
                  <span className='count top'>个人：<span className='blue-font'>{item.value.per}</span></span>
                  : ''
              }
              {
                item.value && item.value.org ?
                  <span className='count bottom'>企业：<span className='blue-font'>{item.value.org}</span></span>
                  : ''
              }
            </Link>
        )}
      </article>
      <p className="add-signature-tip">如需发起签署，请在电脑端登录保全网发起合同</p>
    </div>
  }
}