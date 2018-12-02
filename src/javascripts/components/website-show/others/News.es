import React, { Component } from "react";
import Link from "../../commons/LangLink";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import FloatBar from "../FloatBar";
import LanguageUtil from "../../../utils/LanguageUtil";
import { getIndustryNewsDetail, getMediaReportDetail } from "../../../actions/websiteDataAction";
import Formatter from "../../../lib/formatter";

@connect(state => ({
  location: state.router.location,
  newsDetail: state.website.newsDetail,
}))
export default class News extends Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname;
    this.isMedia = pathname.indexOf('media-reports') > -1;
  }

  data = {
    title: '保全网俞学劢参加区块链“信任危机”时代的风口会议',
    time: '2017-6-22 11:50',
    source: '浙金网',
    content: `2016年12月21日，由点石资本，微软加速器联合主办，oklink协办的区块链＋大数据“信任危机时代的风口”论坛会议在北京微软亚太总部召开，微软加速器CEO罗斌，OKLink联合创始人 刘成奇，点石资本VP徐雪婷， OKCoin副总裁 段新星以及Onchain分布科技VP杨文涛出席论坛，本次区块链论坛分应用主题和技术主题两场，保全网联合创始人俞学劢受邀参加区块链应用主题论坛并参与讨论。
\r区块链的应用场景让更多的人开始关注，从金融业到其它的行业取得的成果也是越来越多，俞学劢先对保全网的业务做了简单的介绍：保全网是数秦科技首个应用产品，是一个开放式的云平台，利用区块链数据不可篡改的特性为电子数据证据保全。
\r早在区块链1.0也就是比特币相关的研发的时候，保全网团队发现了区块链的最大特性，即实现数字世界里的时间维度。从结果来看就是区块链的不可逆性。现实世界的所有事物都是有时间先后或有客观时间存在，但是虚拟数字世界里面没有时间的概念，所以会造成虚拟时间里的复制让造假非常容易。区块链通过将现实物理世界的资源通过共识机制导向数字世界，实现了数字世界里的客观时间，因此造就了区块链以及比特币的唯一性。现实世界中的事件都是有逻辑的先后关系，所以保全网除在比特币公链上实现了分层数据存储之外还构建了证据链数据的固化模板。就像资产的投资操作，投资这一行为实际上涉及到了类似于实名认证、风险评估、资金托管、电子协议签署、获取收益一系列过程，我们通过保全模板将全流程数据进行固化之后，实现对投资这一行为的真实性留存”。
\r其次关于区块链会率先在哪些领域取得成功？俞学劢表达了自己的看法：“区块链解决的主要就是信任的问题。从大方向上看区块链会在金融领域先得到应用或者说已经得到了应用。
\r保全网给互联网金融平台浙金网做的透明安全体系，以及给山西股交、北工交做的资产流程可信凭证化，都是区块链在金融领域的实践成果。此外，金融行业里面，区块链应该会适用于那些没有现存完善中心化处理体系的场景。不是传统银行的借贷业务、而是相对分散的互联网金融；不是流动性极强中心化清算交割已经非常完善的证券二级市场，而是相对小而分散的地方性股交、私募市场，私募、股交、互金本身对区块链性能的要求不高，所以能够让这个蹒跚学步的技术逐渐获得试验迭代的机会，另外一个就是这类金融市场本身是非标准化交易的，是缺乏良好的信用中介的，所以区块链这一中立性信用中介会非常适用。还有一个原因，我觉得特别是在中国，这些个分散化的市场又也同样没有很好的监管手段，区块链的透明可追溯性则提供了将分散化变为分布式，同时又实现穿透式监管的机会。
\r关于区块链推广应用受到的限制因素，俞学劢表示，区块链的推广应用技术限制肯定是有，但是绝对不是关键。区块链本身就不是万能的，所以肯定在很多领域，甚至金融领域的很多情况是不太适用或者不完全适用的。一定要根据需求来对技术进行调整的，就好比R3的Corda为了节约资源提高性能就放弃了共识机制，为了保护隐私就放弃了全网广播，以至于他自己也把自己只叫做分布式账本没说是区块链。但是实际上能解决问题的就是好技术。
阻碍区块链推广应用的因素主要原因其实是运营的方式，大家都听说过区块链的好处，但是大多数人其实都是惧怕被改变，不要说被颠覆了。邮储作为全国网店最多的银行，花了20年从各自为政的分布式，一步一步做到了统一清算的中心化系统，使得对账出错率大大降低，现在区块链一上来却说要我们重新回归分布式，不要中心化，感觉冲击力很大。实际上早期的各自为政不算是分布式，而是分散化，但是这个反应也足以体现出换骨式的区块链应用是很难得到认可的，特别是求稳的中国。
\r区块链应用产品差异化，俞学劢提出保全网的数据保全模版，数据的证据链构成以及全流程溯源，以及通过打通司法鉴定中心和公证处，能够对区块链数据存证出具具有司法效力的意见书。把技术公信力转化为了社会司法公信力这是我们保全网区块链的产品差异化的优势。
\r最后在区块链领域的创新畅想中，俞学劢说到适配国密标准的区块链，央行数字货币会成为中国本土的区块链标准。所以能适应国密标准的区块链架构或许会成为中国的主流。`,
    pic: require('../../../../images/website-show/others/pic-block-dcoument.jpg'),
  };

  componentWillMount = () => {
    let id = this.props.params['newsId'];
    if (this.isMedia) {
      this.props.dispatch(getMediaReportDetail(id));
    }
    else {
      this.props.dispatch(getIndustryNewsDetail(id));
    }
    this.getData();
  };

  componentWillReceiveProps = (next) => {
    if (next.location.query['lang'] !== this.props.location.query['lang']) {
      this.getData();
    }
  };

  getData = () => {
    let lang = LanguageUtil.lang;
    if (typeof window !== 'undefined') document.title = (lang === 'zh' ? (this.isMedia ? '保全网-媒体报道-' : '保全网-保全资讯-') : (this.isMedia ? 'BAOQUAN.COM - Media - ' : 'BAOQUAN.COM - News - ')) + this.data.title;
  };


  render() {
    const {newsDetail} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <div className="web-show-container">
      <Header haveScrollEvent={false}/>
      <FloatBar/>

      <div className="news-nav">
        <div className="nav-container">
          <Link to={this.isMedia ? '/other/media-reports' : '/other/industry-news'}
                className="a">{LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? (this.isMedia ? '媒体报道' : '保全资讯') : (this.isMedia ? 'Media' : 'News')}</Link>
          <span className="arrow">></span>
          {LanguageUtil.lang === 'zh' || this.props.location.query.lang === 'zh' ? (this.isMedia ? '新闻详情' : '资讯详情') : 'detail'}
        </div>
      </div>
      <article className="news-article website-article-card">
        <h1 className="head">
          {newsDetail.title}
          <span>
            <cite>{newsDetail.source}</cite>
            <time>{fmt.format(newsDetail.createdAt)}</time>
          </span>
        </h1>
        <div dangerouslySetInnerHTML={{__html: newsDetail.text}}/>
      </article>
      <Footer/>
    </div>
  }
}
