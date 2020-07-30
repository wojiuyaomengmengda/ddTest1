Component({
  mixins:[{ didMount() {}, }],
  data: {
    approvalShow: false,
  },
  props:{
    title: '关联审批单',// 标题
    value: []
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
    clickAdd() {
      this.setData({
        approvalShow: true
      })
    },
    approvalClose() {
      this.setData({
        approvalShow: false
      })
    },
    // 点击删除
    clickDel(e) {
      let index = e.currentTarget.dataset.index
      this.props.value.splice(index,1)
      this.props.onChange(this.props.value)
    },
    // 选择组件返回
    approvalChange(e) {
      console.log('选择的是:', e);
      this.setData({
        approvalShow: false
      })
      this.props.value = e
      this.props.onChange(e)
    }
  },
})