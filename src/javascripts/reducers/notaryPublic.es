import ActionTypes from '../constants/ActionTypes';
import NotaryStatus from '../constants/NotaryStatus';

export default function notaryPublic(state={user:{},all:{}, info:{list:[],notaryId:"",collectCode:""}, collectCode:"", notarized:{}}, action) {
  switch(action.type) {
    case ActionTypes.GET_PUBLIC_NOTARIES:
      return Object.assign({}, state, {all:action.all});
    case ActionTypes.GET_PUBLIC_NOTARY:
      return Object.assign({}, state, {info:action.info, collectCode:action.collectCode});
    case ActionTypes.PUBLIC_NOTARY:
      return Object.assign({}, state, {info:{... state.info, status:NotaryStatus.ACCEPT}});
    default:
      return state;
    case ActionTypes.GET_NOTARY_USER:
      return Object.assign({}, state,{user:action.user});
    case ActionTypes.GET_PUBLIC_NOTARY_LIST:
      return Object.assign({}, state, {all:action.all});

  }
}
