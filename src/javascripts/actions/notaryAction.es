import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import { toastr } from "react-redux-toastr";
import TokenUtil from "../utils/TokenUtil";
import T from "i18n-react";
import push from "../utils/push";

export function createProductNotary(productId, anos) {
  return dispatch => {
    return new Api(dispatch).post(`/products/${productId}/notaries`, {anos}, () => {
      toastr.success(T.translate("actions.have-apply") + `${anos.length}` + T.translate("actions.in-quiry"));
    });
  }
}

export function createUserNotary(userId, anos) {
  return dispatch => {
    return new Api(dispatch).post(`/users/${userId}/notaries`, {anos}, () => {
      toastr.success(T.translate("actions.have-apply") + `${anos.length}` + T.translate("actions.in-quiry"));
    });
  }
}

export function findByCollectCode(collectCode) {
  return dispatch => {
    return new Api(dispatch).get(`/notary-public/${collectCode}/query`, expanded => {
      expanded.collectCode = collectCode;
      dispatch({type: ActionTypes.GET_BY_COLLECT_CODE, expanded});
    });
  }
}

export function findNotariesByProduct(productId, params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/products/${productId}/notaries`, params, all => {
      dispatch({type: ActionTypes.GET_PRODUCT_NOTARIES, all});
      if (onSuccess) onSuccess();
    });
  }
}

export function findNotariesByUser(userId, params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/users/${userId}/notaries`, params, all => {
      dispatch({type: ActionTypes.GET_USER_NOTARIES, all, pageNo: params.pageNo});
      if (onSuccess) onSuccess();
    })
  }
}

export function clearAllMobileNotaries() {
  return {type: ActionTypes.CLEAR_ALL_MOBILE_NOTARIES};
}

export function deleteNotary(notaryId, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/notaries/${notaryId}`, {}, e => {
      dispatch({type: ActionTypes.DELETE_NOTARY, notaryId});
      // dispatch(push(`/notaries`));
      toastr.success(T.translate("actions.delete-notary"));
      onSuccess();
    })
  }
}

export function deleteDetailNotary(notaryId, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/notaries/${notaryId}`, {}, expanded => {
      dispatch({type: ActionTypes.DELETE_DETAIL_NOTARY, expanded});
      toastr.success(T.translate("actions.delete-notary"));
      onSuccess();
    })
  }
}

export function openNotary(notaryId) {
  return dispatch => {
    return new Api(dispatch).post(`/notaries/${notaryId}/reopen`, {}, e => {
      dispatch({type: ActionTypes.OPEN_NOTARY, notaryId});
      toastr.success(T.translate("actions.re-apply-success"));
    })
  }
}

export function openDetailNotary(notaryId, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/notaries/${notaryId}/reopen`, {}, open => {
      dispatch({type: ActionTypes.OPEN_DETAIL_NOTARY, open});
      toastr.success(T.translate("actions.re-apply-success"));
      onSuccess();
    })
  }
}

export function postNotarization(formData, onSuccess) {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${userId}/notaries`, formData, info => {
      // dispatch({type: ActionTypes.POST_USER_NOTARIZATION,notary});
      toastr.success(T.translate("actions.success-apply"));
      if (onSuccess) onSuccess(info);
    });
  };
}

export function postProductNotarization(productId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/products/${productId}/notaries`, formData, all => {
      // dispatch({type: ActionTypes.POST_PRODUCT_NOTARIZATION});
      dispatch(push(`/products/over-view/${productId}?active=3`));
      toastr.success(T.translate("actions.success-apply"));
    });
  }
}


export function getNotarization() {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).get(`/users/${id}/kyc`, info => {
      dispatch({type: ActionTypes.GET_NOTARIZATION, info});
    })
  }
}

export function upLoadFile(id, file, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/attestations/${id}/files`, {file: file}, (result) => {
      toastr.success(T.translate("actions.success-file"));
      // dispatch({type: ActionTypes.UPLOADED_FILE, id: id});
      onSuccess();
    });
  }
}

export function payNotary(id, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/notaries/${id}/pay`, {}, () => {
      toastr.success(T.translate("actions.pay-success"));
      onSuccess();
    })
  }
}
