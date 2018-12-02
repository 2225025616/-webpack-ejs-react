import React from "react" ;
import Sidebar from "../components/commons/Sidebar";
import Head from "../components/commons/Head";

export default function member(Component) {
    class MemberComponent extends React.Component {
        render() {
            return <div>
                <Head />
                <div className="main-content">
                    {/*<Sidebar />*/}
                    <Component />
                </div>
            </div>
        }
    }

    return MemberComponent;
}