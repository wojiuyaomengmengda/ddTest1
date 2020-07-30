Component({
  mixins:[{ didMount() {}, }],
  data: {
      loadContent: ['正在加载中，请稍后...', '加载完成, 没有更多数据了!'],
    //   loadMore: true,    // true: 加载中； false: 加载完成
  },
  props:{
    // title: '',// 标题
    // onChanges: (data) => {}, // 事件传递
    // item: {},                               // 当前列对象
    loadMore: false, // true: 加载中； false: 加载完成
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
  },
})