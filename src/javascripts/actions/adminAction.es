import ActionTypes from "../constants/ActionTypes";
import Api from "../utils/Api";
import { toastr } from "react-redux-toastr"; // 第三方弹框插件
import T from "i18n-react";

export function findOrganizationKycs(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams("/admin/kycEnterprise", params, all => {
      dispatch({type: ActionTypes.GET_ADMIN_ORGANIZATION_KYCS, all});
    });
  }
}

export function sendOrganizationKyc(id, status, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/kycEnterprise/${id}`, {status}, result=>{
      dispatch({type:ActionTypes.SEND_ADMIN_USER_KYC, result});
      toastr.success("企业实名认证已通过");
      onSuccess();
    })
  }
}

export function rejectOrganizationKyc(id, rejectReason, status, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post( `/admin/kycEnterprise/${id}`, {rejectReason,status}, result=>{
      dispatch({type:ActionTypes.SEND_ADMIN_USER_KYC, result});
      toastr.success("企业实名认证未通过，请等候企业反馈");
      onSuccess();
    })
  }
}

export function addOrgAuth(formData, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post( `/admin/kyc/organization`, formData, result=>{
      onSuccess();
      toastr.success("新增企业认证成功!");
    })
  }
}

export function findAdminUserKycs(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams("/admin/kyc", params, all => {
      dispatch({type: ActionTypes.GET_ADMIN_USERS_KYCS, all});
    });
  }
}

export function sendUserKyc(id, status, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/kyc/${id}`, {status}, result=>{
      dispatch({type:ActionTypes.ADMIN_USER_KYC, result});
      toastr.success("个人实名认证已通过");
      onSuccess();
    });
  }
}

export function rejectUserKyc(id, rejectReason, status, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post( `/admin/kyc/${id}`, {rejectReason,status}, result=>{
      dispatch({type:ActionTypes.ADMIN_USER_KYC, result});
      toastr.success("个人实名认证未通过");
      onSuccess();
    })
  }
}

export function auditUserKyc(id, data) {
  return dispatch => {
    return new Api(dispatch).get("/admin/users/kyc")
  }
}

export function findUserKycs() {
  return dispatch => {
    return new Api(dispatch).get("/admin/users/kyc", all => {
      dispatch({type: ActionTypes.GET_ADMIN_USER_KYCS, all});
    });
  }
}

export function findTemplates(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams("/admin/templates", params, all => {
      dispatch({type: ActionTypes.GET_AUDITING_TEMPLATES, all});
    });
  }
}

export function auditTemplate(templateId,status, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/templates/${templateId}/audit`, {status}, () => {
      dispatch({type:ActionTypes.AUDIT_TEMPLATE, id:templateId, KycStatus:status});
      onSuccess();
    }) ;
  }
}

export function rejectTemplate(templateId,status,rejectReason, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/templates/${templateId}/audit`, {status,rejectReason}, () => {
      dispatch({type:ActionTypes.AUDIT_TEMPLATE, id:templateId, rejectReason:rejectReason, KycStatus:status});
      onSuccess();
    }) ;
  }
}

export function findAllAdminUsers(params) {
  console.log(params);
  return dispatch => {
    return new Api(dispatch).getWithParams("/admin/users", params, users => {
      console.log(users);
      dispatch({type: ActionTypes.GET_ADMIN_USERS, users});
    })
  }
}

export function addAdminUser(formData, onSuccess) {
  console.log(formData);
  return dispatch => {
    return new Api(dispatch).post("/admin/users", formData, user => {
      dispatch({type: ActionTypes.ADD_ADMIN_USER, user});
      onSuccess();
      toastr.success("成功增加管理员");
    });
  }
}

export function removeAdminUser(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/users/${id}`, () => {
      dispatch({type: ActionTypes.REMOVE_ADMIN_USER, userId:id});
      onSuccess();
      toastr.success("成功移除管理员");
    });
  }
}

export function findAllNotaryUsers() {
  return dispatch => {
    return new Api(dispatch).get("/admin/notary-users", users => {
      dispatch({type: ActionTypes.GET_NOTARY_USERS, users});
    })
  }
}

export function addNotaryUser(phoneNumber, organizationName, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post("/admin/notary-users", {phoneNumber, organizationName}, user => {
      dispatch({type: ActionTypes.ADD_NOTARY_USER, user});
      onSuccess();
      toastr.success("成功添加公证员");
    });
  }
}

export function removeNotaryUser(id, onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/notary-users/${id}`, () => {
      dispatch({type: ActionTypes.REMOVE_NOTARY_USER, notaryUserId:id});
      onSuccess();
      toastr.success("成功移除公证员");
    });
  }
}

