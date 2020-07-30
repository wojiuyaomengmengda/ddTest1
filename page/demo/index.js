import http from '../../api/http.js'
const app = getApp();
Page({
    data: {
        maskShow: false,
        list: [
            {label: '选项1', checked: false, id: '1'},
            {label: '选项2', checked: false, id: '2'},
            {label: '选项3', checked: false, id: '3'},
            {label: '选项4', checked: false, id: '4'}
        ],
        name: '',
        approvalData: [],
        formApprovalShow: false,
        cascaderShow: false,
        cascaderName: '',
        imgArray: [],
        fileArray: [],
        mySelectShow: false,
        mySelectList: [
            {title: '供应商1', id: '01', checked: false},
            {title: '供应商2', id: '02', checked: false},
            {title: '供应商3', id: '03', checked: false},
        ]
    },
    onShow() {
        console.log('demo页面显示')
    },
    onLoad(query) {
        // 页面加载
        console.log('demo页面加载')
    },
    onReady() {
        // 页面加载完成
        console.log('demo页面加载完成')
    },
    onHide() {
        // 页面隐藏
    },
    onUnload() {
        // 页面被关闭
    },
    clickBtn() {
        this.setData({
            maskShow: !this.data.maskShow
        })
    },
    mySelectClose() {
        this.setData({
            maskShow: false
        })
    },
    selectChange(v) {
        console.log(v)
        this.setData({
            name:v.label,
            maskShow: false
        })
    },

    // 关联审批单
    showApproval() {
        this.setData({
            approvalShow: true
        })
    },

    // 关联审批单选择
    approvalChange(e) {
        console.log('选择的是:', e)
        this.setData({
            approvalData: e
        })
    },
    // 点击审批组件
    formApprovalOpen() {
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
    },
    cascaderOpen() {
        console.log('点击')
        this.setData({
            cascaderShow: true
        })
    },
    cascaderClose() {
        console.log('父组件触发')
        this.setData({
            cascaderShow: false
        })
    },
    cascaderSend(e) {
        console.log('选择的是', e)
        this.setData({
            cascaderShow: false,
            cascaderName: e.title
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
    chooseDingTalkDir() {
        dd.chooseDingTalkDir({
            success: (res) => {
                console.log(res, '选择钉盘目录')
                /* data结构
                {"data":
                    [
                        {
                            "spaceId": "" //被选中的空间id
                            "path": "", // 被选中的文件夹路径
                            "dirId": "", //被选中的文件夹id
                        }
                    ]
                }
            */
            },
            fail: (err) =>{
                dd.alert({
                    content:JSON.stringify(err)
                })
            }
        })
    },
    mySelectOpen() {
        this.setData({
            mySelectShow: true
        })
    },
    selectClose() {
        this.setData({
            mySelectShow: false
        })
    },
    selectChange(res) {
        console.log(res)
        this.selectClose()
    },
    test() {
        let text = '测试换行符'
        dd.alert({
            content: `${text}\n这是第二段`
        })
    },
    testSetTimeout() {
        setTimeout(() => {
            // console.log('1111')
            dd.alert({
                content: '测试'
            })
        }, 3000)
    },
    getUserInfo() {
        http.post('http://huan.vaiwan.com/data/apps/base/userInfo')
            .then(res => {
                console.log(res, 'res')
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }
})