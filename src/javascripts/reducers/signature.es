import ActionTypes from "../constants/ActionTypes";

export default function signature(state = {
  profile: {},
  all: {},
  fileInfo: {},
  lists: {pageNo: 0, totalPage: 0, createdAt: '', finishedAt: '', list: []},
  info: {signList: []},
  member: {},
  members: {},
  seals: {userSignature: [], default: {}},
  seal: {},
  pdfSeals: {},
/*  productStatistics: {productStatistics:[]},
  productStatisticsSize: 0,*/
  itemStatistics: {productStatistics:[]},
  itemStatisticsCount: 0,
/*  saveStatistics: {},*/
  secStatistics: {saveStatistics:[]},
  secStatisticsType: '',
  urlStatistics: {},
  authorize: {},
  mobileList: {
    ALL: [],
    WAIT_ME: [],
    WAIT_OTHERS: [],
    DONE: [],
    OTHER: [],
  },
  apiSignature: {},
  apiSignatureData: [],
  apiSignatureDataByTime: [],
  apiSignatureDataByTimeType: '',
  chartCount: {},
}, action) {
  switch (action.type) {
    case ActionTypes.GET_SIGN_PROFILE:
      return Object.assign({}, state, {profile: action.profile});
    case ActionTypes.GET_SIGNATURES:
      return Object.assign({}, state, {lists: action.lists});
    case ActionTypes.GET_SIGNATURES_MOBILE:
      let mobileList = state.mobileList, active = action.mobileActive, pageNo = action.pageNo;
      if (active !== 'ALL') {
        mobileList[active] = pageNo === 0 ? action.lists.list : mobileList[active].concat(action.lists.list);
      } else {
        mobileList.ALL = pageNo === 0 ? action.lists.list : mobileList.ALL.concat(action.lists.list);
        mobileList.OTHER = mobileList.ALL.filter(item => item.status !== 'WAIT_ME' && item.status !== 'WAIT_OTHERS' && item.status !== 'DONE')
      }
      return Object.assign({}, state, {lists: action.lists, mobileList});
    case ActionTypes.GET_SIGNATURES_BY_KEY_WORD:
      return Object.assign({}, state, {lists: action.lists});
    case ActionTypes.GET_BY_SIGNATURE_ID:
      return Object.assign({}, state, {info: action.info});
    case ActionTypes.UPLOAD_SIGN_FILE:
      return Object.assign({}, state, {fileInfo: action.fileInfo});
    case ActionTypes.GET_SIGNATURE_MEMBER:
      return Object.assign({}, state, {member: action.member});
    case ActionTypes.GET_SIGNATURE_MEMBERS:
      return Object.assign({}, state, {members: action.members});
    case ActionTypes.CREATE_SIGNATURE_MEMBER:
      let members;
      members = state.members;
      members.splice(0, 0, action.member);
      members = members.slice();
      return Object.assign({}, state, {members});
    case ActionTypes.DELETE_SIGNATURE_MEMBER:
      let member;
      member = state.members.filter(item => {
        return item.id !== action.members.id
      });
      return Object.assign({}, state, {members: member});
    case ActionTypes.UPDATE_SIGNATURE_MEMBER:
      for (let i = 0; i < state.members.length; i++) {
        let update = state.members[i];
        if (update.id === action.members.id) {
          state.members[i] = Object.assign({}, update, {
            linkName: action.members.linkName,
            linkPhone: action.members.linkPhone
          });
        }
      }
      return state;
    case ActionTypes.GET_OFFICIAL_SEALS:
      return Object.assign({}, state, {seals: action.seals});
    case ActionTypes.CREATE_SEAL:
      let seal = state.seals;
      if (action.seal.default) {
        seal.default = action.seal.default;
      } else {
        seal.userSignature.splice(0, 0, action.seal.UserSignature);
      }
      return Object.assign({}, state, {seal});
    case ActionTypes.SEAT_DEFAULT:
      return Object.assign({}, state, {seals: action.seals});
    case ActionTypes.DELETE_SEAL:
      let seals = state.seals.userSignature;
      seals = seals.filter(item => {
        return item.id !== action.seal.id
      });
      seals = {
        default: state.seals.default,
        userSignature: seals,
      };
      return Object.assign({}, state, {seals});
    case ActionTypes.DELETE_SIGNATURE:
      let signs;
      signs = state.lists.list.filter(item => {
        return item.id !== action.lists.id
      });
      signs = {
        list: signs,
        pageNo: state.lists.pageNo,
        pageSize: state.lists.pageSize,
        totalItems: state.lists.totalItems - 1,
        totalPage: state.lists.totalPage,
      };
      return Object.assign({}, state, {lists: signs});
    case ActionTypes.ADD_SIGNATURE_SEALS:
      let data = action.data;
    //do something?
    case ActionTypes.GET_PDF_SEALS:
      return Object.assign({}, state, {pdfSeals: action.pdfSeals});
    case ActionTypes.GET_SIGNATURES_AUTHORIZE:
      return Object.assign({}, state, {authorize: action.lists});
    case ActionTypes.GET_API_SIGNATURES:
      let signArr = [];
      if(action.count.lineData.length>0){
        signArr = action.count.lineData.map(item => {
          return Object.assign({}, item, {签署份数: item.totalSign, 签署人数: item.totalSigner});
        });
      }
      return Object.assign({}, state, {apiSignature: action.count, apiSignatureData: signArr});
    case ActionTypes.GET_API_SIGNATURES_BY_TIME:
      let signArrByTime = [];
      if(action.count.signData.length>0){
        signArrByTime = action.count.signData.map(item => {
          return Object.assign({}, item, {签署份数: parseInt(item.totalSign), 签署人数: parseInt(item.totalSigner)});
        });
      }
      return Object.assign({}, state, {apiSignatureDataByTime: signArrByTime, apiSignatureDataByTimeType:action.count.type});
    // 企业统计 图表数据
    case ActionTypes.GET_URL_STATISTICS:
      let urlArr = [];
      if(action.urlStatistics.urlStatistics && action.urlStatistics.urlStatistics.length>0){
        urlArr = action.urlStatistics.urlStatistics.map(item => {
          if (item.count === '0')
            return Object.assign({}, item, {count: parseInt(item.count)});
          return item;
        });
      }
      return Object.assign({}, state, {urlStatistics: urlArr});
/*    case ActionTypes.GET_SAVE_STATISTICS:
      let attArr = [];
      if(action.saveStatistics.saveStatistics && action.saveStatistics.saveStatistics.length>0){
        attArr = action.saveStatistics.saveStatistics.map(item => {
          if (item.attachment === '0')
            return Object.assign({}, item, {attachment: parseInt(item.attachment)});
          return item;
        });
      }
      return Object.assign({}, state, {saveStatistics: attArr});*/
    /*case ActionTypes.GET_PRODUCTS_STATISTICS:
      let size = 0;
      if(action.productStatistics.productStatistics && action.productStatistics.productStatistics.length>0){
        action.productStatistics.productStatistics.map(item => {
          size += item.attachment;
        });
      }
      return Object.assign({}, state, {productStatistics: action.productStatistics.productStatistics, productStatisticsSize:size});*/
    case ActionTypes.GET_ITEM_STATISTICS:
      let count = 0;
      if(action.itemStatistics.productStatistics && action.itemStatistics.productStatistics.length>0){
        action.itemStatistics.productStatistics.map(item => {
          count += item.success;
        });
      }
      return Object.assign({}, state, {itemStatistics: action.itemStatistics.productStatistics, itemStatisticsCount:count});
    case ActionTypes.GET_SEC_STATISTICS:
      let chainArr = [];
      if(action.secStatistics.saveStatistics && action.secStatistics.saveStatistics.length>0){
        chainArr = action.secStatistics.saveStatistics.map(item => {
          if (item.success === '0')
            return Object.assign({}, item, {success: parseInt(item.success),attachment: parseInt(item.attachment)});
          return item;
        });
      }
      return Object.assign({}, state, {secStatistics: chainArr, secStatisticsType:action.secStatistics.type});
    case ActionTypes.GET_CHART_COUNT:
      return Object.assign({}, state, {chartCount: action.chartCount});
    default:
      return state;
  }
}
