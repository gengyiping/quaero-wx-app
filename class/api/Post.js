export default class Post {
    constructor() { }
   
    request = (url, type, method, data) => {
        console.log("url=",url,"type=",type,"method=",method,"data=",data)
        let header = {
          'Authorization': getApp().globalData.token,
            'content-type': type
        }
        console.log("header=",header)
        var promise = new Promise((resolve, reject) => {
        wx.request({
          url: url,
          data: data,
          method: method,
          header: header,
          success(res) {
            console.log('111request url:', url,",222res=",res)
            if (res.statusCode === 200) {
             if (res.data.success != true) {
              wx.showToast({
                icon: 'none',
                title: res.data.msg,
                duration: 5000
              })
             }
            }
            if(res.statusCode == 401 || res.statusCode == 403){
              wx.showModal({
                title: '提示',
                content: '授权已过期或未授权！请重新授权！',
                showCancel: true,
                cancelText: "返回首页",
                confirmText: "去授权",
                success: (res) => {
                  getApp().quaeroLogin()
                  // res.cancel ?
                  //   wx.switchTab({
                  //     url: '/pages/index/index',
                  //   }) :
                  //   wx.switchTab({
                  //     url: '/pages/index/index',
                  //   })
                },
                fail: res => { }
              })
            }else{
              //TODO
            }
            return resolve(res)
          },
          fail: reject
        })
      });
      return promise;
    }
  }
