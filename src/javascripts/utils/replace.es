import { replace } from "redux-router";
import LanguageUtil from "./LanguageUtil";

export default function (url) {
  if (url.indexOf("?") >= 0) {
    return replace(url + "&lang=" + LanguageUtil.lang);
  } else {
    return replace(url + "?lang=" + LanguageUtil.lang);
  }
}
