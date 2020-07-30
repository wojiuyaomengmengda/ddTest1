Component({
    mixins:[{ didMount() {}, }],
    data: {
        details: [],
        row: {},
        array: [
            { id: 'FPAYTOTALAMOUNTFOR', type: 'number', value: '', title: '付款金额', required: true },
            { id: 'FCOMMENT', type: 'textarea', value: '', title: '付款事由', required: true},
        ],
        allMoney: 0,
        word: '零'
        
    },
    props:{
        title: '',// 标题
        onChanges: (data) => {}, // 事件传递
        range: [],     
    },
    didUpdate(prevProps,prevData){},
    didMount (){
        // console.log('明细组件')
        let details = []
        if(this.props.range.length === 0) {
            let arr = JSON.parse(JSON.stringify(this.data.array)) 
            arr.map(v => v.index = 0)
            details.push(arr)
        }
        let sum = 0
        details.map( item => {
            sum = Number(item[0].value) + sum
        })
        this.setData({
            details,
            allMoney: sum
        })
    },
    methods:{
        getAllmoney() {
            let details = this.data.details
            let sum = 0
            details.map( item => {
                sum = Number(item[0].value) + sum
            })
            let word = this.changeMoney(sum)
            this.setData({
                details,
                allMoney: sum,
                word
            })
        },
        changes(e) {
            console.log(e, 'changes')
            if(e.type === 'image') {
                this.changeImage(e)
            } else {
                let details = this.data.details
                this.getItemByKey(details[e.index], 'id', e.id).value = e.value
                this.props.onChanges(details)
            }
        },
        changeImage(e) {
            let _this = this
            dd.chooseImage({
                count: 2,
                success: (res) => {
                    // res.filePaths
                    let details = _this.data.details
                    let imgArray = []
                    res.filePaths.map(v => {
                        imgArray.push({ name: v})
                    })

                    this.getItemByKey(details[e.index], 'id', e.id).value = imgArray
                    _this.setData({
                        details
                    })
                    this.props.onChanges(details)
                    
                },
            });
        },
        // input框更新事件
        bindKeyInput(e) {
            let details = this.data.details
            this.getItemByKey(details[e.index], 'id', e.id).value = e.value
            this.props.onChanges(details)
            this.getAllmoney()
        },
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
    },
})