import ActionTypes from "../constants/ActionTypes";

export default function notification(state = {
  all: {
    pageNo: 0,
    pageSize: 12,
    list: []
  },
  mobileMsg: [],
  unread: 0,
}, action) {
  let list;

  switch (action.type) {
    case ActionTypes.LIST_NOTIFICATIONS:
      return Object.assign({}, state, {all: action.all, mobileMsg: state.mobileMsg.concat(action.all.list)});
    case ActionTypes.READ_NOTIFICATION:
      list = state.all.list.slice();
      list.forEach(item => {
        if (item.id === action.id) {
          item.isRead = true;
        }
      });
      return Object.assign({}, state, {all: {...state.all, list}});
    case ActionTypes.DELETE_NOTIFICATION:
      // console.log(action.all.notifications);
      list = action.all.notifications;

      list = state.all.list.filter(item => {
        for (let i = 0; i < list.length; i++) {
          return item.id !== list[i].id
        }
      });
      return Object.assign({}, state, {all: {...state.all, list}});
    case ActionTypes.MARK_ALL:
      list = state.all.list.slice();
      list.forEach(item => {
        item.isRead = true;
      });
      return Object.assign({}, state, {all: {...state.all, list}});
    case ActionTypes.UNREAD:
      let unread = action.count.count;
      return Object.assign({}, state, {unread});
    default:
      return state;
  }
}
