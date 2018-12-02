import ActionTypes from "../constants/ActionTypes";

export default function home(state = {
  userCount: 262315,
  blockHeight: 6586,
  blockCount: 352056,
}, action) {
  switch (action.type) {
    case ActionTypes.GET_HOME_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
