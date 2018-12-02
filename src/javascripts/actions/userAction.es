import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import { toastr } from "react-redux-toastr";
import TokenUtil from "../utils/TokenUtil";
import push from "../utils/push";
import T from "i18n-react";
import DeviceUtil from "../utils/DeviceUtil";
import AdminRoute from "../components/admins/AdminRoute";
import LanguageUtil from "../utils/LanguageUtil.es";
import {getGraphicCode} from "./adminAction.es"

export function signUp(formData, nextUrl, onFailure) {
  return dispatch => {
    new Api(dispatch).post("/users", formData, () => {
      DeviceUtil.isDesktop() ? dispatch(push(`/sign-in?phoneNumber=${formData.phoneNumber}`)) : dispatch(push(nextUrl ? nextUrl : `/sign-up/hint`));
      toastr.success(T.translate("actions.sign-up"));
    }, (err) => {
      toastr.error(err.message);
      dispatch(getGraphicCode()); //个人注册报错重新获取验证码
    })
  }
}

export function businessSignUp(formData, nextUrl, onFailure) {
    return dispatch => {
        new Api(dispatch).post("/user-enterprise", formData, () => {
            DeviceUtil.isDesktop() ? dispatch(push(`/sign-in?enterpriseName=${formData.enterpriseName}`)) : dispatch(push(nextUrl ? nextUrl : `/sign-up/hint`));
            toastr.success(T.translate("actions.sign-up"));
        },(err)=>{
          toastr.error(err.message);
          dispatch(getGraphicCode()); //企业注册报错重新获取验证码
        })
    }
}


function afterSignIn(dispatch, info, res, nextUrl) {
  TokenUtil.uid = info.id;
  TokenUtil.token = info.token;

  dispatch({type: ActionTypes.SIGN_IN, info: info});
  if (nextUrl) dispatch(push(nextUrl));
}

function afterAutoSignIn(dispatch, info, res) {
  TokenUtil.uid = info.id;
  TokenUtil.token = info.token;

  dispatch({type: ActionTypes.AUTO_SIGN_IN, info: info});
}

function afterSignOut(dispatch) {
  TokenUtil.token = undefined;
  TokenUtil.uid = undefined;

  dispatch({type: ActionTypes.SIGN_OUT});
}

function afterSignInFailure(dispatch, result) {
  TokenUtil.uid = undefined;
  TokenUtil.token = undefined;

  let message = Api.humanableMessage(result);
  if (message)
    toastr.error(message);
  dispatch({type: ActionTypes.AUTH_FAILURE});
  dispatch(getGraphicCode()); //登陆报错重新获取验证码
}

function afterAutoSignInFailure(dispatch, result) {
  TokenUtil.uid = undefined;
  TokenUtil.token = undefined;

  dispatch({type: ActionTypes.AUTH_FAILURE});
}

export function signIn(formData, nextUrl) {
  return dispatch => {
    dispatch({type: ActionTypes.AUTH_REQUEST});
    new Api(dispatch).post("/tokens", formData, (data, res) => {
      afterSignIn(dispatch, data, res, nextUrl);
    }, data => afterSignInFailure(dispatch, data));
  }
}

export function verifyCodeLogin(formData, nextUrl) {
  return dispatch => {
    dispatch({type: ActionTypes.AUTH_REQUEST});
    new Api(dispatch).post("/sms/tokens", formData, (data, res) => {
      afterSignIn(dispatch, data, res, nextUrl);
    }, data => afterSignInFailure(dispatch, data));
  }
}

export function businessLogin(formData, nextUrl) {
    return dispatch => {
        dispatch({type: ActionTypes.AUTH_REQUEST});
        new Api(dispatch).post("/enterprise/user", formData, (data, res) => {
            afterSignIn(dispatch, data, res, nextUrl);
        }, data => afterSignInFailure(dispatch, data));
    }
}

export function currentUser() {
  return dispatch => {
    new Api(dispatch).get("/tokens/current", (data, res) => afterAutoSignIn(dispatch, data, res), data => afterAutoSignInFailure(dispatch));
  }
}

export function signOut(onSuccessUrl) {
  return dispatch => {
    new Api(dispatch).destroy(`/tokens/${TokenUtil.token}`, () => {
      (LanguageUtil.lang === "zh") ? window.location = `${onSuccessUrl || '/'}?lang=zh` : window.location = `${onSuccessUrl || '/'}?lang=en`;
      // dispatch({type: ActionTypes.CLEAR_USER_INFO});
      // dispatch(push(`${onSuccessUrl || '/'}?lang=zh`));
    });
  }
}

export function adminSignOut() {
  let adminRoute = AdminRoute.adminRoute();
  return dispatch => {
    new Api(dispatch).destroy(`/tokens/${TokenUtil.token}`, () => {
      window.location = `/${adminRoute}/sign-in`;
    });
  }
}

export function resetPassword(formData, nextUrl, onFailure) {
  return dispatch => {
    new Api(dispatch).post("/users/reset-password", formData, () => {
      toastr.success(T.translate("actions.reset-password"));
      if (nextUrl) dispatch(push(nextUrl));
    }, (err) => {
      toastr.error(err.message);
      dispatch(getGraphicCode()); //重置密码报错重新获取验证码
    });
  }
}

