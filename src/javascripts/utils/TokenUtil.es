class ShimStorage {
  map = {};

  getItem(attribute) {
    return this.map[attribute] ;
  }

  setItem(attribute,value) {
    this.map[attribute] = value;
    return value;
  }

  removeItem(attribute) {
    delete this.map[attribute];
  }
}

export default class TokenUtil {
  static _localStorage = new ShimStorage();
  static _sessionStorage = new ShimStorage();

  static getLocalStorage() {
    if (localStorage) {
      return localStorage;
    } else {
      return TokenUtil._localStorage;
    }
  }

  static getSessionStorage() {
    if (sessionStorage) {
      return sessionStorage;
    } else {
      return TokenUtil._sessionStorage;
    }
  }

  static findByAttribute(attribute) {
    let value;
    value = TokenUtil.getSessionStorage().getItem(attribute);

    if (value) {
      return value;
    } else {
      return TokenUtil.getLocalStorage().getItem(attribute);
    }
  }

  static setByAttribute(attribute, value) {
    if (value) {
      TokenUtil.getSessionStorage().setItem(attribute, value);
      TokenUtil.getLocalStorage().setItem(attribute, value);
    } else {
      TokenUtil.getSessionStorage().removeItem(attribute);
      TokenUtil.getLocalStorage().removeItem(attribute);
    }
  }

  static get uid() {
    return TokenUtil.findByAttribute("uid");
  }

  static get token() {
    return typeof window !== 'undefined' ? window.sessionId : '';
  }

  static set uid(value) {
    return TokenUtil.setByAttribute("uid", value);
  }

  static set token(value) {
    return TokenUtil.setByAttribute("token", typeof window !== 'undefined' ? window.sessionId : '');
  }

  static clean() {
    TokenUtil.uid = undefined;
    TokenUtil.token = undefined;
  }

}