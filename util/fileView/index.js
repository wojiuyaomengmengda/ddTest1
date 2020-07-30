const app = getApp();
Component({
  mixins:[{ didMount() {}, }],
  data: {},
  props:{
    title: '选择附件',// 标题
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
      if(app.globalData.SpaceID === '') {
        return dd.alert({content: '无法获取到钉盘参数，请联系管理员！'})
      }
      dd.uploadAttachmentToDingTalk({
        image:{multiple:true,compress:false,max:9,spaceId: app.globalData.SpaceID},
        space:{spaceId:app.globalData.SpaceID, isCopy:1 , max:9},
        file: {spaceId:app.globalData.SpaceID, max:1},
        types:["file","space"],//PC端仅支持["photo","file","space"]
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
      console.log(e.currentTarget.dataset.item)
      let item = e.currentTarget.dataset.item

      // if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item.fileName)) {
      //   // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
      //   console.log('图片类型，无法预览')
      //   return;
      // }
      dd.previewFileInDingTalk({
        corpId: "dinghpaajb6qay2vbyle",
        spaceId: item.spaceId,
        fileId: item.fileId,
        fileName: item.fileName,
        fileSize: item.fileSize,
        fileType: item.fileType,
      })
    }
  },
})