export function modifyPassword(formData, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/users/${TokenUtil.uid}/modify-password`, formData, () => {
      toastr.success(T.translate("actions.modify-password"));
      if (onSuccess) onSuccess();
    });
  }
}

export function updateUser(formData) {
  return dispatch => {
    new Api(dispatch).post(`/users/${TokenUtil.uid}`, formData, () => {
      toastr.success(T.translate("actions.update-user"));
    });
  }
}

function afterGetUser(data) {
  return {
    type: ActionTypes.GET_USER,
    info: data
  }
}


export function getCurrentUser() {
  return dispatch => {
    new Api(dispatch).get("/users/current", data => dispatch(afterGetUser(data)));
  }
}

export function getUserKycs() {
  return dispatch => {
    new Api(dispatch).get("/users/info", (data) => {
      dispatch({type: ActionTypes.GET_USER_KYC_INFO, kycs: data});
    });
  }
}

function afterGetKyc(data) {
  return {
    type: ActionTypes.GET_KYC,
    kyc: data
  }
}

export function getKyc() {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).get(`/users/${userId}/kyc`, data => dispatch(afterGetKyc(data)));
  }
}


export function updateKyc(formData, onSuccess) {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${userId}/kyc`, formData,
      kyc => {
        toastr.success('更新实名认证信息成功，请等待客服人员审核，预计处理时间15-30分钟。审核结果会通过短信通知，请注意查收。');
        dispatch({type: ActionTypes.UPDATE_USER_KYC, kyc});
        onSuccess();
      })
  }
}

export function bindPhone(formData, onSuccess) {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${userId}/bind-phone`, {...formData, type: "BINDPHONE"}, () => {
      toastr.success(T.translate("actions.bind-phone"));
      dispatch({type: ActionTypes.BIND_PHONE, phoneNumber: formData.phoneNumber});
      onSuccess();
    });
  }
}

export function bindEmail(email, onSuccess) {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${userId}/bind-email`, {email}, () => {
      toastr.success(T.translate("actions.bind-email"));
      onSuccess();
    })
  }
}


export function bindPhoneNumber(phone, code, id, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/users/${phone}/${code}/${id}`, {}, () => {
      toastr.success(T.translate("actions.bind-phone"));
      onSuccess();
    })
  }
}

export function updateAvatar(file) {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${id}/avatar`, {avatar: file}, (file) => {
      toastr.success(T.translate("actions.update-avatar"));
      dispatch(currentUser());
    });
  }
}

export function getBalance(onSuccess) {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).get(`/users/${id}/balance`, (balanceHolder) => {
      dispatch({type: ActionTypes.GET_BALANCE, balanceHolder});
      if (onSuccess) onSuccess(balanceHolder);
    });
  }
}

export function uploadFile(id, file, onSuccess, onFailure) {
  return dispatch => {
    new Api(dispatch).post(`/attestations/users/${id}/files`, {file: file}, (all) => {
      toastr.success(T.translate("attestation.upload-file-success"));
      dispatch({type: ActionTypes.UPLOAD_FILE, all});
      if (onSuccess) onSuccess();
    }, (err) => {
      toastr.error(err.message);
/*      if (onFailure) onFailure();*/
    });
  }
}

export function getTradeRecords() {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).get(`/users/${id}/bill-records`, (billRecords) => {
      dispatch({type: ActionTypes.GET_TRADE_RECORD, billRecords: billRecords});
    });
  }
}

export function payFromAli(params, onSuccess) {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).getWithParams(`/alipay/pay`, {...params}, result => {
      window.document.getElementById("__extends__").innerHTML = result;
      let a = window.document.getElementById("__extends__");
      a.getElementsByTagName("form")[0].submit();
      if (onSuccess) onSuccess();
    });
  }
}

export function postCoupon(couponCode, onSuccess) {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${id}/coupon-code/${couponCode}`, {}, (balanceHolder) => {
      toastr.success(T.translate("coupon.coupon-success"));
      dispatch({type: ActionTypes.POST_COUPON, balanceHolder});
      onSuccess();
    })
  }
}

export function getItemCount() {
  return dispatch => {
    new Api(dispatch).get(`/query/count`, count => {
      dispatch({type: ActionTypes.GET_ITEM_COUNT, count});
    });
  }
}

export function getNotaryCount() {
  return dispatch => {
    new Api(dispatch).get(`/attestations/notary-count`, count => {
      dispatch({type: ActionTypes.GET_NOTARY_COUNT, count});
    });
  }
}

export function getToDoList() {
  return dispatch => {
    new Api(dispatch).get(`/query/schedule`, toDoList => {
      dispatch({type: ActionTypes.GET_TO_DO_LIST, toDoList});
    });
  }
}

export function getSettings() {
  let id = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).get(`/users/${id}/inform`, (settings) => {
      dispatch({type: ActionTypes.GET_SETTINGS, settings});
    });
  }
}

export function changeSettings(formData, onSuccess) {
  let userId = TokenUtil.uid;
  return dispatch => {
    new Api(dispatch).post(`/users/${userId}/updateInform`, formData, () => {
      toastr.success(T.translate("actions.update-system"));
      onSuccess();
    })
  }
}

export function switchUser(onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/tokens/switchUser`, {}, info => {
      TokenUtil.uid = info;
      onSuccess();
    })
  }
}
