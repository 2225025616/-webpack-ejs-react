import ActionTypes from "../constants/ActionTypes";
import StorageUtil from '../utils/StorageUtil';


export default function user(state = {
  members: [],
  info: {},
  kyc: {},
  kycs: {},
  balanceHolder: {},
  billRecords: {balance: "", pageNo: 0, totalPage: 0, list: []},
  authenticated: false,
  authenticating: true,
  auto: false,
  count: {},
  notaryCount: {},
  toDoList: {},
  settings: {},
}, action) {

  let members;

  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return Object.assign({}, state, {authenticated: false, authenticating: true, auto: false});
    case ActionTypes.AUTH_FAILURE:
      return Object.assign({}, state, {authenticated: false, authenticating: false, auto: false});
    case ActionTypes.SIGN_IN:
      return Object.assign({}, state, {authenticated: true, authenticating: false, auto: false, info: action.info});
    case ActionTypes.SIGN_OUT:
      return Object.assign({}, state, {authenticated: false, authenticating: false, auto: false, info: null});
    case ActionTypes.AUTO_SIGN_IN:
      return Object.assign({}, state, {authenticated: true, authenticating: false, auto: true, info: action.info});
    case ActionTypes.GET_USER:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.GET_KYC:
      return Object.assign({}, state, {kyc: action.kyc});
    case ActionTypes.UPDATE_USER_KYC:
      const kycs = Object.assign({}, state.kycs);
      kycs.idCard = action.kyc.idCard;
      kycs.realName = action.kyc.realName;
      kycs.isKycPass = "APPLY";

      info = Object.assign({}, state.info);
      info.realNameStatus = "APPLY";

      return Object.assign({}, state, {kycs, info});
    case ActionTypes.GET_USER_KYC_INFO:
      return Object.assign({}, state, {kycs: action.kycs});
    case ActionTypes.BIND_PHONE:
      let info = Object.assign({}, state.info, {phoneNumber: action.phoneNumber});
      return Object.assign({}, state, {info});
    case ActionTypes.GET_MEMBERS:
      return Object.assign({}, state, {members: action.members});
    case ActionTypes.ADD_MEMBER:
      members = state.members;
      members.splice(0, 0, action.member);
      members = members.slice();

      return Object.assign({}, state, {members});
    case ActionTypes.REMOVE_MEMBER:
      members = state.members.filter(item => {
        return item.id !== action.id
      });
      return Object.assign({}, state, {members});
    case ActionTypes.GET_BALANCE:
      return Object.assign({}, state, {balanceHolder: action.balanceHolder});
    case ActionTypes.GET_TRADE_RECORD:
      return Object.assign({}, state, {billRecords: action.billRecords});
    // case ActionTypes.UPLOAD_FILE:
    //   let balanceHolder = {...state.balanceHolder};
    //   balanceHolder.balance = action.result.balance;
    //   return Object.assign({},state,{balanceHolder});
    case ActionTypes.POST_COUPON:
      return Object.assign({}, state, {balanceHolder: action.balanceHolder});
    case ActionTypes.GET_ITEM_COUNT:
      return Object.assign({}, state, {count: action.count});
    case ActionTypes.GET_NOTARY_COUNT:
      return Object.assign({}, state, {notaryCount: action.count});
    case ActionTypes.GET_TO_DO_LIST:
      return Object.assign({}, state, {toDoList: action.toDoList});
    case ActionTypes.GET_SETTINGS:
      return Object.assign({}, state, {settings: action.settings});

    case ActionTypes.CLEAR_USER_INFO:
      return Object.assign({}, state, {
        members: [],
        info: {},
        kyc: {},
        kycs: {},
        balanceHolder: {},
        billRecords: {balance: "", pageNo: 0, totalPage: 0, list: []},
        authenticated: false,
        authenticating: true,
        auto: false,
        count: {},
        toDoList: {},
        settings: {},
      });
    default:
      return state;
  }
}
