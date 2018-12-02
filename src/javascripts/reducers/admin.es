import ActionTypes from "../constants/ActionTypes";

export default function admin(state = {
  notaryUsers: [],
  users: [],
  template: {},
  templates: {},
  userKycs: {list: []},
  organizationKycs: {list: []},
  request: {},
  consult: {},
  consults: {},
  imageCode: {},
  news: {list: []},
  newsInfo: {},
  blockChain: {},
  attestations: {},
  signatures: {},
  dateCenter: {},
  dateAttestations: {},
  dateSignatures: {},
  chains:[],
  orgSignAuth: {list: []},
  packages:[],
  packageItem: {},
  orgChainData:[],
  pending: {},
  userCount: {},
  rechargeCount: {},
  upperChainCount: {},
  authCount: {},
  businessData: {},
  attestationData: {},
}, action) {
  let users;
  let organizationKycs;
  let userKycs;

  switch (action.type) {
    case ActionTypes.GET_AUDITING_TEMPLATES:
      return Object.assign({}, state, {templates: action.all});
    case ActionTypes.AUDIT_TEMPLATE:
      let templates = {...state.templates};
      templates.list = templates.list.map(item => {
        if (item.id === action.id)
          return Object.assign({}, item, {state: action.KycStatus});
        return item;
      });
      return Object.assign({}, state, {templates});
    case ActionTypes.GET_NOTARY_USERS:
      return Object.assign({}, state, {notaryUsers: action.users});
    case ActionTypes.ADD_NOTARY_USER:
      users = state.notaryUsers.slice();
      users.unshift(action.user);
      return Object.assign({}, state, {notaryUsers: users});
    case ActionTypes.REMOVE_NOTARY_USER:
      users = state.notaryUsers.filter(item => {
        return item.id !== action.notaryUserId;
      });
      return Object.assign({}, state, {notaryUsers: users});
    case ActionTypes.GET_ADMIN_USERS_KYCS:
      return Object.assign({}, state, {userKycs: action.all});
    case ActionTypes.ADMIN_USER_KYC:
      let updateKycs = state.userKycs.list;
      for (let i = 0; i < updateKycs.length; i++) {
        if (updateKycs[i].id === action.result.id) {
          updateKycs[i] = action.result;
        }
      }
      updateKycs = {
        list: updateKycs,
        pageNo: state.userKycs.pageNo,
        pageSize: state.userKycs.pageSize,
        totalPage: state.userKycs.totalPage,
      };
      return Object.assign({}, state, {userKycs: updateKycs});
    case ActionTypes.SEND_ADMIN_USER_KYC:
      let updateOrgKycs = state.organizationKycs.list;
      for (let i = 0; i < updateOrgKycs.length; i++) {
        if (updateOrgKycs[i].id === action.result.id) {
          updateOrgKycs[i] = action.result;
        }
      }
      updateOrgKycs = {
        list: updateOrgKycs,
        pageNo: state.organizationKycs.pageNo,
        pageSize: state.organizationKycs.pageSize,
        totalPage: state.organizationKycs.totalPage,
      };
      return Object.assign({}, state, {organizationKycs: updateOrgKycs});
    case ActionTypes.GET_ADMIN_ORGANIZATION_KYCS:
      return Object.assign({}, state, {organizationKycs: action.all});
    case ActionTypes.REJECT_ADMIN_ORGANIZATION_KYC:
    case ActionTypes.SEND_ADMIN_ORGANIZATION_KYC:
      organizationKycs = {...state.organizationKycs};
      organizationKycs.list = organizationKycs.list.filter(item => {
        return item.organizationId !== action.id
      });
      return Object.assign({}, state, {organizationKycs});
    case ActionTypes.GET_ADMIN_USERS:
      return Object.assign({}, state, {users: action.users});
    case ActionTypes.ADD_ADMIN_USER:
      users = state.users.slice();
      users.unshift(action.user);
      return Object.assign({}, state, {users});
    case ActionTypes.REMOVE_ADMIN_USER:
      users = state.users.filter(item => {
        return item.id !== action.userId;
      });
      return Object.assign({}, state, {users});
    case ActionTypes.GET_API_REQUEST:
      return Object.assign({}, state, {request: action.request});
    case ActionTypes.GET_TEMPLATE_TO_CHANGE_STATE:
      return Object.assign({}, state, {template: action.template});
    case ActionTypes.CHANGE_TEMPLATE_STATE:
      return Object.assign({}, state, {template: action.template});
    case ActionTypes.SEND_USER_CONSULT:
      return Object.assign({}, state, {consult: action.consult});
    case ActionTypes.GET_USER_CONSULTS:
      return Object.assign({}, state, {consults: action.consults});
    case ActionTypes.REMOVE_USER_COUSULT:
      consults = state.consults.filter(item => {
        return item.id !== action.id
      });
      return Object.assign({}, state, {consults});
    case ActionTypes.GET_GRANPHIC_CODE:
      return Object.assign({}, state, {imageCode: action.imageCode});
    case ActionTypes.GET_ADMIN_NEWS:
      return Object.assign({}, state, {news: action.news});
    case ActionTypes.GET_NEWS_DETAIL:
      return Object.assign({}, state, {newsInfo: action.result});
    case ActionTypes.DELETE_ADMIN_NEWS:
      let news = state.news;
      news.list = news.list.filter(item => {
        return item.id !== action.itemId.id
      });
      return Object.assign({}, state, {news: news});
    case ActionTypes.PUBLISH_NEWS:
      let updateNews = state.news.list;
      for (let i = 0; i < updateNews.length; i++) {
        if (updateNews[i].id === action.result.id) {
          updateNews[i] = action.result;
        }
      }
      updateNews = {
        list: updateNews,
        pageNo: state.news.pageNo,
        pageSize: state.news.pageSize,
        totalPage: state.news.totalPage,
      };
      return Object.assign({}, state, {news: updateNews});
    case ActionTypes.GET_BLOCK_CHAIN:
      return Object.assign({}, state, {blockChain: action.blockChain});
    case ActionTypes.POST_BLOCK_CHAIN:
      let list = state.blockChain;
      list.list = list.list.slice();
      list.list.unshift(action.result);
      return Object.assign({}, state, {blockChain: list});
    case ActionTypes.DELETE_BLOCK_CHAIN:
      let block = state.blockChain;
      block.list = block.list.filter(item => {
        return item.id !== action.itemId.id
      });
      return Object.assign({}, state, {blockChain: block});
    case ActionTypes.GET_ADMIN_ATTESTATIONS:
      return Object.assign({}, state,{attestations: action.attestations});
    case ActionTypes.GET_ADMIN_SIGNATURES:
      return Object.assign({}, state,{signatures: action.signatures});
    case ActionTypes.GET_DATA_CENTER:
      return Object.assign({}, state,{dateCenter: action.data});
    case ActionTypes.GET_DATA_ATTESTATIONS:
      return Object.assign({}, state,{dateAttestations: action.data});
    case ActionTypes.GET_DATA_SIGNATURES:
      return Object.assign({}, state,{dateSignatures: action.data});
    case ActionTypes.GO_CHAINS:
      let chains = {
        list: action.all.list,
        pageNo: action.all.pageNo,
        pageSize: action.all.pageSize,
        totalItems: action.all.totalItems + 1,
        totalPage: action.all.totalPage == 0 ? 1 : action.all.totalPage,
      };
      return Object.assign({}, state, {chains: chains});
    case ActionTypes.GET_ORG_SIGN_AUTH:
      return Object.assign({}, state,{orgSignAuth: action.info});
    case ActionTypes.ADD_ORG_SIGN_AUTH:
      let auth = state.orgSignAuth;
      auth.list = auth.list.slice();
      auth.list.unshift(action.info);
      return Object.assign({}, state, {orgSignAuth: auth});
    case ActionTypes.EDIT_ORG_SIGN_AUTH:
      let editAuth = state.orgSignAuth;
      for (let i = 0; i < editAuth.list.length; i++) {
        if (editAuth.list[i].id === action.info.id) {
          editAuth.list[i] = action.info;
        }
      }
      return Object.assign({}, state, {orgSignAuth: editAuth});
    case ActionTypes.GET_ALL_PACKAGES:
      return Object.assign({}, state,{packages: action.info});
    case ActionTypes.DELETE_PACKAGES:
      let newPackages = state.packages;
      newPackages.list = newPackages.list.filter(item => {
        return item.id !== action.info.id
      });
      return Object.assign({}, state, {packages: newPackages});
    case ActionTypes.GET_PACKAGE_ITEM:
      return Object.assign({}, state,{packageItem: action.info});
    case ActionTypes.GET_ORG_CHAIN_DATA:
      return Object.assign({}, state,{orgChainData: action.info});
    case ActionTypes.GET_ADMIN_DPENDING:
      return Object.assign({}, state,{pending: action.data});
    case ActionTypes.GET_USER_COUNT:
      return Object.assign({}, state,{userCount: action.data});    
    case ActionTypes.GET_RECHARGE_COUNT:
      return Object.assign({}, state,{rechargeCount: action.data});
    case ActionTypes.GET_UPPER_CHAIN_COUNT:
      return Object.assign({}, state,{upperChainCount: action.data});
    case ActionTypes.GET_AUTH_COUNT:
      return Object.assign({}, state,{authCount: action.data});
    case ActionTypes.GET_BUSINESS_DATA:
      return Object.assign({}, state,{businessData: action.data});
    case ActionTypes.GET_ATTESTATION_DATA:
      return Object.assign({}, state,{attestationData: action.data});
    default:
      return state;
  }
}
