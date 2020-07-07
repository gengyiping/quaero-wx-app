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
            console.log('request url:', url,",res=",res)
            if(res.data.resultCode == 401 || res.data.resultCode == 403){
              wx.showModal({
                title: '提示',
                content: '授权已过期或未授权！请重新授权！',
                showCancel: true,
                cancelText: "返回首页",
                confirmText: "去授权",
                success: (res) => {
                  res.cancel ?
                    wx.switchTab({
                      url: '/pages/index/index',
                    }) :
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
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
