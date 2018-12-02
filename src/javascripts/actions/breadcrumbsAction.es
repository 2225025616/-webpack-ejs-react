import ActionTypes from  '../constants/ActionTypes' ;
import T from 'i18n-react';

function breadcrumbs(...values) {
  return {type: ActionTypes.SET_BREADCRUMBS, values:values};
}

export function toggleAttestations() {
  return breadcrumbs({name:(T.translate("actions.instrument-panel")), href:"/dashboard"}, {name:(T.translate("actions.preservation"))});
}

