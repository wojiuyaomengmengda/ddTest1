function http( url, data, method = 'GET') { 
    return new Promise((resolve, reject)=> {
        let res = dd.getStorageSync({ key: 'authToken' });
        // console.log(res.data)
        let authToken = res.data
        dd.httpRequest({
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            url,
            method,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res) {
                // if(res.data.code === 103) { // 未登录
                //     console.log('未登录')
                //     reject(res)
                //     return dd.redirectTo({
                //         url: '/page/loading/loading'
                //     })
                // }
                let code = res.data.code
                if (code == 0) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            },
            fail: function (res) {
                // dd.alert({content: res.errorMessage})
                reject(res)
            },
            complete:function(res){
                dd.hideLoading();
            }
        });
    })
}

function post(url, data) {
    return http(url, data, 'POST')
}
function get(url, data) {
    return http(url, data)
}

module.exports = {
    post,
    get
}