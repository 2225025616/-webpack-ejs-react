import ActionTypes from '../constants/ActionTypes';

export default function config(state={},action) {
  switch(action.type){
    case ActionTypes.GET_CONFIG:
      let data = {} ;
      for(var item in action.data) {
        data[item] = JSON.parse(action.data[item]);
      }
      return data;
    default:
      return state;
  }
}
