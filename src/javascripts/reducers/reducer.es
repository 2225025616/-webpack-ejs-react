import sms from './sms';
import user from './user';
import product from './product';
import organization from './organization';
import attestation from './attestation';
import api from './api';
import template from './template';
import notary from './notary';
import notification from './notification';
import toastr from './toastr';
import website from './website';
import config from './config';
import admin from './admin';
import notaryPublic from './notaryPublic';
import breadcrumbs from './breadcrumbs';
import evidence from './evidence';
import query from './query';
import signature from './signature';
import order from './order';
import mall from './mall';
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router';

export default combineReducers({
  config,
  website,
  breadcrumbs,
  notaryPublic,
  sms,
  user,
  toastr,
  form,
  product,
  organization,
  attestation,
  api,
  template,
  notary,
  notification,
  router,
  admin,
  evidence,
  query,
  signature,
  order,
  mall,
});
