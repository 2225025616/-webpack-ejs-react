import ActionTypes from  '../constants/ActionTypes' ;
import Api from '../utils/Api';

export function getAllConfig() {
  return dispatch => {
    new Api(dispatch).getWithParams("/configs", {configNames:
      ["organization_type",
       "organization_business_duration",
       "organization_company_scale",
       "organization_production_type_id"]}, data => {
      dispatch({type: ActionTypes.GET_CONFIG, data});
    });
  }

}

