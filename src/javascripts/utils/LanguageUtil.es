import T from "i18n-react";
import moment from "moment";

export default class LanguageUtil {
/*  static _lang = "en";

  static set lang(value) {
    if (value === "zh") {
      LanguageUtil._lang = "zh";
    } else {
      LanguageUtil._lang = "en";
    }
    LanguageUtil.loadLang();
  }

  static get lang() {
    return LanguageUtil._lang;
  }

  static initialLang(language) {
    let langParameter = language || (typeof window !== 'undefined' && window.location.search && window.location.search.slice(1).split('&').find(a => a.startsWith("lang")));

    let lang;

    if (langParameter) {
      lang = langParameter.split('=')[1];
    } else {
      lang = typeof window !== 'undefined' ? navigator.language.slice(0, 2) : 'zh';
    }

    lang = lang ? lang : 'zh';

    LanguageUtil.lang = lang;

    if (LanguageUtil.lang === "zh") {
      moment.locale("zh_CN");
    } else {
      moment.locale("en_US");
    }
  }

  static loadLang() {
    if (LanguageUtil.lang === "en") {
      T.setTexts(require('../language/en.yml'));
    } else {
      T.setTexts(require('../language/zh.yml'));
    }
  }*/

  static _lang = "zh";

  static set lang(value) {
    if (value === "zh") {
      LanguageUtil._lang = "zh";
    } else {
      LanguageUtil._lang = "zh";
    }
    LanguageUtil.loadLang();
  }

  static get lang() {
    return LanguageUtil._lang;
  }

  static initialLang(language) {
    let langParameter = language || (typeof window !== 'undefined' && window.location.search && window.location.search.slice(1).split('&').find(a => a.startsWith("lang")));

    let lang;

    if (langParameter) {
      lang = langParameter.split('=')[1];
    } else {
      lang = typeof window !== 'undefined' ? navigator.language.slice(0, 2) : 'zh';
    }

    lang = lang ? lang : 'zh';

    LanguageUtil.lang = lang;

    if (LanguageUtil.lang === "zh") {
      moment.locale("zh_CN");
    } else {
      moment.locale("zh_US");
    }
  }

  static loadLang() {
    if (LanguageUtil.lang === "zh") {
      T.setTexts(require('../language/zh.yml'));
    } else {
      T.setTexts(require('../language/zh.yml'));
    }
  }
}