export function findRequest(organizationId, requestId) {
  return dispatch => {
    return new Api(dispatch).get(`admin/api/requests/${organizationId}/${requestId}`, request => {
      dispatch({type: ActionTypes.GET_API_REQUEST, request});
    });
  }
}

export function findTemplate(templateId) {
  return dispatch => {
    return new Api(dispatch).get(`/admin/templates/${templateId}/info `, template => {
      dispatch({type: ActionTypes.GET_TEMPLATE_TO_CHANGE_STATE, template});
    });
  }
}

export function changeTemplateState(templateId) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/templates/${templateId}/reset`, template => {
      toastr.success("成功重置模板状态");
      dispatch({type: ActionTypes.CHANGE_TEMPLATE_STATE, template});
    });
  }
}

export function sendUserConsult(phone, name, verifyCode, email, company) {
  return dispatch => {
    return new Api(dispatch).post(`/consults`, {phone, name, verifyCode, email, company}, consult => {
      dispatch({type: ActionTypes.SEND_USER_CONSULT, consult});
      toastr.success("信息提交成功，保全网客服会在12小时内与您联系，请耐心等待");
    });
  }
}

export function getGraphicCode() {
  return dispatch => {
    return new Api(dispatch).get(`/auth/image`, imageCode => {
      dispatch({type: ActionTypes.GET_GRANPHIC_CODE, imageCode});
    });
  }
}

export function findUserConsults(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/consults`, params, consults => {
      dispatch({type: ActionTypes.GET_USER_CONSULTS, consults});
    });
  }
}

export function deleteUserConsult(id) {
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/user-cousult/${id}`, consult => {
      toastr.success("成功移除此咨询");
      dispatch({type: ActionTypes.REMOVE_USER_COUSULT, id});
      onSuccess();
    });
  }
}

export function getNews(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/news`, params, news => {
      dispatch({type:ActionTypes.GET_ADMIN_NEWS, news});
    });
  }
}

export function deleteNew(id,onSuccess){
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/news/${id}`, itemId => {
      toastr.success("成功删除新闻");
      dispatch({type:ActionTypes.DELETE_ADMIN_NEWS, itemId});
      onSuccess();
    });
  }
}

export function addNews(date,onSuccess){
  return dispatch => {
    return new Api(dispatch).post(`/admin/news`, date, () => {
      toastr.success("成功添加新闻");
      onSuccess();
    });
  }
}

export function publishNews(item){
  return dispatch => {
    return new Api(dispatch).post(`/admin/news/${item.id}`, {}, result => {
      dispatch({type:ActionTypes.PUBLISH_NEWS, result});
      toastr.success(result.status=="Publish" ? "发布成功" : "取消发布成功");
    });
  }
}

export function getNewsDetail(id){
  return dispatch => {
    return new Api(dispatch).get(`/admin/news/${id}`, result => {
      dispatch({type:ActionTypes.GET_NEWS_DETAIL, result});
    });
  }
}

export function getBlockChain(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/chainDoc`, params, blockChain => {
      dispatch({type:ActionTypes.GET_BLOCK_CHAIN, blockChain});
    });
  }
}

export function uploadDocument(title,file,onSuccess){
  return dispatch => {
    return new Api(dispatch).post(`/admin/chainDoc`,{title: title, file: file},result => {
      toastr.success("成功添加文档");
      dispatch({type:ActionTypes.POST_BLOCK_CHAIN, result});
      onSuccess();
    });
  }
}

export function deleteBlockDocument(id,onSuccess){
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/chainDoc/${id}`, itemId => {
      toastr.success("成功删除文档");
      dispatch({type:ActionTypes.DELETE_BLOCK_CHAIN, itemId});
      onSuccess();
    });
  }
}

export function getAttestations(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/attestation-list`, params, attestations => {
      dispatch({type:ActionTypes.GET_ADMIN_ATTESTATIONS, attestations});
    });
  }
}

export function getSignatures(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/eContract-list`, params, signatures => {
      dispatch({type:ActionTypes.GET_ADMIN_SIGNATURES, signatures});
    });
  }
}

export function getDataCenter(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/admin-count`, params, data => {
      dispatch({type:ActionTypes.GET_DATA_CENTER, data});
    });
  }
}

