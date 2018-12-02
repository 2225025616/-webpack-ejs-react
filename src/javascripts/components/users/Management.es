import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Orders from "./Orders";

const styles = {
  active: {
    borderBottom: '1px solid #fff',
    backgroundColor: '#fff'
  },
};

@connect(state => {
  return {
    location: state.router.location
  }
})

export default class Management extends Component {
  componentWillMount() {
  }

  state = {
    showOrder: (this.props.location.query.showOrder ? this.props.location.query.showOrder : "true"),
  };

  changeItem = (value) => {
    return () => {
      this.state.showOrder = value;
      this.setState({});
    }
  };

  render() {

    return (
      <div className="container-wrapper">
        <div className="container member-container">
          <div className="order-management">
            <header>
              <p className="table-name">{T.translate("sidebar.orders")}</p>
            </header>
            <div className="member-content">
              <Orders />
            </div>
            {/*<nav>
              <span style={this.state.showOrder === "true" ? styles.active : {}}
                    onClick={this.changeItem("true")}>{T.translate("sidebar.orders")}</span>
               //<span className="cash-coupon" style={this.state.showOrder === "true" ? {} : styles.active} onClick={this.changeItem("false")}>代金券</span>
            </nav>*/}
            {/*
              this.state.showOrder === "true" ?
                <Orders />
                : ""
            */}
            {/* <CashCoupon />*/}
          </div>
        </div>
      </div>
    )
  }
}
