webpackJsonp([64],{514:function(e,t,a){"use strict";var n=a(515),r=function(e){return e&&e.__esModule?e:{default:e}}(n);e.exports=r.default},515:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),c=a(25),u=n(c),p=a(516),f=n(p),d=a(517),y=n(d),m=a(518),h=n(m),b=a(519),g=n(b),v=function(e){function t(e){o(this,t);var a=l(this,Object.getPrototypeOf(t).call(this,e));return a.handlePreviousPage=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,a.state.selected>0&&a.handlePageSelected(a.state.selected-1,e)},a.handleNextPage=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,a.state.selected<a.props.pageNum-1&&a.handlePageSelected(a.state.selected+1,e)},a.handlePageSelected=function(e,t){t.preventDefault?t.preventDefault():t.returnValue=!1,a.state.selected!==e&&(a.setState({selected:e}),a.callCallback(e))},a.callCallback=function(e){void 0!==a.props.clickCallback&&"function"==typeof a.props.clickCallback&&a.props.clickCallback({selected:e})},a.pagination=function(){var e={};if(a.props.pageNum<=a.props.pageRangeDisplayed)for(var t=0;t<a.props.pageNum;t++)e["key"+t]=u.default.createElement(h.default,{onClick:a.handlePageSelected.bind(null,t),selected:a.state.selected===t,pageClassName:a.props.pageClassName,pageLinkClassName:a.props.pageLinkClassName,activeClassName:a.props.activeClassName,page:t+1});else{var n=a.props.pageRangeDisplayed/2,r=a.props.pageRangeDisplayed-n;a.state.selected>a.props.pageNum-a.props.pageRangeDisplayed/2?(r=a.props.pageNum-a.state.selected,n=a.props.pageRangeDisplayed-r):a.state.selected<a.props.pageRangeDisplayed/2&&(n=a.state.selected,r=a.props.pageRangeDisplayed-n);var o=void 0,l=void 0,i=void 0;for(o=0;o<a.props.pageNum;o++){l=o+1;var s=u.default.createElement(h.default,{onClick:a.handlePageSelected.bind(null,o),selected:a.state.selected===o,pageClassName:a.props.pageClassName,pageLinkClassName:a.props.pageLinkClassName,activeClassName:a.props.activeClassName,page:o+1});if(l<=a.props.marginPagesDisplayed)e["key"+o]=s;else if(l>a.props.pageNum-a.props.marginPagesDisplayed)e["key"+o]=s;else if(o>=a.state.selected-n&&o<=a.state.selected+r)e["key"+o]=s;else{var c=Object.keys(e),p=c[c.length-1],f=e[p];a.props.breakLabel&&f!==i&&(i=u.default.createElement(g.default,{breakLabel:a.props.breakLabel}),e["key"+o]=i)}}}return e},a.state={selected:e.initialSelected?e.initialSelected:e.forceSelected?e.forceSelected:0},a}return i(t,e),s(t,[{key:"componentDidMount",value:function(){void 0!==this.props.initialSelected&&this.callCallback(this.props.initialSelected)}},{key:"componentWillReceiveProps",value:function(e){void 0!==e.forceSelected&&this.props.forceSelected!==e.forceSelected&&this.setState({selected:e.forceSelected})}},{key:"render",value:function(){var e=this.props.disabledClassName,t=(0,f.default)(this.props.previousClassName,r({},e,0===this.state.selected)),a=(0,f.default)(this.props.nextClassName,r({},e,this.state.selected===this.props.pageNum-1));return u.default.createElement("ul",{className:this.props.containerClassName},u.default.createElement("li",{onClick:this.handlePreviousPage,className:t},u.default.createElement("a",{className:this.props.previousLinkClassName},this.props.previousLabel)),(0,y.default)(this.pagination()),u.default.createElement("li",{onClick:this.handleNextPage,className:a},u.default.createElement("a",{className:this.props.nextLinkClassName},this.props.nextLabel)))}}]),t}(c.Component);v.propTypes={pageNum:c.PropTypes.number.isRequired,pageRangeDisplayed:c.PropTypes.number.isRequired,marginPagesDisplayed:c.PropTypes.number.isRequired,previousLabel:c.PropTypes.node,nextLabel:c.PropTypes.node,breakLabel:c.PropTypes.node,clickCallback:c.PropTypes.func,initialSelected:c.PropTypes.number,forceSelected:c.PropTypes.number,containerClassName:c.PropTypes.string,pageClassName:c.PropTypes.string,pageLinkClassName:c.PropTypes.string,activeClassName:c.PropTypes.string,previousClassName:c.PropTypes.string,nextClassName:c.PropTypes.string,previousLinkClassName:c.PropTypes.string,nextLinkClassName:c.PropTypes.string,disabledClassName:c.PropTypes.string},v.defaultProps={pageNum:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousClassName:"previous",nextClassName:"next",previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",disabledClassName:"disabled"},t.default=v},516:function(e,t,a){/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
function n(){for(var e,t="",a=0;a<arguments.length;a++)if(e=arguments[a])if("string"==typeof e||"number"==typeof e)t+=" "+e;else if("[object Array]"===Object.prototype.toString.call(e))t+=" "+n.apply(null,e);else if("object"==typeof e)for(var r in e)e.hasOwnProperty(r)&&e[r]&&(t+=" "+r);return t.substr(1)}var r,o;void 0!==e&&e.exports&&(e.exports=n),r=[],void 0!==(o=function(){return n}.apply(t,r))&&(e.exports=o)},517:function(e,t,a){"use strict";function n(e){var t=e&&(N&&e[N]||e[P]);if("function"==typeof t)return t}function r(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function o(e,t){return e&&"object"==typeof e&&null!=e.key?r(e.key):t.toString(36)}function l(e,t,a,r){var i=typeof e;if("undefined"!==i&&"boolean"!==i||(e=null),null===e||"string"===i||"number"===i||"object"===i&&e.$$typeof===m)return a(r,e,""===t?v+o(e,0):t),1;var s,c,u=0,p=""===t?v:t+k;if(Array.isArray(e))for(var f=0;f<e.length;f++)s=e[f],c=p+o(s,f),u+=l(s,c,a,r);else{var d=n(e);if(d)for(var y,h=d.call(e),g=0;!(y=h.next()).done;)s=y.value,c=p+o(s,g++),u+=l(s,c,a,r);else if("object"===i){var N="",P=""+e;b(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===P?"object with keys {"+Object.keys(e).join(", ")+"}":P,N)}}return u}function i(e,t,a){return null==e?0:l(e,"",t,a)}function s(e){return(""+e).replace(C,"$&/")}function c(e,t){return y.cloneElement(e,{key:t},void 0!==e.props?e.props.children:void 0)}function u(e,t,a,n){this.result=e,this.keyPrefix=t,this.func=a,this.context=n,this.count=0}function p(e,t,a){var n=e.result,r=e.keyPrefix,o=e.func,l=e.context,i=o.call(l,t,e.count++);Array.isArray(i)?f(i,n,a,h.thatReturnsArgument):null!=i&&(y.isValidElement(i)&&(i=c(i,r+(!i.key||t&&t.key===i.key?"":s(i.key)+"/")+a)),n.push(i))}function f(e,t,a,n,r){var o="";null!=a&&(o=s(a)+"/");var l=u.getPooled(t,o,n,r);i(e,p,l),u.release(l)}function d(e){if("object"!=typeof e||!e||Array.isArray(e))return g(!1,"React.addons.createFragment only accepts a single object. Got: %s",e),e;if(y.isValidElement(e))return g(!1,"React.addons.createFragment does not accept a ReactElement without a wrapper object."),e;b(1!==e.nodeType,"React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.");var t=[];for(var a in e)f(e[a],t,a,h.thatReturnsArgument);return t}var y=a(25),m="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,h=a(11),b=a(3),g=a(10),v=".",k=":",N="function"==typeof Symbol&&Symbol.iterator,P="@@iterator",C=/\/+/g,E=j,j=function(e){var t=this;if(t.instancePool.length){var a=t.instancePool.pop();return t.call(a,e),a}return new t(e)},O=function(e){var t=this;b(e instanceof t,"Trying to release an instance into a pool of a different type."),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},_=function(e,t,a,n){var r=this;if(r.instancePool.length){var o=r.instancePool.pop();return r.call(o,e,t,a,n),o}return new r(e,t,a,n)};u.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},function(e,t){var a=e;a.instancePool=[],a.getPooled=t||E,a.poolSize||(a.poolSize=10),a.release=O,a}(u,_);e.exports=d},518:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(25),c=function(e){return e&&e.__esModule?e:{default:e}}(s),u=function(e){function t(){return n(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props.pageLinkClassName,t=this.props.pageClassName;return this.props.selected&&(t=void 0!==t?t+" "+this.props.activeClassName:this.props.activeClassName),c.default.createElement("li",{className:t},c.default.createElement("a",l({},this.props,{className:e}),this.props.page))}}]),t}(c.default.Component);t.default=u},519:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(25),s=function(e){return e&&e.__esModule?e:{default:e}}(i),c=function(e){function t(){return n(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e=this.props.breakLabel;return s.default.createElement("li",{className:"break"},e)}}]),t}(s.default.Component);t.default=c},1670:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,s,c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=a(25),p=n(u),f=a(245),d=a(300),y=n(d),m=a(295),h=n(m),b=a(514),g=n(b),v=a(447),k=a(1127),N=a(573),P=n(N),C=(i=(0,f.connect)(function(e){return{page:e.notification.all,list:e.notification.all.list}}))(s=function(e){function t(e){r(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.doQuery=function(e){var t=a.identityType;a.props.dispatch((0,k.findNotifications)({pageNo:a.pageNo,pageSize:10,notificationType:t}))},a.handlePageClick=function(e){a.pageNo=e.selected,a.doQuery(a.props)},a.handleIdentityType=function(e){a.identityType!==e&&(a.pageNo=0,a.identityType=e,a.doQuery(a.props))},a.handleMarkAll=function(){a.props.dispatch((0,k.markAll)(function(){return a.props.dispatch((0,v.getToDoList)())}))},a.handleReadOne=function(e,t){if(t!==!0&&"1"!==t){var n=[];n.push(e),a.props.dispatch((0,k.readNotification)(n,function(){a.doQuery(a.props),a.props.dispatch((0,v.getToDoList)())}))}},a.handleDeleteNotification=function(){var e=[];for(var t in a.selectedItems)e.push(a.selectedItems[t].id);a.props.dispatch((0,k.deleteNotification)(e,function(){a.doQuery(a.props)}))},a.selectedItems={},a.identityType="",a.pageNo=0,a}return l(t,e),c(t,[{key:"componentDidMount",value:function(){this.doQuery(this.props)}},{key:"selectItem",value:function(e){this.selectedItems[e.id]?(delete this.selectedItems[e.id],this.selectedLength-=1):(this.selectedItems[e.id]=e,this.selectedLength+=1);var t=this.props.list;document.getElementsByTagName("input")[0].checked=t.length===this.selectedLength,this.forceUpdate()}},{key:"selectedCount",value:function(){var e=Object.keys(this.selectedItems).length;return e>0?"("+e+")":""}},{key:"selectAll",value:function(e){var t=this.props.list,a=document.getElementsByTagName("input");if(a[0].checked){for(var n=0;n<a.length;n++)"checkbox"===a[n].type&&(a[n].checked=!0);for(var r=0;r<t.length;r++)this.selectedItems[t[r].id]=t[r];this.selectedLength=t.length}if(!a[0].checked){for(var o=0;o<a.length;o++)"checkbox"===a[o].type&&(a[o].checked=!1);this.selectedItems={},this.selectedLength=0}this.forceUpdate()}},{key:"type",value:function(e){switch(e){case"other":return h.default.translate("notification.other");case"product":return h.default.translate("notification.product-message");case"system":return h.default.translate("notification.notification-system")}}},{key:"subtype",value:function(e){switch(e){case"attestation_eContract":return h.default.translate("notification.sign");case"product_notary_person":return h.default.translate("common.user-notary");case"product_notary_organization":return h.default.translate("common.org-notary");case"attestation_trade":return h.default.translate("notification.user-att");case"attestation_eContract_trade":return h.default.translate("notification.user-sign");case"kyc_pass":return h.default.translate("notification.user-key-pass");case"kyc_reject":return h.default.translate("notification.user-key-reject");case"kycEnterprise_pass":return h.default.translate("notification.org-key-pass");case"kycEnterprise_reject":return h.default.translate("notification.org-key-reject")}}},{key:"render",value:function(){var e=this,t=this.props,a=(t.page,t.list),n=P.default.get("yyyy-mm-dd hh:MM:ss"),r=this.props.page;return p.default.createElement("div",{className:"container-wrapper"},p.default.createElement("div",{className:"notification-container container member-container"},p.default.createElement("h2",{className:"table-name"},h.default.translate("notification.message-reminding")),p.default.createElement("div",{className:"member-content"},p.default.createElement("nav",{className:"notify-tabs"},p.default.createElement("div",null,p.default.createElement("button",{onClick:this.handleDeleteNotification,disabled:this.selectedCount()<=0},h.default.translate("notification.delete")),p.default.createElement("button",{onClick:this.handleMarkAll},h.default.translate("notification.all-read"))),p.default.createElement("hr",null),p.default.createElement("div",{className:"button-group"},p.default.createElement("button",{className:(0,y.default)({active:""===this.identityType}),onClick:function(t){return e.handleIdentityType("")}},h.default.translate("notification.all")),p.default.createElement("button",{className:(0,y.default)({active:"product"===this.identityType}),onClick:function(t){return e.handleIdentityType("product")}},h.default.translate("notification.product-message")),p.default.createElement("button",{className:(0,y.default)({active:"system"===this.identityType}),onClick:function(t){return e.handleIdentityType("system")}},h.default.translate("notification.notification-system")),p.default.createElement("button",{className:(0,y.default)({active:"other"===this.identityType}),onClick:function(t){return e.handleIdentityType("other")}},h.default.translate("notification.other")))),p.default.createElement("div",{className:"notification-table"},p.default.createElement("table",null,p.default.createElement("thead",null,p.default.createElement("tr",null,p.default.createElement("td",{className:"checkbox"},p.default.createElement("input",{type:"checkbox",value:"all",onClick:function(t){return e.selectAll()}})),p.default.createElement("td",{className:"info"},h.default.translate("notification.content")),p.default.createElement("td",{className:"date"},h.default.translate("notification.time")),p.default.createElement("td",{className:"type"},h.default.translate("notification.type")),p.default.createElement("td",{className:"subtype"},h.default.translate("notification.subtype")))),p.default.createElement("tbody",null,a.map(function(t){return p.default.createElement("tr",{key:t.id,className:(0,y.default)({isRead:t.isRead===!0||"1"===t.isRead})},p.default.createElement("td",{className:"checkbox"},p.default.createElement("input",{type:"checkbox",onClick:function(a){return e.selectItem(t)},checked:!!e.selectedItems[t.id]})),p.default.createElement("td",{className:"info",onClick:function(){return e.handleReadOne(t.id,t.isRead)}},t.data),p.default.createElement("td",null,n.format(t.createdAt)),p.default.createElement("td",null,e.type(t.category)),p.default.createElement("td",null,e.subtype(t.notificationType)))})))),p.default.createElement("hr",null),p.default.createElement("div",{className:"all-page"},r.totalPage>0?p.default.createElement(g.default,{previousLabel:"<",nextLabel:">",breakLable:p.default.createElement("a",{href:""},"..."),pageNum:r.totalPage,forceSelected:r.pageNo,marginPagesDisplayed:5,pageRangeDisplayed:2,clickCallback:this.handlePageClick,containerClassName:"pagination",activeClassName:"active"}):""))))}}]),t}(u.Component))||s;t.default=C}});