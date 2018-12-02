import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../commons/LangLink";

const style = {
  contentStyle: {
    margin: "0 16px",
    paddingTop: 36,
    textAlign: "center",
  },
  description: {
    margin: "16px 0 32px 0",
    button: {
      color: "#fff",
    }
  },

};
@connect(state => {
  return {product: state.product.info, organization: state.organization.info}
})
export default class ProductStep extends Component {

  state = {
    stepIndex: 0,
  };

  getStepContent(stepIndex) {
    const {product, organization} = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <img
              src={require("images/members/product-kyc.png")}/>
            <p style={style.description}>为保证数据的真实性，您需要先完成完成企业的实名认证</p>
            <Link to={`/organizations/${organization.id}/kycs/bank`}>
              <button label="现在去认证"/>
            </Link>
          </div>
        );
      case 1:
        return (
          <div>
            <img
              src={require("images/members/product-template-setting.png")}/>
            <p style={style.description}>您在保全网的数据将以一定的格式保存下来，请前往设定模版确定您要保全的数据类型和格式。</p>
            <Link to={`/products/${product.id}/templates`}>
              <button label="开始设计"/>
            </Link>
          </div>
        );
      case 2:
        return (
          <div>
            <img
              src={require("images/members/product-template-verify.png")}/>
            <p style={style.description}>模板提交后，我们将对您模板的合法性进行审核，请耐心等待2个工作日。</p>
          </div>
        );
      case 3:
        return (
          <div>
            <img
              src={require("images/members/product-online.png")}/>
            <p style={style.description}>您的产品已设置完成，可以点击右上角的按钮，将产品上线。</p>
          </div>
        );
      default:
        return 'You\'re a long way from website-show sonny jim!';
    }
  }

  render() {
    const {product, organization} = this.props;
    const {stepIndex} = this.state;
    const contentStyle = {
      margin: '0 16px',

    };

    return (
      <div className="product-step">
        {/*<Stepper linear={false} activeStep={stepIndex}>
         <Step>
         <StepButton onClick={() => this.setState({stepIndex: 0})}>
         实名认证
         </StepButton>
         </Step>
         <Step>
         <StepButton onClick={() => this.setState({stepIndex: 1})}>
         模板设计
         </StepButton>
         </Step>
         <Step>
         <StepButton onClick={() => this.setState({stepIndex: 2})}>
         模板审核
         </StepButton>
         </Step>
         <Step>
         <StepButton onClick={() => this.setState({stepIndex: 3})}>
         产品上线
         </StepButton>
         </Step>
         </Stepper>*/}
        <div style={style.contentStyle}>
          {this.getStepContent(stepIndex)}
        </div>
      </div>
    );
  }
}

;
