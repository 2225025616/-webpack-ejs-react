import ActionTypes from '../constants/ActionTypes';

export default function organization(state = {
  all: [],
  orgInfo: {},//取返回组织列表的最后一个组织
  info: {},
  kyc: {},
  apiKeys: [],
  secretKey: [],
  notifications: {},
  inNewKey: false,
}, action) {
  let newState;
  let keys;
  let newkyc;

  switch (action.type) {
    case ActionTypes.LIST_ORGANIZATIONS:
      let org = action.all[action.all.length - 1] || {};
      return Object.assign({}, state, {all: action.all, orgInfo: org});
    case ActionTypes.GET_ORGANIZATION:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.NEW_ORGANIZATION:
      newState = Object.assign({}, state);
      newState.all.push(action.info);
      newState.info = action.info ;
      return newState;
    case ActionTypes.UPDATE_ORGANIZATION:
      newState = Object.assign({}, state, {info: action.info});
      let updated = newState.all.find(item=> {
        return item.id === action.info.id
      });
      if (updated) {
        Object.assign(updated, action.info);
      }
      return newState;
    case ActionTypes.VERIFY_ORGANIZATION_KYC:
      return Object.assign({}, state, {kyc: {...state.kyc, status: 1}});
    case ActionTypes.GET_ORGANIZATION_KYC:
      return Object.assign({}, state, {kyc: action.kyc});
    case ActionTypes.NEW_API_KEY:
      keys = state.apiKeys.slice();
      keys.push(action.key);
      return Object.assign({}, state, {apiKeys: keys, inNewKey: false});
    case ActionTypes.REMOVE_API_KEY:
      keys = state.apiKeys.filter(item => {
        return item.id !== action.id
      });
      return Object.assign({}, state, {apiKeys: keys, inNewKey: false});
    case ActionTypes.GET_API_KEY:
      return Object.assign({}, state, {apiKeys: action.keys});
    case ActionTypes.GET_NOTIFICATIONS:
      return Object.assign({}, state, {notifications: action.data})
    case ActionTypes.NEW_NOTIFICATIONS:
      return Object.assign({}, state, {notifications: action.data})
    case ActionTypes.UPDATE_NOTIFICATIONS:
      return Object.assign({}, state, {notifications: action.data})
    case ActionTypes.GET_SECRET_KEY:
      return Object.assign({}, state, {secretKey: action.secretKey})
    case ActionTypes.SWITCH_TO_NEW_KEY:
      return Object.assign({}, state, {inNewKey: true});
    case ActionTypes.CLOSE_TO_NEW_KEY:
      return Object.assign({}, state, {inNewKey: false});
    case ActionTypes.UPDATE_ORGANIZATION_KYC:
      newkyc = Object.assign({}, state);
      newkyc.all.push(action.kyc);
      newkyc.kyc = action.kyc ;
      return newkyc;
    default:
      return state;
  }
}
