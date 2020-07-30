Component({
    data: {
      radio: '',
      bankList: []
    },
    props:{
      onClose: () => {}, // 事件传递
      data: [],   // 数据源     
      onSuccess: () => {},
      value: '',
      maskShow: false
    },
    didUpdate(prevProps,prevData){
      if(this.props.maskShow) {
        console.log(this.props.value, '父组件传值')
      }
    },
    didMount(){
      this.setData({
        bankList: this.props.data
      })
    },
    methods:{
      close() {
        console.log('取消', this.data.bankList)
        this.props.onClose()
      },
      radioChange(e) {
        console.log('当前选择的卡号是', e.detail.value)
        this.data.radio = e.detail.value
      },
      sure() {
        this.props.onSuccess(this.data.radio)
      },
    },
  })