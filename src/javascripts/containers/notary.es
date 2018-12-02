import React from "react" ;
import NotaryBar from "../components/notaries/NotaryBar";
import Head from "../components/commons/Head";

export default function member(Component) {
  class NotaryComponent extends React.Component {
    render() {
      return <div>
        <Head />
        <div className="main-content">
          <NotaryBar />
          <Component />
        </div>
      </div>
    }
  }

  return NotaryComponent;
}
