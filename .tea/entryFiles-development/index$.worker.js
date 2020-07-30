if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
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