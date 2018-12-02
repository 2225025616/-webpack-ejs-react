import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import TokenUtil from "../utils/TokenUtil";
import { toastr } from "react-redux-toastr";
import T from "i18n-react";

export function createOrder(formData, onSuccess) {
  let id = TokenUtil.uid;
  return dispatch => {
    return new Api(dispatch).post(`/users/${id}/createOrder`, formData, order => {
      // dispatch({type: ActionTypes.CREATE_ORDER, order});
      if (onSuccess) onSuccess(order);
    })
  }
}

export function getOrders(params, onSuccess) {
  let id = TokenUtil.uid;
  return dispatch => {
    return new Api(dispatch).getWithParams(`/users/${id}/bill-records`, params, all => {
      dispatch({type: ActionTypes.GET_ORDERS_PER_PAGE, all});
      if (onSuccess) onSuccess();
    })
  }
}

export function getSingleOrder(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/users/${id}/record`, {}, all => {
      dispatch({type: ActionTypes.GET_ORDER, all});
      if (onSuccess) onSuccess(all);
    })
  }
}

export function payOrder(id, params, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/users/${id}/pay`, {...params}, () => {
      toastr.success(T.translate("actions.pay-success"));
      if (onSuccess) onSuccess();
    })
  }
}

export function deleteOrder(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/users/${id}/cancel`, {}, (lists) => {
      dispatch({type: ActionTypes.DELETE_ORDER, id});
      toastr.success(T.translate("actions.cancel-order-success"));
      if (onSuccess) onSuccess();
    })
  }
}