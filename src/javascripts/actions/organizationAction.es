import ActionTypes from  '../constants/ActionTypes' ;
import Api from '../utils/Api';
import { toastr } from 'react-redux-toastr';
import push from "../utils/push";
import T from 'i18n-react';
import LanguageUtil from "../utils/LanguageUtil";

export function listOrganizations() {
  return dispatch => {
    new Api(dispatch).get(`/organizations`, (data, res) => {
      dispatch({
        type: ActionTypes.LIST_ORGANIZATIONS,
        all: data
      })
    }, () => {
    });
  }
}

export function getOrganization(id) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${id}`, (data) => {
      dispatch({type: ActionTypes.GET_ORGANIZATION, info: data})
    });
  }
}

export function verifyKyc(id, money) {
  return dispatch => {
    new Api(dispatch).post(`/organizations/${id}/kyc/verify`, {money}, () => {
      toastr.success(T.translate("actions.verify-kyc"));
      dispatch({type: ActionTypes.VERIFY_ORGANIZATION_KYC, id})
    });
  }
}


export function createOrganization(formData) {
  return dispatch => {
    new Api(dispatch).post("/organizations", formData, (data) => {
      toastr.success(T.translate("actions.create-org"));
      dispatch({type: ActionTypes.NEW_ORGANIZATION, info: data});
      dispatch(push(`/organizations/${data.id}?lang=${LanguageUtil.lang}`));
    });
  }
}

export function updateOrganization(id, formData, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/organizations/${id}`, formData, (data) => {
      toastr.success(T.translate("actions.update-org"));
      dispatch({type: ActionTypes.UPDATE_ORGANIZATION, info: data});
      if (onSuccess) onSuccess();
    });
  }
}

export function getKyc(organizationId) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${organizationId}/kyc`, (data) => {
      dispatch({type: ActionTypes.GET_ORGANIZATION_KYC, kyc: data});
    });
  }
}

export function updateKyc(organizationId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/organizations/${organizationId}/kyc`, formData, (data) => {
      toastr.success('更新实名认证信息成功，请等待客服人员审核，预计处理时间15-30分钟。审核结果会通过短信通知，请注意查收。');
      dispatch({type: ActionTypes.UPDATE_ORGANIZATION_KYC, kyc: data});
      dispatch(listOrganizations());
    });
  }
}

export function removeApiKey(organizationId, id) {
  return dispatch => {
    new Api(dispatch).destroy(`/organizations/${organizationId}/api-keys/${id}`, () => {
      toastr.success(T.translate("actions.remove-apikey"));
      dispatch({type: ActionTypes.REMOVE_API_KEY, id});
      dispatch(listOrganizations());
    });
  }
}

export function addApiKey(organizationId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/organizations/${organizationId}/api-keys`, formData, (key) => {
      toastr.success(T.translate("actions.add-apikey"));
      dispatch({type: ActionTypes.NEW_API_KEY, key});
      dispatch(listOrganizations());
    });
  }
}

export function findApiKeys(organizationId) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${organizationId}/api-keys`, (keys) => {
      dispatch({type: ActionTypes.GET_API_KEY, keys});
    });
  }
}

export function findNotifications(organizationId) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${organizationId}/notifications`, (data) => {
      dispatch({type: ActionTypes.GET_NOTIFICATIONS, data});
    })
  }
}

export function findSecretKey(organizationId) {
  return dispatch => {
    new Api(dispatch).get(`/organizations/${organizationId}/secret-key`, (secretKey) => {
      dispatch({type: ActionTypes.GET_SECRET_KEY, secretKey});
    })
  }
}

export function addNotifications(organizationId, formData) {
  return dispatch => {
    new Api(dispatch).post(`organizations/${organizationId}/notifications`, formData, (data) => {
      toastr.success(T.translate("actions.add-address"));
      dispatch({type: ActionTypes.NEW_NOTIFICATIONS, data});
    })
  }
}

export function updateNotifications(organizationId, formData) {
  return dispatch => {
    new Api(dispatch).post(`organizations/${organizationId}/notifications`, formData, (data) => {
      toastr.success(T.translate("actions.update-address"));
      dispatch({type: ActionTypes.UPDATE_NOTIFICATIONS, data});
    })
  }
}


export function findAllMembers(organizationId) {
  return dispatch => {
    return new Api(dispatch).get(`/organizations/${organizationId}/members`, members => {
      dispatch({type: ActionTypes.GET_MEMBERS, members});
    })
  }
}

export function addMember(organizationId, phoneNumber, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/organizations/${organizationId}/members`, {phoneNumber}, member => {
      toastr.success(T.translate("actions.add-member"));
      dispatch({type: ActionTypes.ADD_MEMBER, member});
      onSuccess();
    })
  }
}

export function removeMember(organizationId, id) {
  return dispatch => {
    return new Api(dispatch).destroy(`/organizations/${organizationId}/members/${id}`, () => {
      toastr.success(T.translate("actions.remove-member"));
      dispatch({type: ActionTypes.REMOVE_MEMBER, id});
    });
  }
}
