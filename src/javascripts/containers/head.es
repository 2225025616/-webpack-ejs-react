import React from "react" ;
import Head from "../components/commons/Head";

export default function head(Component) {
  class HeadComponent extends React.Component {
    render() {
      return <div>
        <Head showAll="false"/>
        <Component />
      </div>
    }
  }

  return HeadComponent;
}