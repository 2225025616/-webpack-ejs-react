import React, { Component } from "react";
import T from "i18n-react";
import { connect } from "react-redux";
import IdUtil from "../../utils/IdUtil";
import Link from "../commons/LangLink";
import cx from "classnames";

@connect(state => {
  return {
    location: state.router.location,
  }
})
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
/*    let productId = IdUtil.productId(this.props);
    let organizationId = IdUtil.organizationId(this.props);

    this.organizationId = organizationId;
    this.productId = productId;*/
  }

  componentWillReceiveProps(nextProps) {
/*    let organizationId = IdUtil.organizationId(nextProps);
    let productId = IdUtil.productId(nextProps);*/
  }


  render() {
    let {sidebarList} = this.props;
    let url = this.props.location.pathname;

    return <nav className="member-sidebar">
      <div className="paper">
        <span className="title">{sidebarList.name}</span>
        <div className="nav-box">
          <ul>
            {
              sidebarList.list.map(item=>{
                return <Link to={item.link}>
                  <li className={cx({activesItem: url === item.link})}>
                    <span className="sidebarBox">
                      <img src={url === item.link ? item.iconActive : item.icon}/>
                    </span>
                    <span>{item.name}</span>
                  </li>
                </Link>
              })
            }
          </ul>
        </div>
      </div>
    </nav>;
  }
}
