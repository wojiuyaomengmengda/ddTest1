Component({
  mixins:[{ didMount() {}, }],
  data: {},
  props:{
    title: '',// 标题
    onChanges: (data) => {}, // 事件传递
    item: {},                               // 当前列对象
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
    even() {
      this.props.onChanges(this.props.item)
    }
  },
})