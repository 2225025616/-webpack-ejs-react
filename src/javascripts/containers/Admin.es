import React , {Component, PropTypes} from "react" ;
import ReduxToastr from 'react-redux-toastr';

import AdminBar from "../components/admins/AdminBar";
import AdminInfo from "../components/commons/AdminInfo";

require("../../stylesheets/admin.scss");

export default class Admin extends Component {
  render() {
    return  <div className="contain-admin">
        <div className="admin-head">
          <AdminInfo />
        </div>
        {this.props.children}
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          position="top-center"
        />
      </div>
  }
}
