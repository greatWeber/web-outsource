"use strict";var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var EventEmitter=function(){function e(){_classCallCheck(this,e),this.events={}}return _createClass(e,[{key:"on",value:function(e,t){this.events[e]||(this.events[e]=[]),this.events[e].push(t)}},{key:"emit",value:function(e){for(var t=this,n=arguments.length,r=Array(1<n?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];this.events[e]&&this.events[e].forEach(function(e){return e.apply(t,r)})}},{key:"off",value:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter(function(e){return e!==t}))}}]),e}();window.eventEmitter=new EventEmitter;