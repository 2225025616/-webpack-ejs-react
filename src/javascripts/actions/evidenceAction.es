import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import TokenUtil from "../utils/TokenUtil";
import { toastr } from "react-redux-toastr";
import T from "i18n-react";

export function findEvidence(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations/url/list`, params, lists => {
      dispatch({type: ActionTypes.GET_EVIDENCE, lists});
      if (onSuccess) onSuccess();
    });
  }
}

export function postEvidence(formData, onSuccess, onFailure) {
  return dispatch => {
    new Api(dispatch).post(`/attestations/url`, formData, info => {
      dispatch({type: ActionTypes.ADD_EVIDENCE, info});
      if (onSuccess) onSuccess();
      toastr.success(T.translate("actions.evidence-success"));
    },
        (err) => {
          toastr.error(err.message);
        if (onFailure) onFailure();
    }
    );
  };
}

export function deleteEvidence(evidenceId, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/attestations/url/${evidenceId}`, lists => {
      dispatch({type: ActionTypes.DELETE_EVIDENCE, lists});
      toastr.success(T.translate("actions.delete-success"));
      onSuccess();
    })
  }
}
