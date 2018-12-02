import React, { Component } from "react";

import cx from "classnames";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.active = 0;
  }

  changeActive = pos => {
    this.active = pos;
    this.forceUpdate();
  };

  render() {
    return <div className="container-wrapper">
      <div className="container">
        <section className="help-contain">
          <nav className="help-tabs">
            <ul>
              <li className={cx({active: this.active === 0})} onClick={() => this.changeActive(0)}>电子数据保全</li>
              <li className={cx({active: this.active === 1})} onClick={() => this.changeActive(1)}>实名认证</li>
              <li className={cx({active: this.active === 2})} onClick={() => this.changeActive(2)}>模板设计</li>
              <li className={cx({active: this.active === 3})} onClick={() => this.changeActive(3)}>模板审核</li>
              <li className={cx({active: this.active === 4})} onClick={() => this.changeActive(4)}>API接入</li>
            </ul>
          </nav>
          <div id="save" className={cx("content", "passive", {active: this.active === 0})}>
            <h5>为什么要对电子数据进行保全？</h5>
            <p>
              电子数据容易丢失、损毁或被修改。基于这个原因，在产生纠纷时，相关的电子数据很难作为证据被认可。对电子数据进行保全，就可以避免上述风险，得到保全的电子数据能够作为被司法机构认可的证据，当事人的合法权益因此得到保障。
            </p>
            <h5>保全网如何对数据进行保全？</h5>
            <p>
              在电子数据产生的同时，保全网以第三方服务商的身份，通过数据接口将这些数据固化下来，加密存储在第三方的服务器上，任何人无法对这些数据进行篡改。
            </p>
            <h5>我要怎样对我的数据进行保全？</h5>
            <p>
              在保全网注册登录后，您首先要新建一款产品，作为您需要保全的项目名称。根据这款产品的实际情况，您须要进行保全模板的设计和API接入。在完成这些步骤后，就可以在保全网对您的数据进行保全了。
            </p>
          </div>

          <div id="certification" className={cx("content", "passive", {active: this.active === 1})}>
            <h5>为什么要进行实名认证？</h5>
            <p>
              为了保证电子数据来源的真实可靠，我们须要验证提供电子数据的主体身份。
            </p>
            <h5>如何进行实名认证？</h5>
            <p>请填写企业的基本信息和银行账号，我们会向账号中汇一笔小额款项。您收到款项后，在保全网输入款项的金额，如果金额正确，即可通过认证。</p>
            <p>您也可以带着营业执照和其他能证明企业资质的文件、办理人的身份证明文件等，到我们位于杭州的总部进行现场认证。</p>
          </div>
          <div id="design" className={cx("content", "passive", {active: this.active === 2})}>
            <h5>模板是什么？</h5>
            <p>
              您保存在保全网的电子数据将以一定的样式展示出来，供您和您的客户查询、申请公证。展示出来的样式，可以由您自己进行设计。您设计的这个样式，就是模板。
            </p>
            <h5>如何进行模板设计？</h5>
            <p>
              进行模板设计的，最好是您公司的产品设计人员和技术人员。
              首先，您要明确您的模板中包含什么，例如客户身份信息、数据产生的时间、希望被保全的交易金额、具体内容等；
              其次，您需要在保全网上新建一个模板，在模板上中通过增加和删除行列、插入图片等方式，列出您希望展示的项目；
              再次，对左侧的陈述进行增加、修改、删除等，来编辑陈述的名称、类型等。
              然后，通过将左侧的陈述映射到模板中来，使得模板中列出的项目能与您实际的业务需求相对应。
            </p>
          </div>
          <div id="check" className={cx("content", "passive", {active: this.active === 3})}>
            <h5>模板审核时，会审核哪些内容？</h5>
            <p>
              我们会对您的模板进行数据校验，也有法务人员对您的模板内容进行合法性审核，保证您模板中的所有字段均为有效的，并且足够组成一份法律上的证据。
            </p>
          </div>
          <div id="API" className={cx("content", "passive", {active: this.active === 4})}>
            <h5>如何进行API接入？</h5>
            <p>
              可以参考API文档。
            </p>
            <h5>什么时候进行API接入？</h5>
            <p>
              您在进行模板设计时，就可以同时进行API的设计，模板中所添加的陈述都应该包含在API中。在设计过程中，您可以随时使用测试环境的key，在我们的sandbox里进行测试。
              在完成产品的所有设置，并且API的测试结果理想后，您就可以将产品的上线按钮打开，用生产环境的key正式向保全网传输电子数据了。
            </p>
          </div>
        </section>
      </div>
    </div>
  }


}
;
