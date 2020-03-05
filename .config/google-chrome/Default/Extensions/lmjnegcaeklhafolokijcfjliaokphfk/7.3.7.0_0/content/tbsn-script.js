!function(e){var r={};function t(n){if(r[n])return r[n].exports;var s=r[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=371)}({15:function(e,r,t){"use strict";var n,s,i=t(2),a=i.browser,o="undefined"!=typeof _wehPanelName&&{panel:_wehPanelName}||(n=/^([^\?]*)(?:\?(.*))?$/.exec(window.location.href),s={},n[2]&&n[2].split("&").forEach(function(e){var r=e.split("=");s[r[0]]=decodeURIComponent(r[1])}),s);if(!o.panel)throw new Error("Panel name not defined in URL");i.uiName=o.panel;var g=!o.noprefs;i.rpc=t(3),i.rpc.listen({close:function(){window.close()}});var m=a.runtime.connect({name:"weh:"+a.runtime.id+":"+i.uiName});i.rpc.setPost(m.postMessage.bind(m)),m.onMessage.addListener(function(e){i.rpc.receive(e,m.postMessage.bind(m))}),i.rpc.call("appStarted",{uiName:i.uiName,usePrefs:g}).catch(function(e){console.info("appStarted failed",e)});var c=[new Promise(function(e,r){window.addEventListener("DOMContentLoaded",function(){e()})})];if(g){var l=t(24);i.prefs=l;var u={};try{var A=localStorage.getItem("weh-prefs");A&&JSON.parse(A).forEach(function(e){u[e.name]=e.value})}catch(e){}l.assign(u),l.on("",{pack:!0},function(e,r){i.rpc.call("prefsSet",e)}),c.push(new Promise(function(e,r){i.rpc.call("prefsGetSpecs").then(function(e){return l.declare(e),i.rpc.call("prefsGetAll")}).then(function(r){l.assign(r),l.forceNotify(!1),e()}).catch(r)})),i.rpc.listen({setPrefs:function(e){l.assign(e)}})}Promise.all(c).then(function(){return i.rpc.call("appReady",{uiName:i.uiName})}).then(function(){if(d=!0,p){var e=f;f=void 0,p=!1,i.doTrigger(e)}}).catch(function(e){console.error("app not ready:",e)});var p=!1,f=void 0,d=!1;i.doTrigger=function(e){return i.rpc.call("trigger",i.uiName,e).catch(function(){})},i.trigger=function(e){if(d)return i.doTrigger(e);f=e,p=!0},i._=t(9).getMessage,i.copyToClipboard=function(e,r){r=r||"text/plain",document.oncopy=function(t){t.clipboardData.setData(r,e),t.preventDefault()},document.execCommand("Copy",!1,null)},i.setPageTitle=function(e){var r=document.querySelector("head title");if(r)for(;r.firstChild;)r.removeChild(r.firstChild);else r=document.createElement("title"),document.head.appendChild(r);r.appendChild(document.createTextNode(e))},e.exports=i},2:function(e,r,t){"use strict";var n;r.browser=t(4),n="undefined"==typeof browser&&"undefined"!=typeof chrome&&chrome.runtime?/\bOPR\//.test(navigator.userAgent)?"opera":"chrome":/\bEdge\//.test(navigator.userAgent)?"edge":"firefox",r.browserType=n,r.isBrowser=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];for(var s=0;s<t.length;s++)if(t[s]==r.browserType)return!0;return!1},r.error=function(e){console.groupCollapsed(e.message),e.stack&&console.error(e.stack),console.groupEnd()}},24:function(e,r,t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=t(9).getMessage;function i(){this.$specs={},this.$values=null,this.$values||(this.$values={}),this.$listeners={}}i.prototype={notify:function(e,r,t,n){for(var s=this,i=e.split("."),a=[],o=i.length;o>=0;o--)a.push(i.slice(0,o).join("."));a.forEach(function(i){var a=s.$listeners[i];a&&a.forEach(function(s){if(s.specs==n)if(s.pack)s.pack[e]=r,void 0===s.old[e]&&(s.old[e]=t),s.timer&&clearTimeout(s.timer),s.timer=setTimeout(function(){delete s.timer;var e=s.pack,r=s.old;s.pack={},s.old={};try{s.callback(e,r)}catch(e){}},0);else try{s.callback(e,r,t)}catch(e){}})})},forceNotify:function(e){void 0===e&&(e=!1);var r=this;Object.keys(r.$specs).forEach(function(t){r.notify(t,r.$values[t],r.$values[t],e)})},declare:function(e){var r=this;Array.isArray(e)||(e=Object.keys(e).map(function(r){var t=e[r];return t.name=r,t})),e.forEach(function(e){if(o[e.name])throw new Error("Forbidden prefs key "+e.name);if(e.hidden)e.label=e.name,e.description="";else{var t=e.name.replace(/[^0-9a-zA-Z_]/g,"_");e.label=e.label||s("weh_prefs_label_"+t)||e.name,e.description=e.description||s("weh_prefs_description_"+t)||""}"choice"==e.type&&(e.choices=(e.choices||[]).map(function(r){if("object"==(void 0===r?"undefined":n(r)))return r;if(e.hidden)return{value:r,name:r};var i=r.replace(/[^0-9a-zA-Z_]/g,"_");return{value:r,name:s("weh_prefs_"+t+"_option_"+i)||r}}));var i,a=null;r.$specs[e.name]||(i=e.name,void 0!==r[e.name]&&(a=r[e.name]),Object.defineProperty(r,i,{set:function(e){var t=r.$values[i];t!==e&&(r.$values[i]=e,r.notify(i,e,t,!1))},get:function(){return void 0!==r.$values[i]?r.$values[i]:r.$specs[i]&&r.$specs[i].defaultValue||void 0}}));var g=r.$specs[e.name];r.$specs[e.name]=e,null!==a?r.$values[e.name]=a:void 0===r.$values[e.name]&&(r.$values[e.name]=e.defaultValue),r.notify(e.name,e,g,!0)})},on:function(){var e="",r={},t=0;"string"==typeof arguments[t]&&(e=arguments[t++]),"object"==n(arguments[t])&&(r=arguments[t++]);var s=arguments[t],i=!!r.pack;this.$listeners[e]||(this.$listeners[e]=[]);var a={callback:s,specs:!!r.specs};i&&(a.pack={},a.old={}),this.$listeners[e].push(a)},off:function(){var e="",r=0;"string"==typeof arguments[r]&&(e=arguments[r++]);var t=arguments[r],n=this.$listeners[e];if(n)for(var s=n.length-1;s>=0;s--)t&&n[s]!=t||n.splice(s,1)},getAll:function(){return Object.assign({},this.$values)},getSpecs:function(){return Object.assign({},this.$specs)},assign:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r])},isValid:function(e,r){var t=this.$specs[e];if(t){switch(t.type){case"string":if(t.regexp&&!new RegExp(t.regexp).test(r))return!1;break;case"integer":if(!/^-?[0-9]+$/.test(r))return!1;if(isNaN(parseInt(r)))return!1;case"float":if("float"==t.type){if(!/^-?[0-9]+(\.[0-9]+)?|(\.[0-9]+)$/.test(r))return!1;if(isNaN(parseFloat(r)))return!1}if(void 0!==t.minimum&&r<t.minimum)return!1;if(void 0!==t.maximum&&r>t.maximum)return!1;break;case"choice":var n=!1;if((t.choices||[]).forEach(function(e){r==e.value&&(n=!0)}),!n)return!1}return!0}},reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];switch(r.type){case"weh.SET_PREFS":e=Object.assign({},e,r.payload)}return e},reduxDispatch:function(e){this.on("",{pack:!0},function(r){e.dispatch({type:"weh.SET_PREFS",payload:r})})}};var a=new i,o={};for(var g in a)a.hasOwnProperty(g)&&(o[g]=!0);e.exports=a},3:function(e,r,t){"use strict";var n=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}();function s(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function i(e){return Array.isArray(e)?e:Array.from(e)}var a=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.replyId=0,this.replies={},this.listeners={},this.hook=this.nullHook,this.debugLevel=0,this.useTarget=!1,this.logger=console,this.posts={}}return n(e,[{key:"setPost",value:function(e,r){"string"==typeof e?this.posts[e]=r:this.post=e}},{key:"setUseTarget",value:function(e){this.useTarget=e}},{key:"setDebugLevel",value:function(e){this.debugLevel=e}},{key:"setHook",value:function(e){var r=this,t=Date.now();this.hook=e?function(n){n.timestamp="undefined"!=typeof window&&void 0!==window.performance?window.performance.now():Date.now()-t;try{e(n)}catch(e){r.logger.warn("Hoor error",e)}}:this.nullHook}},{key:"nullHook",value:function(){}},{key:"call",value:function(){var e,r,t,n,a=this,o=Array.prototype.slice.call(arguments);if("function"==typeof o[0]&&(e=o.shift()),a.useTarget){var g=i(o);r=g[0],t=g[1],n=g.slice(2)}else{var m=i(o);t=m[0],n=m.slice(1)}return new Promise(function(i,o){var g=++a.replyId;a.debugLevel>=2&&a.logger.info("rpc #"+g,"call =>",t,n),a.hook({type:"call",callee:r,rid:g,method:t,args:n}),a.replies[g]={resolve:i,reject:o,peer:r};var m=e||a.useTarget&&a.posts[r]||a.post;a.useTarget?m(r,{type:"weh#rpc",_request:g,_method:t,_args:[].concat(s(n))}):m({type:"weh#rpc",_request:g,_method:t,_args:[].concat(s(n))})})}},{key:"receive",value:function(e,r,t){var n=this;if(e._request)Promise.resolve().then(function(){var r=n.listeners[e._method];if("function"==typeof r)return n.debugLevel>=2&&n.logger.info("rpc #"+e._request,"serve <= ",e._method,e._args),n.hook({type:"call",caller:t,rid:e._request,method:e._method,args:e._args}),Promise.resolve(r.apply(null,e._args)).then(function(r){return n.hook({type:"reply",caller:t,rid:e._request,result:r}),r}).catch(function(r){throw n.hook({type:"reply",caller:t,rid:e._request,error:r.message}),r});throw new Error("Method "+e._method+" is not a function")}).then(function(t){n.debugLevel>=2&&n.logger.info("rpc #"+e._request,"serve => ",t),r({type:"weh#rpc",_reply:e._request,_result:t})}).catch(function(t){n.debugLevel>=1&&n.logger.info("rpc #"+e._request,"serve => !",t.message),r({type:"weh#rpc",_reply:e._request,_error:t.message})});else if(e._reply){var s=n.replies[e._reply];delete n.replies[e._reply],s?e._error?(n.debugLevel>=1&&n.logger.info("rpc #"+e._reply,"call <= !",e._error),n.hook({type:"reply",callee:s.peer,rid:e._reply,error:e._error}),s.reject(new Error(e._error))):(n.debugLevel>=2&&n.logger.info("rpc #"+e._reply,"call <= ",e._result),n.hook({type:"reply",callee:s.peer,rid:e._reply,result:e._result}),s.resolve(e._result)):n.logger.error("Missing reply handler")}}},{key:"listen",value:function(e){Object.assign(this.listeners,e)}}]),e}();e.exports=new a},371:function(e,r,t){e.exports=t(372)},372:function(e,r,t){"use strict";var n=t(15).browser;window.vdhPostListener||(window.vdhPostListener=function(e){if("vdhPostRequest"==e.type)return new Promise(function(r,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&r(n.responseText)},n.open("POST",e.url+"&_vdh_"),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var s,i=[];Object.keys(e.formData).forEach(function(r){i.push(encodeURIComponent(r)+"="+encodeURIComponent(e.formData[r]))}),s=i.join("&").replace(/%20/g,"+"),n.send(s)})},n.runtime.onMessage.addListener(window.vdhPostListener))},4:function(e,r,t){var n,s,i,a;a=function(e){"use strict";if("undefined"==typeof browser){const r=()=>{const e={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},export:{minArgs:0,maxArgs:0},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},getSubTree:{minArgs:1,maxArgs:1},import:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},setIcon:{minArgs:1,maxArgs:1}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{update:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},downloads:{download:{minArgs:1,maxArgs:1},cancel:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:0,maxArgs:0},setIcon:{minArgs:1,maxArgs:1},show:{minArgs:0,maxArgs:0}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getBrowserInfo:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{create:{minArgs:1,maxArgs:1},captureVisibleTab:{minArgs:0,maxArgs:2},detectLanguage:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},query:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(e).length)throw new Error("api-metadata.json has not been included in browser-polyfill");const r=(e,r)=>{const t=e=>1==e?"argument":"arguments";return function(n,...s){if(s.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${s.length}`);if(s.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${s.length}`);return new Promise((r,t)=>{n[e](...s,(e=>(...r)=>{chrome.runtime.lastError?e.reject(chrome.runtime.lastError):1===r.length?e.resolve(r[0]):e.resolve(r)})({resolve:r,reject:t}))})}},t=(e,r,t)=>new Proxy(r,{apply:(r,n,s)=>t.call(n,e,...s)});let n=Function.call.bind(Object.prototype.hasOwnProperty);const s=(e,i={},a={})=>{let o=Object.create(null),g={has:(e,r)=>r in e||r in o,get(e,g,m){if(g in o)return o[g];if(!(g in e))return;let c=e[g];if("function"==typeof c)if("function"==typeof i[g])c=t(e,e[g],i[g]);else if(n(a,g)){let n=r(g,a[g]);c=t(e,e[g],n)}else c=c.bind(e);else{if("object"!=typeof c||null===c||!n(i,g)&&!n(a,g))return Object.defineProperty(o,g,{configurable:!0,enumerable:!0,get:()=>e[g],set(r){e[g]=r}}),c;c=s(c,i[g],a[g])}return o[g]=c,c},set:(e,r,t,n)=>(r in o?o[r]=t:e[r]=t,!0),defineProperty:(e,r,t)=>Reflect.defineProperty(o,r,t),deleteProperty:(e,r)=>Reflect.deleteProperty(o,r)};return new Proxy(e,g)},i={runtime:{onMessage:(e=>({addListener(r,t,...n){r.addListener(e.get(t),...n)},hasListener:(r,t)=>r.hasListener(e.get(t)),removeListener(r,t){r.removeListener(e.get(t))}}))(new class extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}(e=>"function"!=typeof e?e:function(r,t,n){let s=e(r,t);if((e=>e&&"object"==typeof e&&"function"==typeof e.then)(s))return s.then(n,e=>{console.error(e),n(e)}),!0;void 0!==s&&n(s)}))}};return s(chrome,i,e)};e.exports=r()}else e.exports=browser},s=[e],void 0===(i="function"==typeof(n=a)?n.apply(r,s):n)||(e.exports=i)},9:function(e,r,t){"use strict";var n=t(2).browser,s={},i=new RegExp("\\$[a-zA-Z]*([0-9]+)\\$","g");function a(){try{null===(s=JSON.parse(window.localStorage.getItem("wehI18nCustom")))&&(s={},n.storage.local.get("wehI18nCustom").then(function(e){var r=e.wehI18nCustom;r&&Object.assign(s,r)}))}catch(e){s={}}}a(),e.exports={getMessage:function(e,r){if(/-/.test(e)){var t=e.replace(/-/g,"_");console.warn("Wrong i18n message name. Should it be",t,"instead of",e,"?"),e=t}var a=s[e];return a&&a.message.length>0?(Array.isArray(r)||(r=[r]),(a.message||"").replace(i,function(e){var t=i.exec(e);return t&&r[parseInt(t[1])-1]||"??"})):n.i18n.getMessage.apply(n.i18n,arguments)},reload:a}}});