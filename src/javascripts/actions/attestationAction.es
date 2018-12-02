import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";

export function findAttestationByProduct(productId, formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`products/${productId}/attestations`, formData, all => {
      dispatch({type: ActionTypes.GET_PRODUCT_ATTESTATIONS, all});
      if (onSuccess) onSuccess();
    });
  }
}

export function findAttestationsSummaryByUser() {
  return dispatch => {
    return new Api(dispatch).get('/attestations/summary', result => {
      dispatch({type: ActionTypes.GET_ATTESTATION_SUMMARY, summary: result});
    })
  }
}

export function findUploadAttestationByUser(params) {
  params.userUpload = true;
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations`, params, all => {
      dispatch({type: ActionTypes.GET_UPLOAD_ATTESTATIONS, all});
    });
  }
}

export function findAttestationByUser(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations`, params, all => {
      dispatch({type: ActionTypes.GET_ATTESTATIONS, all});
    });
  }
}

export function getAttestation(attestationId, sandbox) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations/${attestationId}`,
      {sandbox: sandbox === "true"}, info => {
        dispatch({type: ActionTypes.GET_ATTESTATION, info});
      });
  }
}

export function getBlockChainHash(attestationId) {
  return dispatch => {
    return new Api(dispatch).get(`/attestations/${attestationId}/block-chain`, factom => {
      dispatch({type: ActionTypes.GET_BLOCK_CHAIN_HASH, factom});
    }, () => {
    });
  }
}

//以下是3.0的

export function findAllAttestationByUser(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/attestations/all`, params, all => {
      dispatch({type: ActionTypes.GET_USER_ATTESTATIONS, all, pageNo: params.pageNo});
      if (onSuccess) onSuccess();
    });
  }
}

export function findAllSummary(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/allAttestations/allSummary`, params, allSummary => {
      dispatch({type: ActionTypes.GET_All_SUMMARY, allSummary});
    });
  }
}

export function findAllSummaryProduct() {
  return dispatch => {
    return new Api(dispatch).get(`/allAttestations/allEnterpriseSummary`, allSummary => {
      dispatch({type: ActionTypes.GET_All_SUMMARY_PRODUCT, allSummary:allSummary});
    });
  }
}

export function orgAttestationCount(params) {
  return dispatch => {
    new Api(dispatch).getWithParams(`/products/count`, params, count=> {
      dispatch({type: ActionTypes.ORG_ATTESTATION_COUNT, count})
    });
  }
}