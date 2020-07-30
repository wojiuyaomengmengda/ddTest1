const app = getApp();

Page({
  data: {
    dataList: [
      {
        title: 'Johnny Appleseed', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '08:00'
      },
       {
        title: 'Johnny Appleseed', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '08:00'
      },
      {
        title: 'Johnny Appleseed', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '08:00'
      },
       {
        title: 'Johnny Appleseed', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '08:00'
      },
       {
        title: 'Johnny Appleseed', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '08:00'
      },
      {
        title: 'Johnny Appleseed',
        content: '文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试',
        time: '08:00'
      },
    ],
    nav: '0',
    more: false, // nav栏展开控制

    topNav: [
      {title: '采购付款', imageUrl: '../../image/fukuanshenqing.png', name: 'purchasePay'},
      {title: '其他付款', imageUrl: '../../image/fukuanshenqing.png', name: 'otherPay'},
      {title: '借款申请', imageUrl: '../../image/jiekuanshenqing.png', name: 'loan'},
      {title: '报销申请', imageUrl: '../../image/feiyongbaoxiao.png', name: 'reimbursement'},
      // {title: '请假审批', imageUrl: '../../image/yusuanshenqing.png', name: ''},
      // {title: '出差审批', imageUrl: '../../image/yusuanshenqing.png', name: ''},
      // {title: '发布公告', imageUrl: '../../image/yusuanshenqing.png', name: ''},
      // {title: '发布通知', imageUrl: '../../image/yusuanshenqing.png', name: ''},
    ],

    scrollTop: 100,
    loadMore: false
  },
    // nav栏切换
  changeNav(even) {
    this.setData({
      nav:even.target.dataset.value
    })
  },
  more() {
    this.setData({
      more: !this.data.more
    })
    console.log(this.data.more)
  },
  // 点击顶部nav栏
  gotoTopNav(e) {
    let url = `/page/${e.currentTarget.dataset.name}/index`
     dd.navigateTo({
      url,
    });
  },
  // 跳转详情页
  changeText() {
    dd.navigateTo({
      url: '/page/detail/index',
    });
  },


  upper(e) {
    console.log('滚动到顶触发',e);
  },
  lower(e) {
    console.log('滚动到底部触发',e);
  },
});
