Component({
  mixins:[{ didMount() {}, }],
  data: {
    nav: '0',
    arr: [
      {
        title: '张三提交的借款申请',
        org: '广东宝通玻璃钢有限公司',
        user: '张三',
        bumen: '营销中心',
        time: '2020-07-13 17:09',
        type: 0
      },
      {
        title: '李四提交的借款申请',
        org: '广东宝通玻璃钢有限公司',
        user: '李四',
        bumen: '营销中心',
        time: '2020-07-13 17:09',
        type: 0
      },
      {
        title: '王五提交的借款申请',
        org: '广东宝通玻璃钢有限公司',
        user: '王五',
        bumen: '营销中心',
        time: '2020-07-13 17:09',
        type: 0
      },
    ],
    type: '借款申请',
    typeShow: false,  // 审批申请下拉框显隐
    typeList: [
      {label: '借款申请'},
      {label: '采购申请'},
      {label: '报销申请'},
      {label: '其他申请'}
    ]
  },
  props:{
    list: [],
    maskShow: false
  },
  didUpdate(prevProps,prevData){
    console.log(this.props.maskShow)
    if(this.props.maskShow) {
      console.log(this.props)
      // 页面显示
      // this.setData({
      //   arr: []
      // })
    }
  },
  didMount(){
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
      // list.map(v => {v.checked = false})
      list[index].checked = !list[index].checked
      this.setData({
        arr: list
      })
    },
    sure() {
      let arr = this.data.arr.filter( v => v.checked === true)
      this.props.onChange(arr)
    },
    bindKeyInput(e) {
      // let searchText = e.detail.value
      // let newArr = this.props.list.filter(v => v.title.includes(searchText))
      // console.log(newArr)
      // this.setData({
      //   arr: newArr
      // })
    },
    // 导航栏点击
    navChange(e){
      // e.currentTarget.dataset.index
      this.setData({
        nav: e.currentTarget.dataset.index
      })
    },
    // 点击审批类型
    changeType() {
      this.setData({
        typeShow: true
      })
    },
    // 审批申请下拉框返回
    mySelectClose() {
      this.setData({
        typeShow: false
      })
    },
    selectChange(res) {
      // console.log(res, '点击返回')
      this.setData({
        type: res.label,
        typeShow: false
      })
    }
  },
})