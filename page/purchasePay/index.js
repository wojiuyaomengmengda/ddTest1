const app = getApp();
import http from '../../api/http.js'
function getCurrentDay() {
  let myDate = new Date();
  let Year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  let month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
  let day = myDate.getDate();        //获取当前日(1-31)
  return Year + '-' + ('0' + month).substr(-2) + '-' + ('0' + day).substr(-2)
}
const currentDate = getCurrentDay()
Page({
  data: {
      formList: [
        { key: 'FPAYORGID', type: 'button', value: '', title: '公司', required: true},
        { key: 'FPURCHASEDEPTID', type: 'text', value: '', title: '申请部门', required: true},
        { key: 'FPURCHASERID', type: 'text', value: '', title: '申请人', required: true},
        { key: 'FDATE', type: 'button', value: currentDate, title: '申请日期', required: true },
        { key: 'FCONTACTUNIT', type: 'button', value: '', title: '收款单位', required: true,
          option: [{key: '102', value: '蓝海电子公司'}]  
        },
        { key: 'FOPPOSITEBANKNAME', type: 'text', value: '', title: '收款方开户行', required: true },
        { key: 'FOPPOSITEBANKACCOUNT', type: 'text', value: '', title: '收款方银行账号', required: true },
        // { key: 'FOPPOSITEBANKACCOUNT', type: 'input', value: '', title: '收款方账户名称', required: true },
        { key: 'FACCOUNTID', type: 'input', value: '', title: '财务付款账号', hidden: false },
        { key: 'FSETTLETYPEID', type: 'picker', value: 'JSFS02_SYS', title: '付款方式', required: true,
          option: [
            {key: 'JSFS01_SYS', value: '现金'},
            {key: 'JSFS02_SYS', value: '电汇'}
          ],
        },
        { key: 'FPURPOSEID', type: 'picker', value: '', title: '付款用途', required: true,
          option: [
            {key: 'SFKYT08_SYS', value: '采购付款'},
            {key: 'SFKYT09_SYS', value: '预付款'}
          ]
        },
        { key: 'FPAYITEMTYPE', type: 'text', value: '供应商', title: '预付项目类型', hidden: true },
        { key: 'FCOMMENT', type: 'textarea', value: '', title: '备注'},
      ],
      maskShow: false,
      row: {},
      allMoney: 0,
      detailsArray: [],
      imgArray: [],
      fileArray: [],
      approvalData: [], // 关联审批单
      cascaderShow: false,
      mySelectShow: false,
      mySelectList: [
        {title: '供应商1', id: 0, checked: false},
        {title: '供应商2', id: 1, checked: false},
        {title: '供应商3', id: 2, checked: false},
      ]
  },
  // 表单右侧点击事件
  changes(value) {
    console.log(value, '哈哈')
    this.data.row = value
    switch(value.key) {
      case 'FDATE':    
          this.getTime(value.value);         // 申请日期
          break;
      case 'FPAYORGID':
          this.getFPAYORGID(value.value); // 获取公司
          break;
      case 'FCONTACTUNIT':
          this.getFCONTACTUNIT(value.value);    // 选择收款单位
          break;
      case "FSETTLETYPEID":
          this.changeFSETTLETYPEID(value.value); // 选择付款方式
          break;
      case "FPURPOSEID":
          this.changeFPURPOSEID(value.value);    // 选择付款用途
          break;
      default:
          this.renderView(value.value)
          break;
    } 
  },
  // 打开收款单位控件
  getFCONTACTUNIT(value) {
    this.setData({
      mySelectShow: true
    })
  },
  // 渲染选择的收款单位
  setFCONTACTUNIT(res) {
    console.log(res)
    this.renderView(res[0].FName)
    this.selectClose()
  },
  // 打开选择公司控件
  getFPAYORGID() {
    this.setData({
      cascaderShow: true
    })
  },
  // 渲染申请部门/渲染公司
  renderDepartment(v) {
      //  v.org: 公司  v.dep: 部门
      console.log(v, '返回的部门信息')
      let formList = this.data.formList
      this.getItemByKey(formList, 'key', 'FPAYORGID').value = v.org.name
      this.getItemByKey(formList, 'key', 'FPAYORGID').id = v.org.id 
      this.getItemByKey(formList, 'key', 'FPURCHASEDEPTID').value = v.dep.name
      this.getItemByKey(formList, 'key', 'FPURCHASEDEPTID').id = v.dep.id

      this.setData({
        formList,
        cascaderShow: false
      })

      console.log(this.data.formList)
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
        if(res.date) {
          _this.renderView(res.date);
        }
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
  // 选择付款方式
  changeFSETTLETYPEID(value) {
    console.log(value, this.data.row)
    let formList = this.data.formList
    if(value === 'JSFS01_SYS') {
      // 现金，隐藏财务付款账号
      this.getItemByKey(formList, 'key', 'FACCOUNTID').hidden = true
    } else {
      // 非现金，显示财务付款账号
      this.getItemByKey(formList, 'key', 'FACCOUNTID').hidden = false
    }
    this.getItemByKey(formList, 'key', this.data.row.key).value = value 
    let row = this.getItemByKey(formList, 'key', this.data.row.key)
    this.setData({
      formList,
      row
    });
  },
  // 选择付款用途
  changeFPURPOSEID(value) {
    let formList = this.data.formList
    // 当付款用途选择不等于“预付款”时，锁定“预付项目类型”字段，当付款用途=“预付款”时，放开锁定性，并默认写入值“供应商”
    if(value === 'SFKYT08_SYS') {
      this.getItemByKey(formList, 'key', 'FPAYITEMTYPE').hidden = true
    } else {
      this.getItemByKey(formList, 'key', 'FPAYITEMTYPE').hidden = false
    }
    this.getItemByKey(formList, 'key', this.data.row.key).value = value 
    let row = this.getItemByKey(formList, 'key', this.data.row.key)
    this.setData({
      formList,
      row
    });
  },
  // 明细组件数据更新
  renderDetail(value) {
    console.log(value, '父组件触发更新')
    this.setData({
      detailsArray: value
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

  // 页面显示回调
  onShow() {
    console.log('epp Show');
    console.log(app.globalData.userInfo)
    // this.getItemByKey()
      let formList = this.data.formList
      this.getItemByKey(formList, 'key', 'FPURCHASERID').value = app.globalData.userInfo.name
      this.setData({
        formList
      })
  },

   // 提交
  submit() {
    console.log(this.data.formList)
    return
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

  // // 上传图片改变
  imgDel(v) {
    this.setData({
      imgArray: v
    })
  },
  // // 上传附件
  fileDel(v) {
    this.setData({
      fileArray: v
    })
  },
  imgChange(res) {
    console.log(res)
    let imgArray = this.data.imgArray
    imgArray = imgArray.concat(res)
    this.setData({
        imgArray
    })
  },
  fileChange(res) {
      console.log(res)
      let fileArray = this.data.fileArray
      fileArray = fileArray.concat(res)
      this.setData({
          fileArray
      })
  },
  // 选择部门选择器关闭
  cascaderClose() {
    this.setData({
      cascaderShow: false
    })
  },
  // 选择供应商控件关闭
  selectClose() {
    this.setData({
      mySelectShow: false
    })
  },
});
