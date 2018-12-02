import T from "i18n-react";

export default class SignatureStatus {
  static DRAFT = 'DRAFT';
  static WAIT_ME = 'WAIT_ME';
  static WAIT_OTHERS = 'WAIT_OTHERS';
  static DONE = 'DONE';
  static CANCEL = 'CANCEL';
  static EXPIRE = 'EXPIRE';
  static REJECT = 'REJECT';

  static toStatus(status) {
    switch(status) {
      case SignatureStatus.DRAFT:
        return T.translate("template.darft");
      case SignatureStatus.WAIT_ME:
        return T.translate("signature.wait-me");
      case SignatureStatus.WAIT_OTHERS:
        return T.translate("signature.wait-other");
      case SignatureStatus.DONE:
        return T.translate("signature.finished");
      case SignatureStatus.CANCEL:
        return T.translate("signature.canceled");
      case SignatureStatus.EXPIRE:
        return T.translate("signature.outside");
      case SignatureStatus.REJECT:
        return T.translate("signature.refuse");
    }
  }
}