import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";

export function verifySmsCode(phoneNumber, purpose, eContractId) {
  return dispatch => {
    new Api(dispatch).post("/sms", {phoneNumber: phoneNumber, type: purpose, eContractId: eContractId || ''}, () => {
      dispatch(startRemainClock(purpose));
    });
  }
}


export function verifySmsImgCode(phoneNumber, checkCode, purpose, type) {//带图形验证码的
  return dispatch => {
    new Api(dispatch).post("/user/sms", {phoneNumber: phoneNumber, checkCode: checkCode, type: purpose, userRegType: type}, () => {
      dispatch(startRemainClock(purpose));
    }); 
  }
}

let remainTime = {};

function startRemainClock(purpose) {
  if (remainTime[purpose] > 0) {
    return;
  }

  remainTime[purpose] = 60;
  return (dispatch) => {
    (function _t() {
      dispatch({type: ActionTypes.DEC_SMS_VERIFY_CODE_REMAIN_TIME, remainTime});
      remainTime[purpose]--;
      if (remainTime[purpose] >= 0) {
        setTimeout(_t, 1000);
      }
    })();
  }
}

