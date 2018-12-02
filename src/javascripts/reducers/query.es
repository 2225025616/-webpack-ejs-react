import ActionTypes from '../constants/ActionTypes';

export default function query(state = {
  isExist: {},
  result: {},
}, action) {

  switch (action.type) {
    case ActionTypes.QUERY:
      return Object.assign({}, state, {isExist: action.isExist});
    default:
      return state;
  }
}
