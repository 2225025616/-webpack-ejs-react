import ActionTypes from "../constants/ActionTypes";

export default function order(state = {
  lists: {pageNo: 0, totalPage: 0, totalElements: 0, list: []},
  order: {},
  mobileList: [],
}, action) {
  switch (action.type) {
    case ActionTypes.CREATE_ORDER:
      return Object({}, state, {order: action.order || {}});
    case ActionTypes.GET_ORDERS_PER_PAGE:
      let mobileList = state.mobileList;
      if (action.all)
        if (action.all.pageNo === 0) mobileList = action.all.list;
        else mobileList = mobileList.concat(action.all.list);

      return Object.assign({}, state, {lists: action.all || {}, mobileList});
    case ActionTypes.DELETE_ORDER:
      let list;
      list = state.lists.list.map(item => {
        if (item.id === action.id)
          return Object.assign({}, item, {tradeStatus: 'TRADE_CLOSED'});
        return item;
      });
      let orders = {
        list: list,
        pageNo: state.lists.pageNo,
        pageSize: state.lists.pageSize,
        totalElements: state.lists.totalElements,
        totalPage: state.lists.totalPage,
      };
      return Object.assign({}, state, {lists: orders});
    case ActionTypes.GET_ORDER:
      return Object.assign({}, state, {order: action.all || {}});
    default:
      return state;
  }
}
