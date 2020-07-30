Component({
    mixins:[{ didMount() {}, }],
    data: {
        radio: [
            {label: '批准', checked: true},
            {label: '驳回', checked: false},
            {label: '不批准', checked: false}
        ],
        text: '',
        focus: false
    },
    props:{
        title: '',// 标题
        onChanges: (data) => {}, // 事件传递
    },
    didUpdate(prevProps,prevData){},
    didMount (){
    },
    methods:{
        // 单选框选择
        radioChange(e) {
            let index = e.currentTarget.dataset.index
            let radio = this.data.radio
            radio.map(v => v.checked = false)
            radio[index].checked = true
            this.setData({
                radio
            })
        },
        // 文本域输入
        onInput(e) {
            this.setData({
                text: e.detail.value
            })
        },
        // 文本域获得焦点
        bindButtonTap() {
            this.setData({
                focus: true
            })
        },
        onBlur() {
            this.setData({
                focus: false
            })
        },
        // 关闭
        close() {
            this.props.onClose()
        },
        // 提交
        send() {
            let arr = this.data.radio.filter( v => v.checked )
            if(arr.length > 0) {
                this.props.onSend(arr[0], this.data.text)
            } else {
                dd.alert({content: '请选择审批状态'});
            }
        }
    },
})