import ActionTypes from '../constants/ActionTypes';

export default function breadcrumbs(state = [], action) {
  switch (action.type) {
    case ActionTypes.SET_BREADCRUMBS:
      return action.values;
    default:
      return state;
  }
}
