const app = getApp();
Page({
  data: {
      userName: '111',    
      formList: [
        { key: 'company', type: 'button', value: '', title: '所属公司' },
        { key: 'userName', type: 'input', value: '', title: '申请人', required: true },
        { key: 'department', type: 'button', value: '', title: '部门', required: true },

        { key: 'reason', type: 'input', value: '', title: '事由', required: true },
        { key: 'bank', type: 'input', value: '', title: '银行账号' },
        { key: 'finance_bank', type: 'input', value: '', title: '财务付款账号' },
        { key: 'money', type: 'money', value: '', title: '申请金额(元)' },
        { key: 'startTime', type: 'button', value: '', title: '使用日期' },
        { key: 'endTime', type: 'button', value: '', title: '归还日期' },
        { key: 'remarks', type: 'textarea', value: '', title: '备注' },
      ],
      row: {},
      allMoney: 0
  },
  changes(value) {
    console.log(value, '哈哈')
    this.data.row = value
    switch(value.key) {
      case 'startTime':
          this.getTime(value.value);
          break;
      case 'endTime':
          this.getTime(value.value);
          break;
      case 'company':
          this.getCompany(value.value);
          break;
      case 'department':
          this.getDepartment(value.value);
          break;
      case 'type':
          this.getType(value.value);
          break;
      case 'file':
          this.getFile(value.value);
          break;
      case 'image':
          this.getImage(value.value);
      default:
          break;
    } 
    // this.setData({
    //   maskShow: true
    // })
  },
  // 获取报销日期
  getTime(value) {
    let _this = this
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: value,
      success: (res) => {
        _this.renderView(res.date);
      },
    });
  },
  // 渲染页面
  renderView(value) {
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', this.data.row.key).value = value 
    let row = this.getItemByKey(formList, 'key', this.data.row.key)
    this.setData({
      formList,
      row
    });
  },
  // 获取公司名称
  getCompany(value) {
    console.log(value)
    let _this = this;
    dd.chooseDepartments({
        title:"测试标题",            //标题
        multiple: false,            //是否多选
        limitTips:"超出了",          //超过限定人数返回提示
        maxDepartments:100,            //最大选择部门数量
        pickedDepartments: [],          //已选部门
        disabledDepartments:[],        //不可选部门
        requiredDepartments:[],        //必选部门（不可取消选中状态）
        permissionType: "GLOBAL",          //选人权限，目前只有GLOBAL这个参数
        success:function(res){
          console.log(res, '获取公司名称')
          _this.renderView(res.departments[0].name)
        },
        fail:function(err){
        }
    });
  },
  // 获取报销部门
  getDepartment(value) {
    let _this = this;
    dd.chooseDepartments({
        title:"测试标题",            //标题
        multiple: false,            //是否多选
        limitTips:"超出了",          //超过限定人数返回提示
        maxDepartments:100,            //最大选择部门数量
        pickedDepartments: [],          //已选部门
        disabledDepartments:[],        //不可选部门
        requiredDepartments:[],        //必选部门（不可取消选中状态）
        permissionType: "GLOBAL",          //选人权限，目前只有GLOBAL这个参数
        success:function(res){
          _this.renderView(res.departments[0].name)
        },
        fail:function(err){
        }
    });
  },
  // 选择附件
  getFile(value) {
    dd.uploadAttachmentToDingTalk({
        image:{multiple:true,compress:false,max:9,spaceId: "12345"},
        space:{spaceId:"12345",isCopy:1 , max:9},
        file: {spaceId:"12345",max:1},
        types:["file","space"],//PC端仅支持["photo","file","space"]
        success: (res) => {
        },
        fail: (err) =>{
            dd.alert({
                content:JSON.stringify(err)
            })
        }
    })
  },
  getImage(value) {
    dd.uploadAttachmentToDingTalk({
        image:{multiple:true,compress:false,max:9,spaceId: "12345"},
        space:{spaceId:"12345",isCopy:1 , max:9},
        file: {spaceId:"12345",max:1},
        types:["photo","camera"],//PC端仅支持["photo","file","space"]
        success: (res) => {
        },
        fail: (err) =>{
            dd.alert({
                content:JSON.stringify(err)
            })
        }
    })
  },


  bindKeyInput(value) {
    console.log(value, 'input')
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', value.key).value = value.value
    this.setData({
      formList,
    });
  },
 
  // 文本域失去焦点触发
  bindTextAreaBlur(value) {
    console.log(value, 'input')
    let index = value.currentTarget.dataset.id
    let details = this.data.details
    this.data.details[index].data.details = value.detail.value
    this.setData({
      details,
    });
  },
  // 提交
  submit() {
    console.log(this.data)
  },
  
  /**
   * 数组取item
   * @param arr 目标数组
   * @param key 目标数组key
   * @param value 目标数组value
   */
  getItemByKey(arr,key,value) {
    let index = arr.findIndex(item=>item[key] === value)
    return arr[index]
  },


  onShow(options) {
    // console.log('epp Show');
    console.log(app.globalData.userInfo.authCode)
  },
});
