import ActionTypes from  '../constants/ActionTypes' ;
import Api from '../utils/Api';
import {toastr} from "react-redux-toastr";
import T from 'i18n-react';
import {replace} from "redux-router";

export function findAllNotaries(formData) {
  return dispatch => {
    return new Api(dispatch).getWithParams("/notary-public/notaries", formData, all=>{
      dispatch({type:ActionTypes.GET_PUBLIC_NOTARIES, all});
    }) ;
  }
}

export function findNotary(collectCode) {
  return dispatch => {
    return new Api(dispatch).get(`/notary-public/${collectCode}/query`, info=>{
      dispatch({type:ActionTypes.GET_PUBLIC_NOTARY, info, collectCode});
    })
  }
}

export function publicNotary(collectCode) {
  return dispatch => {
    return new Api(dispatch).post(`/notary-public/${collectCode}/accept`, {}, ()=>{
      toastr.success(T.translate("actions.public-notary")+"!");
      dispatch(replace('/notary/notarized'));
    })
  }
}

export function findPublicOffice() {
  return dispatch => {
    return new Api(dispatch).get("/notary-public/user", user=>{
      dispatch({type:ActionTypes.GET_NOTARY_USER, user}) ;
    }) ;
  }
}

export function findNotaryList(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams("/notaries", params, all=>{
      dispatch({type:ActionTypes.GET_PUBLIC_NOTARY_LIST, all}) ;
    }) ;
  }
}
