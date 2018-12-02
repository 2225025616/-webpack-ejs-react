export default class ValidateUtil {

  static validatePhoneNumber(phoneNumber) {
    return phoneNumber ? /^1[0-9]{10}$/.test(phoneNumber) : true;
  }

  static validatePassword(password) {
    return password ? /(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/.test(password) && password.indexOf(' ') <= -1 : true;
  }

  static validateVerifyCode(verifyCode) {
    return verifyCode ? /[0-9]{4}/.test(verifyCode) : true;
  }

  static validateCaptcha(captcha) {
    return captcha ? /^[\da-zA-Z]{4}$/.test(captcha) : true;
  }

  static validatePostCode(postCode) {
    return postCode ? /^[1-9][0-9]{5}$/.test(postCode) : true;
  }

  static validateMoney(money) {
    return money ? /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money) : true;
  }


  static validatePayMoney(money) {

    return money ? /^[0-9]{1,7}([.][0-9]{1,2})?$/.test(money) : true;
  }

  static validateEmail(email) {
    return email ? /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) : true;
  }

  static validateUrl(url) {
    return url ? /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(url) : true;
  }

  static validateRealName(realName) {
    if (realName) {
      realName = realName.trim();
    }

    return realName ? /^[\u4e00-\u9fa5]{2,6}$/.test(realName.trim()) : true;
  }

  static validateIdCard(idCard) {
    if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCard)) {
      return false;
    }
    else if (idCard.length == 18) {
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0;
      var i;
      for (i = 0; i < 17; i++) {
        nTemp += idCard.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != idCard.substr(17, 1))
        return false;
      else
        return true;
    }
  }

  static validateCreditCard(value) {
    if (/[^0-9-\s]+/.test(value))
      return true;

    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }

  static validateChineseLength(title) {
    return title ? /^[\u4e00-\u9fa5]{1,10}$/.test(title) : true;
  }
    //信用代码长度18位验证
    static validateCreditCodeLength(title) {
        return title ? /^\w{18}$/.test(title) : true;
    }
    static validatePositiveInteger(title) {
    return title ? /^[0-9]*$/.test(title) : true;
  }

  static validateImageCode(captcha) {
    return captcha ? /^[a-zA-Z0-9]{4}$/.test(captcha) : true;
  }
}
