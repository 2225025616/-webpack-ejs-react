webpackJsonp([93],{457:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(25),c=r(s),l=n(458),f=r(l),d=0,p=1,g={},A=function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.openViewPicture=function(){n.viewPicture=!0,n.forceUpdate()},n.closeImage=function(){n.viewPicture=!1,p=1,d=0,g={},n.forceUpdate()},n.youxuanzhuan=function(){d+=90,g={transform:"scale("+p+") rotate("+d+"deg)"},n.forceUpdate()},n.zuoxuanzhuan=function(){d-=90,g={transform:"scale("+p+") rotate("+d+"deg)"},n.forceUpdate()},n.suoxiao=function(){p/=1.1,g={transform:"scale("+p+") rotate("+d+"deg)"},n.forceUpdate()},n.fangda=function(){p*=1.1,g={transform:"scale("+p+") rotate("+d+"deg)"},n.forceUpdate()},n.handleError=function(e){var t={draggable:!1};n.props.src!==n.props.altSrc&&(t.src=n.props.altSrc),n.setState(t)},n.state={src:e.src?e.src:e.altSrc,draggable:!!e.src},n.reader=new FileReader,n.viewPicture=!1;var r=n;return n.reader.onload=function(e){r.setState({src:e.target.result,draggable:!0})},n}return i(t,e),o(t,[{key:"same",value:function(e,t){var n=e.src,r=t.src;return n===r||!!(n&&r&&n instanceof File&&r instanceof File&&n.name===r.name&&n.size===r.size)}},{key:"componentWillReceiveProps",value:function(e){if(!this.same(e,this.props)){var t=e.src;if(!t)return;t instanceof File?t.type.match(/image.*/)&&this.reader.readAsDataURL(t):this.setState({src:t,draggable:!0})}}},{key:"render",value:function(){return c.default.createElement("div",null,c.default.createElement("img",{className:this.props.className,style:this.props.style,src:this.state.src,onError:this.handleError,draggable:this.state.draggable,onDragStart:this.props.onDragStart,onLoad:this.props.onLoad,onClick:this.openViewPicture}),c.default.createElement(f.default,{show:this.viewPicture,src:this.state.src,closeImage:this.closeImage,zxz:this.zuoxuanzhuan,yxz:this.youxuanzhuan,sx:this.suoxiao,fd:this.fangda,style:g}))}}]),t}(s.Component);t.default=A},458:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(o),c=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={show:n.props.show},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({show:e.show})}},{key:"render",value:function(){var e=this,t=this.props.src;return s.default.createElement("div",{className:"view-image"},this.state.show?s.default.createElement("div",{className:"model-image"},s.default.createElement("div",{className:"icon",onClick:function(){return e.props.closeImage()}},"x"),s.default.createElement("div",{className:"pic-box"},s.default.createElement("div",{className:"img-box"},s.default.createElement("img",{src:t,alt:"",style:this.props.style})),s.default.createElement("div",{className:"imageButton"},s.default.createElement("span",null,s.default.createElement("i",{className:"iconfont font-youxuanzhuan",onClick:function(){return e.props.yxz()}})),s.default.createElement("span",null,s.default.createElement("i",{className:"iconfont font-zuoxuanzhuan",onClick:function(){return e.props.zxz()}})),s.default.createElement("span",null,s.default.createElement("i",{className:"iconfont font-suoxiao",onClick:function(){return e.props.sx()}})),s.default.createElement("span",null,s.default.createElement("i",{className:"iconfont font-fangda",onClick:function(){return e.props.fd()}}))))):"")}}]),t}(o.Component);t.default=c},1686:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){return function(e){return new P.default(e).get("/signatures/count",function(t){e({type:G.default.GET_SIGN_PROFILE,profile:t})})}}function u(e,t){return function(n){return new P.default(n).post("/signatures/addUserSignature",e,function(e){n({type:G.default.CREATE_SEAL,seal:e}),t(e)})}}function i(e){return function(t){return new P.default(t).destroy("/signatures/deleteUserSignature/"+e,function(e){k.toastr.success(Q.default.translate("actions.delete-seal-success")),t({type:G.default.DELETE_SEAL,seal:e})})}}function o(e){return function(t){return new P.default(t).get("/signatures/findUserSignature",function(n){t({type:G.default.GET_OFFICIAL_SEALS,seals:n}),e&&e()})}}function s(e){return function(t){return new P.default(t).post("/signatures/"+e+"/default",{},function(e){t({type:G.default.SEAT_DEFAULT,seals:e})})}}function c(e,t,n){return function(r){new P.default(r).post("/signatures/uploadContract",{file:e,type:t},function(e){r({type:G.default.UPLOAD_SIGN_FILE,fileInfo:e}),n()})}}function l(e,t){return function(n){new P.default(n).post("/signatures/setContract/"+e,t,function(t){n((0,z.default)("/signatures/"+e+"/add-seal"))})}}function f(e){return function(t){return new P.default(t).get("/signatures/findUserLinkman",function(n){t({type:G.default.GET_SIGNATURE_MEMBERS,members:n}),e&&e()})}}function d(e){return function(t){return new P.default(t).get("/signatures/getLinkman/"+e,function(e){t({type:G.default.GET_SIGNATURE_MEMBER,member:e})})}}function p(e,t,n){return function(r){return new P.default(r).post("/signatures/addLinkman",e,function(e){r({type:G.default.CREATE_SIGNATURE_MEMBER,member:e}),"pc"===t&&k.toastr.success(Q.default.translate("actions.add-link-success")),n()})}}function g(e,t){return function(n){return new P.default(n).destroy("/signatures/deleteLinkman/"+e,function(e){n({type:G.default.DELETE_SIGNATURE_MEMBER,members:e}),k.toastr.success(Q.default.translate("actions.remove-link-success")),t()})}}function A(e,t,n){return function(r){return new P.default(r).post("/signatures/updateLinkman/"+e,t,function(e){r({type:G.default.UPDATE_SIGNATURE_MEMBER,members:e}),k.toastr.success(Q.default.translate("actions.update-link-success")),n()})}}function m(e,t){return function(n){return new P.default(n).getWithParams("/signatures",e,function(e){n({type:G.default.GET_SIGNATURES,lists:e}),t&&t()})}}function E(e,t){return function(n){return new P.default(n).getWithParams("/signatures",e,function(r){n({type:G.default.GET_SIGNATURES_MOBILE,lists:r,mobileActive:e.status||"ALL",pageNo:e.pageNo}),t&&t()})}}function y(e){return function(t){return new P.default(t).getWithParams("/signatures/findByKeyword",e,function(e){t({type:G.default.GET_SIGNATURES_BY_KEY_WORD,lists:e})})}}function b(e){return function(t){return new P.default(t).get("/signatures/"+e,function(e){t({type:G.default.GET_BY_SIGNATURE_ID,info:e})})}}function h(e,t,n){return function(r){return new P.default(r).post("/signatures/setContractSignStatus/"+e,t,function(e){r({type:G.default.ADD_SIGNATURE_SEALS,data:e}),n()})}}function S(e,t,n){return function(r){return new P.default(r).post("/signatures/setContractSignStatus/"+e,t,function(){n()})}}function w(e,t){return function(n){return new P.default(n).destroy("/signatures/deleteContract/"+e,function(e){n({type:G.default.DELETE_SIGNATURE,lists:e}),k.toastr.success(Q.default.translate("actions.delete-sign")),t()})}}function I(e){return function(t){return new P.default(t).get("/signatures/pdfSignature/"+e,function(e){t({type:G.default.GET_PDF_SEALS,pdfSeals:e})})}}function _(e,t){return function(n){return new P.default(n).getWithParams("/users/authorizations",e,function(e){n({type:G.default.GET_SIGNATURES_AUTHORIZE,lists:e}),t&&t()})}}function v(e,t){return function(n){return new P.default(n).destroy("/users/authorization/"+e,function(){k.toastr.success(Q.default.translate("actions.delete-authorize")),t()})}}function T(){return function(e){return new P.default(e).get("/signatures/api-signCount",function(t){e({type:G.default.GET_API_SIGNATURES,count:t})})}}function R(e){return function(t){return new P.default(t).getWithParams("/signatures/api-signCountStatistics",e,function(e){t({type:G.default.GET_API_SIGNATURES_BY_TIME,count:e})})}}function C(e){return function(t){return new P.default(t).getWithParams("/attestations/urlStatistics",e,function(e){t({type:G.default.GET_URL_STATISTICS,urlStatistics:e})})}}function M(e){return function(t){return new P.default(t).getWithParams("/products/saveStatistics",e,function(e){t({type:G.default.GET_SEC_STATISTICS,secStatistics:e})})}}function j(e){return function(t){return new P.default(t).getWithParams("/products/productStatistics",e,function(e){t({type:G.default.GET_ITEM_STATISTICS,itemStatistics:e})})}}function N(){return function(e){return new P.default(e).get("/products/totalStatistics",function(t){e({type:G.default.GET_CHART_COUNT,chartCount:t})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.getSignProfile=a,t.createSeal=u,t.deleteSeal=i,t.findAllSeals=o,t.setDefaultSeal=s,t.uploadSignFile=c,t.postSignatureInfo=l,t.findSignatureMembers=f,t.findSignatureMember=d,t.createSignatureMember=p,t.deleteSignatureMember=g,t.updateSignatureMember=A,t.getSignature=m,t.getSignatureMobile=E,t.getSignatureBykeyWord=y,t.findSignature=b,t.addSignatureSeals=h,t.refuseSignature=S,t.deleteSignature=w,t.getPdfSeals=I,t.getSignatureAuthorize=_,t.deleteSignatureAuthorize=v,t.getApiSignature=T,t.getApiSignatureByTime=R,t.getUrlStatistics=C,t.getSecurity=M,t.getItems=j,t.getChartCount=N;var O=n(448),G=r(O),B=n(449),P=r(B),k=n(298),U=n(295),Q=r(U),D=n(454),z=r(D)},1981:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(o),c=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){return s.default.createElement("div",{className:"mobile-header"},this.props.children)}}]),t}(o.Component);t.default=c},1998:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(o),c=function(e){function t(){var e,n,u,i;r(this,t);for(var o=arguments.length,s=Array(o),c=0;c<o;c++)s[c]=arguments[c];return n=u=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),u.test=function(){window.history.back()},i=n,a(u,i)}return u(t,e),i(t,[{key:"render",value:function(){return s.default.createElement("span",{className:"back",onClick:this.test})}}]),t}(o.Component);t.default=c},2005:function(e,t){"use strict";function n(){var e="undefined"!=typeof window?navigator.userAgent:"";return/MicroMessenger/i.test(e)}function r(){var e="undefined"!=typeof window?navigator.userAgent:"";return/(Android|Adr)/i.test(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.isWeiXin=n,t.isAndroid=r},2006:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMjM0N0M0RkIyNTcxMUU3OTA3NkE0MDQ0MEYxRUIxQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMjM0N0M1MEIyNTcxMUU3OTA3NkE0MDQ0MEYxRUIxQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMyMzQ3QzREQjI1NzExRTc5MDc2QTQwNDQwRjFFQjFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMyMzQ3QzRFQjI1NzExRTc5MDc2QTQwNDQwRjFFQjFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5HlEpwAAAVRJREFUeNrs17EJACAMRUEj7j9ollAXsAhYiNyBjeXnIRiZ2Sibh/swTU03AQJEgCBABAgCRIAgQAQIAkSAIEAECAJEgCBABAgCRIAgQAQIAkSAIEAECAJEgCBABAgCRIAgQASIAEGACBAEiABBgAgQBIgAQYAIEASIAEGACBAEiABBgAgQBIgAQYAIEASIAEGACBAEiABBgAgQBIgAESAIEAGCABEgCBABggARIAiQD419phmusaUXEAGCABEgCJDXf8Fhhmu/XVt6AREgCBABggARIAgQAYIAESAIEAEiQBMgQAQIAkSAIEAECAJEgCBABAgCRIAgQAQIAkSAIEAECAJEgCBABAgCRIAgQAQIAkSAIEAECAJEgAgQBIgAQYAIEASIAEGACBAEiABBgAgQBIgAQYAIEASIAEGACBAEiABBgAgQBIgAQYAIEASIAKEtAQYAopUIAYyuGvIAAAAASUVORK5CYII="},2060:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,s,c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(25),d=r(f),p=n(1981),g=r(p),A=n(1998),m=r(A),E=n(576),y=r(E),b=n(469),h=n(686),S=r(h),w=n(457),I=r(w),_=n(295),v=r(_),T=n(2005),R=n(1686),C=n(454),M=r(C),j=["name","file"],N=function(e){return new y.default(e).nonEmpty("name",v.default.translate("signature.seal-remark")).nonEmpty("file",v.default.translate("common.no-empty")).errors},O=(o=(0,b.reduxForm)({form:"seal-add",fields:j,validate:N},function(e){return{seals:e.signature.seals}}))(s=function(e){function t(){var e,n,r,i;a(this,t);for(var o=arguments.length,s=Array(o),c=0;c<o;c++)s[c]=arguments[c];return n=r=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.data={title:"添加签章"},r.needCapture=function(){return(0,T.isWeiXin)()&&(0,T.isAndroid)()},r.addSeal=function(e){e.preventDefault();var t=r.props.fields,n=t.name,a=t.file,u={name:n.value,file:a.value};r.props.dispatch((0,R.createSeal)(S.default.trimStringImage(u,"file"),function(){r.props.dispatch((0,M.default)("/mobile/signatures/seals"))}))},i=n,u(r,i)}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.fields,r=t.name,a=t.file,u=e.invalid,i=this.needCapture();return d.default.createElement("div",{className:"signatures-seal product-common"},d.default.createElement(g.default,null,d.default.createElement(m.default,null),d.default.createElement("span",{className:"title"},this.data.title),d.default.createElement("span",{className:"back",style:{opacity:0}})),d.default.createElement("form",{onSubmit:this.addSeal,className:"form"},d.default.createElement("div",{className:"sub-items"},d.default.createElement("section",{className:"item"},"签章名称",d.default.createElement("input",c({placeholder:"请输入签章名称",type:"text"},S.default.extract(r),{ref:"input"}))),d.default.createElement("section",{className:"item"},"签章",d.default.createElement("label",{htmlFor:"seal",className:"img"},d.default.createElement(I.default,{altSrc:n(2006),src:S.default.imageSrc(a),className:a.value?"":"add",alt:""}),i?d.default.createElement("input",c({type:"file",accept:"image/*",id:"seal"},S.default.ignoreFileUrl(a,this),{hidden:!0,multiple:!0})):d.default.createElement("input",c({type:"file",accept:"image/png",id:"seal"},S.default.ignoreFileUrl(a,this),{hidden:!0})),d.default.createElement("span",{className:"tip"},"请上传png格式图片")))),d.default.createElement("button",{type:"submit",className:"btn",disabled:u},"确认添加")))}}]),t}(f.Component))||s;t.default=O}});