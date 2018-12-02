import ActionTypes from '../constants/ActionTypes';
import StorageUtil from '../utils/StorageUtil';

export default function product(state = {
  info: {},
  all: []
}, action) {
  let info;
  let all;
  let newState;

  switch (action.type) {
    case ActionTypes.DESTROY_PRODUCT:
      all = state.all.filter(item => item.id !== action.id);
      info = state.info.id === action.id ? {} : state.info;
      return Object.assign({}, state, {all, info});
    case ActionTypes.GET_PRODUCT:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.NEW_PRODUCT:
      newState = Object.assign({}, state);
      newState.all.push(action.info);
      newState.info = action.info ;
      return newState;
    case ActionTypes.LIST_PRODUCTS:
      return Object.assign({}, state, {all: action.all});
    case ActionTypes.SWITCH_PRODUCT:
      info = state.info;
      if (info.id === action.id) {
        info = {...state.info, live: action.live};
      }

      all = state.all.map(item=> {
        if (item.id === action.id) {
          return {... item, live: action.live};
        } else
          return item;
      });

      return Object.assign({}, state, {info, all});
    default:
      return state;
  }
}
