import http from '../../api/http.js'

// const app = getApp();
// Component({
//   mixins:[{ didMount() {}, }],
//   data: {},
//   props:{
//     title: '选择图片',// 标题
//     // onChanges: (data) => {}, // 事件传递
//     // item: {},                               // 当前列对象
//     value: []
//   },
//   didUpdate(prevProps,prevData){},
//   didUnmount(){},
//   methods:{
//     clickAdd() {
//       // return console.log(app.globalData.SpaceID)
//       if(app.globalData.SpaceID === '') {
//         return dd.alert({content: '无法获取到钉盘参数，请联系管理员！'})
//       }
//       dd.uploadAttachmentToDingTalk({
//         image:{multiple:true,compress:false,max:9,spaceId:app.globalData.SpaceID},
//         types:["photo","camera"],//PC端仅支持["photo","file","space"]
//         success: (res) => {
//           console.log(res, 'res')
//           dd.alert({
//             content: JSON.stringify(res)
//           })
//         },
//         fail: (err) =>{
//           console.log(err, '打开失败')
//         }
//       })
//     },

//     // 点击删除
//     clickDel(e) {
//       let index = e.currentTarget.dataset.index
//       this.props.value.splice(index,1)
//       this.props.onChange(this.props.value)
//     },


//   },
// })
const app = getApp();
Component({
  mixins:[{ didMount() {}, }],
  data: {},
  props:{
    title: '选择图片',// 标题
    // onChanges: (data) => {}, // 事件传递
    // item: {},                               // 当前列对象
    value: []
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
    // 点击删除
    clickDel(e) {
      let index = e.currentTarget.dataset.index
      this.props.value.splice(index,1)
      this.props.onDel(this.props.value)
    },
    clickAdd() {
      // console.log('添加')
      let _this = this
      console.log(app.globalData.SpaceID,'app.globalData.SpaceID')
      if(app.globalData.SpaceID === '') {
        return dd.alert({content: '无法获取到钉盘参数，请联系管理员！'})
      }
      dd.uploadAttachmentToDingTalk({
          image:{multiple:true,compress:false,max:9,spaceId: app.globalData.SpaceID},
          space:{spaceId:app.globalData.SpaceID, isCopy:1 , max:9},
          file: {spaceId:app.globalData.SpaceID, max:1},
          types:["photo","camera"],//PC端仅支持["photo","file","space"]
          success: (res) => {
            _this.props.onChange(res.data)
          },
          fail: (err) =>{
              dd.alert({
                  content:JSON.stringify(err)
              })
          }
      })
    },
    preview(e) {
      // 无法预览图片
      return console.log(e.currentTarget.dataset.item)
      // let item = e.currentTarget.dataset.item
      // let params = {
      //   appId: 'dinghpaajb6qay2vbyle',
      //   domain: item.spaceId,
      //   type: 'download',
      //   fileids: item.fileId,
      // }
      // dd.showLoading({
      //   content: '请稍后...',
      // });
      // http.post('http://huan.vaiwan.com/data/apps/base/cspaceAuth', params)
      //   .then(res=> {
      //       dd.hideLoading();
      //       dd.previewFileInDingTalk({
      //         corpId: "dinghpaajb6qay2vbyle",
      //         spaceId: item.spaceId,
      //         fileId: item.fileId,
      //         fileName: item.fileName,
      //         fileSize: item.fileSize,
      //         fileType: item.fileType,
      //       })
      //   })
      //   .catch(err => {
      //       dd.hideLoading();
      //   })
      dd.previewImage({
        current: 2,
        urls: [],
      });
    }
  },
})