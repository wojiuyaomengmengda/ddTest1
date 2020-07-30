Component({
    data: {
        itemAnimationInfo: ''
    },
    props:{
        maskShow: false,
        onClose: () => {}
    },
    didUpdate(prevProps,prevData) {
        // console.log(prevProps, this.props, prevData, this.data, '111')

        if(this.props.maskShow) {
            this.show()
        } else {
            this.hide()
        }
        
    },
    didMount(){
        console.log('组件跟新')
    },
    methods:{
        show() {
            var animation = dd.createAnimation({
                duration: 300,
                timeFunction: 'ease-in-out',
            });
            this.animation = animation;
        
            animation.translateX(-250).step();
        
            this.setData({
                itemAnimationInfo: animation.translateX(250).export(),
            });
        },
        hide() {
            var animation = dd.createAnimation({
                duration: 0,
                timeFunction: 'ease-in-out'
            });
            this.animation = animation;
        
            animation.translateX(250).step();
        
            this.setData({
                itemAnimationInfo:animation.translateX(-250).export()
            });
        },
        close() {
            console.log('关闭')
            this.props.onClose(this.props.maskShow)
        }
    },
  })