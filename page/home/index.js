const app = getApp();

Page({
  data: {
    pageName: 'component/index',
    animationInfo: '',
    dataList: [
      {
        title: '请您审批报销', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '2020-5-12 08:00'
      },
       {
        title: '请您审批报销', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '2020-5-12 08:00'
      },
      {
        title: '请您审批报销', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '2020-5-12 08:00'
      },
       {
        title: '请您审批报销', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '2020-5-12 08:00'
      },
       {
        title: '请您审批报销', 
        content: '请您审批报销：张三 单号: 15DSJ-202004-0001 费用类型： 办公设备 金额： 780.00',
        time: '2020-5-12 08:00'
      },
      {
        title: '审批测试',
        content: '文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试文本内容测试',
        time: '2020-5-12 08:00'
      },
    ],
    startTime: '',
    endTime: '',
    departments: [{name: '111'}],  // 选择部门列表
    maskShow: false,
    addShow: false,
    loadMore: false, // true: 加载中； false: 加载完成
  },
  onShow() {
    // 页面显示
    let time = this.getDate();
    this.setData({
      startTime: time[0],
      endTime: time[1]
    });
  },
  changeText(val) {
    // console.log('111',val)
    dd.navigateTo({
      url: '/page/detail/index',
    });
  },
  addView() {
    this.setData({
      addShow: !this.data.addShow
    })
  },
  gotoAddView(e) {
    console.log(e, '点击跳转')
    let index = e.currentTarget.dataset.id
    this.addView()
    switch(index) {
      case '0': 
        dd.navigateTo({
          url: '/page/baoxiao/index',
        });
      break;
      case '1': 
        dd.navigateTo({
          url: '/page/addView/index',
        });
      break;
      case '2': 
        dd.navigateTo({
          url: '/page/pay/index',
        });
      break;
        
    }
    // dd.navigateTo({
    //   url: '/page/addView/index',
    // });
  },
  changeStartTime() {
    console.log(this.data.startTime)
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.startTime,
      success: (res) => {
        console.log(res);
        if(res.date) {
          this.setData({startTime: res.date})
        }
      },
    });
  },
  changeEndTime() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.endTime,
      success: (res) => {
        if (res.data) {
          this.setData({endTime: res.date})
        }
      },
    });
  },
  getDate() {
    let time = new Date();
    let year = time.getFullYear();
    let mouth = time.getMonth() + 1;
    let day = time.getDate();
    
    return [year + '-' + mouth + '-' + day, year + '-' + (mouth + 1) + '-' + day]
  },
  changeDep() {
    dd.chooseDepartments({
        title: "测试标题",            //标题
        multiple: true,            //是否多选
        limitTips: "超出了",          //超过限定人数返回提示
        maxDepartments:100,            //最大选择部门数量
        pickedDepartments: this.data.departments,          //已选部门
        disabledDepartments: [],        //不可选部门
        requiredDepartments: [],        //必选部门（不可取消选中状态）
        permissionType:"GLOBAL",          //选人权限，目前只有GLOBAL这个参数
        success: (res) => {
          console.log(res)
          this.setData({departments: res.departments})
        },
        fail:function(err){
        }
    });
  },
  searchShow() {
    this.setData({
      maskShow: true
    });
  },


  searchHide() {
    this.setData({
      maskShow: false
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('onPullDownRefresh', new Date())
    this.setData({
      loadMore: true
    })
  },
  // 触底触发
  scrollToLower() {
    console.log('触底啦')
  }
});
