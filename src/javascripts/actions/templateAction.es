import ActionTypes from  '../constants/ActionTypes' ;
import Api from '../utils/Api';
import {toastr} from 'react-redux-toastr';
import T from 'i18n-react';

export function submitTemplate(templateId) {
  return dispatch => {
    new Api(dispatch).post(`/templates/${templateId}/submit`, {}, ()=> {
      dispatch( {type:ActionTypes.SUBMIT_TEMPLATE, id:templateId});
      toastr.success(T.translate("actions.submittemplate"));
    });
  }
}

export function getTemplates(productId) {
  return dispatch => {
    new Api(dispatch).get(`/products/${productId}/templates`, templates => {
      dispatch({type: ActionTypes.GET_TEMPLATES, templates});
    });
  }
}

export function destroyTemplate(templateId) {
  return dispatch => {
    new Api(dispatch).destroy(`/templates/${templateId}`, ()=> {
      toastr.success(T.translate("actions.destroy-template"));
      dispatch({type: ActionTypes.DESTROY_TEMPLATE, id:templateId});
    });
  }
}

export function updateTemplate(templateId, formData) {
  return dispatch => {
    new Api(dispatch).post(`/templates/${templateId}`, formData, ()=>{
      toastr.success(T.translate("actions.update-template"));
    });
  }
}

export function previewTemplate(formData) {
  return dispatch => {
    new Api(dispatch).post(`/templates/preview`, formData, preview => {
      dispatch({type: ActionTypes.PREVIEW_TEMPLATE, preview});
    });
  }
}

export function createTemplate(productId, templateId, onSuccess) {
  return dispatch => {
    new Api(dispatch).post(`/products/${productId}/templates`, {templateId}, (info)=> {
      toastr.success(T.translate("actions.create-template"));
        dispatch({type: ActionTypes.NEW_TEMPLATE, info});
        // onSuccess();
      }
    )
  }
}

export function getTemplate(templateId) {
  return dispatch => {
    new Api(dispatch).get(`/templates/${templateId}`, info => {
      dispatch({type: ActionTypes.GET_TEMPLATE, info });
    });
  }
}

export function updateTitle(templateId, title) {
  return dispatch => {
    new Api(dispatch).post(`/templates/${templateId}/title`, {title}, ()=> {
      dispatch({type: ActionTypes.UPDATE_TEMPLATE_TITLE, info: {title, id: templateId}});
      toastr.success(T.translate("actions.update-title")+`${title}`);
    });
  }
}

export function cloneTemplate(templateId) {
  return dispatch => {
    new Api(dispatch).post(`/templates/${templateId}/clone`);
  }
}
