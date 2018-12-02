import ActionTypes from '../constants/ActionTypes';

export default function sms(state = {
  remainTime: {},
}, action) {
  switch (action.type) {
    case ActionTypes.DEC_SMS_VERIFY_CODE_REMAIN_TIME:
      return {...state, remainTime: {...(action.remainTime || {})}};
    default:
      return state;
  }
}
