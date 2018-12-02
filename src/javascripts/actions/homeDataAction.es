import ActionTypes from  '../constants/ActionTypes' ;
import Api from '../utils/Api';
import TokenUtil from '../utils/TokenUtil' ;
import { toastr } from 'react-redux-toastr';
import T from 'i18n-react';

export function getHomeData() {
  return dispatch => {
    return new Api(dispatch).get('/attestations/info', data => {
      dispatch({type: ActionTypes.GET_HOME_DATA, data});
    })
  }
}