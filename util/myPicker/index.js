Component({
  mixins:[{ didMount() {}, }],
  data: {
    // arr: []
    arr: []
  },
  props:{
    list: [],
    maskShow: false
  },
  didUpdate(prevProps,prevData){},
  didMount(){
    this.setData({
      arr: this.props.list
    })
  },
  methods:{
    close() {
      console.log('guanbi')
      this.props.onClose(false)
    },
    change(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index
      // this.data.arr[index]
      this.props.onChange(this.data.arr[index])
      // let list = this.data.arr
      // list.map(v => {v.checked = false})
      // list[index].checked = true
      // this.setData({
      //   arr: list
      // })
    },
    // sure() {
    //   // console.log(this.data.list)
    //   let arr = this.data.arr.filter( v => v.checked === true)
    //   // console.log(arr)
    //   this.props.onChange(arr)
    // },
    bindKeyInput(e) {
      let searchText = e.detail.value
      let newArr = this.props.list.filter(v => v.title.includes(searchText))
      console.log(newArr)
      this.setData({
        arr: newArr
      })
    }
  },
})