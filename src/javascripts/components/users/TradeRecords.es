import React, { Component } from "react";
import { connect } from "react-redux";
import { getTradeRecords } from "../../actions/userAction";
import Formatter from "../../lib/formatter";
import T from "i18n-react";
import LanguageUtil from "../../utils/LanguageUtil";

@connect(state => {
  return {
    records: state.user.billRecords
  }
})

export default class TransactionRecords extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(getTradeRecords());
  };

  picture(e) {
    if (e === "充值" || e === "Top up") {
      return <img className="icon" src={require("images/chong.png")}/>
    } else if (e === "消费" || e === "Spent") {
      return <img className="icon" src={require("images/bao.png")}/>
    } else if (e === "奖励" || e === "Reward") {
      return <img className="icon" src={require("images/zeng.png")}/>
    }
  };

  month(e) {
    if (e === "1") {
      return "Jan.";
    }
    else if (e === "2") {
      return "Feb.";
    }
    else if (e === "3") {
      return "Mar.";
    }
    else if (e === "4") {
      return "Apr.";
    }
    else if (e === "5") {
      return "May";
    }
    else if (e === "6") {
      return "June";
    }
    else if (e === "7") {
      return "July";
    }
    else if (e === "8") {
      return "Aug.";
    }
    else if (e === "9") {
      return "Sept.";
    }
    else if (e === "10") {
      return "Oct.";
    }
    else if (e === "11") {
      return "Nov.";
    }
    else if (e === "12") {
      return "Dec.";
    }
  }

  render() {
    let {records} = this.props;
    let fmtMonth = Formatter.get("mm");
    let fmtDate = Formatter.get("dd ");
    let fmtTime = Formatter.get("hh:MM");

    return <div className="container-wrapper">
      <div className="container">
        <div className="transaction_records">
          <h2>{T.translate("pay.bill")}</h2>
          <div className="bill-container">
            {
              records.totalPage <= 0 ? <div>
                <div className="table-placeholder" colSpan="4">
                  <img
                    src={require("images/members/placeholder-attestations-list.png")}/><br/>
                  {T.translate("pay.no-records")}
                </div>
              </div>
                :
                records.list.map(item => {
                  return <div className="bill-list">
                    <div className="month">
                      <span>{item.period}</span>
                    </div>
                    {
                      item.data.map(item => {
                        return <div className="item">
                          <div className="time">
                            {this.picture(item.type)}
                            <div className="date">{fmtDate.format(item.createdDate)}
                              {
                                LanguageUtil.lang === "en" ?
                                  this.month(fmtMonth.format(item.createdDate)) : T.translate("pay.day")
                              }
                            </div>
                            <div className="minute">{fmtTime.format(item.createdDate)}</div>
                          </div>
                          <div className="amount">{
                            item.amount > 0 ?
                              <span className="add-amount">{item.amount}</span> :
                              <span className="minus-amount">{item.amount}</span>
                          }
                          </div>
                          <div className="description">{item.description}</div>
                        </div>
                      })
                    }
                  </div>
                })
            }
          </div>
        </div>
      </div>
    </div>
  }
}