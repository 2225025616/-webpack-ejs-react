import {push} from "redux-router";
import LanguageUtil from "./LanguageUtil";

export default function(url) {
  if (url.indexOf("?") >= 0) {
    return push(url + "&lang=" + LanguageUtil.lang);
  } else {
    return push(url + "?lang=" + LanguageUtil.lang);
  }
}
