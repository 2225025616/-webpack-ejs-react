import T from "i18n-react";

export default class KycStatus {
  static ACCEPT = 'ACCEPT';
  static AUDITING = 'AUDITING';
  static REJECT = 'REJECT';

  static toName(status) {
    switch(status) {
      case KycStatus.ACCEPT:
        return "已通过";
      case KycStatus.AUDITING:
        return "等待审核中";
      case KycStatus.REJECT:
        return "已拒绝";
    }
  }
}
