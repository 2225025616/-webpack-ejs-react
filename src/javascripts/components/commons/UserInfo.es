import React, { Component } from "react";
import Link from "../commons/LangLink";
import { getBalance, postCoupon, updateAvatar } from "../../actions/userAction";
import Image from "../commons/Image";
import FormUtil from "../../utils/FormUtil";
import { reduxForm } from "redux-form";
import T from "i18n-react";
import Formatter from "../../lib/formatter";
import Modal from "../commons/Modal";
import LoadingButton from "../commons/LoadingButton";
import FormValidator from "../../utils/FormValidator";

const styles = {
  recharge: {
    marginTop: "18px",
    float: "right"
  },
  textfield: {
    width: "100%",
  },
  modalButton: {
    marginTop: 8,
    float: "right",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8,
  }
};

const fields = ["avatars", "couponCode"];

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("couponCode", T.translate("coupon.coupon-not-null"))
    .errors;
};

@reduxForm({form: "userInfo", fields, validate}, state => {
  return {
    user: state.user.info,
    balanceHolder: state.user.balanceHolder,
  }
})
export default class UserInfo extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.dispatch(getBalance());
  }

  handleUploadAvatars = (e) => {
    this.props.dispatch(updateAvatar(e.target.files));
  };

  handleOpenCoupon = () => {
    this.refs.coupon.show();
  };

  handleCloseCoupon = () => {
    this.refs.coupon.hide();
  };

  handleCoupon = e => {
    e.preventDefault();
    let that = this;
    this.props.dispatch(postCoupon(this.props.fields.couponCode.value,
      () => {
        that.refs.coupon.hide();
      }
    ));
  };

  render() {
    const {fields: {avatars, couponCode}, handleSubmit} = this.props;
    let {user, balanceHolder} = this.props;
    let fmt = Formatter.get("0.00");

    return <div className="user-info">
      <div className="avatar">
        <form onSubmit={handleSubmit}>
          <a>
            <Image className="user-image"
                   altSrc={require("images/user-default-logo.jpg")}
                   src={user.avatar}/>
            <div><span>{T.translate("sidebar.change-face")}</span></div>
            <input type="file"  { ...FormUtil.ignoreFileUrl(avatars,this)} onChange={this.handleUploadAvatars}
                   className="changeimg"/>
          </a>
        </form>
        <div className="certificate">
          {user.realName === null ?
            <Link to={`/profile`}>
              <abbr title={T.translate("sidebar.no-name")}><img
                src={require("images/components/sidebar/norealname.png")}/></abbr>
            </Link>
            :
            <abbr title={T.translate("sidebar.finish-name")}>
              <img
                src={require("images/components/sidebar/realname.png")}/>
            </abbr>
          }
          {user.email === null ?
            <Link to={`/profile`}>
              <abbr title={T.translate("sidebar.no-email")}><img
                src={require("images/components/sidebar/noemail.png")}/></abbr>
            </Link>
            :
            <abbr title={T.translate("sidebar.finish-email")}>
              <img
                src={require("images/components/sidebar/email.png")}/>
            </abbr>
          }
          {user.phoneNumber === null ?
            <Link to={`/profile`}>
              <abbr title={T.translate("sidebar.no-phone")}><img
                src={require("images/components/sidebar/notel.png")}/></abbr>
            </Link>
            :
            <abbr title={T.translate("sidebar.finish-phone")}>
              <img
                src={require("images/components/sidebar/tel.png")}/>
            </abbr>
          }
        </div>
      </div>
      <div className="slogan">
        <div>
          <p>{T.translate("sidebar.welcome")}</p>
          <span>{user.phoneNumber}</span>
        </div>
        <div className="coupon">
          <abbr title={T.translate("coupon.coupon")}>
            <img
              src={require("images/components/sidebar/coupon.png")}
              onTouchTap={this.handleOpenCoupon}/>
          </abbr>
        </div>
      </div>
      <Modal ref="coupon"
             title={T.translate("coupon.coupon")}>
        <form autoComplete="off">
          <input autoComplete="off" type="text"
                 placeholder={T.translate("coupon.input-coupon")}
                 style={styles.textfield}
                 {...FormUtil.extract(couponCode)}
          />
          <LoadingButton buttonStyle="flat" style={styles.modalButton} onTouchTap={this.handleCoupon}
                         label={T.translate("coupon.coupon-now")}
                         loadingLabel={T.translate("coupon.coupon-exchange")}/>
          <div className="cancel-button">
            <button style={styles.iconButton} onTouchTap={this.handleCloseCoupon}/>
          </div>
        </form>
      </Modal>
      <div className="account">
        <Link to={`/trade/records`}>
          <span
            className="balance">{T.translate("common.balance")}: {fmt.format(balanceHolder.balance)}{T.translate(("common.rmb"))}</span></Link>
        {<Link to={`/pay`}>
          <button style={styles.recharge} label={T.translate("common.recharge")}/>
        </Link>}
      </div>
    </div>
  }
}
