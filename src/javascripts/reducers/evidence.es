import ActionTypes from '../constants/ActionTypes';
import Formatter from "../lib/formatter";

export default function evidence(state = {
  info: {},
  // all: {},
  selectedItems:[],
  lists: {pageNo: 0, totalPage: 0, totalItems : 0, pageSize: 10, createdAt: '', finishedAt: '', list: []},
}, action) {
  let all;

  switch (action.type) {
    case ActionTypes.GET_EVIDENCE:
      return Object.assign({}, state, {lists: action.lists});
    case ActionTypes.ADD_EVIDENCE:
      let user = state.lists.list;
      user.splice(0, 0, action.info);
      user = user.slice();
      let users = {
        list: user,
        pageNo: state.lists.pageNo,
        pageSize: state.lists.pageSize,
        totalItems: state.lists.totalItems + 1,
        totalPage: state.lists.totalPage === 0 ? 1 : state.lists.totalPage,
      };
      return Object.assign({}, state, {lists: users});
    case ActionTypes.DELETE_EVIDENCE:
      let lists;
      lists = state.lists.list.filter(item => {
        return item.id != action.lists.id
      });
      lists = {
        list: lists,
        pageNo: state.lists.pageNo,
        pageSize: state.lists.pageSize,
        totalItems: state.lists.totalItems-1,
        totalPage: state.lists.totalPage,
      };
      return Object.assign({}, state, {lists});
    default:
      return state;
  }
}
