import ActionTypes from "../constants/ActionTypes";

export default function api(state = {requested: 0, loading: false}, action) {
  switch (action.type) {
    case ActionTypes.ON_REQUEST:
      return Object.assign({}, state, {requested: state.requested + 1, loading: true});
    case ActionTypes.ON_SUCCESS:
    case ActionTypes.ON_FAILURE:
      return Object.assign({}, state, {requested: state.requested - 1, loading: false});
    default:
      return state;
  }
}
