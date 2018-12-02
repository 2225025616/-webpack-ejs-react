import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import { toastr } from "react-redux-toastr";
import T from "i18n-react";
import push from "../utils/push";

export function getSignProfile() {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/count`, (profile) => {
      dispatch({type: ActionTypes.GET_SIGN_PROFILE, profile});
    })
  }
}


export function createSeal(formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/addUserSignature`, formData, (seal) => {
      dispatch({type: ActionTypes.CREATE_SEAL, seal});
      onSuccess(seal);
    })
  }
}

export function deleteSeal(id) {
  return dispatch => {
    return new Api(dispatch).destroy(`/signatures/deleteUserSignature/${id}`, (seal) => {
      toastr.success(T.translate("actions.delete-seal-success"));
      dispatch({type: ActionTypes.DELETE_SEAL, seal});
    })
  }
}

export function findAllSeals(onSuccess) {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/findUserSignature`, seals => {
      dispatch({type: ActionTypes.GET_OFFICIAL_SEALS, seals});
      if (onSuccess) onSuccess();
    })
  }
}

export function setDefaultSeal(id) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/${id}/default`, {}, seals => {
      dispatch({type: ActionTypes.SEAT_DEFAULT, seals});
    })
  }
}

export function uploadSignFile(file, type, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/signatures/uploadContract`, {file: file, type: type}, (fileInfo) => {
      dispatch({type: ActionTypes.UPLOAD_SIGN_FILE, fileInfo});
      onSuccess();
    });
  }
}

export function postSignatureInfo(signatureId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/signatures/setContract/${signatureId}`, formData, all => {
      dispatch(push(`/signatures/${signatureId}/add-seal`));
    });
  }
}

export function findSignatureMembers(onSuccess) {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/findUserLinkman`, members => {
      dispatch({type: ActionTypes.GET_SIGNATURE_MEMBERS, members});
      if (onSuccess) onSuccess();
    })
  }
}

export function findSignatureMember(id) {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/getLinkman/${id}`, member => {
      dispatch({type: ActionTypes.GET_SIGNATURE_MEMBER, member});
    })
  }
}

export function createSignatureMember(formData, type, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/addLinkman`, formData, member => {
      dispatch({type: ActionTypes.CREATE_SIGNATURE_MEMBER, member});
      if (type === "pc") {
        toastr.success(T.translate("actions.add-link-success"));
      }
      onSuccess();
    })
  }
}

export function deleteSignatureMember(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/signatures/deleteLinkman/${id}`, members => {
      dispatch({type: ActionTypes.DELETE_SIGNATURE_MEMBER, members});
      toastr.success(T.translate("actions.remove-link-success"));
      onSuccess();
    })
  }
}

export function updateSignatureMember(id, formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/updateLinkman/${id}`, formData, date => {
      dispatch({type: ActionTypes.UPDATE_SIGNATURE_MEMBER, members: date});
      toastr.success(T.translate("actions.update-link-success"));
      onSuccess();
    })
  }
}

export function getSignature(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/signatures`, params, lists => {
      dispatch({type: ActionTypes.GET_SIGNATURES, lists});
      if (onSuccess) onSuccess();
    });
  }
}

export function getSignatureMobile(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/signatures`, params, lists => {
      dispatch({
        type: ActionTypes.GET_SIGNATURES_MOBILE,
        lists,
        mobileActive: params.status || 'ALL',
        pageNo: params.pageNo
      });
      if (onSuccess) onSuccess();
    });
  }
}

export function getSignatureBykeyWord(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/signatures/findByKeyword`, params, lists => {
      dispatch({type: ActionTypes.GET_SIGNATURES_BY_KEY_WORD, lists});
    });
  }
}

export function findSignature(signatureId) {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/${signatureId}`, info => {
      dispatch({type: ActionTypes.GET_BY_SIGNATURE_ID, info});
    });
  }
}

export function addSignatureSeals(id, formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/setContractSignStatus/${id}`, formData, data => {
      dispatch({type: ActionTypes.ADD_SIGNATURE_SEALS, data});
      onSuccess();
    })
  }
}

export function refuseSignature(id, formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/signatures/setContractSignStatus/${id}`, formData, () => {
      // dispatch({type: ActionTypes.REFUSE_SIGNATURE, all});
      onSuccess();
    })
  }
}

export function deleteSignature(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/signatures/deleteContract/${id}`, lists => {
      dispatch({type: ActionTypes.DELETE_SIGNATURE, lists});
      toastr.success(T.translate("actions.delete-sign"));
      onSuccess();
    })
  }
}

export function getPdfSeals(id) {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/pdfSignature/${id}`, pdfSeals => {
      dispatch({type: ActionTypes.GET_PDF_SEALS, pdfSeals});
    })
  }
}

export function getSignatureAuthorize(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/users/authorizations`, params, lists => {
      dispatch({type: ActionTypes.GET_SIGNATURES_AUTHORIZE, lists});
      if (onSuccess) onSuccess();
    });
  }
}

export function deleteSignatureAuthorize(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/users/authorization/${id}`, () => {
      toastr.success(T.translate("actions.delete-authorize"));
      onSuccess();
    })
  }
}

export function getApiSignature() {
  return dispatch => {
    return new Api(dispatch).get(`/signatures/api-signCount`, count => {
      dispatch({type: ActionTypes.GET_API_SIGNATURES, count});
    });
  }
}

export function getApiSignatureByTime(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/signatures/api-signCountStatistics`, params, count => {
      dispatch({type: ActionTypes.GET_API_SIGNATURES_BY_TIME, count});
    });
  }
}

export function getUrlStatistics(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations/urlStatistics`, params, urlStatistics => {
      dispatch({type: ActionTypes.GET_URL_STATISTICS, urlStatistics});
    });
  }
}

export function getSecurity(params) {
  return dispatch => {//上链数量
    return new Api(dispatch).getWithParams(`/products/saveStatistics`, params, secStatistics => {
      dispatch({type: ActionTypes.GET_SEC_STATISTICS, secStatistics});
    });
  }
}
/*export function getSaveStatistics(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/products/saveStatistics`, params, saveStatistics => {
      dispatch({type: ActionTypes.GET_SAVE_STATISTICS, saveStatistics});
    });
  }
}*/

/*export function getProStatistics(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/products/productStatistics`, params, productStatistics => {
      dispatch({type: ActionTypes.GET_PRODUCTS_STATISTICS, productStatistics});
    });
  }
}*/

export function getItems(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/products/productStatistics`, params, itemStatistics => {
      dispatch({type: ActionTypes.GET_ITEM_STATISTICS, itemStatistics});
    });
  }
}

export function getChartCount() {
  return dispatch => {
    return new Api(dispatch).get(`/products/totalStatistics`, chartCount => {
      dispatch({type: ActionTypes.GET_CHART_COUNT, chartCount});
    });
  }
}
