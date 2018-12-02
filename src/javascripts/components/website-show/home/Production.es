import React, { Component } from "react";
import Link from "../../commons/LangLink";
import T from "i18n-react";

export default class Production extends Component {

  selectedIndex = 0;

  changeIndex = (index) => {
    return () => {
      this.selectedIndex = index;
      this.setState({});
    }
  };

  render() {
    let data = this.props['data'];

    return <article className="production">
      <h1 className="h1">{T.translate('home.product')}</h1>
      <div className="pd-items">
        <aside>
          {data.map(
            (item, i) =>
              <div key={i} className={this.selectedIndex === i ? "selected p" : 'p'}
                   onMouseEnter={this.changeIndex(i)}>
                <img src={item.img} alt=""/>
                <h2>{item.name}</h2>
              </div>
          )}
        </aside>
        <div className="pd-info">
          <section className="info">
            <h3>{T.translate('home.intro')}</h3>
            <p>{data[this.selectedIndex].description}</p>
            <div className="links">
              {
                data[this.selectedIndex].join !== '' ?
                  <Link to={data[this.selectedIndex].join} className="join">{T.translate('common.access')}</Link> : ""
              }
              <Link to={data[this.selectedIndex].route} className="a">{T.translate('home.learn-more')}></Link>
            </div>
          </section>
          <section className="apply">
            <h3>{T.translate('home.application')}</h3>
            <div className="p">
              {data[this.selectedIndex].industries.map(
                (item, i) =>
                  <div key={i} className="industry">
                    <span className={"iconfont " + item.iconClass}/>
                    <h4>{item.name}</h4>
                  </div>
              )}
            </div>
          </section>
          <section className="function">
            <h3>{T.translate('home.product-function')}</h3>
            <p className="row">
              {data[this.selectedIndex].functions.map(
                (item, i) => <em key={i} className="function">
                  <span className="span">&bull;</span>
                  <span className="text" title={item}>{item}</span>
                </em>
              )}
            </p>
          </section>
        </div>
      </div>
    </article>
  }
}