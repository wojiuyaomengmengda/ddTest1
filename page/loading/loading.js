const app = getApp();
import http from '../../api/http.js'

Page({
  data: {
  },

  onLoad(query) {
    // 页面加载
    this.loading()
  },
  onReady() {
    // 页面加载完成
  },
  loading() {
    let _this = this
    dd.getAuthCode({
        success:(res)=>{
            // console.log(res, 'getAuthCode')
            const params = {
                authCode: res.authCode,
                corpId: 'ding5ad7336696ba6f9435c2f4657eb6378f',
                appId: 'dinghpaajb6qay2vbyle',
                thirdAppId: 'kingdeecloud'
            }
            // http://k3base.vaiwan.com/data/apps/base/login
            http.post('http://huan.vaiwan.com/data/apps/base/login', params)
                .then( res => {
                    console.log(res,'res')
                    // app.globalData.authToken = res.data.authToken
                    dd.setStorageSync({
                        key: 'authToken',
                        data: res.data.authToken,
                    });
                    _this.getUserInfo()
                    _this.getSpaceID()
                    // dd.redirectTo({
                    //     url: '/page/organization/index'
                    // })
                })
                .catch(err => {
                    // console.log(err)
                    dd.alert({
                        title: '登录接口调用失败',
                        content: ` error: ${err.error},\n errorMessage: ${err.errorMessage}`,
                        buttonText: '重新登录',
                        success: () => {
                            _this.loading()
                        },
                    })
                })
        },
        fail: (err)=>{
            console.log(err)
            // dd.alert({
            //     content: JSON.stringify(err)
            // })
        }
    })
  },
  // 获取当前登录用户信息
  getUserInfo() {
    http.post('http://huan.vaiwan.com/data/apps/base/userInfo')
        .then(res => {
            console.log(res)
            app.globalData.userInfo = res.data

            dd.redirectTo({
                url: '/page/organization/index'
            })
        })
        .catch(err => {
            dd.alert({
                title: '获取用户信息失败',
                content: `error: ${err.error}\nmsg: ${err.errorMessage}`
            })
        })
  },
  // 获取SpaceId
  getSpaceID() {
      let _this = this
      let params = {
          id: "dinghpaajb6qay2vbyle"
      }
      http.post('http://huan.vaiwan.com/data/apps/base/cspace', params)
        .then(res => {
            console.log(res, 'res')
            app.globalData.SpaceID = res.data || ''
        })
        .catch(err => {
          console.log(err,'err')
          dd.alert({content: ` 获取SpaceID失败,\n error: ${err.error},\n msg: ${err.errorMessage}`})
        })
  }
});
