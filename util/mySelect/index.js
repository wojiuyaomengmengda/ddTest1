import http from '../../api/http.js'
Component({
  mixins:[{ didMount() {}, }],
  data: {
    arr: [],
    errShow: false
  },
  props:{
    list: [],
    maskShow: false,
    value: '',   // 当前选中项
    loading: true
  },
  didUpdate(prevProps,prevData){
    // console.log(this)
    // console.log(this.props)
  },
  didMount(){
    // this.setData({
    //   arr: this.props.list
    // })
    this.getList()
  },
  methods:{
    close() {
      console.log('guanbi')
      this.props.onClose(false)
    },
    change(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index
      let list = this.data.arr
      list.map(v => {v.checked = false})
      list[index].checked = true
      this.setData({
        arr: list
      })
    },
    sure() {
      // console.log(this.data.list)
      let arr = this.data.arr.filter( v => v.checked === true)
      // console.log(arr)
      if(arr.length < 1) {
        return dd.alert({content: '请选择'})
      }
      this.props.onChange(arr)
    },
    bindKeyInput(e) {
      // let searchText = e.detail.value
      // let newArr = this.props.list.filter(v => v.title.includes(searchText))
      // console.log(newArr)
      // newArr.map( v => v.checked = false)
      // this.setData({
      //   arr: newArr
      // })
    },


    // 获取供应商列表
    getList() {
      this.setData({
        errShow: false
      })
      this.loadingShow()
      let _this = this
      let params = {
        formId: 'bd_supplier'
      }
      http.post('http://huan-k3.vaiwan.com/data/k3/baseData/detail', params)
        .then(res => {
          this.loadingHide()
          console.log(res, '获取供应商')
          _this.setData({
            arr: res.data
          })
        })
        .catch(err => {
          this.loadingHide()
          _this.setData({
            errShow: true
          })
          dd.alert({
            title: '获取供应商列表失败',
            content: `error: ${err.error}\nmsg: ${err.errorMessage}`
          })
        })
    },

    // 刷新
    refresh() {
      this.getList()
    },

    loadingShow() {
      this.setData({
        loading: true
      })
    },

    loadingHide() {
      this.setData({
        loading: false
      })
    }
  },
})