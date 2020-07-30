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
      // 明细的数据
      details: [],
      detailsRow: {},
      array: [
        { id: 'FCOSTID', type: 'picker', value: '', title: '报销项目', required: true,
          option: [
            {key: '0', value: '差旅费'},
            {key: '1', value: '办公费'},
            {key: '2', value: '业务招待费'},
          ]
        },
        { id: 'FPAYTOTALAMOUNTFOR', type: 'number', value: '', title: '报销金额', required: true },
        { id: 'FCOMMENT', type: 'textarea', value: '', title: '费用明细', required: true},
      ],
      allMoney: 0,
      allMoneyTitle: '报销总金额',
      backMonay: 0,    // 应退金额
      word: '零',

      // 表单数据
      formList: [
        { key: 'FPAYORGID', type: 'button', value: '', title: '所属公司', required: true},
        { key: 'FEXPENSEDEPTID_E', type: 'text', value: '', title: '报销部门', required: true},
        { key: 'FCONTACTUNIT', type: 'text', value: '', title: '报销人', required: true},
        { key: 'FDATE', type: 'button', value: currentDate, title: '报销日期', required: true },
        { key: 'FOPPOSITEBANKNAME', type: 'input', value: '', title: '对方开户行', required: true },
        { key: 'FOPPOSITEBANKACCOUNT', type: 'input', value: '', title: '对方银行账号', required: true },
        { key: 'FACCOUNTID', type: 'input', value: '', title: '财务付款账号' },
        { key: 'MONEY', type: 'number', value: '', title: '原借款金额', required: true},
        { key: 'FREMARK', type: 'textarea', value: '', title: '备注'},
      ],
      maskShow: false,
      row: {},
      allMoney: 0,
      imgArray: [],
      fileArray: [],
      approvalData: [],
      cascaderShow: false
      // detailsArray: [],
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
      case 'FCONTACTUNIT':
          this.getfpurchaserid(value.value); // 获取申请人
          break;
      case 'img':
         this.getImage(value.value);
         break;
      default:
          this.renderView(value.value)
          break;
    } 
  },
  // 打开选择部门控件
  getFPAYORGID() {
    this.setData({
      cascaderShow: true
    })
  },
  // 设置部门
  renderDepartment(v) {
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
    console.log(this.data.formList)
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
    let _this = this
    my.chooseImage({
      sourceType: ['camera','album'],
      count: 9,
      success: (res) => {
          let imgArray = []
          res.filePaths.map(v => {
              imgArray.push({ name: v})
          })
          _this.renderView(imgArray)
      },
    });
  },
  // 选择申请人-->企业内部员工
  getfpurchaserid(value) {
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


  onReady(options) {
    console.log('epp Show');
    // console.log(app.globalData.userInfo.authCode)
    console.log('明细组件')
    let details = this.data.details
    let arr = JSON.parse(JSON.stringify(this.data.array)) 
    arr.map(v => v.index = 0)
    details.push(arr)
    let sum = 0
    details.map( item => {
        sum = Number(item[2].value) + sum
    })
    console.log(details)
    this.setData({
        details,
        allMoney: sum
    })
  },
  onUnload() {
    console.log('页面注销')
    this.setData({
        details: []
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
  

  // 明细页面逻辑处理
    // 点击+按钮
    addDetails() {
        let details = this.data.details
        let length = details.length
        let arr = JSON.parse(JSON.stringify(this.data.array)) 
        arr.map(v => v.index = length)
        details.push(arr)
        this.setData({
            details
        })

        my.pageScrollTo({
            selector: '#submit',
            // scrollTop: 1,
            duration: 300,
        });
    },
    // 点击-按钮
    reduceDetails(e) {
      let index = e.currentTarget.dataset.id
      let details = this.data.details
      details.splice(index, 1)
      details.map((v,i) => v.index = i)
      this.setData({
          details,
      })
      this.getAllmoney()
      my.pageScrollTo({
          selector: '#submit',
          // scrollTop: 1,
          duration: 300,
      });
    },
    // 处理金额
    getAllmoney() {
      let details = this.data.details
      let sum = 0
      let backMonay = 0
      let money = this.getItemByKey(this.data.formList, 'key', 'MONEY').value
      details.map( item => {
          sum = Number(item[1].value) + sum
      })
      let word = this.changeMoney(sum)
      if(money === '') {
        backMonay = '请输入原借款金额'
      } else {
        backMonay = Number(money) - Number(sum)
      }
      this.setData({
          details,
          allMoney: sum,
          backMonay,
          word
      })
    },
    // input框改变
    d_bindKeyInput(e) {
      let details = this.data.details
      this.getItemByKey(details[e.index], 'id', e.id).value = e.value
      this.setData({
        details
      })
      this.getAllmoney()
    },
    d_changes(e) {
      let details = this.data.details
      this.getItemByKey(details[e.index], 'id', e.id).value = e.value
      this.getAllmoney()
      this.setData({
        details
      })
    },
     /**
    *   转化数字为金额
    */
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

    // 上传图片改变
    imgDel(v) {
      this.setData({
        imgArray: v
      })
    },
    // 上传附件
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
    },
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
});
