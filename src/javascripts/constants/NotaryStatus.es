import T from "i18n-react";

export default class NotaryStatus {
  static APPLY = "APPLY" ;
  static ACCEPT = "ACCEPT";
  static CANCEL = "CANCEL" ;

  static toName(status) {
    switch(status) {
      case NotaryStatus.APPLY:
        return T.translate("notary.apply");
      case NotaryStatus.ACCEPT:
        return T.translate("notary.accept");
      case NotaryStatus.CANCEL:
        return T.translate("notary.cancel");
    }
  }
}
