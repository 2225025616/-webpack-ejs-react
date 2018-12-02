import React from "react" ;
import Sidebar from "../components/commons/Sidebar";
import Head from "../components/commons/Head";

export default function orgAttestationMember(Component) {
  class MemberComponent extends React.Component {
    render() {

      let secondNav = {
        name: "企业保全",
        list:[
          {
            name: "企业产品维护",
            link: "/org-attestation/count",
            icon: require('../../images/components/sidebar/org-att-api.png'),
            iconActive: require('../../images/components/sidebar/org-att-api-active.png'),
          },
          {
            name: "企业文件保全",
            link: "/org-attestations/list",
            icon: require('../../images/components/sidebar/org-att-file.png'),
            iconActive: require('../../images/components/sidebar/org-att-file-active.png'),
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