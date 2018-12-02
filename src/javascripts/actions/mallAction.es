import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import { toastr } from "react-redux-toastr";
import T from "i18n-react";

export function getPackages(productType, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/itemPrices`, {productType}, packages => {
      dispatch({type: ActionTypes.GET_PACKAGES, packages});
      if (onSuccess) onSuccess(packages);
    })
  }
}

export function getPackage(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/users/${id}/record`, {}, packageInfo => {
      dispatch({type: ActionTypes.GET_PACKAGE, packageInfo});
      toastr.success(T.translate("actions.cancel-order-success"));
      if (onSuccess) onSuccess();
    })
  }
}
