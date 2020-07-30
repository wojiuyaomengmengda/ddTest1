import http from './api/http.js'
App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.update();
    // this.getSpaceID();

  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    userInfo: {},
    authToken: '',
    SpaceID: ''
  },
  
  loginSystem() {
    let _this = this
    dd.showLoading();
    dd.getAuthCode({
        success:(res)=>{
          console.log(res, 'getAuthCode')
          // _this.globalData.userInfo = res
          dd.hideLoading();
          // dd.alert({content: "step1"});
        },
        fail: (err)=>{
            dd.hideLoading();
            // dd.alert({content: "step3"});
            dd.alert({
                content: JSON.stringify(err)
            })
        }
    })
  },

  update() {
    if(my.canIUse('getUpdateManager')) {
        const updateManager = dd.getUpdateManager()
    
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate) // 是否有更新
        })
    
        updateManager.onUpdateReady(function (ret) {
          console.log(ret.version) // 更新版本号
          dd.confirm({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
    
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
        })
    }
  },

  getSpaceID() {
      let params = {
          id: "dinghpaajb6qay2vbyle"
      }
      http.post('http://huan.vaiwan.com/data/apps/base/cspace', params)
        .then(res => {
            console.log(res, 'res')
            this.globalData.SpaceID = res.data || ''
        })
        .catch(err => {
          console.log(err,'err')
          dd.alert({content: ` 获取SpaceID失败,\n error: ${err.error},\n msg: ${err.errorMessage}`})
        })
  }
});
