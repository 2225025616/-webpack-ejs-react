import React from "react" ;
import Sidebar from "../components/commons/Sidebar";
import Head from "../components/commons/Head";
import StorageUtil from "../utils/StorageUtil";
import { connect } from "react-redux";

@connect(state => {
  return {
    orgInfo: state.organization.orgInfo,
  }
})

export default function settingMember(Component) {

  class MemberComponent extends React.Component {
    render() {
      let {orgInfo} = this.props;
      let orgId = orgInfo.id;
      let isOrg = StorageUtil.showOrganization();
      let userSettingNav = {
        name: "帐号管理",
        list:[
          {
            name: "基本设置",
            link: "/setting",
            icon: require('../../images/components/sidebar/setting-normal.png'),
            iconActive: require('../../images/components/sidebar/setting-normal-active.png'),
          },
          {
            name: "消息通知",
            link: "/notifications",
            icon: require('../../images/components/sidebar/setting-notic.png'),
            iconActive: require('../../images/components/sidebar/setting-notic-active.png'),
          },
          {
            name: "订单管理",
            link: "/order-management",
            icon: require('../../images/components/sidebar/setting-order.png'),
            iconActive: require('../../images/components/sidebar/setting-order-active.png'),
          },
/*          {
            name: "我的出证",
            link: "/notaries",
            icon: require('../../images/components/sidebar/setting-notary.png'),
            iconActive: require('../../images/components/sidebar/setting-notary-active.png'),
          },*/
          {
            name: "合同管理",
            link: "/signatures/personal",
            icon: require('../../images/components/sidebar/sign-list.png'),
            iconActive: require('../../images/components/sidebar/sign-list-active.png'),
          },
          {
            name: "签约授权",
            link: "/signatures/authorize",
            icon: require('../../images/components/sidebar/sign-auth.png'),
            iconActive: require('../../images/components/sidebar/sign-auth-active.png'),
          },
        ]
      };

      let orgSettingNav = {
        name: "帐号管理",
        list:[
          {
            name: "基本设置",
            link: "/setting",
            icon: require('../../images/components/sidebar/setting-normal.png'),
            iconActive: require('../../images/components/sidebar/setting-normal-active.png'),
          },
          {
            name: "消息通知",
            link: "/notifications",
            icon: require('../../images/components/sidebar/setting-notic.png'),
            iconActive: require('../../images/components/sidebar/setting-notic-active.png'),
          },
          {
            name: "订单管理",
            link: "/order-management",
            icon: require('../../images/components/sidebar/setting-order.png'),
            iconActive: require('../../images/components/sidebar/setting-order-active.png'),
          },
/*          {
            name: "我的出证",
            link: "/notaries",
            icon: require('../../images/components/sidebar/setting-notary.png'),
            iconActive: require('../../images/components/sidebar/setting-notary-active.png'),
          },*/
          {
            name: "我的保全",
            link: "/org-attestations",
            icon: require('../../images/components/sidebar/setting-att.png'),
            iconActive: require('../../images/components/sidebar/setting-att-active.png'),
          },
          {
            name: "密钥管理",
            link: `/organizations/${orgId}/orgKeyManagement`,
            icon: require('../../images/components/sidebar/setting-kyc.png'),
            iconActive: require('../../images/components/sidebar/setting-kyc-active.png'),
          },
          {
            name: "成员管理",
            link: `/organizations/${orgId}/orgMemberManagement`,
            icon: require('../../images/components/sidebar/setting-member.png'),
            iconActive: require('../../images/components/sidebar/setting-member-active.png'),
          },
        ]
      };

      return <div>
        <Head />
        <div className="children-main-content">
          <Sidebar sidebarList={isOrg === "false" ? userSettingNav : orgSettingNav}/>
          <Component />
        </div>
      </div>
    }
  }

  return MemberComponent;
}