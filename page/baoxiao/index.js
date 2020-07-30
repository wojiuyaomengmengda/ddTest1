const app = getApp();
Page({
  data: {
      formList: [
        { key: 'userName', type: 'input', value: '', title: '报销人', required: true },
        { key: 'project', type: 'input', value: '', title: '报销项目', required: true },
        { key: 'time', type: 'button', value: '', title: '报销日期', required: true },
        { key: 'bank', type: 'input', value: '', title: '银行账号' },
        { key: 'finance_bank', type: 'input', value: '', title: '财务付款账号' },
        { key: 'company', type: 'button', value: '', title: '公司名称', required: true },
        { key: 'department', type: 'button', value: '', title: '报销部门', required: true },
        { key: 'type', type: 'button', value: '', title: '报销类别', required: true },
        { key: 'chaiLv', type: 'input', value: '', title: '差旅报销项目' },
        { key: 'loanAmount', type: 'money', value: '', title: '原借款金额', required: true },
        // { key: 'loanAmount_words', type: 'text', value: '', title: '大写' },
        { key: 'refundAmount', type: 'money', value: '', title: '应退金额', required: true },
        // { key: 'refundAmount_word', type: 'text', value: '', title: '大写' },
        { key: 'image', type: 'image', value: [], title: '图片' },
        { key: 'file', type: 'file', value: [], title: '附件' },
        { key: 'form', type: 'image', value: [], title: '报销申请审批单' },
        { key: 'remarks', type: 'textarea', value: '', title: '备注' }
      ],
      details: [
        { 
          key: 'details_0',
          id: 0,
          name: '报销明细(1)', 
          data: {
            money: '',
            details: ''
          }
        }
      ],
      row: {},
      allMoney: 0,
      timeLineArr: [
        {
          id: 0,
          title: '审批人',
          userList: [],
        }, {
          id: 1,
          title: '抄送人',
          userList: []
        }
      ]
  },
  changes(value) {
    console.log(value, '哈哈')
    this.data.row = value
    switch(value.key) {
      case 'time':
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
          break;
      case 'form':
          this.getImage(value.value);
          break;
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
    // console.log(value)
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
  // 获取报销类别
  getType(value) {
    console.log(value);
    let _this = this;
    let arr = ['一般费用', '业务招待费']
    dd.showActionSheet({
      title: '报销类别',
      items: arr,
      cancelButtonText: '取消',
      success: (res) => {
        res.index !== -1 && _this.renderView(arr[res.index])
      },
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
  // 提交
  submit() {
    console.log(this.data)
  },

  // 
  changeUser(e) {
    console.log(e)
    let index = e.currentTarget.dataset.id
    let timeLineArr = this.data.timeLineArr
    let pickedUsers = timeLineArr[index].userList.map( v => v.userId )
    let _this = this
    dd.complexChoose({
      title: `选择${timeLineArr[index].title}`,            //标题
      multiple: true,            //是否多选
      limitTips:"超出了",          //超过限定人数返回提示
      maxUsers:1000,            //最大可选人数
      pickedUsers,            //已选用户
      pickedDepartments:[],          //已选部门
      disabledUsers:[],            //不可选用户
      disabledDepartments:[],        //不可选部门
      requiredUsers:[],            //必选用户（不可取消选中状态）
      requiredDepartments:[],        //必选部门（不可取消选中状态）
      permissionType:"GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: true,        //返回人，或者返回人和部门
      success:function(res){
        console.log(res, 'ren')
        timeLineArr[index].userList = res.users
        console.log(timeLineArr, 'timeLineArr')
        _this.setData({
          timeLineArr
        })
      },
      fail:function(err){
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
  // 报销明细的input框失去焦点触发
  d_bindKeyInput(value) {
    console.log(value, 'input')
    let index = value.currentTarget.dataset.id
    let details = this.data.details
    this.data.details[index].data.money = value.detail.value

    let sum = 0
    details.map( v => {
      sum = Number(v.data.money) + sum
    })

    this.setData({
      details,
      allMoney: sum
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
  
  // 新增报销明细
  addDetails(e) {
    let details = this.data.details
    let length = details.length
    let obj = { 
      key: `details_${length}`,
      id: length,
      name: `报销明细(${length + 1})`, 
      data: {
        money: '',
        details: ''
      }
    }
    details.push(obj)
    this.setData({
      details
    })
    console.log(e)
  },
  // 删除报销明细
  reduceDetails(e) {
    console.log(e)
    let index = e.currentTarget.dataset.id
    let details = this.data.details
    details.splice(index, 1)

    let sum = 0
    details.map( v => {
      sum = Number(v.data.money) + sum
    })
    this.setData({
      details,
      allMoney: sum
    })
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
