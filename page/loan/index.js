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
        { key: 'FPAYORGID', type: 'button', value: '', title: '所属公司', required: true,
          option: [{key: '102', value: '蓝海电子公司'}]   
        },
        { key: 'FEXPENSEDEPTID_E', type: 'text', value: '', title: '部门', required: true,
          option: [{key: '102', value: '蓝海电子公司'}]   
        },
        { key: 'FCONTACTUNIT', type: 'text', value: '', title: '申请人', required: true},
        { key: 'FREMARK', type: 'textarea', value: '', title: '申请事由', required: true},
        { key: 'FPAYTOTALAMOUNTFOR', type: 'money', value: '', title: '申请金额', required: true},
        { key: 'FOPPOSITEBANKNAME', type: 'input', value: '', title: '对方开户行', required: true},
        { key: 'FOPPOSITEBANKACCOUNT', type: 'input', value: '', title: '对方银行账号', required: true},
        { key: 'FACCOUNTID', type: 'input', value: '', title: '财务付款账号'},
        { key: 'FDATE', type: 'button', value: currentDate, title: '借款日期', required: true},
        { key: 'BACK', type: 'button', value: '', title: '归还日期', required: true},
        { key: 'FCOMMENT', type: 'textarea', value: '', title: '备注'},
      ],
      maskShow: false,
      row: {},
      allMoney: 0,
      detailsArray: [],
      imgArray: [],
      approvalData: [], // 关联审批单
      cascaderShow: false
  },
  // 表单右侧点击事件
  changes(value) {
    console.log(value, '哈哈')
    this.data.row = value
    // this.setData({
    //   row: value
    // })
    switch(value.key) {
      case 'FDATE':
          this.getTime(value.value);
          break;
      case 'FPAYORGID':
          this.getFPAYORGID();
          break;
      case 'BACK': 
          this.getTime(value.value);
          break;
      case 'FCONTACTUNIT':
          this.getUser(value.value); // 获取申请人
          break;
      default:
          this.renderView(value.value)
          break;
    } 
  },
  // 显示获取部门空间
  getFPAYORGID() {
    this.setData({
      cascaderShow: true
    })
  },
  renderDepartment(v){
    console.log(v, '返回的信息')
    let formList = this.data.formList
    this.getItemByKey(formList, 'key', 'FPAYORGID').value = v.org.name
    this.getItemByKey(formList, 'key', 'FPAYORGID').id = v.org.id 
    this.getItemByKey(formList, 'key', 'FEXPENSEDEPTID_E').value = v.dep.name
    this.getItemByKey(formList, 'key', 'FEXPENSEDEPTID_E').id = v.dep.id

    this.setData({
      formList,
      cascaderShow: false
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
  // 选择申请人
  getUser(value) {
    let _this = this
    dd.complexChoose({
      title:"选择员工",            //标题
      multiple: false,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      success:function(res){
          console.log(res.users[0].name)
          if(res.users.length > 0) {
            _this.renderView(res.users[0].name)
          }
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


  // onShow(options) {
  //   // console.log('epp Show');
  //   // console.log(app.globalData.userInfo.authCode)
    
  // },
  // 页面显示回调
  onShow() {
    // console.log('epp Show');
    // console.log(app.globalData.userInfo)
    // this.getItemByKey()
      let formList = this.data.formList
      this.getItemByKey(formList, 'key', 'FCONTACTUNIT').value = app.globalData.userInfo.name
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

   // 上传图片改变
  imgDel(v) {
    this.setData({
      imgArray: v
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
  // 关联审批单
  approvalChange(e) {
    this.setData({
      approvalData: e
    })
  },

  cascaderClose() {
    this.setData({
      cascaderShow: false
    })
  }
});
