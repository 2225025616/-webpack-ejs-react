import ActionTypes from "../constants/ActionTypes";

export default function mall(state = {
  packages: [],
  packageInfo: {}
}, action) {
  switch (action.type) {
    case ActionTypes.GET_PACKAGE:
      return Object.assign({}, state, {packageInfo: action.packageInfo || {}});
    case ActionTypes.GET_PACKAGES:
      return Object.assign({}, state, {packages: action.packages || []});
    default:
      return state;
  }
}
