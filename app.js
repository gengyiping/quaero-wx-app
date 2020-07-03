//app.js
App({

  globalData:{
    token: null,
  },

  onLaunch: function () {
   let that = this
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
      console.log("用户的code:" + res.code);
      wx.request({
        url: 'https://test.quaerolife.com/api/app/login',
        data: {
          "code": res.code,
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          that.globalData.token = res.data.data.token
          wx.setStorage({
            key: 'data',
            data: res.data.data,
            key: 'Authorization',
            data: res.data.data.token,
          })
        },
      })   
      }
    })

   


  }
})
