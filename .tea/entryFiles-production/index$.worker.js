!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=42)}({0:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var originalBridgeCall=self.AlipayJSBridge&&self.AlipayJSBridge.call,originalFetch=self.fetch,originImportScripts=self.importScripts,originEval="function"==typeof self.__eval?self.__eval:self.eval;exports.getUserAgent=function(){return navigator.swuserAgent||navigator.userAgent||""},exports.debug=console.log.bind(console),exports.checkIOS=function(){return/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(exports.getUserAgent())},exports.isLyra=function(){return Boolean(self.__LyraWSWorkerOrigin)},exports.callInternalAPI=function(e,t){var n={data:{method:e,param:t},action:"internalAPI"},o=encodeURIComponent(JSON.stringify(n));originalFetch?originalFetch("https://alipay.kylinBridge/?data="+o,{mode:"no-cors"}).then((function(){})).catch((function(){})):originalBridgeCall&&originalBridgeCall("internalAPI",{method:e,param:t})},exports.getStartupParams=function(){return self.__appxStartupParams&&self.__appxStartupParams.version?self.__appxStartupParams:self.AFAppX&&self.AFAppX.bridge&&self.AFAppX.bridge.callSync&&self.AFAppX.bridge.callSync("getStartupParams")||{}},exports.getBridge=function(){return self.AFAppX.bridge};var appxImported=!1,appxImportListener=[];exports.runAfterAppx=function(e){if(self.AFAppX)return appxImported=!0,void e();self.importScripts=function(e){originImportScripts(e),appxImported||"https://appx/af-appx.worker.min.js"!==e||(appxImported=!0,appxImportListener.forEach((function(e){return e()})),appxImportListener=[])},appxImportListener.push(e)},exports.evaluateScript=function(expression){return"function"==typeof eval?eval(expression):originEval(expression)}},10:function(e,t){
/*!
Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var n="\\x"+("0"+"~".charCodeAt(0).toString(16)).slice(-2),o="\\"+n,r=new RegExp(n,"g"),s=new RegExp(o,"g"),a=new RegExp("(?:^|([^\\\\]))"+o),i=[].indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},c=String;function u(e,t,n){return t instanceof Array?function(e,t,n){for(var o=0,r=t.length;o<r;o++)t[o]=u(e,t[o],n);return t}(e,t,n):t instanceof c?t.length?n.hasOwnProperty(t)?n[t]:n[t]=function(e,t){for(var n=0,o=t.length;n<o;e=e[t[n++].replace(s,"~")]);return e}(e,t.split("~")):e:t instanceof Object?function(e,t,n){for(var o in t)t.hasOwnProperty(o)&&(t[o]=u(e,t[o],n));return t}(e,t,n):t}var l={stringify:function(e,t,s,a){return l.parser.stringify(e,function(e,t,s){var a,c,u=!1,l=!!t,p=[],d=[e],f=[e],g=[s?"~":"[Circular]"],m=e,h=1;return l&&(c="object"==typeof t?function(e,n){return""!==e&&t.indexOf(e)<0?void 0:n}:t),function(e,t){return l&&(t=c.call(this,e,t)),u?(m!==this&&(a=h-i.call(d,this)-1,h-=a,d.splice(h,d.length),p.splice(h-1,p.length),m=this),"object"==typeof t&&t?(i.call(d,t)<0&&d.push(m=t),h=d.length,(a=i.call(f,t))<0?(a=f.push(t)-1,s?(p.push((""+e).replace(r,n)),g[a]="~"+p.join("~")):g[a]=g[0]):t=g[a]):"string"==typeof t&&s&&(t=t.replace(n,o).replace("~",n))):u=!0,t}}(e,t,!a),s)},parse:function(e,t){return l.parser.parse(e,function(e){return function(t,r){var s="string"==typeof r;return s&&"~"===r.charAt(0)?new c(r.slice(1)):(""===t&&(r=u(r,r,{})),s&&(r=r.replace(a,"$1~").replace(o,n)),e?e.call(this,t,r):r)}}(t))},parser:JSON};e.exports=l},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Connect="RemoteX.connect",e.Disconnect="RemoteX.disconnect",e.PageChanged="RemoteX.pageChanged",e.DataChanged="RemoteX.dataChanged",e.EvaluteScript="RemoteX.evaluteScript",e.syncStorage="RemoteX.syncStorage",e.requestWillBeSent="RemoteX.requestWillBeSent",e.requestFinished="RemoteX.requestFinished",e.Ping="RemoteX.ping",e.Pong="RemoteX.pong"}(t.RemoteXMethods||(t.RemoteXMethods={}))},42:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(43),r=n(46),s=n(0);s.runAfterAppx((function(){s.debug("[bugme] run after appx"),s.getStartupParams().isRemoteX||s.isLyra()?(s.debug("[bugme] remotex mode"),o.registerRemoteX()):(s.debug("[bugme] preview mode"),r.registerPreview())}))},43:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),r=n(0),s=n(44);t.registerRemoteX=function(){if(self.navigator){r.debug("[bugme] start to register remotex"),s.listenEvents(),o.SocketConn.open(),self.bugmeAPI={send:function(e){o.SocketConn.send(e)}};if(self.document&&self.document.dispatchEvent)try{self.document.dispatchEvent("bugmeInjected")}catch(e){self.document.dispatchEvent(new CustomEvent("bugmeInjected"))}else self.dispatchEvent&&self.dispatchEvent(new CustomEvent("bugmeInjected"))}}},44:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),r=n(0),s=n(9),a=n(45);function i(e){if(!e||"object"!=typeof e)return{};var t={};return Object.keys(e).forEach((function(n){t[n]=""+e[n]})),t}var c=/^https?:\/\/hpmweb\.alipay\.com/,u=function(e){c.test(e.url)||s.SocketConn.send({method:o.RemoteXMethods.requestWillBeSent,params:{reqId:e.requestId,url:e.url,method:(e.method||"GET").toUpperCase(),body:e.postBody,headers:i(e.headers)}})},l=function(e){c.test(e.url)||s.SocketConn.send({method:o.RemoteXMethods.requestFinished,params:{reqId:e.requestId,url:e.url,status:e.status,body:e.body,headers:i(e.headers)}})},p=function(e){c.test(e.url)||s.SocketConn.send({method:o.RemoteXMethods.requestFinished,params:{reqId:e.requestId,url:e.url,status:null}})},d=function(e){var t={};Object.keys(e.data).forEach((function(n){try{t[n]=JSON.parse(e.data[n]).APDataStorage}catch(e){}})),s.SocketConn.send({method:o.RemoteXMethods.syncStorage,params:{data:t}})};t.listenEvents=function(){var e=r.getBridge();e.on(a.ERiverWorkerEvent.PageResume,(function(){s.SocketConn.send({method:o.RemoteXMethods.PageChanged})})),e.on(a.ERiverWorkerEvent.DebugPanelClick,(function(){s.SocketConn.close()})),r.checkIOS()&&!r.isLyra()?(e.on(a.ERiverDebugEvent.networkRequest,(function(e){var t=e.data;u(t)})),e.on(a.ERiverDebugEvent.networkResponse,(function(e){var t=e.data;l(t)})),e.on(a.ERiverDebugEvent.networkError,(function(e){var t=e.data;p(t)})),e.on(a.ERiverDebugEvent.storageChanged,(function(e){var t=e.data;d(t)}))):e.on(a.ERiverDebugEvent.debugConsole,(function(e){var t,n=e.data,o=n.type,r=n.content;try{t=JSON.parse(r)}catch(e){return}switch(o){case a.ERiverDebugEvent.networkRequest:u(t);break;case a.ERiverDebugEvent.networkResponse:l(t);break;case a.ERiverDebugEvent.networkError:p(t);break;case a.ERiverDebugEvent.storageChanged:d(t)}}))}},45:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.networkRequest="tinyAppRemoteDebug_network_request",e.networkResponse="tinyAppRemoteDebug_network_response",e.networkError="tinyAppRemoteDebug_network_error",e.storageChanged="tinyAppRemoteDebug_storage",e.debugConsole="onTinyDebugConsole",e.vconsoleMessage="onMessageFromVConsole"}(t.ERiverDebugEvent||(t.ERiverDebugEvent={})),function(e){e.PageResume="pageResume",e.DebugPanelClick="tinyRemoteDebugPanelButtonClick"}(t.ERiverWorkerEvent||(t.ERiverWorkerEvent={}))},46:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(10),r=n(0),s=function(e,t){return void 0===t?"©undefined":null===t?"©null":t===-1/0?"©- Infinity":t===1/0?"©Infinity":"number"==typeof t&&isNaN(t)?"©NaN":"function"==typeof t?"©function":t},a=Function,i=function(e){try{if(e.fromVConsoleToWorker){var t=e.requestId;if("exec"===e.method){try{new a("requestId","sendBack","var res = "+e.script+";console.log(res);")(t,(function(e){return r.callInternalAPI("tinyDebugConsole",{type:"msgFromWorkerToVConsole",content:o.stringify({requestId:t,returnValue:e},s)})}))}catch(e){console.error(e.name+":"+e.message)}}}}catch(e){}};t.registerPreview=function(){setTimeout((function(){self.document?self.document.addEventListener("push",(function(e){try{var t=e.data.param;i(JSON.parse(t.content||t.data.content))}catch(e){}})):self.addEventListener&&self.addEventListener("push",(function(e){try{var t=JSON.parse(JSON.parse(e.data.text()).param.data.content);i(t)}catch(e){}}))}),10),["log","info","error","debug","warn"].forEach((function(e){var t="o"+e;console[t]||(console[t]=console[e],console[e]=function(){for(var n,a=[],i=0;i<arguments.length;i++)a[i]=arguments[i];console[t].apply(console,a);try{n=o.stringify(a.map((function(e){return e instanceof Error?e.name+": "+e.message:e})),s)}catch(e){return void console.error(e.name+": "+e.message)}r.callInternalAPI("tinyDebugConsole",{content:n,type:"console_"+e})})}))}},9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(10),r=n(0),s=n(2),a=function(){r.getBridge().call("showRemoteDebugPanel",{status:"connecting",text:"远程调试准备中",buttonTitle:"退出"})},i=function(){r.getBridge().call("showRemoteDebugPanel",{status:"connected",text:"远程调试已连接",buttonTitle:"退出"})},c=function(){r.getBridge().call("showRemoteDebugPanel",{status:"disconnected",text:"远程调试已断开",buttonTitle:"退出"})};t.SocketConn={messageQueue:[],socketTask:null,send:function(e){var t=this,n="string"==typeof e?e:JSON.stringify(e);n.length>5242880?r.debug("[bugme] socket send failed, size: ",n.length):this.socketTask?(this.messageQueue.length&&(this.messageQueue.forEach((function(e){t.socketTask.send({data:e})})),this.messageQueue=[]),this.socketTask.send({data:n})):this.messageQueue.push(n)},close:function(){this.socketTask?this.socketTask.close():r.getBridge().showToast({content:"请点击右上角关闭按钮退出",duration:1e3})},connect:function(e){var t=this,n=r.getBridge(),o=n.connectSocket({url:e,multiple:!0});o.onOpen((function(){t.socketTask=o,t.onopen(),r.debug("[bugme] websocket connected")})),o.onMessage((function(e){t.onmessage(e)})),o.onClose((function(){t.onclose()})),o.onError((function(){t.socketTask||(c(),n.showToast({content:"本次真机调试已结束，请重新生成调试版本",duration:2e3}))}))},open:function(){var e=this,t=r.getStartupParams(),n=t.channelId,o=t.channelAuthPair,s=self.__LyraWSWorkerOrigin;if(n||s){a();var i=r.getBridge(),c=s?s+"/worker":"wss://openchannel.alipay.com/host/"+n;if(o&&(c+="?"+o.key+"="+o.value),r.checkIOS()&&!r.isLyra()){this.connect(c);var u=i.connectSocket;i.connectSocket=function(e){if(e&&e.multiple)return u(e);i.showToast({content:"iOS 真机调试暂不支持 connectSocket JSAPI",duration:1e3})},i.onSocketOpen=i.offSocketOpen=i.onSocketMessage=i.offSocketMessage=i.closeSocket=function(){}}else setTimeout((function(){e.connect(c)}),1200)}else r.debug("[bugme] missing channelId in startup params")},onopen:function(){var e=r.getBridge(),t=e.getSystemInfoSync();this.send({method:s.RemoteXMethods.Connect,params:{userAgent:r.getUserAgent(),sdkVersion:e.SDKVersion,alipayVersion:t.version,model:t.model,system:t.system}}),i()},onmessage:function(e){try{var t=JSON.parse(e.data.data),n=t.method,a=t.id,i=t.params;if(n===s.RemoteXMethods.Disconnect)this.close();else if(n===s.RemoteXMethods.EvaluteScript){if(i&&i.code)try{var c=r.evaluateScript(i.code);this.send({returnId:a,payload:o.stringify(c)})}catch(e){r.debug("[remoteX worker evaluateScript] ",e)}}else n===s.RemoteXMethods.Ping&&this.send({method:s.RemoteXMethods.Pong,params:{returnId:a}})}catch(t){r.debug("RemoteX onSocketMessage error",t,e)}},onclose:function(){this.socketTask=null,this.messageQueue=[],c(),[1,2].forEach((function(e){r.getBridge().call("closeSocket",{socketTaskId:e})}))}}}});
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../util/cell/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/drawer/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/listLoading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/pupop/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../page/addView/component/formViewButton/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/myForm/index?hash=8bb4c41708d22ef1c580ce1f883f42cb9decbcf2');
require('../../util/mySelect/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/myCascader/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/formView/index?hash=34070f5ede3f404c63c7ebb606d999a622e1fe8e');
require('../../util/timeLine/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/bank/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../component/formApproval/formApproval?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/myPicker/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/approval/index?hash=a4bd5804b26a7589ec1f1f0b28be32bf0dea85c1');
require('../../util/approvalForm/index?hash=fc61f21f242d762ab2789acbe5e97f2c7e1acdf3');
require('../../util/imgView/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/fileView/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../component/detail/detail?hash=dfdd0d513fa0133e73fcd53a608316cab8cddddc');
require('../../page/loading/loading?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/home/index?hash=4de62b5539a555c0ae74cf169b4f0e811a38f2e7');
require('../../page/baoxiao/index?hash=0c90754dddee9784e27870d3be21357460741e6e');
require('../../page/detail/index?hash=cde03dc2a7cc2bfc04ab23da3c1101a626983a71');
require('../../page/scrollView/index?hash=5f265920107c68ea192b0fee88633f81f6415cc8');
require('../../page/addView/index?hash=ad3ae4ac4fc37ca20f9a3b945042a34255aa40e4');
require('../../page/API/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/demo/index?hash=5e83c5cb021b56810ac99e2572a23e2d00ea9723');
require('../../page/pay/index?hash=089b7f8325d75a8b9480e30741a6395874ee3f04');
require('../../page/organization/index?hash=45b3247201bbfce4cb0f3b25375e066f26b148b3');
require('../../page/purchasePay/index?hash=46a042bcc9395ea61ac7c1a780eac7319a713dac');
require('../../page/otherPay/index?hash=46a042bcc9395ea61ac7c1a780eac7319a713dac');
require('../../page/loan/index?hash=c958b268b8060e473c0afab63df2be4b98e30432');
require('../../page/reimbursement/index?hash=b8b34b1b782eed01417170034f473354f0981501');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}