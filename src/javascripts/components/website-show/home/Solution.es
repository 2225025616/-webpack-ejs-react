import React, { Component } from "react";
import Link from "../../commons/LangLink";
import T from "i18n-react";

export default class Solution extends Component {

  render() {
    let data = this.props['data'];
    let isHover = this.props['isHover'];
    let onMouseEnter = this.props['onMouseEnter'];

    let brief = <article className="brief" onMouseEnter={onMouseEnter}>
      <h2>
        <span className={"iconfont " + data.iconClass}/>
        <p>{data.shortName || data.name}</p>
      </h2>
      <em>{data.functions[0]}</em>
      <em>{data.functions[1]}</em>
      <em>{data.functions[2]}</em>
      <em>...</em>
    </article>;

    let more = <article className="more">
      <h2>
        <span className={"iconfont " + data.iconClass}/>
        <p>{data.name}</p>
      </h2>
      <p className="description">{data.description}</p>
      <div className="features">
        <em>{data.functions[0]}</em>
        <em>{data.functions[1]}</em>
        <em>{data.functions[2]}</em>
        <em>{data.functions[3]}</em>
      </div>
      <section className="cases">
        <h3>{data.cases.length > 0 ? T.translate('home.case') : ' '}</h3>
        <div className="cases-container">
          {data.cases.map(
            (item, i) =>
              <div key={i} className="case">
                <img src={item.img} alt={item.logo}/>
              </div>
          )}
        </div>
      </section>
      <Link to={data.route} className="a">{T.translate('home.learn-more-2')}</Link>
    </article>;

    return isHover ? more : brief;
  }
}