import React from "react" ;
import AdminBar from "../components/admins/AdminBar"; // 左侧导航

export default function adminBar(Component) {
  class AdminBarComponent extends React.Component {
    render() {
      return <div className="contain-admin">
        <AdminBar />
        <Component />
      </div>
    }
  }

  return AdminBarComponent;
}
