import ActionTypes from "../constants/ActionTypes";

export default function attestation(state = {
  factom: {},
  info: {},
  all: {},
  selectedItems: [],
  id: {},
  upload: {pageNo: 0, totalPage: 0, list: [], productList: []},
  product: {pageNo: 0, totalPage: 0, list: [], productList: []},
  // user: {pageNo: 0, totalPage: 0, list: [],productList:[]},
  user: {pageNo: 0, totalPage: 0, list: []},
  mobileAttestations: [],
  summary: {upload: {}, products: []},
  allSummary: [], //3.0的
  productSummary: [], 
  orgAttestationCount: {},
}, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_ATTESTATIONS:
      return Object.assign({}, state, {
        user: action.all,
        mobileAttestations: parseInt(action.pageNo) === 0 ? action.all.list : state.mobileAttestations.concat(action.all.list)
      });
    case ActionTypes.GET_All_SUMMARY:
      return Object.assign({}, state, {allSummary: action.allSummary});
    case ActionTypes.GET_All_SUMMARY_PRODUCT:
      return Object.assign({}, state, {productSummary: action.allSummary});
    //以上是3.0的
    case ActionTypes.GET_ATTESTATIONS:
      return Object.assign({}, state, {user: action.all});
    case ActionTypes.GET_UPLOAD_ATTESTATIONS:
      return Object.assign({}, state, {upload: action.all});
    case ActionTypes.GET_PRODUCT_ATTESTATIONS:
      return Object.assign({}, state, {product: action.all});
    case ActionTypes.GET_ATTESTATION:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.GET_BLOCK_CHAIN_HASH:
      return Object.assign({}, state, {factom: action.factom});
    case ActionTypes.SELECT_NOTARIES:
      return Object.assign({}, state, {selectedItems: action.selectedItems});
    case ActionTypes.UPLOADED_FILE:
      let selectedItems = state.selectedItems.slice();
      let founded = selectedItems.find(item => {
        return item.id === action.id
      });
      if (founded) {
        founded.uploadFile = true;
      }
      return Object.assign({}, state, {selectedItems});
    case ActionTypes.GET_ATTESTATION_SUMMARY:
      return Object.assign({}, state, {summary: action.summary});
    case ActionTypes.UPLOAD_FILE:
      let user = state.user.list;
      user.splice(0, 0, action.all.attestation);
      user = user.slice();
/*      if (user.length === 7) {
        user.pop();
      }*/

      let users = {
        list: user,
        pageNo: state.user.pageNo,
        pageSize: state.user.pageSize,
        totalItems: state.user.totalItems + 1,
        totalPage: state.user.totalPage === 0 ? 1 : state.user.totalPage,
      };

      return Object.assign({}, state, {user: users});
    case ActionTypes.UPLOAD_FILE_PRODUCT:
      let p = state.product.list;
      p.splice(0, 0, action.all.attestation);
      p = p.slice();
/*      if (p.length === 7) {
        p.pop();
      }*/

      let product = {
        list: p,
        pageNo: state.product.pageNo,
        pageSize: state.product.pageSize,
        totalItems: state.product.totalItems + 1,
        totalPage: state.product.totalPage === 0 ? 1 : state.product.totalPage,
      };

      return Object.assign({}, state, {product});
    case ActionTypes.ORG_ATTESTATION_COUNT:
      return Object.assign({}, state, {orgAttestationCount: action.count});
    default:
      return state;
  }
}
