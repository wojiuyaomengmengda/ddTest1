Component({
    mixins:[{ didMount() {}, }],
    data: {
        toView: 'red',
        scrollTop: 100,
        upperThreshold: 0
    },
    props:{
        onLoad: () => { console.log('加载中') },
        loading: false
    },
    didUpdate(prevProps,prevData){},
    didUnmount(){},
    methods:{
        upper() {
            console.log('顶部触发')
            this.setData({
                scrollTop: 100,
            });
        },
        lower() {
            // console.log('底部触发')
            this.props.onLoad()
        },
        scroll() {
            // console.log('滚动触发')
            // this.setData({
            //     scrollTop: 100,
            // });
        },
        touchEnd() {
            console.log('触摸结束')
        }
    },
})