import ActionTypes from "../constants/ActionTypes";

export default function website(state = {
  userCount: 262315,
  blockHeight: 6586,
  blockCount: 352056,
  trades: [],
  blockChain: {},
  blockDoc: {},
  media: [],
  report: [],
  newsDetail: {},
}, action) {
  switch (action.type) {
    case ActionTypes.GET_HOME_DATA:
      return Object.assign({}, state, action.data);
    case ActionTypes.GET_TRADE_DATA_WEBSITE: {
      let trades = action.data.data.map(item => {
        return {
          id: item[0],
          hash: item[1],
          source: item[2],
          account: item[4],
          time: item[3]
        }
      });
      return Object.assign({}, state, {trades});
    }
    case ActionTypes.VIEW_BLOCK_CHAIN:
      return Object.assign({}, state, {blockChain: action.blockChain});
    case ActionTypes.VIEW_BLOCK_CHAIN_DETAIL:
      return Object.assign({}, state, {blockDoc: action.result});
    case ActionTypes.GET_MEDIA_REPORT:
      return Object.assign({}, state, {media: action.result});
    case ActionTypes.GET_INDUSTRY_NEWS:
      return Object.assign({}, state, {report: action.result});
    case ActionTypes.GET_REPORT_DETAIL:
      return Object.assign({}, state, {newsDetail: action.result});
    default:
      return state;
  }
}
