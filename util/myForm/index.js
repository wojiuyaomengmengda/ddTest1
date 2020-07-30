Component({
    mixins:[{ didMount() {}, }],
    data: {},
    props:{
        title: '',// 标题
        onChanges: (data) => console.log(data), // 事件传递
        item: {},                               // 当前列对象
        required: false
    },
    didUpdate(prevProps,prevData){},
    didUnmount(){},
    methods:{
        cellClick(val) {
            // console.log(val)
            // this.props.onChanges(val)
        }
    },
})