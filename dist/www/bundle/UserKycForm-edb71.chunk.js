webpackJsonp([33],{457:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=a(25),s=n(u),c=a(458),f=n(c),d=0,p=1,h={},v=function(e){function t(e){r(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));a.openViewPicture=function(){a.viewPicture=!0,a.forceUpdate()},a.closeImage=function(){a.viewPicture=!1,p=1,d=0,h={},a.forceUpdate()},a.youxuanzhuan=function(){d+=90,h={transform:"scale("+p+") rotate("+d+"deg)"},a.forceUpdate()},a.zuoxuanzhuan=function(){d-=90,h={transform:"scale("+p+") rotate("+d+"deg)"},a.forceUpdate()},a.suoxiao=function(){p/=1.1,h={transform:"scale("+p+") rotate("+d+"deg)"},a.forceUpdate()},a.fangda=function(){p*=1.1,h={transform:"scale("+p+") rotate("+d+"deg)"},a.forceUpdate()},a.handleError=function(e){var t={draggable:!1};a.props.src!==a.props.altSrc&&(t.src=a.props.altSrc),a.setState(t)},a.state={src:e.src?e.src:e.altSrc,draggable:!!e.src},a.reader=new FileReader,a.viewPicture=!1;var n=a;return a.reader.onload=function(e){n.setState({src:e.target.result,draggable:!0})},a}return o(t,e),i(t,[{key:"same",value:function(e,t){var a=e.src,n=t.src;return a===n||!!(a&&n&&a instanceof File&&n instanceof File&&a.name===n.name&&a.size===n.size)}},{key:"componentWillReceiveProps",value:function(e){if(!this.same(e,this.props)){var t=e.src;if(!t)return;t instanceof File?t.type.match(/image.*/)&&this.reader.readAsDataURL(t):this.setState({src:t,draggable:!0})}}},{key:"render",value:function(){return s.default.createElement("div",null,s.default.createElement("img",{className:this.props.className,style:this.props.style,src:this.state.src,onError:this.handleError,draggable:this.state.draggable,onDragStart:this.props.onDragStart,onLoad:this.props.onLoad,onClick:this.openViewPicture}),s.default.createElement(f.default,{show:this.viewPicture,src:this.state.src,closeImage:this.closeImage,zxz:this.zuoxuanzhuan,yxz:this.youxuanzhuan,sx:this.suoxiao,fd:this.fangda,style:h}))}}]),t}(u.Component);t.default=v},458:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(25),u=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={show:a.props.show},a}return l(t,e),o(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({show:e.show})}},{key:"render",value:function(){var e=this,t=this.props.src;return u.default.createElement("div",{className:"view-image"},this.state.show?u.default.createElement("div",{className:"model-image"},u.default.createElement("div",{className:"icon",onClick:function(){return e.props.closeImage()}},"x"),u.default.createElement("div",{className:"pic-box"},u.default.createElement("div",{className:"img-box"},u.default.createElement("img",{src:t,alt:"",style:this.props.style})),u.default.createElement("div",{className:"imageButton"},u.default.createElement("span",null,u.default.createElement("i",{className:"iconfont font-youxuanzhuan",onClick:function(){return e.props.yxz()}})),u.default.createElement("span",null,u.default.createElement("i",{className:"iconfont font-zuoxuanzhuan",onClick:function(){return e.props.zxz()}})),u.default.createElement("span",null,u.default.createElement("i",{className:"iconfont font-suoxiao",onClick:function(){return e.props.sx()}})),u.default.createElement("span",null,u.default.createElement("i",{className:"iconfont font-fangda",onClick:function(){return e.props.fd()}}))))):"")}}]),t}(i.Component);t.default=s},576:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(577),i=n(o),u=a(295),s=n(u),c=function(){function e(t){r(this,e),this.values=t,this._errors={}}return l(e,[{key:"mustEqual",value:function(e,t,a){return this.values[e]!=t&&(this.errors[e]=a),this}},{key:"postCode",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePostCode(this.values[e])||(this.errors[e]=s.default.translate("validate.postcode",{field:t})),this}},{key:"money",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateMoney(this.values[e])||(this.errors[e]=s.default.translate("validate.post-money",{field:t})),this}},{key:"payMoney",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePayMoney(this.values[e])||(this.errors[e]=s.default.translate("validate.post-money",{field:t})),this}},{key:"phoneNumber",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePhoneNumber(this.values[e])||(this.errors[e]=s.default.translate("validate.phone-number",{field:t})),this}},{key:"phone",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePhoneNumber(this.values[e])||(this.errors[e]=s.default.translate("validate.phone-number",{field:t})),this}},{key:"name",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateRealName(this.values[e])||(this.errors[e]=s.default.translate("validate.real-name",{field:t})),this}},{key:"email",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateEmail(this.values[e])||(this.errors[e]=s.default.translate("validate.email",{field:t})),this}},{key:"realName",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateRealName(this.values[e])||(this.errors[e]=s.default.translate("validate.real-name",{field:t})),this}},{key:"nonEmpty",value:function(e,t){return this.values[e]&&!/^\s*$/.test(this.values[e])||(this.errors[e]=s.default.translate("validate.not-empty",{field:t})),this}},{key:"creditCard",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateCreditCard(this.values[e])||(this.errors[e]=s.default.translate("validate.credit-card",{field:t})),this}},{key:"verifyCode",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateVerifyCode(this.values[e])||(this.errors[e]=s.default.translate("validate.verify-code",{field:t})),this}},{key:"captcha",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateCaptcha(this.values[e])||(this.errors[e]=s.default.translate("validate.verify-code",{field:t})),this}},{key:"password",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePassword(this.values[e])||(this.errors[e]=s.default.translate("validate.password",{field:t})),this}},{key:"rePassword",value:function(e,t,a){return(!(arguments.length>3&&void 0!==arguments[3])||arguments[3])&&this.nonEmpty(e,a),i.default.validatePassword(this.values[e])?this.values[e]!==this.values[t]&&(this.errors[e]=s.default.translate("两次密码不一致")):this.errors[e]=s.default.translate("validate.password",{field:a}),this}},{key:"idCard",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateIdCard(this.values[e])||(this.errors[e]=s.default.translate("validate.id-card",{field:t})),this}},{key:"url",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateUrl(this.values[e])||(this.errors[e]=s.default.translate("validate.url",{field:t})),this}},{key:"chineseLength",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateChineseLength(this.values[e])||(this.errors[e]=s.default.translate("validate.packageName",{field:t})),this}},{key:"CreditCodeLength",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateCreditCodeLength(this.values[e])||(this.errors[e]=s.default.translate("请输入正确的18位社会信用代码",{field:t})),this}},{key:"positiveInteger",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validatePositiveInteger(this.values[e])||(this.errors[e]=s.default.translate("validate.real-name",{field:t})),this}},{key:"imageCode",value:function(e,t){return(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.nonEmpty(e,t),i.default.validateImageCode(this.values[e])||(this.errors[e]=s.default.translate("validate.imageCode",{field:t})),this}},{key:"errors",get:function(){return this._errors}}]),e}();t.default=c},577:function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=function(){function e(){a(this,e)}return n(e,null,[{key:"validatePhoneNumber",value:function(e){return!e||/^1[0-9]{10}$/.test(e)}},{key:"validatePassword",value:function(e){return!e||/(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/.test(e)&&e.indexOf(" ")<=-1}},{key:"validateVerifyCode",value:function(e){return!e||/[0-9]{4}/.test(e)}},{key:"validateCaptcha",value:function(e){return!e||/^[\da-zA-Z]{4}$/.test(e)}},{key:"validatePostCode",value:function(e){return!e||/^[1-9][0-9]{5}$/.test(e)}},{key:"validateMoney",value:function(e){return!e||/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(e)}},{key:"validatePayMoney",value:function(e){return!e||/^[0-9]{1,7}([.][0-9]{1,2})?$/.test(e)}},{key:"validateEmail",value:function(e){return!e||/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e)}},{key:"validateUrl",value:function(e){return!e||/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?/.test(e)}},{key:"validateRealName",value:function(e){return e&&(e=e.trim()),!e||/^[\u4e00-\u9fa5]{2,6}$/.test(e.trim())}},{key:"validateIdCard",value:function(e){if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e))return!1;if(18==e.length){var t,a=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),n=new Array("1","0","X","9","8","7","6","5","4","3","2"),r=0;for(t=0;t<17;t++)r+=e.substr(t,1)*a[t];return n[r%11]==e.substr(17,1)}}},{key:"validateCreditCard",value:function(e){if(/[^0-9-\s]+/.test(e))return!0;var t=0,a=0,n=!1;e=e.replace(/\D/g,"");for(var r=e.length-1;r>=0;r--){var l=e.charAt(r),a=parseInt(l,10);n&&(a*=2)>9&&(a-=9),t+=a,n=!n}return t%10==0}},{key:"validateChineseLength",value:function(e){return!e||/^[\u4e00-\u9fa5]{1,10}$/.test(e)}},{key:"validateCreditCodeLength",value:function(e){return!e||/^\w{18}$/.test(e)}},{key:"validatePositiveInteger",value:function(e){return!e||/^[0-9]*$/.test(e)}},{key:"validateImageCode",value:function(e){return!e||/^[a-zA-Z0-9]{4}$/.test(e)}}]),e}();t.default=r},686:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(25),i=(function(e){e&&e.__esModule?e:{default:e}}(o),function(){function e(){n(this,e)}return l(e,null,[{key:"ignoreFileUrl",value:function(e,t){return Object.assign({},e,{value:null,onChange:function(a){e.value=a.target.files,t&&t.forceUpdate(),e.onChange(a)}})}},{key:"trimStringImage",value:function(e){for(var t=r({},e),a=arguments.length,n=Array(a>1?a-1:0),l=1;l<a;l++)n[l-1]=arguments[l];for(var o in n)t[n[o]]instanceof FileList||(t[n[o]]=void 0);return t}},{key:"imageSrc",value:function(e){return e.value instanceof FileList?e.value.length>=1?e.value[0]:null:e.value}},{key:"extract",value:function(e,t){var a=void 0;a="select"===t?function(t,a,n){e.onChange(n)}:function(t){e.onChange(t)};var n=e.error,r=e.checked,l=e.defaultChecked,o=e.value,i=e.defaultValue,u=e.onBlur,s=e.onDragStart,c=e.onDrop,f=e.onFocus;return{errorText:e.touched&&n,checked:r,defaultChecked:l,value:o,defaultValue:i,onBlur:u,onChange:a,onDragStart:s,onDrop:c,onFocus:f}}}]),e}());t.default=i},687:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,i,u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(25),c=function(e){return e&&e.__esModule?e:{default:e}}(s),f=a(245),d=(o=(0,f.connect)(function(e){return{loading:e.api.loading}}))(i=function(e){function t(){var e,a,l,o;n(this,t);for(var i=arguments.length,u=Array(i),s=0;s<i;s++)u[s]=arguments[s];return a=l=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),l.handleTouchTap=function(e){l.clicked=!0,l.props.onClick&&l.props.onClick(e)},o=a,r(l,o)}return l(t,e),u(t,[{key:"render",value:function(){var e=this.clicked;this.clicked=!1;var t=this.props,a=t.className,n=t.type,r=t.style;t.buttonStyle;return c.default.createElement("button",{className:a,type:n,style:r,disabled:this.props.disabled||this.props.loading,onClick:this.handleTouchTap},e&&this.props.loading?this.props.loadingLabel:this.props.label)}}]),t}(s.Component))||i;t.default=d},1566:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),f=a(25),d=n(f),p=a(469),h=a(447),v=a(686),m=n(v),y=a(457),b=n(y),g=a(576),E=n(g),k=a(687),w=n(k),_=["realName","idCard","idCardFront","idCardBack"],C=function(e){return new E.default(e).nonEmpty("realName","真实姓名").nonEmpty("idCard","身份证号").nonEmpty("idCardFront","身份证正面照片").nonEmpty("idCardBack","身份证背面照片").errors},N=(i=(0,p.reduxForm)({form:"user_kyc",fields:_,validate:C},function(e){return{initialValues:e.user.kyc,onSubmit:function(e,t){t((0,h.updateKyc)(m.default.trimStringImage(e,"idCardFront","idCardBack")))}}}))(u=function(e){function t(){return r(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),c(t,[{key:"componentWillMount",value:function(){this.props.dispatch((0,h.getKyc)())}},{key:"render",value:function(){var e=this.props,t=e.fields,n=t.realName,r=t.idCard,l=t.idCardFront,o=t.idCardBack,i=e.handleSubmit;return d.default.createElement("div",{className:"container-wrapper"},d.default.createElement("div",{className:"container panel-body realname-apply"},d.default.createElement("form",{onSubmit:i,className:"simple_form center-block auth-form",noValidate:"novalidate",id:"new_kyc"},d.default.createElement("h3",null,"实名认证"),d.default.createElement("div",{className:"form-group"},d.default.createElement("label",{className:"control-label",htmlFor:"realName"},"真实姓名"),d.default.createElement("div",{className:"input string required kyc_name"},d.default.createElement("input",s({className:"string required form-control",placeholder:"请输入你的真实姓名",type:"text"},n))),m.default.error(n)),d.default.createElement("div",{className:"form-group"},d.default.createElement("label",{className:"control-label",htmlFor:"pid"},"身份证号"),d.default.createElement("div",{className:"input string required kyc_pid"},d.default.createElement("input",s({className:"string required form-control",placeholder:"请输入你的身份证号",type:"text"},r))),m.default.error(r)),d.default.createElement("label",{className:"control-label"},"上传身份证正面"),d.default.createElement("div",{className:"kyc-picture"},d.default.createElement(b.default,{altSrc:a(1567),src:m.default.imageSrc(l)})),d.default.createElement("p",{className:"upload-p"},"你可以选择png/jpg格式的图像"),d.default.createElement("div",{className:"input-group-btn"},d.default.createElement("button",{type:"button",tabIndex:"500",title:"Abort ongoing upload",className:"btn btn-default hide fileinput-cancel fileinput-cancel-button"})),d.default.createElement("div",{className:"form-group"},d.default.createElement("div",{tabIndex:"500",className:"btn btn-primary upload-kyc"},d.default.createElement("span",{className:"hidden-xs"},"身份证正面"),d.default.createElement("input",s({className:"file optional form-control upload-file-kyc",type:"file"},m.default.ignoreFileUrl(l,this)))),m.default.error(l)),d.default.createElement("label",{className:"control-label"},"上传身份证反面"),d.default.createElement("div",{className:"kyc-picture"},d.default.createElement(b.default,{altSrc:a(1568),src:m.default.imageSrc(o)})),d.default.createElement("p",{className:"upload-p"},"你可以选择png/jpg格式的图像"),d.default.createElement("div",{className:"input-group-btn"},d.default.createElement("button",{type:"button",tabIndex:"500",title:"Abort ongoing upload",className:"btn btn-default hide fileinput-cancel fileinput-cancel-button"})),d.default.createElement("div",{className:"form-group"},d.default.createElement("div",{tabIndex:"500",className:"btn btn-primary upload-kyc"},d.default.createElement("span",{className:"hidden-xs"},"身份证反面"),d.default.createElement("input",s({className:"file optional form-control upload-file-kyc",type:"file"},m.default.ignoreFileUrl(o,this)))),m.default.error(o)),d.default.createElement(w.default,{className:"btn btn-primary",type:"submit",style:{width:"40%"},label:"提交",loadingLabel:"提交中..."}),d.default.createElement("div",{className:"label-tip"},d.default.createElement("i",null,"人工审核一般要1～2个工作日")))))}}]),t}(f.Component))||u;t.default=N},1567:function(e,t,a){e.exports=a.p+"kyc-frontend-c_7zrmW.png"},1568:function(e,t,a){e.exports=a.p+"kyc-backend-csmfGaM.png"}});