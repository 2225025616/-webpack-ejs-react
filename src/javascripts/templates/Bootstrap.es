import React,{Component} from "react";
import ReduxToastr from 'react-redux-toastr';

export default class Bootstrap extends Component {
  render() {
      return <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          position="top-center"/>;
  }
}