const app = getApp();
import http from '../../api/http.js'
Page({
  data: {
      formList: [
        { key: 'billTypeID', type: 'picker', value: 'FKDLX02_SYS', title: '单据类型', required: true, 
          option: [{key: 'FKDLX02_SYS', value: '其他业务付款单'}] 
        },
        { key: 'billNo', type: 'input', value: '', title: '单据编号', required: true },
        { key: 'date', type: 'button', value: '', title: '业务日期', required: true },
        { key: 'contactUnitType', type: 'picker', value: 'BD_Empinfo', title: '往来单位类型', required: true,
          option: [{key: 'BD_Empinfo', value: '员工'}] 
        },
        { key: 'contactUnit', type: 'button', value: '', title: '往来单位', required: true},
        { key: 'rectUnitType', type: 'picker', value: 'BD_Empinfo', title: '收款单位类型', required: true, 
          option: [{key: 'BD_Empinfo', value: '员工'}]
        },
        { key: 'rectUnit', type: 'picker', value: '', title: '收款单位', required: true,
          option: [
            {key: '201701001', value: '李亮'},
            {key: 'NO.001', value: '华安'},
            {key: 'NO.007', value: '零零七'}
          ]
        },
        { key: 'currencyId', type: 'picker', value: 'PRE001', title: '币别', required: true, 
          option: [{key: 'PRE001', value: '人民币'}] 
        },
        { key: 'payOrgId', type: 'picker', value: '102', title: '付款组织', required: true,
          option: [{key: '102', value: '蓝海电子公司'}]   
        },
        { key: 'settleOrgId', type: 'picker', value: '', title: '结算组织', required: true,
          option: [{key: '102', value: '蓝海电子公司'}]   
        },
        // { key: 'settleTypeId', type: 'picker', value: '', title: '结算方式', required: true,
        //   option: [{key: 'JSFS01_SYS', value: '现金'}]  
        // },

        // { key: 'purposeId', type: 'input', value: '', title: '付款用途', required: true,
        //   option: [{key: 'SFKYT12_SYS', value: '其他支出'}]  
        // },
        // { key: 'payTotalAmountFor', type: 'money', value: '', title: '应付金额', required: true },
        // { key: 'accountId', type: 'input', value: '', title: '我方银行账号', required: true },
        // { key: 'oppositeBankName', type: 'button', value: '', title: '对方开户行', required: true },
        // { key: 'oppositeBankAccount', type: 'input', value: '', title: '对方银行账号', required: true },
        // { key: 'oppositeCcountName', type: 'input', value: '', title: '对方账户名称', required: true },
      ],
      bankList: [
        { 
          value: '中国工商银行(工行深圳分行南山支行)', 
          url: '../../image/bank1.png',
        },
        { 
          value: '中国建设银行(工行深圳分行南山支行)', 
          url: '../../image/bank2.png',
        },
        { 
          value: '中国农业银行(工行深圳分行南山支行)', 
          url: '../../image/bank3.png',
        },
        { 
          value: '中国邮政储蓄银行(工行深圳分行南山支行)', 
          url: '../../image/bank4.png',
        },
        { 
          value: '中国招商银行(工行深圳分行南山支行)', 
          url: '../../image/bank5.png'
        }
      ],
      maskShow: false,
      row: {},
      allMoney: 0,
      detailsArray: [],
  },
  // 表单右侧点击事件
  changes(value) {
    // console.log(value, '哈哈')
    this.data.row = value
    // this.setData({
    //   row: value
    // })
    switch(value.key) {
      case 'date':
          this.getTime(value.value);
          break;
      case 'oppositeBankName':
          this.getBank(value.value);
          break;
      // case 'billTypeID': 
      //     this.onPicker()
      //     break;
      // case 'rectUnitType': 
      //     this.onPicker()
      //     break;
      // case 'currencyId':
      //     this.onPicker()
      //     break;
      case 'contactUnit':
          this.getContactUnit(value.value)
          break;
      default:
          this.renderView(value.value)
          break;
    } 
  },
  onPicker() {
    let _this = this
    dd.showActionSheet({
      title: _this.data.row.title,
      items: _this.data.row.option,
      cancelButtonText: '取消',
      success: (res) => {
        if(res.index !== -1) {
          let value = _this.data.row.option[res.index]
          _this.renderView(value)
        }
      },
    });
  },
  // 选择银行信息
  changeBank(a) {
    console.log(a,'银行信息')
    this.renderView(a)
    this.setData({
      maskShow: false
    })
  },
  getBank(a) {
    this.setData({
      maskShow: true
    })
  },
  // 隐藏弹框
  searchHide() {
    this.setData({
      maskShow: false
    })
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
  // 获取往来单位
  getContactUnit(value) {
    let _this = this
    dd.complexChoose({
      title:"测试标题",            //标题
      multiple:false,            //是否多选
      limitTips:"超出了",          //超过限定人数返回提示
      maxUsers:1000,            //最大可选人数
      pickedUsers:[],            //已选用户
      pickedDepartments:[],          //已选部门
      disabledUsers:[],            //不可选用户
      disabledDepartments:[],        //不可选部门
      requiredUsers:[],            //必选用户（不可取消选中状态）
      requiredDepartments:[],        //必选部门（不可取消选中状态）
      permissionType:"GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: true,        //返回人，或者返回人和部门
      success:function(res){
        // console.log(res,'res')
        if(res.users.length > 0) {
          let formList = _this.data.formList
          let obj = _this.getItemByKey(formList, 'key', _this.data.row.key)
          obj.value = res.users[0].name
          obj.userId = res.users[0].userId
          let row = _this.getItemByKey(formList, 'key', _this.data.row.key)
          _this.setData({
            formList,
            row
          });
        }
      },
      fail:function(err){
      }
  })
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
  
  // 明细组件数据更新
  renderDetail(value) {
    console.log(value, '父组件触发更新')
    this.setData({
      detailsArray: value
    })
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
    // console.log(value, 'input')
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', value.key).value = value.value
    this.setData({
      formList,
    });
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



   // 提交
  submit() {
    console.log(this.data)
    dd.showLoading()
    this.data.formList.map( v => v.id = v.key)
    const params = {
      formId:  "AP_PAYBILL",
      id:  "",
      content: {
        props: this.data.formList,
        detail: this.data.detailsArray
      }
    }
    http.post('http://k3base.vaiwan.com/data/k3/formData/save', params)
      .then(res => {
        // console.log(res, 'res')
        // dd.alert({content: JSON.stringify(res)})
        dd.showToast({
          type: 'success',
          content: '提交成功',
          duration: 1000,
          success: () => {},
          complete: () => {
            dd.navigateTo({
              url: '/page/home/index',
            });
          }
        });
      })
      .catch(err => {
        console.log(err,'err')
        dd.alert({content: JSON.stringify(err)})
      })
  },
});
