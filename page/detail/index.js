Page({
  data: {
    nav: '0',
    formList: [
      { key: 'IDCode', type: 'text', value: '15DSJ-202003-00031', title: '单据编号' },
      { key: 'name', type: 'input', value: '董小英', title: '申请人' },
      { key: 'time', type: 'text', value: '2020-03-30', title: '申请时间'},
      { key: 'payType', type: 'text', value: '银行-网银支付', title: '支付方式' },
      { key: 'bank', type: 'text', value: '', title: '银行卡号' },
      { key: 'payCompany', type: 'text', value: 'DSJ-LLC', title: '费用支付公司' },
      { key: 'payDepartment', type: 'text', value: '项目实施部', title: '费用支付部门' },
      { key: 'money', type: 'text', value: '279.00', title: '核定金额' },
      { key: 'reason', type: 'text', value: '出差', title: '事由' },
    ],
    formList2: [
      { key: 'payType', type: 'text', value: '住宿费', title: '费用类型' },
      { key: 'money', type: 'text', value: '279.00', title: '核定金额' },
      { key: 'payDepartment', type: 'text', value: '项目实施部', title: '费用承担部门' },
    ],
    maskShow: false,
    row: {}, // 当前操作的对象
    loading: false,
    bankList: [
      { 
        value: '中国工商银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 21',
        url: '../../image/bank1.png'
      },
      { 
        value: '中国建设银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 22',
        url: '../../image/bank2.png'
      },
      { 
        value: '中国农业银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 23',
        url: '../../image/bank3.png'
      },
      { 
        value: '中国邮政储蓄银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 24',
        url: '../../image/bank4.png'
      },
      { 
        value: '中国招商银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 25',
        url: '../../image/bank5.png'
      },
      { 
        value: '中国工商银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 21',
        url: '../../image/bank1.png'
      },
      { 
        value: '中国建设银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 22',
        url: '../../image/bank2.png'
      },
      { 
        value: '中国农业银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 23',
        url: '../../image/bank3.png'
      },
      { 
        value: '中国邮政储蓄银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 24',
        url: '../../image/bank4.png'
      },
      { 
        value: '中国招商银行(工行深圳分行南山支行)', 
        cardId: '6245 4565 4846 4564 25',
        url: '../../image/bank5.png'
      }
    ],
    timeLineArr: [
      {
        userName: '张三',
        content: '同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长',
        timestamp: '2018-04-12 20:46',
        status: '正常',
        color: '#409EFF'
      }, {
        userName: '李四',
        content: '同意',
        timestamp: '2018-04-03 20:46',
        status: '异常',
        color: '#0bbd87'
      }, {
        userName: '王五',
        content: '同意',
        timestamp: '2018-04-03 20:46',
        status: '正常',
        color: '#409EFF'
      }, {
        userName: '赵六',
        content: '同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长同意超级长',
        timestamp: '2018-04-03 20:46',
        status: '正常',
        color: '#409EFF'
      }, {
        userName: '测试',
        content: '同意',
        timestamp: '2018-04-03 20:46',
        status: '正常',
        color: '#409EFF'
      }, {
        userName: '哈哈',
        content: '同意',
        timestamp: '2018-04-03 20:46',
        status: '正常',
        color: '#409EFF'
      }
    ],
    formApprovalShow: false
  },
  changes(value) {
    console.log(value, '哈哈')
    this.data.row = value
    switch(value.key) {
      case 'bank':
          this.setData({
            maskShow: true
          })
          break;
      case 'net':
          this.getNet();
          break;
       case 'gps':
          this.getGPS();
          break;
       case 'mps':
          this.openMps();
          break;
      default:
          break;
    } 
  },
  searchHide() {
    this.setData({
      maskShow: false
    });
  },
  changeBank(value) {
    console.log('当前返回的值是', value)
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', this.data.row.key).value = value
    let row = this.getItemByKey(formList, 'key', this.data.row.key)
    this.setData({
      maskShow: false,
      formList,
      row
    });
  },
  bindKeyInput(value) {
    console.log(value, 'input')
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', value.key).value = value.value
    this.setData({
      formList,
    });
  },
  send() {
    console.log(this.data.formList)
    dd.showLoading({content: '加载中...'});
    this.setData({
      loading: true
    })
  },
  // nav栏切换
  changeNav(even) {
    this.setData({
      nav:even.target.dataset.value
    })
  },
  // 点击用户头像
  clickUser(e) {
    console.log(e)
    dd.showActionSheet({
      title: '',
      items: ['电话', '会话', 'Ding'],
      cancelButtonText: '取消',
      success: (res) => {
        const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
          dd.alert({
          title: `你点了${btn}按钮`
        });
      },
    });
  },

  /**
   * 数组取item
   * @param arr 目标数组
   * @param key 目标数组key
   * @param value 目标数组value
   */
  getItemByKey(arr,key,value) {
    let index = arr.findIndex(item=>item[key] === value);
    return arr[index]
  },

  // 提交审批
  formApprovalCloseShow() {
    this.setData({
      formApprovalShow: true
    })
  },
  formApprovalClose() {
    this.setData({
      formApprovalShow: false
    })
  },
  formApprovalSend(radio, text) {
    console.log(radio, text)
    this.setData({
        formApprovalShow: false
    })
  }
});
