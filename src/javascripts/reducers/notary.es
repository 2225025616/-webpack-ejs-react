import ActionTypes from "../constants/ActionTypes";
import NotaryStatus from "../constants/NotaryStatus";

export default function notary(state = {
  user: {pageNo: 0, totalPage: 0, list: []},
  product: {pageNo: 0, totalPage: 0, list: []},
  expanded: {collectCode: '', list: []},
  info: {},
  mobileNotaries: []
  // notary: {},
}, action) {
  let updateNotaryStatus = (status) => {
    ["user", "product"].forEach(key => {
      let list = state[key].list;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === action.notaryId) {
          list[i] = Object.assign({}, list[i], {status});
          return state;
        }
      }
    });
    return state;
  };

  switch (action.type) {
    case ActionTypes.GET_NOTARY:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.GET_PRODUCT_NOTARIES:
      return Object.assign({}, state, {product: action.all});
    case ActionTypes.GET_USER_NOTARIES:
      return Object.assign({}, state, {
        user: action.all,
        mobileNotaries: parseInt(action.pageNo) === 0 ? action.all.list : state.mobileNotaries.concat(action.all.list)
      });
    case ActionTypes.CLEAR_ALL_MOBILE_NOTARIES:
      return Object.assign({}, state, {mobileNotaries: []});
    case ActionTypes.DELETE_NOTARY:
      return Object.assign({}, updateNotaryStatus(NotaryStatus.CANCEL));
    case ActionTypes.DELETE_DETAIL_NOTARY:
      let expanded = state.expanded;
      expanded.status = "CANCEL";
      return Object.assign({}, state, {expanded});
    case ActionTypes.OPEN_NOTARY:
      return Object.assign({}, updateNotaryStatus(NotaryStatus.APPLY), {expanded: Object.assign({}, state.expanded, {status: 'APPLY'})});
    case ActionTypes.OPEN_DETAIL_NOTARY:
      let open = state.expanded;
      open.status = "APPLY";
      return Object.assign({}, state, {open});
    case ActionTypes.GET_BY_COLLECT_CODE:
      return Object.assign({}, state, {expanded: action.expanded});
    case ActionTypes.GET_NOTARIZATION:
      return Object.assign({}, state, {info: action.info});
    // case ActionTypes.POST_USER_NOTARIZATION:
    //   return Object.assign({}, state, {notary: action.notary});
    default:
      return state;
  }
}
