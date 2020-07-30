Component({
    data: {
        itemAnimationInfo: ''
    },
    props:{
        maskShow: false,
        onClose: () => {},
        height: '100vh',
        top: false
    },
    didUpdate(prevProps,prevData) {
        if(this.props.maskShow) {
            this.show()
        } else {
            this.hide()
        }
        
    },
    didMount(){
        // console.log('组件跟新')
    },
    methods:{
        show() {
        },
        hide() {
        },
        close() {
            console.log('关闭')
            this.props.onClose(this.props.maskShow)
        }
    },
  })