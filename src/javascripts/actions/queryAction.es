import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";

export function validateAttestations(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams('/query/attestation', params, isExist => {
      dispatch({type: ActionTypes.QUERY, isExist});
      onSuccess();
    })
  }
}

export function validateAttFile(file, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/query/attestation/file`, {file: file}, (isExist) => {
      dispatch({type: ActionTypes.QUERY, isExist});
      onSuccess();
    });
  }
}

export function validateSignFile(file, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/query/eContract`, {file: file}, (isExist) => {
      dispatch({type: ActionTypes.QUERY, isExist});
      onSuccess();
    });
  }
}
