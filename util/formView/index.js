Component({
  mixins:[{ didMount() {}, }],
  data: {
    word: '零',
    pickerShow: false,
    pickerValue: '',
    pickerIndex: 0
  },
  props:{
    onChanges: (data) => console.log(data), // 事件传递
    onBindKeyInput: () => {},
    config: {},                               // 当前列配置对象
  },
  didUpdate(prevProps,prevData){
    console.log('组件数据更新触发')
  },
  didMount(){
    // console.log('组件渲染完成')
    let config = this.props.config
    if(this.props.config.type === 'picker') {
      let obj = config.option.find(v => v.key === config.value)
      let pickerIndex = config.option.findIndex(v => v.key === config.value)
      let pickerValue = obj ? obj.value : ''
      pickerIndex === -1 && (pickerIndex = 0) 
      this.setData({
        pickerValue,
        pickerIndex: [pickerIndex]
      })
    }
  },
  methods:{
    onChange() {
      // console.log('formVIew触发', this.props.config)
      this.props.onChanges(this.props.config)
    },
    bindKeyInput(e) {
      let word = this.data.word
      if(this.props.config.type === 'money') {
        word = this.changeMoney(e.detail.value)
        this.setData({
          word,
        })
      }
      this.props.config.value = e.detail.value
      this.props.onBindKeyInput(this.props.config)
    },

    changeMoney(money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
          chineseStr += cnInteger;
        }
        return chineseStr;
    },
    onPickerShow() {
      let config = this.props.config 
      let pickerIndex = config.option.findIndex(v => v.key === config.value)
      pickerIndex === -1 && (pickerIndex = 0)
      console.log(pickerIndex, 'pickerIndex')
      this.setData({
        pickerIndex: [pickerIndex],
        pickerShow: true
      })
    },
    pickerHide() {
      this.setData({
        pickerShow: false
      })
    },
    onPickerChange(e) {
      this.data.pickerIndex = e.detail.value[0]
    },
    pickerSubmit() {
      // console.log(this.data.pickerIndex)
      let config = this.props.config
      let index = this.data.pickerIndex
      let pickerValue = config.option[index].value
      config.value = config.option[index].key

      this.setData({
        pickerShow: false,
        pickerValue
      })

      this.props.onChanges(this.props.config)
    },
    previewImage(e) {
      let _this = this
      my.previewImage({
        current: e.currentTarget.dataset.index,
        urls: _this.props.config.value,
      });
    }
  },
})