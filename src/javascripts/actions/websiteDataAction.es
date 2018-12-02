import ActionTypes from '../constants/ActionTypes';
import Api from '../utils/Api';

export function getHomeData() {
  return dispatch => {
    return new Api(dispatch).get('/attestations/info', data => {
      dispatch({type: ActionTypes.GET_HOME_DATA, data});
    })
  }
}

export function getTradeData() {
  return dispatch => {
    return new Api(dispatch).get('/json/attestationPublicity', data => {
      dispatch({type: ActionTypes.GET_TRADE_DATA_WEBSITE, data});
    })
  }
}

export function getBlockChain() {
  return dispatch => {
    return new Api(dispatch).get(`/chainDocs`, blockChain => {
      dispatch({type: ActionTypes.VIEW_BLOCK_CHAIN, blockChain});
    });
  }
}

export function getBlockChainDetail(id) {
  return dispatch => {
    return new Api(dispatch).get(`/chainDocs/${id}`, result => {
      dispatch({type: ActionTypes.VIEW_BLOCK_CHAIN_DETAIL, result});
    });
  }
}

export function getMediaReport(onSuccess) {
  return dispatch => {
    return new Api(dispatch).get(`/news/media`, result => {
      dispatch({type: ActionTypes.GET_MEDIA_REPORT, result});
      if (onSuccess) onSuccess();
    });
  }
}

export function getIndustryNews(onSuccess) {
  return dispatch => {
    return new Api(dispatch).get(`/news/report`, result => {
      dispatch({type: ActionTypes.GET_INDUSTRY_NEWS, result});
      if (onSuccess) onSuccess();
    });
  }
}

export function getMediaReportDetail(id) {
  return dispatch => {
    return new Api(dispatch).get(`/news/media/${id}`, result => {
      dispatch({type: ActionTypes.GET_REPORT_DETAIL, result});
    });
  }
}

export function getIndustryNewsDetail(id) {
  return dispatch => {
    return new Api(dispatch).get(`/news/report/${id}`, result => {
      dispatch({type: ActionTypes.GET_REPORT_DETAIL, result});
    });
  }
}
