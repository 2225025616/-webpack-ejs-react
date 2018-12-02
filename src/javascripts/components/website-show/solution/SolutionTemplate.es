import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import Banner from "../Banner";
import T from "i18n-react";

export default class SolutionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  changeStyle = (isHover) => {
    return () => {
      this.setState({isHover: isHover})
    }
  };

  render() {
    let {data} = this.props;

    return <div className='web-show-container'>
      <Header btnFontColor={data.banner.bgColor}/>
      <FloatBar/>
      <Banner bannerData={data.banner}>
        <nav>
          <div className="a-solution-wrap" onMouseEnter={this.changeStyle(true)} onMouseLeave={this.changeStyle(false)}
               style={this.state.isHover ? {
                 borderColor: '#fff',
                 backgroundColor: '#fff',
                 color: data.banner.bgColor
               } : {}}>
            <a href='http://wpa.qq.com/msgrd?v=3&uin=1434851251&site=qq&menu=yes' target="_blank"
               className="btn-solution-white">{T.translate('pss.contact')}</a>
          </div>
        </nav>
      </Banner>
      <div className="solution-content">
        <article className="item">
          <h1>{T.translate('pss.require')}</h1>
          {data.requirement.text.map(
            (item, i) =>
              <p key={i}>{item}</p>
          )}
        </article>
        <article className="item">
          <h1>{T.translate('pss.brief')}</h1>
          <p>{data.description.text}</p>
          <div className="features">
            {data.description.features.map(
              (item, i) =>
                <section key={i} className="feature">
                  <span className={"iconfont " + item.iconClass}/>
                  <div className="text">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                </section>
            )}
          </div>
        </article>
        {data.advantages.length > 0 ?
          <article className="item">
            <h1>{T.translate('pss.superiority')}</h1>
            <div className="solution-advantages">
              {data.advantages.map(
                (item, i) =>
                  <section key={i} className="advantage">
                    <span className={"iconfont " + item.iconClass}/>
                    <div className="text">
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                  </section>
              )}
            </div>
          </article> : ''}
        {data.scenes.length > 0 ?
          <article className="item">
            <h1>{T.translate('pss.field')}</h1>
            <div className="scenes">
              {data.scenes.map(
                (item, i) =>
                  <section key={i} className="scene" style={{backgroundImage: `url(${item.img})`}}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </section>
              )}
            </div>
          </article> : ''}
        {data.cases.length > 0 ?
          <article className="item">
            <h1>{T.translate('pss.cases')}</h1>
            <div className="cases">
              {data.cases.map(
                (item, i) =>
                  <div key={i} className="case">
                    <img src={item.img} alt={item.logo}/>
                  </div>
              )}
            </div>
          </article> : ''}
      </div>
      <Footer noMargin={true}/>
    </div>;
  }
}