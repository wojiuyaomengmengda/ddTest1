Component({
  mixins:[{ didMount() {}, }],
  data: {},
  props:{
    onChanges: (data) => console.log(data), // 事件传递
    onBindKeyInput: () => {},
    text: '',                               // 当前列配置对象
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
    onChange() {
      // console.log('formVIew触发', this.props.config)
      this.props.onChanges(this.props.text)
    },
    bindKeyInput(e) {
      this.props.text = e.detail.value
      this.props.onBindKeyInput(this.props.text)
    }
  },
})