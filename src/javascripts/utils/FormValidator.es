import ValidateUtil from "./ValidateUtil"; // 正则判断
import T from "i18n-react";

export default class FormValidator {
  constructor(values) {
    this.values = values;
    this._errors = {};
  }

  get errors() {
    return this._errors;
  }

  mustEqual(attr, value, message) {
    if (this.values[attr] != value) {
      this.errors[attr] = message;
    }

    return this;
  }

  postCode(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePostCode(this.values[attr])) {
      this.errors[attr] = T.translate("validate.postcode", {field: name});
    }

    return this;
  }

  money(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateMoney(this.values[attr])) {
      this.errors[attr] = T.translate("validate.post-money", {field: name});
    }

    return this;
  }

  payMoney(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePayMoney(this.values[attr])) {
      this.errors[attr] = T.translate("validate.post-money", {field: name});
    }

    return this;
  }

  phoneNumber(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePhoneNumber(this.values[attr])) {
      this.errors[attr] = T.translate("validate.phone-number", {field: name});
    }

    return this;
  }

  phone(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePhoneNumber(this.values[attr])) {
      this.errors[attr] = T.translate("validate.phone-number", {field: name});
    }

    return this;
  }

  name(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateRealName(this.values[attr])) {
      this.errors[attr] = T.translate("validate.real-name", {field: name});
    }

    return this;
  }

  email(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateEmail(this.values[attr])) {
      this.errors[attr] = T.translate("validate.email", {field: name});
    }

    return this;
  }

  realName(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateRealName(this.values[attr])) {
      this.errors[attr] = T.translate("validate.real-name", {field: name});
    }

    return this;
  }

  nonEmpty(attr, name) {
    if (!this.values[attr] || /^\s*$/.test(this.values[attr])) {
      this.errors[attr] = T.translate("validate.not-empty", {field: name});
    }

    return this;
  }

  creditCard(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateCreditCard(this.values[attr])) {
      this.errors[attr] = T.translate("validate.credit-card", {field: name});
    }

    return this;
  }

  verifyCode(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateVerifyCode(this.values[attr])) {
      this.errors[attr] = T.translate("validate.verify-code", {field: name});
    }

    return this;
  }

  captcha(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateCaptcha(this.values[attr])) {
      this.errors[attr] = T.translate("validate.verify-code", {field: name});
    }

    return this;
  }

  password(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePassword(this.values[attr])) {
      this.errors[attr] = T.translate("validate.password", {field: name});
    }

    return this;
  }

  rePassword(rePwd, pwd, name, required = true) {
    if (required) {
      this.nonEmpty(rePwd, name);
    }

    if (!ValidateUtil.validatePassword(this.values[rePwd])) {
      this.errors[rePwd] = T.translate("validate.password", {field: name});
    } else if (this.values[rePwd] !== this.values[pwd]) {
      this.errors[rePwd] = T.translate("两次密码不一致");
    }

    return this;
  }

  idCard(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateIdCard(this.values[attr])) {
      this.errors[attr] = T.translate("validate.id-card", {field: name});
    }

    return this;
  }

  url(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateUrl(this.values[attr])) {
      this.errors[attr] = T.translate("validate.url", {field: name});
    }

    return this;
  }

  chineseLength(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateChineseLength(this.values[attr])) {
      this.errors[attr] = T.translate("validate.packageName", {field: name});
    }

    return this;
  }

    CreditCodeLength(attr, name, required = true) {
        if (required) {
            this.nonEmpty(attr, name);
        }

        if (!ValidateUtil.validateCreditCodeLength(this.values[attr])) {
            this.errors[attr] = T.translate("请输入正确的18位社会信用代码", {field: name});
        }

        return this;
    }

  positiveInteger(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validatePositiveInteger(this.values[attr])) {
      this.errors[attr] = T.translate("validate.real-name", {field: name});
    }
    return this;
  }

  imageCode(attr, name, required = true) {
    if (required) {
      this.nonEmpty(attr, name);
    }

    if (!ValidateUtil.validateImageCode(this.values[attr])) {
      this.errors[attr] = T.translate("validate.imageCode", {field: name});
    }
    return this;
  }
}
