webpackJsonp([36],{1574:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u,c,f=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(25),s=n(i),p=a(245),d=a(447),m=a(295),y=n(m),b=a(573),h=n(b),E=(u=(0,p.connect)(function(e){return{query:e.router.location.query,balanceHolder:e.user.balanceHolder}}))(c=function(e){function t(e){r(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.props.dispatch((0,d.getBalance)()),a}return o(t,e),f(t,[{key:"render",value:function(){var e=this.props,t=e.query,a=e.balanceHolder,n=h.default.get("0.00");return s.default.createElement("div",{className:"container-wrapper"},s.default.createElement("div",{className:"container"},s.default.createElement("div",{className:"pay-result"},s.default.createElement("h2",null,y.default.translate("pay.recharge-success")),s.default.createElement("div",{className:"pay-item"},s.default.createElement("p",null,s.default.createElement("span",null,y.default.translate("pay.recharge-money"),":"),t.total_fee||t.total_amount),s.default.createElement("p",null,s.default.createElement("span",null,y.default.translate("pay.recharge-time"),":"),t.notify_time||t.timestamp),s.default.createElement("p",null,s.default.createElement("span",null,y.default.translate("pay.order-number"),":"),t.trade_no),s.default.createElement("p",null,s.default.createElement("span",null,y.default.translate("common.balance"),":"),n.format(a.balance),y.default.translate("common.rmb"))))))}}]),t}(i.Component))||c;t.default=E}});