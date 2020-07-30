import http from '../../api/http.js'
Component({
  mixins:[{ didMount() {}, }],
  data: {
      dataList: [],
      value: {id: '', name: ''},   // 当前的选择项
      searchText: '', // 输入框的值
      breadcrumb: [], // 面包屑数组
      loading: true,
      errShow: true
    },
    props:{
      title: '公司',
      list: [],
      maskShow: false,
  },
  didUpdate(prevProps,prevData){
    // console.log(prevProps)
    // 关闭控件清空选中项
    if(prevProps.maskShow === false) {
      this.setData({
        value: {id: '', name: ''}
      })
    }
  },
  // 渲染后回调
  didMount(){
    console.log('渲染后回调')
    this.getListChildDetps(1)
  },
  methods:{
    loadingShow() {
      this.setData({
        loading: true
      })
    },
    loadingHide() {
      this.setData({
        loading: false
      })
    },
    // 获取部门以及下属部门,选公司id默认为1
    getListChildDetps(id) {
      let _this = this
      _this.setData({
        dataList: [],
        errShow: false
      })
      this.loadingShow()
      let params = {
        id
      }
      http.post('http://huan.vaiwan.com/data/apps/base/listChildDetps', params)
        .then(res => {
          console.log(res, 'res')
          _this.setData({
            dataList: res.data,
            preId: this.props.id
          })
          _this.loadingHide()
        })
        .catch(err => {
          _this.setData({
            errShow: true
          })
          // console.log(err, 'err')
          _this.loadingHide()
          dd.alert({content: `获取公司/部门失败,\nerror: ${err.error},\nmsg: ${err.errorMessage}`})
        })
    },
    // 选择部门/取消部门
    checkView(e) {
      // e.currentTarget.dataset.id
      // return console.log(e.currentTarget.dataset.item)
      let value
      if(this.data.value.id === e.currentTarget.dataset.id) {
        value = {id: '', name: ''}
      } else {
        value = e.currentTarget.dataset.item
      }
      this.setData({
        value
      })
    },
    // 获取下级部门
    changeView(e) {
      console.log(e.currentTarget.dataset.item, '获取下级部门')
      let breadcrumb = this.data.breadcrumb
      breadcrumb.push(e.currentTarget.dataset.item)
      this.setData({
        breadcrumb
      })
      this.getListChildDetps(e.currentTarget.dataset.item.id)
    },
    // 点击下级按钮
    getNextLevel(e) {
      // e.currentTarget.dataset.id
      console.log(e.currentTarget.dataset)
      // let breadcrumb = this.data.breadcrumb
      // breadcrumb.push(e.currentTarget.dataset.item)
      // let dataList = [
      //   {title: `部门${breadcrumb.length}_${breadcrumb.length + 1}`, ifLevel: true, id: `${breadcrumb.length}_${breadcrumb.length + 1}`},
      //   {title: `部门${breadcrumb.length}_${breadcrumb.length + 2}`, ifLevel: false, id: `${breadcrumb.length}_${breadcrumb.length + 2}`}
      // ]

      // this.setData({
      //   breadcrumb,
      //   dataList
      // })
    },
    // 点击面包屑
    clickBreadcrumb(e) {
      console.log(e.currentTarget.dataset)
      let index = e.currentTarget.dataset.index + 1
      let breadcrumb = this.data.breadcrumb
      if(breadcrumb.length === index) {
        return
      } else {
        breadcrumb.splice(index, breadcrumb.length - index)
        this.setData({
          breadcrumb
        })
      }

      this.getListChildDetps(e.currentTarget.dataset.item.id)
    },
    clearBreadcrumb() {
      this.setData({
        breadcrumb: []
      })
      this.getListChildDetps(1)
    },
    // 关闭
    close() {
      console.log('点击触发')
      this.props.onClose()
    },
    // 确定
    sure() {
      // console.log(this.data.breadcrumb, this.data.value)
      if(this.data.breadcrumb.length < 1) {
        return dd.alert({content: '请选择公司'})
      }
      if(this.data.value.id === '') {
        return dd.alert({content: '请选择部门'})
      }
      this.props.onSend({
        org: this.data.breadcrumb[0],  // 公司
        dep: this.data.value           // 部门
      })
      // if(this.data.value.id === '') {
      //   return dd.alert({content: '请选择部门'})
      // } else {
      //   this.props.onSend(this.data.value)
      // }
    },
    bindKeyInput(e) {
      this.setData({
        searchText: e.detail.value
      })
    },

    // 刷新
    refresh() {
      this.clearBreadcrumb()
    }
  },
})