export function getDataAttestations(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/attestation-count`, params, data => {
      dispatch({type:ActionTypes.GET_DATA_ATTESTATIONS, data});
    });
  }
}

export function getDataSignatures(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/eContract-count`, params, data => {
      dispatch({type:ActionTypes.GET_DATA_SIGNATURES, data});
    });
  }
}
export function gochains(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/gochains`, params, all => {
      dispatch({type: ActionTypes.GO_CHAINS, all, pageNo: params.pageNo});
      if (onSuccess) onSuccess();
    })
  }
}

export function reSubmitChains(params, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/reSubmitChains`, params, info => {
      toastr.success('操作成功');
      //dispatch({type: ActionTypes.GO_CHAINS, all, pageNo: params.pageNo});
      if (onSuccess) onSuccess();
    })
  }
}

export function findAllOrgSignAuth(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/orgAuthorization`, params, info => {
      dispatch({type: ActionTypes.GET_ORG_SIGN_AUTH, info});
    });
  }
}

export function addOrgSignAuth(date, onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/orgAuthorization`, date, info => {
      toastr.success("新增授权成功!");
      dispatch({type: ActionTypes.ADD_ORG_SIGN_AUTH, info});
      onSuccess();
    });
  }
}

export function editOrgSignAuth(date,onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/orgAuthorization`, date, info => {
      dispatch({type: ActionTypes.EDIT_ORG_SIGN_AUTH, info});
      onSuccess();
    });
  }
}

export function editOrgSignStatus(id,status,onSuccess) {
  return dispatch => {
    return new Api(dispatch).post(`/admin/orgAuthorization/${id}`, {status}, info => {
      dispatch({type: ActionTypes.EDIT_ORG_SIGN_AUTH, info});
      if (onSuccess) onSuccess();
    });
  }
}

export function findAllPackages(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/itemPrice`, params, info => {
      dispatch({type: ActionTypes.GET_ALL_PACKAGES, info});
    });
  }
}

export function addPackage(date,onSuccess){
  return dispatch => {
    return new Api(dispatch).post(`/admin/itemPrice`, date, () => {
      toastr.success("成功新增套餐!");
      onSuccess();
    });
  }
}

export function getPackageDetail(id){
  return dispatch => {
    return new Api(dispatch).get(`/admin/itemPrice/${id}`, info => {
      dispatch({type: ActionTypes.GET_PACKAGE_ITEM, info});
    });
  }
}

export function deletePackages(id,onSuccess) {
  return dispatch => {
    return new Api(dispatch).destroy(`/admin/itemPrice/${id}`, info => {
      dispatch({type: ActionTypes.DELETE_PACKAGES, info});
      onSuccess();
    });
  }
}

export function findOrgChainData(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/chain-count`, params, info => {
      dispatch({type: ActionTypes.GET_ORG_CHAIN_DATA, info});
    });
  }
}

export function getPending(){
  return dispatch => {
    return new Api(dispatch).get(`/admin/getApply`, data => {
      dispatch({type:ActionTypes.GET_ADMIN_DPENDING, data});
    });
  }
}

export function getUserCount(){
  return dispatch => {
    return new Api(dispatch).get(`/admin/totalUser`, data => {
      dispatch({type:ActionTypes.GET_USER_COUNT, data});
    });
  }
}

export function getRechargeCount(){
  return dispatch => {
    return new Api(dispatch).get(`/admin/recharge-count`, data => {
      dispatch({type:ActionTypes.GET_RECHARGE_COUNT, data});
    });
  }
}

export function getUpperChainCount(){
  return dispatch => {
    return new Api(dispatch).get(`/admin/upper-chain-count`, data => {
      dispatch({type:ActionTypes.GET_UPPER_CHAIN_COUNT, data});
    });
  }
}

export function getAuthCount(){
  return dispatch => {
    return new Api(dispatch).get(`/admin/realNameUser`, data => {
      dispatch({type:ActionTypes.GET_AUTH_COUNT, data});
    });
  }
}

export function getBusinessData(params){
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/bussiness-data`, params, data => {
      dispatch({type:ActionTypes.GET_BUSINESS_DATA, data});
    });
  }
}

export function getAttestationData(params) {
  return dispatch => {
    return new Api(dispatch).getWithParams(`/admin/attestationStatistics`, params, data => {
      dispatch({type: ActionTypes.GET_ATTESTATION_DATA, data});
    });
  }
}