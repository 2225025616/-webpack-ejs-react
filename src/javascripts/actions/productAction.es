import ActionTypes from '../constants/ActionTypes';
import Api from '../utils/Api';
import { toastr } from 'react-redux-toastr';
import push from "../utils/push";
import T from 'i18n-react';


export function destroyProduct(productId, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/products/${productId}`, () => {
      toastr.success(T.translate("actions.destroy-product"));
      dispatch({type: ActionTypes.DESTROY_PRODUCT, id: productId});
      onSuccess();
    })
  }
}

export function switchProduct(productId, live) {
  return dispatch => {
    new Api(dispatch).post(`/products/${productId}/switch`, {live}, (e) => {
      dispatch({type: ActionTypes.SWITCH_PRODUCT, live, id: productId});

    });
  }
}

export function updateProduct(productId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/products/${productId}`, formData, (data) => {
      toastr.success(T.translate("actions.update-product"));
      dispatch(push(`/org-attestation/count`));
    });
  }
}

export function uploadFileProduct(id, file, onSuccess, onFailure) {
  return dispatch => {
    new Api(dispatch).post(`/attestations/products/${id}/files`, {file: file}, (all) => {
      toastr.success(T.translate("attestation.upload-file-success"));
      dispatch({type: ActionTypes.UPLOAD_FILE, all});
      if (onSuccess) onSuccess();
    }, (err) => {
      toastr.error(err.message);
 /*     if (onFailure) onFailure();*/
    });
  }
}

export function uploadFileOrg(id, file, onSuccess, onFailure) {
  return dispatch => {
    new Api(dispatch).post(`/attestations/organization/files`, {file: file}, (all) => {
      toastr.success(T.translate("attestation.upload-file-success"));
      dispatch({type: ActionTypes.UPLOAD_FILE, all});
      if (onSuccess) onSuccess();
    }, (err) => {
      toastr.error(err.message);
      /*      if (onFailure) onFailure();*/
    });
  }
}

export function createProduct(organizationId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/organizations/${organizationId}/products`, formData, (data) => {
      toastr.success(T.translate("actions.create-product"));
      dispatch({type: ActionTypes.NEW_PRODUCT, info: data});
      dispatch(push(`/org-attestation/count`));
    });
  }
}

export function listProducts() {
  return dispatch => {
    new Api(dispatch).get(`/products`, all => {
      dispatch({type: ActionTypes.LIST_PRODUCTS, all})
    });
  }
}

export function getProduct(productId) {
  return dispatch => {
    new Api(dispatch).get(`/products/${productId}`, info => {
      dispatch({type: ActionTypes.GET_PRODUCT, info})
    });
  }
}

export function getProfile(organizationId) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${organizationId}`);
  }
}

export function createOrganization(formData) {
  return dispatch => {
    new Api(dispatch).post('/organizations', formData);
  }
}
