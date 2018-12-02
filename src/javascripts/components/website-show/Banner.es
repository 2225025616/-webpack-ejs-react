import React, { Component } from "react";
import Link from "../commons/LangLink";

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: [],
      animation: [],
      animationIndex: 0,
      display: [1],
    }
  }

  timer = null;
  timer1 = null;

  componentDidMount = () => {
    let {bannerData} = this.props;
    if (bannerData.bannerSwitch) {
      this.switchBanner();
    }
  };

  componentWillUnmount = () => {
    this.clearTimer(this.timer);
  };

  switchBanner = () => {
    this.clearTimer(this.timer);
    this.timer = setInterval(this.showBanner(), 8000);
  };

  clearTimer = (timer) => {
    if (timer) clearInterval(timer);
  };

  changeStyle = (index, val) => {
    return () => {
      let isHover = this.state.isHover;
      isHover[index] = val;
      this.setState({isHover: isHover})
    }
  };

  showBanner = (index) => {
    return () => {
      let {bannerData} = this.props;
      let animation = this.state.animation, display = this.state.display, i = this.state.animationIndex;
      if (index === i) return;
      if (index !== undefined) this.clearTimer(this.timer);
      this.clearTimer(this.timer1);
      let nextI = index !== undefined ? index : (i + 1) % bannerData.bannerSwitch.length;
      animation[i] = 'fadeOut 1s ease';
      animation[nextI] = 'fadeIn 1s ease';
      display[nextI] = 1;
      display = display.map((item, index) => {
        if (index === i || index === nextI) return 1;
        else return 0;
      });
      this.setState({
        animation: animation,
        animationIndex: nextI,
        display: display
      });
      this.timer1 = setTimeout(() => {
        animation[i] = '';
        display[i] = 0;
        this.setState({
          animation: animation,
          display: display
        })
      }, 1000)
    }
  };

  render() {
    let {bannerData} = this.props;

    if (!bannerData.bannerSwitch)
      return <div className='banner'
                  style={{backgroundImage: 'url(' + bannerData.img + ')', backgroundColor: bannerData.bgColor}}>
        {bannerData.info ? <article style={{display: 'none'}}>
          <h1>{bannerData.info.title}</h1>
          <h2>{bannerData.info.subtitle}</h2>
        </article> : ''}
        {this.props.children}
      </div>;
    else
      return <div className="banner-wrap">
        {bannerData.bannerSwitch.map(
          (item, i) =>
            <div key={i} className='banner'
                 style={{
                   backgroundImage: 'url(' + item.img + ')',
                   backgroundColor: item.bgColor,
                   animation: this.state.animation[i],
                   display: this.state.display[i] ? 'block' : 'none'
                 }} onMouseEnter={() => this.clearTimer(this.timer)} onMouseLeave={this.switchBanner}>
              {item.info ? <article style={{display: 'none'}} ref={`banner${i}`}>
                <h1>{item.info.title}</h1>
                <h2>{item.info.subtitle}</h2>
              </article> : ''}
              {item.btn.map(
                (item1, j) => {
                  return item1.useBtnWrap ?
                    <div key={j} className={item1.className} onMouseEnter={this.changeStyle(j, true)}
                         onMouseLeave={this.changeStyle(j, false)}
                         style={this.state.isHover[j] ? {
                           borderColor: '#fff',
                           backgroundColor: '#fff',
                           color: item.bgColor !== 'transparent' ? item.bgColor : '#1687ee'
                         } : {}}>
                      <Link to={item1.route} className="btn-white">{item1.name}</Link>
                    </div> :
                    <nav key={j}>
                      <Link to={item1.route} className={item1.className}>{item1.name}</Link>
                    </nav>
                }
              )}
            </div>
        )}
        <div className="banner-nav">
          {bannerData.bannerSwitch.map(
            (item, i) =>
              <div key={i} className={this.state.animationIndex === i ? "nav-btn selected" : "nav-btn"}
                   onMouseEnter={this.showBanner(i)} onMouseLeave={this.switchBanner()}/>
          )}
        </div>
        {this.props.children}
      </div>;
  }
}
