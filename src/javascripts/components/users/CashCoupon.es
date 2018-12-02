import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import Page from "../../constants/Page";
import Paginate from "react-paginate";
import T from "i18n-react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import FormValidator from "../../utils/FormValidator";

const fields = ["verifyCode", "couponCode"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("couponCode", T.translate("coupon.coupon-not-null"))
    .nonEmpty("verifyCode", T.translate("coupon.coupon-not-null"))
    .errors;
};


@reduxForm({form: "userInfo", fields, validate}, state => {
  return {}
})

@connect(state => {
  return {}
})

export default class CashCoupon extends Component {
  state = {
    startDate: '',
    endDate: '',
    showExchangeModal: false,
  };

  openExchangeModal = () => {
    this.setState({showExchangeModal: true});
  };

  closeExchangeModal = () => {
    this.setState({showExchangeModal: false});
  };

  handleCoupon = e => {
    console.log(this.props.fields.couponCode.value);
    // e.preventDefault();
    // let that = this;
    // this.props.dispatch(postCoupon(this.props.fields.couponCode.value,
    //   () => {
    //     this.closeExchangeModal();
    //   }
    // ));
  };

  render() {
    const {fields: {verifyCode, couponCode}} = this.props;

    return <article>
      <div className="table-search-bar">
        <div className="table-container">
          <DateRangePicker
            startDatePlaceholderText="开始日期"
            endDatePlaceholderText="结束日期"
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
            isOutsideRange={() => false}
          />
          <select value={this.period} onChange={this.queryByPeriod}>
            <option value="all">全部适用产品</option>
            <option value="1">bbb</option>
            <option value="2">ccc</option>
          </select>
          <select value={this.period} onChange={this.queryByPeriod}>
            <option value="all">状态</option>
            <option value="1">未使用</option>
            <option value="2">已使用</option>
          </select>
        </div>
        <div className="exchange">
          <button type="button" onClick={this.openExchangeModal}>兑换代金券</button>
          <p>
            <i className="iconfont font-attention"/>
            <span>代金券说明</span>
          </p>
        </div>
      </div>

      <table className="common-table-list">
        <thead>
        <tr>
          <th style={{width: "20%"}}>代金券号</th>
          <th style={{width: "13%"}}>面额</th>
          <th style={{width: "20%"}}>有效期</th>
          <th style={{width: "13%"}}>状态</th>
          <th style={{width: "14%"}}>适用产品</th>
          <th style={{width: "20%"}}>使用说明</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{width: "20%"}}>02101200460551120</td>
          <td style={{width: "13%"}}>200</td>
          <td style={{width: "20%"}}>2017/05/01 - 2017/06/08</td>
          <td style={{width: "13%"}}>已过期</td>
          <td style={{width: "14%"}}>可信电子凭证</td>
          <td style={{width: "20%"}}>仅限订单金额满300元使用</td>
        </tr>
        </tbody>
      </table>
      <hr className="division"/>
      <div className="paginate">
        <Paginate previousLabel={"<"}
                  nextLabel={">"}
                  breakLable={<a href="">...</a>}
                  pageNum={3}
                  forceSelected={2}
                  marginPagesDisplayed={Page.PAGE_DISPLAY}
                  pageRangeDisplayed={Page.RANGE_DISPLAY}
                  clickCallback={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
      </div>

      {this.state.showExchangeModal ?
        <ModalContainer onClose={this.closeExchangeModal}>
          <ModalDialog onClose={this.closeExchangeModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1>兑换代金券</h1>
            <form>
              <article>
                <section>
                  <span>兑换码</span>
                  <input {...couponCode}/>
                </section>
                <section>
                  <span>验证码</span>
                  <input {...verifyCode}/>
                </section>
                <section className="button-group">
                  <span/>
                  <button type="button" className="yes" onClick={this.handleCoupon}>确定</button>
                  <button type="button" className="no" onClick={this.closeExchangeModal}>取消</button>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </article>
  }
}

