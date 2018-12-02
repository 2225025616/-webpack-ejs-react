webpackJsonp([90],{315:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(25),l=r(s),c=n(178),f=n(316),d=r(f),p=function(e){function t(){return a(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props.disableLink,t=void 0;return t=this.props.to?this.props.to.indexOf("?")>=0?this.props.to+"&lang="+d.default.lang:this.props.to+"?lang="+d.default.lang:{javascript:void 0},"no"==e?l.default.createElement("span",null,this.props.children):l.default.createElement(c.Link,{to:t,className:this.props.className,style:this.props.style},this.props.children)}}]),t}(s.Component);t.default=p},1601:function(e,t,n){e.exports=n.p+"loading-5MUPAdl.gif"},1686:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){return function(e){return new j.default(e).get("/signatures/count",function(t){e({type:G.default.GET_SIGN_PROFILE,profile:t})})}}function u(e,t){return function(n){return new j.default(n).post("/signatures/addUserSignature",e,function(e){n({type:G.default.CREATE_SEAL,seal:e}),t(e)})}}function o(e){return function(t){return new j.default(t).destroy("/signatures/deleteUserSignature/"+e,function(e){U.toastr.success(W.default.translate("actions.delete-seal-success")),t({type:G.default.DELETE_SEAL,seal:e})})}}function i(e){return function(t){return new j.default(t).get("/signatures/findUserSignature",function(n){t({type:G.default.GET_OFFICIAL_SEALS,seals:n}),e&&e()})}}function s(e){return function(t){return new j.default(t).post("/signatures/"+e+"/default",{},function(e){t({type:G.default.SEAT_DEFAULT,seals:e})})}}function l(e,t,n){return function(r){new j.default(r).post("/signatures/uploadContract",{file:e,type:t},function(e){r({type:G.default.UPLOAD_SIGN_FILE,fileInfo:e}),n()})}}function c(e,t){return function(n){new j.default(n).post("/signatures/setContract/"+e,t,function(t){n((0,D.default)("/signatures/"+e+"/add-seal"))})}}function f(e){return function(t){return new j.default(t).get("/signatures/findUserLinkman",function(n){t({type:G.default.GET_SIGNATURE_MEMBERS,members:n}),e&&e()})}}function d(e){return function(t){return new j.default(t).get("/signatures/getLinkman/"+e,function(e){t({type:G.default.GET_SIGNATURE_MEMBER,member:e})})}}function p(e,t,n){return function(r){return new j.default(r).post("/signatures/addLinkman",e,function(e){r({type:G.default.CREATE_SIGNATURE_MEMBER,member:e}),"pc"===t&&U.toastr.success(W.default.translate("actions.add-link-success")),n()})}}function m(e,t){return function(n){return new j.default(n).destroy("/signatures/deleteLinkman/"+e,function(e){n({type:G.default.DELETE_SIGNATURE_MEMBER,members:e}),U.toastr.success(W.default.translate("actions.remove-link-success")),t()})}}function g(e,t,n){return function(r){return new j.default(r).post("/signatures/updateLinkman/"+e,t,function(e){r({type:G.default.UPDATE_SIGNATURE_MEMBER,members:e}),U.toastr.success(W.default.translate("actions.update-link-success")),n()})}}function h(e,t){return function(n){return new j.default(n).getWithParams("/signatures",e,function(e){n({type:G.default.GET_SIGNATURES,lists:e}),t&&t()})}}function y(e,t){return function(n){return new j.default(n).getWithParams("/signatures",e,function(r){n({type:G.default.GET_SIGNATURES_MOBILE,lists:r,mobileActive:e.status||"ALL",pageNo:e.pageNo}),t&&t()})}}function E(e){return function(t){return new j.default(t).getWithParams("/signatures/findByKeyword",e,function(e){t({type:G.default.GET_SIGNATURES_BY_KEY_WORD,lists:e})})}}function b(e){return function(t){return new j.default(t).get("/signatures/"+e,function(e){t({type:G.default.GET_BY_SIGNATURE_ID,info:e})})}}function _(e,t,n){return function(r){return new j.default(r).post("/signatures/setContractSignStatus/"+e,t,function(e){r({type:G.default.ADD_SIGNATURE_SEALS,data:e}),n()})}}function S(e,t,n){return function(r){return new j.default(r).post("/signatures/setContractSignStatus/"+e,t,function(){n()})}}function w(e,t){return function(n){return new j.default(n).destroy("/signatures/deleteContract/"+e,function(e){n({type:G.default.DELETE_SIGNATURE,lists:e}),U.toastr.success(W.default.translate("actions.delete-sign")),t()})}}function v(e){return function(t){return new j.default(t).get("/signatures/pdfSignature/"+e,function(e){t({type:G.default.GET_PDF_SEALS,pdfSeals:e})})}}function T(e,t){return function(n){return new j.default(n).getWithParams("/users/authorizations",e,function(e){n({type:G.default.GET_SIGNATURES_AUTHORIZE,lists:e}),t&&t()})}}function N(e,t){return function(n){return new j.default(n).destroy("/users/authorization/"+e,function(){U.toastr.success(W.default.translate("actions.delete-authorize")),t()})}}function O(){return function(e){return new j.default(e).get("/signatures/api-signCount",function(t){e({type:G.default.GET_API_SIGNATURES,count:t})})}}function A(e){return function(t){return new j.default(t).getWithParams("/signatures/api-signCountStatistics",e,function(e){t({type:G.default.GET_API_SIGNATURES_BY_TIME,count:e})})}}function M(e){return function(t){return new j.default(t).getWithParams("/attestations/urlStatistics",e,function(e){t({type:G.default.GET_URL_STATISTICS,urlStatistics:e})})}}function P(e){return function(t){return new j.default(t).getWithParams("/products/saveStatistics",e,function(e){t({type:G.default.GET_SEC_STATISTICS,secStatistics:e})})}}function k(e){return function(t){return new j.default(t).getWithParams("/products/productStatistics",e,function(e){t({type:G.default.GET_ITEM_STATISTICS,itemStatistics:e})})}}function I(){return function(e){return new j.default(e).get("/products/totalStatistics",function(t){e({type:G.default.GET_CHART_COUNT,chartCount:t})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.getSignProfile=a,t.createSeal=u,t.deleteSeal=o,t.findAllSeals=i,t.setDefaultSeal=s,t.uploadSignFile=l,t.postSignatureInfo=c,t.findSignatureMembers=f,t.findSignatureMember=d,t.createSignatureMember=p,t.deleteSignatureMember=m,t.updateSignatureMember=g,t.getSignature=h,t.getSignatureMobile=y,t.getSignatureBykeyWord=E,t.findSignature=b,t.addSignatureSeals=_,t.refuseSignature=S,t.deleteSignature=w,t.getPdfSeals=v,t.getSignatureAuthorize=T,t.deleteSignatureAuthorize=N,t.getApiSignature=O,t.getApiSignatureByTime=A,t.getUrlStatistics=M,t.getSecurity=P,t.getItems=k,t.getChartCount=I;var C=n(448),G=r(C),R=n(449),j=r(R),U=n(298),L=n(295),W=r(L),F=n(454),D=r(F)},1981:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(i),l=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),o(t,[{key:"render",value:function(){return s.default.createElement("div",{className:"mobile-header"},this.props.children)}}]),t}(i.Component);t.default=l},2041:function(e,t,n){e.exports=n.p+"no-content-2RlXver.png"},2056:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,s,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(25),f=r(c),d=n(245),p=n(1686),m=n(1981),g=r(m),h=n(315),y=r(h),E=n(454),b=r(E),_=n(2057),S=r(_),w=n(1686),v=(i=(0,d.connect)(function(e){return{members:e.signature.members}}))(s=function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getFirstName=function(e){return e.substr(0,1)},n.handleKeyWorkChange=function(e){n.keyWord=e.target.value,n.forceUpdate()},n.test=function(){n.props.dispatch((0,b.default)("/mobile/signatures/profile"))},n.toggle=function(e){var t=!n.state.showNav;n.setState({showNav:t})},n.delMember=function(){n.props.dispatch((0,w.deleteSignatureMember)(n.state.member.id,function(){n.closeModal()}))},n.closeModal=function(){n.setState({showModal:!1})},n.keyWord="",n.state={loading:!0,showNav:!1,showOperator:!1,showModal:!1,member:{}},n}return o(t,e),l(t,[{key:"componentWillMount",value:function(){var e=this;this.props.dispatch((0,p.findSignatureMembers)(function(){return e.setState({loading:!1})}))}},{key:"render",value:function(){var e=this,t=this.props.members;return f.default.createElement("div",{className:"signatures-member product-common"},f.default.createElement(g.default,null,f.default.createElement("span",{className:"back",onClick:this.test}),f.default.createElement("span",{className:"title"},"联系人"),f.default.createElement("div",{className:"operator"},f.default.createElement("span",{className:"add-member",onClick:this.toggle},"+"),this.state.showNav?f.default.createElement("div",{className:"wrap"},f.default.createElement(y.default,{to:"/mobile/signatures/members/add"},"添加联系人"),f.default.createElement("span",{onClick:function(t){return e.setState({showOperator:!0,showNav:!1})}},"编辑联系人")):"")),f.default.createElement("article",null,this.state.loading?f.default.createElement("div",{className:"loading-wrap",style:{minHeight:"calc(100vh - 4.2rem - 4rem)"}},f.default.createElement("img",{src:n(1601),alt:""}),f.default.createElement("span",null,"正在加载...")):t.length>0?t.map(function(t,n){return f.default.createElement("section",{key:n},f.default.createElement("span",{className:"first-name"},e.getFirstName(t.linkName)),f.default.createElement("aside",null,f.default.createElement("p",{className:"name"},t.linkName),f.default.createElement("p",{className:"phone"},t.linkPhone)),e.state.showOperator?f.default.createElement("div",{className:"operator-wrap"},f.default.createElement(y.default,{to:"/mobile/signatures/members/"+t.id+"/edit",className:"btn-edit"},"编辑"),f.default.createElement("button",{className:"btn-del",onClick:function(n){return e.setState({member:t,showModal:!0})}},"删除")):"")}):f.default.createElement("div",{className:"no-content-wrap",style:{minHeight:"calc(100vh - 4.2rem - 4rem)"}},f.default.createElement("img",{src:n(2041),alt:""}),f.default.createElement("span",{className:"no-member"},"暂无联系人",f.default.createElement("br",null),"请点击右上角‘+’添加"))),f.default.createElement(S.default,{show:this.state.showModal,confirmFn:this.delMember,closeFn:this.closeModal},f.default.createElement("span",{className:"del-member"},"确定删除联系人 ",this.state.member.linkName,"?")))}}]),t}(c.Component))||s;t.default=v},2057:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(i),l=function(e){function t(){var e,n,u,o;r(this,t);for(var i=arguments.length,s=Array(i),l=0;l<i;l++)s[l]=arguments[l];return n=u=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),u.state={show:!!u.props.show},u.componentWillMount=function(){},u.confirm=function(){var e=u.props.confirmFn;"function"==typeof e?e():console.error("confirmFn is not a function")},u.close=function(){var e=u.props.closeFn;"function"==typeof e?e():console.error("closeFn is not a function")},o=n,a(u,o)}return u(t,e),o(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.show;t!==this.state.show&&this.setState({show:t})}},{key:"render",value:function(){var e=this.props,t=e.confirmText,n=e.closeText,r=e.confirmDisabled;return this.state.show?s.default.createElement("div",{className:"float-wrap"},s.default.createElement("div",{className:"float-win"},this.props.children,s.default.createElement("div",{className:"buttons"},s.default.createElement("button",{className:"confirm",onClick:this.confirm,disabled:r},t||"确认"),s.default.createElement("button",{className:"cancel",onClick:this.close},n||"取消")))):s.default.createElement("div",null)}}]),t}(i.Component);t.default=l}});