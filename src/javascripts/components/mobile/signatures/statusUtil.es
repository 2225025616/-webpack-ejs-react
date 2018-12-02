import T from "i18n-react";

export default class statusUtil {
  static data = {
    status: [
      {
        name: 'DRAFT',
        flowClass: 'status-draft',
        color: '#ff9001',
        icon: require('../../../../images/mobile/signature/icon-signature-draft.png')
      },
      {
        name: 'WAIT_ME',
        flowClass: 'status-wait-me',
        color: '#1687ee',
        icon: require('../../../../images/mobile/signature/icon-signature-wait_me.png')
      },
      {
        name: 'WAIT_OTHERS',
        flowClass: 'status-wait-other',
        color: '#2fcce8',
        icon: require('../../../../images/mobile/signature/icon-signature-wait_other.png')
      },
      {
        name: 'DONE',
        flowClass: 'status-done',
        color: '#28ba81',
        icon: require('../../../../images/mobile/signature/icon-signature-done.png')
      },
      {
        name: 'CANCEL',
        flowClass: 'status-cancel',
        color: '#d2d2d2',
        icon: require('../../../../images/mobile/signature/icon-signature-cancel.png')
      },
      {
        name: 'EXPIRE',
        flowClass: 'status-cancel',
        color: '#d2d2d2',
        icon: require('../../../../images/mobile/signature/icon-signature-expire.png')
      },
      {
        name: 'REJECT',
        flowClass: 'status-reject',
        color: '#f26c6c',
        icon: require('../../../../images/mobile/signature/icon-signature-reject.png')
      },
    ]
  };

  static getIcon = (status) => {
    switch (status) {
      case "DRAFT":
        return statusUtil.data.status[0].icon;
      case "WAIT_ME":
        return statusUtil.data.status[1].icon;
      case "WAIT_OTHERS":
        return statusUtil.data.status[2].icon;
      case "DONE":
        return statusUtil.data.status[3].icon;
      case "CANCEL":
        return statusUtil.data.status[4].icon;
      case "EXPIRE":
        return statusUtil.data.status[5].icon;
      case "REJECT":
        return statusUtil.data.status[6].icon;
    }
  };

  static getClass = (status) => {
    switch (status) {
      case "DRAFT":
        return statusUtil.data.status[0].flowClass;
      case "WAIT_ME":
        return statusUtil.data.status[1].flowClass;
      case "WAIT_OTHERS":
        return statusUtil.data.status[2].flowClass;
      case "DONE":
        return statusUtil.data.status[3].flowClass;
      case "CANCEL":
        return statusUtil.data.status[4].flowClass;
      case "EXPIRE":
        return statusUtil.data.status[5].flowClass;
      case "REJECT":
        return statusUtil.data.status[6].flowClass;
    }
  };

  static getStatus = (status) => {
    switch (status) {
      case "DRAFT":
        return T.translate("template.darft");
      case "WAIT_ME":
        return T.translate("signature.wait-me");
      case "WAIT_OTHERS":
        return T.translate("signature.wait-other");
      case "DONE":
        return T.translate("signature.finished");
      case "CANCEL":
        return T.translate("signature.canceled");
      case "EXPIRE":
        return T.translate("signature.outside");
      case "REJECT":
        return T.translate("signature.refuse");
      default :
        return T.translate("signature.all-status");
    }
  };

  static getColor = (status) => {
    switch (status) {
      case "DRAFT":
        return statusUtil.data.status[0].color;
      case "WAIT_ME":
        return statusUtil.data.status[1].color;
      case "WAIT_OTHERS":
        return statusUtil.data.status[2].color;
      case "DONE":
        return statusUtil.data.status[3].color;
      case "CANCEL":
        return statusUtil.data.status[4].color;
      case "EXPIRE":
        return statusUtil.data.status[5].color;
      case "REJECT":
        return statusUtil.data.status[6].color;
    }
  };
}