// Component({
//     mixins:[{ didMount() {}, }],
//     data: {
//         details: [],
//         row: {},
//         array: [
//             { id: 'FPAYTOTALAMOUNTFOR', type: 'money', value: '', title: '付款金额', required: true },
//             { id: 'FCOMMENT', type: 'textarea', value: '', title: '付款事由', required: true},
//             { id: 'img', type: 'image', value: '', title: '图片', required: true },
//         ],
//         allMoney: 0,
//     },
//     props:{
//         title: '',// 标题
//         onChanges: (data) => {}, // 事件传递
//         range: [],     
//     },
//     didUpdate(prevProps,prevData){},
//     didMount (){
//         // console.log('明细组件')
//         let details = this.data.details
//         if(this.props.range.length === 0) {
//             let arr = JSON.parse(JSON.stringify(this.data.array)) 
//             arr.map(v => v.index = 0)
//             details.push(arr)
//         }
//         let sum = 0
//         details.map( item => {
//             sum = Number(item[2].value) + sum
//         })
//         this.setData({
//             details,
//             allMoney: sum
//         })
//     },
//     methods:{
//         getAllmoney() {
//             let details = this.data.details
//             let sum = 0
//             details.map( item => {
//                 sum = Number(item[2].value) + sum
//             })
//             this.setData({
//                 details,
//                 allMoney: sum
//             })
//         },
//         d_changes(e) {
//             console.log(e)
//             let details = this.data.details
//             this.getItemByKey(details[e.index], 'id', e.id).value = e.value
//             this.props.onChanges(details)
//         },

//         // input框更新事件
//         d_bindKeyInput(e) {
//             let details = this.data.details
//             this.getItemByKey(details[e.index], 'id', e.id).value = e.value
//             this.props.onChanges(details)
//             this.getAllmoney()
//         },
//         // 点击+按钮
//         addDetails() {
//             let details = this.data.details
//             let length = details.length
//             let arr = JSON.parse(JSON.stringify(this.data.array)) 
//             arr.map(v => v.index = length)
//             details.push(arr)
//             this.setData({
//                 details
//             })

//             my.pageScrollTo({
//                 selector: '#submit',
//                 // scrollTop: 1,
//                 duration: 300,
//             });
//         },
//         // 点击-按钮
//         reduceDetails(e) {
//             let index = e.currentTarget.dataset.id
//             let details = this.data.details
//             details.splice(index, 1)
//             details.map((v,i) => v.index = i)
//             this.setData({
//                 details,
//             })
//             this.getAllmoney()
//             my.pageScrollTo({
//                 selector: '#submit',
//                 // scrollTop: 1,
//                 duration: 300,
//             });
//         },


//          /**
//          * 数组取item
//          * @param arr 目标数组
//          * @param key 目标数组key
//          * @param value 目标数组value
//          */
//         getItemByKey(arr,key,value) {
//             let index = arr.findIndex(item=>item[key] === value)
//             return arr[index]
//         },
//     },
// })