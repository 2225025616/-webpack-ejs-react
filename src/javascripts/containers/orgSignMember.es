import React from "react" ;
import Sidebar from "../components/commons/Sidebar";
import Head from "../components/commons/Head";

export default function orgSignMember(Component) {
  class MemberComponent extends React.Component {
    render() {

      let secondNav = {
        name: "企业签约",
        list:[
  /*        {
            name: "在线签约",
            link: "/signatures/profile",
            icon: require('../../images/components/sidebar/sign-online.png'),
            iconActive: require('../../images/components/sidebar/sign-online-active.png'),
          },*/
          {
            name: "合同管理",
            link: "/signatures",
            icon: require('../../images/components/sidebar/sign-list.png'),
            iconActive: require('../../images/components/sidebar/sign-list-active.png'),
          },
/*          {
            name: "联系人管理",
            link: "/signatures/member",
            icon: require('../../images/components/sidebar/sign-linkMan.png'),
            iconActive: require('../../images/components/sidebar/sign-linkMan-active.png'),
          },*/
          {
            name: "签章管理",
            link: "/signatures/official-seal",
            icon: require('../../images/components/sidebar/sign-pic.png'),
            iconActive: require('../../images/components/sidebar/sign-pic-active.png'),
          },
          {
            name: "API接口签约",
            link: "/org-sign",
            icon: require('../../images/components/sidebar/sign-api.png'),
            iconActive: require('../../images/components/sidebar/sign-api-active.png'),
          },
        ]
      };

      return <div>
        <Head />
        <div className="children-main-content">
          <Sidebar sidebarList={secondNav}/>
          <Component />
        </div>
      </div>
    }
  }

  return MemberComponent;
}